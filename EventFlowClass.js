import EventFlowEnum from "./EventFlowEnum.js";

/**
 * @typedef { () => import("./EventFlowEnum").ACmd } FlowClassFunction
 */
export default class EventFlowClass {
    enum = new EventFlowEnum;
    /**
     * @type { Map<import("./EventFlowEnum").ACmd, FlowClassFunction> }
     */
    map = new Map;

    setEnum( ie ) {
        if( typeof ie === 'string') {
            this.enum.setting = ie;
        } else if( typeof ie === 'number' ) {
            this.enum.value = ie;
        } else {
            this.enum = ie;
        }
        return this;
    }

    /**
     * 
     * @param {import("./EventFlowEnum").ACmd} cmd 
     * @param { ()=>import("./EventFlowEnum").CallerCmd } fun 
     */
    push( cmd, fun ) {
        this.map.set(cmd, fun);
        return this;
    }

    run(  ) {
        for( const cmd of this.enum ) {
            const func = this.map.get(cmd);
            func && (this.enum.value & this.enum.ctoi(cmd)) && func();
        }
        return this;
    }
}