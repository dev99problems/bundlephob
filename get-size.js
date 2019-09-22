(async () => {
  const getSizeInKB = (size) => (size / 1000).toFixed(2)

  const alfy = require('alfy')

  const packageName = process.argv[2]

  const data = await alfy.fetch(`https://bundlephobia.com/api/size?package=${packageName}&record=true`) || {}

  const items = [{
    title: `Minified: ~${getSizeInKB(data.size)} kB`,
    subtitle: `Minified + GZipped size: ~${getSizeInKB(data.gzip)} kB`,
    name: data.name + data.version
  }]

  alfy.output(items)
})()