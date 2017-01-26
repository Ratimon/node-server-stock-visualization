var util = require('util');

require('colors');

var _ = require('lodash');
var yahooFinance = require('yahoo-finance');

var FIELDS = _.flatten([
  ['s'],
  ['a', 'b'],
  ['c1', 'p2', 't1'],
  ['l'],
  ['j1'],
  ['v', 'a2']
]);

var SYMBOLS = [
  'AAPL',
  'GOOG',
  'MSFT',
  'IBM'

];

yahooFinance.snapshot({
  fields: FIELDS,
  symbols: SYMBOLS
}, function (err, snapshot) {
  if (err) { throw err; }
  console.log(util.format('=== %s ===', SYMBOLS).cyan);
  console.log(JSON.stringify(snapshot, null, 2));
  // var results = JSON.parse

  // _.each(result, function (snapshot, symbol) {
  //   console.log(util.format('=== %s ===', symbol).cyan);
  //   console.log(JSON.stringify(snapshot, null, 2));
  // });
});
