import './stylesheets/Calculator.css'
import { Container, Col, Row } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const FinanceCalculator = () => {
    const initialRetirementAge = Number(localStorage.getItem("retirementAge") || 72);
    const initialTargetRetAmt = Number(localStorage.getItem("targetRetAmt") || 0);
    const initialAnnualRetExp = Number(localStorage.getItem("annualRetExp") || 0);
    const initialCurrentAge = Number(localStorage.getItem("currentAge") || 35);
    const initialCurrentSavings = Number(localStorage.getItem("currentSavings") || 10000);
    const initialContributions = Number(localStorage.getItem("contributions") || 500);
    const initialContributionFreq = Number(localStorage.getItem("contributionFreq") || "Monthly");
    const initialPreRetROR = Number(localStorage.getItem("preRetROR") || 7);
    const initialPostRetROR = Number(localStorage.getItem("postRetROR") || 7);
    const initialInflation = Number(localStorage.getItem("inflation") || 2.9);

    const [retirementAge, setRetirementAge] = useState(initialRetirementAge);
    const [targetRetAmt, setTargetRetAmt] = useState(initialTargetRetAmt);
    const [annualRetExp, setAnnualRetExp] = useState(initialAnnualRetExp);
    const [currentAge, setCurrentAge] = useState(initialCurrentAge);
    const [currentSavings, setCurrentSavings] = useState(initialCurrentSavings);
    const [contributions, setContributions] = useState(initialContributions);
    const [contributionFreq, setContributionFreq] = useState(initialContributionFreq);
    const [preRetROR, setPreRetROR] = useState(initialPreRetROR);
    const [postRetROR, setPostRetROR] = useState(initialPostRetROR);
    const [inflation, setInflation] = useState(initialInflation);
    const [balArr, setBalArr] = useState([])
    const [data, setData] = useState([])
    const [retirementRank, setRetirementRank] = useState()
    const payscale = [
        {
            rank: 'E-5',
            pay: 3874.80
        },
        {
            rank: 'E-6',
            pay: 4616.40
        },
        {
            rank: 'E-7',
            pay: 5473.20
        },
        {
            rank: 'E-8',
            pay: 6130.20
        },
        {
            rank: 'E-9',
            pay: 7102.80
        },
        {
            rank: 'O-1E',
            pay: 5682.60
        },
        {
            rank: 'O-2E',
            pay: 6715.80
        },
        {
            rank: 'O-3E',
            pay: 8421.00
        },
        {
            rank: 'O-4',
            pay: 9210.30
        },
        {
            rank: 'O-5',
            pay: 10544.70
        },
        {
            rank: 'O-6',
            pay: 12050.40
        },
        {
            rank: 'O-7',
            pay: 14737.80
        },
        {
            rank: 'O-8',
            pay: 16298.10
        },
        {
            rank: 'O-9',
            pay: 17201.40
        },
        {
            rank: 'O-10',
            pay: 17675.10
        },
        {
            rank: 'W-1',
            pay: 6143.40
        },
        {
            rank: 'W-2',
            pay: 6517.20
        },
        {
            rank: 'W-3',
            pay: 7428.30
        },
        {
            rank: 'W-4',
            pay: 8087.70
        },
        {
            rank: 'W-5',
            pay: 8912.10
        }
]

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    })

    const TooltipContent = (props) => {
        if(!props.active || !props.payload){
            return
        }
        const tip = props.payload[0].payload
        return (
        <div style={{background: "black", padding: 5, color:"white"}}>
            <div>Age: {tip.Year}</div>
            <div>Balance: {tip.Balance}</div>
        </div>
        )
    }

    const calcRetirementAge = (updatedTargetRetAmt) => {
        const netPreRetROR = (preRetROR - inflation) / 100;
        let currBal = currentSavings;
        let arr = [];
        const annualCont = contributionFreq === "Annually" ? contributions : contributions * 12;
        let retAge = currentAge;
        while (currBal < updatedTargetRetAmt) {
            currBal = annualCont + currBal * (1 + netPreRetROR);
            let conversion = Math.round(currBal)
            arr.push({
                Year: retAge,
                Balance: conversion
            })
            retAge += 1;
            if (retAge > 200) break;
        }
        setData(arr)
        return retAge;
    }

    useEffect(() => {
        console.log(retirementRank)
        let offsetPay = 0;
        for(let i = 0; i < payscale.length; i++){
            if(retirementRank === payscale[i].rank){
                offsetPay = payscale[i].pay
            }
        }
        console.log(offsetPay)
    }, retirementRank)

    // const offsetExpenses = () => {
    //     console.log(retirementRank)
    //     let offsetPay = 0;
    //     for(let i = 0; i < payscale.length; i++){
    //         if(retirementRank === payscale[i].rank){
    //             offsetPay = payscale[i].pay
    //         }
    //     }
    //     console.log(offsetPay)
    // }

    useEffect(() => {
        localStorage.setItem("retirementAge", retirementAge);
        localStorage.setItem("targetRetAmt", targetRetAmt);
        localStorage.setItem("annualRetExp", annualRetExp);
        localStorage.setItem("currentAge", currentAge);
        localStorage.setItem("currentSavings", currentSavings);
        localStorage.setItem("contributions", contributions);
        localStorage.setItem("contributionFreq", contributionFreq);
        localStorage.setItem("preRetROR", preRetROR);
        localStorage.setItem("postRetROR", postRetROR);
        localStorage.setItem("inflation", inflation)
        let netPostRetROR = (postRetROR - inflation) / 100;
        if (netPostRetROR === 0 || netPostRetROR < 0) {
            netPostRetROR = 0.0000000001;
        }
        let updatedTargetRetAmt = annualRetExp / netPostRetROR;
        setTargetRetAmt(updatedTargetRetAmt);
        const retAge = calcRetirementAge(updatedTargetRetAmt);
        setRetirementAge(retAge);
    }, [annualRetExp,
        currentAge,
        currentSavings,
        contributions,
        contributionFreq,
        preRetROR,
        postRetROR,
        inflation,
        retirementAge,
        targetRetAmt])



    return (
        <Container>
            <Row>
                <Col>
                </Col>
                <Col xs={8}>
                    <h1>Financial Independence Calculator</h1>
                    <br></br>
                    <h2>You can retire at age {retirementAge}</h2>
                    <div>Target retirement amount: {formatter.format(targetRetAmt)}</div>
                    <form className='calc'>
                        <label>
                            Annual retirement expenses (today's dollars)
                            <input
                                type='number'
                                value={annualRetExp}
                                onChange={(e) => setAnnualRetExp(parseInt(e.target.value) || 0)}
                            />
                        </label>
                        <label>
                            Current Age
                            <input
                                type='number'
                                value={currentAge}
                                onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
                            />
                        </label>
                        <label>
                            Current savings balance
                            <input
                                type='number'
                                value={currentSavings}
                                onChange={(e) => setCurrentSavings(parseInt(e.target.value) || 0)}
                            />
                        </label>
                        <label>
                            Regular contributions
                            <input
                                type='number'
                                value={contributions}
                                onChange={(e) => setContributions(parseInt(e.target.value) || 0)}
                            />
                        </label>
                        <label>
                            Contribution frequency
                            <select
                                value={contributionFreq}
                                onChange={(e) => setContributionFreq(parseInt(e.target.value) || 0)}
                            >
                                <option value='Monthly'>Monthly</option>
                                <option value='Annually'>Annually</option>
                            </select>
                        </label>
                        <div>
                            <h2>Advanced</h2>
                            <label>Pre-retirement rate of return
                                <input
                                    type='number'
                                    value={preRetROR}
                                    onChange={(e) => setPreRetROR(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <label>Post-retirement rate of return
                                <input
                                    type='number'
                                    value={postRetROR}
                                    onChange={(e) => setPostRetROR(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <label>Inflation
                                <input
                                    type='number'
                                    value={inflation}
                                    onChange={(e) => setInflation(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <label>
                                Choose retirement rank
                            </label>
                            <select
                                value={retirementRank}
                                onChange={(e) => {
                                    setRetirementRank(e.target.value)
                                }}
                            >
                                <option value='E-5'>E-5</option>
                                <option value='E-6'>E-6</option>
                                <option value='E-7'>E-7</option>
                                <option value='E-8'>E-8</option>
                                <option value='E-9'>E-9</option>
                                <option value='O-1E'>O-1E</option>
                                <option value='O-2E'>O-2E</option>
                                <option value='O-3E'>O-3E</option>
                                <option value='O-4'>O-4</option>
                                <option value='O-5'>O-5</option>
                                <option value='O-6'>O-6</option>
                                <option value='O-7'>O-7</option>
                                <option value='O-8'>O-8</option>
                                <option value='O-9'>O-9</option>
                                <option value='O-10'>O-10</option>
                                <option value='W-1'>W-1</option>
                                <option value='W-2'>W-2</option>
                                <option value='W-3'>W-3</option>
                                <option value='W-4'>W-4</option>
                                <option value='W-5'>W-5</option>
                            </select>
                        </div>
                    </form>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <ResponsiveContainer width={"100%"} aspect={2}>
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<TooltipContent />} />
                        <Legend />
                        <XAxis dataKey={"Year"} />
                        <YAxis width={120} tickFormatter={(value) => formatter.format(value)} type={(value) => formatter.format(value)} />
                        <Area type="monotone" dataKey="Balance" stroke="#8884d8" fillOpacity={0.7} fill="green" />
                    </AreaChart>
                </ResponsiveContainer>
            </Row>
        </Container>
    )
}

export default FinanceCalculator