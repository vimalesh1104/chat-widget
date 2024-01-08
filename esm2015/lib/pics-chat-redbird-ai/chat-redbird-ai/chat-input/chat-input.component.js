import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ChatInputComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLW1vZHVsZS9jaGF0LXJlZGJpcmQtYWkvc3JjL2xpYi9waWNzLWNoYXQtcmVkYmlyZC1haS9jaGF0LXJlZGJpcmQtYWkvY2hhdC1pbnB1dC9jaGF0LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFxQi9CLE1BQU0sT0FBTyxrQkFBa0I7SUFuQi9CO1FBb0JrQixlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMzQixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQXVDL0M7SUFwQ0MsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFlBQVk7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsVUFBVTtRQUNSLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7O2dIQTVDVSxrQkFBa0I7b0dBQWxCLGtCQUFrQixpVEFqQm5COzs7Ozs7Ozs7Ozs7O0dBYVQ7NEZBSVUsa0JBQWtCO2tCQW5COUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQzNDOzhCQUVpQixVQUFVO3NCQUF6QixLQUFLO2dCQUNVLEtBQUs7c0JBQXBCLEtBQUs7Z0JBQ1UsV0FBVztzQkFBMUIsS0FBSztnQkFDVyxJQUFJO3NCQUFwQixNQUFNO2dCQUNVLFFBQVE7c0JBQXhCLE1BQU07Z0JBQ1UsT0FBTztzQkFBdkIsTUFBTTtnQkFDZSxPQUFPO3NCQUE1QixTQUFTO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jaGF0LWlucHV0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHRleHRhcmVhXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgY2xhc3M9XCJjaGF0LWlucHV0LXRleHRcIlxyXG4gICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgbWVzc2FnZS4uLlwiXHJcbiAgICAgICNtZXNzYWdlXHJcbiAgICAgIChrZXlwcmVzcyk9XCJzZWFyY2hUZXh0KClcIlxyXG4gICAgICAoa2V5ZG93bi5lbnRlcik9XCJvblN1Ym1pdCgpXCJcclxuICAgICAgKGtleXVwLmVudGVyKT1cIm1lc3NhZ2UudmFsdWUgPSAnJ1wiXHJcbiAgICAgIChrZXl1cC5lc2NhcGUpPVwiZGlzbWlzcy5lbWl0KClcIj48L3RleHRhcmVhPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJjaGF0LWlucHV0LXN1Ym1pdFwiIChjbGljayk9XCJvblN1Ym1pdCgpXCI+XHJcbiAgICAgIHt7IGJ1dHRvblRleHQgfX1cclxuICAgIDwvYnV0dG9uPlxyXG4gIGAsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzdHlsZVVybHM6IFsnLi9jaGF0LWlucHV0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENoYXRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcHVibGljIGJ1dHRvblRleHQgPSAnU2VuZCc7XHJcbiAgQElucHV0KCkgcHVibGljIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhclNlYXJjaCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBzZW5kID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgc2VhcmNodG8gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBkaXNtaXNzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBWaWV3Q2hpbGQoJ21lc3NhZ2UnKSBtZXNzYWdlITogRWxlbWVudFJlZjtcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZvY3VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmZvY3VzTWVzc2FnZSgpKTtcclxuICAgIHRoaXMuY2xlYXJTZWFyY2guc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jbGVhck1lc3NhZ2UoKTtcclxuICAgICAgdGhpcy5mb2N1c01lc3NhZ2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvY3VzTWVzc2FnZSgpIHtcclxuICAgIHRoaXMubWVzc2FnZS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWVzc2FnZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1lc3NhZ2UubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhck1lc3NhZ2UoKSB7XHJcbiAgICB0aGlzLm1lc3NhZ2UubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXQoKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5nZXRNZXNzYWdlKCk7XHJcbiAgICBpZiAobWVzc2FnZS50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2VuZC5lbWl0KHsgbWVzc2FnZSB9KTtcclxuICAgIHRoaXMuY2xlYXJNZXNzYWdlKCk7XHJcbiAgICB0aGlzLmZvY3VzTWVzc2FnZSgpO1xyXG4gIH1cclxuICBzZWFyY2hUZXh0KCkge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuZ2V0TWVzc2FnZSgpO1xyXG4gICAgaWYgKG1lc3NhZ2UudHJpbSgpID09PSAnJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlYXJjaHRvLmVtaXQoeyBtZXNzYWdlIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=