from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

#construir los vectorizadores
countvec = CountVec = CountVectorizer(ngram_range=(1,1), stop_words="english", encoding="utf-8")

def get_listText(x):
    if isinstance(x,list):
        names = [i["name"] for i in x]

        if len(names) > 3:
            names = names[:3]
        return names
    return []

def getFeaturesFromData(data):
    #conseguir espciales metadata de la pelicula elegida
    
    #modificando el mismo dataframe original
    #datos textuales
    genero = data["genres"]
    language = data["spoken_languages"]
    print(genero) 
    #datos numericos
    #duration = data["runtime"]
    #revenue = data["revenue"]
    #rating = data["vote_average"]
    
    #coundata = CountVec.fit_transform(genre)
    #genero = pd.DataFrame(coundata.toarray(), columns=CountVec.get_feature_names())

