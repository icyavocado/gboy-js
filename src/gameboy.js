const logger = require("./logger.js").default;
const LR35902 = require("./core/lr35902/lr35902.cpu.js").default;
const Cartridge = require("./core/cartridge.js").default;
const utils = require("./core/utils.js");

export default class GameBoy {
  constructor() {
    this.paused = false;
    this.running = false;
    this.ticks = 0;

    this.cpu = new LR35902();
  }

  async run(romPath) {
    if (!romPath) {
      logger.error("No ROM path provided");
      return -1;
    }

    const cartridge = new Cartridge();
    if (!cartridge.load(romPath)) {
      logger.error("Error loading ROM");
      return -2;
    }

    logger.info(`Title: ${cartridge.title}`);
    logger.info(`Manufacturer Code: ${cartridge.manufacturerCode}`);
    logger.info("GameBoy is running...");

    this.cpu.init();

    this.running = true;
    this.paused = false;
    this.ticks = 0;

    while (this.running) {
      if (this.paused) {
        await utils.sleep(10000);
        continue;
      }

      logger.info(this.cpu.step);

      if (!this.cpu.step) {
        logger.info("CPU Stopped");
        return -3;
      }

      this.ticks++;
    }
    return 0;
  }
}
