const RAM8K = require("../ram/ram.js");

export default class PictureProcessingUnit {
  constructor(canvas) {
    this._SCALE = 5;
    this.width = 160;
    this.height = 144;
    this.PIXEL_SIZE = 1 * this._SCALE;

    this._canvasInit(canvas);
    this._pixelsInit();

    this.VRAM = new RAM8K();
    this.shades = {
      0x00: "#a9a9a9",
      0x01: "#778899",
      0x02: "#708090",
      0x03: "#696969",
    };
  }
  draw() {
    this.ctx.canvas.width = this.width * this._SCALE;
    this.ctx.canvas.height = this.height * this._SCALE;
    this.pixels.forEach((row, rowIndex) => {
      row.forEach((column, colIndex) => {
        const pixelColor = this.shades[this.pixels[rowIndex][colIndex]];
        this.drawBorder(colIndex, rowIndex, "#8c8c8c", 1);
        this.drawBorder(colIndex, rowIndex, pixelColor, 0);
      });
    });
  }
  drawBorder(xPos, yPos, color, thickness = 0) {
    const width = this.PIXEL_SIZE;
    const height = this.PIXEL_SIZE;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      xPos * this.PIXEL_SIZE - thickness,
      yPos * this.PIXEL_SIZE - thickness,
      width + thickness * 2,
      height + thickness * 2,
    );
  }
  _pixelsInit() {
    this.pixels = new Array(this.height)
      .fill(0)
      .map((row) => (row = new Array(this.width).fill(0)));
  }
  _canvasInit(canvas) {
    // canvas init
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    canvas.style.height = `${this.height * this._SCALE}px`;
    canvas.style.width = `${this.width * this._SCALE}px`;
  }
}
