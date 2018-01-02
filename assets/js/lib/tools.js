import rivetsConfig from '../vendor/rivetsConfig'
import getData from '../utils/getData'

export default function () {
  const settings = {
    selectors: {
      usdToEth: '#usdToEth',
      satsToUsd: '#satsToUsd',
      usdToBtc: '#usdToBtc'
    }
  }

  rivetsConfig()

  getData.price(['BTC'], (data) => {
    cryptos.price.btc = data.USD
    let input = { sats: 100 }

    rivets.bind($(settings.selectors.satsToUsd), {
      coin: cryptos.price,
      input: input
    })
  })

  getData.usd(['BTC,ETH'], (data) => {
    cryptos.converters = data
    // let input = { value: 1 }

    rivets.bind($(settings.selectors.usdToEth), {
      converters: cryptos.converters,
      ethInput: 1.00
    })

    rivets.bind($(settings.selectors.usdToBtc), {
      converters: cryptos.converters,
      btcInput: 1.00
    })
  })
}
