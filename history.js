const alfy = require('alfy')
const { getSizeInKB } = require('./utils')

const getPkgHistory = async (packageQuery = '') => {
  const packageName = packageQuery.replace(/@$/, '')

  const data = await alfy.fetch(`https://bundlephobia.com/api/package-history?package=${packageName}`) || {}
  const items = []

  for (let packageVersion in data) {
    const { size, gzip } = data[packageVersion]

    items.push({
      title: packageVersion,
      subtitle: `Min: ~${getSizeInKB(size)} | Min+GZip: ~${getSizeInKB(gzip)}`
    })
  }

  alfy.output(items.reverse())
}

module.exports = getPkgHistory