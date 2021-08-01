import helper from "bitwise_helper";

export default class LR35902Instructions {
  constructor(cpu, memory) {
    this.CPU = cpu;
    this.WRAM = memory;
  }
  _w8Bit(value) {
    // TODO: Implement 8-bit write instruction
  }
  _w16(value) {
    // TODO: Implement  16-bit write instruction
  }
  get i8bit() {
    return this.read();
  }
  get i8bit_signed() {
    // https://rylev.github.io/DMG-01/public/book/appendix/numbers.html#signed-numbers
    /**
     * Let's say we have the number 0b00111011 a.k.a. 59
     * and we want to represent -59 instead.
     * In two's complement, we do the following:
     *  Invert every digit - 1s become 0s and 0s become 1s
     *    0b00111011 becomes 0b11000100
     *  Add 1 to the number
     *    0b11000100 becomes 0b11000101
     */
    return ~this.i8bit + 1;
  }
  get i16bit() {
    return (this.i8bit << 8) | (this.i8bit & 0xff);
  }
  get i16bit_signed() {
    return ~this.i16bit + 1;
  }

  /**
   * 8-bit Load (LD) instructions
   */

  /**
   * Description:
   *  Put value nn into n.
   * Use with:
   *  nn = B,C,D,E,H,L,BC,DE,HL,SP
   *  n = 8 bit immediate value
   */
  LDnnn(rr) {
    this._w8Bit(this.CPU[rr]);
    this.CPU.cycles += 8;
  }

  /**
   * Description:
   *  Put value r2 into r1.
   * Use with:
   *  r1,r2 = A,B,C,D,E,H,L,(HL)
   */
  LDr1r2(r1, r2) {
    this.CPU[r1] = this.CPU[r2];
    this.CPU.cycles += 4;
  }

  /**
   * Description:
   *  Put value n into A
   * Use with:
   *  n = A,B,C,D,E,H,L,(BC),(DE),(HL),(nn),#
   *  nn = two byte immediate value. (LS byte first.)
   */
  LDAn(n) {
    this.CPU.a = !n ? this.i8bit : n === "nn" ? this.i16bit : this.CPU[n];
    this.CPU.cycles += 4;
  }
  /**
   * Description:
   *  Put value A into n.
   * Use with:
   *  n = A,B,C,D,E,H,L,(BC),(DE),(HL),(nn)
   *  nn = two byte immediate value. (LS byte first.)
   */
  LDnA(n) {
    if (!n) {
      this._w16(this.i16bit, this.CPU.A);
    } else {
      this.CPU[n] = this.CPU.A;
    }
    this.CPU.cycles += 4;
  }
  /**
   * Description:
   * Put value at address $FF00 + register C into A.
   * Same as: LD A,($FF00+C)
   */
  LDAC() {
    this.CPU.A = this.read(0xff + this.CPU.C);
    this.CPU.cycles += 4;
  }
  /**
   * Description:
   * Put A into address $FF00 + register C.
   */
  LDCA() {
    this.write(0xff + this.CPU.C, this.CPU.A);
    this.CPU.cycles += 4;
  }
  /**
   * LD A,(HLD)
   *  Description: Same as: LDD A,(HL)
   */
  /**
   * LD A,(HL-)
   *  Description: Same as: LDD A,(HL)
   */
  /**
   * LDD A,(HL)
   *  Description:
   *    Put value at address HL into A. Decrement HL.
   *    Same as: LD A,(HL) - DEC HL
   */
  LDDAHL() {
    this.CPU.A = this.CPU.HL;
    this.CPU.HL--;
  }
  /**
   * LD (HLD),A
   *  Description: Same as: LDD (HL),A
   */
  /**
   * LD (HL-),A
   *  Description: Same as: LDD (HL),A
   */
  /**
   * LDD (HL),A
   *  Description:
   *    Put A into memory address HL. Decrement HL.
   *    Same as: LD (HL),A - DEC HL
   */
  LDDHLA() {
    this.CPU.HL = this.CPU.A;
    this.CPU.HL--;
  }
  /**
   * LD A,(HLI)
   *  Description: Same as: LDI A,(HL)
   */
  /**
   * LD A,(HL+)
   *  Description: Same as: LDI A,(HL)
   */
  /**
   * LDI A,(HL)
   *  Description:
   *    Put value at address HL into A. Increment HL.
   *    Same as: LD A,(HL) - INC HL
   */
  LDIAHL() {
    this.CPU.A = this.CPU.HL;
    this.CPU.HL++;
  }
  /**
   * LD (HLI),A
   *  Description: Same as: LDI (HL),A
   */
  /**
   * LD (HL+),A
   *  Description: Same as: LDI (HL),A
   */
  /**
   * LDI (HL),A
   *  Description:
   *    Put A into memory address HL. Increment HL.
   *    Same as: LD (HL),A - INC HL
   */
  LDIHLA() {
    this.CPU.HL = this.CPU.A;
    this.CPU.HL++;
  }
  /**
   * LDH (n),A
   *  Description:
   *    Put A into memory address $FF00+n.
   *  Use with:
   *    n = one byte immediate value.
   */
  LDHnA() {
    this.write(0xff + this.i8bit, this.CPU.A);
  }
  /**
   * LDH A,(n)
   *  Description:
   *    Put memory address $FF00+n into A.
   *  Use with:
   *    n = one byte immediate value.
   */
  LDHAn() {
    this.CPU.A = this.read(0xff + this.i8bit);
  }

