
import EventActionClass from "./EventActionClass.js";

export default class EventElementClass {

    /**
     * @type {EventActionClass[]}
     */
    eventActions = [];

    /**
     * @type {string}
     */
    type;
    constructor() {
        
    }

    push(eventAction) {
        this.eventActions.push(eventAction);
        return this;
    }

    clear() {
        this.eventActions.forEach(action => action.unbind);
        this.eventActions = [];
        return this;
    }

    get setup() {
        return {
            classic : ()=>{
                
            },
            chain : ()=>{

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