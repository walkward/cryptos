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
  news: news
}