  /**
   * 16-bit Loads (LD) instructions
   */
  /**
   * LD n,nn
   *   Description:
   *     Put value nn into n.
   *   Use with:
   *     n = BC,DE,HL,SP
   *     nn = 16 bit immediate value
   */
  LDnnn_16(n) {
    this.CPU[n] = this.i16bit;
  }
  /**
   * LD SP,HL
   *   Description:
   *    Put HL into Stack Pointer (SP).
   */
  LDSPHL() {
    this.CPU.SP = this.CPU.HL;
  }
  /**
   * LD HL,SP+n
   *  Description: Same as: LDHL SP,n.
   */
  /**
   * LDHL SP,n
   *  Description:
   *    Put SP + n effective address into HL.
   *  Use with:
   *    n = one byte signed immediate value.
   *  Flags affected:
   *    Z - Reset.
   *    N - Reset.
   *    H - Set or reset according to operation.
   *    C - Set or reset according to operation.
   */
  LDHLSPn() {
    this.CPU.HL = this.CPU.SP + this.i8bit_signed;
    this.CPU.z = 0;
    this.CPU.n = 0;
  }
  /**
   * LD (nn),SP
   *  Description:
   *    Put Stack Pointer (SP) at address n.
   *  Use with:
   *    nn = two byte immediate address.
   */
  LDnnSP() {
    this.write(this.i16bit, this.CPU.SP);
  }
  /**
   * PUSH nn
   *  Description:
   *    Push register pair nn onto stack.
   *    Decrement Stack Pointer (SP) twice.
   *  Use with:
   *    nn = AF,BC,DE,HL
   */
  PUSHnn(nn) {
    this.CPU[nn[0]] = this.read(this.CPU.SP);
    this.CPU.SP--;
    this.CPU[nn[1]] = this.read(this.CPU.SP);
    this.CPU.SP--;
  }
  /**
   * Description:
   * Pop two bytes off stack into register pair nn.
   * Increment Stack Pointer (SP) twice.
   * Use with:
   * nn = AF,BC,DE,H
  */
  POPnn(nn) {
    this.CPU[nn[0]] = this.read(this.CPU.SP);
    this.CPU.SP++;
    this.CPU[nn[1]] = this.read(this.CPU.SP);
    this.CPU.SP++;
  }
  /**
   * 8-BIT ALU
   */

  /**
   * Description:
   *  Add n to A.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL),#
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Set if carry from bit 3.
   *  C - Set if carry from bit 7
   */
  ADD(n) {
    this.CPU.A += n != "#" ? this.CPU[n] : this.read();
    if (!this.CPU.A) this.CPU.z = 0x01;
    this.CPU.n = 0;
    // TODO: implement flags
  }
  /**
  * Description:
  *  Subtract n from A.
  * Use with:
  *  n = A,B,C,D,E,H,L,(HL),#
  * Flags affected:
  *  Z - Set if result is zero.
  *  N - Set.
  *  H - Set if no borrow from bit 4.
  *  C - Set if no borrow.
  */
  SUB(n) {
    this.CPU.A -= n != "#" ? this.CPU[n] : this.read();
    if (!this.CPU.A) this.CPU.z = 0x01;
    // TODO: implement flags
  }
}
