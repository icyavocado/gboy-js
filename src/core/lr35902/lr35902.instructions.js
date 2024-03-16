import helper from './lr35902.helper'
export default class LR35902Instructions {
  constructor(cpu, memory) {
    this.CPU = cpu
    this.m = memory
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
    this.write(this.CPU._n, this.CPU[rr])
  }

  /**
   * Description:
   *  Put value r2 into r1.
   * Use with:
   *  r1,r2 = A,B,C,D,E,H,L,(HL)
   */
  LDr1r2(r1, r2) {
    this.CPU[r1] = this.CPU[r2]
  }

  /**
   * Description:
   *  Put value n into A
   * Use with:
   *  n = A,B,C,D,E,H,L,(BC),(DE),(HL),(nn),#
   *  nn = two byte immediate value. (LS byte first.)
   */
  LDAn(n) {
    let value = 0
    switch (n) {
      case '#':
        value = this.CPU._n
        break
      case 'nn':
        value = this.CPU._nn
        break
      default:
        value = this.CPU[n]
    }
    this.CPU.A = value
  }
  /**
   * Description:
   *  Put value A into n.
   * Use with:
   *  n = A,B,C,D,E,H,L,(BC),(DE),(HL),(nn)
   *  nn = two byte immediate value. (LS byte first.)
   */
  LDnA(n) {
    switch (n) {
      case 'nn':
        this.write(this.CPU._nn, this.CPU.A)
        break
      default:
        this.CPU[n] = this.CPU.A
    }
  }
  /**
   * Description:
   * Put value at address $FF00 + register C into A.
   * Same as: LD A,($FF00+C)
   */
  LDAC() {
    this.CPU.A = this.read(new Uint16Array([0xff + this.CPU.C])[0])
  }
  /**
   * Description:
   * Put A into address $FF00 + register C.
   */
  LDCA() {
    this.write(new Uint16Array([0xff + this.CPU.C])[0], this.CPU.A)
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
    this.CPU.A = this.read(this.CPU.HL)
    this.CPU.HL--
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
    this.write(this.CPU.HL, this.CPU.A)
    this.CPU.HL--
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
    this.CPU.A = this.read(this.CPU.HL)
    this.CPU.HL++
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
    this.write(this.CPU.HL, this.CPU.A)
    this.CPU.HL++
  }
  /**
   * LDH (n),A
   *  Description:
   *    Put A into memory address $FF00+n.
   *  Use with:
   *    n = one byte immediate value.
   */
  LDHnA() {
    this.write(new Uint16Array([0xff00 + this.CPU._n])[0], this.CPU.A)
  }
  /**
   * LDH A,(n)
   *  Description:
   *    Put memory address $FF00+n into A.
   *  Use with:
   *    n = one byte immediate value.
   */
  LDHAn() {
    this.CPU.A = this.read(new Uint16Array([0xff00 + this.CPU._n])[0])
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
    this.CPU[n] = this.CPU._nn
  }
  /**
   * LD SP,HL
   *   Description:
   *    Put HL into Stack Pointer (SP).
   */
  LDSPHL() {
    this.CPU.SP = this.CPU.HL
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
    this.CPU.HL = new Uint16Array([this.CPU.SP + this.CPU._n_signed])[0]
    this.CPU.z = 0
    this.CPU.n = 0
  }
  /**
   * LD (nn),SP
   *  Description:
   *    Put Stack Pointer (SP) at address n.
   *  Use with:
   *    nn = two byte immediate address.
   */
  LDnnSP() {
    this.write(this.CPU._nn, this.CPU.SP)
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
    this.CPU[nn[0]] = this.read(this.CPU.SP)
    this.CPU.SP--
    this.CPU[nn[1]] = this.read(this.CPU.SP)
    this.CPU.SP--
  }
  /**
   * POP nn
   * Description:
   * Pop two bytes off stack into register pair nn.
   * Increment Stack Pointer (SP) twice.
   * Use with:
   * nn = AF,BC,DE,H
   */
  POPnn(nn) {
    this.CPU[nn[0]] = this.read(this.CPU.SP)
    this.CPU.SP++
    this.CPU[nn[1]] = this.read(this.CPU.SP)
    this.CPU.SP++
  }
  /**
   * 8-BIT ALU
   */

