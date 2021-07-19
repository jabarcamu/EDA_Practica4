

from flask import Flask,request, flash, render_template, send_file, make_response, url_for, Response
import pandas as pd
import io
from getFeatureVectors import getFeaturesFromData
from ast import literal_eval


#cada vez que se inicia la ventana
movieData = pd.read_csv("netflixDataset/Netflix_movies.csv")
movieData = movieData.rename(columns={'Unnamed: 0': 'index'})
getFeaturesFromData(movieData)


app = Flask(__name__)
app.config.from_mapping(
        SECRET_KEY="dev",
)


@app.route("/",methods=("GET","POST"))
def index():
    searchmovie="vacio"
    error = "no hay error"
    res = movieData[["index","movie_name","actors"]].head(5)

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
        resMovies = movieData[movieData["movie_name"].str.match(searchmovie+"*")==True]
        res = resMovies[["index","movie_name","actors"]]
        #return redirect(url_for("queryMovies"),resMovies=resMovies)

    return render_template("view.html", table=res.to_html(classes=["male"],table_id="mytable"), titles=["na","Default Netflix Movies"])

            

if __name__ == "__main__":
    app.run(debug=True)


