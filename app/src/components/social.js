import { useState } from 'react'
import axios from 'axios'
import "./form.css"

function Social(){
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
        const params = {  sumLubben,
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
            const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`
            setResult(data.interpretation)
            reset()
        })
        .catch((error) => alert(`Error: ${error.message}`))
    }

    const reset = () => {
        setSumLubben('')
        setNeighbourhood('')
        setCohesionScale('')
        setMF1('')
        setMF2('')
        setMF3('')
        setMF4('')
    }

    return (
        <div className="social">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
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
        
        </form>    
        </div>
    )
}

export default Social
