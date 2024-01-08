import { Component, Input } from '@angular/core';
import { RBACINFO } from './pics-chat-redbird-ai/@core/urls/chat-redbird-ai-url.config';
import * as i0 from "@angular/core";
import * as i1 from "./pics-chat-redbird-ai/@core/permissions/permission.store";
import * as i2 from "./pics-chat-redbird-ai/@core/service/data-store.service";
import * as i3 from "./pics-chat-redbird-ai/chat-redbird-ai/chat-widget/chat-widget.component";
export class ChatRedbirdAiComponent {
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
ChatRedbirdAiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatRedbirdAiComponent, deps: [{ token: i1.PermissionStore }, { token: i2.DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
ChatRedbirdAiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatRedbirdAiComponent, selector: "chat-redbird-ai", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", chatEvent: "chatEvent" }, ngImport: i0, template: `
      <app-chat-widget botName="Cardinality" theme="blue"></app-chat-widget>
  `, isInline: true, components: [{ type: i3.ChatWidgetComponent, selector: "app-chat-widget", inputs: ["theme", "botName", "botAvatar", "userAvatar", "url", "startingMessage", "opened", "visible"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ChatRedbirdAiComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'chat-redbird-ai',
                    template: `
      <app-chat-widget botName="Cardinality" theme="blue"></app-chat-widget>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.PermissionStore }, { type: i2.DataStoreService }]; }, propDecorators: { RBACORG: [{
                type: Input
            }], PERMISSION: [{
                type: Input
            }], chatEvent: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yZWRiaXJkLWFpLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtbW9kdWxlL2NoYXQtcmVkYmlyZC1haS9zcmMvbGliL2NoYXQtcmVkYmlyZC1haS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhEQUE4RCxDQUFDOzs7OztBQWF4RixNQUFNLE9BQU8sc0JBQXNCO0lBTWpDLFlBQ1UsZUFBZ0MsRUFDaEMsYUFBK0I7UUFEL0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQU56QixZQUFPLEdBQWMsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQVFwRCxDQUFDO0lBQ0QsUUFBUTtRQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7O29IQWxCVSxzQkFBc0I7d0dBQXRCLHNCQUFzQix5SUFOdkI7O0dBRVQ7NEZBSVUsc0JBQXNCO2tCQVJsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRTs7R0FFVDtvQkFDRCxNQUFNLEVBQUUsRUFDUDtpQkFDRjtxSUFHaUIsT0FBTztzQkFBdEIsS0FBSztnQkFDVSxVQUFVO3NCQUF6QixLQUFLO2dCQUNVLFNBQVM7c0JBQXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUkJBQ0lORk8gfSBmcm9tICcuL3BpY3MtY2hhdC1yZWRiaXJkLWFpL0Bjb3JlL3VybHMvY2hhdC1yZWRiaXJkLWFpLXVybC5jb25maWcnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFBlcm1pc3Npb25TdG9yZSB9IGZyb20gJy4vcGljcy1jaGF0LXJlZGJpcmQtYWkvQGNvcmUvcGVybWlzc2lvbnMvcGVybWlzc2lvbi5zdG9yZSc7XHJcbmltcG9ydCB7IERhdGFTdG9yZVNlcnZpY2UgfSBmcm9tICcuL3BpY3MtY2hhdC1yZWRiaXJkLWFpL0Bjb3JlL3NlcnZpY2UvZGF0YS1zdG9yZS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY2hhdC1yZWRiaXJkLWFpJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICA8YXBwLWNoYXQtd2lkZ2V0IGJvdE5hbWU9XCJDYXJkaW5hbGl0eVwiIHRoZW1lPVwiYmx1ZVwiPjwvYXBwLWNoYXQtd2lkZ2V0PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hhdFJlZGJpcmRBaUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBSQkFDT1JHPzogUkJBQ0lORk8gPSBuZXcgUkJBQ0lORk8oKTtcclxuICBASW5wdXQoKSBwdWJsaWMgUEVSTUlTU0lPTj86IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgY2hhdEV2ZW50ITogT2JzZXJ2YWJsZTxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcGVybWlzc2lvblN0b3JlOiBQZXJtaXNzaW9uU3RvcmUsXHJcbiAgICBwcml2YXRlIF9zdG9yZXNlcnZpY2U6IERhdGFTdG9yZVNlcnZpY2VcclxuICApIHtcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAgdGhpcy5jaGF0RXZlbnQuc3Vic2NyaWJlKCh2YWw6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLlJCQUNPUkcgPSB2YWwuUkJBQ09SRztcclxuICAgICAgdGhpcy5QRVJNSVNTSU9OID0gdmFsLlBFUk1JU1NJT047XHJcbiAgICAgIHRoaXMuX3N0b3Jlc2VydmljZS5zZXREYXRhKCdSQkFDT1JHJywgdGhpcy5SQkFDT1JHKTtcclxuICAgICAgdGhpcy5wZXJtaXNzaW9uU3RvcmUuc2V0U3RvcmUodGhpcy5QRVJNSVNTSU9OKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=