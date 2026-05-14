
/*

classic ->
single ->
loop ->
chain -> one / one / one
condition -> event - condition - action
call -> one / event

add
delete



*/

class InstantEventClass {
    /**
     * @type {string} name
     * @type {boolean} single
     * @type {HTMLElement} element
     * @type {string} tag
     * @type { (event: Event) => void } action
     */
    name; single; element; tag; action;
    constructor({name, single, element, tag, action}) {
        this.name = name;
        this.single = single;
        this.element = element;
        this.tag = tag;
        this.action = action;
    }
}

class InstantActionClass {
    
    /**
     * @type { (event: Event) => void } call
     */
    call;
    /**
     * @param { (event: Event) => void } call
     */
    constructor(call) {
        this.call = call;
    }
}

export default class SequentClass {

    /**
     * @type {boolean} single
     * @type {string} focusName
     * @type {HTMLElement} htmlElement
     * @type {string} focusEventTag
     * @type {(event: Event) => void} focusEventAction
     */
    single = false
    focusName = null
    focusElement = null
    focusEventTag = null
    focusEventAction = null

    /**
     * @type {Map<string, [InstantEventClass]>} instantEvents
     */
    instantEvents = new Map()

    /**
     * 
     * 
     */
    instantEventAdd({name, single, element, tag, action}) {
        const event = new instantEventClass({name, single, element, tag, action : new InstantActionClass(action) });
        if (this.instantEvents.has(name)) {
            this.instantEvents.get(name).push(event);
        } else {
            this.instantEvents.set(name, [event]);
        }
        return this;
    }

    constructor() {
        
    }

    get add() {
        return {
            /**
             * @param {{name: string, tag: string, element: HTMLElement, action: (event: Event) => void, single: boolean}} param0
             */
            classinc: ({name = this.focusName, tag = focusEventTag, element = this.focusElement, action = this.focusEventAction, single = false}) => {
                return this.instantEventAdd({name, single, element, tag, action});
            },
            single: ({name = this.focusName, tag = focusEventTag, element = this.focusElement, action = this.focusEventAction}) => {
                return this.instantEventAdd({name, single: true, element, tag, action});
            },
            chain: ({name = this.focusName, tag = focusEventTag, element = this.focusElement, action = this.focusEventAction}) => {
                const chainAction = e => {
                    
                }
                return this.instantEventAdd({name, single: false, element, tag, action: chainAction});
            }

        }
    }

    get get() {
        return {}
    }

    get delete() {
        return {}
    }
    
    
}
