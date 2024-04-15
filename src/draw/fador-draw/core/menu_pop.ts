import Point from "./point";

export default class MenuPop {
  el: HTMLDivElement;
  poisition?: Point;
  isOpen: boolean = false;
  onDelete?: () => void;
  onEdit?: () => void;
  constructor() {
    const el = document.createElement("div");
    this.el = el;
    el.className = "draw-menu";
  }
  open(
    x: number,
    y: number,
    evt: {
      onDelete?: () => void;
      onEdit?: () => void;
      onSave?: () => void;
      onCancel?: () => void;
    }
  ) {
    this.isOpen = true;
    this.el.innerHTML = "";
    const emaps = {
      onSave: "保存",
      onCancel: "取消",
      onEdit: "编辑图层",
      onDelete: "删除图层",
    };
    Object.keys(evt).forEach((e) => {
      let k = e as keyof typeof emaps;
      const fn = evt[k];
      if (emaps[k] && fn) {
        const btn = document.createElement("div");
        btn.innerHTML = emaps[k];
        btn.className = "item";
        btn.onclick = () => {
          fn.call(this);
          this.close();
        };
        this.el.appendChild(btn);
      }
    });

    this.el.style.display = "block";
    this.el.style.left = x + "px";
    this.el.style.top = y + "px";
  }

  close() {
    this.el.style.display = "none";
    this.isOpen = false;
  }

  remove() {
    this.el.parentNode?.removeChild(this.el);
    this.isOpen = false;
  }
}
