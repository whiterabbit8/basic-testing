import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const cash = 100;
    const account = new BankAccount(cash);
    expect(account.getBalance()).toBe(cash);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const cash = 100;
    const account = new BankAccount(cash);
    expect(() => account.withdraw(cash + 100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const cash = 100;
    const account = new BankAccount(cash);
    const anotherAccount = new BankAccount(cash);
    expect(() => account.transfer(cash + 100, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const cash = 100;
    const account = new BankAccount(cash);
    expect(() => account.transfer(cash, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const cash = 100;
    const account = new BankAccount(cash);
    account.deposit(cash);
    expect(account.getBalance()).toBe(cash + cash);
  });

  test('should withdraw money', () => {
    const cash = 100;
    const account = new BankAccount(cash);
    account.withdraw(cash - cash / 2);
    expect(account.getBalance()).toBe(cash / 2);
  });

  test('should transfer money', () => {
    const cash = 100;
    const account = new BankAccount(cash);
    const anotherAccount = new BankAccount(cash);
    account.transfer(cash, anotherAccount);
    expect(anotherAccount.getBalance()).toBe(cash + cash);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomValue = 42;
    const account = getBankAccount(100);
    jest.spyOn(lodash, 'random').mockReturnValue(randomValue);
    const balance = await account.fetchBalance();
    expect(balance).toBe(randomValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const randomValue = 42;
    const account = getBankAccount(100);
    jest.spyOn(lodash, 'random').mockReturnValue(randomValue);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(randomValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const randomValue = 0;
    const account = getBankAccount(100);
    jest.spyOn(lodash, 'random').mockReturnValue(randomValue);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
