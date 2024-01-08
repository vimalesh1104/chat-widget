import * as i0 from '@angular/core';
import { Injectable, Component, Input, EventEmitter, ViewEncapsulation, Output, ViewChild, Pipe, HostListener, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { debounceTime, map } from 'rxjs/operators';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import * as i1$1 from '@angular/router';
import { NavigationStart } from '@angular/router';
import 'rxjs/add/operator/map';
import { throwError } from 'rxjs/internal/observable/throwError';

class ChatRedbirdAiService {
    constructor() { }
}
ChatRedbirdAiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatRedbirdAiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ChatRedbirdAiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatRedbirdAiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatRedbirdAiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class RBACINFO {
    constructor() {
        this.apiHost = '';
        this.tokenKey = '';
    }
}
class Environment {
}

class Store {
    constructor(initialState) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable();
    }
    get state() {
        return this._state$.getValue();
    }
    setState(nextState) {
        this._state$.next(nextState);
    }
}

class PermissionStore extends Store {
    constructor() {
        super({});
    }
    setStore(data) {
        if (data) {
            this.setState(Object.assign(Object.assign({}, this.state), data));
        }
    }
    getStore(type = 'P') {
        if (type === 'P')
            return of(this.state);
        else
            return of(this.state);
    }
    flat(array) {
        let result = [];
        if (array) {
            array.forEach(item => {
                result.push(item);
                if (item && Array.isArray(item)) {
                    result = result.concat(this.flat(item));
                }
            });
        }
        return result;
    }
}
PermissionStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PermissionStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PermissionStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class DataStoreService {
    constructor() {
        this.currentStoreSubject = new BehaviorSubject({});
        this.currentStore = this.currentStoreSubject.asObservable();
        // test code
    }
    setData(key, value) {
        const currentStore = this.getCurrentStore();
        currentStore[key] = value;
        this.currentStoreSubject.next(currentStore);
    }
    setObject(value) {
        this.currentStoreSubject.next(value);
    }
    getData(key) {
        const currentStore = this.getCurrentStore();
        return currentStore[key];
    }
    clearStore() {
        const currentStore = this.getCurrentStore();
        Object.keys(currentStore).forEach((key) => {
            delete currentStore[key];
        });
        this.currentStoreSubject.next(currentStore);
    }
    getCurrentStore() {
        return this.currentStoreSubject.value;
    }
}
DataStoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DataStoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [style({ opacity: 0 }), animate(250)]),
    transition('* => void', [
        animate(250, style({
            opacity: 0
        }))
    ])
]);
const fadeIn = trigger('fadeIn', [
    transition(':enter', [style({ opacity: 0 }), animate(500)]),
    transition(':leave', [style({ opacity: 0 }), animate(1)])
]);

class ChatBotRasaService {
    // chatBotUrl = 'environment.ChatBotNew';
    constructor(http, _storeservice) {
        this.http = http;
        this._storeservice = _storeservice;
        this.getMessages = () => {
            return new Observable(observer => {
                this.socket.on('bot_uttered', (message) => {
                    observer.next(message);
                });
            });
        };
        this._storeservice.currentStore.subscribe((res) => {
            if (res['RBACORG'] && res['RBACORG'] !== '') {
                this.RBACORG = res['RBACORG'];
                this.url = this.RBACORG['apiHost'] ? this.RBACORG['apiHost'] : 'http://localhost:3000/api';
                this.tokenKey = this.RBACORG['tokenKey'];
                this.chatBotUrl = this.RBACORG.environment['ChatBotNew'];
            }
        });
    }
    connect(url) {
        const tokenvalues = sessionStorage.getItem('fbToken') ? sessionStorage.getItem('fbToken') : '';
        const username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
        const email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '';
        const id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '';
        this.socket = io(url, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
            forceNew: true,
            secure: true,
            query: {
                token: tokenvalues ? tokenvalues : '',
                username: username ? username : 'Tulasireddy',
                email: email ? email : 'tulasi@cardinality.ai',
                id: id ? id : '1234'
            }
        });
        this.socket.on('connect', () => {
            this.socket.emit('session_request', { session_id: this.socket.id });
        });
        this.socket.on('session_confirm', (_remote_id) => {
            //not to be empty
        });
        this.socket.on('connect_error', (error) => {
            console.log(error);
        });
        this.socket.on('error', (error) => {
            console.log(error);
        });
        this.socket.on('disconnect', (reason) => {
            console.log(reason);
        });
    }
    sendMessage(message) {
        const tokenvalues = sessionStorage.getItem('fbToken') ? sessionStorage.getItem('fbToken') : '';
        const username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
        const email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '';
        const id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '';
        this.socket.emit('user_uttered', {
            message: message,
            customData: {
                token: tokenvalues ? tokenvalues : '',
                username: username ? username : '',
                email: email ? email : '',
                id: id ? id : ''
            }
        });
    }
    disconnect() {
        this.socket.on('disconnect', (reason) => {
            console.log(reason);
        });
    }
    searchMenus(modal) {
        const inputRequest = {
            query: modal
        };
        return this.http.post(this.chatBotUrl + 'search', inputRequest);
    }
    sendFeedback(modal) {
        const inputRequest = {
            user: sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '',
            question: modal.question,
            isLiked: modal.islike ? true : false
        };
        return this.http.post(this.chatBotUrl + 'feedback', inputRequest);
    }
}
ChatBotRasaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatBotRasaService, deps: [{ token: i1.HttpClient }, { token: DataStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
ChatBotRasaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatBotRasaService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatBotRasaService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: DataStoreService }]; } });

