export default class RAM {
  constructor() {
    this.memory_map = {
      // From cartridge, usually a fixed bank
      ROM_00: { start: 0, end: 0x3fff, ro: false, desc: "From cartridge, usually a fixed bank" },
      // From cartridge, switchable bank via mapper (if any)
      ROM_01_NN: { start: 4000, end: 0x7fff, ro: false, desc: "From cartridge, switchable bank via mapper (if any)" },
      // In CGB mode, switchable bank 0/1
      VRAM: { start: 8000, end: 0x9fff, ro: false, desc: "In CGB mode, switchable bank 0/1" },
      // 	From cartridge, switchable bank if any
      EX_RAM: { start: 0xA000, end: 0xbfff, ro: false, desc: "From cartridge, switchable bank if any" },
      // In CGB mode, switchable bank 1~7
      WRAM: { start: 0xc000, end: 0xdfff, ro: false, desc: "In CGB mode, switchable bank 1~7" },
      // Nintendo says use of this area is prohibited.
      ECHO_RAM: { start: 0xe000, end: 0xfdff, ro: true },
      SPRITE: { start: 0xfe00, end: 0xfe9f, ro: false },
      // Nintendo says use of this area is prohibited
      NOT_USABLE: { start: 0xfea0, end: 0xfeff, ro: true },
      IO: { start: 0xff00, end: 0xff7f, ro: false },
      HRAM: { start: 0xff80, end: 0xfffe, ro: false },
      INTERUPT_ENABLE: { start: 0xffff, end: 0xffff, ro: false }
    }
    this.innit();
  }
  _lookup(address) {
    return Object.keys(this.memory_map).find(memory_name => {
      const memory_info = this.memory_map[memory_name];
      return address >= memory_info.start && address <= memory_info.end;
    });
  }
  read(address) {
    const memory_name = this._lookup(address);
    return this[memory_name][address][0];
  }
  write(address, value) {
    const memory_name = this._lookup(address);
    if (!this.memory_map[memory_name].ro) {
      this[memory_name][address][0] = value;
    } else {
      console.error("READONLY: ", memory_name, address, value);
    }
  }
  innit() {
    Object.keys(this.memory_map).forEach(memory_name => {
      const memory_info = this.memory_map[memory_name];
      this[memory_name] = {};
      for (let index = memory_info.start; index <= memory_info.end; index++) {
        this[memory_name][index] = new Uint8Array(1);
      }
    })
  }
}