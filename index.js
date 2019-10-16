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
      `https://api.npms.io/v2/search/suggestions?q=${packageQuery}`
    )) || []

  const items = data.map(element => {
    const { name, description, version } = (element || {}).package || {}
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
