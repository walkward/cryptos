import Promise from 'promise-polyfill'

export default function () {
  return new Promise((resolve, reject) => {
    // Parsing the page parameters
    const pageParams = JSON.parse('{"' + decodeURI(location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')) + '"}')

    // Adding coin's twitter feed
    twttr.widgets.createTimeline({
      sourceType: 'url',
      url: 'https://twitter.com/' + pageParams.name
    }, document.getElementById('socialCoin'), {height: 2000})

    // Adding ticker specific widget
    twttr.widgets.createTimeline(pageParams.ticker, document.getElementById('socialTicker'), {height: 2000})

    // Add coinName to page
    document.getElementById('coinName').innerHTML = pageParams.name
  })
}
