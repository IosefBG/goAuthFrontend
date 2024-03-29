import {Component, ElementRef, ViewChild} from '@angular/core';
import {CdkDragDrop, CdkDragMove, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

export interface DraggableItemsArea {
  id: number;
  content: any;
  position: { x: number, y: number };
}


@Component({
  selector: 'app-resumemaker',
  templateUrl: './resumemaker.component.html',
  styleUrls: ['./resumemaker.component.scss']
})
export class ResumemakerComponent {
  off: any;
  scaleX = 100 / 200; //relation aspect between items.width in dropZone and items.width in List
  scaleY = 1 //relation aspect between items.height in dropZone and items.height in List
  _pointerPosition: any;
  posInside: { source: any, x: number, y: number } = {source: null, x: 0, y: 0}

  @ViewChild('doneList', {read: ElementRef, static: true}) dropZone!: ElementRef;

  todo = [
    {label: 'Get to work', x: 0, y: 0, 'z-index': 0},
    {label: 'Pick up groceries', x: 0, y: 0, 'z-index': 0},
    {label: 'Go home', x: 0, y: 0, 'z-index': 0},
    {label: 'Fall asleep', x: 0, y: 0, 'z-index': 0},
    {label: 'Get up', x: 0, y: 0, 'z-index': 0},
    {label: 'Brush teeth', x: 0, y: 0, 'z-index': 0},
    {label: 'Take a shower', x: 0, y: 0, 'z-index': 0},
    {label: 'Check e-mail', x: 0, y: 0, 'z-index': 0},
    {label: 'Walk dog', x: 0, y: 0, 'z-index': 0}
  ];

  done: any = [];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      event.item.data.y = (this._pointerPosition.y - this.off.y * this.scaleY - this.dropZone.nativeElement.getBoundingClientRect().top)
      event.item.data.x = (this._pointerPosition.x - this.off.x * this.scaleX - this.dropZone.nativeElement.getBoundingClientRect().left)
      this.changeZIndex(event.item.data)
    }
    this.posInside = {source: null, x: 0, y: 0}
  }

  moved(event: CdkDragMove) {
    this._pointerPosition = event.pointerPosition;
  }

  changeZIndex(item: any) {
    this.done.forEach((x: any) => x['z-index'] = (x == item ? 1 : 0))
  }

  changePosition(event: CdkDragDrop<any>, field: any) {
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect()
    const rectElement = event.item.element.nativeElement.getBoundingClientRect()

    let y = +field.y + event.distance.y
    let x = +field.x + event.distance.x
    const out = y < 0 || x < 0 || (y > (rectZone.height - rectElement.height)) || (x > (rectZone.width - rectElement.width))

    if (!out) {
      field.y = y
      field.x = x
      this.done = this.done.sort((a: any, b: any) => a['z-index'] > b['z-index'] ? 1 : a['z-index'] < b['z-index'] ? -1 : 0)
    } else {
      this.todo.push(field)
      this.done = this.done.filter((x: any) => x != field)
    }
  }
}
