class Bank {
  constructor(balance) {
    this.balance = balance;
    this.n = balance.length;
  }

  valid(account) {
    return account >= 1 && account <= this.n;
  }

  transfer(account1, account2, money) {
    if (!this.valid(account1) || !this.valid(account2) || this.balance[account1 - 1] < money) return false;
    this.balance[account1 - 1] -= money;
    this.balance[account2 - 1] += money;
    return true;
  }

  deposit(account, money) {
    if (!this.valid(account)) return false;
    this.balance[account - 1] += money;
    return true;
  }

  withdraw(account, money) {
    if (!this.valid(account) || this.balance[account - 1] < money) return false;
    this.balance[account - 1] -= money;
    return true;
  }
}
