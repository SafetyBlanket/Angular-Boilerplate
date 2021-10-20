import { shouldLog, createLogTimestamp, printLog } from './logger.model';

describe('Logging utilities', () => {
  describe('ShouldLog()', () => {
    it('Should be a function', () => expect(typeof shouldLog).toBe('function'));
    it('Should log for all ranges less than environment level (2nd argument)', () => {
      const range: number = 5;
      const env: number = 4;
      [...Array(range).keys()].forEach((idx: number) =>
        expect(shouldLog(idx, env)).toBeTrue()
      );
    });
    it('Should be true when log level is the same as environment level', () =>
      expect(shouldLog(5, 5)).toBeTrue());
    it("Should not log a log's level is greater than the environment level", () =>
      expect(shouldLog(5, 3)).toBeFalse());
  });
  describe('createLogTimestamp()', () => {
    it('Should be a function', () =>
      expect(typeof createLogTimestamp).toBe('function'));
    it('Should take a number', () =>
      expect(typeof createLogTimestamp(Date.now())).toBe('string'));
    it('Should take a string', () =>
      expect(typeof createLogTimestamp(String(Date.now()))).toBe('string'));
  });
  describe('printLog()', () => {
    it('Should be a function', () => expect(typeof printLog).toBe('function'));
  });
});
