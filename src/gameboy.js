import LR35902 from "./core/lr35902/lr35902.cpu";
import PictureProcessingUnit from "./core/ppu/ppu";
import RAM8K from "./core/ram/ram";

export default class Gameboy {
  constructor(canvas) {
    this.DMG_CPU = new LR35902();
    this.WRAM = new RAM8K();
    this.PPU = new PictureProcessingUnit(canvas);
  }
  run() {
    this.PPU.draw();
  }
}
