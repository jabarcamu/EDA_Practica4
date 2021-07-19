from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.model_selection import train_test_split
import pandas as pd


#construir los vectorizadores
countvec = CountVec = CountVectorizer(ngram_range=(1,1), stop_words="english", encoding="utf-8")

def getFeaturesFromData(data):
    #conseguir espciales metadata de la pelicula elegida
    
    #modificando el mismo dataframe original
    #datos textuales
    colGenero = data["genre"]
    colPais = data["country"]
    colNombreMovie = data["movie_name"]


    featuresGenero = countvec.fit_transform(colGenero) 
    featGenero = pd.DataFrame(featuresGenero.toarray(), columns=countvec.get_feature_names())

    featuresPais = countvec.fit_transform(colPais) 
    featPais = pd.DataFrame(featuresPais.toarray(), columns=countvec.get_feature_names())
    

    #datos numericos
    colNumerics = data[["Duration","year","rating"]]

    setColsChoosen = pd.concat([colNumerics, featGenero, featPais, colNombreMovie], axis=1)
    
    #We get 133 features
    print("Shape:",setColsChoosen.shape)

    #divide dataset
    train, test = train_test_split(setColsChoosen, test_size=0.2, random_state=42)
    print("Shape Train: ",train.shape)
    print("Shape Test: ",test.shape)

    #guardando en csv para que sea leido por sketch
    train.to_csv("netflixDataset/entrenamiento.csv", sep=",", encoding="utf-8", index=False)
    test.to_csv("netflixDataset/prueba.csv",sep=",", encoding="utf-8", index=False)


