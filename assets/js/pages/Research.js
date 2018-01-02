import Promise from 'promise-polyfill'
import rivetsConfig from '../vendor/rivetsConfig'
import getData from '../utils/getData'
import saveData from '../utils/saveData'

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
      getData.research(researchId, (res) => {
        // error handling
        if (res.errors) alert(res.errors[0].message)
        // Assigning global research data object
        cryptos.research = res.data.Coin

        // Getting the price for the current currency
        const getPrice = () => {
          return new Promise((resolve, reject) => {
            getData.coin([cryptos.research.name], (res) => {
              cryptos.researchCoin = res[0]
              resolve()
            })
          })
        }

        const bindRivets = function () {
          return rivets.bind($(settings.selectors.rivetsSelector), {
            research: cryptos.research,
            ratingSum: 0,
            coin: cryptos.researchCoin
          })
        }

        getPrice().then(() => {
          bindRivets()
          resolve('success')
        })
      })
    }

    // Save keystroke event
    function KeyPress (e) {
      let evtobj = window.event ? event : e
      if (evtobj.keyCode === 83 && evtobj.ctrlKey) {
        let pageData = $(settings.selectors.researchForm).serializeArray()
        saveData.research(pageData)
      }
    }
    document.onkeydown = KeyPress

    // If an ID exists within the params, then we'll get the data
    if (typeof cryptos.params.id !== 'undefined') getResearchData(cryptos.params.id)

    // Update the url when research selector is changed
    $(settings.selectors.researchSelector).on('change', function () {
      window.location.href = location.origin + location.pathname + '?id=' + this.value
    })

    // Save data on button click
    $(settings.selectors.saveForm).on('click', function (evt) {
      evt.preventDefault()
      let pageData = $(settings.selectors.researchForm).serializeArray()
      saveData.research(pageData)
    })
  })
}