class ChatAvatarComponent {
}
ChatAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ChatAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatAvatarComponent, selector: "app-chat-avatar", inputs: { image: "image" }, ngImport: i0, template: ' <img [attr.src]="image" class="avatar" /> ', isInline: true, styles: ["\n      .avatar {\n        height: 30px;\n        width: 30px;\n        border-radius: 50%;\n        float: left;\n        margin-right: 10px;\n        background-color: #fff;\n        padding: 5px;\n        border: 1px solid #ddd;\n      }\n    "] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-chat-avatar',
                    template: ' <img [attr.src]="image" class="avatar" /> ',
                    styles: [
                        `
      .avatar {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        float: left;
        margin-right: 10px;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #ddd;
      }
    `
                    ]
                }]
        }], propDecorators: { image: [{
                type: Input
            }] } });

class ChatInputComponent {
    constructor() {
        this.buttonText = 'Send';
        this.focus = new EventEmitter();
        this.clearSearch = new Subject();
        this.send = new EventEmitter();
        this.searchto = new EventEmitter();
        this.dismiss = new EventEmitter();
    }
    ngOnInit() {
        this.focus.subscribe(() => this.focusMessage());
        this.clearSearch.subscribe(() => {
            this.clearMessage();
            this.focusMessage();
        });
    }
    focusMessage() {
        this.message.nativeElement.focus();
    }
    getMessage() {
        return this.message.nativeElement.value;
    }
    clearMessage() {
        this.message.nativeElement.value = '';
    }
    onSubmit() {
        const message = this.getMessage();
        if (message.trim() === '') {
            return;
        }
        this.send.emit({ message });
        this.clearMessage();
        this.focusMessage();
    }
    searchText() {
        const message = this.getMessage();
        if (message.trim() === '') {
            return;
        }
        this.searchto.emit({ message });
    }
}
ChatInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ChatInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatInputComponent, selector: "app-chat-input", inputs: { buttonText: "buttonText", focus: "focus", clearSearch: "clearSearch" }, outputs: { send: "send", searchto: "searchto", dismiss: "dismiss" }, viewQueries: [{ propertyName: "message", first: true, predicate: ["message"], descendants: true }], ngImport: i0, template: `
    <textarea
      type="text"
      class="chat-input-text"
      placeholder="Type message..."
      #message
      (keypress)="searchText()"
      (keydown.enter)="onSubmit()"
      (keyup.enter)="message.value = ''"
      (keyup.escape)="dismiss.emit()"></textarea>
    <button type="submit" class="chat-input-submit" (click)="onSubmit()">
      {{ buttonText }}
    </button>
  `, isInline: true, styles: [".chat-input-text{margin:5px 0 0 14px;height:29px;width:70%;border:0;resize:none;overflow:auto;outline:none;box-shadow:none;font-size:12px!important;background-color:inherit;color:#a3a3a3;padding:4px}.chat-input-text::-webkit-input-placeholder{color:inherit!important}.chat-input-text::-moz-placeholder{color:inherit!important}.chat-input-text::-ms-input-placeholder{color:inherit!important}.chat-input-submit{margin:5px 12px;float:right;background-color:inherit;color:inherit;font-size:12px!important;padding:4px;border:0;outline:none}.chat-input-submit:focus,.chat-input-submit:visited{outline:none!important}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-chat-input',
                    template: `
    <textarea
      type="text"
      class="chat-input-text"
      placeholder="Type message..."
      #message
      (keypress)="searchText()"
      (keydown.enter)="onSubmit()"
      (keyup.enter)="message.value = ''"
      (keyup.escape)="dismiss.emit()"></textarea>
    <button type="submit" class="chat-input-submit" (click)="onSubmit()">
      {{ buttonText }}
    </button>
  `,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./chat-input.component.scss']
                }]
        }], propDecorators: { buttonText: [{
                type: Input
            }], focus: [{
                type: Input
            }], clearSearch: [{
                type: Input
            }], send: [{
                type: Output
            }], searchto: [{
                type: Output
            }], dismiss: [{
                type: Output
            }], message: [{
                type: ViewChild,
                args: ['message']
            }] } });

class KeysPipe {
    transform(value, _args) {
        const keys = [];
        // tslint:disable-next-line:forin
        for (const key in value) {
            keys.push(key);
        }
        return keys;
    }
}
KeysPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: KeysPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
KeysPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: KeysPipe, name: "keys" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: KeysPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'keys' }]
        }] });

