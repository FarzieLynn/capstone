import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Finance.css'

export const Finance = () => {
    const navigate = useNavigate();
    const questions = [
        {
            question: 'What level of experience do you have with financial planning?',
            answer: [
                {
                    label: 'I have never looked into it.', value: 1
                },
                {
                    label: 'I have dabbled with some of it', value: 2
                },
                {
                    label: 'I have a decent amount of experience/education on it.', value: 3
                },
                {
                    label: 'I have a lot of experience and/or education.', value: 4
                },
                {
                    label: 'I consider myself an expert.', value: 5
                }
            ]
        },
        {
            question: 'Have you set any financial long term goals?',
            answer: [
                {
                    label: 'I have not set any goals.', value: 1
                },
                {
                    label: 'I have thought about a few.', value: 2
                },
                {
                    label: 'I have a well thought out plan', value: 3
                }
            ]
        },
        {
            question: 'Have you set any financial short term goals?',
            answer: [
                {
                    label: 'I have not set any goals.', value: 1
                },
                {
                    label: 'I have thought about a few.', value: 2
                },
                {
                    label: 'I have a well thought out plan.', value: 3
                }
            ]
        },
        {
            question: 'How do you describe your knowledge about personal finance?',
            answer: [
                {
                    label: 'Basic', value: 1
                },
                {
                    label: 'Novice', value: 2
                },
                {
                    label: 'Intermediate', value: 3
                },
                {
                    label: 'Advanced', value: 4
                },
                {
                    label: 'Expert', value: 5
                }
            ]
        },
        {
            question: 'How important is it for you to save for retirement?',
            answer: [
                {
                    label: 'I am not sure', value: 1
                },
                {
                    label: 'Not at all important', value: 2
                },
                {
                    label: 'Not so important', value: 3
                },
                {
                    label: 'Somewhat important', value: 4
                },
                {
                    label: 'Extremely important', value: 5
                }
            ]
        },
        {
            question: 'Do you have a will?',
            answer: [
                {
                    label: 'No', value: 1
                },
                {
                    label: 'Yes', value: 2
                }
            ]
        },
        {
            question: 'Do you invest in the Thrift Saving Plan?',
            answer: [
                {
                    label: 'No', value: 1
                },
                {
                    label: 'Yes - minimal', value: 2
                },
                {
                    label: 'Yes - a moderate amount', value: 3
                },
                {
                    label: 'Yes - a high amount', value: 4
                },
                {
                    label: 'Yes - the maximum allowable', value: 5
                }
            ]
        },
        {
            question: 'Before I buy something, I carefully consider if I can afford it.',
            answer: [
                {
                    label: 'Completely disagree', value: 1
                },
                {
                    label: 'Somewhat disagree', value: 2
                },
                {
                    label: 'Neutral', value: 3
                },
                {
                    label: 'Somewhat agree', value: 4
                },
                {
                    label: 'Completely agree', value: 5
                }
            ]
        },
        {
            question: 'I pay my bills on time',
            answer: [
                {
                    label: 'Rarely', value: 1
                },
                {
                    label: 'Every now and then', value: 2
                },
                {
                    label: 'About half of them', value: 3
                },
                {
                    label: 'Most of the time', value: 4
                },
                {
                    label: 'All of the time', value: 5
                }
            ]
        },
        {
            question: 'I could tell you right now without looking how much I paid in credit card interest last month',
            answer: [
                {
                    label: 'I do not know', value: 1
                },
                {
                    label: 'I know one or two of them', value: 2
                },
                {
                    label: 'I know about half', value: 3
                },
                {
                    label: 'I know most of my credit card interest and what it cost me', value: 4
                },
                {
                    label: 'I am fully aware of interest charges against me by my credit cards', value: 5
                }
            ]
        },
        {
            question: 'If you lose your main source of income, how long could you continue to cover living expenses without borrowing money?',
            answer: [
                {
                    label: 'Less than a week', value: 1
                },
                {
                    label: 'At least a week, but less than a month', value: 2
                },
                {
                    label: 'At least one month, but not three months', value: 3
                },
                {
                    label: 'At least three months, but not six months', value: 4
                },
                {
                    label: 'More than six months', value: 5
                }
            ]
        },
        {
            question: 'In the past 12 months, in what ways have you been saving money?',
            answer: [
                {
                    label: 'Have not been actively saving', value: 1
                },
                {
                    label: 'Saving cash at home or in your wallet', value: 2
                },
                {
                    label: 'Building a balance in your bank account', value: 3
                },
                {
                    label: 'Putting money into a savings account', value: 4
                },
                {
                    label: 'Buying financial investment products (stocks, bonds, investment trusts, etc.)', value: 5
                }
            ]
        }
    ]

    const [answers, setAnswers] = useState()
    const allQuestionsAnswered = () => {
        return answers.length === questions.length  && answers.every((selection) => selection !== null)
    }

    return (
        <div className='quiz'>
            <div className='text-center questions position-absolute top-0 start-50 translate-middle-x'>
                <h2 className='heading'>Please answer the following regarding your financial well-being:</h2>
                {questions.map((q,i) => {
                    <div className='questions'>
                        <h5>{q.question}</h5>
                        <div key={i} className='btn-group-verticle m-3' role="group">
                            {q.answer.map((a, j) => {
                                <div>
                                    <input className='btn-check' name={i} id={`${i}-${j}`} type='radio' value={a.value} checked={answers[i] === a.value} onChange={(e) => setAnswers([...answers.slice(0, i), e.target.checked ? a.value : null,...answers.slice(i + 1)])}/>
                                    <label className='inputBtn btn btn-outline-dark m-1' htmlFor={`${i}-${j}`} key={j}>
                                        {a.label}
                                    </label>
                                </div>
                            })}
                        </div>
                    </div>
                })}
                <div className='test-center position-relative quiz'>
                    <button className='btn btn-dark pageBtn m-2' disabled={!allQuestionsAnswered()}>Submit</button>
                </div>
            </div>
        </div>
    )
}