import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DataStoreService } from './data-store.service';
import * as i0 from "@angular/core";
export declare class ChatBotRasaService {
    private http;
    private _storeservice;
    private socket;
    chatBotUrl: any;
    RBACORG: any;
    url: any;
    tokenKey: any;
    constructor(http: HttpClient, _storeservice: DataStoreService);
    connect(url: string): void;
    sendMessage(message: any): void;
    getMessages: () => Observable<unknown>;
    disconnect(): void;
    searchMenus(modal: any): Observable<Object>;
    sendFeedback(modal: any): Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatBotRasaService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ChatBotRasaService>;
}
