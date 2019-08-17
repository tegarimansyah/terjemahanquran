from flask import Blueprint, render_template, request

from app.surah import list_of_surah

view = Blueprint('home', __name__)

@view.route('/')
def display_all_surah():
    data = ""
    for index, surah in list_of_surah.items():
        data += f'<a href="/surah/{index}">{index} - {surah.get("ar")} ({surah.get("id")})</a><br>'
    return data