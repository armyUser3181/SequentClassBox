

import dedugClass from "./debug.js";
import EventActionClass from "../EventActionClass.js";
import EventElementClass from "../EventElementClass.js";
import SimpleTextClass from "./simpleText.js";

function main() {
    const d = new dedugClass();

    const flag = true;
    const front = "welcome to ";
    const end = " for you";
    
    const print = d.getPrint(console.log, flag, front, end);
    const log = d.getLog(flag, front, end);
    const error = d.getError(flag, front, end);

    print("hello", "world");

    const simpleText = new SimpleTextClass();
    simpleText.innerText = "hello world";
    console.log(simpleText.view);

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
    //eventAction.bind


    const eventElement = new EventElementClass();
    const settingTextEvent = Text => {
        const strings = Text.match(/([^\n\r]+)/g);

        strings.forEach(string => {
            const action = new EventActionClass({
                callback: ({}) => {
                    //console.log("event", string);
                    const simpleText = new SimpleTextClass();
                    simpleText.innerText = string;
                    console.log(simpleText.view);
                },
                target: document.body,
                tag: "mouseup"
            });
            eventElement.push(action);
        });

        eventElement.setup.chain;
    }

    fetch("./text.txt")
        .then(response => response.text())
        .then(text => settingTextEvent(text));

    console.log("end");
    
}

main();