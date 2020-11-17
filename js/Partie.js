/**
 * La classe Partie répresente un échange dans la partie
 */
class Partie {
    get vies() {
        return this._vies;
    }

    set vies(value) {
        let ici=this;
        let $iconesVies=$(".vie");
        this._vies = value;
        this.$vies.text(value);
        ElementHtml.effetCss(this.$vies,"flash");
        ElementHtml.effetCss($iconesVies,"flash");
        balle.reinitialiser();
        if(this.vies<=0){
            //on a perdu pour de vrai
            this.afficheEcranFin();
        }else{
            //on va recommencer une partie
            this.paused=true;
            setTimeout(function(){
                ici.paused=false;
            },3000)
        }
        //toutes les vies ont la classe mort par défaut
        $iconesVies.addClass("mort");
        if(this.vies>=1){
            $(".v1").removeClass("mort");
        }
        if(this.vies>=2){
            $(".v2").removeClass("mort");
        }
        if(this.vies>=3){
            $(".v3").removeClass("mort");
        }
        if(this.vies>=4){
            $(".v4").removeClass("mort");
        }
        if(this.vies>=5){
            $(".v5").removeClass("mort");
        }



    }
    get points() {
        return this._points;
    }
    set points(value) {
        this._points = value;
        this.$points.text(value);
        ElementHtml.effetCss(this.$points,"flash");
    }
    constructor() {
        let me=this;
        this._vies=2;
        this._points=0;
        this.$points=$(".score .value");
        this.$vies=$(".vies .value");
        /**
         * La partie est elle en pause ou non
         * @type {boolean} 
         */
        this.paused = true;
        /**
         * L'écran qui s'affiche au début de la partie avec les instuctions
         * @type {JQuery<HTMLElement>}
         */
        this.$ecranDebut = $(".ecran-debut");
        this.$ecranFin = $(".ecran-fin");
        this.$messageFin = $(".message-fin");
        /**
         * Le bouton pour démarrer une partie
         * @type {JQuery<HTMLElement>}
         */
        this.$btnGo = $(".btn-go");

        this.$btnGo.on("click",function (e) {
            e.preventDefault();
            me.demarreNouveauJeu();
            //plein écran
            //$("body")[0].requestFullscreen();
        });
        //une boucle qui fait tourner notre jeu
        setInterval(() => {
            joueur1.bouge();
            joueur2.bouge();
            if (!me.paused) {
                balle.bouge();
            }
        }, 10);
        //une boucle toutes les 3 secondes qui recalculte les positions et dimenssions au cas où l'écran change de tailleaa
        setInterval(
            function () {
                terrain.calculeTailles();
                joueur1.calculeTailles();
                joueur2.calculeTailles();
                joueur1.calculePositions();
                joueur2.calculePositions();
                balle.calculeTailles();
                balle.calculePositions();
                
            }, 3000
        );
    }
    afficheEcranFin(){
        this.$ecranFin.removeClass("invisible");
        this.$messageFin.text("Bravo, tu as obtenu "+this.points+" points");
        this.paused = true;
        balle.bougePas();
        balle.reinitialiser();
        //balle devient rouge
        terrain.affichePause();
    }
    /**
     * Masque l'écran de début, fait une pause de 3 secondes et lance la balle !
     */
    demarreNouveauJeu() {
        //masque ecran de début
        this.vies=5;
        this.$ecranDebut.addClass("invisible");
        this.$ecranFin.addClass("invisible");
        this.paused = true;
        this.points=0;
        balle.bougePas();
        //balle devient rouge
        terrain.affichePause();
        let me = this;
        //stope pendant 3 secondes
        setTimeout(
            function () {
                terrain.affichePlay();
                me.paused = false;
                balle.reinitialiser();
            },
            3000
        );

    }
}