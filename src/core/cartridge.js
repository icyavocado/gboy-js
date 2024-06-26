const logger = require("../logger.js").default;
const utils = require("../core/utils.js").default;

const fs = require("fs");

export default class Cartridge {
  constructor() {
    this.data = new Uint8Array(0x2000000);
  }

  load(cartPath) {
    try {
      const data = fs.readFileSync(cartPath);
      const buffer = new Uint8Array(data);

      // Copy the cartridge data into memory
      for (let i = 0; i < buffer.length; i++) {
        this.data[i] = buffer[i];
      }

      return true;
    } catch (err) {
      console.error(`Error loading rom: ${err}`);
      return false;
    }
  }

  get title() {
    let title = "";
    for (let i = 0x134; i < 0x143; i++) {
      title += this.data[i] ? String.fromCharCode(this.data[i]) : 0x0;
    }

    return title;
  }

  get manufacturerCode() {
    let code = "";
    for (let i = 0x13F; i < 0x143; i++) {
      code += String.fromCharCode(this.data[i]);
    }
    return code;
  }

  get cgbFlag() {
    return this.data[0x143];
  }

  get cbgFlagDescription() {
    switch (this.cgbFlag) {
      case 0x80:
        return "Game supports CGB functions, but works on old gameboys";
      case 0xC0:
        return "Game works on CGB only";
      default:
        return "Game doesn't support CGB functions";
    }
  }

  get licenseeCode() {
    return (this.data[0x144]).toString(16) + (this.data[0x145]).toString(16);
  }

  get licenseeCodeDescription() {
    const licenseeCodeList = {
      "00": "None",
      "01": "Nintendo R&D1",
      "08": "Capcom",
      "13": "Electronic Arts",
      "18": "Hudson Soft",
      "19": "b-ai",
      "20": "kss",
      "22": "pow",
      "24": "PCM Complete",
      "25": "san-x",
      "28": "Kemco Japan",
      "29": "seta",
      "30": "Viacom",
      "31": "Nintendo",
      "32": "Bandai",
      "33": "Ocean/Acclaim",
      "34": "Konami",
      "35": "Hector",
      "37": "Taito",
      "38": "Hudson",
      "39": "Banpresto",
      "41": "Ubi Soft",
      "42": "Atlus",
      "44": "Malibu",
      "46": "angel",
      "47": "Bullet-Proof",
      "49": "irem",
      "50": "Absolute",
      "51": "Acclaim",
      "52": "Activision",
      "53": "American sammy",
      "54": "Konami",
      "55": "Hi tech entertainment",
      "56": "LJN",
      "57": "Matchbox",
      "58": "Mattel",
      "59": "Milton Bradley",
      "60": "Titus",
      "61": "Virgin",
      "64": "LucasArts",
      "67": "Ocean",
      "69": "Electronic Arts",
      "70": "Infogrames",
      "71": "Interplay",
      "72": "Broderbund",
      "73": "sculptured",
      "75": "sci",
      "78": "THQ",
      "79": "Accolade",
      "80": "misawa",
      "83": "lozc",
      "86": "Tokuma Shoten Intermedia",
      "87": "Tsukuda Original",
      "91": "Chunsoft",
      "92": "Video system",
      "93": "Ocean/Acclaim",
      "95": "Varie",
      "96": "Yonezawa/s’pal",
      "97": "Kaneko",
      "99": "Pack in soft",
      "9H": "Bottom Up",
      "A4": "Konami (Yu-Gi-Oh!)",
    };
    return licenseeCodeList[this.licenseeCode];
  }

  get sgbFlag() {
    return this.data[0x146];
  }

  get sgbFlagDescription() {
    switch (this.sgbFlag) {
      case 0x03:
        return "Game supports SGB functions";
      default:
        return "Game doesn't support SGB functions";
    }
  }

  get cartridgeType() {
    return this.data[0x147];
  }

