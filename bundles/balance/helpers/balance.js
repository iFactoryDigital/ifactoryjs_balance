
// require dependencies
const money  = require('money-math');
const colors = require('colors');
const Helper = require('helper');

// require models
const Entry = model('balanceEntry');

/**
 * build balance helper
 */
class BalanceHelper extends Helper {
  /**
   * construct balance helper
   */
  constructor() {
    // run super
    super();

    // bind methods
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);

    // bind private methods
    this._record = this._record.bind(this);
  }

  /**
   * add balance to account
   *
   * @param {account} Account
   * @param {Int}     amount
   *
   * @returns {Promise}
   */
  async add(user, amount, payment) {
    // refresh account
    await user.lock();

    // check amount
    if (typeof amount !== 'string') {
      // set amount
      amount = money.floatToAmount(amount);
    }

    // add money to accounts account
    let current = user.get('balance') || 0;

    // check amount
    if (typeof current !== 'string') {
      // set amount
      current = money.floatToAmount(current);
    }

    // add
    user.set('balance', money.add(current, amount));

    // save account
    await user.save();

    // record
    this._record(user, 'add', `Added ${amount} to ${user.get('_id').toString()}`, true, amount, user.get('balance'), payment);

    // unlock
    user.unlock();

    // return true
    return true;
  }

  /**
   * add balance to account
   *
   * @param {account} Account
   * @param {Int}     amount
   *
   * @returns {Promise}
   */
  async subtract(user, amount, payment) {
    // refresh account
    await user.lock();

    // check amount
    if (typeof amount !== 'string') {
      // set amount
      amount = money.floatToAmount(amount);
    }

    // add money to accounts account
    let current = user.get('balance') || 0;

    // check amount
    if (typeof current !== 'string') {
      // set amount
      current = money.floatToAmount(current);
    }

    // add
    user.set('balance', money.subtract(current, amount));

    // record
    this._record(user, 'subtract', `Subtracted ${amount} from ${user.get('_id').toString()}`, true, amount, user.get('balance'), payment);

    // save account
    await user.save();

    // unlock
    user.unlock();

    // return true
    return true;
  }

  /**
   * logs balance transaction
   *
   * @param  {Account}  account
   * @param  {String}   way
   * @param  {string}   message
   * @param  {Boolean}  success
   * @param  {String}   amount
   * @param  {String}   balance
   */
  async _record(user, way, message, success, amount, balance, payment) {
    // log with log function
    this.logger.log((success ? 'info' : 'error'), ` [${colors.green(user.get('_id').toString())}] ${message}`, {
      class : 'balance',
    });

    // create record
    const entry = new Entry({
      way,
      user,
      amount,
      payment,
      message,
      success,
      balance,
    });

    // save entry
    await entry.save();
  }
}

/**
 * export new Balance Helper class
 *
 * @return {BalanceHelper}
 */
module.exports = new BalanceHelper();
