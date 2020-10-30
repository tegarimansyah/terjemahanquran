const fs = require('fs')

const fullSurah = (num) => {
  if (num === 'all') {
    const files = Array(114).fill().map((_, i) => `${i + 1}`)
    // let surah

    // files.forEach((file) => {
    //   surah[file] = JSON.parse(fs.readFileSync(`quran_data/surah_ori/${file}.json`, 'utf-8'))
    // })

    // return surah
    return files
  } else {
    // const MyComponent = () => import(`~/components/${num - 1}.js`)

    return JSON.parse(fs.readFile(`quran_data/surah/${num - 1}.json`, 'utf-8'))
  }
}

export default fullSurah
