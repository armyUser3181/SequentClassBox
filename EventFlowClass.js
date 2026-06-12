import EventFlowEnum from "./EventFlowEnum.js";


/* const subSetEnumFunction = key => {
    const en = new EventFlowEnum();
} */

/**
 * @typedef { () => import("./EventFlowEnum").ACmd } FlowClassFunction
 */


export default class FlowClass {

    constructor() {
        this.values
        this.returns
    }

    setValue(element) {
        this.values = element;
    }

    
    functionMap = new Map;

    /**
     * 
     * @param { import("./EventFlowEnum.js").AArgs } cmd 
     * @param { ()=>import("./EventFlowEnum").CallerCmd } fun 
     */
    push( cmd, fun ) {
        const enums = new EventFlowEnum();
        enums.formSet = cmd;
        for( const key of enums) {
            this.functionMap.set(key, fun);
        }
        //this.map.set(cmd, fun);
        return this;
    }

    run(  ) {
        for( const cmd of this.values ) {
            const func = this.functionMap.get(cmd);
            if( func && (this.values.value & this.values.ctoi(cmd)) ) {
                const ru = func();
                ru && (this.returns.value |= ru );
            }
        }
        return this;
    }

    get returns() {
        return this.returns;
    }

}

export default class EventFlowClass extends FlowClass {

    constructor() {
        super();
        this.values = new EventFlowEnum;
        this.returns = new EventFlowEnum;
        this.push = this.push;
        this.run = this.run;

        /**
     * @type { Map<import("./EventFlowEnum").ACmd, FlowClassFunction> }
     */
        this.functionMap = this.functionMap
    }

    /**
     * @override
     */
    setValue( ie ) {
        this.values.formSet = ie;
        return this;
    }

}