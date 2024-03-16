import LR35902 from './core/lr35902/lr35902.cpu'
import PictureProcessingUnit from './core/ppu/ppu'
import RAM from './core/ram/ram'

export default class Gameboy {
  constructor(canvas) {
    this.memory = new RAM()
    this.DMG_CPU = new LR35902(this.memory)
    this.PPU = new PictureProcessingUnit(canvas)
  }
  start() {
    while (!this.DMG_CPU.halt) {
      const op = this.fetchOp()
      const op_func = this.decode(op)
      this.execute(op_func)
    }
  }
  fetchOp() {
    return this.memory.read(this.DMG_CPU.pc++)
  }
  decode(op) {
    return this.DMG_CPU.OP_CODES.ops[op]
  }
  execute(op_func) {
    op_func()
  }
}