  /**
   * ADD n
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
    const r2 = n != '#' ? this.CPU[n] : this.CPU._n
    const r1 = this.CPU.A * 1
    this.CPU.A += r2
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 1
    this.CPU.n = 0
    if (helper.isHalfCarry(r1, r2)) this.CPU.h = 1
    if (helper.isCarry(r1, r2)) this.CPU.c = 1
  }
  /**
   * ADC n
   * Description:
   *  Add n + Carry flag to A.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL),#
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Set if carry from bit 3.
   *  C - Set if carry from bit 7.
   */
  ADC(n) {
    let r2 = n != '#' ? this.CPU[n] : this.CPU._n
    r2 += this.CPU.h
    const r1 = this.CPU.A * 1
    this.CPU.A += r2
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 1
    this.CPU.n = 0
    if (helper.isHalfCarry(r1, r2)) this.CPU.h = 1
    if (helper.isCarry(r1, r2)) this.CPU.c = 1
  }
  /**
   * SUB n
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
    let r2 = n != '#' ? this.CPU[n] : this.CPU._n
    const r1 = this.CPU.A * 1
    this.CPU.A -= r2
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 1
    this.CPU.n = 1
    if (!helper.isHalfBorrow(r1, r2)) this.CPU.h = 1
    if (!helper.isBorrow(r1, r2)) this.CPU.c = 1
  }
  /**
   * SBC n
   * Description:
   *  Subtract n + Carry flag from A.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL),#
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Set.
   *  H - Set if no borrow from bit 4.
   *  C - Set if no borrow.
   */
  SBC(n) {
    let r2 = n != '#' ? this.CPU[n] : this.CPU._n
    r2 += this.CPU.h
    const r1 = this.CPU.A * 1
    this.CPU.A -= r2
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 1
    this.CPU.n = 1
    if (!helper.isHalfBorrow(r1, r2)) this.CPU.h = 1
    if (!helper.isBorrow(r1, r2)) this.CPU.c = 1
  }
  /**
   * AND n
   * Description:
   *  Logically AND n with A, result in A.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL),#
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Set.
   *  C - Reset.
   */
  AND(n) {
    let r2 = n != '#' ? this.CPU[n] : this.CPU._n
    this.CPU.A &= r2
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 1
    this.CPU.n = 1
    this.CPU.h = 1
    this.CPU.c = 0
  }
  /**
   * OR n
   * Description:
   *  Logical OR n with register A, result in A.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL),#
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Reset.
   */
  OR(n) {
    let r2 = n != '#' ? this.CPU[n] : this.CPU._n
    this.CPU.A |= r2
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 1
    this.CPU.n = 0
    this.CPU.h = 0
    this.CPU.c = 0
  }
  /**
   * XOR n
   * Description:
   *  Logical exclusive OR n with register A, result in A.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL),#
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Reset.
   */
  XOR(n) {
    let r2 = n != '#' ? this.CPU[n] : this.CPU._n
    this.CPU.A ^= r2
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 1
    this.CPU.n = 0
    this.CPU.h = 0
    this.CPU.c = 0
  }
  /**
   * CP n
   * Description:
   *  Compare A with n. This is basically an A - n
   *  subtraction instruction but the results are thrown
   *  away.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL),#
   * Flags affected:
   *  Z - Set if result is zero. (Set if A = n.)
   *  N - Set.
   *  H - Set if no borrow from bit 4.
   *  C - Set for no borrow. (Set if A < n.)
   */
  CP(n) {
    let r2 = n != '#' ? this.CPU[n] : this.CPU._n
    // Flags
    if (this.CPU.A === r2) this.CPU.z = 1
    this.CPU.n = 1
    if (!helper.isHalfBorrow(this.CPU.A, r2)) this.CPU.h = 1
    // if (!helper.isBorrow(this.CPU.A, r2)) this.c = 1;
    if (this.CPU.A < r2) this.CPU.c = 1
  }
  /**
   * INC n
   * Description:
   *  Increment register n.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Set if carry from bit 3.
   *  C - Not affected.
   */
  INC(n) {
    this.CPU[n]++
    // Flags
    if (this.CPU[n] === 0) this.CPU.z = 1
    this.CPU.n = 0
    if (helper.isHalfCarry(this.CPU[n], 1)) this.CPU.h = 1
  }
  /**
   * DEC n
   * Description:
   *  Decrement register n.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if reselt is zero.
   *  N - Set.
   *  H - Set if no borrow from bit 4.
   *  C - Not affected.
   */
  DEC(n) {
    this.CPU[n]--
    // Flags
    if (this.CPU[n] === 0) this.CPU.z = 1
    this.CPU.n = 1
    if (helper.isHalfBorrow(this.CPU[n], 1)) this.CPU.h = 1
  }
  /**
   * 16-Bit Arithmetic
   */

