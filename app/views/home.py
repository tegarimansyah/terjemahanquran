from flask import Blueprint, render_template, request

from app.surah import ListofSurah

view = Blueprint('home', __name__)

@view.route('/')
def display_all_surah():
    list_of_surah = ListofSurah.get_all_name()
    return render_template('static/index.html', list_of_surah=list_of_surah)