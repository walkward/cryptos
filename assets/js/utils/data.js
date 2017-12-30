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

module.exports = {
  marketData: marketData,
  coins: coins,
  price: price
}
