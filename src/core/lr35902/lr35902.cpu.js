const logger = require("../../logger.js").default;

export default class LR35902 {
  constructor() {
    this._a;
    this._f;
    this._b;
    this._c;
    this._d;
    this._e;
    this._h;
    this._l;

    this._pc;
    this._sp;

    this.regs = {
      a: this._a,
      f: this._f,
      b: this._b,
      c: this._c,
      d: this._d,
      e: this._e,
      h: this._h,
      l: this._l,
      pc: this._pc,
      sp: this._sp
    }

    this.cur_opcode;

    this.cur_instr;
    this.mem_dest;
    this.halted = false;
    this.stepping = false;
  }

  get a() { return this._a }
  set a(value) { this._a = utils.uint8_t(value); }
  get f() { return this._f; }
  set f(value) { this._f = utils.uint8_t(value); }
  get b() { return this._b; }
  set b(value) { this._b = utils.uint8_t(value); }
  get c() { return this._c; }
  set c(value) { this._c = utils.uint8_t(value); }
  get d() { return this._d; }
  set d(value) { this._d = utils.uint8_t(value); }
  get e() { return this._e; }
  set e(value) { this._e = utils.uint8_t(value); }
  get h() { return this._h; }
  set h(value) { this._h = utils.uint8_t(value); }
  get l() { return this._l; }
  set l(value) { this._l = utils.uint8_t(value); }

  get pc() { return this._pc; }
  set pc(value) { this._pc = utils.uint16_t(value); }
  get sp() { return this._sp; }
  set sp(value) { this._sp = utils.uint16_t(value); }

  init() {

  }

  get step() {
    logger.info("CPU not yet implemented");
    return false;
  }
}
