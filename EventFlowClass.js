import EventFlowEnum from "./EventFlowEnum";

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
            this.enum.value = ie;
        } else {
            this.enum = ie;
        }
    }

    push( cmd, fun ) {
        this.map.set(cmd, fun);
        return this;
    }

    run(  ) {
        for( const cmd of this.enum ) {

        }
        return this;
    }
}