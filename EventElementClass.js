import EventActionClass from "./EventActionClass.js";

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

    clear() {
        this.actions.forEach(action => action.unbind);
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
                    const flow = callback();
                    if (flow === 'next') {
                        for (let i = 1; i < self.actions.length; i++) {
                            self.actions[i].bind;
                        }
                        self.actions[0].unbind;
                    }
                    if (flow === 'exit') {
                        self.actions[0].unbind;
                    }
                }
                self.callers[1] = ({ callback }) => {
                    const flow = callback();
                    if (flow === 'next') {
                        return 'unbind';
                    }
                    if (flow === 'exit') {
                        self.actions.forEach((value) => value.unbind);
                    }
                    if (flow === 'loop') {

                    } else {
                        reutrn 'unbind';
                    }
                }
                self.actions.forEach((value, index) => {
                    if (index == 0) {
                        value.caller = self.callers[0];
                    } else {
                        value.caller = self.callers[1];
                    }
                })
            },
            get flow() {
                let index = 0;
                self.callers[0] = ({ callback }) => {

                }
            },
        }
    }
}