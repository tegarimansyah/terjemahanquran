const fs = require('fs')
const hasha = require('hasha');
const TOML = require('@iarna/toml')

const files = Array(114).fill().map((_, i) => `${i + 1}`)
const hashFile = {}
const summary = {}
summary.surah = []

files.forEach((file) => {
  const surah = JSON.parse(fs.readFileSync(`quran_data/surah_ori/${file}.json`, 'utf-8'))
  const topic = TOML.parse(fs.readFileSync(`quran_data/topic/${file}.toml`, 'utf-8'))
  delete Object.assign(surah, { data: surah[file] })[file]
  surah.data.topics = topic.topics
  summary.surah.push({
    'number': file,
    'name': surah.data.name,
    'name_latin': surah.data.name_latin,
    'name_translation': surah.data.translations.id.name,
    'number_of_ayah': surah.data.number_of_ayah,
    'topics': topic.topics
  })

  const surahHash = hasha(JSON.stringify(surah.data))
  surah.hash = surahHash
  hashFile[file] = surahHash

  fs.writeFile(`static/surah/${file}.json`, JSON.stringify(surah, null, 2), function (err) {
    if (err) throw err
  })
})
console.log('Surah files file was saved!')

const summaryHash = hasha(JSON.stringify(summary))
summary.hash = summaryHash
hashFile.summary = summaryHash

fs.writeFile(`static/surah/summary.json`, JSON.stringify(summary, null, 2), function (err) {
  if (err) throw err
  console.log('Summary file file was saved!')
})

const hashData = JSON.stringify(hashFile, null, 2)
const filedata = `const hashdata = ${hashData}
  
export default hashdata
`

fs.writeFile(`components/hash.js`, filedata, function (err) {
  if (err) throw err
  console.log('Hash file file was saved!')
})
