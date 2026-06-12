import EventFlowEnum from "./EventFlowEnum.js";

/**
 * @typedef { () => import("./EventFlowEnum.js").ACmd } FlowClassFunction
 */

export default class EventFlowClass{


    /**
     * @type { Map<import("./EventFlowEnum").ACmd, FlowClassFunction> }
     */
    functionMap;

    returns;

    constructor() {
        this.values = new EventFlowEnum();
        this.returns = new EventFlowEnum();
        this.functionMap = new Map();
    }

    /**
     * @param {import("./EventFlowEnum.js").ACmd} key @param {FlowClassFunction} fun
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

    /**
     * @param { import("./EventFlowEnum.js").ACmd | EventFlowEnum | Number } ie
     * @override
     */
    setValue( ie ) {
        this.values.formSet = ie;
        return this;
    }

    get returns() {
        return this.returns;
    }

}