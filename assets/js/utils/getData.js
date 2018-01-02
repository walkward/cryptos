import _ from 'lodash'

function marketData (handleData) {
  $.ajax({
    url: 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    }
  })
}

function coin (ticker, handleData) {
  $.ajax({
    url: 'https://api.coinmarketcap.com/v1/ticker/' + ticker + '/?convert=USD',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    }
  })
}

function price (symbols, handleData) {
  symbols = _.join(symbols, ',')
  $.ajax({
    url: 'https://min-api.cryptocompare.com/data/price?fsym=' + symbols + '&tsyms=USD',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    }
  })
}

function usd (symbols, handleData) {
  symbols = _.join(symbols, ',')
  $.ajax({
    url: 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=' + symbols,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    }
  })
}

function research (id, handleData) {
  $.ajax({
    'async': true,
    'crossDomain': true,
    'url': 'https://api.graph.cool/simple/v1/cjbwdrpss0okf0154rwt7noqf',
    'method': 'POST',
    'headers': {
      'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTQ4MjQ1ODMsImNsaWVudElkIjoiY2o2aW1sczYxM215ajAxNjJ6Ym54Z3NnaCIsInByb2plY3RJZCI6ImNqYndkcnBzczBva2YwMTU0cnd0N25vcWYiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqYndmZzFrNDBxaGgwMTU0eHFubjI5d3kifQ.6i-0oVbbkrRsXj7-msBiMiIRrSRc4JgLeeYBRSFuAAo',
      'content-type': 'application/json'
    },
    'processData': false,
    'data': '{"query":"{Coin(id:\\"' + id + '\\"){name ticker icoDate blockUrl floorPrice hypeRating mgmtRating wPRating mgmtReview productReview productRating loyaltyRating devRating devQty teamQty newsEvents targetPrice url wPReview wPUrl peers recommendation maxAllocation githubUrl}}"}'
  }).done(function (data) {
    handleData(data)
  })
}

module.exports = {
  marketData: marketData,
  price: price,
  research: research,
  usd: usd,
  coin: coin
}
