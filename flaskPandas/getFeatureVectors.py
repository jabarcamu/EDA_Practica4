from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import json


#clase necesaria para la codificacion de numpy a json
class NumpyEncoder(json.JSONEncoder):
    """ Custom encoder for numpy data types """
    def default(self, obj):
        if isinstance(obj, (np.int_, np.intc, np.intp, np.int8,np.int16, np.int32, np.int64, np.uint8,np.uint16, np.uint32, np.uint64)):
            return int(obj)

        elif isinstance(obj, (np.float_, np.float16, np.float32, np.float64)):
            return float(obj)

        elif isinstance(obj, (np.complex_, np.complex64, np.complex128)):
            return {'real': obj.real, 'imag': obj.imag}

        elif isinstance(obj, (np.ndarray,)):
            return obj.tolist()

        elif isinstance(obj, (np.bool_)):
            return bool(obj)

        elif isinstance(obj, (np.void)): 
            return None

        return json.JSONEncoder.default(self, obj)

#construir el vectorizador
countvec = CountVectorizer(ngram_range=(1,1), stop_words="english", encoding="utf-8")
#varialbe general compartida del vectorizador de genero


def buildJsonEntireData(data):
    
    #datos textuales
    colGenero = data["genre"]
    featuresGenero = countvec.fit_transform(colGenero) 
    vectGeneroTotal = featuresGenero.toarray()

    #datos numericos
    colNumerics = data[["Duration","year","rating"]]
    dataTotal = data.to_json(orient="records")
    parsedObjTotal = json.loads(dataTotal)

    #formando el json data
    datajson = {"data":[]}

    #recorremos cada registro de data y seleccionar especificas columnas
    for x in range(len(data)):
        numericData = [ data["Duration"][x], data["year"][x], data["rating"][x] ]
        datajson["data"].append({
            "vector": numericData + featuresGenero.toarray()[x].tolist(),
            "obj": parsedObjTotal[x]
        })

    
    #usando la clase para tenerlo como un array numpy
    json_data = json.dumps(datajson, cls=NumpyEncoder)
    #print(json_data)
    
    #transformando a un archivo json del numpy array
    with open("json/totalmovies.json", "w") as outfile:
        outfile.write(json_data)
    
    return vectGeneroTotal, json_data

def buildJsonSelectedMovie(vectGenTotal, selectMovie):
    
    #conocer el index del dataframe
    indexDfMovie = selectMovie.index[0]
    
    #datos textuales
    colGenero = selectMovie["genre"]
    featuresGenero = countvec.fit_transform(colGenero) 
    
    dataMovie = selectMovie.to_json(orient="records")
    parsedObjMovie = json.loads(dataMovie)

    #formando el json data
    datajson = {"data":[]}

    #recorremos cada registro de data y seleccionar especificas columnas
    numericData = [selectMovie.loc[indexDfMovie]["Duration"], selectMovie.loc[indexDfMovie]["year"], selectMovie.loc[indexDfMovie]["rating"]]
    
    datajson["data"].append({
        "vector": numericData + vectGenTotal[indexDfMovie].tolist(),
        "obj": parsedObjMovie[0]
    })
    
    
    #usando la clase para tenerlo como un array numpy
    json_data = json.dumps(datajson, cls=NumpyEncoder)
    #print(json_data)
    
    #transformando a un archivo json del numpy array
    with open("json/selectMovie.json", "w") as outfile:
        outfile.write(json_data)

    return json_data

