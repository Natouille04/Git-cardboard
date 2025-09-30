import { intro, level1, level2, level3, level4, level5, level6, level7, level8 } from "./levels.js";

const commandInput = document.querySelector("#console-input");
const commandContainer = document.querySelector("#command-container");

const levels = {
    0: intro,
    1: level1,
    2: level2,
    3: level3,
    4: level4,
    5: level5,
    6: level6,
    7: level7,
    8: level8
};

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
    { name: "start", action: start },
    { name: "level", action: goToLevel }
];

function logInputValue(inputValue) {
    const trimmed = inputValue.trim();

    const parts = trimmed.split(" ");
    const baseCommand = parts[0] === "git" && parts.length > 1
        ? parts[0] + " " + parts[1]
        : parts[0];

    const command = commandsList.find(c => c.name.toLowerCase() === baseCommand.toLowerCase());

    if (command && typeof command.action === "function") {
        command.action(trimmed);
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
    intro();
}

function goToLevel(fullCmd) {
    const parts = fullCmd.split(" ");
    if (parts.length < 2) {
        logSystemMessage("Usage: level [numéro]");
        return;
    }

    const num = parseInt(parts[1], 10);
    if (levels[num]) {
        levels[num]();
        logSystemMessage(`Passage au level ${num}`);
    } 
    
    else {
        logSystemMessage(`Level ${num} n'existe pas`);
    }
}

function logSystemMessage(msg) {
    const text = document.createElement("p");
    text.textContent = msg;
    text.style.color = "yellow";
    commandContainer.appendChild(text);
}

commandInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const commandSendEvent = new CustomEvent("command", { detail: commandInput.value });
        document.dispatchEvent(commandSendEvent);

        logInputValue(commandInput.value);
        commandInput.value = "";
    }
});
