import { useState } from 'react'
import axios from 'axios'
import "./form.css"

function Health() { 
    const [smoking, setSmoking]=useState('')
    const [alcohol, setAlcohol]=useState('')
    const [adl, setAdl]=useState('')
    const [whodas, setWhodas]=useState('')
    const [result, setResult] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = { smoking, alcohol, adl, whodas}

        axios
        .post('http://localhost:8080/prediction', params)
        .then((res) => {
            const data = res.data.data
            const parameters = JSON.stringify(params)
            const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`
            setResult(data.interpretation)
            reset()
        })
        .catch((error) => alert(`Error: ${error.message}`))
    }

    const reset = () => {
        setSmoking('')
        setAlcohol('')
        setAdl('')
        setWhodas('')
    }

    return (
        <div className="health">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
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
        </form>    
        </div>
    )
}

export default Health