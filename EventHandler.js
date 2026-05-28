
class EventSuperArgs {
    constructor() {

    }
}

class EventClassicArgs extends EventSuperArgs {
    
    constructor() {
        super();
    }
}

export default class EventHandler {
    EventElements = new Map();

}