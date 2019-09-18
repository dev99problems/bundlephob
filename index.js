(async () => {
  const alfy = require('alfy')

  const packageQuery = process.argv[2]

  const data = await alfy.fetch(`https://api.npms.io/v2/search/suggestions?q=${packageQuery}`) || []

  const items = data.map(element => {
    const { name, description } = (element || {}).package || {}

    return ({
      title: name,
      subtitle: description
    })
  })

  alfy.output(items)
})()


/*(async () => {
  const alfy = require('alfy')

  const data = await alfy.fetch('https://api.npms.io/v2/search/suggestions?q=lodash.get') || []

  const items = data.map(element => ({
    title: element.package.name,
    subtitle: 'dodo pizza'
  }))

  alfy.output(items)
})()*/