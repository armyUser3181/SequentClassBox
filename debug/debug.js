export default class dedugClass {
    /** @param {Function} func @param {boolean} flag @param {string} front @param {string} end */
    getPrint(func, flag, front, end) {
        return (...args)=>{
            if(flag) {
                if(typeof args[0] === "string") {
                    func(front + args.join(" ") + end);
                } else func(front, ...args, end);
            }
        }
    }

    /** @param {boolean} flag @param {string} front @param {string} end */
    getLog(flag, front, end) {
        return this.getPrint(console.log, flag, front, end);
    }

    /** @param {boolean} flag @param {string} front @param {string} end */
    getError(flag, front, end) {
        return this.getPrint(console.error, flag, front, end);
    }
}
