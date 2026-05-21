
import dedugClass from "./debug.js";
import EventActionClass from "../EventActionClass.js";

function main() {
    const d = new dedugClass();


    const flag = true;
    const front = "welcome to ";
    const end = " for you";
    
    const print = d.getPrint(console.log, flag, front, end);
    const log = d.getLog(flag, front, end);
    const error = d.getError(flag, front, end);

    print("hello", "world");

    const eventAction = new EventActionClass({
        callback: ({event, tag, target, args}) => {
            console.log("event", ...args);
        },
        caller: ({
            callback, tag, event, target
        }) => {
            callback(["hello", "world"]);
        },
        target: document.body,
        tag: "mouseup"
    });

    eventAction.start
    eventAction.bind


}

main();