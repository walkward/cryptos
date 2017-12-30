import Promise from 'promise-polyfill'

export default function () {
  return new Promise((resolve, reject) => {
    cryptos.data.marketData((data) => {
      cryptos.marketData = data
      resolve('success')
    })
  })
}
