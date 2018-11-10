const { parse } = require('url')
const { send } = require('micro')
const api = require('./api')
const v1 = require('./v1')

module.exports = async (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl

  console.log('parsedUrl', parsedUrl)
  console.log('v1', v1);

  if (pathname.indexOf('/api/v1/articles') >= 0) {
    send(res, 200, await v1.articles(req, res))
    return;
  }

  res.end('Welcome to Yangon')
}
