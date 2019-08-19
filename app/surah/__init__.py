from toml import load

class ListofSurah:
    @staticmethod
    def get(id, lang="id"):
        assert id >= 1 and id <= 114, "Not Found"

        all_data = load(f'app/surah/{id}.toml')
        surah_data = {
            'basic_info': all_data.get('basic_info'),
            'content': all_data.get('content')
        }
        surah_data.update(all_data.get(lang))
        return surah_data

    @staticmethod
    def get_all_name(lang="id"):
        all_data = load('app/surah/list_surah.toml')
        surah_data = {}
        for k, v in all_data.items():
            surah_data[k] = all_data[k].get(lang)
        
        return surah_data