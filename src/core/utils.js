export default {
  uint8_t(value) {
    return value & 0xFF;
  },
  uint16_t(value) {
    return value & 0xFFFF;
  },
  sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
  }
}
