import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ChatConfigComponent {
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
  `, isInline: true, styles: ["\n      .chat-config {\n        padding: 20px;\n      }\n      .btn {\n        padding: 5px;\n        margin: 0px 2px;\n        border: 1px solid #dedede;\n        outline: none;\n      }\n      .btn-active {\n        border: 1px solid #a0a0a0;\n      }\n      .btn:focus {\n        border: 1px solid #333;\n      }\n    "], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1jb25maWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1tb2R1bGUvY2hhdC1yZWRiaXJkLWFpL3NyYy9saWIvcGljcy1jaGF0LXJlZGJpcmQtYWkvY2hhdC1yZWRiaXJkLWFpL2NoYXQtY29uZmlnL2NoYXQtY29uZmlnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFnQ3ZFLE1BQU0sT0FBTyxtQkFBbUI7SUE5QmhDO1FBZ0NrQixTQUFJLEdBQUcsY0FBYyxDQUFDO1FBQ3JCLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUQsV0FBTSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUt6QztJQUpRLFFBQVEsQ0FBQyxLQUFVO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOztpSEFUVSxtQkFBbUI7cUdBQW5CLG1CQUFtQiwwSUE1QnBCOzs7Ozs7O0dBT1Q7NEZBcUJVLG1CQUFtQjtrQkE5Qi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JDO3FCQUNGO2lCQUNGOzhCQUVpQixLQUFLO3NCQUFwQixLQUFLO2dCQUNVLElBQUk7c0JBQW5CLEtBQUs7Z0JBQ1csV0FBVztzQkFBM0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jaGF0LWNvbmZpZycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJjaGF0LWNvbmZpZ1wiPlxyXG4gICAgICB7eyB0ZXh0IH19XHJcbiAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgdGhlbWVzXCIgY2xhc3M9XCJidG5cIiBbY2xhc3MuYnRuLWFjdGl2ZV09XCJpdGVtID09PSB0aGVtZVwiIChjbGljayk9XCJzZXRUaGVtZShpdGVtKVwiPlxyXG4gICAgICAgIHt7IGl0ZW0gfX1cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW1xyXG4gICAgYFxyXG4gICAgICAuY2hhdC1jb25maWcge1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICAgIH1cclxuICAgICAgLmJ0biB7XHJcbiAgICAgICAgcGFkZGluZzogNXB4O1xyXG4gICAgICAgIG1hcmdpbjogMHB4IDJweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGVkZWRlO1xyXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgIH1cclxuICAgICAgLmJ0bi1hY3RpdmUge1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNhMGEwYTA7XHJcbiAgICAgIH1cclxuICAgICAgLmJ0bjpmb2N1cyB7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcclxuICAgICAgfVxyXG4gICAgYFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENoYXRDb25maWdDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB0aGVtZSE6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgdGV4dCA9ICdTZWxlY3QgdGhlbWUnO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgdGhlbWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwdWJsaWMgdGhlbWVzID0gWydibHVlJywgJ2dyZXknLCAncmVkJ107XHJcbiAgcHVibGljIHNldFRoZW1lKHRoZW1lOiBhbnkpIHtcclxuICAgIHRoaXMudGhlbWUgPSB0aGVtZTtcclxuICAgIHRoaXMudGhlbWVDaGFuZ2UuZW1pdCh0aGlzLnRoZW1lKTtcclxuICB9XHJcbn1cclxuIl19