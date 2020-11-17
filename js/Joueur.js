class Joueur extends ElementHtml{
    /**
     * Représente un joueur.
     *
     * @param {JQuery<HTMLElement>} $raquette L'élément HTML de la raquette
     */
    constructor($raquette){
        super($raquette);
        /**
         * La raquette est l'élément pricipal auquel se rapporte la hauteur, largeur, etc, mais on le nomme $raquette ici pour éviter les confusions
         * @type {JQuery<HTMLElement>}
         */
        this.$raquette=this.$element;
        /**
         * La vitesse de déplacement de la raquette
         * @type {number}
         */
        this.vitesseY=3;
        /**
         * Direction dans laquelle se déplace la raquette
         * -1 vers le haut
         * 1 vers le bas
         * 0 ne bouge pas
         * @type {number}
         */
        this.directionY=0;
        this.calculePositions();
        this.calculeTailles();

    }
    /**
     * Fait monter la raquette
     */
    monte(){
        this.directionY=-1;
    }
     /**
     * Fait descendre la raquette
     */
    descend(){
        this.directionY=1;
    }
     /**
     * arrête la raquette
     */
    bougePas(){
        this.directionY=0;
    }
    /**
     * Fait en sorte que la raquette ne sorte pas du terrain
     * @private
     */
    _limiteMouvements(){
        if(this.haut < terrain.haut){
            this.haut=terrain.haut;
        }
        if(this.bas > terrain.hauteur){
            this.bas = terrain.hauteur;
        }
    }
    /**
     * Fait bouger (ou pas) la raquette
     */
    bouge(){
        this.haut+= this.vitesseY * this.directionY;
        this._limiteMouvements();
        this._rafraichitHTML();
    }
    /**
     * Effet visuel (et sonore) qui se produit quand on touche la balle
     */
    effetToucheBalle(){
        ElementHtml.effetCss(this.$raquette,"touche-balle");
        audio.playNote();
    }

    /**
     * Applique les valeurs en CSS
     * @private
     */
    _rafraichitHTML(){
        this.$element.css("top", this.haut); 
    }
    
}

