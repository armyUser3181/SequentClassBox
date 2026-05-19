


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
     * @type { [(event: Event) => void] } functionList
     */
    functionList;
    constructor(...args) {
        this.functionList = [];
        this.push(...args);
    }

    push(...args) {
        this.functionList.push(...args);
    }

    get doing() {
        return e=>{
            this.functionList.forEach(action=>action(e));
        }
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
    flagChain = false
    

    /**
     * @type {Map<string, [InstantEventClass]>} instantEvents
     */
    instantEvents = new Map()

    /**
     * 
     * @param {{element: HTMLElement, tag: string, action: (event: Event) => void}} param0 
     */
    deleteEventAction({element, tag, action}) {
        element.removeEventListener(tag, action);
    }

    removeEventAction({name}) {
        if(this.instantEvents.has(name)) this.instantEvents.delete(name)
    }

    CreateSigleEventAction({element, tag, action, single = this.single}) {
        return new InstantActionClass(action, single ? (e)=>{
            this.deleteEventAction({element, tag, action: action});
        } : null);
    }

    /**
     * @param {{name: string, single: boolean, element: HTMLElement, tag: string, action: (event: Event) => void}} param0
     */
    instantEventAdd({name, single, element, tag, action}) {
        const event = new InstantEventClass({name, single, element, tag, action });
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
                const Action = this.CreateSigleEventAction({element, tag, action, single});
                return this.instantEventAdd({name, single, element, tag, action: Action});
            },
            single: ({name = this.focusName, tag = focusEventTag, element = this.focusElement, action = this.focusEventAction}) => {
                const single = true;
                const Action = this.CreateSigleEventAction({element, tag, action, single});
                return this.instantEventAdd({name, single, element, tag, action: Action});
            },
            chain: ({name = this.focusName, tag = focusEventTag, element = this.focusElement, action = this.focusEventAction, single = false}) => {

                if(this.instantEvents.has(name)) {
                    single = false;
                }
                const Action = this.CreateSigleEventAction({element, tag, action, single});
                
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
