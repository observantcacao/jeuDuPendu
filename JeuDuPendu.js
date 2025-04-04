// class Pendu (qui représente mon jeu)
class Pendu {
    // initialisation
    #mot = "";
    #motArray = [];
    #motCache = [];
    #lettreUtilise = [];
    #essaiesRestants = 6;

    // constructeur
    constructor(motD) {
        this.#mot = motD.trim();
        this.#motArray = this.#mot.split('');
        this.#motArray.forEach(() => {
            this.#motCache.push("_");
        });
    }

    // Vérifie si une lettre est correcte ou non
    essaie(lettre) {
        lettre = lettre.toLowerCase();
        if (lettre.length > 1 || !isNaN(lettre)) { // <- si ce n'est pas une lettre ou un nombre
            return;
        }

        if (this.#lettreUtilise.includes(lettre)) {
            console.log(`Vous avez deja essayé la lettre : ${lettre}.`); // <- si la lettre est deja essayer
            this.affichage()
            return;
        }

        if (lettre == "") {
            console.log(`rentrez pas de caractère vide`); // si c'est vide
            this.affichage()
            return;
        }

        if (this.#motArray.includes(lettre)) { //  <- 
            console.log(`${lettre} est dans le mot`);
            this.#motArray.forEach((char, index) => {
                if (char === lettre) {
                    this.#motCache[index] = lettre;
                }
            });
        } else {
            this.#lettreUtilise.push(lettre);
            console.log(`${lettre}" n'est pas dans le mot`);
            this.#essaiesRestants--;
        }
        // affichage mauvaise lettre
        this.affichage()
        this.estTermine();
    }

    // Affiche l'état actuel du mot
    affichage() {
        // mauvaise lettre
        document.getElementById("trucPourAfficherLettreDejaUtiliser").innerHTML = this.#lettreUtilise.join(' ');
        // bonne lettre sur c'elle que l'on connais pas
        document.getElementById("trucPourAfficherLettre").innerHTML = this.#motCache.join(' ');
        // mise en place de la bonne image
        let image = document.getElementById("imagePendu");
        switch (this.#essaiesRestants) {
            case 5:
                image.src = "image/jeuDuPendu5.png";
                break;
            case 4:
                image.src = "image/jeuDuPendu6.png";
                break;
            case 3:
                image.src = "image/jeuDuPendu7.png";
                break;
            case 2:
                image.src = "image/jeuDuPendu8.png";
                break;
            case 1:
                image.src = "image/jeuDuPendu9.png";
                break;
            case 0:
                image.src = "image/jeuDuPendu10.png";
                break;
            default:
                image.src = "image/jeuDuPendu4.png";
                break;
        }
    }

    // Vérifie si le jeu est terminé
    estTermine() {
        if (this.#motCache.join('') === this.#mot) { // si le mot caché est égale au mot trouvé alors l'utilisateur a gagné
            console.log("ta gagné");
            alert(`!!!! 🎉 VOUS AVEZ GAGNEZ 🎉!!!!`);
            return true;
        }

        if (this.#essaiesRestants <= 0) { // si il ne lui reste plus de chance alors il a perdu
            console.log(`perdu le mot était:${this.#mot}`);
            document.getElementById("title").innerHTML = `Vous avez perdu`;
            alert(`💀💀 vous avez perdu 💀💀`);
            return true;
        }

        return false;
    }
}

// Liste des mots
const motsFrancaisSansAccents = [
    "chat", "chien", "maison", "soleil", "table", "fenetre",
    "voiture", "livre", "ecole", "porte", "montagne", "plage",
    "foret", "cheval", "oiseau", "pomme", "parapluie", "ciel",
    "bateau", "jardin"
];

// prend un mot aléatoire dans la liste pour le jeu
const motAleatoire = motsFrancaisSansAccents[Math.floor(Math.random() * motsFrancaisSansAccents.length)];
let jeu = new Pendu(motAleatoire);
const boutons = document.getElementById("buttonLettre");
let valeur = document.getElementById("inputLettre");
const boutonsRestart = document.getElementById("buttonRecommencer");


jeu.affichage();
boutons.addEventListener("click", () => {
    if (jeu.estTermine() == false) {
        jeu.essaie(valeur.value.trim());
        valeur.value = "";
    }
});

boutonsRestart.addEventListener("click", () => {
    commencer();
});

function commencer(){
    valeur.value = "";
    document.getElementById("title").innerHTML = `jeu du Pendu`;
    let motAleatoireRe = motsFrancaisSansAccents[Math.floor(Math.random() * motsFrancaisSansAccents.length)];
    jeu = new Pendu(motAleatoireRe);
    jeu.affichage();
}
