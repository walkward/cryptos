import _ from 'lodash'

class Params {
  constructor () {
    const currentParams = location.search !== '' ? JSON.parse('{"' + decodeURI(location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')) + '"}') : {}
    const pageParams = typeof currentParams.id !== 'undefined' ? _.find(pageProps, { 'id': currentParams.id }) : {}
    this.id = currentParams.id
    this.name = pageParams.name
    this.twitter = pageParams.twitter
    this.priceApi = typeof pageParams.priceApi !== 'undefined' ? pageParams.priceApi : pageParams.name
    this.coinCheckup = typeof pageParams.coinCheckup !== 'undefined' ? pageParams.coinCheckup : pageParams.name
  }
}

module.exports = new Params()
