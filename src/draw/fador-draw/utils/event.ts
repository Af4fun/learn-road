export default class EventCenter {
  private funcList: Array<{
    name: string;
    fc: Function;
  }> = [];

  constructor() {}

  on(name: string, fc: (arg?: any) => void) {
    const target = this.funcList.findIndex((v) => v.name === name);
    if (target > -1) {
      this.funcList.splice(target, 1);
    }
    this.funcList.push({ name, fc });
  }
  // 派发事件
  emit(name: string, arg?: any) {
    const target = this.funcList.find((v) => v.name === name);
    target && target.fc.call(this, arg);
  }

  off(name: string) {
    this.funcList = this.funcList.filter((v) => v.name !== name);
  }
}
