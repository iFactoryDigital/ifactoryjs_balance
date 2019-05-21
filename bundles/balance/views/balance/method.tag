<balance-method>
  <a href="#!" onclick={ onMethod }>
    <div class="row">
      <div class="col-8 d-flex align-items-center">
        <div class="w-100">
          <div class="custom-control custom-radio">
            <input name="payment-method-{ getUUID() }" value="balance" type="radio" class="custom-control-input" checked={ opts.val.type === opts.method.type } />
            <label class="custom-control-label">Use Balance Funds</label>
          </div>
        </div>
      </div>
      <div class="col-4 text-right">
        <b class="text-success h4 m-0">
          <money amount={ opts.action.balance } />
        </b>
      </div>
    </div>
  </a>

  <script>
    // do mixins
    this.mixin('i18n');

    /**
     * on method function
     *
     * @param  {Event} e
     */
    onMethod (e) {
      // prevent default
      e.preventDefault();
      e.stopPropagation();

      // method data
      opts.method.data = {};

      // on ready
      opts.onReady(opts.method);
    }

    /**
     * returns uuid
     *
     * @return {String}
     */
    getUUID () {
      // require uuid
      let uuid = require('uuid');

      // return uuid
      return uuid();
    }

  </script>
</balance-method>
