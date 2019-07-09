
// require local dependencies
const Model  = require('model');

/**
 * create account model
 */
class BalanceEntry extends Model {
  /**
   * construct audit model
   */
  constructor(...args) {
    // run super
    super(...args);

    // bind methods
    this.sanitise = this.sanitise.bind(this);
  }

  /**
   * sanitises acl class
   *
   * @return {*}
   */
  async sanitise() {
    // return object
    const sanitised = {
      id         : this.get('_id') ? this.get('_id').toString() : null,
      way        : this.get('way'),
      amount     : this.get('amount'),
      message    : this.get('message'),
      success    : this.get('success'),
      balance    : this.get('balance'),
      payment    : await this.get('payment') ? await (await this.get('payment')).sanitise() : null,
      created_at : this.get('created_at'),
      updated_at : this.get('updated_at'),
    };

    // await hook
    await this.eden.hook('account.entry.sanitise', {
      sanitised,

      entry : this,
    });

    // return sanitised
    return sanitised;
  }
}

/**
 * export Account Entry model
 *
 * @type {AccountEntry}
 */
module.exports = BalanceEntry;
