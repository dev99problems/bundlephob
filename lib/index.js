;(async () => {
  const alfy = require('alfy')

  const packageQuery = process.argv[2] || ''
  const isQueryEmpty = !!!packageQuery.trim().length

  if (isQueryEmpty) {
    alfy.output(alfy.cache.get('last-search-results'))
    return
  }

  const data =
    (await alfy.fetch(
      `https://www.npmjs.com/search/suggestions?q=${packageQuery}`
    )) || []

  const items = data.map(element => {
    const { name, description, version } = element || {}
    const packageTitle = `${name}@${version}`

    return {
      title: packageTitle,
      subtitle: description,
      autocomplete: packageTitle,
      arg: packageTitle
    }
  })

  alfy.cache.set('last-search-results', items)
  alfy.output(items)
})()
