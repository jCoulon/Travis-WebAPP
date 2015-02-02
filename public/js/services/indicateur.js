/**
 * Created by jonathancoulon on 27/01/15.
 */
function IndicateurModel() {
    /**
     *Classe
     * @param style
     * @param niveau
     * @constructor
     */
    function Indicateur(style, niveau,data) {
        this._style = style;
        this._niveau = niveau;
        this._data = data;
    };

    /**
     *METHODE PUBLIQUE
     * @type {{getStyle: Function, getNiveau: Function, setData: Function}}
     */
    Indicateur.prototype = {
        getStyle: function () {
            return this._style;
        },
        getNiveau: function () {
            return this._niveau;
        },
        setData: function (data) {
            this._data = data;
        }

    };
    return Indicateur;
};

function UserModel(){

    function User(logIn,rights){
        this._logIn = login;
        this._rights = rights;
    };



};

/**
 Un service ou on charge les indicateurs déjà enregistré par l'user
 **/
