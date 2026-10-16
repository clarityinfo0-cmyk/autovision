// Audio synthesizer disabled per user request (silent mode)

export const soundManager = {
  isEnabled: false,
  toggleSound() {
    return false;
  },
  setSound(_enabled: boolean) {},
  playEngineStartup() {},
  playClick() {},
  playSuccess() {}
};
