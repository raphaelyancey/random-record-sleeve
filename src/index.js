var axios = require('axios');
var _ = require('underscore');

var instanceConfig = {
  baseURL: 'https://api.discogs.com'
};

var api = axios.create(instanceConfig);

/**
 * Sets the Discogs API credentials.
 *
 * @param      {string}  key     The key
 * @param      {string}  secret  The secret
 */
var setCredentials = function(key, secret) {

  if(!_.isString(key) || !_.isString(secret)) throw new Error('Key and secret must be strings.');

  api = axios.create(_.extend({}, instanceConfig, { headers: {
    'Authorization': 'Discogs key='+key+', secret='+secret
  }}));
};

/**
 * Gets a random sleeve.
 *
 * @param      {int}     listId  The list identifier (optional)
 * @return     {string}  The sleeve URL.
 */
var getSleeve = function(listId) {

  if(!listId) listId = 2056;

  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getList(listId) {
    return api.get('/lists/' + listId);
  }

  function getItem(itemId) {
    return api.get('/masters/' + itemId);
  }

  return getList(listId).then(function(res) {
    var rand = random(0, res.data.items.length);
    return getItem(res.data.items[rand].id).then(function(res) {
      return res.data.images[0].uri;
    });
  }).catch(function(res) {
    return null;
  });
};

module.exports = {
  getSleeve: getSleeve,
  setCredentials: setCredentials
};