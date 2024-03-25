const logger = require("../logger.js").default;
const utils = require("./utils.js").default;

export default class LR35902Instructions {
  constructor(type, mode, reg1, reg2, cond, param) {
    this._type = type;
    this._mode = mode;
    this._reg1 = reg1;
    this._reg2 = reg2;
    this._cond = cond;
    this._param = param;
  }

  set type(value) {
    const mode = {
      "AM_IMP": 1,
      "AM_R_D16": 1,
      "AM_R_R": 1,
      "AM_MR_R": 1,
      "AM_R": 1,
      "AM_R_D8": 1,
      "AM_R_MR": 1,
      "AM_R_HLI": 1,
      "AM_R_HLD": 1,
      "AM_HLI_R": 1,
      "AM_HLD_R": 1,
      "AM_R_A8": 1,
      "AM_A8_R": 1,
      "AM_HL_SPR": 1,
      "AM_D16": 1,
      "AM_D8": 1,
      "AM_D16_R": 1,
      "AM_MR_D8": 1,
      "AM_MR": 1,
      "AM_A16_R": 1,
      "AM_R_A16": 1
    };
    if (!mode[value]) {
      logger.error(`Invalid type: ${value}`);
      return;
    }
    this._type = value;
  }

  get type() {
    return this._type;
  }

  get reg_type() {
    return {
      "RT_NONE": 1,
      "RT_A": 1,
      "RT_F": 1,
      "RT_B": 1,
      "RT_C": 1,
      "RT_D": 1,
      "RT_E": 1,
      "RT_H": 1,
      "RT_L": 1,
      "RT_AF": 1,
      "RT_BC": 1,
      "RT_DE": 1,
      "RT_HL": 1,
      "RT_SP": 1,
      "RT_PC": 1
    }
  }

  get reg1() {
    return this._reg1;
  }

  set reg1(value) {
    if (!this.reg_type[value]) {
      logger.error(`Invalid register 1: ${value}`);
      return;
    }
    this._reg1 = value;
  }

  get reg2() {
    return this._reg2;
  }

  set reg2(value) {
    if (!this.reg_type[value]) {
      logger.error(`Invalid register 2: ${value}`);
      return;
    }
    this._reg2 = value;
  }

  get cond_type() {
    return {
      "CT_NONE": 1,
      "CT_NZ": 1,
      "CT_Z": 1,
      "CT_NC": 1,
      "CT_C": 1
    }
  }

  get cond() {
    return this._cond;
  }

  set cond(value) {
    if (!this.cond_type[value]) {
      logger.error(`Invalid condition: ${value}`);
      return;
    }
    this._cond = value;
  }

  get param() {
    return this._param;
  }

  set param(value) {
    this._param = utils.uint8_t(value);
  }

