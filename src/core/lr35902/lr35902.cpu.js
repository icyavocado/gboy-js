import LR35902Instructions from "./lr35902.instructions";
import LR35902OpCodes from "./lr35902.opcodes";

export default class LR35902 {
  constructor(memory) {
    this.CLOCK = 4.194304;

    // RAM
    this.RAM = memory;

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
    this.sp = 0xFFFE; // Init at 0xFFFE

    // Instruction
    this.ins = new LR35902Instructions(this, this.RAM);
    this.OP_CODES = new LR35902OpCodes(this.ins);

    // Halt
    this._halt = 0;
  }
  get halt() {
    return this._halt;
  }
  read(address = this.CPU.pc++) {
    this.cycles += 2;
    return this.RAM[address];
  }
  write(address, value) {
    this.RAM[address] = value;
    this.CPU.pc++;
    this.cycles += 2;
  }
  get F() {
    return (
      ((this.z & 0xff) << 8) |
      ((this.n & 0xff) << 7) |
      ((this.h & 0xff) << 6) |
      ((this.c & 0xff) << 5)
    );
  }
  set F(value = 0) {
    this.z = value << 8;
    this.n = value << 7;
    this.h = value << 6;
    this.c = value << 5;
    this.cycles += 4;
  }
  get AF() {
    return (this.A & (0xff << 8)) | (this.F & 0xff);
  }
  set AF(value) {
    return this._set("AF", value);
  }
  get BC() {
    return ((this.B & 0xff) << 8) | (this.C & 0xff);
  }
  set BC(value) {
    return this._set("BC", value);
  }
  get DE() {
    return ((this.D & 0xff) << 8) | (this.E & 0xff);
  }
  set DE(value) {
    return this._set("DE", value);
  }
  get HL() {
    return ((this.H & 0xff) << 8) | (this.L & 0xff);
  }
  set HL(value) {
    return this._set("HL", value);
  }
  get SP() {
    return this.sp;
  }
  set SP(value) {
    this.sp = value;
  }
  // Get immediate 8 bit
  get _n() {
    return this.read();
  }
  // Get immediate 16 bit
  get _nn() {
    return (this.read() & 0xff) << 8 | (this.read() & 0xff);
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
    this.cycles += 4;
  }
  _set16bit({ high, low }, value) {
    this._set8bit(high, value >> 8);
    this._set8bit(low, value & 0xff);
  }
}
