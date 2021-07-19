#!/usr/bin/env python
# coding: utf-8

# <a href="https://colab.research.google.com/github/jabarcamu/EDA_Practica4/blob/branch-piero/Practica_4.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

# In[1]:


get_ipython().system(' pip install -q kaggle')


# In[2]:


# desde la cuenta de kaggle ir a generar api de acceso
# https://www.kaggle.com/general/74235
# https://stackoverflow.com/questions/49310470/using-kaggle-datasets-in-google-colab

from google.colab import files

files.upload()


# In[3]:


get_ipython().system(' mkdir ~/.kaggle')


# In[4]:


get_ipython().system(' cp kaggle.json ~/.kaggle/')


# In[5]:


get_ipython().system(' chmod 600 ~/.kaggle/kaggle.json')


# In[6]:


get_ipython().system(' kaggle datasets list')


# In[7]:


get_ipython().system(' kaggle datasets download -d amjaads/netflix-movies')


# In[8]:


get_ipython().system(' mkdir netflix')


# In[ ]:


get_ipython().system(' unzip netflix-movies.zip -d netflix')


# In[10]:


get_ipython().run_line_magic('cd', 'netflix/')
get_ipython().system(' ls')


# In[11]:


import pandas as pd
data = pd.read_csv("Netflix_movies.csv")


# In[12]:


data.head()


# In[14]:


from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

#nombre = data["movie_name"]
genre = data["genre"]
country = data["country"]

#print(type(duration))


CountVec = CountVectorizer(ngram_range=(1,1), # to use bigrams ngram_range=(2,2)
                           stop_words='english',
                           encoding='utf-8')

CountVec2 = CountVectorizer(ngram_range=(1,1), # to use bigrams ngram_range=(2,2)
                           stop_words='english',
                           encoding='utf-8')

#transform
#Count_data = CountVec.fit_transform([sentence_1,sentence_2])
#Count_data1 = CountVec2.fit_transform(nombre)
#create dataframe descartado xxxxx
#cv_dataframe1=pd.DataFrame(Count_data1.toarray(),columns=CountVec2.get_feature_names())
#print(cv_dataframe1)


# resultados
Count_data2 = CountVec.fit_transform(genre)
genero=pd.DataFrame(Count_data2.toarray(),columns=CountVec.get_feature_names())

Count_data3 = CountVec.fit_transform(country)
pais=pd.DataFrame(Count_data3.toarray(),columns=CountVec.get_feature_names())


duration = data["Duration"]
year = data["year"]
rating = data["rating"]

desired_colums = data[["Duration", "year", "rating"]]
name = data[["movie_name"]]

juntartodo =  pd.concat([desired_colums, genero, pais, name], axis=1)


juntartodo.head()

#movies = [duration,year,rating,cv_dataframe2,cv_dataframe3]

#result = pd.concat(movies)
#result


# In[17]:


juntartodo


# data de entrenamimento
train = juntartodo[:3000]
#train.to_csv(index=False)
train.to_csv('train.csv', sep=',',encoding='utf-8', index=False)


# data de test
test = juntartodo[3001:]
test.to_csv('test.csv', sep=',',encoding='utf-8', index=False)


# In[19]:


from google.colab import files

files.download('train.csv')
files.download('test.csv') 

pruebas =  pd.read_csv("train.csv")
pruebas

test =  pd.read_csv("test.csv")
test


# In[ ]:




