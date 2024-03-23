export default class RAM {
  constructor() {
    this.m = new Array(0xFFFF).fill(0);
  }
  read(address) {
    return this.m[address];
  }
  write(address, value) {
    this.m[address] = value;
  }
}
