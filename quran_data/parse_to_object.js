const fs = require('fs')
const TOML = require('@iarna/toml')

const filenames = Array(114).fill().map((_, i) => `quran_data/source/${i + 1}.toml`)

const stringfile = filenames.reduce((acc, filename) => [
  ...acc,
  JSON.stringify(TOML.parse(fs.readFileSync(filename, 'utf-8')))
], [])

// write js file
const filedata = `const data = [${stringfile}]

const themeList = (num) => {
    if (num === 'all') {
      return data
    } else {
      return data[num - 1]
    }
  }
  
export default themeList
`
fs.writeFile('components/theme.js', filedata, function (err) {
  if (err) throw err
  console.log('The object file file was saved!')
})
