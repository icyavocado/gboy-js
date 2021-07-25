import Gameboy from "./gameboy";

const canvas = document.getElementById("gameboy-canvas");
const gameboy = new Gameboy(canvas);

gameboy.run();
