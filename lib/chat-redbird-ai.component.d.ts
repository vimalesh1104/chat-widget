import { OnInit } from '@angular/core';
import { RBACINFO } from './pics-chat-redbird-ai/@core/urls/chat-redbird-ai-url.config';
import { Observable } from 'rxjs';
import { PermissionStore } from './pics-chat-redbird-ai/@core/permissions/permission.store';
import { DataStoreService } from './pics-chat-redbird-ai/@core/service/data-store.service';
import * as i0 from "@angular/core";
export declare class ChatRedbirdAiComponent implements OnInit {
    private permissionStore;
    private _storeservice;
    RBACORG?: RBACINFO;
    PERMISSION?: any;
    chatEvent: Observable<any>;
    constructor(permissionStore: PermissionStore, _storeservice: DataStoreService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatRedbirdAiComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChatRedbirdAiComponent, "chat-redbird-ai", never, { "RBACORG": "RBACORG"; "PERMISSION": "PERMISSION"; "chatEvent": "chatEvent"; }, {}, never, never>;
}
