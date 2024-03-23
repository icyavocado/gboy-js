/**
 * Z80 Chip Documentationa
 * http://datasheets.chipdb.org/Zilog/Z80/z80-documented-0.90.pdf
 */

import LR35902Instructions from "./lr35902.instructions";
import LR35902OpCodes from "./lr35902.opcodes";

export default class LR35902 {
  constructor(memory) {
    this.CLOCK = 4.194304;

    // RAM
    this.ram = memory;

    // Cycles
    this.cycles = 0x00;

    // Registers
    this.r8 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    this.r16 = new Uint16Array([0]);
    this.A = random(0, 255);
    this.B = random(0, 255);
    this.C = random(0, 255);
    this.D = random(0, 255);
    this.E = random(0, 255);
    this.H = random(0, 255);
    this.L = random(0, 255);

    // Flag Registers
    this.z = 0x00;
    this.n = 0x00;
    this.h = 0x00;
    this.c = 0x00;

    // Program Counter
    this.pc = 0;

    // Stack Pointer
    this.sp = 0xfffe; // Init at 0xFFFE

    // Instruction
    this.ins = new LR35902Instructions(this, this.RAM);
    this.OP_CODES = new LR35902OpCodes(this.ins);

    // Halt
    this._halt = 0;
  }
}
