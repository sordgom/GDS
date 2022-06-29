import { useState } from 'react'
import axios from 'axios'
import "./form.css"

function Psychology(){
    const [QOL, setQol ] = useState('')
    const [SWLS, setSwls ] = useState('')
    const [EPQ, setEpq ] = useState('')
    const [Loneliness, setLoneliness ] = useState('')
    const [result, setResult] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = {  QOL,
            SWLS,
            EPQ,
            Loneliness,}

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
        setQol('')
        setSwls('')
        setEpq('')
        setLoneliness('')
    }

    return (
        <div className="psychology">
        <form onSubmit={(e) => handleSubmit(e)} className="form">

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
        </form>
        </div>
    )
}
export default Psychology