import _ from 'lodash'

function marketData (handleData) {
  $.ajax({
    url: 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    },
    error: function (err) {
      handleData(err)
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
    },
    error: function (err) {
      handleData(err)
    }
  })
}

function price (symbols, handleData) {
  symbols = _.join(symbols, ',')
  $.ajax({
    url: 'https://min-api.cryptocompare.com/data/price?fsym=' + symbols + '&tsyms=USD&extraParams=walksCryptos',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    },
    error: function (err) {
      console.log(err)
      handleData(err)
    }
  })
}

function usd (symbols, handleData) {
  symbols = _.join(symbols, ',')
  $.ajax({
    url: 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=' + symbols + '&extraParams=walksCryptos',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    },
    error: function (err) {
      handleData(err)
    }
  })
}

function research (id, handleData) {
  const apiKey = localStorage.getItem('myKey')
  if (!apiKey) return
  $.ajax({
    'async': true,
    'crossDomain': true,
    'url': 'https://api.graph.cool/simple/v1/cjbwdrpss0okf0154rwt7noqf',
    'method': 'POST',
    'headers': {
      'authorization': apiKey,
      'content-type': 'application/json'
    },
    'processData': false,
    'data': '{"query":"{Coin(id:\\"' + id + '\\"){name ticker icoDate blockUrl floorPrice marketingRating mgmtRating mgmtReview productReview productRating loyaltyRating devRating devQty teamQty newsEvents targetPrice1m targetPrice1q targetPrice1y url verdict wPUrl peers recommendation maxAllocation holdings githubUrl}}"}'
  }).done(function (data) {
    handleData(data)
  })
}

function allResearch (handleData) {
  const apiKey = localStorage.getItem('myKey')
  if (!apiKey) return
  $.ajax({
    'async': true,
    'crossDomain': true,
    'url': 'https://api.graph.cool/simple/v1/cjbwdrpss0okf0154rwt7noqf',
    'method': 'POST',
    'headers': {
      'authorization': apiKey,
      'content-type': 'application/json'
    },
    'processData': false,
    'data': '{"query":"{allCoins{id name ticker loyaltyRating productRating marketingRating mgmtRating devRating targetPrice1m targetPrice1q targetPrice1y floorPrice recommendation holdings}}"}'
  }).done(function (data) {
    handleData(data)
  })
}

module.exports = {
  marketData: marketData,
  price: price,
  research: research,
  usd: usd,
  coin: coin,
  allResearch: allResearch
}