  /**
   * ADD HL,n
   * Description:
   *  Add n to HL.
   * Use with:
   *  n = BC,DE,HL,SP
   * Flags affected:
   *  Z - Not affected.
   *  N - Reset.
   *  H - Set if carry from bit 11.
   *  C - Set if carry from bit 15.
   */
  ADDHLn(n) {
    const r2 = this.CPU[n]
    const r1 = this.CPU.HL * 1
    this.CPU.HL += r2
    // Flags
    this.CPU.n = 0
    if (this.isHalfCarry(r1, r2)) this.CPU.h = 1
    if (this.isCarry(r1, r2)) this.CPU.c = 1
  }
  /**
   * ADD SP,n
   * Description:
   *  Add n to Stack Pointer (SP).
   * Use with:
   *  n = one byte signed immediate value (#).
   * Flags affected:
   *  Z - Reset.
   *  N - Reset.
   *  H - Set or reset according to operation.
   *  C - Set or reset according to operation.
   */
  ADDSPn() {
    const n = this.CPU._n
    this.CPU.SP += n
    // Flags
    this.CPU.z = 0
    this.CPU.n = 0
    // TODO: H and C flags
  }
  /**
   * INC nn
   * Description:
   *  Increment register nn.
   * Use with:
   *  nn = BC,DE,HL,SP
   * Flags affected:
   *  None.
   */
  INCnn(nn) {
    this.CPU[nn]++
  }
  /**
   * DEC nn
   * Description:
   *  Decrement register nn.
   * Use with:
   *  nn = BC,DE,HL,SP
   * Flags affected:
   *  None.
   */
  DECnn(nn) {
    this.CPU[nn]--
  }
  /**
   * SWAP n
   * Description:
   *  Swap upper & lower nibles of n.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Reset.
   */
  SWAP(n) {
    this.CPU[n] = helper.swapNibles(this.CPU[n])
    // Flags
    if (this.CPU[n] === 0) this.CPU.z = 1
    this.CPU.n = 0
    this.CPU.h = 0
    this.CPU.c = 0
  }
  /**
   * DAA
   * Description:
   *  Decimal adjust register A.
   *  This instruction adjusts register A so that the
   *  correct representation of Binary Coded Decimal (BCD)
   *  is obtained.
   * Flags affected:
   *  Z - Set if register A is zero.
   *  N - Not affected.
   *  H - Reset.
   *  C - Set or reset according to operation.
   */
  DAA() {}
  /**
   * CPL
   * Description:
   *  Complement A register. (Flip all bits.)
   * Flags affected:
   *  Z - Not affected.
   *  N - Set.
   *  H - Set.
   *  C - Not affected.
   */
  CPL() {
    this.CPU.A = ~this.CPU.A
    //Flags
    this.CPU.n = 1
    this.CPU.h = 1
  }
  /**
   * CCF
   * Description:
   *  Complement carry flag.
   *  If C flag is set, then reset it.
   *  If C flag is reset, then set it.
   * Flags affected:
   *  Z - Not affected.
   *  N - Reset.
   *  H - Reset.
   *  C - Complemented.
   */
  CCF() {}
  /**
   * SCF
   * Description:
   *  Set Carry flag.
   * Flags affected:
   *  Z - Not affected.
   *  N - Reset.
   *  H - Reset.
   *  C - Set.
   */
  SCF() {
    this.CPU.n = 0
    this.CPU.h = 0
    this.CPU.c = 1
  }
  /**
   * NOP
   * Description:
   *  No operation.
   */
  NOP() {}
  /**
   * HALT
   * Description:
   *  Power down CPU until an interrupt occurs. Use this
   *  when ever possible to reduce energy consumption.
   */
  HALT() {
    this.CPU.HALT = 1
  }
  /**
   * STOP
   * Description:
   *  Halt CPU & LCD display until button pressed.
   */
  STOP() {
    this.CPU.HALT = 1
    this.CPU.gpu.HALT = 1
  }
  /**
   * DI
   * Description:
   *  This instruction disables interrupts but not
   *  immediately. Interrupts are disabled after
   *  instruction after DI is executed.
   * Flags affected:
   *  None.
   */
  DI() {
    // TODO: Delay disable interrupts
  }
  /**
   *  EI
   * Description:
   *  Enable interrupts. This intruction enables interrupts
   *  but not immediately. Interrupts are enabled after
   *  instruction after EI is executed.
   * Flags affected:
   *  None.
   */
  EI() {
    // TODO: Delay enables interrupts
  }
  /**
   * Rotates and shifts
   */
  /**
   * RLCA
   * Description:
   *  Rotate A left. Old bit 7 to Carry flag.
   * Flags affected:
   * Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 7 data.
   */
  RLCA() {
    const bit7 = this.CPU.A >> 7
    this.CPU.A = this.CPU.A << 1
    // Flags
    if (this.CPU.A === 0) this.CPU.z = 0
    this.CPU.n = 0
    this.CPU.h = 0
    this.CPU.c = bit7
  }
  /**
   *  RLA
   * Description:
   *  Rotate A left through Carry flag.
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 7 data.
   */
  RLA() {}
  /**
   * RRCA
   * Description:
   *  Rotate A right. Old bit 0 to Carry flag.
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 0 data.
   */
  RRCA() {}
  /**
   * RRA
   * Description:
   *  Rotate A right through Carry flag.
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 0 data.
   */
  RRA() {}
  /**
   * RLC n
   * Description:
   *  Rotate n left. Old bit 7 to Carry flag.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   * Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 7 data.
   */
  RLCn(n) {}
  /**
   * RL n
   * Description:
   *  Rotate n left through Carry flag.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 7 data.
   */
  RLn(n) {}
  /**
   * RRC n
   * Description:
   *  Rotate n right. Old bit 0 to Carry flag.
   * Use with:
   * n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 0 data.
   */
  RRCn(n) {}
  /**
   * RR n
   * Description:
   *  Rotate n right through Carry flag.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 0 data.
   */
  RRn(n) {}
  /**
   *  SLA n
   * Description:
   *  Shift n left into Carry. LSB of n set to 0.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 7 data.
   */
  SLAn(n) {}
  /**
   * SRA n
   * Description:
   *  Shift n right into Carry. MSB doesn't change.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 0 data.
   */
  SRAn(n) {}
  /**
   * SRL n
   * Description:
   *  Shift n right into Carry. MSB set to 0.
   * Use with:
   *  n = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if result is zero.
   *  N - Reset.
   *  H - Reset.
   *  C - Contains old bit 0 data.
   */
  SRLn(n) {}
  /**
   * Bit Opcodes
   */

