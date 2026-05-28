
class InstantEventClass {
    /** @type {string} */ name;
    /** @type {boolean} */ single;
    /** @type {HTMLElement} */ element;
    /** @type {string} */ tag;
    /** @type {(event: Event) => void} */ action;

    /** @param {{name:string,single:boolean,element:HTMLElement,tag:string,action:(event:Event)=>void}} param0 */
    constructor({name, single, element, tag, action}) {
        this.name = name;
        this.single = single;
        this.element = element;
        this.tag = tag;
        this.action = action;
    }
}

class InstantActionClass {
    /** @type {((event: Event) => void)[]} */
    functionList;

    constructor(...args) {
        this.functionList = [];
        this.push(...args);
    }

    push(...args) {
        this.functionList.push(...args);
    }

    get doing() {
        return e => {
            this.functionList.forEach(action => action(e));
        }
    }
}

export default class SequentClass {
    single = false;
    /** @type {string|null} */
    focusName = null;
    /** @type {HTMLElement|null} */
    focusElement = null;
    /** @type {string|null} */
    focusEventTag = null;
    /** @type {((event: Event) => void)|null} */
    focusEventAction = null;
    flagChain = false;
    /** @type {Map<string, InstantEventClass[]>} */
    instantEvents = new Map();

    /** @param {{element: HTMLElement, tag:string, action:(event:Event)=>void}} param0 */
    deleteEventAction({element, tag, action}) {
        element.removeEventListener(tag, action);
    }

    /** @param {{name:string}} param0 */
    removeEventAction({name}) {
        if(this.instantEvents.has(name)) this.instantEvents.delete(name);
    }

    /** @param {{element: HTMLElement, tag:string, action:(event:Event)=>void, single:boolean}} param0 */
    CreateSigleEventAction({element, tag, action, single = this.single}) {
        return new InstantActionClass(action, single ? (e) => {
            this.deleteEventAction({element, tag, action});
        } : null);
    }

    /** @param {{name:string,single:boolean,element:HTMLElement,tag:string,action:(event:Event)=>void}} param0 */
    instantEventAdd({name, single, element, tag, action}) {
        const event = new InstantEventClass({name, single, element, tag, action});
        if (this.instantEvents.has(name)) {
            this.instantEvents.get(name).push(event);
        } else {
            this.instantEvents.set(name, [event]);
        }
        return this;
    }

    get add() {
        return {
            /** @param {{name:string,tag:string,element:HTMLElement,action:(event:Event)=>void,single:boolean}} param0 */
            classinc: ({name = this.focusName, tag = this.focusEventTag, element = this.focusElement, action = this.focusEventAction, single = false}) => {
                const Action = this.CreateSigleEventAction({element, tag, action, single});
                return this.instantEventAdd({name, single, element, tag, action: Action});
            },
            /** @param {{name:string,tag:string,element:HTMLElement,action:(event:Event)=>void}} param0 */
            single: ({name = this.focusName, tag = this.focusEventTag, element = this.focusElement, action = this.focusEventAction}) => {
                const single = true;
                const Action = this.CreateSigleEventAction({element, tag, action, single});
                return this.instantEventAdd({name, single, element, tag, action: Action});
            },
            /** @param {{name:string,tag:string,element:HTMLElement,action:(event:Event)=>void,single:boolean}} param0 */
            chain: ({name = this.focusName, tag = this.focusEventTag, element = this.focusElement, action = this.focusEventAction, single = false}) => {
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