  instructionByOpcode(opcode) {
    opcode = utils.uint8_t(opcode);

    const instructions = {
      0x00: ["NOP", "AM_IMP"],
      0x01: ["LD", "AM_R_D16", "RT_BC"],
      0x02: ["LD", "AM_R_MR", "RT_BC", "RT_A"],
      0x03: ["INC", "AM_R", "RT_BC"],
      0x04: ["INC", "AM_R", "RT_B"],
      0x05: ["DEC", "AM_R", "RT_B"],
      0x06: ["LD", "AM_R_D8", "RT_B"],
      0x07: ["RLCA", "AM_IMP"],
      0x08: ["LD", "AM_A16_R"],
      0x09: ["ADD", "AM_R_R", "RT_HL", "RT_BC"],
      0x0A: ["LD", "AM_R_MR", "RT_A", "RT_BC"],
      0x0B: ["DEC", "AM_R", "RT_BC"],
      0x0C: ["INC", "AM_R", "RT_C"],
      0x0D: ["DEC", "AM_R", "RT_C"],
      0x0E: ["LD", "AM_R_D8", "RT_C"],
      0x0F: ["RRCA", "AM_IMP"],
      0x10: ["STOP", "AM_D8"],
      0x11: ["LD", "AM_R_D16", "RT_DE"],
      0x12: ["LD", "AM_R_MR", "RT_DE", "RT_A"],
      0x13: ["INC", "AM_R", "RT_DE"],
      0x14: ["INC", "AM_R", "RT_D"],
      0x15: ["DEC", "AM_R", "RT_D"],
      0x16: ["LD", "AM_R_D8", "RT_D"],
      0x17: ["RLA", "AM_IMP"],
      0x18: ["JR", "AM_D8"],
      0x19: ["ADD", "AM_R_R", "RT_HL", "RT_DE"],
      0x1A: ["LD", "AM_R_MR", "RT_A", "RT_DE"],
      0x1B: ["DEC", "AM_R", "RT_DE"],
      0x1C: ["INC", "AM_R", "RT_E"],
      0x1D: ["DEC", "AM_R", "RT_E"],
      0x1E: ["LD", "AM_R_D8", "RT_E"],
      0x1F: ["RRA", "AM_IMP"],
      0x20: ["JR", "AM_D8", "CT_NZ"],
      0x21: ["LD", "AM_R_D16", "RT_HL"],
      0x22: ["LD", "AM_HLI_R", "RT_A"],
      0x23: ["INC", "AM_R", "RT_HL"],
      0x24: ["INC", "AM_R", "RT_H"],
      0x25: ["DEC", "AM_R", "RT_H"],
      0x26: ["LD", "AM_R_D8", "RT_H"],
      0x27: ["DAA", "AM_IMP"],
      0x28: ["JR", "AM_D8", "CT_Z"],
      0x29: ["ADD", "AM_R_R", "RT_HL", "RT_HL"],
      0x2A: ["LD", "AM_A8_R", "RT_HL"],
      0x2B: ["DEC", "AM_R", "RT_HL"],
      0x2C: ["INC", "AM_R", "RT_L"],
      0x2D: ["DEC", "AM_R", "RT_L"],
      0x2E: ["LD", "AM_R_D8", "RT_L"],
      0x2F: ["CPL", "AM_IMP"],
      0x30: ["JR", "AM_D8", "CT_NC"],
      0x31: ["LD", "AM_R_D16", "RT_SP"],
      0x32: ["LD", "AM_HLD_R", "RT_A"],
      0x33: ["INC", "AM_R", "RT_SP"],
      0x34: ["INC", "AM_MR", "RT_HL"],
      0x35: ["DEC", "AM_MR", "RT_HL"],
      0x36: ["LD", "AM_MR_D8", "RT_HL"],
      0x37: ["SCF", "AM_IMP"],
      0x38: ["JR", "AM_D8", "CT_C"],
      0x39: ["ADD", "AM_R_R", "RT_HL", "RT_SP"],
      0x3A: ["LD", "AM_A8_R", "RT_A"],
      0x3B: ["DEC", "AM_R", "RT_SP"],
      0x3C: ["INC", "AM_R", "RT_A"],
      0x3D: ["DEC", "AM_R", "RT_A"],
      0x3E: ["LD", "AM_R_D8", "RT_A"],
      0x3F: ["CCF", "AM_IMP"],
      0x40: ["LD", "AM_R_R", "RT_B", "RT_B"],
      0x41: ["LD", "AM_R_R", "RT_B", "RT_C"],
      0x42: ["LD", "AM_R_R", "RT_B", "RT_D"],
      0x43: ["LD", "AM_R_R", "RT_B", "RT_E"],
      0x44: ["LD", "AM_R_R", "RT_B", "RT_H"],
      0x45: ["LD", "AM_R_R", "RT_B", "RT_L"],
      0x46: ["LD", "AM_R_MR", "RT_B", "RT_HL"],
      0x47: ["LD", "AM_R_R", "RT_B", "RT_A"],
      0x48: ["LD", "AM_R_R", "RT_C", "RT_B"],
      0x49: ["LD", "AM_R_R", "RT_C", "RT_C"],
      0x4A: ["LD", "AM_R_R", "RT_C", "RT_D"],
      0x4B: ["LD", "AM_R_R", "RT_C", "RT_E"],
      0x4C: ["LD", "AM_R_R", "RT_C", "RT_H"],
      0x4D: ["LD", "AM_R_R", "RT_C", "RT_L"],
      0x4E: ["LD", "AM_R_MR", "RT_C", "RT_HL"],
      0x4F: ["LD", "AM_R_R", "RT_C", "RT_A"],
      0x50: ["LD", "AM_R_R", "RT_D", "RT_B"],
      0x51: ["LD", "AM_R_R", "RT_D", "RT_C"],
      0x52: ["LD", "AM_R_R", "RT_D", "RT_D"],
      0x53: ["LD", "AM_R_R", "RT_D", "RT_E"],
      0x54: ["LD", "AM_R_R", "RT_D", "RT_H"],
      0x55: ["LD", "AM_R_R", "RT_D", "RT_L"],
      0x56: ["LD", "AM_R_MR", "RT_D", "RT_HL"],
      0x57: ["LD", "AM_R_R", "RT_D", "RT_A"],
      0x58: ["LD", "AM_R_R", "RT_E", "RT_B"],
      0x59: ["LD", "AM_R_R", "RT_E", "RT_C"],
      0x5A: ["LD", "AM_R_R", "RT_E", "RT_D"],
      0x5B: ["LD", "AM_R_R", "RT_E", "RT_E"],
      0x5C: ["LD", "AM_R_R", "RT_E", "RT_H"],
      0x5D: ["LD", "AM_R_R", "RT_E", "RT_L"],
      0x5E: ["LD", "AM_R_MR", "RT_E", "RT_HL"],
      0x5F: ["LD", "AM_R_R", "RT_E", "RT_A"],
      0x60: ["LD", "AM_R_R", "RT_H", "RT_B"],
      0x61: ["LD", "AM_R_R", "RT_H", "RT_C"],
      0x62: ["LD", "AM_R_R", "RT_H", "RT_D"],
      0x63: ["LD", "AM_R_R", "RT_H", "RT_E"],
      0x64: ["LD", "AM_R_R", "RT_H", "RT_H"],
      0x65: ["LD", "AM_R_R", "RT_H", "RT_L"],
      0x66: ["LD", "AM_R_MR", "RT_H", "RT_HL"],
      0x67: ["LD", "AM_R_R", "RT_H", "RT_A"],
      0x68: ["LD", "AM_R_R", "RT_L", "RT_B"],
      0x69: ["LD", "AM_R_R", "RT_L", "RT_C"],
      0x6A: ["LD", "AM_R_R", "RT_L", "RT_D"],
      0x6B: ["LD", "AM_R_R", "RT_L", "RT_E"],
      0x6C: ["LD", "AM_R_R", "RT_L", "RT_H"],
      0x6D: ["LD", "AM_R_R", "RT_L", "RT_L"],
      0x6E: ["LD", "AM_R_MR", "RT_L", "RT_HL"],
      0x6F: ["LD", "AM_R_R", "RT_L", "RT_A"],
      0x70: ["LD", "AM_MR_R", "RT_HL", "RT_B"],
      0x71: ["LD", "AM_MR_R", "RT_HL", "RT_C"],
      0x72: ["LD", "AM_MR_R", "RT_HL", "RT_D"],
      0x73: ["LD", "AM_MR_R", "RT_HL", "RT_E"],
      0x74: ["LD", "AM_MR_R", "RT_HL", "RT_H"],
      0x75: ["LD", "AM_MR_R", "RT_HL", "RT_L"],
      0x76: ["HALT", "AM_IMP"],
      0x77: ["LD", "AM_MR_R", "RT_HL", "RT_A"],
      0x78: ["LD", "AM_R_R", "RT_A", "RT_B"],
      0x79: ["LD", "AM_R_R", "RT_A", "RT_C"],
      0x7A: ["LD", "AM_R_R", "RT_A", "RT_D"],
      0x7B: ["LD", "AM_R_R", "RT_A", "RT_E"],
      0x7C: ["LD", "AM_R_R", "RT_A", "RT_H"],
      0x7D: ["LD", "AM_R_R", "RT_A", "RT_L"],
      0x7E: ["LD", "AM_R_MR", "RT_A", "RT_HL"],
      0x7F: ["LD", "AM_R_R", "RT_A", "RT_A"],
      0x80: ["ADD", "AM_R_R", "RT_A", "RT_B"],
      0x81: ["ADD", "AM_R_R", "RT_A", "RT_C"],
      0x82: ["ADD", "AM_R_R", "RT_A", "RT_D"],
      0x83: ["ADD", "AM_R_R", "RT_A", "RT_E"],
      0x84: ["ADD", "AM_R_R", "RT_A", "RT_H"],
      0x85: ["ADD", "AM_R_R", "RT_A", "RT_L"],
      0x86: ["ADD", "AM_R_MR", "RT_A", "RT_HL"],
      0x87: ["ADD", "AM_R_R", "RT_A", "RT_A"],
      0x88: ["ADC", "AM_R_R", "RT_A", "RT_B"],
      0x89: ["ADC", "AM_R_R", "RT_A", "RT_C"],
      0x8A: ["ADC", "AM_R_R", "RT_A", "RT_D"],
      0x8B: ["ADC", "AM_R_R", "RT_A", "RT_E"],
      0x8C: ["ADC", "AM_R_R", "RT_A", "RT_H"],
      0x8D: ["ADC", "AM_R_R", "RT_A", "RT_L"],
      0x8E: ["ADC", "AM_R_MR", "RT_A", "RT_HL"],
      0x8F: ["ADC", "AM_R_R", "RT_A", "RT_A"],
      0x90: ["SUB", "AM_R_R", "RT_A", "RT_B"],
      0x91: ["SUB", "AM_R_R", "RT_A", "RT_C"],
      0x92: ["SUB", "AM_R_R", "RT_A", "RT_D"],
      0x93: ["SUB", "AM_R_R", "RT_A", "RT_E"],
      0x94: ["SUB", "AM_R_R", "RT_A", "RT_H"],
      0x95: ["SUB", "AM_R_R", "RT_A", "RT_L"],
      0x96: ["SUB", "AM_R_MR", "RT_A", "RT_HL"],
      0x97: ["SUB", "AM_R_R", "RT_A", "RT_A"],
      0x98: ["SBC", "AM_R_R", "RT_A", "RT_B"],
      0x99: ["SBC", "AM_R_R", "RT_A", "RT_C"],
      0x9A: ["SBC", "AM_R_R", "RT_A", "RT_D"],
      0x9B: ["SBC", "AM_R_R", "RT_A", "RT_E"],
      0x9C: ["SBC", "AM_R_R", "RT_A", "RT_H"],
      0x9D: ["SBC", "AM_R_R", "RT_A", "RT_L"],
      0x9E: ["SBC", "AM_R_MR", "RT_A", "RT_HL"],
      0x9F: ["SBC", "AM_R_R", "RT_A", "RT_A"],
      0xA0: ["AND", "AM_R_R", "RT_A", "RT_B"],
      0xA1: ["AND", "AM_R_R", "RT_A", "RT_C"],
      0xA2: ["AND", "AM_R_R", "RT_A", "RT_D"],
      0xA3: ["AND", "AM_R_R", "RT_A", "RT_E"],
      0xA4: ["AND", "AM_R_R", "RT_A", "RT_H"],
      0xA5: ["AND", "AM_R_R", "RT_A", "RT_L"],
      0xA6: ["AND", "AM_R_MR", "RT_A", "RT_HL"],
      0xA7: ["AND", "AM_R_R", "RT_A", "RT_A"],
      0xA8: ["XOR", "AM_R_R", "RT_A", "RT_B"],
      0xA9: ["XOR", "AM_R_R", "RT_A", "RT_C"],
      0xAA: ["XOR", "AM_R_R", "RT_A", "RT_D"],
      0xAB: ["XOR", "AM_R_R", "RT_A", "RT_E"],
      0xAC: ["XOR", "AM_R_R", "RT_A", "RT_H"],
      0xAD: ["XOR", "AM_R_R", "RT_A", "RT_L"],
      0xAE: ["XOR", "AM_R_MR", "RT_A", "RT_HL"],
      0xAF: ["XOR", "AM_R_R", "RT_A", "RT_A"],
      0xB0: ["OR", "AM_R_R", "RT_A", "RT_B"],
      0xB1: ["OR", "AM_R_R", "RT_A", "RT_C"],
      0xB2: ["OR", "AM_R_R", "RT_A", "RT_D"],
      0xB3: ["OR", "AM_R_R", "RT_A", "RT_E"],
      0xB4: ["OR", "AM_R_R", "RT_A", "RT_H"],
      0xB5: ["OR", "AM_R_R", "RT_A", "RT_L"],
      0xB6: ["OR", "AM_R_MR", "RT_A", "RT_HL"],
      0xB7: ["OR", "AM_R_R", "RT_A", "RT_A"],
      0xB8: ["CP", "AM_R_R", "RT_A", "RT_B"],
      0xB9: ["CP", "AM_R_R", "RT_A", "RT_C"],
      0xBA: ["CP", "AM_R_R", "RT_A", "RT_D"],
      0xBB: ["CP", "AM_R_R", "RT_A", "RT_E"],
      0xBC: ["CP", "AM_R_R", "RT_A", "RT_H"],
      0xBD: ["CP", "AM_R_R", "RT_A", "RT_L"],
      0xBE: ["CP", "AM_R_MR", "RT_A", "RT_HL"],
      0xBF: ["CP", "AM_R_R", "RT_A", "RT_A"],
      0xC0: ["RET", "AM_COND", "CT_NZ"],
      0xC1: ["POP", "AM_R", "RT_BC"],
      0xC2: ["JP", "AM_COND", "CT_NZ"],
      0xC3: ["JP", "AM_A16"],
      0xC4: ["CALL", "AM_COND", "CT_NZ"],
      0xC5: ["PUSH", "AM_R", "RT_BC"],
      0xC6: ["ADD", "AM_R_D8", "RT_A"],
      0xC7: ["RST", "AM_IMP", 0x00],
      0xC8: ["RET", "AM_COND", "CT_Z"],
      0xC9: ["RET", "AM_IMP"],
      0xCA: ["JP", "AM_COND", "CT_Z"],
      0xCB: ["PREFIX", "AM_IMP"],
      0xCC: ["CALL", "AM_COND", "CT_Z"],
      0xCD: ["CALL", "AM_A16"],
      0xCE: ["ADC", "AM_R_D8", "RT_A"],
      0xCF: ["RST", "AM_IMP", 0x08],
      0xD0: ["RET", "AM_COND", "CT_NC"],
      0xD1: ["POP", "AM_R", "RT_DE"],
      0xD2: ["JP", "AM_COND", "CT_NC"],
      0xD3: ["INVALID", "AM_IMP"],
      0xD4: ["CALL", "AM_COND", "CT_NC"],
      0xD5: ["PUSH", "AM_R", "RT_DE"],
      0xD6: ["SUB", "AM_R_D8", "RT_A"],
      0xD7: ["RST", "AM_IMP", 0x10],
      0xD8: ["RET", "AM_COND", "CT_C"],
      0xD9: ["RETI", "AM_IMP"],
      0xDA: ["JP", "AM_COND", "CT_C"],
      0xDB: ["INVALID", "AM_IMP"],
      0xDC: ["CALL", "AM_COND", "CT_C"],
      0xDD: ["INVALID", "AM_IMP"],
      0xDE: ["SBC", "AM_R_D8", "RT_A"],
      0xDF: ["RST", "AM_IMP", 0x18],
      0xE0: ["LD", "AM_A8_R", "RT_A"],
      0xE1: ["POP", "AM_R", "RT_HL"],
      0xE2: ["LD", "AM_MR_R", "RT_C", "RT_A"],
      0xE3: ["INVALID", "AM_IMP"],
      0xE4: ["INVALID", "AM_IMP"],
      0xE5: ["PUSH", "AM_R", "RT_HL"],
      0xE6: ["AND", "AM_R_D8", "RT_A"],
      0xE7: ["RST", "AM_IMP", 0x20],
      0xE8: ["ADD", "AM_SP_D8"],
      0xE9: ["JP", "AM_HL"],
      0xEA: ["LD", "AM_A16_R", "RT_A"],
      0xEB: ["INVALID", "AM_IMP"],
      0xEC: ["INVALID", "AM_IMP"],
      0xED: ["INVALID", "AM_IMP"],
      0xEE: ["XOR", "AM_R_D8", "RT_A"],
      0xEF: ["RST", "AM_IMP", 0x28],
      0xF0: ["LD", "AM_R_A8", "RT_A"],
      0xF1: ["POP", "AM_R", "RT_AF"],
      0xF2: ["LD", "AM_R_MR", "RT_A", "RT_C"],
      0xF3: ["DI", "AM_IMP"],
      0xF4: ["INVALID", "AM_IMP"],
      0xF5: ["PUSH", "AM_R", "RT_AF"],
      0xF6: ["OR", "AM_R_D8", "RT_A"],
      0xF7: ["RST", "AM_IMP", 0x30],
      0xF8: ["LD", "AM_HL_SPR", "RT_SP"],
      0xF9: ["LD", "AM_R_R", "RT_SP", "RT_HL"],
      0xFA: ["LD", "AM_R_A16", "RT_A"],
      0xFB: ["EI", "AM_IMP"],
      0xFC: ["INVALID", "AM_IMP"],
      0xFD: ["INVALID", "AM_IMP"],
      0xFE: ["CP", "AM_R_D8", "RT_A"],
      0xFF: ["RST", "AM_IMP", 0x3]
    };

    if (!instructions[opcode]) {
      logger.error(`Invalid opcode: ${opcode}`);
      return;
    }

    return instructions[opcode];
  }
}
