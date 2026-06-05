export default class EventEmitter {

    /** @type {HTMLElement} */
    element;

    /** @type {Map<string, Function[]>} */
    map = new Map();

    binded = false;

    /** @type {Map<string, Function>} */
    private__actionMap = new Map();

    /** @param {HTMLElement} element */
    constructor(element) {
        this.element = element;
    }

    /** @param {HTMLElementEventMap} tag @param {Function} event */
    push(tag, event) {
        if (this.map.has(tag));
        else {
            this.map.set(tag, []);
        }

        /** @type {Function[]} */
        const list = this.map.get(tag);
        list.push(event);

        this.private__actionMapBind = tag;
    }

    /** @param {HTMLElementEventMap} tag @param {Function} event */
    remove(tag, event) {
        if (this.map.has(tag));
        else return;

        /** @type {Function[]} */
        const list = this.map.get(tag);
        const newList = list.filter(element => event !== element);
        this.map.set(tag, newList);
    }

    /** @param {HTMLElementEventMap} [tag] */
    claer(tag) {
        if (undefined === tag) {
            this.unbind;
            this.map.clear();
            this.private__actionMap.clear();
        } else {
            this.map.set(tag, []);
        }
    }

    addEventListener = this.push;
    removeEventListener = this.remove;

    /** @param {HTMLElementEventMap} tag @returns {Function} */
    private__createAction(tag) {
        return event => {
            this.map.get(tag).forEach(action => {
                action(event);
            });
        }
    }

    /** @param {string} key */
    set private__actionMapBind(key) {
        if (this.private__actionMap.has(key));
        else {
            this.private__actionMap.set(key, this.private__createAction(key));
        }
    }

    get private__actionMapBinds() {
        for (const key of this.map.keys()) {
            this.private__actionMapBind(key);
        }
    }

    get bind() {
        if (this.isBinded) return;
        for (const key of this.map.keys()) {
            this.element.addEventListener(key, this.private__actionMap.get(key));
        }
        this.binded = true;
    }

    get unbind() {
        if (this.isBinded);
        else return;
        for (const key of this.map.keys()) {
            this.element.removeEventListener(key, this.private__actionMap.get(key));
        }
        this.binded = false;
    }

    /** @returns {boolean} */
    get isBinded() {
        return this.binded;
    }


    static private__weak = new WeakMap();

    private__weakPush() {
        EventEmitter.private__weak.set(this.element, this);
        return this;
    }

    static find(element) {
        const rs = EventEmitter.private__weak.get(element);
        return rs === undefined ? null : rs;
    }

    static form(element = document.body) {
        const rs = EventEmitter.find(element);
        if (rs !== null) return rs;
        const emitter = new EventEmitter(element);
        emitter.private__weakPush();
        return emitter;
    }


}