  get cartridgeTypeDescription() {
    const cartridgeTypeList = {
      0x00: "ROM ONLY",
      0x01: "MBC1",
      0x02: "MBC1+RAM",
      0x03: "MBC1+RAM+BATTERY",
      0x05: "MBC2",
      0x06: "MBC2+BATTERY",
      0x08: "ROM+RAM",
      0x09: "ROM+RAM+BATTERY",
      0x0B: "MMM01",
      0x0C: "MMM01+RAM",
      0x0D: "MMM01+RAM+BATTERY",
      0x0F: "MBC3+TIMER+BATTERY",
      0x10: "MBC3+TIMER+RAM+BATTERY",
      0x11: "MBC3",
      0x12: "MBC3+RAM",
      0x13: "MBC3+RAM+BATTERY",
      0x19: "MBC5",
      0x1A: "MBC5+RAM",
      0x1B: "MBC5+RAM+BATTERY",
      0x1C: "MBC5+RUMBLE",
      0x1D: "MBC5+RUMBLE+RAM",
      0x1E: "MBC5+RUMBLE+RAM+BATTERY",
      0x1F: "MBC7+SENSOR+RUMBLE+RAM+BATTERY",
      0xFD: "TAMA5",
      0xFE: "HuC3",
      0xFF: "HuC1+RAM+BATTERY",
    };
    return cartridgeTypeList[this.cartridgeType];
  }

  get romSize() {
    return this.data[0x148];
  }

  get romSizeDescription() {
    const romSizeList = {
      0x00: "32KByte (no ROM banking)",
      0x01: "64KByte (4 banks)",
      0x02: "128KByte (8 banks)",
      0x03: "256KByte (16 banks)",
      0x04: "512KByte (32 banks)",
      0x05: "1MByte (64 banks) - only 63 banks used by MBC1",
      0x06: "2MByte (128 banks) - only 125 banks used by MBC1",
      0x07: "4MByte (256 banks)",
      0x52: "1.1MByte (72 banks)",
      0x53: "1.2MByte (80 banks)",
      0x54: "1.5MByte (96 banks)",
    };
    return romSizeList[this.romSize];
  }

  get ramSize() {
    return this.data[0x149];
  }

  get ramSizeDescription() {
    const ramSizeList = {
      0x00: "None",
      0x01: "2 KBytes - Unused",
      0x02: "8 KBytes",
      0x03: "32 KBytes (4 banks of 8KBytes each)",
      0x04: "128 KBytes (16 banks of 8KBytes each)",
      0x05: "64 KBytes (8 banks of 8KBytes each)",
    };
    return ramSizeList[this.ramSize];
  }

  get destinationCode() {
    return this.data[0x14A];
  }

  get destinationCodeDescription() {
    const destinationCodeList = {
      0x00: "Japanese (and possibly overseas)",
      0x01: "Overseas only",
    };
    return destinationCodeList[this.destinationCode];
  }

  get oldLicenseeCode() {
    return this.data[0x14B];
  }

  get maskRomVersionNumber() {
    return this.data[0x14C];
  }

  get headerChecksum() {
    return this.data[0x14D];
  }

  get checksumPassed() {
    let checksum = 0;
    for (let i = 0x134; i < 0x14D; i++) {
      checksum = checksum - this.data[i] - 1;
    }
    console.log(utils);
    checksum = utils.uint8_t(checksum);
    logger.info(`Expected: ${this.headerChecksum} | Actual Calculation: ${checksum} | Passed: ${checksum === this.headerChecksum} `);
    return checksum === this.headerChecksum;
  }

  get globalChecksum() {
    return this.data[0x14E] + this.data[0x14F];
  }

  get content() {
    console.log(`
----Cartridge Information----

    Title: ${this.title} \n
    Manufacturer Code: ${this.manufacturerCode}

    CGB Flag: ${this.cgbFlag}
    CGB Flag Description: ${this.cbgFlagDescription}

    Licensee Code: ${this.licenseeCode}
    Licensee Code Description: ${this.licenseeCodeDescription}

    SGB Flag: ${this.sgbFlag}
    SGB Flag Description: ${this.sgbFlagDescription}

    Cartridge Type: ${this.cartridgeType}
    Cartridge Type Description: ${this.cartridgeTypeDescription}

    ROM Size: ${this.romSize}
    ROM Size Description: ${this.romSizeDescription}

    RAM Size: ${this.ramSize}
    RAM Size Description: ${this.ramSizeDescription}

    Destination Code: ${this.destinationCode}
    Destination Code Description: ${this.destinationCodeDescription}

    Old Licensee Code: ${this.oldLicenseeCode}

    Mask ROM Version Number: ${this.maskRomVersionNumber}

    Header Checksum: ${this.headerChecksum}
    Global Checksum: ${this.globalChecksum}

------------------------------- `);
  }

  read(addr) {
    // Support ROM ONLY
    return utils.uint8_t(this.data[addr]);
  }

  write(addr, value) {
    // Support ROM ONLY
    logger.error(`Writing to ROM not supported`);
    this.data[addr] = utils.uint8_t(value);
  }
}
