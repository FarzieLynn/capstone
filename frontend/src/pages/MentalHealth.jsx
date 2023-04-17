import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MentalScore from './MentalScore'
import './stylesheets/MentalHealth.css'
import BasicDocument from './BasicDocument'
import { Page, Text, Image, Document, Stylesheet, PDFDownloadLink } from '@react-pdf/renderer'


const MentalHealth = () => {
    const navigate = useNavigate();
    let mentalRef = useRef({})
    var finalAnswer = 0;



    const handleGeneratePdf = () => {

    }
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
            setTreatment('Good')
        } else if(finalAnswer >= 5 && finalAnswer <= 9) {
            setTreatment('Mild')
        } else if(finalAnswer >= 10 && finalAnswer <= 14) {
            setTreatment('Moderate')
        } else if(finalAnswer >= 15 && finalAnswer <= 19) {
            setTreatment('Moderately Severe')
        } else {
            setTreatment('Severe')
        }
    }
    const [isShown, setIsShown] = useState(false);
    const [treatment, setTreatment] = useState('');
    const [isLoaded, setLoaded] = useState(false)
    const showScore = () => {
        
    }
    const clickHandler = () => {
        submit();
        setIsShown(true)
    }
    const styles = StyleSheet.create({ body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: "center",
      },
      text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
      },
      image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
      },
      pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
      },})
    return (
        
        <Document>
            <Page>
                <Text>
                    <div ref={mentalRef} className='quiz'>
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
                                <button className='btn btn-dark pageBtn m-2' onClick={() => clickHandler()} disabled={!allQuestionsAnswered()}>Submit</button> {isShown && <MentalScore score={`${treatment}`}/>}
                                <PDFDownloadLink document={<MentalHealth />} fileName="Form">
                                {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
                                </PDFDownloadLink>
                                
                            </div>
                        </div>
                    </div>
                </Text>
                <Text 
                render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
                fixed/> 
            </Page>
        </Document>
    )
}

export default MentalHealth;

//const handleGeneratePdf = async () => {
	// 	var doc = new jsPDF({
    //         orientation: 'p',
    //         unit: 'pt',
    //         format: 'c3',
    //         putOnlyUsedFonts:true,
    //         compress:true,
    //         precision: 1
    //        });
    //     await doc.setDisplayMode('original', 'single', 'FullScreen')
	// 	// Adding the fonts.
	// 	await doc.setFont('Inter-Regular', 'normal');

	// 	await doc.html(mentalRef.current, {
	// 		async callback(doc) {
	// 			await doc.save('document');
	// 		},
	// 	});
	// };