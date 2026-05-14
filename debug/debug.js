
export default class dedugClass {
    constructor() {

    }

    getPrint(func, flag, front, end) {
        return (...args)=>{
            if(flag) {
                if(typeof args[0] === "string") {
                    func( front + args.join(" ") + end );
                } else func(front, ...args, end);
            }
        }
    }

    getLog(flag, front, end) {
        return this.getPrint(console.log, flag, front, end);
    }

    getError(flag, front, end) {
        return this.getPrint(console.error, flag, front, end);
    }

    

}