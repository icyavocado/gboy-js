const GameBoy = require('../src/gameboy.js').default;
const path = require('path');
describe('GameBoy', () => {
  it('should run the game', () => {
    const gameBoy = new GameBoy();
    gameBoy.run(path.resolve("roms/tetris.gb"));
  });
});
