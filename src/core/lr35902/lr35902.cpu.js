/**
 * Z80 Chip Documentationa
 * http://datasheets.chipdb.org/Zilog/Z80/z80-documented-0.90.pdf
 */

import LR35902Instructions from './lr35902.instructions'
import LR35902OpCodes from './lr35902.opcodes'

export default class LR35902 {
  constructor(memory) {
    this.CLOCK = 4.194304

    // RAM
    this.RAM = memory

    // Cycles
    this.cycles = 0x00

    // Registers
    this.r8 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])
    this.r16 = new Uint16Array([0])
    this._A = this.r8[0]
    this._B = this.r8[1]
    this._C = this.r8[2]
    this._D = this.r8[3]
    this._E = this.r8[4]
    this._H = this.r8[5]
    this._L = this.r8[6]

    // Flag Registers
    this.z = 0x00
    this.n = 0x00
    this.h = 0x00
    this.c = 0x00

    // Program Counter
    this.pc = 0

    // Stack Pointer
    this.sp = 0xfffe // Init at 0xFFFE

    // Instruction
    this.ins = new LR35902Instructions(this, this.RAM)
    this.OP_CODES = new LR35902OpCodes(this.ins)

    // Halt
    this._halt = 0
  }
  get HALT() {
    return this._halt
  }
  set HALT(value) {
    this._halt = value
  }
  read(address = this.CPU.pc++) {
    this.cycles += 2
    return this.RAM[address]
  }
  write(address, value) {
    this.RAM.write(address, value)
    this.pc++
    this.cycles += 2
  }
  /**
   * These get and set for single register is to make sure
   * we have wrapover protection
   */
  get A() {
    return this._A
  }
  get B() {
    return this._B
  }
  get C() {
    return this._C
  }
  get D() {
    return this._D
  }
  get E() {
    return this._E
  }
  get F() {
    return this._F
  }
  get H() {
    return this._H
  }
  get L() {
    return this._L
  }
  set A(value) {
    this.r8[0] = value
  }
  set B(value) {
    this.r8[1] = value
  }
  set C(value) {
    this.r8[2] = value
  }
  set D(value) {
    this.r8[3] = value
  }
  set E(value) {
    this.r8[4] = value
  }
  set H(value) {
    this.r8[5] = value
  }
  set L(value) {
    this.r8[6] = value
  }
  /**
   * F can't be set via set F(),
   * but we can set the flags individually
   */
  get F() {
    this.F = (this.z << 7) | (this.n << 6) | (this.h << 5) | (this.c << 4)
  }
  /**
   * Get and set the 16 bit version of registers combine
   */
  get AF() {
    return this._get('AF')
  }
  set AF(value) {
    return this._set16bit('AF', value)
  }
  get BC() {
    return this._get('BC')
  }
  set BC(value) {
    return this._set16bit('BC', value)
  }
  get DE() {
    return this._get('DE')
  }
  set DE(value) {
    return this._set16bit('DE', value)
  }
  get HL() {
    return this._get('HL')
  }
  set HL(value) {
    return this._set16bit('HL', value)
  }
  get SP() {
    return this.sp
  }
  set SP(value) {
    this.sp = new Uint16Array([value])[0]
  }
  /**
   * Get immediate 8 bit and 8 bit signed
   */
  get _n() {
    return this.read()
  }
  get _n_signed() {
    return ~this._n + 1
  }
  /**
   * Get immediate 16 bit and 16 bit signed
   */
  get _nn() {
    return ((this.read() & 0xff) << 8) | (this.read() & 0xff)
  }
  get _nn_signed() {
    return ~this._nn() + 1
  }
  /**
   * Helpers
   */
  _get(registers) {
    this.r16[0] =
      ((this[registers[0]] & 0xff) << 8) | (this[registers[1]] & 0xff)
    return this.r16[0]
  }
  _set16bit(registers, value) {
    this[registers[0]] = value >> 8
    this[registers[1]] = value & 0xff
  }
}
