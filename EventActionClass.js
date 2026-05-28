
import EventEmitter from "./EventEmitter.js"

/** @typedef {{event: Event, target: EventEmitter, tag: string, args: any}} CallbackArgs */
/** @typedef {{event: Event, target: EventEmitter, tag: string, callback: (args: any) => any}} CallerArgs */

export default class EventActionClass {
    /** @param {{callback:(args:CallbackArgs)=>void, caller:(args:CallerArgs)=>void, target:EventEmitter, tag:string}} param0 */
    constructor({callback, caller, target, tag}) {
        this.callback = callback;
        this.caller = caller;
        this.target = target;
        this.tag = tag;
    }

    /** @type {(args: CallbackArgs) => void} */
    callback;
    /** @type {(event: Event) => (args: CallbackArgs) => void} */
    resolve;
    /** @type {(args: CallerArgs) => void} */
    caller;
    /** @type {(args: CallbackArgs) => void} */
    trigger;
    /** @type {EventEmitter} */
    target;
    /** @type {string} */
    tag;
    /** @type {boolean} */
    isBinded = false;

    get start() {
        if(this.isBind) this.unbind;
        this.resolve = (event) => (args) => {
            return this.callback({ event, target: this.target, tag: this.tag, args });
        }
        this.trigger = event => {
            this.event = event;
            this.caller({ event, target: this.target, tag: this.tag, callback: this.resolve(event) });
        }
    }

    get isBind() {
        return this.isBinded;
    }

    get bind() {
        this.isBinded = true;
        this.target.addEventListener(this.tag, this.trigger);
    }

    get unbind() {
        this.isBinded = false;
        this.target.removeEventListener(this.tag, this.trigger);
    }
}
