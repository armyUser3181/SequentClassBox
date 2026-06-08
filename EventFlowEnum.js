
/** @typedef { 'quit' | 'exit' | 'loop' | 'next' | 'null' | 'base' | 'seek' | 'try' } CallbackCmd */
/** @typedef { 'unbind' | 'loop' | 'null' } CallerCmd */
/** @typedef { CallbackCmd | CallerCmd } ACmd */

function createFairMap() {
    const list = [ 'quit', 'exit', 'loop', 'next', 'null', 'base', 'seek', 'unbind', 'try' ];
    /** @type {Map<Number, ACmd>} */
    const valmap = new Map()
    /** @type {Map<ACmd, Number>} */
    const keymap = new Map();
    let max = 0;
    list.forEach((value, inds) => {
        const index = 1 << inds;
        keymap.set(index, value);
        valmap.set(value, index);
        max = inds;
    })

    return {
        get iterator() {
            return list.entries();
        },
        [Symbol.iterator]() {
            return list.entries();
        },
        /**
         * @param { string | number } key
         * @returns { string | number }
         */
        get(key) {
            if(typeof key === 'string') {
                return valmap.get(key);
            } else {
                return keymap.get(key);
            }
        },
        getValue(key) {
            return keymap.get(key);
        },
        getInt(key) {
            return valmap.get(key);
        },
        get size() {
            return max;
        }
    }
}

const skmap = createFairMap();


export default class EventFlowEnum {
    /**
     * @param { ACmd } key @returns { Number }
     */
    static ctoi(key) {
        return skmap.getInt(key)
    }

    /**
     * @param { ACmd } key @returns { Number }
     */
    ctoi(key) {
        return EventFlowEnum.ctoi(key)
    }

    /**
     * @param { Number } key @returns { ACmd }
     */
    static itoc(key) {
        return skmap.getValue(key);
    }
    
    /**
     * @param { Number } key @returns { ACmd }
     */
    itoc(key) {
        return EventFlowEnum.itoc(key);
    }

    /**
     * @param {Number} val
     * @returns { Iterator<string> }
     */
    static getIterator(val) {
        let index = 0;
        return {
            next() {
                while( true ) {
                    const order = 1 << index;
                    if( order > val || index > skmap.size ) return { done: true, value: undefined };
                    index++;
                    if( val & order ) return { done: false, value: EventFlowEnum.itoc(order) };
                }
            }
        }
    }

    /**
     * @param {Number} val
     */
    static getIterable(val) {
        return {
            [Symbol.iterator]() {
                return EventFlowEnum.getIterator(val);
            }
        }
    }

    /**
     * @type {Number}
     */
    value = 0;

    /**
     * @param {ACmd} key
     */
    set setting(key) {
        this.value = EventFlowEnum.ctoi(key);
    }

    get getting() {
        return this.value;
    }

    get seek() {
        return EventFlowEnum.itoc(this.value);
    }

    set add(key) {
        this.value |= EventFlowEnum.ctoi(key);
    }

    set sum(key) {
        this.value &= ~EventFlowEnum.ctoi(key);
    }

    [Symbol.iterator]() {
        return EventFlowEnum.getIterator(this.value);
    }

}

