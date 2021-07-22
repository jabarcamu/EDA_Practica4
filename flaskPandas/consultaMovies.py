
from flask import Flask,request, flash, render_template, send_file, make_response, url_for, Response, jsonify
import pandas as pd
import io
from getFeatureVectors import buildJsonEntireData, buildJsonSelectedMovie

#cada vez que se inicia la ventana
movieData = pd.read_csv("netflixDataset/Netflix_movies.csv")

app = Flask(__name__)
app.config.from_mapping(
        SECRET_KEY="dev",
)

@app.route("/",defaults={"page":"kdtree2d"})
@app.route("/<any(kdtree2d):page>)")
def kdtree2d(page):
    return render_template(f"{page}.html",page=page)

@app.route("/viewmoviee",methods=("GET","POST"))
def viewmoviee():
    searchmovie="vacio"
    error = "no hay error"
    res = movieData[["Unnamed: 0","movie_name","actors"]].head(5)

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
        res = resMovies[["Unnamed: 0","movie_name","actors"]]
        #return redirect(url_for("queryMovies"),resMovies=resMovies)

    return render_template("/viewmovie.html", table=res.to_html(classes=["male"],table_id="mytable"), titles=["na","Default Netflix Movies"],page="viewmovie")

#detail movie (author-Timoty)
@app.route("/detailmovie",methods=("GET","POST"))
def detailmovie():
    return render_template("/detailmovie.html", page="detailmovie")


            
@app.route("/add", methods=["POST"])
def add():
    #mandamos el json del total de pelicula para el kdtree
    vectGenTotal,totalMovies_json = buildJsonEntireData(movieData)
    idMovie = request.form.get("col4");
    #consultamos mediante el id la pelicula seleccionada
    selMovie = movieData[movieData["Unnamed: 0"] == int(idMovie)]
    selMovie_json = buildJsonSelectedMovie(vectGenTotal,selMovie)
    return jsonify(result=[selMovie_json,totalMovies_json]);

if __name__ == "__main__":
    app.run(debug=True)

