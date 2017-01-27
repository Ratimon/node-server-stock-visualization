const express = require('express');
const socketio = require('socket.io');

var port = process.env.PORT || 8080;

var app = express();
var server = app.listen(port);
var io = socketio(server);

//Yahoo API
var util = require('util');
require('colors');
var _ = require('lodash');
var yahooFinance = require('yahoo-finance');


app.use(express.static('static'));

io.on('connection', (socket) => {


  socket.on('stock_update_request', (data) => {
    // debugger;
    var FIELDS = _.flatten([
      ['s'],
      ['a', 'b'],
      ['c1', 'p2', 't1', 'd1'],
      ['l1'],
      ['j1'],
      ['v', 'a2']
    ]);
    var results = JSON.parse(data)

    var SYMBOLS =  results.arr_store
    // [
    //   'AAPL'
    //   // 'GOOG',
    //   // 'MSFT'
    //
    // ];

    yahooFinance.snapshot({
      fields: FIELDS,
      symbols: SYMBOLS
    }, function (err, snapshot) {
      if (err) { throw err; }


      var resultsStr = JSON.stringify(snapshot, null, 2)
      // var resultsObj = JSON.parse(resultsStr)
      console.log(util.format('=== %s ===', SYMBOLS).cyan);
      console.log(JSON.stringify(snapshot, null, 2));

      socket.emit('update_stock', resultsStr);
    });
  });
});
