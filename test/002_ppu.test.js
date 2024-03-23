// Write a test to check if the app is running using mocha
var assert = require("assert");

var RAM = require('../src/core/ram/ram.js').default;
var PictureProcessingUnit = require("../src/core/ppu/ppu.js").default;

describe("PictureProcessingUnit", function() {
  describe("pixel array", function() {
    it("should return a pixel array", function() {
      const ppu = new PictureProcessingUnit();
      assert.equal(Array.isArray(ppu._pixels), true);
      assert.equal(ppu._pixels.length / ppu.width, ppu.height);
      assert.equal(ppu._pixels.length / ppu.height, ppu.width);
    });
  });

  describe("text_out", function() {
    it("should return a string with spaces", function() {
      const ppu = new PictureProcessingUnit();
      assert.equal(typeof ppu.text_out(), "string");
      const screen = (ppu.shades[0x00].repeat(ppu.width) + "\n").repeat(ppu.height - 1) + ppu.shades[0x00].repeat(ppu.width);
      assert.equal(ppu.text_out(), screen);
    });

    it("should return a string with one pixel of a different color", function() {
      const ppu = new PictureProcessingUnit();
      ppu._pixels[0x00] = 0x01;
      const screen = (ppu.shades[0x01] + (ppu.shades[0x00]).repeat(ppu.width - 1) + '\n' + (ppu.shades[0x00].repeat(ppu.width) + "\n").repeat(ppu.height - 2) + ppu.shades[0x00].repeat(ppu.width));
      assert.equal(ppu.text_out(), screen);
    });

    it("should return the right pixel index", function() {
      const ppu = new PictureProcessingUnit();
      assert.equal(ppu.getPixelIndex(0, 0, 0), 0);
      assert.equal(ppu.getPixelIndex(0, 0, 1), 1);
      assert.equal(ppu.getPixelIndex(0, 3, 3), 483);
      assert.equal(ppu.getPixelIndex(0, 7, 7), 1127);
    });

    it("should render a gameboy screen", function() {

      const ram = new RAM();

      ram.write(0x8000, 0x3C);
      ram.write(0x8001, 0x7E); // 0x3C7E

      ram.write(0x8002, 0x42);
      ram.write(0x8003, 0x42);

      ram.write(0x8004, 0x42);
      ram.write(0x8005, 0x42);

      ram.write(0x8006, 0x42);
      ram.write(0x8007, 0x42);

      ram.write(0x8008, 0x7E);
      ram.write(0x8009, 0x5E);

      ram.write(0x800A, 0x7E);
      ram.write(0x800B, 0x0A);

      ram.write(0x800C, 0x7C);
      ram.write(0x800D, 0x56);

      ram.write(0x800E, 0x38);
      ram.write(0x800F, 0x7C);

      const ppu = new PictureProcessingUnit(ram, 8, 8);

      ppu.text_out(true);
    });
  });

});
