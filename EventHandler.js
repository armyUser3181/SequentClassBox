import EventActionClass from "./EventActionClass.js";
import EventElementClass from "./EventElementClass.js";
import EventEmitter from "./EventEmitter.js";


export default class EventHandler {
    /** @type {Map<string, EventElementClass>} */
    EventElements = new Map();

    /** @type {EventEmitter} */
    private__eventEmitter = null;

    private__element;

    set eventEmitter(emitter) {
        this.private__eventEmitter = emitter;
    }

    set element(element) {
        if (this.private__eventEmitter === null) this.private__eventEmitter = EventEmitter.form(element);
        this.private__element = element;
    }

    /**
     * @returns { EventEmitter | null | undefined }
     */
    get eventEmitter() {
        return this.private__eventEmitter === undefined || this.private__eventEmitter === null ? this.eventEmitter = EventEmitter.form() : this.private__eventEmitter;
    }

    get element() {
        return this.private__element;
    }

    /** @param { { key : string, value : EventElementClass}[] } list  */
    pushEventElemenets(...list) {
        list.forEach(pair => {
            this.EventElements.set(pair.key, pair.value)
        })
    }

    createEventElement() {
        return new EventElementClass();
    }

    pushCreateEventElement(name) {
        const rs = this.createEventElement();
        this.pushEventElemenets({ key: name, value: rs });
        return rs;
    }

    /** @param { import("./EventActionClass").EventActionClassArgs } */
    createEventAction({ callback, caller, target = this.eventEmitter, tag }) {
        return new EventActionClass({ callback, caller, target, tag });
    }

}