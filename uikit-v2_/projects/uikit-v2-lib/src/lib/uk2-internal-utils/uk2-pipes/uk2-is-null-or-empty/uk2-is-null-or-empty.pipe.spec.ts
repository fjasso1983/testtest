import { Uk2IsNullOrEmptyPipe } from "./uk2-is-null-or-empty.pipe";

describe('Uk2IsNullOrEmptyPipe', () => {
  const pipe = new Uk2IsNullOrEmptyPipe();
  it('should return true if value is null', () => {
    expect(pipe.transform(null)).toBe(true);
  });
  it('should return true if value is undefined', () => {
    expect(pipe.transform(undefined)).toBe(true);
  });
  it('should return true if value is empty string', () => {
    expect(pipe.transform('')).toBe(true);
  });
  it('should return false if value is 0', () => {
    expect(pipe.transform(0)).toBe(false);
  });
  it('should return false if value is "test"', () => {
    expect(pipe.transform('test')).toBe(false);
  });
});
