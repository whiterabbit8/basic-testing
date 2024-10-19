// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 42, b: 28, action: Action.Add})).toBe(42 + 28);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 42, b: 28, action: Action.Subtract})).toBe(42 - 28);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 7, b: 6, action: Action.Multiply})).toBe(7 * 6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 42, b: 7, action: Action.Divide})).toBe(42 / 7);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 7, b: 6, action: Action.Exponentiate})).toBe(Math.pow(7, 6));
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 42, b: 7, action: Action})).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: '42', b: 7, action: Action.Add})).toBe(null);
  });
});
