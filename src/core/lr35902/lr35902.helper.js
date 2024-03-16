export default {
  // https://robdor.com/2016/08/10/gameboy-emulator-half-carry-flag/
  isHalfCarry(r1, r2) {
    return (((r1 & 0xf) + (r2 & 0xf)) & 0x10) == 0x10;
  },
  isCarry(r1, r2) {
    return (((r1 & 0xff) + (r2 & 0xff)) & 0x100) == 0x100;
  },
  isHalfBorrow(r1, r2) {},
  isBorrow(r1, r2) {},
  swapNibles(r1) {
    return ((r1 & 0x0f) << 4) | ((r1 & 0xf0) >> 4);
  },
};
