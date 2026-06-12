import { EventTypeKeyof } from "./EventActionClass";
import EventEmitter from "./EventEmitter";

export interface CallInArgsIncallbackInEventActionClassType {
    set target( arg : number | 'next' | 'front' | 'this' | 'start' )
    
}

export interface ArgsIncallbackInEventActionClassType {
    event : Event
    target : EventEmitter | HTMLElement
    tag : EventTypeKeyof
    args : any
    call : CallInArgsIncallbackInEventActionClassType

}