import { Injectable } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AlertService {
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
AlertService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
AlertService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: AlertService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Router }]; } });
export var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType || (AlertType = {}));
export class Alert {
}
export class UserGroupDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class UserRolePageDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class UserRoleDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class UserDto {
    constructor(data) {
        Object.assign(this, data);
    }
}
export class AccessManagementConfig {
}
AccessManagementConfig.EndPoint = {
    Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtbW9kdWxlL2NoYXQtcmVkYmlyZC1haS9zcmMvbGliL3BpY3MtY2hhdC1yZWRiaXJkLWFpL0Bjb3JlL3NlcnZpY2UvYWxlcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sdUJBQXVCLENBQUM7OztBQUc3QixNQUFNLE9BQU8sWUFBWTtJQUl2QixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUgxQixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztRQUMvQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFHbkMsa0ZBQWtGO1FBQ2xGLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLElBQUksS0FBSyxZQUFZLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7b0JBQzdCLHNDQUFzQztvQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztpQkFDbkM7cUJBQU07b0JBQ0wsdUJBQXVCO29CQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Q7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFlLEVBQUUsT0FBZSxFQUFFLG9CQUFvQixHQUFHLEtBQUs7UUFDbEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsS0FBSztRQUNILGVBQWU7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBTSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDOzswR0EvQ1UsWUFBWTs4R0FBWixZQUFZOzRGQUFaLFlBQVk7a0JBRDFCLFVBQVU7O0FBc0RULE1BQU0sQ0FBTixJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFDbkIsK0NBQU8sQ0FBQTtJQUNQLDJDQUFLLENBQUE7SUFDTCx5Q0FBSSxDQUFBO0lBQ0osK0NBQU8sQ0FBQTtBQUNULENBQUMsRUFMVyxTQUFTLEtBQVQsU0FBUyxRQUtwQjtBQUNELE1BQU0sT0FBTyxLQUFLO0NBR2pCO0FBZ0JELE1BQU0sT0FBTyxZQUFZO0lBSXZCLFlBQVksSUFBNEI7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLGVBQWU7SUFPMUIsWUFBWSxJQUErQjtRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sV0FBVztJQVV0QixZQUFZLElBQTJCO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxPQUFPO0lBVWxCLFlBQVksSUFBdUI7UUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBQ0QsTUFBTSxPQUFPLHNCQUFzQjs7QUFDbkIsK0JBQVEsR0FBRztJQUN2QixZQUFZLEVBQUU7UUFDWixtQkFBbUIsRUFBRSx1QkFBdUI7UUFDNUMsZUFBZSxFQUFFLHlHQUF5RztLQUMzSDtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TdGFydCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbiAgZXhwb3J0IGNsYXNzIEFsZXJ0U2VydmljZSB7XHJcbiAgICBwcml2YXRlIHN1YmplY3QgPSBuZXcgU3ViamVjdDxBbGVydD4oKTtcclxuICAgIHByaXZhdGUga2VlcEFmdGVyUm91dGVDaGFuZ2UgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgIC8vIGNsZWFyIGFsZXJ0IG1lc3NhZ2VzIG9uIHJvdXRlIGNoYW5nZSB1bmxlc3MgJ2tlZXBBZnRlclJvdXRlQ2hhbmdlJyBmbGFnIGlzIHRydWVcclxuICAgICAgcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMua2VlcEFmdGVyUm91dGVDaGFuZ2UpIHtcclxuICAgICAgICAgICAgLy8gb25seSBrZWVwIGZvciBhIHNpbmdsZSByb3V0ZSBjaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy5rZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgYWxlcnQgbWVzc2FnZXNcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxlcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZywga2VlcEFmdGVyUm91dGVDaGFuZ2UgPSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmFsZXJ0KEFsZXJ0VHlwZS5TdWNjZXNzLCBtZXNzYWdlLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuYWxlcnQoQWxlcnRUeXBlLkVycm9yLCBtZXNzYWdlLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5mbyhtZXNzYWdlOiBzdHJpbmcsIGtlZXBBZnRlclJvdXRlQ2hhbmdlID0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5hbGVydChBbGVydFR5cGUuSW5mbywgbWVzc2FnZSwga2VlcEFmdGVyUm91dGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHdhcm4obWVzc2FnZTogc3RyaW5nLCBrZWVwQWZ0ZXJSb3V0ZUNoYW5nZSA9IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuYWxlcnQoQWxlcnRUeXBlLldhcm5pbmcsIG1lc3NhZ2UsIGtlZXBBZnRlclJvdXRlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBhbGVydCh0eXBlOiBBbGVydFR5cGUsIG1lc3NhZ2U6IHN0cmluZywga2VlcEFmdGVyUm91dGVDaGFuZ2UgPSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmtlZXBBZnRlclJvdXRlQ2hhbmdlID0ga2VlcEFmdGVyUm91dGVDaGFuZ2U7XHJcbiAgICAgIHRoaXMuc3ViamVjdC5uZXh0KDxBbGVydD57IHR5cGU6IHR5cGUsIG1lc3NhZ2U6IG1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgIC8vIGNsZWFyIGFsZXJ0c1xyXG4gICAgICB0aGlzLnN1YmplY3QubmV4dCg8YW55Pnt9KTtcclxuICAgIH1cclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBEeW5hbWljT2JqZWN0IHtcclxuICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBlbnVtIEFsZXJ0VHlwZSB7XHJcbiAgICBTdWNjZXNzLFxyXG4gICAgRXJyb3IsXHJcbiAgICBJbmZvLFxyXG4gICAgV2FybmluZ1xyXG4gIH1cclxuICBleHBvcnQgY2xhc3MgQWxlcnQge1xyXG4gICAgdHlwZSE6IEFsZXJ0VHlwZTtcclxuICAgIG1lc3NhZ2UhOiBzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSW5zaWdodHMge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc2VyaWVzOiBTZXJpZXNbXTtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBTZXJpZXMge1xyXG4gICAgdmFsdWU6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIG1vbnRoOiBzdHJpbmc7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFN0YXR1cyB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFVzZXJHcm91cER0byB7XHJcbiAgICBpZD86IG51bWJlcjtcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bGw7XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhPzogUGFydGlhbDxVc2VyR3JvdXBEdG8+KSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgVXNlclJvbGVQYWdlRHRvIHtcclxuICAgIGlkPzogbnVtYmVyO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHJvdXRlPzogc3RyaW5nO1xyXG4gICAgaWNvbj86IHN0cmluZyB8IG51bGw7XHJcbiAgICBvcmRlcj86IG51bWJlcjtcclxuICAgIGlzbWVudT86IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhPzogUGFydGlhbDxVc2VyUm9sZVBhZ2VEdG8+KSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgVXNlclJvbGVEdG8ge1xyXG4gICAgaWQ/OiBudW1iZXI7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJpb3JpdHk/OiBudW1iZXI7XHJcbiAgICBvcmRlcj86IG51bWJlcjtcclxuICAgIGRlZmF1bHRwYWdlPzogVXNlclJvbGVQYWdlRHRvO1xyXG4gICAgZGVmYXVsdHBhZ2VpZD86IG51bWJlcjtcclxuICAgIHBhcmVudGlkPzogbnVtYmVyIHwgbnVsbDtcclxuICAgIHBhcmVudD86IFVzZXJSb2xlRHRvIHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGE/OiBQYXJ0aWFsPFVzZXJSb2xlRHRvPikge1xyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFVzZXJEdG8ge1xyXG4gICAgaWQ/OiBudW1iZXI7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJpb3JpdHk/OiBudW1iZXI7XHJcbiAgICBvcmRlcj86IG51bWJlcjtcclxuICAgIGRlZmF1bHRwYWdlPzogVXNlclJvbGVQYWdlRHRvO1xyXG4gICAgZGVmYXVsdHBhZ2VpZD86IG51bWJlcjtcclxuICAgIHBhcmVudGlkPzogbnVtYmVyIHwgbnVsbDtcclxuICAgIHBhcmVudD86IFVzZXJSb2xlRHRvIHwgbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGE/OiBQYXJ0aWFsPFVzZXJEdG8+KSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGV4cG9ydCBjbGFzcyBBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRW5kUG9pbnQgPSB7XHJcbiAgICAgIE9yZ2FuaXphdGlvbjoge1xyXG4gICAgICAgIGdldE9yZ2FuaXphdGlvbkxpc3Q6ICcvb3JnL29yZ2FuaXphdGlvbi9hbGwnLFxyXG4gICAgICAgIGdldE9yZ2FuaXphdGlvbjogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BhZ2Uvb3JnYW5pemF0aW9uL3tvcmdJZH0/cmV0dXJuVXNlclBhZ2U9ZmFsc2UmZXhjbHVkZU5vQWN0aXZlVmVyc2lvblBhZ2VzPXRydWUnXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG4iXX0=