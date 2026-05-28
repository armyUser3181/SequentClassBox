
export default class EventEmitter {

    element;
    map = new Map();
    binded = false;
    #actionMap = new Map();
    /** 
     * @param {HTMLElement} element 
     */
    constructor( element ) {
        this.element = element;
    }

    push( tag, event ) {
        if( this.map.has(tag) ); else {
            this.map.set(tag, []);
        }

        /**
         * @type { [Funcion] } list
         */
        const list = this.map.get(tag);
        list.push( event );

        this.#actionMapBind = tag;
    }

    remove( tag, event ) {
        if( this.map.has(tag) ); else return;

        /**
         * @type { [Funcion] } list
         */
        const list = this.map.get(tag);
        const newList = list.filter(element => event !== element);
        this.map.set(tag, newList);
        //console.log(list, newList, this.map.get(tag));
    }

    claer(tag) {
        if(undefined === tag ) {
            this.unbind;
            this.map.clear();
            this.#actionMap.clear();
        } else {
            this.map.set(tag, []);
        }
    }

    addEventListener = this.push;
    removeEventListener = this.remove;

    #createAction(tag) {
        return event=>{
            this.map.get(tag).forEach(action => {
                action(event);
            });
        }
    }

    set #actionMapBind(key) {
        if(this.#actionMap.has(key)); else {
            this.#actionMap.set(key, this.#createAction(key));
        }
    }

    get #actionMapBinds() {
        for( const key of this.map.keys() ) {
            this.#actionMapBind(key);
        }
    }

    get bind() {
        if( this.isBinded ) return;
        for( const key of this.map.keys() ) {
            this.element.addEventListener(key, this.#actionMap.get(key));
        }
        this.binded = true;
    }

    get unbind() {
        if( this.isBinded ); else return;
        for( const key of this.map.keys() ) {
            this.element.removeEventListener(key, this.#actionMap.get(key));
        }
        this.binded = false;
    }

    get isBinded() {
        return this.binded;
    }





}