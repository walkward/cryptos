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
      value = Big(value)
      added = Big(added)
      return value.plus(added)
    }

    // Multiply numbers
    rivets.formatters.multiply = function (value, multiplier) {
      value = Big(value)
      multiplier = Big(multiplier)
      return multiplier.times(value)
    }

    // Divide numbers
    rivets.formatters.divide = function (value, divisor) {
      value = Big(value)
      divisor = Big(divisor)
      return divisor.div(value)
    }

    // Create percentage
    rivets.formatters.potential = function (value, divisor) {
      value = Big(value)
      divisor = Big(divisor)
      return divisor.div(value).times(100).minus(100).toFixed(2) + '%'
    }

    // Formate Date
    rivets.formatters.date = function (value) {
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
