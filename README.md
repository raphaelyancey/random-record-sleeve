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

// Set your Discogs API credentials (mandatory)
randomRecordSleeve.setCredentials('k3y', 's3cr3t');

// Get a random sleeve from a list by giving the list ID,
// or defaults to https://www.discogs.com/lists/Discogs-Most-Popular-Albums/2056
var imgURL = randomRecordSleeve.getSleeve();
```

# Options

`consumerKey` *string* | The Discogs API consumer key.

`consumerSecret` *string* | The Discogs API consumer secret.
