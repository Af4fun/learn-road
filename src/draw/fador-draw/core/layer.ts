import { genUuid } from '../utils';
import EventCenter from '../utils/event';
import Point from './point';

export default abstract class Layer {
  uuid: string;
  type: string;
  isEdit: boolean = false;
  isMouseIn: boolean = false;
  origin: Point = new Point(0, 0);
  evetCenter: EventCenter = new EventCenter();

  constructor(type: string) {
    this.uuid = genUuid();
    this.type = type;
  }

  // 触发外部canvas事件 响应到对应的layer事件
  update(action: string, ...arg: any): void {
    const actionFunc = Object.getPrototypeOf(this)[action];
    if (actionFunc) return actionFunc.apply(this, arg);
  }

  emit(action: string, ...arg: any): void {
    this.evetCenter.emit(action, ...arg);
  }

  onclick(cb: ()=> void) {
    this.evetCenter.on('onclick', (...arg) => {
      cb.apply(this, ...arg);
    });
  }

  onhover(cb: ()=> void) {
    this.evetCenter.on('onhover', (...arg) => {
      cb.apply(this, ...arg);
    });
  }

  abstract isInPath(p: Point): boolean;

  abstract render(context: CanvasRenderingContext2D, scale: number): void;

  abstract startEdit(): void;

  abstract saveEdit(): void;

  abstract cancelEdit(): void;
}
