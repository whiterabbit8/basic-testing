import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 42, b: 28, action: Action.Add})).toBe(70);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 42, b: 28, action: Action.Subtract})).toBe(14);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 7, b: 6, action: Action.Multiply})).toBe(42);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 42, b: 7, action: Action.Divide})).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 2, b: 4, action: Action.Exponentiate})).toBe(16);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 42, b: 7, action: Action})).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: '42', b: 7, action: Action.Add})).toBe(null);
  });
});
