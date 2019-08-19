from flask import Blueprint, render_template, request

from app.surah import ListofSurah

view = Blueprint('display_all_surah', __name__)

@view.route("/surah/<int:id>")
def display_surah(id):
    try:
        assert id >= 1 and id <= 114, "Not Found"
        surah = ListofSurah.get(id, lang="id")
        return f"Surah {surah.get('surah_name')} - {surah.get('surah_translation')}"
    except Exception as e:
        return f"{e}"