from flask import Blueprint, render_template, request

from app.surah import ListofSurah

view = Blueprint('test', __name__)

@view.route('/')
def test():
    list_of_surah = ListofSurah.get_all_name()
    return render_template('static/index.html', list_of_surah=list_of_surah)