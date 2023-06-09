import { useState, useRef, useContext } from 'react'
import MentalScore from './MentalScore'
import MentalResults from './MentalResults'
import './stylesheets/MentalHealth.css'
import { AppContext } from '../App'
import cookie from 'cookie';



const MentalHealth = () => {

    let mentalRef = useRef({})
    var finalAnswer = 0;
    const { user, url } = useContext(AppContext);



    const questions = [
        {
            question: 'Little interest or pleasure in doing things',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Feeling down, depressed, or hopeless',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Trouble falling or staying asleep',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Feeling tired or having little energy',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Poor appetite or overeating',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Feeling bad about yourself... or that you are a failure or have let yourself or your family down',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Trouble concentrating on things, such as reading the newspaper or watching television',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Moving or speaking so slowly that other people could have noticed. Or the opposite... being so figety or restless that you have been moving around a lot more than usual',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        },
        {
            question: 'Thoughts that you would be better off dead, or of hurting yourself',
            answer: [
                {
                    label: 'Never', value: 1
                },
                {
                    label: 'Sometimes', value: 2
                },
                {
                    label: 'Frequently', value: 3
                },
                {
                    label: 'Always', value: 4
                }
            ]
        }
    ]

    const [answers, setAnswers] = useState([]);
    const allQuestionsAnswered = () => {
        return answers.length === questions.length && answers.every((selection) => selection !== null)
    }

    const submit = () => {
        decide();
    }

    const decide = () => {
        finalAnswer = answers.reduce((a, b) => a + b, 0)
        if(user.publicData !== undefined) insertScore(finalAnswer);
        if (finalAnswer <= 4) {
            setTreatment('Good')
        } else if (finalAnswer >= 5 && finalAnswer <= 9) {
            setTreatment('Mild')
        } else if (finalAnswer >= 10 && finalAnswer <= 14) {
            setTreatment('Moderate')
        } else if (finalAnswer >= 15 && finalAnswer <= 19) {
            setTreatment('Moderately Severe')
        } else {
            setTreatment('Severe')
        }
    }

    const insertScore = (score) => {
        const token = cookie.parse(document.cookie).access_token;
        fetch(`${url}/users/scores/${user.publicData.id}/${score}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err));
    }

    const [isShown, setIsShown] = useState(false);
    const [treatment, setTreatment] = useState('');
    const clickHandler = () => {
        submit();
        setIsShown(true)
    }



    return (

                    <div ref={mentalRef} className='quiz'id="mental">
                        <div  id='top' className='text-center questions position-relative top-0 start-50 translate-middle-x'>
                        <div id="MentalHealth" className="MentalHealth-header">
                            <h2 className='heading'>Please answer the following regarding your mental well-being:</h2><br></br>
                            {questions.map((q, i) => (
                                <div key={i} className='questions'>
                                    <h5>{q.question}</h5>
                                    <div className='btn-group m-3' role="group">
                                        {q.answer.map((a, j) => (
                                            <div key={j}>
                                                <input className='btn-check' id={`${i}-${j}`} name={i} type='radio' value={a.value} onChange={(e) => setAnswers([...answers.slice(0, i), e.target.checked ? a.value : null, ...answers.slice(i+1)])} />
                                                <label className='inputBtn btn btn-outline-dark m-1' htmlFor={`${i}-${j}`} key={j}>
                                                    {a.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            </div>
                            <button className='btn btn-dark pageBtn m-2' onClick={() => clickHandler()} disabled={!allQuestionsAnswered()}>Submit</button>
                            </div>
                            <div className='text-center questions position-relative top-0 start-50 translate-middle-x'>

                        <div className='test-center position-relative quiz'>
                         
                        {isShown && <MentalScore score={`${treatment}`}/> && <MentalResults score={`${treatment}`}/>}
                            </div>
                    </div>
                    </div>
              
    )
}

export default MentalHealth;

