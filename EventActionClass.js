
import EventEmitter from "./EventEmitter.js"

/** @typedef { keyof HTMLElementEventMap } EventTypeKeyof */
/** @typedef { 'exit' | 'loop' | 'next' | 'null' | 'base' } CmdKeyof */
/** @typedef {{event: Event, target: EventEmitter, tag: EventTypeKeyof, args: any}} CallbackArgs */
/** @typedef {{event: Event, target: EventEmitter, tag: EventTypeKeyof, callback: (args: any) => CmdKeyof}} CallerArgs */
/** @typedef {{callback:(args:CallbackArgs)=>CmdKeyof, caller:(args:CallerArgs)=>void, target:EventEmitter, tag:EventTypeKeyof}} EventActionClassArgs */

export default class EventActionClass {
    /** @param {EventActionClassArgs} param0 */
    constructor({callback, caller, target, tag}) {
        this.callback = callback;
        this.caller = caller;
        this.target = target;
        this.tag = tag;
    }

    /** @type {(args: CallbackArgs) => CmdKeyof} */
    callback;
    /** @type {(event: Event) => (args: CallbackArgs) => CmdKeyof} */
    resolve;
    /** @type {(args: CallerArgs) => void} */
    caller;
    /** @type {(args: CallbackArgs) => void} */
    trigger;
    /** @type {EventEmitter} */
    target;
    /** @type {EventTypeKeyof} */
    tag;
    /** @type {boolean} */
    isBinded = false;

    get start() {
        if(this.isBind) this.unbind;
        this.resolve = (event, flow) => (args) => {
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