const rand = (max) => Math.floor(Math.random() * max);
class ChatWidgetComponent {
    constructor(chatService, _storeservice) {
        this._storeservice = _storeservice;
        this.theme = 'blue';
        this.botName = 'Bot';
        this.botAvatar = '../../../../assets/images/redbird_ai.png';
        this.userAvatar = '../../../../assets/images/chat_avator.png';
        this.opened = false;
        this.spin = false;
        this.menuList = [];
        this.openFeedback = false;
        this.selectedmessage = '';
        this.selectQuestion = '';
        this._visible = false;
        this.RBACORG = new RBACINFO();
        this.focus = new Subject();
        this.clearSearch = new Subject();
        this.messages = [];
        this.currentMessages = [];
        this.chatService = chatService;
        this.orgSubs = this._storeservice.currentStore.subscribe((res) => {
            if (res['RBACORG'] && res['RBACORG'] !== '') {
                this.RBACORG = res['RBACORG'];
                this.environment = this.RBACORG['environment'];
                this.orgId = parseInt(this.RBACORG['orgID']);
                if (this.environment) {
                    this.chatService.connect(this.environment['ChatBot']);
                }
            }
        });
    }
    get visible() {
        return this._visible;
    }
    set visible(visible) {
        this._visible = visible;
        if (this._visible) {
            setTimeout(() => {
                this.scrollToBottom();
                this.focusMessage();
            }, 0);
        }
    }
    addMessage(from, text, type, islike, isdislike, question) {
        this.spin = false;
        this.messages.unshift({
            from,
            text,
            type,
            date: new Date().getTime(),
            islike,
            isdislike,
            question
        });
        this.currentMessages.unshift({
            from,
            text,
            type,
            date: new Date().getTime(),
            islike,
            isdislike,
            question
        });
        this.scrollToBottom();
    }
    scrollToBottom() {
        if (this.bottom !== undefined) {
            this.bottom.nativeElement.scrollIntoView();
        }
    }
    focusMessage() {
        this.focus.next(true);
    }
    ngOnInit() {
        this.initialize();
    }
    initialize() {
        this.startingMessage = 'Hi, how can we help you?';
        this.client = {
            name: 'Guest User',
            status: 'online',
            avatar: this.userAvatar
        };
        this.operator = {
            name: this.botName,
            status: 'online',
            avatar: this.botAvatar
        };
        if (this.opened) {
            setTimeout(() => (this.visible = true), 1000);
        }
        setTimeout(() => {
            this.addMessage(this.operator, this.startingMessage, 'received', false, false, '');
        }, 1500);
        // setTimeout(() => {
        //   const startingMessage = {
        //     data: ['Referrals', 'Expenses'],
        //     filter: '',
        //     msg: 'Would you like to check the below items ?',
        //     response_type: 'questions',
        //     url: ''
        //   };
        //   this.addMessage(this.operator, startingMessage, 'received', false, false, '');
        // }, 1500);
        this.chatService.getMessages().subscribe((message) => {
            setTimeout(() => {
                this.spin = false;
                const msg = isValidJSONString(message.text) ? JSON.parse(message.text) : message.text;
                this.addMessage(this.operator, msg, 'received', false, false, this.selectQuestion);
                setTimeout(() => {
                    this.scrollToBottom();
                    this.focusMessage();
                }, 0);
            }, 500);
        });
    }
    toggleChat() {
        this.visible = !this.visible;
    }
    sendMessage({ message }) {
        this.selectQuestion = message;
        if (message.trim() === '') {
            return;
        }
        const currentMessage = this.sendMenuKey(message);
        this.addMessage(this.client, message, 'sent', false, false, this.selectQuestion);
        this.spin = true;
        this.chatService.sendMessage(currentMessage);
    }
    searchMessage({ message }) {
        if (message.trim() === '') {
            return;
        }
        this.chatService
            .searchMenus(message)
            .pipe(debounceTime(2000))
            .subscribe((x) => {
            if (x) {
                this.menuList = x;
            }
        });
    }
    handleKeyboardEvent(event) {
        if (event.key === '/') {
            this.focusMessage();
        }
        if (event.key === '?' && !this._visible) {
            this.toggleChat();
        }
    }
    closeChatBot() {
        this.messages = [];
        this.chatService.disconnect();
        this.startingMessage = 'Hi, how can we help you?';
    }
    showMessage(message) {
        if (message.text && message.text.response_type) {
            return message.text.response_type === 'table' ||
                message.text.response_type === 'text' ||
                message.text.response_type === 'questions' ||
                message.text.response_type === 'link'
                ? true
                : false;
        }
        return false;
    }
    showTable(message, type) {
        if (message.text && message.text.response_type) {
            return message.text.response_type === type ? true : false;
        }
        return false;
    }
    getHeaderName(message) {
        if (message.text && message.text.data) {
            return message.text.data[0];
        }
        return {};
    }
    getColumnData(message) {
        if (message.text && message.text.data) {
            return message.text.data;
        }
        return [];
    }
    raiseQuestions(message) {
        this.sendMessage({ message });
        setTimeout(() => {
            this.scrollToBottom();
            this.focusMessage();
        }, 0);
    }
    selectMessage(message) {
        this.toggleShow();
        this.toClearSearch();
        this.sendMessage({ message });
        setTimeout(() => {
            this.scrollToBottom();
            this.focusMessage();
        }, 0);
    }
    toClearSearch() {
        this.clearSearch.next(true);
    }
    downloadFile(message) {
        if (message.text.url) {
            window.open(message.text.url, '_blank');
        }
    }
    toggleShow() {
        this.menuList = [];
    }
    activeLike(message) {
        this.selectedmessage = message;
        this.currentMessages = this.currentMessages.map(x => {
            return {
                type: x.type,
                text: x.text,
                islike: x.text === message.text ? true : x.islike,
                isdislike: x.text === message.text ? false : x.isdislike,
                from: x.from,
                date: x.date,
                question: x.question
            };
        });
        this.openFeedback = true;
    }
    activeDisLike(message) {
        this.selectedmessage = message;
        this.currentMessages = this.currentMessages.map(x => {
            return {
                type: x.type,
                text: x.text,
                islike: x.text === message.text ? false : x.islike,
                isdislike: x.text === message.text ? true : x.isdislike,
                from: x.from,
                date: x.date,
                question: x.question
            };
        });
        this.openFeedback = true;
    }
    getLikeStatus(message) {
        const isLike = this.currentMessages.filter(x => x.text === message.text && x.islike);
        return isLike.length > 0 ? true : false;
    }
    getDisLikeStatus(message) {
        const isDisLike = this.currentMessages.filter(x => x.text === message.text && x.isdislike);
        return isDisLike.length > 0 ? true : false;
    }
    sendFeedback(message) {
        const feedbackQue = this.currentMessages.filter(x => x.text === message.text);
        if (feedbackQue.length > 0) {
            this.chatService.sendFeedback(feedbackQue[0]).subscribe(_x => {
                //not to be empty
            });
        }
        this.closeFeedback();
    }
    closeFeedback() {
        this.openFeedback = false;
    }
    sendMenuKey(message) {
        if (message === 'Referrals') {
            return 'orref menu';
        }
        else if (message === 'Expenses') {
            return 'orexp menu';
        }
        else {
            return message;
        }
    }
    getChatBotInfo(_modal) {
    }
}
ChatWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatWidgetComponent, deps: [{ token: ChatBotRasaService }, { token: DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
ChatWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatWidgetComponent, selector: "app-chat-widget", inputs: { theme: "theme", botName: "botName", botAvatar: "botAvatar", userAvatar: "userAvatar", url: "url", startingMessage: "startingMessage", opened: "opened", visible: "visible" }, host: { listeners: { "document:keypress": "handleKeyboardEvent($event)" } }, viewQueries: [{ propertyName: "bottom", first: true, predicate: ["bottom"], descendants: true }], ngImport: i0, template: "<div class=\"wrapper {{ theme }}\">\r\n  <div class=\"chat-box\" *ngIf=\"visible\" [@fadeInOut]=\"visible\">\r\n    <div class=\"chat-box-body\">\r\n      <div class=\"chat-box-header\">\r\n        <div class=\"\">\r\n          <div class=\"operator-status\">\r\n            <!-- {{ operator.status }}\r\n            <span class=\"operator-status-online\">\u25CF</span> -->\r\n            <button class=\"chat-button-header\" (click)=\"toggleChat()\">\u2715</button>\r\n          </div>\r\n          <app-chat-avatar class=\"main-avatar\" [image]=\"operator.avatar\"></app-chat-avatar>\r\n          <h3 class=\"operator-name d-none\">\r\n            {{ operator.name }}\r\n          </h3>\r\n        </div>\r\n      </div>\r\n      <div class=\"chat-box-main\">\r\n        <div class=\"chat-message-bottom\" #bottom></div>\r\n        <ng-container *ngFor=\"let message of messages\">\r\n          <div class=\"chat-message m-2 mb-4\" [class.chat-message-received]=\"message.type === 'received'\" [@fadeIn]\r\n            [class.chat-message-sent]=\"message.type === 'sent'\">\r\n            <div>\r\n              <app-chat-avatar [image]=\"message.from.avatar\" class=\"chat-message-from-avatar\"></app-chat-avatar>\r\n              <div class=\"chat-message-text\">\r\n                {{ showMessage(message) ? message?.text?.msg : message?.text }}\r\n                <table *ngIf=\"showTable(message, 'table')\" class=\"table table-bordered\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th class=\"px-1 py-1\" *ngFor=\"let head of getHeaderName(message) | keys\">\r\n                        {{ head }}\r\n                      </th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let item of getColumnData(message).slice(0, 4)\">\r\n                      <td class=\"px-1 py-1\" *ngFor=\"let list of item | keys\">\r\n                        {{ item[list] }}\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n                <div *ngIf=\"showTable(message, 'table')\">\r\n                  <a href=\"javascript:void(0)\" (click)=\"getChatBotInfo(message)\">Click here to view more</a>.\r\n                </div>\r\n                <div *ngIf=\"showTable(message, 'link')\">\r\n                  <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"downloadFile(message)\">\r\n                    <em class=\"pi pi-download mr-1\" title=\"Download\"></em>Download</button>.\r\n                </div>\r\n                <ul class=\"list-group questions mt-2\" *ngIf=\"showTable(message, 'questions')\">\r\n                  <li class=\"list-group-item p-2 mb-1 border border-primary\" role=\"button\"\r\n                    *ngFor=\"let item of getColumnData(message)\" (click)=\"raiseQuestions(item)\">\r\n                    {{ item }}\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat-message-date\">\r\n              {{ message.date | date: 'short' }}\r\n\r\n              <span style=\"bottom: -6px\" *ngIf=\"message.type === 'received' && message.question\">\r\n                <span class=\"thumbs\">\r\n                  <span title=\"Like\" ngClass=\"{{ getLikeStatus(message) ? 'thumbs-up active' : 'thumbs-up' }}\"\r\n                    (click)=\"activeLike(message)\"></span>\r\n                  <span title=\"Dislike\" ngClass=\"{{ getDisLikeStatus(message) ? 'thumbs-down active' : 'thumbs-down' }}\"\r\n                    (click)=\"activeDisLike(message)\"></span>\r\n                </span>\r\n              </span>\r\n            </div>\r\n            <div class=\"comment mt-n1 mb-3\" *ngIf=\"openFeedback && selectedmessage === message\">\r\n              <p>Enter your feedback here</p>\r\n              <div class=\"feedback-bottom\">\r\n                <input placeholder=\"Type here to share your feedback\" id=\"comment-input\" type=\"text\" maxlength=\"1000\" />\r\n                <div class=\"feedback-send\" (click)=\"sendFeedback(message)\">Send</div>\r\n              </div>\r\n              <span class=\"close-comment\">\r\n                <em class=\"pi pi-times close-btn\" title=\"close\"\r\n                  style=\"width: 10px; height: 10px; vertical-align: top; font-size: 12px\"\r\n                  (click)=\"closeFeedback()\"></em>\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <div class=\"typing\" *ngIf=\"spin\">\r\n            <div class=\"bubble\">\r\n              <div class=\"ellipsis one\"></div>\r\n              <div class=\"ellipsis two\"></div>\r\n              <div class=\"ellipsis three\"></div>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n      <div class=\"chat-box-footer\">\r\n        <app-chat-input (send)=\"sendMessage($event)\" (searchto)=\"searchMessage($event)\" (dismiss)=\"toggleChat()\"\r\n          (focus)=\"(focus)\" [clearSearch]=\"clearSearch\"></app-chat-input>\r\n      </div>\r\n      <div class=\"autosuggest\" *ngIf=\"menuList.length > 0\">\r\n        <div class=\"close-btn d-flex align-items-center justify-content-end mx-2 my-2\">\r\n          <a href=\"javascript:void(0)\" class=\"auto-suggestions-close text-right\" (click)=\"toggleShow()\">\r\n            <em class=\"pi pi-times close-btn\" title=\"close\"></em>\r\n          </a>\r\n        </div>\r\n        <ul class=\"mb-0 mx-2\">\r\n          <li *ngFor=\"let item of menuList\" (click)=\"selectMessage(item)\">\r\n            {{ item }}\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <button class=\"chat-button\" (click)=\"toggleChat()\">\r\n    <span [@fadeIn] *ngIf=\"visible\">\u2715</span>\r\n    <span [@fadeIn] *ngIf=\"!visible\">\r\n      <img src=\"../../../../../assets/images/chat.png\" width=\"20\" alt=\"chat-icon\" />\r\n    </span>\r\n  </button>\r\n</div>", styles: ["*{box-sizing:border-box}.wrapper{position:absolute;top:0;bottom:0;width:100vw}.chat-button{z-index:99;width:50px;height:50px;position:absolute;bottom:1px;right:10px;box-shadow:0 5px 40px #00000029;background:var(--btn);border-radius:50%;border:none;outline:none;color:var(--bg-light);font-size:32px}.chat-button-header{z-index:1;font-weight:bold;color:#fff;border:1px solid #fff;background-color:inherit;padding:5px 9px;margin-left:5px}.chat-box{position:fixed;left:0;height:100vh;width:100vw;margin:0;display:flex;box-shadow:0 5px 40px #00000029;background:#eaf0f7!important;z-index:99}.chat-box-hidden{display:none}.chat-box-header{padding:10px;color:#fff;display:flex;justify-content:center;align-items:center}.chat-box-main{flex:1;width:100%;background:#fff;display:flex;flex-direction:column-reverse;overflow:auto}.chat-box-body{flex:1;display:flex;flex-direction:column;padding:15px}.chat-box-body:before{content:\"\";position:absolute;left:0;right:0;top:0px;width:100%;height:130px;background-color:#2c2863;border-top-left-radius:10px;border-top-right-radius:10px}.chat-box-footer{height:50px;border-radius:5px;background-color:#fff;padding:0 10px}.chat-box-footer chat-input{display:flex;background-color:#fff;border:1px solid #d1cdcd;justify-content:space-between}.operator-name{margin:0;padding:1px}.operator-status{float:right;padding:4px}.operator-status span{margin-left:4px}.operator-status-online{color:#7cfc00}.operator-status-offline{color:red}.operator-avatar{height:30px;width:30px;border-radius:50%;float:left;margin-right:10px}.chat-message{display:block;width:auto;align-self:flex-start;flex-direction:row;max-width:80%;word-wrap:break-word}.chat-message-date{font-size:9px;color:#8d898d;padding:3px 5px 5px}.chat-message-from-avatar{height:35px;width:35px;border-radius:50%}.chat-message-text{padding:6px 10px;border-radius:8px}.chat-message-received .chat-message-text{min-width:290px;background:#e6ebf1;margin-left:40px;border-bottom-left-radius:0;font-size:13px}.chat-message-received .chat-message-text:before{display:none;position:absolute;content:\" \";left:-10px;bottom:0;border-right:solid 10px #eaf0f7;border-top:solid 10px transparent;z-index:0}.chat-message-received .chat-message-date{margin-left:45px}.chat-message-received .chat-message-from-avatar{position:absolute;top:0;left:0;bottom:0}.chat-message-sent{align-self:flex-end}.chat-message-sent .chat-message-from{float:right}.chat-message-sent .chat-message-text{background:#2c2863;margin-right:10px;border-bottom-right-radius:0;font-size:13px;color:#fff}.chat-message-sent .chat-message-text:after{display:none;position:absolute;content:\" \";right:-10px;bottom:0;border-left:solid 10px #2c2863;border-top:solid 10px transparent;z-index:0}.chat-message-sent .chat-message-date{text-align:right;padding-right:45px}.chat-message-sent .chat-message-from-avatar{display:none;position:absolute;top:0;right:0;bottom:0}.blue .chat-button{background:var(--btn)}.blue .chat-box{background:#2c2863}.grey .chat-button{background:#454549}.grey .chat-box{background:#454549}.red .chat-button{background:#DD0031}.red .chat-box{background:#DD0031}@media (min-width: 576px){.chat-button{display:block}.chat-button-header{display:none}.chat-box{top:35px;left:auto;bottom:32px;right:40px;height:auto;width:440px;border-radius:10px}}.typing{position:absolute;left:10px}.typing .bubble{background:#eaeaea;padding:8px 13px 9px}.ellipsis{width:5px;height:5px;display:inline-block;background:#b7b7b7;border-radius:50%;animation:bounce 1.3s linear infinite}.one{animation-delay:.6s}.two{animation-delay:.5s}.three{animation-delay:.8s}.bubble{position:relative;display:inline-block;margin-bottom:5px;color:red;font-size:.7em;padding:10px 10px 10px 12px;border-radius:20px}@keyframes bounce{30%{transform:translateY(-2px)}60%{transform:translateY(0)}80%{transform:translateY(2px)}to{transform:translateY(0);opacity:.5}}@media (min-width: 768px){.chat-box{height:auto}}@media (min-width: 992px){.chat-box{height:auto}}.questions li:hover{background-color:#2c2863;color:#fff}.questions li{border-radius:15px;color:#2c2863;text-transform:capitalize}.autosuggest{position:absolute;top:auto;right:auto;left:auto;bottom:115px;transform:translateY(38px);will-change:transform;float:left;min-width:10rem;padding:0;margin:.125rem 0 0;font-size:13px;color:#212529;text-align:left;background-color:#fff;background-clip:padding-box;border-top-left-radius:15px;border-top-right-radius:15px;border:1px solid rgba(0,0,0,.15);z-index:99;width:93%}.autosuggest ul{list-style:none;height:240px;overflow:auto}.autosuggest li{cursor:pointer;font-size:13px;padding:10px;margin:0;border-bottom:solid 1px #efefef}.autosuggest .auto-suggestions-close .close-btn{font-size:13px;color:#000}.autosuggest li:hover{color:#fff;background-color:#007cc3}.autosuggest ul::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #0000004d;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#f5f5f5}.autosuggest ul::-webkit-scrollbar{width:10px;background-color:#f5f5f5}.autosuggest ul::-webkit-scrollbar-thumb{background-color:#007cc3;border:2px solid #555555}.chat-box .comment p{font-size:13px;width:90%;margin-bottom:14px!important;line-height:16px;text-align:left}.chat-box .comment #comment-input{border:0;border-radius:3px;display:inline-block;width:100%;background-color:#fff!important;padding:5px 20% 5px 10px;box-sizing:border-box;font-size:13px!important;font-weight:400;font-style:normal;line-height:18px;color:#333;box-shadow:0 0 8px #ddd;height:40px}.chat-box .close-comment{display:block;position:absolute;right:8px;top:8px;line-height:20px;text-align:center;cursor:pointer}.chat-box .feedback-send{width:35px;float:right;position:relative;color:#007cc3;font-size:13px;margin-top:-30px;margin-right:10px;border-radius:2px;cursor:pointer}.chat-box .thumbs{float:right;margin-right:-5px}.chat-box .thumbs-up{width:18px;height:18px;margin-right:14px;cursor:pointer;float:left;color:#555;background-image:url(../../../../../../assets/images/chabot/like-inactive.svg);background-repeat:no-repeat;margin-top:0;background-size:contain}.chat-box .thumbs-down{width:18px;height:18px;cursor:pointer;float:left;color:#555;background-image:url(../../../../../../assets/images/chabot/dislike-inactive.svg);background-repeat:no-repeat;margin-top:3px;background-size:contain}.chat-box .thumbs-down.active{background-image:url(../../../../../../assets/images/chabot/dislike-active.svg)}.chat-box .thumbs-up.active{color:#007cc3;background-image:url(../../../../../../assets/images/chabot/like-active.svg)}.chat-box .comment{padding:10px 15px;top:20px;left:0;min-width:290px;margin-left:40px;width:calc(100% - 40px);border-radius:4px;z-index:99;color:#333;background-color:#fff;box-shadow:0 0 8px #ddd;-webkit-box-shadow:0 0 8px 0 #ddd}.chat-box .comment #comment-input::placeholder{font-size:13px}\n"], components: [{ type: ChatAvatarComponent, selector: "app-chat-avatar", inputs: ["image"] }, { type: ChatInputComponent, selector: "app-chat-input", inputs: ["buttonText", "focus", "clearSearch"], outputs: ["send", "searchto", "dismiss"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "keys": KeysPipe, "date": i5.DatePipe }, animations: [fadeInOut, fadeIn] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-chat-widget',
                    templateUrl: './chat-widget.component.html',
                    styleUrls: ['./chat-widget.component.scss'],
                    animations: [fadeInOut, fadeIn]
                }]
        }], ctorParameters: function () { return [{ type: ChatBotRasaService }, { type: DataStoreService }]; }, propDecorators: { bottom: [{
                type: ViewChild,
                args: ['bottom']
            }], theme: [{
                type: Input
            }], botName: [{
                type: Input
            }], botAvatar: [{
                type: Input
            }], userAvatar: [{
                type: Input
            }], url: [{
                type: Input
            }], startingMessage: [{
                type: Input
            }], opened: [{
                type: Input
            }], visible: [{
                type: Input
            }], handleKeyboardEvent: [{
                type: HostListener,
                args: ['document:keypress', ['$event']]
            }] } });
