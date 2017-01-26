const express = require('express');
const socketio = require('socket.io');

var app = express();
var server = app.listen(8080);
var io = socketio(server);

//Yahoo API
var util = require('util');
require('colors');
var _ = require('lodash');
var yahooFinance = require('yahoo-finance');


app.use(express.static('static'));

io.on('connection', (socket) => {


  socket.on('stock_update_request', () => {

    var FIELDS = _.flatten([
      ['s'],
      ['a', 'b'],
      ['c1', 'p2', 't1'],
      ['l', 'l1'],
      ['j1'],
      ['v', 'a2']
    ]);

    var SYMBOL = 'AAPL';

    yahooFinance.snapshot({
      fields: FIELDS,
      symbol: SYMBOL
    }, function (err, snapshot) {
      if (err) { throw err; }


      var resultsStr = JSON.stringify(snapshot, null, 2)
      var resultsObj = JSON.parse(resultsStr)
      console.log(snapshot);
      console.log(util.format('=== %s ===', SYMBOL).cyan);
      console.log(JSON.stringify(snapshot, null, 2));
      console.log(resultsObj.symbol+' Ask: '+resultsObj.ask+' Bid: '+resultsObj.bid)
      socket.emit('update_stock', resultsStr);


    });
  });
});
