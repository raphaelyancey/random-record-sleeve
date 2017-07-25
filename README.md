# random-record-sleeve 

Gets a random record sleeve from Discogs.
Mostly just a try at making my first npm module 🎉

To use in any web project.

> You need a [Discogs API access](https://www.discogs.com/settings/developers) since image consuming is not publicly available.

> Works both in Node.js and in the browser thanks to [axios](https://github.com/mzabriskie/axios)

# Usage

```javascript
// Require the module
var randomRecordSleeve = require('random-record-sleeve');

var options = {
  consumerSecret: 'CXDjOdfOBrUIPVjpbMh', // Mandatory
  consumerKey: 'NyFFxQoZSxbmifdqWTKDGQQMJwuUtX' // Mandatory
};

// Get a random sleeve from a list by giving the list ID
var img = randomRecordSleeve.fromList(352246, options);
```

# Options

`consumerKey` *string* | The Discogs API consumer key.

`consumerSecret` *string* | The Discogs API consumer secret.
