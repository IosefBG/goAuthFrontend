import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() toolSelected = new EventEmitter<string>();

  selectTool(tool: string) {
    this.toolSelected.emit(tool);
  }
}
