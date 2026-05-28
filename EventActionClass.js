
import EventEmitter from "./EventEmitter.js"

/**
 * @typedef {Object} CallbackArgs
 * @property {Event} event
 * @property {EventEmitter} target
 * @property {string} tag
 * @property {any} args
 */

/**
 * @typedef {Object} CallerArgs
 * @property {Event} event
 * @property {EventEmitter} target
 * @property {string} tag
 * @property {(args: any) => any} callback
 */

/**
 * mechode getter only
 */

export default class EventActionClass {
    /**
     * 
     * @param {callback : (args: CallbackArgs) => void, caller : (args: CallerArgs) => void, target : EventEmitter, tag : string} param0 
     */
    constructor({callback, caller, target, tag}) {
        this.callback = callback;
        this.caller = caller;
        this.target = target;
        this.tag = tag;
    }

    /**
     * @type {(args: CallbackArgs) => void}
     */
    callback;
    /**
     * @type {(event: Event) => (args: CallbackArgs) => void}
     */
    resolve;
    /**
     * @type {(args: CallerArgs) => void}
     */
    caller;
    /**
     * @type {(args: CallbackArgs) => void}
     */
    trigger;

    /**
     * @type {EventEmitter}
     */
    target;
    /**
     * @type {string}
     */
    tag;

    get start() {
        if(this.isBind) this.unbind;
        this.resolve = (event) => (args) => {
            return this.callback({ event : event, target : this.target, tag : this.tag, args: args});
        }
        this.trigger = event => {
            this.event = event;
            this.caller({ event : event, target : this.target, tag : this.tag, callback : this.resolve(event) });
        }
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
        this.target.addEventListener(this.tag, this.trigger);
    }

    get unbind() {
        this.isBinded = false;
        this.target.removeEventListener(this.tag, this.trigger);
    }

}
