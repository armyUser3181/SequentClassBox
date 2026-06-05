
import EventEmitter from "./EventEmitter.js"

/** @typedef {keyof HTMLElementEventMap} EventTypeKeyof */
/** @typedef { 'loop' | 'next' | 'single' } FlowCmdKeyof */
/** @typedef { ( args: FlowCmdKeyof ) => void } FlowCmd */
/** @typedef {{event: Event, target: EventEmitter, tag: EventTypeKeyof, args: any}} CallbackArgs */
/** @typedef {{event: Event, target: EventEmitter, tag: EventTypeKeyof, callback: (args: any) => FlowCmdKeyof}} CallerArgs */
/** @typedef {{callback:(args:CallbackArgs)=>FlowCmdKeyof, caller:(args:CallerArgs)=>void, target:EventEmitter, tag:EventTypeKeyof}} EventActionClassArgs */

export default class EventActionClass {
    /** @param {EventActionClassArgs} param0 */
    constructor({callback, caller, target, tag}) {
        this.callback = callback;
        this.caller = caller;
        this.target = target;
        this.tag = tag;
    }

    /** @type {(args: CallbackArgs) => void} */
    callback;
    /** @type {(event: Event) => (args: CallbackArgs) => FlowCmdKeyof} */
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