function isValidJSONString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}

class ChatRedbirdAiComponent {
    constructor(permissionStore, _storeservice) {
        this.permissionStore = permissionStore;
        this._storeservice = _storeservice;
        this.RBACORG = new RBACINFO();
    }
    ngOnInit() {
        this.chatEvent.subscribe((val) => {
            this.RBACORG = val.RBACORG;
            this.PERMISSION = val.PERMISSION;
            this._storeservice.setData('RBACORG', this.RBACORG);
            this.permissionStore.setStore(this.PERMISSION);
        });
    }
}
ChatRedbirdAiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatRedbirdAiComponent, deps: [{ token: PermissionStore }, { token: DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
ChatRedbirdAiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatRedbirdAiComponent, selector: "chat-redbird-ai", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", chatEvent: "chatEvent" }, ngImport: i0, template: `
      <app-chat-widget botName="Cardinality" theme="blue"></app-chat-widget>
  `, isInline: true, components: [{ type: ChatWidgetComponent, selector: "app-chat-widget", inputs: ["theme", "botName", "botAvatar", "userAvatar", "url", "startingMessage", "opened", "visible"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatRedbirdAiComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'chat-redbird-ai',
                    template: `
      <app-chat-widget botName="Cardinality" theme="blue"></app-chat-widget>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: PermissionStore }, { type: DataStoreService }]; }, propDecorators: { RBACORG: [{
                type: Input
            }], PERMISSION: [{
                type: Input
            }], chatEvent: [{
                type: Input
            }] } });

