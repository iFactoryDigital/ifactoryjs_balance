# EdenJS - Balance
[![TravisCI](https://travis-ci.com/eden-js/balance.svg?branch=master)](https://travis-ci.com/eden-js/balance)
[![Issues](https://img.shields.io/github/issues/eden-js/balance.svg)](https://github.com/eden-js/balance/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eden-js/balance)
[![Awesome](https://img.shields.io/badge/awesome-true-green.svg)](https://github.com/eden-js/balance)
[![Discord](https://img.shields.io/discord/583845970433933312.svg)](https://discord.gg/5u3f3up)

User Balance base logic component for [EdenJS](https://github.com/edenjs-cli)

`@edenjs/balance` creates user balance logic, users will have the field `balance` which will hold an on-site balance.

## Setup

### Install

```
npm i --save @edenjs/balance
```

### Configure

No configuration is required for this module

## Models


### `BalanceEntry` _[Usage](https://github.com/eden-js/balance/blob/master/bundles/balance/models/balanceEntry.js)_

BalanceEntry model consits of a single entry for each change on a users balance.

#### Example

```js
// load model
const BalanceEntry = model('balanceEntry');

// get first entry
const entry = await BalanceEntry.findOne();

// data used in frontend
const data = await entry.sanitise();
```

## Hooks

### `balance.change` _[Usage](https://github.com/eden-js/audit/blob/master/bundles/audit/daemons/audit.js#L60)_


Balance change hook allows us to prevent/change a balance transaction on a user based on parameters.

#### Example

```js
this.eden.pre('balance.change', (data) => {
  // extract variables
  const { user, direction, amount, payment, current } = data;

  // prevent balance change by setting prevent : true
  data.prevent = true;
});
```

## Helpers

### `balance` _[Usage](https://github.com/eden-js/audit/blob/master/bundles/balance/helpers/balance.js)_

Balance helper applies balance changes to users automatically.

#### Example

```js
// user model
const User = model('user');

// balance helper
const balanceHelper = helper('balance');
const balanceUser = await User.findOne();

const didAdd = await balanceHelper.add(balanceUser, 10); // add 10 to users account
const didSubtract = await balanceHelper.subtract(balanceUser, 10); // subtract 10 from users account
```