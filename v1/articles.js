require('isomorphic-fetch')
const dbToken = process.env.DB_TOKEN
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: dbToken });

module.exports = async (req, res) => {
  const response = await dbx.filesListFolder({path: '/something'})
  console.log('response', response);

  const data = {
    atricles: [{
      id: 1
    }, {
      id: 2
    }],
  }

  return response;
}

