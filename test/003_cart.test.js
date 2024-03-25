var assert = require("assert");
var path = require("path");
var Cart = require("../src/core/cartridge.js").default;

describe("Cartridge Loading", function() {
  it("Cart should load tetris rom", async function() {
    var cart = new Cart();
    await cart.load(path.resolve("roms/tetris.gb"));
    assert.equal(cart.title, 'TETRIS000000000', "Title is not TETRIS000000000");
    assert.equal(cart.manufacturerCode, '\x00\x00\x00\x00', "Manufacturer code is not 0x00000000");
    assert.equal(cart.romSize, 0x0, "ROM size is not 32kb: 0x0 option");
    assert.equal(cart.checksumPassed, true, "Checksum failed");
    cart.content
  });
});

