var request = require('axios');
var _ = require('underscore');

var requestConfig = { headers: {} };
var CONSUMER_KEY = null;
var CONSUMER_SECRET = null;
var API_URL = 'https://api.discogs.com';

var setCredentials = function(key, secret) {

  if(!_.isString(key) || !_.isString(secret)) throw new Error('Key and secret must be strings.');

  CONSUMER_KEY = key;
  CONSUMER_SECRET = secret;

  requestConfig.headers = {
    'Authorization': 'Discogs key='+CONSUMER_KEY+', secret='+CONSUMER_SECRET
  };
};

var fromList = function(listId) {

  if(CONSUMER_KEY === null || CONSUMER_SECRET === null) throw new Error('Discogs API credentials are not set.');
  if(!listId) throw new Error('A list ID must be specified.');

  return request.get(API_URL+'/lists/'+listId, requestConfig).then(function(res) {
    return res.data;
  }).catch(function(err) {
    throw new Error(err.status+' '+err.statusText);
  });
};

module.exports = {
  fromList: fromList,
  setCredentials: setCredentials
};