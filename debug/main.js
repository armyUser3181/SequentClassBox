

import dedugClass from "./debug.js";
import EventActionClass from "../EventActionClass.js";
import EventElementClass from "../EventElementClass.js";
import SimpleTextClass from "./simpleText.js";
import EventEmitter from "../EventEmitter.js";
import EventHandler from "../EventHandler.js";
import EventFlowEnum from "../EventFlowEnum.js";
import simpleText from "./simpleText.js";




/** @returns {void} */
function main() {
    //part1();
    //part2();
    part3();
}

main();

function part3() {
    const htmlEmitter = new EventEmitter(document)


    const deg = new dedugClass();
    const dlog = deg.getLog(true, '', '');

    const createWindow = ( { width = '200px', height = '200px', color = 'red', headerWidth = '20px', backgroundColor = 'white', borderStyle = 'solid', borderColor = 'black'  }) => {
        const args = { width, height, color, headerWidth, backgroundColor, borderStyle, borderColor };
        const window = document.createElement('div');
        window.style.width = args.width; window.style.height = args.height; window.style.backgroundColor = args.backgroundColor;
        window.style.padding = '0px';
        window.style.borderStyle = args.borderStyle; window.style.borderColor = args.borderColor;
        const windowHeader = document.createElement('div');
        windowHeader.style.margin = '0px';
        //windowHeader.style.borderStyle = args.borderStyle; windowHeader.style.borderColor = args.borderColor;
        windowHeader.style.height = args.headerWidth;
        windowHeader.style.backgroundColor = args.color;
        windowHeader.className = 'headerInWindow'
        window.appendChild(windowHeader);
        return window;
    }

    const settingDragThis = ( { element, outEmitter, inEmitter } ) => {
        if( element instanceof HTMLDivElement && outEmitter instanceof EventEmitter && inEmitter instanceof EventEmitter ) {
            const eventHandler = new EventHandler
            const eventElement = eventHandler.createEventElement()
            const rectInElement = {}
            rectInElement.x = 0
            rectInElement.y = 0
            eventElement.push(
                new EventActionClass({
                    callback: ({event: args_event})=>{
                        /**
                         * @type { MouseEvent }
                         */
                        const event = args_event;
                        /* const rect = element.getBoundingClientRect()
                        rectInElement.x = - ( event.clientX + rect.x )
                        rectInElement.y = - ( event.clientY + rect.y ) */
                        rectInElement.x = -event.clientX;
                        rectInElement.y = -event.clientY;
                        element.style.position = 'absolute'
                        //dlog('hello')
                        return 'next'
                    }, caller: undefined,
                    tag: 'mousedown',
                    target: inEmitter
                }),
                new EventActionClass({
                    callback: ({event: args_event})=>{
                        /**
                         * @type { MouseEvent }
                         */
                        const event = args_event;
                        const x = event.clientX + rectInElement.x
                        const y = event.clientY + rectInElement.y
                        const setPx = val => `${val}px`
                        element.style.left = setPx(x)
                        element.style.top = setPx(y)
                    }, caller: undefined,
                    tag: 'mousemove',
                    target: outEmitter
                }),
                new EventActionClass({
                    callback: ({})=>{
                        return 'try'
                    }, caller: undefined,
                    tag: 'mouseup',
                    target: outEmitter
                })
            )

            eventElement.setup.call
            inEmitter.bind
        }
    }

    const settingWindows = ( { __element = createWindow({}) } ) => {
        const element = {};
        element.element = __element;
        element.header = element.element.childNodes.item(0);
        element.thisEmitter = new EventEmitter(element.element);
        element.headEmitter = new EventEmitter(element.header);

        settingDragThis({element: element.element, inEmitter: element.headEmitter, outEmitter: htmlEmitter })
        document.body.appendChild(element.element);
        //dlog(element.element.childNodes.item(0));
    }

    settingWindows({});
}

function part2() {
    const eventEmitter = new EventEmitter(document.getElementsByTagName('html').item(0));

    const createDiv = ({ width = "200px", height = "200px", color = "red" }) => {
        const div = document.createElement('div');
        div.style.width = width; div.style.height = height; div.style.backgroundColor = color;
        return div;
    }
    const settingDiv = ( args = { element: createDiv({}), } )=>{
        const div = {};
        div.element = args.element;
        div.eventEmitter = new EventEmitter(div.element);
        document.body.appendChild(div.element);
        div.eventElement = new EventElementClass();
        div.dragPoint = {};
        div.dragPoint.x = 0;
        div.dragPoint.y = 0;
        const labels = new simpleText();
        labels.setPoint = { right: '40px', top: '40px' };
        div.eventElement.push(
            new EventActionClass({
                callback: ({event})=>{
                    event.target.style.position = "absolute";
                    const rect = event.target.getBoundingClientRect();
                    div.dragPoint.x = event.clientX - rect.left;
                    div.dragPoint.y = event.clientY - rect.top;
                    event.target.style.left = rect.left + 'px';
                    event.target.style.top = rect.top + 'px';
                    return "next";
                }, caller: undefined, 
                target: div.eventEmitter,
                tag: "mousedown"
            }), new EventActionClass({
                callback: ({event})=>{
                    const left = event.clientX - div.dragPoint.x;
                    const top = event.clientY - div.dragPoint.y;
                    div.element.style.left = left + "px";
                    div.element.style.top = top + "px";
                    const outString = `${left}px / ${top}px`;
                    labels.innerText = outString;
                    //labels.bind;
                    return "loop";
                }, caller: undefined,
                target: eventEmitter,
                tag: "mousemove"
            }), new EventActionClass({
                callback: ({})=>{
                    return 'try';
                }, caller: undefined, 
                target: eventEmitter,
                tag: "mouseup"
            }),
        )
        div.eventElement.setup.call;
        div.eventEmitter.bind;
        return div;
    }
    const divElements = [
        createDiv({color: 'red'}),
        createDiv({color: 'blue'}),
        createDiv({color: 'yellow'}),
    ]

    const divs = [];

    for( const element of divElements ) {
        divs.push( settingDiv({element: element}) );
    }
    
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