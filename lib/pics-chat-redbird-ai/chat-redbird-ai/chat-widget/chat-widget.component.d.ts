import { ElementRef, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ChatBotRasaService } from '../../@core/service/chatbot-rasa.service';
import { RBACINFO } from '../../@core/urls/chat-redbird-ai-url.config';
import { DataStoreService } from '../../@core/service/data-store.service';
import * as i0 from "@angular/core";
export declare class ChatWidgetComponent implements OnInit {
    private _storeservice;
    bottom: ElementRef;
    theme: 'blue' | 'grey' | 'red';
    botName: string;
    botAvatar: string;
    userAvatar: string;
    url: any;
    startingMessage: any;
    opened: boolean;
    spin: boolean;
    menuList: any[];
    openFeedback: boolean;
    selectedmessage: string;
    selectQuestion: string;
    _visible: boolean;
    private chatService;
    environment: any;
    RBACORG: RBACINFO;
    PERMISSION: any;
    orgSubs: Subscription;
    orgId: any;
    constructor(chatService: ChatBotRasaService, _storeservice: DataStoreService);
    get visible(): boolean;
    set visible(visible: boolean);
    focus: Subject<unknown>;
    clearSearch: Subject<unknown>;
    operator: any;
    client: any;
    messages: any[];
    currentMessages: any[];
    sele: any;
    chart: any;
    addMessage(from: any, text: any, type: 'received' | 'sent', islike: boolean, isdislike: boolean, question: any): void;
    scrollToBottom(): void;
    focusMessage(): void;
    ngOnInit(): void;
    initialize(): void;
    toggleChat(): void;
    sendMessage({ message }: any): void;
    searchMessage({ message }: any): void;
    handleKeyboardEvent(event: KeyboardEvent): void;
    closeChatBot(): void;
    showMessage(message: any): any;
    showTable(message: any, type: any): any;
    getHeaderName(message: any): any;
    getColumnData(message: any): any;
    raiseQuestions(message: any): void;
    selectMessage(message: any): void;
    toClearSearch(): void;
    downloadFile(message: any): void;
    toggleShow(): void;
    activeLike(message: any): void;
    activeDisLike(message: any): void;
    getLikeStatus(message: any): boolean;
    getDisLikeStatus(message: any): boolean;
    sendFeedback(message: any): void;
    closeFeedback(): void;
    sendMenuKey(message: any): any;
    getChatBotInfo(_modal: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChatWidgetComponent, "app-chat-widget", never, { "theme": "theme"; "botName": "botName"; "botAvatar": "botAvatar"; "userAvatar": "userAvatar"; "url": "url"; "startingMessage": "startingMessage"; "opened": "opened"; "visible": "visible"; }, {}, never, never>;
}
