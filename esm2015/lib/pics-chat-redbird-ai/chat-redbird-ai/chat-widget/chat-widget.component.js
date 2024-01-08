import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { fadeIn, fadeInOut } from '../animations';
import { debounceTime } from 'rxjs/operators';
import { RBACINFO } from '../../@core/urls/chat-redbird-ai-url.config';
import * as i0 from "@angular/core";
import * as i1 from "../../@core/service/chatbot-rasa.service";
import * as i2 from "../../@core/service/data-store.service";
import * as i3 from "../chat-avatar/chat-avatar.component";
import * as i4 from "../chat-input/chat-input.component";
import * as i5 from "@angular/common";
import * as i6 from "../../@core/pipes/array-keys.pipe";
const rand = (max) => Math.floor(Math.random() * max);
export class ChatWidgetComponent {
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
ChatWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatWidgetComponent, deps: [{ token: i1.ChatBotRasaService }, { token: i2.DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
ChatWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatWidgetComponent, selector: "app-chat-widget", inputs: { theme: "theme", botName: "botName", botAvatar: "botAvatar", userAvatar: "userAvatar", url: "url", startingMessage: "startingMessage", opened: "opened", visible: "visible" }, host: { listeners: { "document:keypress": "handleKeyboardEvent($event)" } }, viewQueries: [{ propertyName: "bottom", first: true, predicate: ["bottom"], descendants: true }], ngImport: i0, template: "<div class=\"wrapper {{ theme }}\">\r\n  <div class=\"chat-box\" *ngIf=\"visible\" [@fadeInOut]=\"visible\">\r\n    <div class=\"chat-box-body\">\r\n      <div class=\"chat-box-header\">\r\n        <div class=\"\">\r\n          <div class=\"operator-status\">\r\n            <!-- {{ operator.status }}\r\n            <span class=\"operator-status-online\">\u25CF</span> -->\r\n            <button class=\"chat-button-header\" (click)=\"toggleChat()\">\u2715</button>\r\n          </div>\r\n          <app-chat-avatar class=\"main-avatar\" [image]=\"operator.avatar\"></app-chat-avatar>\r\n          <h3 class=\"operator-name d-none\">\r\n            {{ operator.name }}\r\n          </h3>\r\n        </div>\r\n      </div>\r\n      <div class=\"chat-box-main\">\r\n        <div class=\"chat-message-bottom\" #bottom></div>\r\n        <ng-container *ngFor=\"let message of messages\">\r\n          <div class=\"chat-message m-2 mb-4\" [class.chat-message-received]=\"message.type === 'received'\" [@fadeIn]\r\n            [class.chat-message-sent]=\"message.type === 'sent'\">\r\n            <div>\r\n              <app-chat-avatar [image]=\"message.from.avatar\" class=\"chat-message-from-avatar\"></app-chat-avatar>\r\n              <div class=\"chat-message-text\">\r\n                {{ showMessage(message) ? message?.text?.msg : message?.text }}\r\n                <table *ngIf=\"showTable(message, 'table')\" class=\"table table-bordered\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th class=\"px-1 py-1\" *ngFor=\"let head of getHeaderName(message) | keys\">\r\n                        {{ head }}\r\n                      </th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let item of getColumnData(message).slice(0, 4)\">\r\n                      <td class=\"px-1 py-1\" *ngFor=\"let list of item | keys\">\r\n                        {{ item[list] }}\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n                <div *ngIf=\"showTable(message, 'table')\">\r\n                  <a href=\"javascript:void(0)\" (click)=\"getChatBotInfo(message)\">Click here to view more</a>.\r\n                </div>\r\n                <div *ngIf=\"showTable(message, 'link')\">\r\n                  <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"downloadFile(message)\">\r\n                    <em class=\"pi pi-download mr-1\" title=\"Download\"></em>Download</button>.\r\n                </div>\r\n                <ul class=\"list-group questions mt-2\" *ngIf=\"showTable(message, 'questions')\">\r\n                  <li class=\"list-group-item p-2 mb-1 border border-primary\" role=\"button\"\r\n                    *ngFor=\"let item of getColumnData(message)\" (click)=\"raiseQuestions(item)\">\r\n                    {{ item }}\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat-message-date\">\r\n              {{ message.date | date: 'short' }}\r\n\r\n              <span style=\"bottom: -6px\" *ngIf=\"message.type === 'received' && message.question\">\r\n                <span class=\"thumbs\">\r\n                  <span title=\"Like\" ngClass=\"{{ getLikeStatus(message) ? 'thumbs-up active' : 'thumbs-up' }}\"\r\n                    (click)=\"activeLike(message)\"></span>\r\n                  <span title=\"Dislike\" ngClass=\"{{ getDisLikeStatus(message) ? 'thumbs-down active' : 'thumbs-down' }}\"\r\n                    (click)=\"activeDisLike(message)\"></span>\r\n                </span>\r\n              </span>\r\n            </div>\r\n            <div class=\"comment mt-n1 mb-3\" *ngIf=\"openFeedback && selectedmessage === message\">\r\n              <p>Enter your feedback here</p>\r\n              <div class=\"feedback-bottom\">\r\n                <input placeholder=\"Type here to share your feedback\" id=\"comment-input\" type=\"text\" maxlength=\"1000\" />\r\n                <div class=\"feedback-send\" (click)=\"sendFeedback(message)\">Send</div>\r\n              </div>\r\n              <span class=\"close-comment\">\r\n                <em class=\"pi pi-times close-btn\" title=\"close\"\r\n                  style=\"width: 10px; height: 10px; vertical-align: top; font-size: 12px\"\r\n                  (click)=\"closeFeedback()\"></em>\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <div class=\"typing\" *ngIf=\"spin\">\r\n            <div class=\"bubble\">\r\n              <div class=\"ellipsis one\"></div>\r\n              <div class=\"ellipsis two\"></div>\r\n              <div class=\"ellipsis three\"></div>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n      <div class=\"chat-box-footer\">\r\n        <app-chat-input (send)=\"sendMessage($event)\" (searchto)=\"searchMessage($event)\" (dismiss)=\"toggleChat()\"\r\n          (focus)=\"(focus)\" [clearSearch]=\"clearSearch\"></app-chat-input>\r\n      </div>\r\n      <div class=\"autosuggest\" *ngIf=\"menuList.length > 0\">\r\n        <div class=\"close-btn d-flex align-items-center justify-content-end mx-2 my-2\">\r\n          <a href=\"javascript:void(0)\" class=\"auto-suggestions-close text-right\" (click)=\"toggleShow()\">\r\n            <em class=\"pi pi-times close-btn\" title=\"close\"></em>\r\n          </a>\r\n        </div>\r\n        <ul class=\"mb-0 mx-2\">\r\n          <li *ngFor=\"let item of menuList\" (click)=\"selectMessage(item)\">\r\n            {{ item }}\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <button class=\"chat-button\" (click)=\"toggleChat()\">\r\n    <span [@fadeIn] *ngIf=\"visible\">\u2715</span>\r\n    <span [@fadeIn] *ngIf=\"!visible\">\r\n      <img src=\"../../../../../assets/images/chat.png\" width=\"20\" alt=\"chat-icon\" />\r\n    </span>\r\n  </button>\r\n</div>", styles: ["*{box-sizing:border-box}.wrapper{position:absolute;top:0;bottom:0;width:100vw}.chat-button{z-index:99;width:50px;height:50px;position:absolute;bottom:1px;right:10px;box-shadow:0 5px 40px #00000029;background:var(--btn);border-radius:50%;border:none;outline:none;color:var(--bg-light);font-size:32px}.chat-button-header{z-index:1;font-weight:bold;color:#fff;border:1px solid #fff;background-color:inherit;padding:5px 9px;margin-left:5px}.chat-box{position:fixed;left:0;height:100vh;width:100vw;margin:0;display:flex;box-shadow:0 5px 40px #00000029;background:#eaf0f7!important;z-index:99}.chat-box-hidden{display:none}.chat-box-header{padding:10px;color:#fff;display:flex;justify-content:center;align-items:center}.chat-box-main{flex:1;width:100%;background:#fff;display:flex;flex-direction:column-reverse;overflow:auto}.chat-box-body{flex:1;display:flex;flex-direction:column;padding:15px}.chat-box-body:before{content:\"\";position:absolute;left:0;right:0;top:0px;width:100%;height:130px;background-color:#2c2863;border-top-left-radius:10px;border-top-right-radius:10px}.chat-box-footer{height:50px;border-radius:5px;background-color:#fff;padding:0 10px}.chat-box-footer chat-input{display:flex;background-color:#fff;border:1px solid #d1cdcd;justify-content:space-between}.operator-name{margin:0;padding:1px}.operator-status{float:right;padding:4px}.operator-status span{margin-left:4px}.operator-status-online{color:#7cfc00}.operator-status-offline{color:red}.operator-avatar{height:30px;width:30px;border-radius:50%;float:left;margin-right:10px}.chat-message{display:block;width:auto;align-self:flex-start;flex-direction:row;max-width:80%;word-wrap:break-word}.chat-message-date{font-size:9px;color:#8d898d;padding:3px 5px 5px}.chat-message-from-avatar{height:35px;width:35px;border-radius:50%}.chat-message-text{padding:6px 10px;border-radius:8px}.chat-message-received .chat-message-text{min-width:290px;background:#e6ebf1;margin-left:40px;border-bottom-left-radius:0;font-size:13px}.chat-message-received .chat-message-text:before{display:none;position:absolute;content:\" \";left:-10px;bottom:0;border-right:solid 10px #eaf0f7;border-top:solid 10px transparent;z-index:0}.chat-message-received .chat-message-date{margin-left:45px}.chat-message-received .chat-message-from-avatar{position:absolute;top:0;left:0;bottom:0}.chat-message-sent{align-self:flex-end}.chat-message-sent .chat-message-from{float:right}.chat-message-sent .chat-message-text{background:#2c2863;margin-right:10px;border-bottom-right-radius:0;font-size:13px;color:#fff}.chat-message-sent .chat-message-text:after{display:none;position:absolute;content:\" \";right:-10px;bottom:0;border-left:solid 10px #2c2863;border-top:solid 10px transparent;z-index:0}.chat-message-sent .chat-message-date{text-align:right;padding-right:45px}.chat-message-sent .chat-message-from-avatar{display:none;position:absolute;top:0;right:0;bottom:0}.blue .chat-button{background:var(--btn)}.blue .chat-box{background:#2c2863}.grey .chat-button{background:#454549}.grey .chat-box{background:#454549}.red .chat-button{background:#DD0031}.red .chat-box{background:#DD0031}@media (min-width: 576px){.chat-button{display:block}.chat-button-header{display:none}.chat-box{top:35px;left:auto;bottom:32px;right:40px;height:auto;width:440px;border-radius:10px}}.typing{position:absolute;left:10px}.typing .bubble{background:#eaeaea;padding:8px 13px 9px}.ellipsis{width:5px;height:5px;display:inline-block;background:#b7b7b7;border-radius:50%;animation:bounce 1.3s linear infinite}.one{animation-delay:.6s}.two{animation-delay:.5s}.three{animation-delay:.8s}.bubble{position:relative;display:inline-block;margin-bottom:5px;color:red;font-size:.7em;padding:10px 10px 10px 12px;border-radius:20px}@keyframes bounce{30%{transform:translateY(-2px)}60%{transform:translateY(0)}80%{transform:translateY(2px)}to{transform:translateY(0);opacity:.5}}@media (min-width: 768px){.chat-box{height:auto}}@media (min-width: 992px){.chat-box{height:auto}}.questions li:hover{background-color:#2c2863;color:#fff}.questions li{border-radius:15px;color:#2c2863;text-transform:capitalize}.autosuggest{position:absolute;top:auto;right:auto;left:auto;bottom:115px;transform:translateY(38px);will-change:transform;float:left;min-width:10rem;padding:0;margin:.125rem 0 0;font-size:13px;color:#212529;text-align:left;background-color:#fff;background-clip:padding-box;border-top-left-radius:15px;border-top-right-radius:15px;border:1px solid rgba(0,0,0,.15);z-index:99;width:93%}.autosuggest ul{list-style:none;height:240px;overflow:auto}.autosuggest li{cursor:pointer;font-size:13px;padding:10px;margin:0;border-bottom:solid 1px #efefef}.autosuggest .auto-suggestions-close .close-btn{font-size:13px;color:#000}.autosuggest li:hover{color:#fff;background-color:#007cc3}.autosuggest ul::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #0000004d;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#f5f5f5}.autosuggest ul::-webkit-scrollbar{width:10px;background-color:#f5f5f5}.autosuggest ul::-webkit-scrollbar-thumb{background-color:#007cc3;border:2px solid #555555}.chat-box .comment p{font-size:13px;width:90%;margin-bottom:14px!important;line-height:16px;text-align:left}.chat-box .comment #comment-input{border:0;border-radius:3px;display:inline-block;width:100%;background-color:#fff!important;padding:5px 20% 5px 10px;box-sizing:border-box;font-size:13px!important;font-weight:400;font-style:normal;line-height:18px;color:#333;box-shadow:0 0 8px #ddd;height:40px}.chat-box .close-comment{display:block;position:absolute;right:8px;top:8px;line-height:20px;text-align:center;cursor:pointer}.chat-box .feedback-send{width:35px;float:right;position:relative;color:#007cc3;font-size:13px;margin-top:-30px;margin-right:10px;border-radius:2px;cursor:pointer}.chat-box .thumbs{float:right;margin-right:-5px}.chat-box .thumbs-up{width:18px;height:18px;margin-right:14px;cursor:pointer;float:left;color:#555;background-image:url(../../../../../../assets/images/chabot/like-inactive.svg);background-repeat:no-repeat;margin-top:0;background-size:contain}.chat-box .thumbs-down{width:18px;height:18px;cursor:pointer;float:left;color:#555;background-image:url(../../../../../../assets/images/chabot/dislike-inactive.svg);background-repeat:no-repeat;margin-top:3px;background-size:contain}.chat-box .thumbs-down.active{background-image:url(../../../../../../assets/images/chabot/dislike-active.svg)}.chat-box .thumbs-up.active{color:#007cc3;background-image:url(../../../../../../assets/images/chabot/like-active.svg)}.chat-box .comment{padding:10px 15px;top:20px;left:0;min-width:290px;margin-left:40px;width:calc(100% - 40px);border-radius:4px;z-index:99;color:#333;background-color:#fff;box-shadow:0 0 8px #ddd;-webkit-box-shadow:0 0 8px 0 #ddd}.chat-box .comment #comment-input::placeholder{font-size:13px}\n"], components: [{ type: i3.ChatAvatarComponent, selector: "app-chat-avatar", inputs: ["image"] }, { type: i4.ChatInputComponent, selector: "app-chat-input", inputs: ["buttonText", "focus", "clearSearch"], outputs: ["send", "searchto", "dismiss"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "keys": i6.KeysPipe, "date": i5.DatePipe }, animations: [fadeInOut, fadeIn] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-chat-widget',
                    templateUrl: './chat-widget.component.html',
                    styleUrls: ['./chat-widget.component.scss'],
                    animations: [fadeInOut, fadeIn]
                }]
        }], ctorParameters: function () { return [{ type: i1.ChatBotRasaService }, { type: i2.DataStoreService }]; }, propDecorators: { bottom: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1tb2R1bGUvY2hhdC1yZWRiaXJkLWFpL3NyYy9saWIvcGljcy1jaGF0LXJlZGJpcmQtYWkvY2hhdC1yZWRiaXJkLWFpL2NoYXQtd2lkZ2V0L2NoYXQtd2lkZ2V0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtbW9kdWxlL2NoYXQtcmVkYmlyZC1haS9zcmMvbGliL3BpY3MtY2hhdC1yZWRiaXJkLWFpL2NoYXQtcmVkYmlyZC1haS9jaGF0LXdpZGdldC9jaGF0LXdpZGdldC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlGLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7Ozs7Ozs7O0FBSXZFLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztBQVEzRCxNQUFNLE9BQU8sbUJBQW1CO0lBc0I5QixZQUFZLFdBQStCLEVBQVUsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBcEJwRSxVQUFLLEdBQTRCLE1BQU0sQ0FBQztRQUN4QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FB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QUFPLE9BQU8sQ0FBQztTQUNoQjtJQUNILENBQUM7SUFDRCxjQUFjLENBQUMsTUFBVztJQUUxQixDQUFDOztpSEExU1UsbUJBQW1CO3FHQUFuQixtQkFBbUIsOFpDbEJoQyxtNExBa0hNLCt3T0RsR1EsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDOzRGQUVwQixtQkFBbUI7a0JBTi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsV0FBVyxFQUFFLDhCQUE4QjtvQkFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQzNDLFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7aUJBQ2hDO3dJQUVzQixNQUFNO3NCQUExQixTQUFTO3VCQUFDLFFBQVE7Z0JBQ0gsS0FBSztzQkFBcEIsS0FBSztnQkFDVSxPQUFPO3NCQUF0QixLQUFLO2dCQUNVLFNBQVM7c0JBQXhCLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ1UsZUFBZTtzQkFBOUIsS0FBSztnQkFDVSxNQUFNO3NCQUFyQixLQUFLO2dCQWdDYyxPQUFPO3NCQUExQixLQUFLO2dCQStITixtQkFBbUI7c0JBRGxCLFlBQVk7dUJBQUMsbUJBQW1CLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBdUkvQyxTQUFTLGlCQUFpQixDQUFDLEdBQVE7SUFDakMsSUFBSTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmYWRlSW4sIGZhZGVJbk91dCB9IGZyb20gJy4uL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDaGF0Qm90UmFzYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9AY29yZS9zZXJ2aWNlL2NoYXRib3QtcmFzYS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSQkFDSU5GTyB9IGZyb20gJy4uLy4uL0Bjb3JlL3VybHMvY2hhdC1yZWRiaXJkLWFpLXVybC5jb25maWcnO1xyXG5pbXBvcnQgeyBEYXRhU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vQGNvcmUvc2VydmljZS9kYXRhLXN0b3JlLnNlcnZpY2UnO1xyXG5cclxuZGVjbGFyZSBsZXQgJDogYW55O1xyXG5jb25zdCByYW5kID0gKG1heDogYW55KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtY2hhdC13aWRnZXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGF0LXdpZGdldC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY2hhdC13aWRnZXQuY29tcG9uZW50LnNjc3MnXSxcclxuICBhbmltYXRpb25zOiBbZmFkZUluT3V0LCBmYWRlSW5dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGF0V2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKCdib3R0b20nKSBib3R0b20hOiBFbGVtZW50UmVmO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB0aGVtZTogJ2JsdWUnIHwgJ2dyZXknIHwgJ3JlZCcgPSAnYmx1ZSc7XHJcbiAgQElucHV0KCkgcHVibGljIGJvdE5hbWUgPSAnQm90JztcclxuICBASW5wdXQoKSBwdWJsaWMgYm90QXZhdGFyID0gJy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvcmVkYmlyZF9haS5wbmcnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VyQXZhdGFyID0gJy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvY2hhdF9hdmF0b3IucG5nJztcclxuICBASW5wdXQoKSB1cmw6IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgc3RhcnRpbmdNZXNzYWdlOiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIG9wZW5lZCA9IGZhbHNlO1xyXG4gIHNwaW4gPSBmYWxzZTtcclxuICBtZW51TGlzdCA9IFtdO1xyXG4gIG9wZW5GZWVkYmFjayA9IGZhbHNlO1xyXG4gIHNlbGVjdGVkbWVzc2FnZSA9ICcnO1xyXG4gIHNlbGVjdFF1ZXN0aW9uID0gJyc7XHJcbiAgcHVibGljIF92aXNpYmxlID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBjaGF0U2VydmljZTogQ2hhdEJvdFJhc2FTZXJ2aWNlO1xyXG4gIGVudmlyb25tZW50OiBhbnk7XHJcbiAgUkJBQ09SRzogUkJBQ0lORk8gPSBuZXcgUkJBQ0lORk8oKTtcclxuICBQRVJNSVNTSU9OOiBhbnk7XHJcbiAgb3JnU3VicyE6IFN1YnNjcmlwdGlvbjtcclxuICBvcmdJZDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjaGF0U2VydmljZTogQ2hhdEJvdFJhc2FTZXJ2aWNlLCBwcml2YXRlIF9zdG9yZXNlcnZpY2U6IERhdGFTdG9yZVNlcnZpY2UpIHtcclxuICAgIHRoaXMuY2hhdFNlcnZpY2UgPSBjaGF0U2VydmljZTtcclxuICAgIHRoaXMub3JnU3VicyA9ICB0aGlzLl9zdG9yZXNlcnZpY2UuY3VycmVudFN0b3JlLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHJlc1snUkJBQ09SRyddICYmIHJlc1snUkJBQ09SRyddICE9PSAnJykge1xyXG4gICAgICAgIHRoaXMuUkJBQ09SRyA9IHJlc1snUkJBQ09SRyddO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQgPSB0aGlzLlJCQUNPUkdbJ2Vudmlyb25tZW50J107XHJcbiAgICAgICAgdGhpcy5vcmdJZCA9IHBhcnNlSW50KHRoaXMuUkJBQ09SR1snb3JnSUQnXSk7XHJcbiAgICAgICAgaWYodGhpcy5lbnZpcm9ubWVudCl7XHJcbiAgICAgICAgICB0aGlzLmNoYXRTZXJ2aWNlLmNvbm5lY3QodGhpcy5lbnZpcm9ubWVudFsnQ2hhdEJvdCddKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB2aXNpYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgc2V0IHZpc2libGUodmlzaWJsZSkge1xyXG4gICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICAgICAgdGhpcy5mb2N1c01lc3NhZ2UoKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZm9jdXMgPSBuZXcgU3ViamVjdCgpO1xyXG4gIHB1YmxpYyBjbGVhclNlYXJjaCA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHB1YmxpYyBvcGVyYXRvcjogYW55O1xyXG5cclxuICBwdWJsaWMgY2xpZW50OiBhbnk7XHJcblxyXG4gIHB1YmxpYyBtZXNzYWdlczogYW55W10gPSBbXTtcclxuICBjdXJyZW50TWVzc2FnZXM6IGFueVtdID0gW107XHJcbiAgc2VsZTogYW55O1xyXG4gIGNoYXJ0OiBhbnk7XHJcbiAgcHVibGljIGFkZE1lc3NhZ2UoZnJvbTogYW55LCB0ZXh0OiBhbnksIHR5cGU6ICdyZWNlaXZlZCcgfCAnc2VudCcsIGlzbGlrZTogYm9vbGVhbiwgaXNkaXNsaWtlOiBib29sZWFuLCBxdWVzdGlvbjogYW55KSB7XHJcbiAgICB0aGlzLnNwaW4gPSBmYWxzZTtcclxuICAgIHRoaXMubWVzc2FnZXMudW5zaGlmdCh7XHJcbiAgICAgIGZyb20sXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGRhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICBpc2xpa2UsXHJcbiAgICAgIGlzZGlzbGlrZSxcclxuICAgICAgcXVlc3Rpb25cclxuICAgIH0pO1xyXG4gICAgdGhpcy5jdXJyZW50TWVzc2FnZXMudW5zaGlmdCh7XHJcbiAgICAgIGZyb20sXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGRhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICBpc2xpa2UsXHJcbiAgICAgIGlzZGlzbGlrZSxcclxuICAgICAgcXVlc3Rpb25cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvQm90dG9tKCkge1xyXG4gICAgaWYgKHRoaXMuYm90dG9tICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5ib3R0b20ubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvY3VzTWVzc2FnZSgpIHtcclxuICAgIHRoaXMuZm9jdXMubmV4dCh0cnVlKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgfVxyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLnN0YXJ0aW5nTWVzc2FnZSA9ICdIaSwgaG93IGNhbiB3ZSBoZWxwIHlvdT8nO1xyXG4gICAgdGhpcy5jbGllbnQgPSB7XHJcbiAgICAgIG5hbWU6ICdHdWVzdCBVc2VyJyxcclxuICAgICAgc3RhdHVzOiAnb25saW5lJyxcclxuICAgICAgYXZhdGFyOiB0aGlzLnVzZXJBdmF0YXJcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5vcGVyYXRvciA9IHtcclxuICAgICAgbmFtZTogdGhpcy5ib3ROYW1lLFxyXG4gICAgICBzdGF0dXM6ICdvbmxpbmUnLFxyXG4gICAgICBhdmF0YXI6IHRoaXMuYm90QXZhdGFyXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMub3BlbmVkKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMudmlzaWJsZSA9IHRydWUpLCAxMDAwKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmFkZE1lc3NhZ2UodGhpcy5vcGVyYXRvciwgdGhpcy5zdGFydGluZ01lc3NhZ2UsICdyZWNlaXZlZCcsIGZhbHNlLCBmYWxzZSwgJycpO1xyXG4gICAgfSwgMTUwMCk7XHJcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIC8vICAgY29uc3Qgc3RhcnRpbmdNZXNzYWdlID0ge1xyXG4gICAgLy8gICAgIGRhdGE6IFsnUmVmZXJyYWxzJywgJ0V4cGVuc2VzJ10sXHJcbiAgICAvLyAgICAgZmlsdGVyOiAnJyxcclxuICAgIC8vICAgICBtc2c6ICdXb3VsZCB5b3UgbGlrZSB0byBjaGVjayB0aGUgYmVsb3cgaXRlbXMgPycsXHJcbiAgICAvLyAgICAgcmVzcG9uc2VfdHlwZTogJ3F1ZXN0aW9ucycsXHJcbiAgICAvLyAgICAgdXJsOiAnJ1xyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gICB0aGlzLmFkZE1lc3NhZ2UodGhpcy5vcGVyYXRvciwgc3RhcnRpbmdNZXNzYWdlLCAncmVjZWl2ZWQnLCBmYWxzZSwgZmFsc2UsICcnKTtcclxuICAgIC8vIH0sIDE1MDApO1xyXG4gICAgdGhpcy5jaGF0U2VydmljZS5nZXRNZXNzYWdlcygpLnN1YnNjcmliZSgobWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3BpbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IG1zZyA9IGlzVmFsaWRKU09OU3RyaW5nKG1lc3NhZ2UudGV4dCkgPyBKU09OLnBhcnNlKG1lc3NhZ2UudGV4dCkgOiBtZXNzYWdlLnRleHQ7XHJcbiAgICAgICAgdGhpcy5hZGRNZXNzYWdlKHRoaXMub3BlcmF0b3IsIG1zZywgJ3JlY2VpdmVkJywgZmFsc2UsIGZhbHNlLCB0aGlzLnNlbGVjdFF1ZXN0aW9uKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgICAgIHRoaXMuZm9jdXNNZXNzYWdlKCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVDaGF0KCkge1xyXG4gICAgdGhpcy52aXNpYmxlID0gIXRoaXMudmlzaWJsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZW5kTWVzc2FnZSh7IG1lc3NhZ2UgfTogYW55KSB7XHJcbiAgICB0aGlzLnNlbGVjdFF1ZXN0aW9uID0gbWVzc2FnZTtcclxuICAgIGlmIChtZXNzYWdlLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY3VycmVudE1lc3NhZ2UgPSB0aGlzLnNlbmRNZW51S2V5KG1lc3NhZ2UpO1xyXG4gICAgdGhpcy5hZGRNZXNzYWdlKHRoaXMuY2xpZW50LCBtZXNzYWdlLCAnc2VudCcsIGZhbHNlLCBmYWxzZSwgdGhpcy5zZWxlY3RRdWVzdGlvbik7XHJcbiAgICB0aGlzLnNwaW4gPSB0cnVlO1xyXG4gICAgdGhpcy5jaGF0U2VydmljZS5zZW5kTWVzc2FnZShjdXJyZW50TWVzc2FnZSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZWFyY2hNZXNzYWdlKHsgbWVzc2FnZSB9OiBhbnkpIHtcclxuICAgIGlmIChtZXNzYWdlLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGF0U2VydmljZVxyXG4gICAgICAuc2VhcmNoTWVudXMobWVzc2FnZSlcclxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDIwMDApKVxyXG4gICAgICAuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoeCkge1xyXG4gICAgICAgICAgdGhpcy5tZW51TGlzdCA9IHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxyXG4gIGhhbmRsZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXkgPT09ICcvJykge1xyXG4gICAgICB0aGlzLmZvY3VzTWVzc2FnZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJz8nICYmICF0aGlzLl92aXNpYmxlKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlQ2hhdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBjbG9zZUNoYXRCb3QoKSB7XHJcbiAgICB0aGlzLm1lc3NhZ2VzID0gW107XHJcbiAgICB0aGlzLmNoYXRTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIHRoaXMuc3RhcnRpbmdNZXNzYWdlID0gJ0hpLCBob3cgY2FuIHdlIGhlbHAgeW91Pyc7XHJcbiAgfVxyXG4gIHNob3dNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IGFueSB7XHJcbiAgICBpZiAobWVzc2FnZS50ZXh0ICYmIG1lc3NhZ2UudGV4dC5yZXNwb25zZV90eXBlKSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnRleHQucmVzcG9uc2VfdHlwZSA9PT0gJ3RhYmxlJyB8fFxyXG4gICAgICAgIG1lc3NhZ2UudGV4dC5yZXNwb25zZV90eXBlID09PSAndGV4dCcgfHxcclxuICAgICAgICBtZXNzYWdlLnRleHQucmVzcG9uc2VfdHlwZSA9PT0gJ3F1ZXN0aW9ucycgfHxcclxuICAgICAgICBtZXNzYWdlLnRleHQucmVzcG9uc2VfdHlwZSA9PT0gJ2xpbmsnXHJcbiAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc2hvd1RhYmxlKG1lc3NhZ2U6IGFueSwgdHlwZTogYW55KTogYW55IHtcclxuICAgIGlmIChtZXNzYWdlLnRleHQgJiYgbWVzc2FnZS50ZXh0LnJlc3BvbnNlX3R5cGUpIHtcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UudGV4dC5yZXNwb25zZV90eXBlID09PSB0eXBlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBnZXRIZWFkZXJOYW1lKG1lc3NhZ2U6IGFueSk6IGFueSB7XHJcbiAgICBpZiAobWVzc2FnZS50ZXh0ICYmIG1lc3NhZ2UudGV4dC5kYXRhKSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnRleHQuZGF0YVswXTtcclxuICAgIH1cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcbiAgZ2V0Q29sdW1uRGF0YShtZXNzYWdlOiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKG1lc3NhZ2UudGV4dCAmJiBtZXNzYWdlLnRleHQuZGF0YSkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS50ZXh0LmRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG4gIHJhaXNlUXVlc3Rpb25zKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgdGhpcy5zZW5kTWVzc2FnZSh7IG1lc3NhZ2UgfSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICB0aGlzLmZvY3VzTWVzc2FnZSgpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG4gIHNlbGVjdE1lc3NhZ2UobWVzc2FnZTogYW55KSB7XHJcbiAgICB0aGlzLnRvZ2dsZVNob3coKTtcclxuICAgIHRoaXMudG9DbGVhclNlYXJjaCgpO1xyXG4gICAgdGhpcy5zZW5kTWVzc2FnZSh7IG1lc3NhZ2UgfSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICB0aGlzLmZvY3VzTWVzc2FnZSgpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG4gIHRvQ2xlYXJTZWFyY2goKSB7XHJcbiAgICB0aGlzLmNsZWFyU2VhcmNoLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG4gIGRvd25sb2FkRmlsZShtZXNzYWdlOiBhbnkpIHtcclxuICAgIGlmIChtZXNzYWdlLnRleHQudXJsKSB7XHJcbiAgICAgIHdpbmRvdy5vcGVuKG1lc3NhZ2UudGV4dC51cmwsICdfYmxhbmsnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvZ2dsZVNob3coKSB7XHJcbiAgICB0aGlzLm1lbnVMaXN0ID0gW107XHJcbiAgfVxyXG4gIGFjdGl2ZUxpa2UobWVzc2FnZTogYW55KSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkbWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmN1cnJlbnRNZXNzYWdlcyA9IHRoaXMuY3VycmVudE1lc3NhZ2VzLm1hcCh4ID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiB4LnR5cGUsXHJcbiAgICAgICAgdGV4dDogeC50ZXh0LFxyXG4gICAgICAgIGlzbGlrZTogeC50ZXh0ID09PSBtZXNzYWdlLnRleHQgPyB0cnVlIDogeC5pc2xpa2UsXHJcbiAgICAgICAgaXNkaXNsaWtlOiB4LnRleHQgPT09IG1lc3NhZ2UudGV4dCA/IGZhbHNlIDogeC5pc2Rpc2xpa2UsXHJcbiAgICAgICAgZnJvbTogeC5mcm9tLFxyXG4gICAgICAgIGRhdGU6IHguZGF0ZSxcclxuICAgICAgICBxdWVzdGlvbjogeC5xdWVzdGlvblxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9wZW5GZWVkYmFjayA9IHRydWU7XHJcbiAgfVxyXG4gIGFjdGl2ZURpc0xpa2UobWVzc2FnZTogYW55KSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkbWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmN1cnJlbnRNZXNzYWdlcyA9IHRoaXMuY3VycmVudE1lc3NhZ2VzLm1hcCh4ID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiB4LnR5cGUsXHJcbiAgICAgICAgdGV4dDogeC50ZXh0LFxyXG4gICAgICAgIGlzbGlrZTogeC50ZXh0ID09PSBtZXNzYWdlLnRleHQgPyBmYWxzZSA6IHguaXNsaWtlLFxyXG4gICAgICAgIGlzZGlzbGlrZTogeC50ZXh0ID09PSBtZXNzYWdlLnRleHQgPyB0cnVlIDogeC5pc2Rpc2xpa2UsXHJcbiAgICAgICAgZnJvbTogeC5mcm9tLFxyXG4gICAgICAgIGRhdGU6IHguZGF0ZSxcclxuICAgICAgICBxdWVzdGlvbjogeC5xdWVzdGlvblxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9wZW5GZWVkYmFjayA9IHRydWU7XHJcbiAgfVxyXG4gIGdldExpa2VTdGF0dXMobWVzc2FnZTogYW55KSB7XHJcbiAgICBjb25zdCBpc0xpa2UgPSB0aGlzLmN1cnJlbnRNZXNzYWdlcy5maWx0ZXIoeCA9PiB4LnRleHQgPT09IG1lc3NhZ2UudGV4dCAmJiB4LmlzbGlrZSk7XHJcbiAgICByZXR1cm4gaXNMaWtlLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldERpc0xpa2VTdGF0dXMobWVzc2FnZTogYW55KSB7XHJcbiAgICBjb25zdCBpc0Rpc0xpa2UgPSB0aGlzLmN1cnJlbnRNZXNzYWdlcy5maWx0ZXIoeCA9PiB4LnRleHQgPT09IG1lc3NhZ2UudGV4dCAmJiB4LmlzZGlzbGlrZSk7XHJcbiAgICByZXR1cm4gaXNEaXNMaWtlLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIHNlbmRGZWVkYmFjayhtZXNzYWdlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZlZWRiYWNrUXVlID0gdGhpcy5jdXJyZW50TWVzc2FnZXMuZmlsdGVyKHggPT4geC50ZXh0ID09PSBtZXNzYWdlLnRleHQpO1xyXG4gICAgaWYgKGZlZWRiYWNrUXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5jaGF0U2VydmljZS5zZW5kRmVlZGJhY2soZmVlZGJhY2tRdWVbMF0pLnN1YnNjcmliZShfeCA9PiB7XHJcbiAgICAgICAgLy9ub3QgdG8gYmUgZW1wdHlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsb3NlRmVlZGJhY2soKTtcclxuICB9XHJcbiAgY2xvc2VGZWVkYmFjaygpIHtcclxuICAgIHRoaXMub3BlbkZlZWRiYWNrID0gZmFsc2U7XHJcbiAgfVxyXG4gIHNlbmRNZW51S2V5KG1lc3NhZ2U6IGFueSkge1xyXG4gICAgaWYgKG1lc3NhZ2UgPT09ICdSZWZlcnJhbHMnKSB7XHJcbiAgICAgIHJldHVybiAnb3JyZWYgbWVudSc7XHJcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgPT09ICdFeHBlbnNlcycpIHtcclxuICAgICAgcmV0dXJuICdvcmV4cCBtZW51JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDaGF0Qm90SW5mbyhfbW9kYWw6IGFueSl7XHJcblxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNWYWxpZEpTT05TdHJpbmcoc3RyOiBhbnkpIHtcclxuICB0cnkge1xyXG4gICAgSlNPTi5wYXJzZShzdHIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cIndyYXBwZXIge3sgdGhlbWUgfX1cIj5cclxuICA8ZGl2IGNsYXNzPVwiY2hhdC1ib3hcIiAqbmdJZj1cInZpc2libGVcIiBbQGZhZGVJbk91dF09XCJ2aXNpYmxlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2hhdC1ib3gtYm9keVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1ib3gtaGVhZGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm9wZXJhdG9yLXN0YXR1c1wiPlxyXG4gICAgICAgICAgICA8IS0tIHt7IG9wZXJhdG9yLnN0YXR1cyB9fVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm9wZXJhdG9yLXN0YXR1cy1vbmxpbmVcIj7il488L3NwYW4+IC0tPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2hhdC1idXR0b24taGVhZGVyXCIgKGNsaWNrKT1cInRvZ2dsZUNoYXQoKVwiPuKclTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8YXBwLWNoYXQtYXZhdGFyIGNsYXNzPVwibWFpbi1hdmF0YXJcIiBbaW1hZ2VdPVwib3BlcmF0b3IuYXZhdGFyXCI+PC9hcHAtY2hhdC1hdmF0YXI+XHJcbiAgICAgICAgICA8aDMgY2xhc3M9XCJvcGVyYXRvci1uYW1lIGQtbm9uZVwiPlxyXG4gICAgICAgICAgICB7eyBvcGVyYXRvci5uYW1lIH19XHJcbiAgICAgICAgICA8L2gzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNoYXQtYm94LW1haW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1tZXNzYWdlLWJvdHRvbVwiICNib3R0b20+PC9kaXY+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbWVzc2FnZSBvZiBtZXNzYWdlc1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtbWVzc2FnZSBtLTIgbWItNFwiIFtjbGFzcy5jaGF0LW1lc3NhZ2UtcmVjZWl2ZWRdPVwibWVzc2FnZS50eXBlID09PSAncmVjZWl2ZWQnXCIgW0BmYWRlSW5dXHJcbiAgICAgICAgICAgIFtjbGFzcy5jaGF0LW1lc3NhZ2Utc2VudF09XCJtZXNzYWdlLnR5cGUgPT09ICdzZW50J1wiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxhcHAtY2hhdC1hdmF0YXIgW2ltYWdlXT1cIm1lc3NhZ2UuZnJvbS5hdmF0YXJcIiBjbGFzcz1cImNoYXQtbWVzc2FnZS1mcm9tLWF2YXRhclwiPjwvYXBwLWNoYXQtYXZhdGFyPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1lc3NhZ2UtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAge3sgc2hvd01lc3NhZ2UobWVzc2FnZSkgPyBtZXNzYWdlPy50ZXh0Py5tc2cgOiBtZXNzYWdlPy50ZXh0IH19XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgKm5nSWY9XCJzaG93VGFibGUobWVzc2FnZSwgJ3RhYmxlJylcIiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJweC0xIHB5LTFcIiAqbmdGb3I9XCJsZXQgaGVhZCBvZiBnZXRIZWFkZXJOYW1lKG1lc3NhZ2UpIHwga2V5c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBoZWFkIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ2V0Q29sdW1uRGF0YShtZXNzYWdlKS5zbGljZSgwLCA0KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicHgtMSBweS0xXCIgKm5nRm9yPVwibGV0IGxpc3Qgb2YgaXRlbSB8IGtleXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbVtsaXN0XSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VGFibGUobWVzc2FnZSwgJ3RhYmxlJylcIj5cclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnZXRDaGF0Qm90SW5mbyhtZXNzYWdlKVwiPkNsaWNrIGhlcmUgdG8gdmlldyBtb3JlPC9hPi5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dUYWJsZShtZXNzYWdlLCAnbGluaycpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbVwiIChjbGljayk9XCJkb3dubG9hZEZpbGUobWVzc2FnZSlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZW0gY2xhc3M9XCJwaSBwaS1kb3dubG9hZCBtci0xXCIgdGl0bGU9XCJEb3dubG9hZFwiPjwvZW0+RG93bmxvYWQ8L2J1dHRvbj4uXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImxpc3QtZ3JvdXAgcXVlc3Rpb25zIG10LTJcIiAqbmdJZj1cInNob3dUYWJsZShtZXNzYWdlLCAncXVlc3Rpb25zJylcIj5cclxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIHAtMiBtYi0xIGJvcmRlciBib3JkZXItcHJpbWFyeVwiIHJvbGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldENvbHVtbkRhdGEobWVzc2FnZSlcIiAoY2xpY2spPVwicmFpc2VRdWVzdGlvbnMoaXRlbSlcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBpdGVtIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtbWVzc2FnZS1kYXRlXCI+XHJcbiAgICAgICAgICAgICAge3sgbWVzc2FnZS5kYXRlIHwgZGF0ZTogJ3Nob3J0JyB9fVxyXG5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cImJvdHRvbTogLTZweFwiICpuZ0lmPVwibWVzc2FnZS50eXBlID09PSAncmVjZWl2ZWQnICYmIG1lc3NhZ2UucXVlc3Rpb25cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGh1bWJzXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHRpdGxlPVwiTGlrZVwiIG5nQ2xhc3M9XCJ7eyBnZXRMaWtlU3RhdHVzKG1lc3NhZ2UpID8gJ3RodW1icy11cCBhY3RpdmUnIDogJ3RodW1icy11cCcgfX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJhY3RpdmVMaWtlKG1lc3NhZ2UpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiB0aXRsZT1cIkRpc2xpa2VcIiBuZ0NsYXNzPVwie3sgZ2V0RGlzTGlrZVN0YXR1cyhtZXNzYWdlKSA/ICd0aHVtYnMtZG93biBhY3RpdmUnIDogJ3RodW1icy1kb3duJyB9fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImFjdGl2ZURpc0xpa2UobWVzc2FnZSlcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQgbXQtbjEgbWItM1wiICpuZ0lmPVwib3BlbkZlZWRiYWNrICYmIHNlbGVjdGVkbWVzc2FnZSA9PT0gbWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgIDxwPkVudGVyIHlvdXIgZmVlZGJhY2sgaGVyZTwvcD5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmVlZGJhY2stYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJUeXBlIGhlcmUgdG8gc2hhcmUgeW91ciBmZWVkYmFja1wiIGlkPVwiY29tbWVudC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiMTAwMFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmVlZGJhY2stc2VuZFwiIChjbGljayk9XCJzZW5kRmVlZGJhY2sobWVzc2FnZSlcIj5TZW5kPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zZS1jb21tZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8ZW0gY2xhc3M9XCJwaSBwaS10aW1lcyBjbG9zZS1idG5cIiB0aXRsZT1cImNsb3NlXCJcclxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTBweDsgaGVpZ2h0OiAxMHB4OyB2ZXJ0aWNhbC1hbGlnbjogdG9wOyBmb250LXNpemU6IDEycHhcIlxyXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xvc2VGZWVkYmFjaygpXCI+PC9lbT5cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwaW5nXCIgKm5nSWY9XCJzcGluXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidWJibGVcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWxsaXBzaXMgb25lXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVsbGlwc2lzIHR3b1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbGxpcHNpcyB0aHJlZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNoYXQtYm94LWZvb3RlclwiPlxyXG4gICAgICAgIDxhcHAtY2hhdC1pbnB1dCAoc2VuZCk9XCJzZW5kTWVzc2FnZSgkZXZlbnQpXCIgKHNlYXJjaHRvKT1cInNlYXJjaE1lc3NhZ2UoJGV2ZW50KVwiIChkaXNtaXNzKT1cInRvZ2dsZUNoYXQoKVwiXHJcbiAgICAgICAgICAoZm9jdXMpPVwiKGZvY3VzKVwiIFtjbGVhclNlYXJjaF09XCJjbGVhclNlYXJjaFwiPjwvYXBwLWNoYXQtaW5wdXQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXV0b3N1Z2dlc3RcIiAqbmdJZj1cIm1lbnVMaXN0Lmxlbmd0aCA+IDBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtYnRuIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWVuZCBteC0yIG15LTJcIj5cclxuICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cImF1dG8tc3VnZ2VzdGlvbnMtY2xvc2UgdGV4dC1yaWdodFwiIChjbGljayk9XCJ0b2dnbGVTaG93KClcIj5cclxuICAgICAgICAgICAgPGVtIGNsYXNzPVwicGkgcGktdGltZXMgY2xvc2UtYnRuXCIgdGl0bGU9XCJjbG9zZVwiPjwvZW0+XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwibWItMCBteC0yXCI+XHJcbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbWVudUxpc3RcIiAoY2xpY2spPVwic2VsZWN0TWVzc2FnZShpdGVtKVwiPlxyXG4gICAgICAgICAgICB7eyBpdGVtIH19XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGJ1dHRvbiBjbGFzcz1cImNoYXQtYnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZUNoYXQoKVwiPlxyXG4gICAgPHNwYW4gW0BmYWRlSW5dICpuZ0lmPVwidmlzaWJsZVwiPuKclTwvc3Bhbj5cclxuICAgIDxzcGFuIFtAZmFkZUluXSAqbmdJZj1cIiF2aXNpYmxlXCI+XHJcbiAgICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9jaGF0LnBuZ1wiIHdpZHRoPVwiMjBcIiBhbHQ9XCJjaGF0LWljb25cIiAvPlxyXG4gICAgPC9zcGFuPlxyXG4gIDwvYnV0dG9uPlxyXG48L2Rpdj4iXX0=