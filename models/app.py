import streamlit as st
import pandas as pd
import pickle
import numpy as np

#Index(['total_income', 'AGE', 'Marital Status_Balu/Duda', 'NEGERI_Kelantan','GENDER_Lelaki', 'NEGERI_Selangor', 
# 'Job Sector Previously_Public Sector', 'GENDER_Perempuan','Marital Status_Berkahwin', 'Tinggal _Sendirian'],dtype='object')
# Loading up the trained model
Mmodel = pickle.load(open('./models/Mclassifier.pkl', 'rb'))
Gmodel = pickle.load(open('./models/Gclassifier.pkl','rb'))

st.title("Welcome to MMSE and GDS-15 Prediction")
st.write("""## We need some information to predict the MMSE and GDS-15""")

st.markdown("""
        <style>
        .css-15zrgzn {display: none}
        .css-eczf16 {display: none}
        .css-jn99sy {display: none}
        </style>
        """, unsafe_allow_html=True)

#demographic features

st.write("""### Demographic status form""")

age = st.number_input("Age",1,99)

df = pd.DataFrame({"gender_name": ["Female", "Male"], "gender_f": [1, 0], "gender_m": [0, 1]})
records = df.to_dict("records")
gender_data = st.selectbox("Select gender", options=records, format_func=lambda record: f'{record["gender_name"]}')
gender_fopt = gender_data.get('gender_f')
gender_mopt = gender_data.get('gender_m')

df = pd.DataFrame({"state_name": ["Johor","Perak", "Kelantan", "Selangor", "Wilayah Persekutuan"], "state_k": [0,0,1,0,0], "state_s": [0,0,0,1,0]})
records = df.to_dict("records")
state_data = st.selectbox("Select state", options=records, format_func=lambda record: f'{record["state_name"]}')
state_kopt = state_data.get('state_k')
state_sopt = state_data.get('state_s')

tm_income = st.number_input("Total monthly income (main + household + side)")

df = pd.DataFrame({"marital_name": ["Bujang", "Berkahwin", "Bercerai", "Balu/Duda"], "marital_bdopt": [0,0,0,1], "marital_bopt": [0,1,0,0]})
records = df.to_dict("records")
marital_data = st.selectbox("Select marital status", options=records, format_func=lambda record: f'{record["marital_name"]}')
marital_bdopt = marital_data.get('marital_bdopt')
marital_bopt = marital_data.get('marital_bopt')

psector = {1:"Public Sector", 0:"NGO", 0: "Private Sector", 0:"Self"}
psector_opt = st.selectbox("Select previous job sector:", psector.keys(), format_func=lambda x:psector[ x ])

living = {1:"Sendirian", 0:"Bersama Orang Lain"}
living_opt = st.selectbox("Select living status:", living.keys(), format_func=lambda x:living[ x ])

submit = st.button("Predict")

if submit:
    X = np.array([[tm_income,age,marital_bdopt,state_kopt,gender_mopt,state_sopt,psector_opt, gender_fopt,marital_bopt,living_opt]])
    MMSE = Mmodel.predict(X).tolist()[0]
    GDS = Gmodel.predict(X).tolist()[0]

    MMSEprediction = MMSE
    if MMSEprediction == 0: st.error("MMSE result is Severe")
    elif MMSEprediction == 1: st.warning("MMSE result is Mild")
    elif MMSEprediction == 2: st.success("MMSE result is Normal")
    else: st.write("Impossible") 
    
    GDSprediction = GDS
    if GDSprediction == 2: st.error("GDS result is Depression")
    else: st.success("GDS result is Normal")