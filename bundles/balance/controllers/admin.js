
/**
 * Created by Awesome on 1/30/2016.
 */

// Require dependencies
const Controller = require('controller');

// require helpers
const balanceHelper = helper('balance');

/**
 * Build customer controller
 *
 * @acl   admin
 * @fail  next
 * @mount /admin/sales/balance
 */
class BalanceAdminController extends Controller {
  /**
   * Construct user customerAdminController controller
   */
  constructor() {
    // Run super
    super();
  }

  // ////////////////////////////////////////////////////////////////////////////
  //
  //  HOOK METHODS
  //
  // ////////////////////////////////////////////////////////////////////////////

  /**
   * Hook to add action
   *
   * @pre payment.init
   */
  async methodHook(order, action) {
    // check action
    if (action.type !== 'payment') return;

    // get order user
    const user = await order.get('user');

    // return sanitised data
    action.data.methods.push({
      type : 'balance',
      data : {
        balance : user ? user.get('balance') : 0,
      },
      priority : 2,
    });
  }

  /**
   * Pay using Payment Method
   *
   * @param {Payment} payment
   *
   * @pre    payment.pay
   * @return {Promise}
   */
  async payHook(payment) {
    // Check super
    if (payment.get('method.type') !== 'balance') return;

    // subtract
    if (await balanceHelper.subtract(await payment.get('user'), payment.get('amount'), payment)) {
      // set complete
      payment.set('complete', true);
    }
  }

  /**
   * add account to order sanitise logic
   *
   * @param {Object} *
   *
   * @pre    order.sanitise
   * @return {Promise}
   */
  async orderSanitiseHook({ order, sanitised }) {
    // get order user
    const user = await order.get('user');

    // check account and customer
    if (user) {
      // set customer and account
      sanitised.actions.payment.balance = user.get('balance') || 0;
    }
  }

  /**
   * add account to order sanitise logic
   *
   * @param {Object} *
   *
   * @pre    user.sanitise
   * @return {Promise}
   */
  async userSanitiseHook({ user, sanitised }) {
    // set customer and account
    sanitised.balance = user.get('balance') || 0;
  }
}

/**
 * export balance controller
 *
 * @type {BalanceAdminController}
 */
exports = module.exports = BalanceAdminController;
