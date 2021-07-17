

from flask import Flask,request, flash, render_template, send_file, make_response, url_for, Response
import pandas as pd
import io
from getFeatureVectors import get_listText, getFeaturesFromData
from ast import literal_eval


#cada vez que se inicia la ventana
data = pd.read_csv("netflixDataset/movies_metadata.csv")

features = ["genres"]

#********** TODO solo debe ingresar una sola vez *******#
for feature in features:
    data[feature]  = data[feature].apply(literal_eval)

for feature in features:
    data[feature] = data[feature].apply(get_listText)

app = Flask(__name__)
app.config.from_mapping(
        SECRET_KEY="dev",
)


@app.route("/",methods=("GET","POST"))
def index():
    searchmovie="vacio"
    error = "no hay error"
    res = data[["original_title","overview"]].head(5)

    #evaluacion de datos
    if request.method == "POST":
        searchmovie = request.form["searchmovie"]
        error = None
    if not searchmovie:
        error = "Ingrese nombre de pelicula a buscar"
    if error is not None:
        flash(error)
    else:
        #realizamos la consulta sobre pandas
        resMovies = data[data["original_title"].str.match(searchmovie+"*")==True]
        res = resMovies[["original_title","overview"]]
        getFeaturesFromData(resMovies)
        #return redirect(url_for("queryMovies"),resMovies=resMovies)

    return render_template("view.html", tables=[res.to_html(classes=["male"])], titles=["na","Default Netflix Movies"])

            

if __name__ == "__main__":
    app.run(debug=True)