class AlertService {
    constructor(router) {
        this.router = router;
        this.subject = new Subject();
        this.keepAfterRouteChange = false;
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                }
                else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }
    getAlert() {
        return this.subject.asObservable();
    }
    success(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }
    error(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }
    info(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }
    warn(message, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }
    alert(type, message, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: type, message: message });
    }
    clear() {
        // clear alerts
        this.subject.next({});
    }
}
AlertService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService, deps: [{ token: i1$1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
AlertService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Router }]; } });
var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType || (AlertType = {}));
class Alert {
}
class UserGroupDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class UserRolePageDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class UserRoleDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class UserDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
class AccessManagementConfig {
}
AccessManagementConfig.EndPoint = {
    Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
};

class HttpService {
    constructor(http, _storeservice) {
        this.http = http;
        this._storeservice = _storeservice;
        this.overrideUrl = true;
        this.baseUrl = '';
        this.headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('role', 'role=CP_PUBLIC');
        this.showSpinner = new BehaviorSubject(false);
        this.outsideShowSpinner = new BehaviorSubject(false);
        this._storeservice.currentStore.subscribe((res) => {
            if (res['RBACORG'] && res['RBACORG'] !== '') {
                this.RBACORG = res['RBACORG'];
                this.url = this.RBACORG['apiHost'] ? this.RBACORG['apiHost'] : 'http://localhost:3000/api';
                this.tokenKey = this.RBACORG['tokenKey'];
            }
        });
        this.url1 = '';
    }
    get(apiRoute) {
        return this.http.get(`${this.url + apiRoute}`, {
            headers: this.getHttpNewHeaders()
        });
    }
    post(apiRoute, body) {
        return this.http.post(`${this.url + apiRoute}`, body, {
            headers: this.getHttpNewHeaders()
        });
    }
    put(apiRoute, body) {
        return this.http.put(`${this.url + apiRoute}`, body, {
            headers: this.getHttpNewHeaders()
        });
    }
    patch(apiRoute, body) {
        return this.http.patch(`${this.url + apiRoute}`, body, {
            headers: this.getHttpNewHeaders()
        });
    }
    delete(apiRoute) {
        return this.http.delete(`${this.url + apiRoute}`, {
            headers: this.getHttpNewHeaders()
        });
    }
    getHttpHeaders() {
        return new HttpHeaders().set('key', 'value');
    }
    getHttpNewHeaders() {
        return this.headers.set('Authorization', `Bearer ${this.getToken()}`);
    }
    getAttachmentHttpHeaders(contentType) {
        return new HttpHeaders().set('Content-Type', contentType).set('x-ms-blob-type', 'BlockBlob');
    }
    putUpload(apiRoute, body, contentType) {
        return this.http.put(`${this.url1 + apiRoute}`, body, { headers: this.getAttachmentHttpHeaders(contentType) });
    }
    putupload2(apiRoute, body, contenttype) {
        return this.http
            .put(`${this.url1 + apiRoute}`, body, {
            headers: this.getAttachmentHttpHeaders(contenttype),
            observe: 'response'
        })
            .pipe(map(data => {
            return data;
        }));
    }
    /**
     *
     * @param apiRoute
     * This function will download the stream file from the API service.
     * No HTTP required for this stream. So used Window.location.href to download the file
     */
    getFormDownloaded(apiRoute) {
        window.location.href = `${this.url + apiRoute}`;
    }
    //common http service(optional)
    handleError(error) {
        var _a, _b;
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message) ? (_b = error === null || error === void 0 ? void 0 : error.error) === null || _b === void 0 ? void 0 : _b.message : error.message}`;
        }
        return throwError(errorMessage);
    }
    getToken() {
        const token = this.tokenKey ? this.tokenKey : 'jwt-token';
        return sessionStorage.getItem(token);
    }
}
HttpService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: HttpService, deps: [{ token: i1.HttpClient }, { token: DataStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
HttpService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: HttpService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: HttpService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: DataStoreService }]; } });

class ChatConfigComponent {
    constructor() {
        this.text = 'Select theme';
        this.themeChange = new EventEmitter();
        this.themes = ['blue', 'grey', 'red'];
    }
    setTheme(theme) {
        this.theme = theme;
        this.themeChange.emit(this.theme);
    }
}
ChatConfigComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatConfigComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ChatConfigComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatConfigComponent, selector: "app-chat-config", inputs: { theme: "theme", text: "text" }, outputs: { themeChange: "themeChange" }, ngImport: i0, template: `
    <div class="chat-config">
      {{ text }}
      <button *ngFor="let item of themes" class="btn" [class.btn-active]="item === theme" (click)="setTheme(item)">
        {{ item }}
      </button>
    </div>
  `, isInline: true, styles: ["\n      .chat-config {\n        padding: 20px;\n      }\n      .btn {\n        padding: 5px;\n        margin: 0px 2px;\n        border: 1px solid #dedede;\n        outline: none;\n      }\n      .btn-active {\n        border: 1px solid #a0a0a0;\n      }\n      .btn:focus {\n        border: 1px solid #333;\n      }\n    "], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatConfigComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-chat-config',
                    template: `
    <div class="chat-config">
      {{ text }}
      <button *ngFor="let item of themes" class="btn" [class.btn-active]="item === theme" (click)="setTheme(item)">
        {{ item }}
      </button>
    </div>
  `,
                    styles: [
                        `
      .chat-config {
        padding: 20px;
      }
      .btn {
        padding: 5px;
        margin: 0px 2px;
        border: 1px solid #dedede;
        outline: none;
      }
      .btn-active {
        border: 1px solid #a0a0a0;
      }
      .btn:focus {
        border: 1px solid #333;
      }
    `
                    ]
                }]
        }], propDecorators: { theme: [{
                type: Input
            }], text: [{
                type: Input
            }], themeChange: [{
                type: Output
            }] } });

class PicsChatRedbirdAiModule {
}
PicsChatRedbirdAiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsChatRedbirdAiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PicsChatRedbirdAiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsChatRedbirdAiModule, declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent, KeysPipe], imports: [CommonModule], exports: [ChatWidgetComponent, ChatConfigComponent] });
PicsChatRedbirdAiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsChatRedbirdAiModule, providers: [ChatBotRasaService, HttpClient, HttpService, AlertService, ConfirmationService, PermissionStore, DataStoreService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PicsChatRedbirdAiModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent, KeysPipe
                    ],
                    imports: [CommonModule],
                    exports: [ChatWidgetComponent, ChatConfigComponent],
                    entryComponents: [ChatWidgetComponent, ChatConfigComponent],
                    providers: [ChatBotRasaService, HttpClient, HttpService, AlertService, ConfirmationService, PermissionStore, DataStoreService],
                    schemas: [NO_ERRORS_SCHEMA]
                }]
        }] });

class CardiChatRedbirdAiModule {
}
CardiChatRedbirdAiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CardiChatRedbirdAiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CardiChatRedbirdAiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CardiChatRedbirdAiModule, declarations: [ChatRedbirdAiComponent], imports: [PicsChatRedbirdAiModule], exports: [ChatRedbirdAiComponent] });
CardiChatRedbirdAiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CardiChatRedbirdAiModule, imports: [[
            PicsChatRedbirdAiModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CardiChatRedbirdAiModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ChatRedbirdAiComponent
                    ],
                    imports: [
                        PicsChatRedbirdAiModule
                    ],
                    exports: [
                        ChatRedbirdAiComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of chat-redbird-ai
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CardiChatRedbirdAiModule, ChatRedbirdAiComponent, ChatRedbirdAiService };
//# sourceMappingURL=pics-module-chat-redbird-ai.js.map
