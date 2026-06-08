import EventActionClass from "./EventActionClass.js";
import EventFlowEnum from "./EventFlowEnum.js";
import EventFlowClass from "./EventFlowClass.js";

/** @typedef {(args : import("./EventActionClass").CallerArgs) => import("./EventActionClass.js").CallerCmd} CallerElement */
/** @typedef {CallerElement[]} Callers */

export default class EventElementClass {
    /** @type {EventActionClass[]} */
    actions = [];
    /** @type {Callers} */
    callers = [];
    /** @type {string} */
    type;

    push(...args) {
        this.actions.push(...args);
        return this;
    }

    get unbind() {
        this.actions.forEach(action => action.unbind);
    }

    clear() {
        this.unbind;
        this.actions = [];
        return this;
    }

    get setup() {
        const self = this;
        return {
            get classic() {
                self.callers[0] = ({ callback }) => { callback(); }
                self.actions.forEach(action => {
                    action.caller = self.callers[0];
                    action.start;
                    action.bind;
                });
            },
            get chain() {
                let number = 0;
                // default
                self.callers[0] = ({ callback }) => {
                    const flow = callback();
                    if (flow === 'loop') {

                    } else if(flow === 'seek') {
                        
                    } else {
                        self.actions[number].unbind;
                        number++;
                        self.actions[number] ? self.actions[number].bind : (number = 0, self.actions[0].bind);
                    }
                }
                self.actions.forEach(action => {
                    action.caller = self.callers[0];
                    action.start;
                });
                self.actions[0] && self.actions[0].bind;
            },
            get cond() {},
            get call() {
                self.callers[0] = ({ callback }) => {
                    /* const flow = callback();
                    if (flow === 'next') {
                        const setmap = new Set();
                        for (let i = 1; i < self.actions.length; i++) {
                            self.actions[i].bind;
                            setmap.add(self.actions[i].target);
                        }
                        self.actions[0].unbind;
                        setmap.forEach(target => {
                            target.rebind;
                        })
                    }
                    if (flow === 'exit') {
                        self.actions[0].unbind;
                    }
                    if (flow === 'quit') {
                        self.actions[0].unbind;
                    } */
                    const flowClass = new EventFlowClass();
                    flowClass.push('next', ()=>{
                        const setmap = new Set();
                        for (let i = 1; i < self.actions.length; i++) {
                            self.actions[i].bind;
                            setmap.add(self.actions[i].target);
                        }
                        self.actions[0].unbind;
                        setmap.forEach(target => {
                            target.rebind;
                        })
                    })
                    flowClass.push('quit', ()=>{
                        self.actions[0].unbind;
                    })
                    
                    flowClass.setEnum( callback() );
                    flowClass.run();
                }
                self.callers[1] = ({ callback }) => {
                    const flow = callback();
                    
                    if (flow === 'next') {
                        return 'unbind';
                    }
                    if (flow === 'exit' || flow === 'quit') {
                        self.unbind;
                        return 'null';
                    }
                    if (flow === 'try') {
                        self.unbind;
                        self.actions[0] && self.actions[0].bind;
                    }
                    if (flow === 'loop') {
                        return 'null';
                    } else {
                        return 'unbind';
                    }
                }
                self.actions.forEach((value, index) => {
                    if (index == 0) {
                        value.caller = self.callers[0];
                    } else {
                        value.caller = self.callers[1];
                    }
                    value.start;
                })
                self.actions[0] && self.actions[0].bind;
                //self.actions[1] && self.actions[1].bind;
            },
            get flow() {
                // let index = 0;
                let count = 0;
                self.callers[0] = ({ callback }) => {
                    switch( callback() ) {
                        case 'loop': return 'null';
                        case 'exit':
                            self.unbind;
                            return 'null';
                        case 'quit':
                            self.unbind;
                            return 'null';
                        case 'next':
                            self.actions[count].unbind;
                            count++;
                            self.actions[count] ? self.actions[number].bind : (number = 0, self.actions[0].bind);
                            return 'null';
                    }
                }
                self.actions[0] && self.actions[0].bind;
            },
       }
    }
}