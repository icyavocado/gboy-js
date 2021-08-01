export default class RAM {
  constructor() {
    this.STORAGE = new Array(0xFFFF).fill(0);
  }
  read(address) {
    return this.STORAGE[address];
  }
  write(address, value) {
    this.STORAGE[address] = value;
  }
}