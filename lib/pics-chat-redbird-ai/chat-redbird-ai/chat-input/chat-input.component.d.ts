import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ChatInputComponent implements OnInit {
    buttonText: string;
    focus: EventEmitter<any>;
    clearSearch: Subject<unknown>;
    send: EventEmitter<any>;
    searchto: EventEmitter<any>;
    dismiss: EventEmitter<any>;
    message: ElementRef;
    ngOnInit(): void;
    focusMessage(): void;
    getMessage(): any;
    clearMessage(): void;
    onSubmit(): void;
    searchText(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChatInputComponent, "app-chat-input", never, { "buttonText": "buttonText"; "focus": "focus"; "clearSearch": "clearSearch"; }, { "send": "send"; "searchto": "searchto"; "dismiss": "dismiss"; }, never, never>;
}
