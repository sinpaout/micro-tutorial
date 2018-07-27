require('isomorphic-fetch')
const dbToken = process.env.DB_TOKEN
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: dbToken });

module.exports = async (req, res) => {
  const response = await dbx.filesListFolder({
    path: '/something',
    recursive: true,
    limit: 10
  })
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

const loadFiles = async () => {
  let files = []
  let hasMore = true
  while (hasMore) {
    hasMore = false
    try {
      const response = await dbx.filesListFolder({
        path: '/something',
        recursive: true,
        limit: 10
      })
      console.log('response', response);
      files = files.concat(response.entries || [])
      hasMore = response.has_more
    } catch(err) {
      console.error('loadFiles error', err)
    }
  }

}

