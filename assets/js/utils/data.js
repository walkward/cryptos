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

function coins (handleData) {
  $.ajax({
    url: 'https://min-api.cryptocompare.com/data/all/coinlist',
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
    'data': '{"query":"{Coin(id:\\"' + id + '\\"){name ticker icoDate blockUrl floorPrice hypeRating mgmtRating wPRating mgmtReview productReview productRating loyaltyRating devRating devQty teamQty newsEvents targetPrice url wPReview wPUrl peers}}"}'
  }).done(function (data) {
    handleData(data)
  })
}

function saveResearch (research, handleData) {
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
    'data': research
  }).done(function (data) {
    handleData(data)
  })
}

function news (query, page, handleData) {
  query = encodeURI(query)
  let newsTo = new Date()
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 3)
  let newsFrom = new Date(0)
  newsFrom.setUTCMilliseconds(yesterday)

  $.ajax({
    url: 'https://newsapi.org/v2/everything?q=' + query + '&page=' + page + '&from=' + newsFrom.toJSON().slice(0, 10) + '&to=' + newsTo.toJSON().slice(0, 10) + '&language=en&sortBy=relevancy&apiKey=27639e8b441c420d8c14cc10398f6eb5',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      handleData(data)
    }
  })
}

module.exports = {
  marketData: marketData,
  coins: coins,
  price: price,
  news: news,
  research: research,
  saveResearch: saveResearch,
  usd: usd
}
