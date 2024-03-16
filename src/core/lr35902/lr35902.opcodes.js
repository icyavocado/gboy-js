export default class LR35902OpCodes {
  constructor(ins) {
    this.ins = ins;
  }
  get ops() {
    const ins = this.ins;
    return {
      /**
       * 8-Bit Load Opcode
       */

      /**
       * LDnnn
       */
      0x06: () => ins.LDnnn("B"),
      0x0e: () => ins.LDnnn("C"),
      0x16: () => ins.LDnnn("D"),
      0x1e: () => ins.LDnnn("E"),
      0x26: () => ins.LDnnn("H"),
      0x2e: () => ins.LDnnn("L"),

      /**
       * LDr1r2
       */
      0x7f: () => ins.LDr1r2("A", "A"),
      0x78: () => ins.LDr1r2("A", "B"),
      0x79: () => ins.LDr1r2("A", "C"),
      0x7a: () => ins.LDr1r2("A", "D"),
      0x7b: () => ins.LDr1r2("A", "E"),
      0x7c: () => ins.LDr1r2("A", "H"),
      0x7d: () => ins.LDr1r2("A", "L"),
      0x7e: () => ins.LDr1r2("A", "HL"),
      0x40: () => ins.LDr1r2("B", "B"),
      0x41: () => ins.LDr1r2("B", "C"),
      0x42: () => ins.LDr1r2("B", "D"),
      0x43: () => ins.LDr1r2("B", "E"),
      0x44: () => ins.LDr1r2("B", "H"),
      0x45: () => ins.LDr1r2("B", "L"),
      0x46: () => ins.LDr1r2("B", "HL"),
      0x48: () => ins.LDr1r2("C", "B"),
      0x49: () => ins.LDr1r2("C", "C"),
      0x4a: () => ins.LDr1r2("C", "D"),
      0x4b: () => ins.LDr1r2("C", "E"),
      0x4c: () => ins.LDr1r2("C", "H"),
      0x4d: () => ins.LDr1r2("C", "L"),
      0x4e: () => ins.LDr1r2("C", "HL"),
      0x50: () => ins.LDr1r2("D", "B"),
      0x51: () => ins.LDr1r2("D", "C"),
      0x52: () => ins.LDr1r2("D", "D"),
      0x53: () => ins.LDr1r2("D", "E"),
      0x54: () => ins.LDr1r2("D", "H"),
      0x55: () => ins.LDr1r2("D", "L"),
      0x56: () => ins.LDr1r2("D", "HL"),
      0x58: () => ins.LDr1r2("E", "B"),
      0x59: () => ins.LDr1r2("E", "C"),
      0x5a: () => ins.LDr1r2("E", "D"),
      0x5b: () => ins.LDr1r2("E", "E"),
      0x5c: () => ins.LDr1r2("E", "H"),
      0x5d: () => ins.LDr1r2("E", "L"),
      0x5e: () => ins.LDr1r2("E", "HL"),
      0x60: () => ins.LDr1r2("H", "B"),
      0x61: () => ins.LDr1r2("H", "C"),
      0x62: () => ins.LDr1r2("H", "D"),
      0x63: () => ins.LDr1r2("H", "E"),
      0x64: () => ins.LDr1r2("H", "H"),
      0x65: () => ins.LDr1r2("H", "L"),
      0x66: () => ins.LDr1r2("H", "HL"),
      0x68: () => ins.LDr1r2("L", "B"),
      0x69: () => ins.LDr1r2("L", "C"),
      0x6a: () => ins.LDr1r2("L", "D"),
      0x6b: () => ins.LDr1r2("L", "E"),
      0x6c: () => ins.LDr1r2("L", "H"),
      0x6d: () => ins.LDr1r2("L", "L"),
      0x6e: () => ins.LDr1r2("L", "HL"),
      0x70: () => ins.LDr1r2("HL", "B"),
      0x71: () => ins.LDr1r2("HL", "C"),
      0x72: () => ins.LDr1r2("HL", "D"),
      0x73: () => ins.LDr1r2("HL", "E"),
      0x74: () => ins.LDr1r2("HL", "H"),
      0x75: () => ins.LDr1r2("HL", "L"),
      0x36: () => ins.LDr1r2("HL", "n"),
      /**
       * LDAn
       */
      // 0x7f: () => ins.LDAn("A"), // LDr1r2
      // 0x78: () => ins.LDAn("B"), // LDr1r2
      // 0x79: () => ins.LDAn("C"), // LDr1r2
      // 0x7a: () => ins.LDAn("D"), // LDr1r2
      // 0x7b: () => ins.LDAn("E"), // LDr1r2
      // 0x7c: () => ins.LDAn("H"), // LDr1r2
      // 0x7d: () => ins.LDAn("L"), // LDr1r2
      0x0a: () => ins.LDAn("BC"),
      0x1a: () => ins.LDAn("DE"),
      // 0x7e: () => ins.LDAn("HL") // LDr1r2
      0xfa: () => ins.LDAn("nn"),
      0x3e: () => ins.LDAn("#"),
      /**
       * LDnA
       */
      // 0x7f: () => ins.LDnA("A"),
      0x47: () => ins.LDnA("B"),
      0x4f: () => ins.LDnA("C"),
      0x57: () => ins.LDnA("D"),
      0x5f: () => ins.LDnA("E"),
      0x67: () => ins.LDnA("H"),
      0x6f: () => ins.LDnA("L"),
      0x02: () => ins.LDnA("BC"),
      0x12: () => ins.LDnA("DE"),
      0x77: () => ins.LDnA("HL"),
      0xea: () => ins.LDnA("nn"),
      /**
       * LDAC
       */
      0xf2: () => ins.LDAC(),
      /**
       * LDCA
       */
      0xe2: () => ins.LDCA(),
      /**
       * LDAHLD
       */
      0x3a: () => ins.LDDAHL(),
      /**
       * LDDHLA
       */
      0x32: () => ins.LDDHLA(),
      /**
       * LDIAHL
       */
      0x2a: () => ins.LDIAHL(),
      /**
       * LDIHLA
       */
      0x22: () => ins.LDIHLA(),
      /**
       * LDHnA
       */
      0xe0: () => ins.LDHnA(),
      /**
       * LDHAn
       */
      0xf0: () => ins.LDHAn(),

      /**
       * 16-bit Loads (LD)
       */
      /**
       * LDnnn_16
       */
      0x01: () => ins.LDnnn_16("BC"),
      0x11: () => ins.LDnnn_16("DE"),
      0x21: () => ins.LDnnn_16("HL"),
      0x31: () => ins.LDnnn_16("SP"),
      /**
       * LDSPHL
       */
      0xf9: () => ins.LDSPHL(),
      /**
       * LDHLSPn
       */
      0xf8: () => ins.LDHLSPn(),
      /**
       * PUSH nn
       */
      0xf5: () => ins.PUSHnn("AF"),
      0xc5: () => ins.PUSHnn("BC"),
      0xd5: () => ins.PUSHnn("DE"),
      0xe5: () => ins.PUSHnn("HL"),
      /**
       * POP nn
       */
      0xf1: () => ins.POPnn("AF"),
      0xc1: () => ins.POPnn("BC"),
      0xd1: () => ins.POPnn("DE"),
      0xe1: () => ins.POPnn("HL"),
      /**
       * ADD(n)
       */
      0x87: () => ins.ADD("A"),
      0x80: () => ins.ADD("B"),
      0x81: () => ins.ADD("C"),
      0x82: () => ins.ADD("D"),
      0x83: () => ins.ADD("E"),
      0x84: () => ins.ADD("H"),
      0x85: () => ins.ADD("L"),
      0x86: () => ins.ADD("HL"),
      0xc6: () => ins.ADD("#"),
      /**
       * ADC(n)
       */
      0x8f: () => ins.ADC("A"),
      0x88: () => ins.ADC("B"),
      0x89: () => ins.ADC("C"),
      0x8a: () => ins.ADC("D"),
      0x8b: () => ins.ADC("E"),
      0x8c: () => ins.ADC("H"),
      0x8d: () => ins.ADC("L"),
      0x8e: () => ins.ADC("HL"),
      0xce: () => ins.ADC("#"),
      /**
       * SUB(n)
       */
      0x97: () => ins.SUB("A"),
      0x90: () => ins.SUB("B"),
      0x91: () => ins.SUB("C"),
      0x92: () => ins.SUB("D"),
      0x93: () => ins.SUB("E"),
      0x94: () => ins.SUB("H"),
      0x95: () => ins.SUB("L"),
      0x96: () => ins.SUB("HL"),
      0xd6: () => ins.SUB("#"),
      /**
       * SBC(n)
       */
      0x9f: () => ins.SBC("A"),
      0x98: () => ins.SBC("B"),
      0x99: () => ins.SBC("C"),
      0x9a: () => ins.SBC("D"),
      0x9b: () => ins.SBC("E"),
      0x9c: () => ins.SBC("H"),
      0x9d: () => ins.SBC("L"),
      0x9e: () => ins.SBC("HL"),
      /**
       * AND(n)
       */
      0xa7: () => ins.AND("A"),
      0xa0: () => ins.AND("B"),
      0xa1: () => ins.AND("C"),
      0xa2: () => ins.AND("D"),
      0xa3: () => ins.AND("E"),
      0xa4: () => ins.AND("H"),
      0xa5: () => ins.AND("L"),
      0xa6: () => ins.AND("HL"),
      0xe6: () => ins.AND("#"),
      /**
       * OR(n)
       */
      0xb7: () => ins.OR("A"),
      0xb0: () => ins.OR("B"),
      0xb1: () => ins.OR("C"),
      0xb2: () => ins.OR("D"),
      0xb3: () => ins.OR("E"),
      0xb4: () => ins.OR("H"),
      0xb5: () => ins.OR("L"),
      0xb6: () => ins.OR("HL"),
      0xf6: () => ins.OR("#"),
      /**
       * XOR(n)
       */
      0xaf: () => ins.XOR("A"),
      0xa8: () => ins.XOR("B"),
      0xa9: () => ins.XOR("C"),
      0xaa: () => ins.XOR("D"),
      0xab: () => ins.XOR("E"),
      0xac: () => ins.XOR("H"),
      0xad: () => ins.XOR("L"),
      0xae: () => ins.XOR("HL"),
      0xee: () => ins.XOR("#"),
      /**
       * CP(n)
       */
      0xbf: () => ins.CP("A"),
      0xb8: () => ins.CP("B"),
      0xb9: () => ins.CP("C"),
      0xba: () => ins.CP("D"),
      0xbb: () => ins.CP("E"),
      0xbc: () => ins.CP("H"),
      0xbd: () => ins.CP("L"),
      0xbe: () => ins.CP("HL"),
      0xfe: () => ins.CP("#"),
      /**
       * INC(n)
       */
      0x3c: () => ins.INC("A"),
      0x04: () => ins.INC("B"),
      0x0c: () => ins.INC("C"),
      0x14: () => ins.INC("D"),
      0x1c: () => ins.INC("E"),
      0x24: () => ins.INC("H"),
      0x2c: () => ins.INC("L"),
      0x34: () => ins.INC("HL"),
      /**
       * DEC(n)
       */
      0x3d: () => ins.DEC("A"),
      0x05: () => ins.DEC("B"),
      0x0d: () => ins.DEC("C"),
      0x15: () => ins.DEC("D"),
      0x1d: () => ins.DEC("E"),
      0x25: () => ins.DEC("H"),
      0x2d: () => ins.DEC("L"),
      0x35: () => ins.DEC("HL"),
      /**
       * ADDHLn(n)
       */
      0x09: () => ins.ADDHLn("BC"),
      0x19: () => ins.ADDHLn("DE"),
      0x29: () => ins.ADDHLn("HL"),
      0x39: () => ins.ADDHLn("SP"),
      /**
       * ADDSPn(n)
       */
      0xe8: () => ins.ADDSPn("#"),
      /**
       * INCnn(nn)
       */
      0x03: () => ins.INCnn("BC"),
      0x13: () => ins.INCnn("DE"),
      0x23: () => ins.INCnn("HL"),
      0x33: () => ins.INCnn("SP"),
      /**
       * DECnn(nn)
       */
      0x0b: () => ins.DECnn("BC"),
      0x1b: () => ins.DECnn("DE"),
      0x2b: () => ins.DECnn("HL"),
      0x3b: () => ins.DECnn("SP"),
      /**
       * SWAP(n)
       */
      0x37: () => ins.SWAP("A"),
      0x30: () => ins.SWAP("B"),
      0x31: () => ins.SWAP("C"),
      0x32: () => ins.SWAP("D"),
      0x33: () => ins.SWAP("E"),
      0x34: () => ins.SWAP("H"),
      0x35: () => ins.SWAP("L"),
      0x36: () => ins.SWAP("HL"),
      /**
       * DAA()
       */
      0x27: () => ins.DAA(),
      /**
       * CPL()
       */
      0x2f: () => ins.CPL(),
      /**
       * CCF()
       */
      0x3f: () => ins.CCF(),
      /**
       * SCF()
       */
      0x37: () => ins.SCF(),
      /**
       * NOP()
       */
      0x00: () => ins.NOP(),
      /**
       * HALT()
       */
      0x76: () => ins.HALT(),
      /**
       * STOP
       */
      0x10: () => ins.STOP(),
      /**
       * DI()
       */
      0xf3: () => ins.DI(),
      /**
       * EI()
       */
      0xfb: () => ins.EI(),
      /**
       * RLCA
       */
      0x07: () => ins.RLCA(),
      /**
       * RLA
       */
      0x17: () => ins.RLA(),
      /**
       * RRCA
       */
      0x0f: () => ins.RRCA(),
      /**
       * RRA
       */
      0x1f: () => ins.RRA(),
      /**
       * JP nn
       */
      0xc3: () => ins.JPnn(),
      /**
       * JPccnn
       */
      0xc2: () => ins.JPccnn("NZ"),
      0xca: () => ins.JPccnn("Z"),
      0xd2: () => ins.JPccnn("NC"),
      0xda: () => ins.JPccnn("C"),
      /**
       * JP (HL)
       */
      0xe9: () => ins.JPHL(),
      /**
       * JR n
       */
      0x18: () => ins.JRn(),
      /**
       * JR cc,n
       */
      0x20: () => ins.JRccn("NZ"),
      0x28: () => ins.JRccn("Z"),
      0x30: () => ins.JRccn("NC"),
      0x38: () => ins.JRccn("C"),
      /**
       * CALL nn
       */
      0xcd: () => ins.CALLnn(),
      /**
       * CALL cc,nn
       */
      0xc4: () => ins.CALLccnn("NZ"),
      0xcc: () => ins.CALLccnn("Z"),
      0xd4: () => ins.CALLccnn("NC"),
      0xdc: () => ins.CALLccnn("C"),
      /**
       * RST n
       */
      0xc7: () => ins.RSTn("00H"),
      0xcf: () => ins.RSTn("08H"),
      0xd7: () => ins.RSTn("10H"),
      0xdf: () => ins.RSTn("18H"),
      0xe7: () => ins.RSTn("20H"),
      0xef: () => ins.RSTn("28H"),
      0xf7: () => ins.RSTn("30H"),
      0xff: () => ins.RSTn("38H"),
      /**
       * RET
       */
      0xc9: () => ins.RET(),
      /**
       * RET cc
       */
      0xc0: () => ins.RETcc("NZ"),
      0xc8: () => ins.RETcc("Z"),
      0xd0: () => ins.RETcc("NC"),
      0xd8: () => ins.RETcc("C"),
      /**
       * RETI
       */
      0xd9: () => ins.RETI(),
    };
  }
  get CB() {
    return {
      /**
       * RLC n
       */
      0x07: () => ins.RLCn("A"),
      0x00: () => ins.RLCn("B"),
      0x01: () => ins.RLCn("C"),
      0x02: () => ins.RLCn("D"),
      0x03: () => ins.RLCn("E"),
      0x04: () => ins.RLCn("H"),
      0x05: () => ins.RLCn("L"),
      0x06: () => ins.RLCn("HL"),
      /**
       * RL n
       */
      0x17: () => ins.RLn("A"),
      0x10: () => ins.RLn("B"),
      0x11: () => ins.RLn("C"),
      0x12: () => ins.RLn("D"),
      0x13: () => ins.RLn("E"),
      0x14: () => ins.RLn("H"),
      0x15: () => ins.RLn("L"),
      0x16: () => ins.RLn("HL"),
      /**
       * RRC n
       */
      0x0f: () => ins.RRCn("A"),
      0x08: () => ins.RRCn("B"),
      0x09: () => ins.RRCn("C"),
      0x0a: () => ins.RRCn("D"),
      0x0b: () => ins.RRCn("E"),
      0x0c: () => ins.RRCn("H"),
      0x0d: () => ins.RRCn("L"),
      0x0e: () => ins.RRCn("HL"),
      /**
       * RR n
       */
      0x1f: () => ins.RRn("A"),
      0x18: () => ins.RRn("B"),
      0x19: () => ins.RRn("C"),
      0x1a: () => ins.RRn("D"),
      0x1b: () => ins.RRn("E"),
      0x1c: () => ins.RRn("H"),
      0x1d: () => ins.RRn("L"),
      0x1e: () => ins.RRn("HL"),
      /**
       * SLA n
       */
      0x27: () => ins.SLAn("A"),
      0x20: () => ins.SLAn("B"),
      0x21: () => ins.SLAn("C"),
      0x22: () => ins.SLAn("D"),
      0x23: () => ins.SLAn("E"),
      0x24: () => ins.SLAn("H"),
      0x25: () => ins.SLAn("L"),
      0x26: () => ins.SLAn("HL"),
      /**
       * SRA n
       */
      0x2f: () => ins.SRAn("A"),
      0x28: () => ins.SRAn("B"),
      0x29: () => ins.SRAn("C"),
      0x2a: () => ins.SRAn("D"),
      0x2b: () => ins.SRAn("E"),
      0x2c: () => ins.SRAn("H"),
      0x2d: () => ins.SRAn("L"),
      0x2e: () => ins.SRAn("HL"),
      /**
       * SRL n
       */
      0x3f: () => ins.SRLn("A"),
      0x38: () => ins.SRLn("B"),
      0x39: () => ins.SRLn("C"),
      0x3a: () => ins.SRLn("D"),
      0x3b: () => ins.SRLn("E"),
      0x3c: () => ins.SRLn("H"),
      0x3d: () => ins.SRLn("L"),
      0x3e: () => ins.SRLn("HL"),
      /**
       * BIT b,r
       */
      0x47: () => ins.BIT("b", "A"),
      0x40: () => ins.BIT("b", "B"),
      0x41: () => ins.BIT("b", "C"),
      0x42: () => ins.BIT("b", "D"),
      0x43: () => ins.BIT("b", "E"),
      0x44: () => ins.BIT("b", "H"),
      0x45: () => ins.BIT("b", "L"),
      0x46: () => ins.BIT("b", "HL"),
      /**
       * SET b,r
       */
      0xc7: () => ins.SETbr("b", "A"),
      0xc0: () => ins.SETbr("b", "B"),
      0xc1: () => ins.SETbr("b", "C"),
      0xc2: () => ins.SETbr("b", "D"),
      0xc3: () => ins.SETbr("b", "E"),
      0xc4: () => ins.SETbr("b", "H"),
      0xc5: () => ins.SETbr("b", "L"),
      0xc6: () => ins.SETbr("b", "HL"),
      /**
       * RES b,r
       */
      0x87: () => ins.RESbr("b", "A"),
      0x80: () => ins.RESbr("b", "B"),
      0x81: () => ins.RESbr("b", "C"),
      0x82: () => ins.RESbr("b", "D"),
      0x83: () => ins.RESbr("b", "E"),
      0x84: () => ins.RESbr("b", "H"),
      0x85: () => ins.RESbr("b", "L"),
      0x86: () => ins.RESbr("b", "HL"),
    };
  }
}
