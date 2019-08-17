from flask import Flask
import importlib

app = Flask(__name__)

def include_view(views):
    module_path = 'app.views.{}'
    for view, url_prefix in views:
        module = importlib.import_module(module_path.format(view))
        app.register_blueprint(module.view, url_prefix=url_prefix)

views = [
    ('home',''),
    ('test','/test'),
]
include_view(views)


if __name__ == "__main__":
    app.run()
