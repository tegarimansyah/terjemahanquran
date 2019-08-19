from app.surah import ListofSurah

def test_get_specific_surah_name():
    list_of_surah = ListofSurah.get_all_name()
    print(list_of_surah)
    assert list_of_surah.get('1').get('surah_name') == 'Al Fatihah', "Can't retrieve surah name"
    assert list_of_surah.get('1').get('surah_translation') == 'Pembukaan', "Can't retrieve surah translation"