import EventEmitter from "./EventEmitter.js"
import EventFlowClass from "./EventFlowClass.js";

/** @typedef { keyof HTMLElementEventMap } EventTypeKeyof */
/** @typedef { import("./EventFlowEnum.js").CallbackCmd } CallbackCmd  */
/** @typedef { import("./EventFlowEnum.js").CallerCmd } CallerCmd  */
// /** @typedef {{event: Event, target: EventEmitter, tag: EventTypeKeyof, args: any}} CallbackArgs */
/** @typedef { import("./argsTypes.js").ArgsIncallbackInEventActionClassType } CallbackArgs */
/** @typedef {{event: Event, target: EventEmitter, tag: EventTypeKeyof, callback: (args: any) => CallbackCmd}} CallerArgs */
/** @typedef {{callback:(args:CallbackArgs)=>CallbackCmd, caller:(args:CallerArgs)=>void, target:EventEmitter, tag:EventTypeKeyof}} EventActionClassArgs */

export default class EventActionClass {
    /** @param {EventActionClassArgs} param0 */
    constructor({ callback, caller, target, tag }) {
        this.callback = callback;
        this.caller = caller;
        this.target = target;
        this.tag = tag;
    }

    /** @type {(args: CallbackArgs) => CallbackCmd} */
    callback;
    /** @type {(event: Event) => (args: CallbackArgs) => CallbackCmd} */
    resolve;
    /** @type {(args: CallerArgs) => CallerCmd} */
    caller;
    /** @type {(event : Event) => void} */
    trigger;
    /** @type {EventEmitter} */
    target;
    /** @type {EventTypeKeyof} */
    tag;
    /** @type {boolean} */
    isBinded = false;
    /** @type {import("./argsTypes.js").CallInArgsIncallbackInEventActionClassType} */
    call

    get start() {
        if (this.isBind) this.unbind;
        this.call = {
            set target( arg ) {
                if( typeof arg === 'number') {

                }
                
            }
        }
        this.resolve = (event) => (args) => {
            return this.callback({ event, target: this.target, tag: this.tag, call: {}, args });
        }
        this.trigger = event => {
            this.event = event;
            const key = this.caller({ event, target: this.target, tag: this.tag, callback: this.resolve(event) });
            if(key) {
                const flowClass = new EventFlowClass()
                flowClass.push('unbind', ()=>{
                    this.unbind;
                })

                flowClass.setValue = key;
                flowClass.run();

            }
        }
    }

    get isBind() {
        return this.isBinded;
    }

    get bind() {
        this.isBinded = true;
        this.target.addEventListener(this.tag, this.trigger);
        return this;
    }

    get unbind() {
        this.isBinded = false;
        this.target.removeEventListener(this.tag, this.trigger);
        return this;
    }


}