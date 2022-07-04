#Import all the necessary libraries 
from sklearn import metrics 
import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
import warnings
warnings.filterwarnings('ignore')


df = pd.read_csv("./models/data.csv")
MMSE_results={} #hold our accuracy results
GDS_results={}

# %% [markdown]
# ## Feature Engineering
# Since most data has been already cleared and transformed accordingly, we're going to focus on the importance/utility of our features

#rename columns names into shorter abbreviations
df.columns= df.columns.str.replace('Total Medical Outcome Study Social Factor','TMOSSF',regex=True)
df.columns= df.columns.str.replace('Medical Outcome Study Social Factor','TMOSSF',regex=True)
df.columns= df.columns.str.replace('Perceived Stress Scale','PSS',regex=True)
df.columns= df.columns.str.replace('Flourushing Scale','FS',regex=True)

df['total_perceived'] = (df['PSS 1 (Unable to control)'].astype('int')+df['PSS 2 (Ability to handle your personal problems)'].astype('int')+df['PSS 2 (Ability to handle your personal problems)'].astype('int')+df['PSS 4 (not overcome them)'].astype('int'))/4
# 0 = Never, 1 = Often
df.loc[df['total_perceived'] <= 2, 'c_total_perceived'] = 0
df.loc[df['total_perceived'] > 2, 'c_total_perceived'] = 1

df['total_flourishing'] = (df['FS 1 : I lead a purposeful and meaningful life.'].astype('int')+df['FS 2 : My social relationships are supportive and rewarding.'].astype('int')+df['FS 3 : I am engaged and interested in my daily activities.'].astype('int')+df[ 'FS 4 : I actively contribute to the happiness and well-being of others.'].astype('int')
+df['FS 5 : I am competent and capable in the activities that are important to me'].astype('int')+df['FS 6 : I am a good person and live a good life'].astype('int')+df[ 'FS 7 : I am optimistic about my future'].astype('int')+df['FS 8 : People respect me'].astype('int'))/8
# 0 = Disagree, 1 = Agree, 2= Neither agree nor disagree
df.loc[df['total_flourishing'] < 4, 'c_total_flourishing'] = 1
df.loc[df['total_flourishing'] > 4, 'c_total_flourishing'] = 0
df.loc[df['total_flourishing'] == 4, 'c_total_flourishing'] = 2

df['total_income']= df['Total Monthly main income (Full)'].astype('int')+df['Total Monthly side_income'].astype('int')+df['Total Monthly Household_income'].astype('int')

df.to_csv("datanew.csv")

demographic_att = ['AGE','GENDER','NEGERI','Pekerjaan Utama','Job Sector Previously','Marital Status','Tinggal ','Number of People Employed in Household','total_income']
health_att = ['Smoking','Rokok Sehari', 'Bekas Perokok - Tahun Berhenti', 'Jika Kurang 1 Tahun Berapa Batang', 'Minum Alkohol','ADL','WHODAS_baseline']
social_att = ['sumLubben','Neighbourhood - General Feel', 'Average Total Neighbourhood','Total Social Cohesion Scale ', 'TMOSSF (Informational)',
              'TMOSSF (Tangible Support)','TMOSSF (Affective Support)',
              'TMOSSF (Positive Social Interaction)']
psychology_att = ['Quality Of Life', 'Total SWLS','Total_EpQ(Average)','Total_Loneliness ', 'total_perceived', 'c_total_perceived','total_flourishing','c_total_flourishing']
all_att = demographic_att+health_att+social_att+psychology_att

MMSE = df["MMSE"]
GDS = df["GDS-15"]

thisdict = {
    "Severe": 0,
    "Mild": 1,
    "Normal": 2
}
MMSE= df['MMSE'].map(thisdict)

dd = df[demographic_att]
dh = df[health_att]
ds = df[social_att]
dp = df[psychology_att]

final_demographic = pd.get_dummies(dd)
final_health = pd.get_dummies(dh)
final_social = pd.get_dummies(ds)
final_psychology = pd.get_dummies(dp)

all_att = final_demographic+final_health+final_social+final_psychology
final_df = pd.concat([final_demographic,final_health,final_social,final_psychology],axis=1)

final_demographic = final_demographic[['total_income','AGE','Marital Status_Balu/Duda','NEGERI_Kelantan','GENDER_Lelaki','NEGERI_Selangor','Job Sector Previously_Public Sector','GENDER_Perempuan','Marital Status_Berkahwin','Tinggal _Sendirian']]
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

#pickling the model
clf = DecisionTreeClassifier(max_depth = 6,random_state = 0)
partition_DT(0.02, final_demographic , MMSE) #Application of the model 
pickle.dump(clf, open('./models/Mclassifier.pkl', 'wb'))

#pickling the model
clf = DecisionTreeClassifier(max_depth = 6,random_state = 0)
partition_DT(0.33, final_demographic , GDS) #Application of the model 
pickle.dump(clf, open('./models/Gclassifier.pkl', 'wb'))
