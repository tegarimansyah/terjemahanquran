from flask import Flask

from app.surah import list_of_surah

app = Flask(__name__)

@app.route("/")
def hello():
    data = ""
    for index, surah in list_of_surah.items():
        data += f'<a href="/surah/{index}">{index} - {surah.get("ar")} ({surah.get("id")})</a><br>'
    return data

@app.route("/surah/<int:id>")
def display_surah(id):
    try:
        assert id >= 1 and id <= 114, "Not Found"
        surah = list_of_surah.get(id)
        return f"Surah {surah.get('ar')} - {surah.get('id')}"
    except Exception as e:
        return f"{e}"

if __name__ == "__main__":
    app.run()
