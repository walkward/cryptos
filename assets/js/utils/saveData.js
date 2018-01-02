import Big from 'big.js'
import toast from '../utils/toast'
import _ from 'lodash'
import getData from '../utils/getData'

const saveResearch = (researchData, handleData) => {
  const apiKey = localStorage.getItem('myKey')
  if (!apiKey) return
  $.ajax({
    'async': true,
    'crossDomain': true,
    'url': 'https://api.graph.cool/simple/v1/cjbwdrpss0okf0154rwt7noqf',
    'method': 'POST',
    'headers': {
      'authorization': apiKey,
      'content-type': 'application/json'
    },
    'processData': false,
    'data': researchData
  }).done(function (data) {
    handleData(data)
  })
}

const research = (pageData) => {
  // Assign the object ID
  let formData = 'id:' + '\"' + cryptos.params.id + '\",'

  // Check if value is string or number and handle accordingly
  const formatData = (o) => {
    if (o.value === '') return ''
    else if (/^((?=[\d\.]).)*$/.test(o.value)) return o.name + ':' + Big(o.value) + ','
    else return o.name + ':\"' + o.value.replace(/\n\r?/g, '<br />') + '\",'
  }

  // Create the graphQL string of new values
  _.map(pageData, (o) => { formData = formData + formatData(o) })

  // Create the variables which will be passed to our graphQL query
  let variables = JSON.stringify({ 'query': 'mutation { updateCoin(' + formData.slice(0, formData.length - 1) + ') { id url wPUrl } } ' })

  saveResearch(variables, (data) => {
    if (data.errors) alert('An error has occured while saving the data: ' + data.errors[0].message)
    else toast('Saved Data')
  })
}

module.exports = { research }
