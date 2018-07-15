const { parse } = require('url')
const { send } = require('micro')
const json = require('./json')

module.exports = async (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl

  console.log('parsedUrl', parsedUrl)

  if (pathname.indexOf('/api/') >= 0) {
    send(res, 200, await json(req, res))
    return;
  }

  res.end('Welcome to Micro')
}
