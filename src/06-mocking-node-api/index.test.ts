import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const time = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, time);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, time);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    const time = 1000;
    expect(mockCallback).not.toHaveBeenCalled();
    doStuffByTimeout(mockCallback, time);
    jest.advanceTimersByTime(time);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const time = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockCallback, time);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const time = 1000;
    const repeats = 3;
    doStuffByInterval(mockCallback, time);
    jest.advanceTimersByTime(time * repeats);
    expect(mockCallback).toHaveBeenCalledTimes(repeats);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(readFileAsynchronously('test.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    const mockContent = Buffer.from(fileContent);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(mockContent);
    await expect(readFileAsynchronously('test.txt')).resolves.toBe(fileContent);
  });
});
