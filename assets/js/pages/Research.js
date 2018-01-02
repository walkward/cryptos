import Promise from 'promise-polyfill'
import rivetsConfig from '../vendor/rivetsConfig'
import data from '../utils/data'
import toast from '../utils/toast'
import Big from 'big.js'
import _ from 'lodash'

export default function () {
  return new Promise((resolve, reject) => {
    const settings = {
      selectors: {
        researchSelector: '#researchSelector',
        rivetsSelector: '#research',
        researchForm: '#researchForm',
        saveForm: '#saveForm'
      }
    }
    rivetsConfig()

    let getResearchData = (researchId) => {
      // Get the data before executing anything else
      data.research(researchId, (res) => {
        cryptos.research = res.data.Coin

        // Getting the price for the current currency
        const getPrice = () => {
          return new Promise((resolve, reject) => {
            data.price([cryptos.research.ticker], (res) => {
              cryptos.price[cryptos.research.ticker] = res.USD
              resolve()
            })
          })
        }

        const bindRivets = function () {
          return rivets.bind($(settings.selectors.rivetsSelector), {
            research: cryptos.research,
            ratingSum: 0,
            tickerPrice: cryptos.price[cryptos.research.ticker]
          })
        }

        getPrice().then(() => {
          bindRivets()
          resolve('success')
        })
      })
    }

    // If an ID exists within the params, then we'll get the data
    if (typeof cryptos.params.id !== 'undefined') getResearchData(cryptos.params.id)

    // Update the url when research selector is changed
    $(settings.selectors.researchSelector).on('change', function () {
      window.location.href = '/research/?id=' + this.value
    })

    // Save data on button click
    $(settings.selectors.saveForm).on('click', function (evt) {
      evt.preventDefault()
      // Assign the object ID
      let formData = 'id:' + '\"' + cryptos.params.id + '\",'

      // Check if value is string or number and handle accordingly
      const formatData = (o) => {
        if (o.value === '') return ''
        else if (/^((?=[\d\.]).)*$/.test(o.value)) return o.name + ':' + Big(o.value) + ','
        else return o.name + ':\"' + o.value + '\",'
      }

      // Create the graphQL string of new values
      _.map($(settings.selectors.researchForm).serializeArray(), (o) => { formData = formData + formatData(o) })

      // Create the variables which will be passed to our graphQL query
      let variables = JSON.stringify({ 'query': 'mutation { updateCoin(' + formData.slice(0, formData.length - 1) + ') { id url wPUrl } } ' })

      data.saveResearch(variables, (data) => {
        console.log(data)
        if (data.errors) alert('An error has occured while saving the data: ' + data.errors[0].message)
        else toast('Saved Data')
      })
    })
  })
}
