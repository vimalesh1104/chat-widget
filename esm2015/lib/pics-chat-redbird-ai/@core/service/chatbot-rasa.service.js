import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./data-store.service";
export class ChatBotRasaService {
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
ChatBotRasaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatBotRasaService, deps: [{ token: i1.HttpClient }, { token: i2.DataStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
ChatBotRasaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatBotRasaService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatBotRasaService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.DataStoreService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGJvdC1yYXNhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLW1vZHVsZS9jaGF0LXJlZGJpcmQtYWkvc3JjL2xpYi9waWNzLWNoYXQtcmVkYmlyZC1haS9AY29yZS9zZXJ2aWNlL2NoYXRib3QtcmFzYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBTzdDLE1BQU0sT0FBTyxrQkFBa0I7SUFNN0IseUNBQXlDO0lBQ3pDLFlBQW9CLElBQWdCLEVBQVUsYUFBK0I7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQWlFdEUsZ0JBQVcsR0FBRyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUU7b0JBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUF0RUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDckQsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlCLElBQUks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YmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IERhdGFTdG9yZVNlcnZpY2UgfSBmcm9tICcuL2RhdGEtc3RvcmUuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGF0Qm90UmFzYVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc29ja2V0OiBhbnk7XHJcbiAgY2hhdEJvdFVybDogYW55O1xyXG4gIFJCQUNPUkc6IGFueTtcclxuICB1cmw6IGFueTtcclxuICB0b2tlbktleTogYW55O1xyXG4gIC8vIGNoYXRCb3RVcmwgPSAnZW52aXJvbm1lbnQuQ2hhdEJvdE5ldyc7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9zdG9yZXNlcnZpY2U6IERhdGFTdG9yZVNlcnZpY2UpIHtcclxuICAgIHRoaXMuX3N0b3Jlc2VydmljZS5jdXJyZW50U3RvcmUuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocmVzWydSQkFDT1JHJ10gJiYgcmVzWydSQkFDT1JHJ10gIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5SQkFDT1JHID0gcmVzWydSQkFDT1JHJ107XHJcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLlJCQUNPUkdbJ2FwaUhvc3QnXSA/IHRoaXMuUkJBQ09SR1snYXBpSG9zdCddIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGknO1xyXG4gICAgICAgIHRoaXMudG9rZW5LZXkgPSB0aGlzLlJCQUNPUkdbJ3Rva2VuS2V5J107XHJcbiAgICAgICAgdGhpcy5jaGF0Qm90VXJsID0gdGhpcy5SQkFDT1JHLmVudmlyb25tZW50WydDaGF0Qm90TmV3J107XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbm5lY3QodXJsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRva2VudmFsdWVzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmJUb2tlbicpID8gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmJUb2tlbicpIDogJyc7XHJcbiAgICBjb25zdCB1c2VybmFtZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJykgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpIDogJyc7XHJcbiAgICBjb25zdCBlbWFpbCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2VtYWlsJykgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdlbWFpbCcpIDogJyc7XHJcbiAgICBjb25zdCBpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2lkJykgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdpZCcpIDogJyc7XHJcbiAgICB0aGlzLnNvY2tldCA9IGlvKHVybCwge1xyXG4gICAgICByZWNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgIHJlY29ubmVjdGlvbkRlbGF5OiAxMDAwLFxyXG4gICAgICByZWNvbm5lY3Rpb25EZWxheU1heDogNTAwMCxcclxuICAgICAgcmVjb25uZWN0aW9uQXR0ZW1wdHM6IEluZmluaXR5LFxyXG4gICAgICBmb3JjZU5ldzogdHJ1ZSxcclxuICAgICAgc2VjdXJlOiB0cnVlLFxyXG4gICAgICBxdWVyeToge1xyXG4gICAgICAgIHRva2VuOiB0b2tlbnZhbHVlcyA/IHRva2VudmFsdWVzIDogJycsXHJcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lID8gdXNlcm5hbWUgOiAnVHVsYXNpcmVkZHknLFxyXG4gICAgICAgIGVtYWlsOiBlbWFpbCA/IGVtYWlsIDogJ3R1bGFzaUBjYXJkaW5hbGl0eS5haScsXHJcbiAgICAgICAgaWQ6IGlkID8gaWQgOiAnMTIzNCdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdCcsICgpID0+IHtcclxuICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2Vzc2lvbl9yZXF1ZXN0JywgeyBzZXNzaW9uX2lkOiB0aGlzLnNvY2tldC5pZCB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zb2NrZXQub24oJ3Nlc3Npb25fY29uZmlybScsIChfcmVtb3RlX2lkOiBhbnkpID0+IHtcclxuICAgICAgLy9ub3QgdG8gYmUgZW1wdHlcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RfZXJyb3InLCAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNvY2tldC5vbignZXJyb3InLCAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNvY2tldC5vbignZGlzY29ubmVjdCcsIChyZWFzb246IGFueSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZWFzb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KSB7XHJcbiAgICBjb25zdCB0b2tlbnZhbHVlcyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZiVG9rZW4nKSA/IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZiVG9rZW4nKSA6ICcnO1xyXG4gICAgY29uc3QgdXNlcm5hbWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpID8gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSA6ICcnO1xyXG4gICAgY29uc3QgZW1haWwgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdlbWFpbCcpID8gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZW1haWwnKSA6ICcnO1xyXG4gICAgY29uc3QgaWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdpZCcpID8gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnaWQnKSA6ICcnO1xyXG4gICAgdGhpcy5zb2NrZXQuZW1pdCgndXNlcl91dHRlcmVkJywge1xyXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICBjdXN0b21EYXRhOiB7XHJcbiAgICAgICAgdG9rZW46IHRva2VudmFsdWVzID8gdG9rZW52YWx1ZXMgOiAnJyxcclxuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUgPyB1c2VybmFtZSA6ICcnLFxyXG4gICAgICAgIGVtYWlsOiBlbWFpbCA/IGVtYWlsIDogJycsXHJcbiAgICAgICAgaWQ6IGlkID8gaWQgOiAnJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNZXNzYWdlcyA9ICgpID0+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdib3RfdXR0ZXJlZCcsIChtZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICBvYnNlcnZlci5uZXh0KG1lc3NhZ2UpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcHVibGljIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICB0aGlzLnNvY2tldC5vbignZGlzY29ubmVjdCcsIChyZWFzb246IGFueSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZWFzb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZWFyY2hNZW51cyhtb2RhbDogYW55KSB7XHJcbiAgICBjb25zdCBpbnB1dFJlcXVlc3QgPSB7XHJcbiAgICAgIHF1ZXJ5OiBtb2RhbFxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmNoYXRCb3RVcmwgKyAnc2VhcmNoJywgaW5wdXRSZXF1ZXN0KTtcclxuICB9XHJcbiAgcHVibGljIHNlbmRGZWVkYmFjayhtb2RhbDogYW55KSB7XHJcbiAgICBjb25zdCBpbnB1dFJlcXVlc3QgPSB7XHJcbiAgICAgIHVzZXI6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJykgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpIDogJycsXHJcbiAgICAgIHF1ZXN0aW9uOiBtb2RhbC5xdWVzdGlvbixcclxuICAgICAgaXNMaWtlZDogbW9kYWwuaXNsaWtlID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY2hhdEJvdFVybCArICdmZWVkYmFjaycsIGlucHV0UmVxdWVzdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==