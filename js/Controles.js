/**
 * Gère les entrées interactives (clavier, souris, touch tactile etc...)
 */
class Controles {
    constructor() {
        //c'est parti !
        this._ecouteClavier();
    }

    _ecouteClavier(){
        //quand on appuie sur une touche du clavier
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
            }
            if(event.key === "ArrowDown"){
                joueur1.descend();
                joueur2.monte();
            }
            if(event.key === "ArrowUp"){
                joueur1.monte();
                joueur2.descend();
            }

            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);

        //quand on relâche une touche du clavier
        //ici on utilise un switch plutôt que des if, c'est pareil, c'est juste une histoire de pain au chocolat vs chocolatine
        window.addEventListener("keyup", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait pour rien
            }
            joueur1.bougePas();
            joueur2.bougePas();
            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);
    }



}