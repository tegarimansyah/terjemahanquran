from flask import Flask
import importlib

app = Flask(__name__)

def include_view(views):
    module_path = 'app.views.{}'
    for view in views:
        module = importlib.import_module(module_path.format(view))
        app.register_blueprint(module.view)

views = [
    'home',
    'test',
    'display_surah'
]
include_view(views)


if __name__ == "__main__":
    app.run()
