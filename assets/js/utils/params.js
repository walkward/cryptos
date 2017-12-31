let params = location.search !== '' ? JSON.parse('{"' + decodeURI(location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')) + '"}') : {}
module.exports = params
