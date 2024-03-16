// Write a test to check if the app is running using mocha
var assert = require("assert");

// var PPU = require('../src/core/ppu/ppu.js')
var PPU = require("../src/core/ppu/ppu.js");

describe("PPU", function () {
  describe("draw", function () {
    it("should render", function () {
      var ppu = new PPU();
      ppu.draw();
    });
  });
});

describe("PPU render", function () {
  describe("draw", function () {
    it("should render", function () {
      var ppu = new PPU();
      assert.equal(ppu.draw(), true);
    });
  });
});
