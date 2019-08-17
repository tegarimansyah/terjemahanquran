from flask import Blueprint, render_template, request

from app.surah import list_of_surah

view = Blueprint('display_all_surah', __name__)

@view.route("/surah/<int:id>")
def display_surah(id):
    try:
        assert id >= 1 and id <= 114, "Not Found"
        surah = list_of_surah.get(id)
        return f"Surah {surah.get('ar')} - {surah.get('id')}"
    except Exception as e:
        return f"{e}"