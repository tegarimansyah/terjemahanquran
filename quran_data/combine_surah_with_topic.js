const fs = require('fs')
const TOML = require('@iarna/toml')

const files = Array(114).fill().map((_, i) => `${i + 1}`)
const summary = []

files.forEach((file) => {
  const surah = JSON.parse(fs.readFileSync(`quran_data/surah_ori/${file}.json`, 'utf-8'))
  const topic = TOML.parse(fs.readFileSync(`quran_data/topic/${file}.toml`, 'utf-8'))
  surah[file].topic = topic.topics
  summary.push({
    'number': file,
    'name': surah[file].name,
    'name_latin': surah[file].name_latin,
    'name_translation': surah[file].translations.id.name,
    'number_of_ayah': surah[file].number_of_ayah,
    'topic': topic.topics
  })

  fs.writeFile(`static/surah/${file}.json`, JSON.stringify(surah, null, 2), function (err) {
    if (err) throw err
    console.log('The object file file was saved!')
  })
})

fs.writeFile(`static/surah/summary.json`, JSON.stringify(summary, null, 2), function (err) {
  if (err) throw err
  console.log('The object file file was saved!')
})
