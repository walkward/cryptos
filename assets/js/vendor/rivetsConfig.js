import Promise from 'promise-polyfill'
import Big from 'big.js'
import _ from 'lodash'

export default function () {
  return new Promise((resolve, reject) => {
    // Formate Date
    rivets.formatters.date = function (value) {
      return value.slice(0, 10)
    }

    // Truncate text
    rivets.formatters.truncate = function (value, chars) {
      return _.truncate(value, {'length': chars})
    }

    // Check if this is a valid url
    rivets.formatters.isUrl = function (value) {
      return /^(http)/.test(value)
    }

    // Normal currenty formatting
    rivets.formatters.currency = function (value) {
      return '$' + Big(value).toFixed(4)
    }

    // Removes cents and add commas
    rivets.formatters.number = function (value) {
      value = Math.round(Big(value))
      value = '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return value.slice(0, -8) + 'm'
    }

    // Removes cents and add commas
    rivets.formatters.percentage = function (value) {
      return value + '%'
    }

    // Convert Satoshis to USD
    rivets.formatters.satsToUsd = function (value) {
      let satDecimal = Big(0.00000001)
      let btcToUsd = Big(cryptos.price.btc)
      value = Big(value)
      return '$' + value.times(satDecimal).times(btcToUsd)
    }
  })
}
