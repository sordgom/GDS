# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
Mmodel = pickle.load(open('./Mclassifier.pkl', 'rb'))
Gmodel = pickle.load(open('./Gclassifier.pkl','rb'))

# Defining the model input types
class Candidate(BaseModel):
    age: int
    gender: int
    state:int
    jobSector:int 
    prevJobSector:int
    marital:int
    livingStatus:int
    smoking: int
    alcohol: int
    adl: int
    whodas: int
    sumLubben: int 
    neighbourhood: int 
    cohesionScale: int 
    MF1: int 
    MF2: int 
    MF3: int
    MF4: int 
    QOL: int 
    SWLS: int 
    EPQ: int 
    Loneliness: int 
    

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to MMSE prediction model"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: Candidate):
    sample = [[
        data.age,
        data.gender,
        data.state,
        data.jobSector ,
        data.prevJobSector,
        data.marital,
        data.livingStatus,
        data.smoking,
        data.alcohol,
        data.adl,
        data.whodas,
        data.sumLubben,
        data.neighbourhood ,
        data.cohesionScale,
        data.MF1,
        data.MF2,
        data.MF3,
        data.MF4,
        data.QOL,
        data.SWLS,
        data.EPQ,
        data.Loneliness
    ]]
    MMSE = Mmodel.predict(sample).tolist()[0]
    GDS = Gmodel.predict(sample).tolist()[0]
    return {
        "data": {
            'MMSEprediction': MMSE,
            'MMSEinterpretation': "Severe" if MMSE==0 else "Mild" if MMSE==1 else "Normal",
            'GDSprediction':GDS,
            'GDSinterpretation': "Normal" if GDS<6 else "Depression"
        }
    }

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')