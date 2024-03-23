export default class PictureProcessingUnit {
  constructor(vram, width = 160, height = 144) {
    this.width = width;
    this.height = height;

    this._pixels = new Array(this.height * this.width).fill(0);

    this.shades = ["⬛️", "🟦", "🟩", "🟧"];

    this.vram = vram;

    if (this.vram) this.populatePixels();

  }

  text_out(print = false) {
    let output = "";
    const pixelLength = this._pixels.length;
    this._pixels.forEach((pixel, index) => {
      const nextLine = index % this.width;
      if (index > 0 && index < pixelLength && nextLine == 0) output += "\n";
      output += this.shades[pixel];
    });
    return output;
  }

  getPixelIndex(tileId, row, col) {
    return col + row * this.width + tileId * 8;
  }

  populatePixels() {
    // 0x8000 - 0x87FF
    // Block 1;
    let memoryAddress = 0x8000;
    for (let tileId = 0; tileId < 128; tileId++) {
      for (let row = 0; row < 8; row++) {
        let first_byte = this.vram.read(memoryAddress++);
        let second_byte = this.vram.read(memoryAddress++);
        for (let col = 0; col < 8; col++) {
          let bit1 = (first_byte >> (7 - col)) & 1;
          let bit2 = (second_byte >> (7 - col)) & 1;
          let shade = (bit2 << 1) | bit1;
          this._pixels[this.getPixelIndex(tileId, row, col)] = shade;
        }
      }
    }
  }
}