  /**
   * BIT b,r
   * Description:
   *  Test bit b in register r.
   * Use with:
   *  b = 0 - 7, r = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  Z - Set if bit b of register r is 0.
   *  N - Reset.
   *  H - Set.
   *  C - Not affected.
   */
  BITbr(b, r) {}
  /**
   * SET b,r
   * Description:
   *  Set bit b in register r.
   * Use with:
   *  b = 0 - 7, r = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  None.
   */
  SETbr(b, r) {}
  /**
   * RES b,r
   * Description:
   *  Reset bit b in register r.
   * Use with:
   *  b = 0 - 7, r = A,B,C,D,E,H,L,(HL)
   * Flags affected:
   *  None.
   */
  RESbr(b, r) {}
  /**
   * JP nn
   * Description:
   *  Jump to address nn.
   * Use with:
   *  nn = two byte immediate value. (LS byte first.)
   */
  JPnn() {}
  /**
   * JP cc,nn
   * Description:
   *  Jump to address n if following condition is true:
   *  cc = NZ, Jump if Z flag is reset.
   *  cc = Z, Jump if Z flag is set.
   *  cc = NC, Jump if C flag is reset.
   *  cc = C, Jump if C flag is set.
   * Use with:
   *  nn = two byte immediate value. (LS byte first.)
   */
  JPccnn() {}
  /**
   * JP (HL)
   * Description:
   *  Jump to address contained in HL.
   */
  JPHL() {}
  /**
   * JR n
   * Description:
   *  Add n to current address and jump to it.
   * Use with:
   *  n = one byte signed immediate value
   */
  JRn() {}
  /**
   * JR cc,n
   * Description:
   *  If following condition is true then add n to current
   *  address and jump to it:
   * Use with:
   *  n = one byte signed immediate value
   *  cc = NZ, Jump if Z flag is reset.
   *  cc = Z, Jump if Z flag is set.
   *  cc = NC, Jump if C flag is reset.
   *  cc = C, Jump if C flag is set.
   */
  JRccn(cc) {}
  /**
   * CALL nn
   * Description:
   *  Push address of next instruction onto stack and then
   *  jump to address nn.
   * Use with:
   *  nn = two byte immediate value. (LS byte first.)
   */
  CALLnn() {}
  /**
   * CALL cc,nn
   * Description:
   *  Call address n if following condition is true:
   *  cc = NZ, Call if Z flag is reset.
   *  cc = Z, Call if Z flag is set.
   *  cc = NC, Call if C flag is reset.
   *  cc = C, Call if C flag is set.
   * Use with:
   *  nn = two byte immediate value. (LS byte first.)
   */
  CALLccnn(cc) {}
  /**
   * RST n
   * Description:
   *  Push present address onto stack.
   *  Jump to address $0000 + n.
   * Use with:
   *  n = $00,$08,$10,$18,$20,$28,$30,$38
   */
  RSTn() {}
  /**
   * Returns
   */
  /**
   * RET
   * Description:
   *  Pop two bytes from stack & jump to that address.
   */
  RET() {}
  /**
   * RET cc
   * Description:
   *  Return if following condition is true:
   * Use with:
   *  cc = NZ, Return if Z flag is reset.
   *  cc = Z, Return if Z flag is set.
   *  cc = NC, Return if C flag is reset.
   *  cc = C, Return if C flag is set.
   */
  RETcc(cc) {}
  /**
   * RETI
   * Description:
   *  Pop two bytes from stack & jump to that address then
   *  enable interrupts.
   */
  RETI() {}
}
