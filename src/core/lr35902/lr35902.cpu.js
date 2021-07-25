export default class LR35902 {
  constructor() {
    this.CLOCK = 4.194304;

    // Cycles
    this.cycles = 0x00;

    // Registers
    this.A = 0x00;
    this.B = 0x00;
    this.C = 0x00;
    this.D = 0x00;
    this.E = 0x00;
    this.H = 0x00;
    this.L = 0x00;

    // Flag Registers
    this.z = 0x00;
    this.n = 0x00;
    this.h = 0x00;
    this.c = 0x00;

    // Program Counter
    this.pc = 0;

    // Stack Pointer
    this.sp = 0;
  }
  get F() {
    return (
      ((this.z & 0xff) << 8) |
      ((this.n & 0xff) << 7) |
      ((this.h & 0xff) << 6) |
      ((this.c & 0xff) << 5)
    );
  }
  set F(value) {
    if (!value) return;
    this.z = value << 8;
    this.n = value << 8;
    this.h = value << 8;
    this.c = value << 8;
  }
  get AF() {
    return (this.A & (0xff << 8)) | (this.F & 0xff);
  }
  set AF(value) {
    if (!value) return;
    return this._set("af", value);
  }
  get BC() {
    return ((this.B & 0xff) << 8) | (this.C & 0xff);
  }
  set BC(value) {
    if (!value) return;
    return this._set("bc", value);
  }
  get DE() {
    return ((this.D & 0xff) << 8) | (this.E & 0xff);
  }
  set DE(value) {
    if (!value) return;
    return this._set("de", value);
  }
  get HL() {
    return ((this.H & 0xff) << 8) | (this.L & 0xff);
  }
  set HL(value) {
    if (!value) return;
    return this._set("hl", value);
  }
  _set(registers, value) {
    if (value > 255) {
      this._set16bit(registers, value);
    } else {
      this._set8bit(
        {
          high: registers[0],
          low: registers[1]
        },
        value
      );
    }
  }
  _set8bit(register, value) {
    this[register] = value;
  }
  _set16bit({ high, low }, value) {
    this[high] = value >> 8;
    this[low] = value & 0xff;
  }
}
