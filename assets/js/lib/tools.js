import rivetsConfig from '../vendor/rivetsConfig'
import data from '../utils/data'

export default function () {
  const settings = {
    selectors: {
      tools: '#tools'
    }
  }

  rivetsConfig()

  data.price(['BTC'], (data) => {
    cryptos.price.btc = data.USD
    let input = { sats: 100 }

    rivets.bind($(settings.selectors.tools), {
      coin: cryptos.price,
      input: input
    })
  })
}
