from flask import Blueprint, render_template, request

from app.surah import list_of_surah

view = Blueprint('test', __name__)

@view.route('/')
def test():
    return render_template('static/index.html', list_of_surah=list_of_surah)