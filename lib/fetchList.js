require('isomorphic-fetch')
const dbToken = process.env.DB_TOKEN
const Dropbox = require('dropbox').Dropbox;
const fs = require('fs')
const path = require('path')
const projectPath = path.resolve(__dirname, '../');

const loadFiles = async ({dbx}) => {
  const files = []
  try {
    let response = await dbx.filesListFolder({
      path: '/something',
      recursive: true,
      limit: 30
    })
    files.push(...response.entries)

    response.length = response.entries.length
    response.entries.length = 0
    console.log('response', response);

    await loadCursor({dbx, files}, response)

    return files
  } catch(err) {
    console.error('loadFiles error', err)
    throw err
  }
}

const loadCursor = async ({files = [], dbx}, {cursor, has_more}) => {
  if ( !has_more ) {
    return
  }
  try {
    if ( has_more ) {
      const response = await dbx.filesListFolderContinue({cursor})

      files.push(...response.entries)

      response.length = response.entries.length
      response.entries.length = 0

      console.log('loadCursor response ------------------------------', response);
      // files.push(...response.entries)
      await loadCursor({files, dbx}, response)
    }
  } catch (ex) {
    console.log('loadCursor expection:', ex);
  }
}

const saveFiles = (files) => {
  const data = JSON.stringify(files, null, '  ')
  fs.writeFileSync(`${projectPath}/data/files.json`, data, {encoding: 'utf8'})
  console.log('__dirnaem', __dirname, projectPath);
}

const prepareHelper = ({accessToken}) => {
  const dbx = new Dropbox({ accessToken });
  return dbx;
}

const main = async () => {
  const dbx = prepareHelper({accessToken: dbToken})
  const files = await loadFiles({dbx})
  saveFiles(files)
}

main()

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
