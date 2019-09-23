(async () => {
  const alfy = require('alfy')
  const getPkgHistory = require('./history.js')
  const { getSizeInKB } = require('./utils')

  const packageQuery = process.argv[2] || ''

  if (!packageQuery.includes('@') || /@$/.test(packageQuery)) {
    await getPkgHistory(packageQuery)
    return
  }

  const data = await alfy.fetch(`https://bundlephobia.com/api/size?package=${packageQuery}&record=true`) || {}

  const items = [{
    title: `Minified: ~${getSizeInKB(data.size)}`,
    subtitle: `Minified + GZipped: ~${getSizeInKB(data.gzip)}`,
    name: data.name + data.version
  }]

  alfy.output(items)
})()