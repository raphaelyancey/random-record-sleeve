var request = require('axios');

var fromList = function(listId) {
  if(!listId) throw new Error('A list ID must be specified.');
  request.get('http://google.fr').then(function(res) {
    console.log('••• res', res);
  });
};

module.exports = {
  fromList: fromList
};