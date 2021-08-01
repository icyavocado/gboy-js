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
      // 0x7f: ins.LDAn("A"), // LDr1r2
      // 0x78: ins.LDAn("B"), // LDr1r2
      // 0x79: ins.LDAn("C"), // LDr1r2
      // 0x7a: ins.LDAn("D"), // LDr1r2
      // 0x7b: ins.LDAn("E"), // LDr1r2
      // 0x7c: ins.LDAn("H"), // LDr1r2
      // 0x7d: ins.LDAn("L"), // LDr1r2
      0x0a: ins.LDAn("BC"),
      0x1a: ins.LDAn("DE"),
      // 0x7e: ins.LDAn("HL") // LDr1r2
      0xfa: ins.LDAn("nn"),
      0x3e: ins.LDAn(),
      /**
       * LDnA
       */
      // 0x7f: ins.LDnA("A"),
      0x47: ins.LDnA("B"),
      0x4f: ins.LDnA("C"),
      0x57: ins.LDnA("D"),
      0x5f: ins.LDnA("E"),
      0x67: ins.LDnA("H"),
      0x6f: ins.LDnA("L"),
      0x02: ins.LDnA("BC"),
      0x12: ins.LDnA("DE"),
      0x77: ins.LDnA("HL"),
      0xea: ins.LDnA("nn"),
      /**
       * LDAC
       */
      0xf2: ins.LDAC(),
      /**
       * LDCA
       */
      0xe2: ins.LDCA(),
      /**
       * LDAHLD
       */
      0x3a: ins.LDDAHL(),
      /**
       * LDDHLA
       */
      0x32: ins.LDDHLA(),
      /**
       * LDIAHL
       */
      0x2a: ins.LDIAHL(),
      /**
       * LDIHLA
       */
      0x22: ins.LDIHLA(),
      /**
       * LDHnA
       */
      0xe0: ins.LDHnA(),
      /**
       * LDHAn
       */
      0xf0: ins.LDHAn(),

      /**
       * 16-bit Loads (LD)
       */
      /**
       * LDnnn_16
       */
      0x01: ins.LDnnn_16("BC"),
      0x11: ins.LDnnn_16("DE"),
      0x21: ins.LDnnn_16("HL"),
      0x31: ins.LDnnn_16("SP"),
      /**
       * LDSPHL
       */
      0xf9: ins.LDSPHL(),
      /**
       * LDHLSPn
       */
      0xf8: ins.LDHLSPn(),
      /**
       * PUSH nn
       */
      0xf5: ins.PUSHnn("AF"),
      0xc5: ins.PUSHnn("BC"),
      0xd5: ins.PUSHnn("DE"),
      0xe5: ins.PUSHnn("HL"),
      /**
       * POP nn
       */
      0xf1: ins.POPnn("AF"),
      0xc1: ins.POPnn("BC"),
      0xd1: ins.POPnn("DE"),
      0xe1: ins.POPnn("HL"),
      /**
       * ADD(n)
       */
      0x87: ins.ADD("A"),
      0x80: ins.ADD("B"),
      0x81: ins.ADD("C"),
      0x82: ins.ADD("D"),
      0x83: ins.ADD("E"),
      0x84: ins.ADD("H"),
      0x85: ins.ADD("L"),
      0x86: ins.ADD("HL"),
      0xc6: ins.ADD("#"),
      /**
       * SUB(n)
       */
      0x97: ins.SUB("A"),
      0x90: ins.SUB("B"),
      0x91: ins.SUB("C"),
      0x92: ins.SUB("D"),
      0x93: ins.SUB("E"),
      0x94: ins.SUB("H"),
      0x95: ins.SUB("L"),
      0x96: ins.SUB("HL"),
      0xD6: ins.SUB("#"),
    };
  }
}
