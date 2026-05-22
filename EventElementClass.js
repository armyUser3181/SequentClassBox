
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
    actions = new Array();

    /**
     * @type {Callers}
     */
    callers = new Array();

    /**
     * @type {string}
     */
    type;
    constructor() {
        
    }

    push( ...args ) {
        this.actions.push(...args);
        return this;
    }

    clear() {
        this.actions.forEach(action => action.unbind);
        this.actions = [];
        return this;
    }

    get setup() {
        const self = this;
        return {
            get classic() {
                
                self.callers[0] = ({
                    callback
                }) => {
                    callback();
                }
                self.actions.forEach((action) => {
                    action.caller = self.callers[0];
                    action.start;
                    action.bind;
                });
                
            },
            get chain() {
                let number = 0;
                self.callers[0] = ({
                    callback
                }) => {
                    callback();
                    self.actions[number].unbind;
                    number++;
                    self.actions[number] ? self.actions[number].bind : (number = 0, self.actions[0].bind);
                }
                self.actions.forEach((action) => {
                    action.caller = self.callers[0];
                    action.start;
                });
                self.actions[0] && self.actions[0].bind;
            },
            get cond() {
                
            },
            get call() {

            }
        }
    }
    
}