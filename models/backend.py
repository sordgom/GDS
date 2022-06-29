# %%
#Import all the necessary libraries 
from sklearn import metrics 
import pandas as pd
import numpy as np
import math
import category_encoders as ce
import pickle
#Algorithms
from sklearn.linear_model import LinearRegression
from sklearn.neural_network import MLPClassifier
from sklearn.datasets import make_classification  
from sklearn.feature_selection import mutual_info_regression
from sklearn.metrics import confusion_matrix
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2
from kmodes.kmodes import KModes
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
#plotting
import matplotlib.pyplot as plt
import seaborn as seabornInstance 
import warnings
warnings.filterwarnings('ignore')


data = pd.read_excel("./api/MMSE.xlsx")
MMSE_results={} #hold our accuracy results
GDS_results={}

# %% [markdown]
# ## Feature Engineering
# Since most data has been already cleared and transformed accordingly, we're going to focus on the importance/utility of our features

# %%
demographic_features = ["AGE","GENDER.1","NEGERI.1","Pekerjaan Utama.1","Job Sector Previously.3","Marital Status.1","Tinggal ","Jika Kurang 1 Tahun Berapa Batang.1"]
demographic_features_numerical = ["AGE","Gender Raw","Negeri Raw","Pekerjaan Utama.1","Job Sector Previously.1","Marital Status Raw","Tinggal Raw"]
demographic_categorical = ["GENDER.1","NEGERI.1","Job Sector Previously.3","Marital Status.1","Tinggal "]

health_features = ["Smoking.1","Minum Alkohol.1","Rokok Sehari.1","Bekas Perokok - Tahun Berhenti.1","ADL.3","WHODAS_baseline.1"]
health_features_numerical = ["Smoking Raw","ukmb1_6","ADL.2","WHODAS_baseline"]
health_categorical = ["Smoking.1","Minum Alkohol.1","ADL.3","WHODAS_baseline.1"]

social_features = ["sumLubben.2","Average Total Neighbourhood.2","Neighbourhood - General Feel.3",
"Total Monthly main income (Full)","Total Monthly side_income.1","Total Social Cohesion Scale .3",
"Medical Outcome Study Social Factor 1(Informational).1","Total Medical Outcome Study Social Factor (Tangible Support).1",
"Total Medical Outcome Study Social Factor (Affective Support).1","Total Medical Outcome Study Social Factor (Positive Social Interaction).1"]
social_features_numerical = ["sumLubben.1","Average Total Neighbourhood.1","Total Social Cohesion Scale (ROUND Value)",
"Medical Outcome Study Social Factor 1(Informational).1","Medical Outcome Study Social Factor 12(Tangible Support)",
"Medical Outcome Study Social Factor (Affective Support)","Total Medical Outcome Study Social Factor 19(Positive Social Interaction)"]
data[social_features_numerical] = data[social_features_numerical].fillna(0) 
social_categorical = ["sumLubben.2","Average Total Neighbourhood.2","Total Social Cohesion Scale .3",
"Medical Outcome Study Social Factor 1(Informational).2","Total Medical Outcome Study Social Factor (Tangible Support).1",
"Total Medical Outcome Study Social Factor (Affective Support).1","Total Medical Outcome Study Social Factor (Positive Social Interaction).1"]

psychology_features = ["Quality Of Life.2","Total SWLS.3","Total_EpQ(Data_Full)(Average).1","Total_Loneliness ",
"Perceived Stress Scale 1 (Unable to control)",
"Perceived Stress Scale 2 (Ability to handle your personal problems)","Perceived Stress Scale 3 (things were going your way)",
"Perceived Stress Scale 4 (not overcome them)",
"Flourushing Scale : I lead a purposeful and meaningful life..3","Flourushing Scale 2: My social relationships are supportive and rewarding..3",
"Flourushing Scale 3: I am engaged and interested in my daily activities..4","Flourushing Scale 4: I actively contribute to the happiness and well-being of others..4",
"Flourushing Scale 5 : I am competent and capable in the activities that are important to me.4","Flourushing Scale 6 :  I am a good person and live a good life.4",
"Flourushing Scale 7 : I am optimistic about my future.4","Flourushing Scale 8: People respect me.4",]
psychology_features_numerical = ["Quality Of Life.2","Total SWLS.2","Total_EpQ(Data_Full)(Average)","Total_Loneliness"]
psychology_categorical = ["Quality Of Life.2","Total SWLS.3","Total_EpQ(Data_Full)(Average).1","Total_Loneliness"
                          ]
features = demographic_features + health_features + social_features + psychology_features
features_numerical = demographic_features_numerical + health_features_numerical + social_features_numerical + psychology_features_numerical
MMSE = data["MMSE"]
GDS = data["GDS-15"]

dd = data[demographic_features_numerical]
dh = data[health_features_numerical]
ds = data[social_features_numerical]
dp = data[psychology_features_numerical]


# %%
# Import the model you want to use
from sklearn.tree import DecisionTreeClassifier
#Make an instance of the Model

def partition_DT(portion,features,target):
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=portion, random_state=1)
    #Train the model on the data
    clf.fit(X_train, y_train)
    # Predict labels of unseen (test) data
    y_pred = clf.predict(X_test)
    print("Accuracy of DecisionTree:",metrics.accuracy_score(y_test, y_pred))
    return metrics.accuracy_score(y_test, y_pred)

# Saving model

df = pd.concat([dd,dh,dp,ds],axis=1)
print(df.columns)

#pickling the model
clf = DecisionTreeClassifier(max_depth = 6,random_state = 0)
partition_DT(0.02, df , MMSE) #Application of the model 
pickle.dump(clf, open('./api/Mclassifier.pkl', 'wb'))

#pickling the model
clf = DecisionTreeClassifier(max_depth = 6,random_state = 0)
partition_DT(0.33, df , GDS) #Application of the model 
pickle.dump(clf, open('./api/Gclassifier.pkl', 'wb'))
