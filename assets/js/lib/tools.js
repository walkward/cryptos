import Big from 'big.js'
import _ from 'lodash'

export default function () {
  let input = {}
  input.sats = 100

  let btc = _.filter(cryptos.marketData, { 'id': 'bitcoin' })[0]

  rivets.formatters.satsToUsd = function (value) {
    let satDecimal = Big(0.00000001)
    let btcToUsd = Big(btc.price_usd)
    value = Big(value)
    return '$' + value.times(satDecimal).times(btcToUsd)
  }

  rivets.bind($('#tools'), {
    coin: cryptos.marketData,
    input: input
  })
}
