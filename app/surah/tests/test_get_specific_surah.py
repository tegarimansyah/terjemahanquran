from app.surah import ListofSurah

def test_get_specific_surah_name():
    surah = ListofSurah.get(id=1)
    for i in range(surah['basic_info']['num_of_content']):
        print(surah['content_title'][i])
        print(surah['content'][i])
    # assert list_of_surah.get('1').get('surah_name') == 'Al Fatihah', "Can't retrieve surah name"
    # assert list_of_surah.get('1').get('surah_translation') == 'Pembukaan', "Can't retrieve surah translation"
    assert False, None