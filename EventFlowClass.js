import EventFlowEnum from "./EventFlowEnum.js";


const subSetEnumFunction = key => {
    const en = new EventFlowEnum();
    
}
/**
 * @typedef { () => import("./EventFlowEnum").ACmd } FlowClassFunction
 */
export default class EventFlowClass {
    inEnum = new EventFlowEnum;
    outEnum = new EventFlowEnum;
    /**
     * @type { Map<import("./EventFlowEnum").ACmd, FlowClassFunction> }
     */
    map = new Map;

    setEnum( ie ) {
        this.inEnum.formSet = ie;
        return this;
    }



    /**
     * 
     * @param { import("./EventFlowEnum.js").AArgs } cmd 
     * @param { ()=>import("./EventFlowEnum").CallerCmd } fun 
     */
    push( cmd, fun ) {
        const enums = new EventFlowEnum();
        enums.formSet = cmd;
        for( const key of enums) {
            this.map.set(key, fun);
        }
        //this.map.set(cmd, fun);
        return this;
    }

    run(  ) {
        for( const cmd of this.inEnum ) {
            const func = this.map.get(cmd);
            if( func && (this.inEnum.value & this.inEnum.ctoi(cmd)) ) {
                const ru = func();
                ru && (this.outEnum.value |= ru );
            }
        }
        return this;
    }

    get returns() {
        return this.outEnum;
    }
}