import './form.css'
import { useState } from 'react'
import axios from 'axios'

function Features() { 
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [state, setState] = useState('')
    const [jobSector, setJob] = useState('')
    const [prevJobSector, setPrevJob] = useState('')
    const [marital, setMarital] = useState('')
    const [livingStatus, setLivingStatus] = useState('')
    const [smoking, setSmoking]=useState('')
    const [alcohol, setAlcohol]=useState('')
    const [adl, setAdl]=useState('')
    const [whodas, setWhodas]=useState('')
    const [QOL, setQol ] = useState('')
    const [SWLS, setSwls ] = useState('')
    const [EPQ, setEpq ] = useState('')
    const [Loneliness, setLoneliness ] = useState('')
    const [sumLubben , setSumLubben] = useState('')
    const [neighbourhood, setNeighbourhood] = useState('')
    const [cohesionScale, setCohesionScale] = useState('')
    const [MF1 , setMF1] = useState('')
    const [MF2 , setMF2] = useState('')
    const [MF3, setMF3] = useState('')
    const [MF4 , setMF4] = useState('')
    const [result, setResult] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = { age, gender, state, jobSector, prevJobSector, marital, livingStatus , smoking, alcohol, adl, whodas, QOL,
            SWLS,
            EPQ,
            Loneliness,sumLubben,
            neighbourhood,
            cohesionScale,
            MF1,
            MF2,
            MF3,
            MF4}

        axios
        .post('http://localhost:8080/prediction', params)
        .then((res) => {
            const data = res.data.data
            const parameters = JSON.stringify(params)
            setResult(data)
            reset()
        })
        .catch((error) => alert(`Error: ${error.message}`))
    }

    const reset = () => {
        setAge('')
        setGender('')
        setState('')
        setJob('')
        setPrevJob('')
        setMarital('')
        setLivingStatus('')
        setSmoking('')
        setAlcohol('')
        setAdl('')
        setWhodas('')
        setQol('')
        setSwls('')
        setEpq('')
        setLoneliness('')
        setSumLubben('')
        setNeighbourhood('')
        setCohesionScale('')
        setMF1('')
        setMF2('')
        setMF3('')
        setMF4('')
    }

    return (
        <div className="demographic">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
            <h4>Demographic status form</h4>

            <div className="form__group">
            <input
                id="age"
                className="form__input"
                placeholder="Age"
                required
                autoFocus
                pattern="[0-9]{0,1}"
                title="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="gender"
                className="form__input"
                placeholder="Gender (1 = Female or 2 = Male)"
                required
                autoFocus
                min="1"
                max="2"
                pattern="[0-9]{0,1}"
                title="Gender must either be (1 = Female or 2 = Male)"
                type="number"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="state"
                className="form__input"
                placeholder="State 
                (1= Johor
                    2= Perak
                    3 = Kelantan
                    4 = Selangor
                    5 = Wilayah Persekutuan
                )"
                required
                autoFocus
                min="1"
                max="5"
                pattern="[0-9]{0,1}"
                title="State must be 1 to 5"
                type="number"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="job_sector"
                className="form__input"
                placeholder="Job profession (1. Manager
                    2. Profesional
                    3. Technicians
                    4. Clerical
                    5. Sales and Service
                    6. Jobs Skilled
                    7. Craft and Trades
                    8. Plant and Machine Operators
                    9. Basic Jobs
                    10. Military)"
                required
                autoFocus
                min="1"
                max="10"
                pattern="[0-9]{0,1}"
                title="Job profession must be between 1-10"
                type="number"
                value={jobSector}
                onChange={(e) => setJob(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="job_prev_sector"
                className="form__input"
                placeholder="Previous job sector (1. Public Sector
                    2. NGO
                    3. Private Sector
                    4. Self)"
                required
                autoFocus
                min="1"
                max="4"
                pattern="[0-9]{0,1}"
                title="Sector must either be between 1-4"
                type="number"
                value={prevJobSector}
                onChange={(e) => setPrevJob(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="marital"
                className="form__input"
                placeholder="Marital status (1=Bujang
                    2=Berkahwin
                    3=Bercerai
                    4= Balu/Duda)"
                required
                autoFocus
                min="1"
                max="4"
                pattern="[0-9]{0,1}"
                title="Marital status must be between 1-4"
                type="number"
                value={marital}
                onChange={(e) => setMarital(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="living_status"
                className="form__input"
                placeholder="Living status (1=Sendirian
                    2=Bersama Orang Lain)"
                required
                autoFocus
                min="1"
                max="2"
                pattern="[0-9]{0,1}"
                title="Living status must either be (1=Sendirian or
                    2=Bersama Orang Lain)"
                type="number"
                value={livingStatus}
                onChange={(e) => setLivingStatus(e.target.value)}
            />
            </div>
           
            <h4>health status form</h4>

            <div className="form__group">
            <input
                id="smoking"
                className="form__input"
                placeholder="Smoking (1=Merokok
                    2= Bekas Perokok
                    3=Tidak Merokok)"
                required
                autoFocus
                min="1"
                max="3"
                pattern="[0-9]{0,1}"
                title="Smoking should be between 1-3"
                type="number"
                value={smoking}
                onChange={(e) => setSmoking(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="alcohol"
                className="form__input"
                placeholder="Alcohol (1=No 2=Yes)"
                required
                autoFocus
                min="1"
                max="2"
                pattern="[0-9]{0,1}"
                title="Alcohol must be 1 or 2"
                type="number"
                value={alcohol}
                onChange={(e) => setAlcohol(e.target.value)}
            />
            </div>
            <div className="form__group">
            <input
                id="adl"
                className="form__input"
                placeholder="Adl (0 -> 6)"
                required
                autoFocus
                min='0'
                max='6'
                pattern="[0-9]{0,1}"
                title="Adl must be between 0 to 6"
                type="number"
                value={adl}
                onChange={(e) => setAdl(e.target.value)}
            />
            </div>
            <div className="form__group">
            <input
                id="whodas"
                className="form__input"
                placeholder="Whodas (0 = None
                    1 = Some
                    2 = Moderate
                    3= Serious
                    4= Very Serious
                    5= Not Relevant)"
                required
                autoFocus
                min='0'
                max='5'
                pattern="[0-9]{0,1}"
                title="Whodas must be between 0 and 5"
                type="number"
                value={whodas}
                onChange={(e) => setWhodas(e.target.value)}
            />
            </div>

            <h4>psychology status form</h4>


            <div className="form__group">
            <input
                id="QOL"
                className="form__input"
                placeholder="Quality of life ( 0-> 2)"
                required
                autoFocus
                min='0'
                max='2'
                pattern="[0-9]{0,1}"
                title="QOL (0->2)"
                type="number"
                value={QOL}
                onChange={(e) => setQol(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="SWLS"
                className="form__input"
                placeholder="SWLS ( 0:Disagree 1:Neutral 2:Agree)"
                required
                autoFocus
                min='0'
                max='2'
                pattern="[0-9]{0,1}"
                title="SWLS ( 0:Disagree 1:Neutral 2:Agree)"
                type="number"
                value={SWLS}
                onChange={(e) => setSwls(e.target.value)}
            />

            </div>
            <div className="form__group">
            <input
                id="EPQ"
                className="form__input"
                placeholder="EPQ (1 = Yes
                    0 = No)"
                required
                autoFocus
                min='0'
                max='1'
                pattern="[0-9]{0,1}"
                title="EPQ (0 OR 1)"
                type="number"
                value={EPQ}
                onChange={(e) => setEpq(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="Loneliness"
                className="form__input"
                placeholder="Loneliness (1 = Hardly ever
                    2 = Some of the time
                    3 = Often)"
                required
                autoFocus
                min='1'
                max='3'
                pattern="[0-9]{0,1}"
                title="Loneliness (1->3)"
                type="number"
                value={Loneliness}
                onChange={(e) => setLoneliness(e.target.value)}
            />
            </div>

            <h4>social status form</h4>

            <div className="form__group">
            <input
                id="sumLubben"
                className="form__input"
                placeholder="SumLubben (0 - 2 = Less Social Engagement
                    3 - 5 = More Social Engagement)"
                required
                autoFocus
                min="0"
                max="5"
                pattern="[0-9]{0,1}"
                title="SumLubben should be between 0 and 5"
                type="number"
                value={sumLubben}
                onChange={(e) => setSumLubben(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="neighbourhood"
                className="form__input"
                placeholder="neighbourhood Fee (1 = Very Bad
                    2 = Fairly Bad
                    3 = Fairly good
                    4 = Very good)"
                required
                autoFocus
                min="1"
                max="4"
                pattern="[0-9]{0,1}"
                title="Fee must be 1-4"
                type="number"
                value={neighbourhood}
                onChange={(e) => setNeighbourhood(e.target.value)}
            />
            </div>

            <div className="form__group">
                <input
                    id="cohesion"
                    className="form__input"
                    placeholder="Cohesion scale (1. Strongly Disagree
                        2. Disagree
                        3. Neither agree nor disagree
                        4. Agree
                        5. Strongly Agree)"
                    required
                    autoFocus
                    min='1'
                    max='5'
                    pattern="[0-9]{0,1}"
                    title="Cohesion scale must be (1->5)"
                    type="number"
                    value={cohesionScale}
                    onChange={(e) => setCohesionScale(e.target.value)}
                />
            </div>

            <div className="form__group">
            <input
                id="MS1"
                className="form__input"
                placeholder="Medical outcome study social factor Informational(0 = None of the time
                    1 = Some of the time
                    2 = Most of the time
                    3 = All of the time)"
                required
                autoFocus
                min='0'
                max='3'
                pattern="[0-9]{0,1}"
                title="MOSSF (0->3)"
                type="number"
                value={MF1}
                onChange={(e) => setMF1(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="MS2"
                className="form__input"
                placeholder="Medical outcome study social factor Tangible support (0 = None of the time
                    1 = Some of the time
                    2 = Most of the time
                    3 = All of the time)"
                required
                autoFocus
                min='0'
                max='3'
                pattern="[0-9]{0,1}"
                title="MOSSF (0->3)"
                type="number"
                value={MF2}
                onChange={(e) => setMF2(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="MS3"
                className="form__input"
                placeholder="Medical outcome study social factor Affective support (0 = None of the time
                    1 = Some of the time
                    2 = Most of the time
                    3 = All of the time)"
                required
                autoFocus
                min='0'
                max='3'
                pattern="[0-9]{0,1}"
                title="MOSSF (0->3)"
                type="number"
                value={MF3}
                onChange={(e) => setMF3(e.target.value)}
            />
            </div>

            <div className="form__group">
            <input
                id="MS4"
                className="form__input"
                placeholder="Medical outcome study social factor Interaction(0 = None of the time
                    1 = Some of the time
                    2 = Most of the time
                    3 = All of the time)"
                required
                autoFocus
                min='0'
                max='3'
                pattern="[0-9]{0,1}"
                title="MOSSF (0->3)"
                type="number"
                value={MF4}
                onChange={(e) => setMF4(e.target.value)}
            />
            </div>

            <div className="form__group">
            <button type="submit" className="form__btn">
                Submit
            </button>
            </div>

        </form>
        <div className="form__result">
            <h4>MMSE Prediction: {result.MMSEinterpretation}</h4>
            <h4>GDS Prediction: {result.GDSinterpretation}</h4>
        </div>
        </div>
    )
}

export default Features