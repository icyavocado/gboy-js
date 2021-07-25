export default class LR35902OpCodes {
  constructor(ins) {
    this.ins = ins;
  }
  ops() {
    const ins = this.ins;
    return {
      /**
       * 8-Bit Load Opcode
       */

      /**
       * LDnnn
       */
      0x06: ins.LDnnn("B"),
      0x0e: ins.LDnnn("C"),
      0x16: ins.LDnnn("D"),
      0x1e: ins.LDnnn("E"),
      0x26: ins.LDnnn("H"),
      0x2e: ins.LDnnn("L"),

      /**
       * LDr1r2
       */
      0x7f: ins.LDr1r2("A", "A"),
      0x78: ins.LDr1r2("A", "B"),
      0x79: ins.LDr1r2("A", "C"),
      0x7a: ins.LDr1r2("A", "D"),
      0x7b: ins.LDr1r2("A", "E"),
      0x7c: ins.LDr1r2("A", "H"),
      0x7d: ins.LDr1r2("A", "L"),
      0x7e: ins.LDr1r2("A", "HL"),
      0x40: ins.LDr1r2("B", "B"),
      0x41: ins.LDr1r2("B", "C"),
      0x42: ins.LDr1r2("B", "D"),
      0x43: ins.LDr1r2("B", "E"),
      0x44: ins.LDr1r2("B", "H"),
      0x45: ins.LDr1r2("B", "L"),
      0x46: ins.LDr1r2("B", "HL"),
      0x48: ins.LDr1r2("C", "B"),
      0x49: ins.LDr1r2("C", "C"),
      0x4a: ins.LDr1r2("C", "D"),
      0x4b: ins.LDr1r2("C", "E"),
      0x4c: ins.LDr1r2("C", "H"),
      0x4d: ins.LDr1r2("C", "L"),
      0x4e: ins.LDr1r2("C", "HL"),
      0x50: ins.LDr1r2("D", "B"),
      0x51: ins.LDr1r2("D", "C"),
      0x52: ins.LDr1r2("D", "D"),
      0x53: ins.LDr1r2("D", "E"),
      0x54: ins.LDr1r2("D", "H"),
      0x55: ins.LDr1r2("D", "L"),
      0x56: ins.LDr1r2("D", "HL"),
      0x58: ins.LDr1r2("E", "B"),
      0x59: ins.LDr1r2("E", "C"),
      0x5a: ins.LDr1r2("E", "D"),
      0x5b: ins.LDr1r2("E", "E"),
      0x5c: ins.LDr1r2("E", "H"),
      0x5d: ins.LDr1r2("E", "L"),
      0x5e: ins.LDr1r2("E", "HL"),
      0x60: ins.LDr1r2("H", "B"),
      0x61: ins.LDr1r2("H", "C"),
      0x62: ins.LDr1r2("H", "D"),
      0x63: ins.LDr1r2("H", "E"),
      0x64: ins.LDr1r2("H", "H"),
      0x65: ins.LDr1r2("H", "L"),
      0x66: ins.LDr1r2("H", "HL"),
      0x68: ins.LDr1r2("L", "B"),
      0x69: ins.LDr1r2("L", "C"),
      0x6a: ins.LDr1r2("L", "D"),
      0x6b: ins.LDr1r2("L", "E"),
      0x6c: ins.LDr1r2("L", "H"),
      0x6d: ins.LDr1r2("L", "L"),
      0x6e: ins.LDr1r2("L", "HL"),
      0x70: ins.LDr1r2("HL", "B"),
      0x71: ins.LDr1r2("HL", "C"),
      0x72: ins.LDr1r2("HL", "D"),
      0x73: ins.LDr1r2("HL", "E"),
      0x74: ins.LDr1r2("HL", "H"),
      0x75: ins.LDr1r2("HL", "L"),
      0x36: ins.LDr1r2("HL", "n"),
      /**
       * LDAn
       */
      0x7f: ins.LDAn("A"),
      0x78: ins.LDAn("B"),
      0x79: ins.LDAn("C"),
      0x7a: ins.LDAn("D"),
      0x7b: ins.LDAn("E"),
      0x7c: ins.LDAn("H"),
      0x7d: ins.LDAn("L"),
      0x0a: ins.LDAn("BC"),
      0x1a: ins.LDAn("DE"),
      0x7e: ins.LDAn("HL"),
      0xfa: ins.LDAn("nn"),
      0x3e: ins.LDAn() // TODO: inplementation (what is #)
    };
  }
}
