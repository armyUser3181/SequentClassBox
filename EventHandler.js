import EventActionClass from "./EventActionClass.js";
import EventElementClass from "./EventElementClass.js";
import EventEmitter from "./EventEmitter.js";


export default class EventHandler {
    /** @type {Map<string, EventElementClass>} */
    EventElements = new Map();

    /** @type {EventEmitter} */
    #eventEmitter = null;

    #element;

    set eventEmitter(emitter) {
        this.#eventEmitter = emitter;
    }

    set element(element) {
        if( this.#eventEmitter === null ) this.#eventEmitter = EventEmitter.form(element);
        this.#element = element;
    }

    get eventEmitter() {
        return this.#eventEmitter === undefined || this.#eventEmitter === null ? this.eventEmitter = EventEmitter.form() : this.#eventEmitter;
    }

    get element() {
        return this.#element;
    }

    /** @param { { key : string, value : EventElementClass}[] } list  */
    pushEventElemenets( ...list ) {
        list.forEach( pair =>{
            this.EventElements.set( pair.key, pair.value )
        })
    }

    createEventElement() {
        return new EventElementClass();
    }

    pushCreateEventElement( name ) {
        const rs = this.createEventElement();
        this.pushEventElemenets( {key: name, value: rs} );
        return rs;
    }

    /** @param { import("./EventActionClass").EventActionClassArgs } */
    createEventAction({callback, caller, target = this.eventEmitter, tag}) {
        return new EventActionClass({callback, caller, target, tag});
    }

}