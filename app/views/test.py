from flask import Blueprint, render_template, request

view = Blueprint('test', __name__)

@view.route('/')
@view.route('/<user>')
def test(user=None):
    user = user or 'Tegar'
    return render_template('index.html', user=user)