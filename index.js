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
var getSleeve = function(options) {

  options = options || {};
  options.listId = options.listId || 2056;

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

  return getList(options.listId).then(function(res) {
    var rand = random(0, res.data.items.length);
    return getItem(res.data.items[rand].id).then(function(res) {
      var ret = {
        url: options.size150 ? res.data.images[0].uri150 : res.data.images[0].uri,
        title: res.data.title,
        year: res.data.year
      };
      return ret;
    });
  }).catch(function(res) {
    return null;
  });
};

module.exports = {
  getSleeve: getSleeve,
  setCredentials: setCredentials
};