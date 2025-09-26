import { level1 } from "./levels.js";

const commandInput = document.querySelector("#console-input");
const commandContainer = document.querySelector("#command-container");

const commandsList = [
    { name: "git init" },
    { name: "git clone" },
    { name: "git status" },
    { name: "git add" },
    { name: "git commit" },
    { name: "git push" },
    { name: "git pull" },
    { name: "git branch" },
    { name: "git checkout" },
    { name: "git merge" },
    { name: "clear", action: clearConsole },
    { name: "start", action: start }
];

function logInputValue(inputValue) {
    const trimmed = inputValue.trim();

    const parts = trimmed.split(" ");
    const baseCommand = parts.length > 1 ? parts[0] + " " + parts[1] : parts[0];

    const command = commandsList.find(c => {
        if (typeof c === "string") {
            return c.toLowerCase() === baseCommand.toLowerCase();
        } else if (typeof c === "object") {
            return c.name.toLowerCase() === baseCommand.toLowerCase();
        }
        return false;
    });

    if (command && typeof command.action === "function") {
        command.action(inputValue);
        return;
    }

    const text = document.createElement("p");

    if (command) {
        text.textContent = trimmed;
    } else {
        text.textContent = "Cette commande n'existe pas";
        text.style.color = "red";
    }

    commandContainer.appendChild(text);
}

function clearConsole() {
    while (commandContainer.firstChild) {
        commandContainer.removeChild(commandContainer.firstChild);
    }
}

function start() {
    level1();
}

commandInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const commandSendEvent = new CustomEvent("command", { detail: commandInput.value });
        document.dispatchEvent(commandSendEvent);

        logInputValue(commandInput.value);
        commandInput.value = "";
    }
});
