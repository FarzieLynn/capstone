import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './stylesheets/MentalHealth.css'

const MentalHealth = () => {
    const navigate = useNavigate();
    var finalAnswer = 0;
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
        alert('Your answers have been submitted.  Thank you!')
        decide();
    }

    const decide = () => {
        finalAnswer = answers.reduce((a,b) => a+b, 0)
        if(finalAnswer <= 4){
            console.log('none')
        } else if(finalAnswer >= 5 && finalAnswer <= 9) {
            console.log('mild')
        } else if(finalAnswer >= 10 && finalAnswer <= 14) {
            console.log('Moderate')
        } else if(finalAnswer >= 15 && finalAnswer <= 19) {
            console.log('Moderately Severe')
        } else {
            console.log('severe')
        }
    }

    return (
        <div className='quiz'>
            <div className='text-center questions position-relative top-0 start-50 translate-middle-x'>
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
                <div className='test-center position-relative quiz'>
                    <button className='btn btn-dark pageBtn m-2' onClick={() => submit()} disabled={!allQuestionsAnswered()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default MentalHealth;