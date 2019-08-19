from flask import Flask
import importlib

app = Flask(__name__,
            static_folder='templates/static',
            static_url_path='/static',
            template_folder='templates'
        )

def include_view(views):
    module_path = 'app.views.{}'
    for view, url_prefix in views:
        module = importlib.import_module(module_path.format(view))
        app.register_blueprint(module.view, url_prefix=url_prefix)

views = [
    ('home',''),
    ('display_surah',''),
    ('test','/test')
]
include_view(views)


if __name__ == "__main__":
    app.run()
