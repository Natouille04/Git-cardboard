const instructionContainer = document.querySelector('.instruction-container');
const title = document.querySelector("h1");
const levelDesc = document.querySelector("#levelDesc");
const button = document.querySelector("button");
const img = document.querySelector("#visualImg");

function resetVisuals() {
    img.classList.remove("hidden");
    img.style.filter = "none";
    button.classList.add("hidden");
    button.onclick = null;
}

function setLevel({ number, desc, imgSrc, hideButton = true }) {
    resetVisuals();
    title.textContent = `Level ${number}`;
    levelDesc.innerHTML = desc;
    img.src = imgSrc;
    hideButton ? button.classList.add("hidden") : button.classList.remove("hidden");
}

function waitForCommand(checkCommand, onSuccess) {
    function handler(event) {
        if (checkCommand(event.detail)) {
            document.removeEventListener("command", handler);
            onSuccess(event.detail);
        }
    }
    document.addEventListener("command", handler);
}

export function level1() {
    setLevel({
        number: 1,
        desc: "Pour commencer, il nous faut un carton. On en aura besoin tout au long de notre aventure. Ce carton représente un repository, c'est là qu'on va stocker notre code. Pour créer le repo, tape<i>git init</i>.",
        imgSrc: "assets/img/cardboard-disasembled.svg"
    });
    instructionContainer.children[1].classList.add("hidden");

    waitForCommand(cmd => cmd === "git init", () => {
        img.src = "assets/img/cardboard-open.svg";
        levelDesc.innerHTML = "Super !! On a maintenant de quoi avancer, maintenant voyons comment remplir ce carton";
        button.classList.remove("hidden");
        button.onclick = level2;
    });
}

export function level2() {
    setLevel({
        number: 2,
        desc: "Maintenant, on va remplir ce carton avec des documents, parce qu'un carton vide ce n'est pas très utile. Pour ajouter des fichiers au suivi de Git, on utilise la commande<i>git add nom_du_fichier</i>. Attention, tu ne peux pas ajouter un fichier qui n'existe pas (évidemment).",
        imgSrc: "assets/img/document-and-cardboard.svg"
    });
    button.classList.add("hidden");

    waitForCommand(cmd => cmd.startsWith("git add"), () => {
        img.src = "assets/img/document-in-cardboard.svg";
        levelDesc.innerHTML = "Parfait ! Le carton est plein, dépêchons-nous de l'expédier";
        button.classList.remove("hidden");
        button.onclick = level3;
    });
}

export function level3() {
    setLevel({
        number: 3,
        desc: "Avant d'envoyer ce carton à qui que ce soit, on va l'accompagner d'un message pour expliquer ce qu'on a mis dedans. On va donc faire un 'commit' avec la commande<i>git commit -m \"message\"</i>.",
        imgSrc: "assets/img/cardboard-closed.svg"
    });
    button.classList.add("hidden");

    waitForCommand(cmd => cmd.startsWith("git commit -m"), (cmd) => {
        const match = cmd.match(/git commit -m ["'](.+)["']/);
        if (match) {
            const message = match[1];
            img.src = "assets/img/cardboard-signed.svg";
            levelDesc.innerHTML = `Très bien, maintenant on ferme le colis et on l'envoie. D'ailleurs, j'aime beaucoup ce message de commit "${message}", quelles paroles de poésie...`;
            button.classList.remove("hidden");
            button.onclick = level4;
        }
    });
}

export function level4() {
    setLevel({
        number: 4,
        desc: "Maintenant que notre colis est rempli et signé, il ne reste plus qu'à l'envoyer. Pour ça, on va faire un push. Sur celui-là, je vous laisse deviner la commande (c'est trop facile sinon ;)",
        imgSrc: "assets/img/cardboard-signed.svg"
    });
    button.classList.add("hidden");

    waitForCommand(cmd => cmd === "git push", () => {
        img.classList.add("hidden");
        levelDesc.innerHTML = "Bon, celui-là n'était pas compliqué, le prochain non plus je te rassure";
        button.classList.remove("hidden");
        button.onclick = level5;
    });
}

export function level5() {
    setLevel({
        number: 5,
        desc: "On me dit dans l'oreillette qu'on vient de recevoir un colis. Pour le récupérer, il faut faire un pull. Encore une fois, je te laisse deviner la commande.",
        imgSrc: "assets/img/cardboard-signed.svg",
        hideButton: true
    });
    img.classList.add("hidden");

    waitForCommand(cmd => cmd === "git pull", () => {
        img.classList.remove("hidden");
        img.src = "assets/img/cardboard-signed.svg";
        levelDesc.innerHTML = "Super, j'attendais ce colis depuis longtemps (on connaît la poste)";
        button.classList.remove("hidden");
        button.onclick = level6;
    });
}

export function level6() {
    setLevel({
        number: 6,
        desc: "Bon, passons aux choses sérieuses, on va créer une branche qui nous permettra d'envoyer et recevoir des colis différents sans interférer avec les colis normaux. Pour ça, on va faire<i>git checkout -b 'nomdelabranch'</i>. Attention, deux branches ne peuvent pas avoir le même nom.",
        imgSrc: "assets/img/path.svg"
    });
    button.classList.add("hidden");

    waitForCommand(cmd => cmd.startsWith("git checkout -b"), (cmd) => {
        const match = cmd.match(/git checkout -b ["'](.+)["']/);
        if (match) {
            const branch = match[1];
            img.src = "assets/img/path2.svg";
            levelDesc.innerHTML = `"${branch}", pas mal, moi j'aurais pas mis ça mais bon...`;
            button.classList.remove("hidden");
            button.onclick = level7;
        }
    });
}

export function level7() {
    setLevel({
        number: 7,
        desc: "Bon j'ai créé un peu beaucoup de branches, essaye de trouver une commande qui nous aiderait à voir toutes les branches qui ont été créées (<i>git branch</i>)",
        imgSrc: "assets/img/path2.svg"
    });
    img.style.filter = "blur(1.5rem)";
    button.classList.add("hidden");

    waitForCommand(cmd => cmd === "git branch", () => {
        img.style.filter = "blur(0)";
        levelDesc.innerHTML = "Aaaah, mais oui, tout est plus clair maintenant...";
        button.classList.remove("hidden");
        button.onclick = level8;
    });
}

export function level8() {
    setLevel({
        number: 8,
        desc: "Ok, c'est le dernier niveau (et oui déjà, malheureusement), j'aimerais fusionner le contenu de mes deux colis. Pour ça, on va faire un merge en sélectionnant un des colis (j'ai déjà selectionée base parce que je suis sympa), puis exécuter la commande en spécifiant avec quelle branche on doit le fusionner. Vu que c'est le dernier niveau, je te laisse cogiter. (Aide-toi de tes anciennes commandes, la structure est la même)",
        imgSrc: "assets/img/cardboard-merge.svg"
    });
    button.classList.add("hidden");

    waitForCommand(cmd => cmd === "git merge blue", () => {
        img.src = "assets/img/blue-cardboard.svg";
        levelDesc.innerHTML = "Magnifique, je vais l'envoyée a mon cheval tellement c'est beau !!!";
        button.classList.remove("hidden");
        button.onclick = end;
    });
}

function end() {
    title.textContent = "FIN";
    levelDesc.innerHTML = "C'est fini !!! J'espere que ca aurait été sympa et instructif, n'hesite pas a recommencer si certaine commande était pas clair";
    img.src = "assets/img/cardboard-signed.svg";
    button.classList.add("hidden");
}
