<product-balance-credit>
  <div class="card mb-3">
    <div class="card-header">
      Account Credits
    </div>
    <div class="card-body">
      <input type="hidden" name="balance[type]" value={ this.type } />
      <div class="form-group">
        <label for="credit-value">
          Account Credits
        </label>
        <div class="input-group">
          <div class="input-group-prepend" if={ this.type === 'value' }>
            <span class="input-group-text">$</span>
          </div>
          <input id="credit-value" class="form-control" type="number" step="0.01" name="balance[amount]" value={ (opts.product.balance || {}).amount || 0 } />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              { this.type === 'value' ? this.eden.get('shop.currency') : '%' }
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" data-type="value" onclick={ onType }>
                { this.eden.get('shop.currency') }
              </a>
              <a class="dropdown-item" href="#" data-type="percentage" onclick={ onType }>
                %
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
  <script>
    // set type
    this.type = (opts.product.balance || {}).type || 'value';
    
    /**
     * sets type
     *
     * @param  {Event} e
     */
    onType(e) {
      // on type
      this.type = jQuery(e.target).attr('data-type');
      
      // update
      this.update();
    }
  </script>
</product-balance-credit>
