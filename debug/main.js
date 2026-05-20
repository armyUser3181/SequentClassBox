
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
        callback: (event) => {
            console.log("event", event);
        },
        caller: ({
            
        }) => {
            console.log("caller", event);
        },
        target: document.body,
        tag: "click"
    });

}

main();