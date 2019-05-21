
// require dependencies
const money  = require('money-math');
const colors = require('colors');
const Helper = require('helper');

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
    this._log = this._log.bind(this);
  }

  /**
   * add balance to user
   *
   * @param {user} User
   * @param {Int}  amount
   *
   * @returns {Promise}
   */
  async add(user, amount) {
    // refresh user
    await user.lock();

    // check amount
    if (typeof amount !== 'string') {
      // set amount
      amount = money.floatToAmount(amount);
    }

    // add money to users account
    let current = user.get('balance') || 0;

    // check amount
    if (typeof current !== 'string') {
      // set amount
      current = money.floatToAmount(current);
    }

    // add
    user.set('balance', money.add(current, amount));

    // save user
    await user.save();

    // unlock
    user.unlock();

    // return true
    return true;
  }

  /**
   * add balance to user
   *
   * @param {user} User
   * @param {Int}  amount
   *
   * @returns {Promise}
   */
  async subtract(user, amount) {
    // refresh user
    await user.lock();

    // check amount
    if (typeof amount !== 'string') {
      // set amount
      amount = money.floatToAmount(amount);
    }

    // add money to users account
    let current = user.get('balance') || 0;

    // check amount
    if (typeof current !== 'string') {
      // set amount
      current = money.floatToAmount(current);
    }

    console.log(current, amount);

    // return false
    if (money.isNegative(money.subtract(current, amount))) {
      // unlock user
      user.unlock();

      // return false
      return false;
    }

    // add
    user.set('balance', money.subtract(current, amount));

    // save user
    await user.save();

    // unlock
    user.unlock();

    // return true
    return true;
  }

  /**
   * logs balance transaction
   *
   * @param  {user}     User
   * @param  {String}   way
   * @param  {string}   message
   * @param  {Boolean}  success
   */
  _log(user, way, message, success) {
    // log with log function
    this.logger.log((success ? 'info' : 'error'), ` [${colors.green(user.get('username'))}] ${message}`, {
      class : 'balance',
    });
  }
}

/**
 * export new Balance Helper class
 *
 * @return {BalanceHelper}
 */
module.exports = new BalanceHelper();
