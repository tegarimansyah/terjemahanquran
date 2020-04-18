const fs = require('fs')
const TOML = require('@iarna/toml')

// const topicFiles = Array(1).fill().map((_, i) => `quran_data/source/${i + 1}.toml`)
const files = Array(114).fill().map((_, i) => `${i + 1}`)

// console.log(topicFiles)
// console.log(surahFiles)

files.forEach((file) => {
  const surah = JSON.parse(fs.readFileSync(`quran_data/surah_ori/${file}.json`, 'utf-8'))
  const topic = TOML.parse(fs.readFileSync(`quran_data/source/${file}.toml`, 'utf-8'))
  surah[file].topic = topic.topics

  fs.writeFile(`quran_data/surah/${file}.json`, JSON.stringify(surah, null, 2), function (err) {
    if (err) throw err
    console.log('The object file file was saved!')
  })
})

// const stringfile = filenames.reduce((acc, filename) => [
//   ...acc,
//   JSON.stringify(TOML.parse(fs.readFileSync(filename, 'utf-8')))
// ], [])

// // write js file
// const filedata = `const data = [${stringfile}]

// const topicList = (num) => {
//     if (num === 'all') {
//       return data
//     } else {
//       return data[num - 1]
//     }
//   }
  
// export default topicList
// `
// fs.readFile()

// fs.writeFile('components/topic.js', filedata, function (err) {
//   if (err) throw err
//   console.log('The object file file was saved!')
// })
