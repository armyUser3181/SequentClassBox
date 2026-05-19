
export default class EventActionClass {
    /**
     * 
     * @param {{callback: (event: Event) => void, ({event: Event, target: Element, tag: string, callback: (event: Event) => void}) => void, target: Element, tag: string}} param0 
     */
    constructor({callback, caller, target, tag}) {
        this.callback = callback;
        this.caller = caller;
        this.target = target;
        this.tag = tag;
    }

    /**
     * @type {(event: Event) => void}
     */
    callback;
    /**
     * @type {({event: Event, target: Element, tag: string, callback: (event: Event) => void}) => void}
     */
    caller;
    /**
     * @type {(event: Event) => void}
     */
    trigger;

    /**
     * @type {Element}
     */
    target;
    /**
     * @type {string}
     */
    tag;

    start() {
        if(this.isBind) this.unbind;
        this.trigger = event => this.caller({event : event, target : this.target, tag : this.tag, callback : this.callback});
    }

    /**
     * @type {boolean}
     */
    isBinded = false;
    get isBind() {
        return this.isBinded;
    }

    get bind() {
        this.isBinded = true;
        this.target.addEventListener(this.trigger);
    }

    get unbind() {
        this.isBinded = false;
        this.target.removeEventListener(this.trigger);
    }

}
