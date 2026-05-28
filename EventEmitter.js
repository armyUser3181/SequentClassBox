export default class EventEmitter {

    /** @type {HTMLElement} */
    element;

    /** @type {Map<string, Function[]>} */
    map = new Map();

    binded = false;

    /** @type {Map<string, Function>} */
    #actionMap = new Map();

    /** @param {HTMLElement} element */
    constructor( element ) {
        this.element = element;
    }

    /** @param {string} tag @param {Function} event */
    push( tag, event ) {
        if( this.map.has(tag) ); else {
            this.map.set(tag, []);
        }

        /** @type {Function[]} */
        const list = this.map.get(tag);
        list.push( event );

        this.#actionMapBind = tag;
    }

    /** @param {string} tag @param {Function} event */
    remove( tag, event ) {
        if( this.map.has(tag) ); else return;

        /** @type {Function[]} */
        const list = this.map.get(tag);
        const newList = list.filter(element => event !== element);
        this.map.set(tag, newList);
    }

    /** @param {string} [tag] */
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

    /** @param {string} tag @returns {Function} */
    #createAction(tag) {
        return event=>{
            this.map.get(tag).forEach(action => {
                action(event);
            });
        }
    }

    /** @param {string} key */
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

    /** @returns {boolean} */
    get isBinded() {
        return this.binded;
    }

}
