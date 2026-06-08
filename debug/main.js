

import dedugClass from "./debug.js";
import EventActionClass from "../EventActionClass.js";
import EventElementClass from "../EventElementClass.js";
import SimpleTextClass from "./simpleText.js";
import EventEmitter from "../EventEmitter.js";
import EventHandler from "../EventHandler.js";
import EventFlowEnum from "../EventFlowEnum.js";




/** @returns {void} */
function main() {
    //part1();
    part2();
}

main();

function part2() {
    const eventEmitter = new EventEmitter(document.body);
    const div = document.createElement("div");
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.backgroundColor = "red";
    document.body.appendChild(div);
    const elementEventEmitter = new EventEmitter(div);


    const eventElementClass = new EventElementClass();
    const elementPoint = {};
    elementPoint.x = 0;
    elementPoint.y = 0;
    eventElementClass.push(
        new EventActionClass({
            callback: ({event})=>{
                const rect = event.target.getBoundingClientRect();
                elementPoint.x = event.clientX - rect.left;
                elementPoint.y = event.clientY - rect.top;
                div.style.position = "absolute";
                return "next";
            }, caller: undefined, 
            target: elementEventEmitter,
            tag: "mousedown"
        }), new EventActionClass({
            callback: ({event})=>{

                console.log("move")
                const rect = div.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const dx = x - elementPoint.x;
                const dy = y - elementPoint.y;

                const left = parseInt(div.style.left || 0) + dx;
                const top = parseInt(div.style.top || 0) + dy;

                

                div.style.left = left + "px";
                div.style.top = top + "px";

                return "loop";
            }, caller: undefined,
            target: eventEmitter,
            tag: "mousemove"
        }), new EventActionClass({
            callback: ({event})=>{
                return 'try';
            }, caller: undefined, 
            target: eventEmitter,
            tag: "mouseup"
        }),
    )
    eventElementClass.setup.call;
    elementEventEmitter.bind;
}

function part1() {
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

    const eventEmitter = new EventEmitter(document.body);
    eventEmitter.push("mouseup", e=>{
        console.log("hello");
    });
    eventEmitter.push("mouseup", e=>{
        console.log("world");
    });
    eventEmitter.bind;
    //eventEmitter.claer();
    

    const eventAction = new EventActionClass({
        callback: ({event, tag, target, args}) => {
            console.log("event", ...args);
        },
        caller: ({
            callback, tag, event, target
        }) => {
            callback(["hello", "world"]);
        },
        target: eventEmitter,
        tag: "mouseup"
    });

    eventAction.start
    //eventAction.bind

    eventEmitter.claer();

    const eventElement = new EventElementClass();
    const eventHandler = new EventHandler();
    eventHandler.eventEmitter = eventEmitter;

    const event1 = strings => {
        strings.forEach(string => {
            const action = new EventActionClass({
                callback: ({}) => {
                    //console.log("event", string);
                    const simpleText = new SimpleTextClass();
                    simpleText.innerText = string;
                    console.log(simpleText.view);
                },
                target: eventEmitter,
                tag: "mouseup"
            });
            eventElement.push(action);
        });

        eventElement.setup.chain;
        console.log(eventEmitter.map)
        eventEmitter.bind
    }
    const event2 = strings => {
        const evel = eventHandler.pushCreateEventElement("drag");
        evel.push(
            eventHandler.createEventAction({
                tag : "mousedown",
                callback : args => {
                    
                },

            }),
            eventHandler.createEventAction({
                tag : "mousemove",
                callback : args => {
                    
                },
            }),
            eventHandler.createEventAction({
                tag : "mouseup",
                callback : args => {
                    
                },
            }),
        )
        evel.setup.chain
        eventHandler.eventEmitter.bind
    }
    const settingTextEvent = (Text, event) => {
        const strings = Text.match(/([^\n\r]+)/g);
        event(strings)
    }

    //eventEmitter.bind;

    fetch("./text.txt")
        .then(response => response.text())
        .then(text => settingTextEvent(text, event1));

    console.log("end");

    const efe = new EventFlowEnum()
    efe.value = efe.ctoi('seek') | efe.ctoi('next') | efe.ctoi('null');
    for( const value of efe ) {
        console.log(value)
    }
}