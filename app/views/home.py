from flask import Blueprint, render_template, request

from app.surah import list_of_surah

view = Blueprint('home', __name__)

@view.route('/')
def display_all_surah():
    return render_template('static/index.html', list_of_surah=list_of_surah)