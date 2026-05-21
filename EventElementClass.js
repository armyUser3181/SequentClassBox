
import EventActionClass from "./EventActionClass.js";

/**
 * @typedef {(args : import("./EventActionClass").CallerArgs) => void} CallerElement
 */
/**
 * @typedef {CallerElement[]} Callers
 */

export default class EventElementClass {

    /**
     * @type {EventActionClass[]}
     */
    actions = [];

    /**
     * @type {Callers}
     */
    callers = [];

    /**
     * @type {string}
     */
    type;
    constructor() {
        
    }

    push(eventAction) {
        this.actions.push(eventAction);
        return this;
    }

    clear() {
        this.actions.forEach(action => action.unbind);
        this.actions = [];
        return this;
    }

    get setup() {
        return {
            classic : ()=>{
                this.callers[0] = ({
                    callback
                }) => {
                    callback();
                }
                this.actions.forEach((action) => {
                    action.caller = this.callers[0];
                });
            },
            chain : ()=>{
                const number = 0;
                this.callers[0] = ({
                    callback
                }) => {
                    callback();
                    this.actions[number].unbind;
                    number++;
                    this.actions[number].bind;
                }
                this.actions.forEach((action) => {
                    action.caller = this.callers[0];
                });
                this.actions[0].bind
            },
            cond : ()=>{
                
            },
            call : ()=>{

            }
        }
    }

    start() {

        return this;
    }
    
}