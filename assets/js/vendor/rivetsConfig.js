import Promise from 'promise-polyfill'
import Big from 'big.js'
import _ from 'lodash'

export default function () {
  return new Promise((resolve, reject) => {
    // Create research Url
    rivets.formatters.researchUrl = function (value, baseUrl) {
      return baseUrl + '/research/?id=' + value
    }

    // Color reccomendation
    rivets.formatters.recommendation = function (value) {
      if (value === 'Buy') return '<span class="status buy"></span>'
      else if (value === 'Hold') return '<span class="status hold"></span>'
      else return '<span class="status sell"></span>'
    }

    // Create sum
    rivets.formatters.sum = function (value, added) {
      if (typeof value !== 'number' || typeof added !== 'number') return 0

      value = Big(value)
      added = Big(added)
      return value.plus(added)
    }

    // Calculate Value of Holdings
    rivets.formatters.calcValue = function (value, ticker) {
      // Do not calculate value if we don't have the ticker price.
      if (typeof cryptos.researchPrices[ticker] === 'undefined') return 0
      let base = new Big(1)
      let price = new Big(cryptos.researchPrices[ticker])
      value = value !== null ? new Big(value) : Big(0)
      return '$' + base.div(price).times(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    // Multiply numbers
    rivets.formatters.multiply = function (value, multiplier) {
      if (typeof value !== 'number' || typeof multiplier !== 'number') return 0

      value = Big(value)
      multiplier = Big(multiplier)
      return multiplier.times(value)
    }

    // Divide numbers
    rivets.formatters.divide = function (value, divisor) {
      if (typeof value !== 'number' || typeof divisor !== 'number') return 0

      value = Big(value)
      divisor = Big(divisor)
      return divisor.div(value)
    }

    // Create percentage
    rivets.formatters.potential = function (value, divisor) {
      if (typeof value !== 'number' || typeof divisor !== 'number') return 0

      value = Big(value)
      divisor = Big(divisor)
      return divisor.div(value).times(100).minus(100).toFixed(2) + '%'
    }

    // Formate Date
    rivets.formatters.date = function (value) {
      if (typeof value !== 'number') return 0

      return value.slice(0, 10)
    }

    // Truncate text
    rivets.formatters.truncate = function (value, chars) {
      return _.truncate(value, {'length': chars})
    }

    // Format Textarea
    rivets.formatters.textarea = function (value) {
      if (/<br \/>?/g.test(value)) return value.replace(/<br \/>?/g, '\n')
      else return value
    }

    // Check if this is a valid url
    rivets.formatters.isUrl = function (value) {
      return /^(http)/.test(value)
    }

    // Normal currenty formatting
    rivets.formatters.currency = function (value) {
      if (typeof value !== 'number') return 0

      return '$' + Big(value).toFixed(4)
    }

    // Removes cents and add commas
    rivets.formatters.number = function (value) {
      if (typeof value !== 'number') return 0

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
      if (typeof value !== 'number') return 0

      let satDecimal = Big(0.00000001)
      let btcToUsd = Big(cryptos.price.btc)
      value = Big(value)
      return '$' + value.times(satDecimal).times(btcToUsd)
    }
  })
}
