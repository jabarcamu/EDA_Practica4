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
        if x == 0:
            print(datajson)

    
    #usando la clase para tenerlo como un array numpy
    json_data = json.dumps(datajson, cls=NumpyEncoder)
    #print(json_data)
    
    #transformando a un archivo json del numpy array
    with open("training.json", "w") as outfile:
        outfile.write(json_data)



