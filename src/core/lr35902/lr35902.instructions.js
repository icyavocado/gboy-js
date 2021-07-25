export default class LR35902Instructions {
  constructor(cpu, memory) {
    this.CPU = cpu;
    this.WRAM = memory;
  }
  read(address) {
    if (!address) return this.WRAM[this.CPU.pc++];
    return this.WRAM[address];
  }
  write(register, value) {
    if (register[1]) {
      this.CPU[register](value);
    } else {
      this.CPU[register] = value; // Does this wrap around
    }
  }
  _write8Bit(value) {
    // TODO: Implement 8-bit write instruction
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
    this.write8bit(this.CPU[rr]);
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
    this.CPU.cycles += r2.length * 4;
  }

  /**
   * Description:
   *  Put value n into A
   * Use with:
   *  n = A,B,C,D,E,H,L,(BC),(DE),(HL),(nn),#
   *  nn = two byte immediate value. (LS byte first.)
   */
  LDAn(n = this.read()) {
    let value = n;
    if (n === "nn") {
      value = (this.read() << 8) | (this.read() & 0xff);
    } else {
      value = this.CPU[n];
    }
    this.CPU.a = value;
    this.CPU.cycles += 4;
  }
  /**
   * Description:
   *  Put value A into n.
   * Use with:
   *  n = A,B,C,D,E,H,L,(BC),(DE),(HL),(nn)
   *  nn = two byte immediate value. (LS byte first.)
   */
  LDnA() {}

  LDrr(r1, r2) {
    r1 = r2;
    this.CPU.cycles += 4;
  }
  // ld r,n	xx nn	8	––	r=n
  LDrn(r1) {
    r1 = this.read();
    this.CPU.cycles += 8;
  }
  // ld r,(HL)	xx	8	––	r=(HL)
  LDrhl(r1) {
    r1 = this.read(this.CPU.hl());
    this.CPU.cycles += 8;
  }
  // ld (HL),r	7x	8	––	(HL)=r
  LDhlr(r1) {
    this.CPU.hl(r1);
    this.CPU.cycles += 8;
  }
  // ld (HL),n	36 nn	12	––	(HL)=n
  LDhln() {
    this.CPU.hl(this.read());
    this.CPU.cycles += 12;
  }
  // ld A,(BC)	0A	8	––	A=(BC)
  LDabc() {
    this.CPU.a = this.read(this.CPU.bc());
    this.CPU.cycles += 8;
  }
  // ld A,(DE)	1A	8	––	A=(DE)
  LDade() {
    this.CPU.a = this.read(this.CPU.de());
    this.CPU.cycles += 8;
  }
  // ld A,(nn)	FA	16	––	A=(nn)
  LDann() {
    this.CPU.a = (this.read() << 8) | (this.read() & 0xff);
    this.CPU.cycles += 16;
  }
  // ld (BC),A	02	8	––	(BC)=A
  LDbca() {
    this.CPU.bc(this.read(this.CPU.a));
    this.CPU.cycles += 16;
  }
  // ld (DE),A	12	8	––	(DE)=A
  LDdea() {
    this.CPU.bc(this.read(this.CPU.a));
    this.CPU.cycles += 8;
  }
  // ld (nn),A	EA	16	––	(nn)=A
  LDnna() {
    this.write("nn", this.read(this.CPU.a));
    this.CPU.cycles += 16;
  }
  // ld A,(FF00+n)	F0 nn	12	––	read from io-port n (memory FF00+n)
  LDaff00n() {
    this.CPU.a(this.read(0xff00 + this.read()));
    this.CPU.cycles += 12;
  }
  // ld (FF00+n),A	E0 nn	12	––	write to io-port n (memory FF00+n)
  LDff00n() {
    this.write(0xff00 + this.read(), this.CPU.a);
    this.CPU.cycles += 12;
  }
  // ld A,(FF00+C)	F2	8	––	read from io-port C (memory FF00+C)
  LDaff00c() {
    this.CPU.a = this.read(0xff00 + this.CPU.c);
    this.CPU.cycles += 8;
  }
  // ld (FF00+C),A	E2	8	––	write to io-port C (memory FF00+C)
  LDff00ca() {
    this.write(0xff00 + this.CPU.c, this.CPU.a);
    this.CPU.cycles += 8;
  }
  // ldi (HL),A	22	8	––	(HL)=A, HL=HL+1
  LDIhla() {
    this.CPU.hl(this.read(this.CPU.a));
    this.CPU.hl(this.read(this.CPU.hl()) + 1);
    this.CPU.cycles += 8;
  }
  // ldi A,(HL)	2A	8	––	A=(HL), HL=HL+1
  LDIahl() {
    this.CPU.a = this.read(this.CPU.hl());
    this.CPU.hl(this.read(this.CPU.hl()) + 1);
    this.CPU.cycles += 8;
  }
  // ldd (HL),A	32	8	––	(HL)=A, HL=HL-1
  LDDhla() {
    this.CPU.hl(this.read(this.CPU.a));
    this.CPU.hl(this.read(this.CPU.hl()) - 1);
    this.CPU.cycles += 8;
  }
  // ldd A,(HL)	3A	8	––	A=(HL), HL=HL-1
  LDDahl() {
    this.CPU.a = this.read(this.CPU.hl());
    this.CPU.hl(this.read(this.CPU.hl()) - 1);
    this.CPU.cycles += 8;
  }
  /**
    16-bit Load (LD) instructions
  */
  // LD dd,nn	dd  nn	dd=BC,DE,HL,SP	12	-	-	-	-
  LDrrnn(rr) {
    this.CPU[rr] = (this.read() << 8) | (this.read() & 0xff);
    this.CPU.cycles += 12;
  }
  // LD (nn),SP	(nn)  SP	-	20
  LDnnSP() {}
  // LD SP,HL	SP  HL	8
  // LD HL,(SP+e)	HL  (SP+e)	12	0	0	*	*
  // PUSH ss	(SP-1)  ssh, (SP-2)  ssl, SPSP-2	ss=BC,DE,HL,AF	16	-	-	-	-
  // POP dd	ddl  (SP), ddh  (SP+1), SPSP+2	dd=BC,DE,HL,AF	12
}
