import Promise from 'promise-polyfill'
import Big from 'big.js'

export default function () {
  return new Promise((resolve, reject) => {
    // Normal currenty formatting
    rivets.formatters.currency = function (value) {
      return '$' + Big(value).toFixed(4)
    }

    // Removes cents and add commas
    rivets.formatters.number = function (value) {
      value = Math.round(Big(value))
      return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
