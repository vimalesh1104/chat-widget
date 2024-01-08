import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ChatConfigComponent {
    theme: string;
    text: string;
    themeChange: EventEmitter<any>;
    themes: string[];
    setTheme(theme: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatConfigComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChatConfigComponent, "app-chat-config", never, { "theme": "theme"; "text": "text"; }, { "themeChange": "themeChange"; }, never, never>;
}
