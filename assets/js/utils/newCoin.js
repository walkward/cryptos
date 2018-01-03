import saveData from './saveData'
import _ from 'lodash'

export default (() => {
  const settings = {
    selectors: {
      addCoinForm: '#addCoinForm',
      addCoinId: '[data-addCoin-id]'
    }
  }
  $(settings.selectors.addCoinForm).on('submit', function (e) {
    e.preventDefault()
    const formData = $(settings.selectors.addCoinForm).serializeArray()
    const newTicker = _.find(formData, { name: 'ticker' })
    const newName = _.find(formData, { name: 'name' })

    saveData.createCoin(newName.value, newTicker.value, (res) => {
      // Adding ID number to the form once we've confirmed the submission.
      $(settings.selectors.addCoinForm).text('id: ' + res.data.createCoin.id)
    })
  })
})()
