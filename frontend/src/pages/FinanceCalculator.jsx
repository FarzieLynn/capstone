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
    const [data, setData] = useState([])
    const [retirementRank, setRetirementRank] = useState()
    const [activeDutyAge, setActiveDutyAge] = useState();
    const [yearsInService, setYearsInService] = useState();
    const [pension, setPension] = useState();
    const [retirementPercentage, setRetirementPercentage] = useState(0.5);
    const [newRetirementExpense, setNewRetirementExpense] = useState();
    const [newTargetRetAmt, setNewTargetRetAmt] = useState();
    const [retData, setRetData] = useState();
    const [newRetAge, setNewRetAge] = useState();
    const [VA, setVA] = useState(false);
    const [VAPercentage, setVAPercentage] = useState();
    const [dependents, setDependents] = useState(1);
    const [adtlChildren, setAdtlChildren] = useState(0);
    const [schoolChildren, setSchoolChildren] = useState(0);
    const [grown, setGrown] = useState(0);
    const [spouseAid, setSpouseAid] = useState(false);
    const [newRetirementExpenseWithVA, setNewRetirementExpenseWithVA] = useState(0);
    const [retAgeWithVA, setRetAgeWithVA] = useState();
    const [pensionWithVA, setPensionWithVA] = useState();
    const [targetRetAmtWithVA, setTargetRetAmtWithVA] = useState();
    const [retDataWithVA, setRetDataWithVA] = useState();
    const exportPdf = () => {

        window.print()
    }
    
    const vaStatus =
    {
        vetWithOneChild:
            [
                {
                    rating: 30,
                    amount: 548.05
                },
                {
                    rating: 40,
                    amount: 785.86
                },
                {
                    rating: 50,
                    amount: 1108.82
                },
                {
                    rating: 60,
                    amount: 1400.65
                },
                {
                    rating: 70,
                    amount: 1757.06
                },
                {
                    rating: 80,
                    amount: 2041.15
                },
                {
                    rating: 90,
                    amount: 2293.39
                },
                {
                    rating: 100,
                    amount: 3757.00
                }
            ],
        vetWithOneChildAndSpouse:
            [
                {
                    rating: 30,
                    amount: 612.05
                },
                {
                    rating: 40,
                    amount: 870.86
                },
                {
                    rating: 50,
                    amount: 1215.82
                },
                {
                    rating: 60,
                    amount: 1528.65
                },
                {
                    rating: 70,
                    amount: 1907.06
                },
                {
                    rating: 80,
                    amount: 2212.15
                },
                {
                    rating: 90,
                    amount: 2486.39
                },
                {
                    rating: 100,
                    amount: 3971.78
                }
            ],
        vetWithOneChildAndSpouseAndOneParent:
            [
                {
                    rating: 30,
                    amount: 660.05
                },
                {
                    rating: 40,
                    amount: 934.86
                },
                {
                    rating: 50,
                    amount: 1296.82
                },
                {
                    rating: 60,
                    amount: 1625.65
                },
                {
                    rating: 70,
                    amount: 2020.06
                },
                {
                    rating: 80,
                    amount: 2341.15
                },
                {
                    rating: 90,
                    amount: 2631.39
                },
                {
                    rating: 100,
                    amount: 4133.85
                }
            ],
        vetWithOneChildAndSpouseTwoParents:
            [
                {
                    rating: 30,
                    amount: 708.05
                },
                {
                    rating: 40,
                    amount: 998.86
                },
                {
                    rating: 50,
                    amount: 1377.82
                },
                {
                    rating: 60,
                    amount: 1722.65
                },
                {
                    rating: 70,
                    amount: 2133.06
                },
                {
                    rating: 80,
                    amount: 2470.15
                },
                {
                    rating: 90,
                    amount: 2776.39
                },
                {
                    rating: 100,
                    amount: 4295.92
                }
            ],
        vetWithOneChildOneParent:
            [
                {
                    rating: 30,
                    amount: 596.05
                },
                {
                    rating: 40,
                    amount: 849.86
                },
                {
                    rating: 50,
                    amount: 1189.82
                },
                {
                    rating: 60,
                    amount: 1497.65
                },
                {
                    rating: 70,
                    amount: 1870.06
                },
                {
                    rating: 80,
                    amount: 2170.15
                },
                {
                    rating: 90,
                    amount: 2438.39
                },
                {
                    rating: 100,
                    amount: 3919.07
                }
            ],
        vetWithOneChildTwoParents:
            [
                {
                    rating: 30,
                    amount: 644.05
                },
                {
                    rating: 40,
                    amount: 913.86
                },
                {
                    rating: 50,
                    amount: 1270.82
                },
                {
                    rating: 60,
                    amount: 1594.65
                },
                {
                    rating: 70,
                    amount: 1983.06
                },
                {
                    rating: 80,
                    amount: 2299.15
                },
                {
                    rating: 90,
                    amount: 2583.39
                },
                {
                    rating: 100,
                    amount: 4081.14
                }
            ],
        vetOnly:
            [
                {
                    rating: 30,
                    amount: 508.05
                },
                {
                    rating: 40,
                    amount: 731.86
                },
                {
                    rating: 50,
                    amount: 1041.82
                },
                {
                    rating: 60,
                    amount: 1319.65
                },
                {
                    rating: 70,
                    amount: 1663.06
                },
                {
                    rating: 80,
                    amount: 1933.15
                },
                {
                    rating: 90,
                    amount: 2172.39
                },
                {
                    rating: 100,
                    amount: 3621.95
                }
            ],
        vetWithSpouse:
            [
                {
                    rating: 30,
                    amount: 568.05
                },
                {
                    rating: 40,
                    amount: 811.86
                },
                {
                    rating: 50,
                    amount: 1141.82
                },
                {
                    rating: 60,
                    amount: 1440.65
                },
                {
                    rating: 70,
                    amount: 1804.06
                },
                {
                    rating: 80,
                    amount: 2094.15
                },
                {
                    rating: 90,
                    amount: 2353.39
                },
                {
                    rating: 100,
                    amount: 3823.89
                }
            ],
        vetWithSpouseAndOneParent:
            [
                {
                    rating: 30,
                    amount: 616.05
                },
                {
                    rating: 40,
                    amount: 875.86
                },
                {
                    rating: 50,
                    amount: 1222.82
                },
                {
                    rating: 60,
                    amount: 1537.65
                },
                {
                    rating: 70,
                    amount: 1917.06
                },
                {
                    rating: 80,
                    amount: 2223.15
                },
                {
                    rating: 90,
                    amount: 2498.39
                },
                {
                    rating: 100,
                    amount: 3985.96
                }
            ],
        vetWithSpouseAndTwoParents:
            [
                {
                    rating: 30,
                    amount: 664.05
                },
                {
                    rating: 40,
                    amount: 939.86
                },
                {
                    rating: 50,
                    amount: 1303.82
                },
                {
                    rating: 60,
                    amount: 1634.65
                },
                {
                    rating: 70,
                    amount: 2030.06
                },
                {
                    rating: 80,
                    amount: 2353.15
                },
                {
                    rating: 90,
                    amount: 2643.39
                },
                {
                    rating: 100,
                    amount: 4148.03
                }
            ],
        vetWithOneParent:
            [
                {
                    rating: 30,
                    amount: 556.05
                },
                {
                    rating: 40,
                    amount: 795.86
                },
                {
                    rating: 50,
                    amount: 1122.82
                },
                {
                    rating: 60,
                    amount: 1416.65
                },
                {
                    rating: 70,
                    amount: 1776.06
                },
                {
                    rating: 80,
                    amount: 2062.15
                },
                {
                    rating: 90,
                    amount: 2317.39
                },
                {
                    rating: 100,
                    amount: 3784.02
                }
            ],
        vetWithTwoParents:
            [
                {
                    rating: 30,
                    amount: 604.05
                },
                {
                    rating: 40,
                    amount: 859.86
                },
                {
                    rating: 50,
                    amount: 1203.82
                },
                {
                    rating: 60,
                    amount: 1513.65
                },
                {
                    rating: 70,
                    amount: 1889.06
                },
                {
                    rating: 80,
                    amount: 2191.15
                },
                {
                    rating: 90,
                    amount: 2462.39
                },
                {
                    rating: 100,
                    amount: 3946.09
                }
            ],
        adtlChildUnderAge:
            [
                {
                    rating: 30,
                    amount: 30
                },
                {
                    rating: 40,
                    amount: 40
                },
                {
                    rating: 50,
                    amount: 50
                },
                {
                    rating: 60,
                    amount: 60
                },
                {
                    rating: 70,
                    amount: 70
                },
                {
                    rating: 80,
                    amount: 80
                },
                {
                    rating: 90,
                    amount: 90
                },
                {
                    rating: 100,
                    amount: 100.34
                }
            ],
        adtlChildrenAtSchool:
            [
                {
                    rating: 30,
                    amount: 97
                },
                {
                    rating: 40,
                    amount: 129
                },
                {
                    rating: 50,
                    amount: 162
                },
                {
                    rating: 60,
                    amount: 194
                },
                {
                    rating: 70,
                    amount: 226
                },
                {
                    rating: 80,
                    amount: 259
                },
                {
                    rating: 90,
                    amount: 291
                },
                {
                    rating: 100,
                    amount: 324.12
                }
            ],
        spouseReceivingAid:
            [
                {
                    rating: 30,
                    amount: 56
                },
                {
                    rating: 40,
                    amount: 74
                },
                {
                    rating: 50,
                    amount: 93
                },
                {
                    rating: 60,
                    amount: 111
                },
                {
                    rating: 70,
                    amount: 130
                },
                {
                    rating: 80,
                    amount: 148
                },
                {
                    rating: 90,
                    amount: 167
                },
                {
                    rating: 100,
                    amount: 185.21
                }
            ]
    }
    
    const payscale = [
        {
            rank: 'E-5',
            pay: [
                {
                    years: 20,
                    amount: 3874.80
                },
                {
                    years: 22,
                    amount: 3874.80
                },
                {
                    years: 24,
                    amount: 3874.80
                },
                {
                    years: 26,
                    amount: 3874.80
                },
                {
                    years: 28,
                    amount: 3874.80
                },
                {
                    years: 30,
                    amount: 3874.80
                },
                {
                    years: 32,
                    amount: 3874.80
                },
                {
                    years: 34,
                    amount: 3874.80
                },
                {
                    years: 36,
                    amount: 3874.80
                },
                {
                    years: 38,
                    amount: 3874.80
                },
                {
                    years: 40,
                    amount: 3874.80
                }
            ]
        },
        {
            rank: 'E-6',
            pay: [
                {
                    years: 20,
                    amount: 4616.40
                },
                {
                    years: 22,
                    amount: 4616.40
                },
                {
                    years: 24,
                    amount: 4616.40
                },
                {
                    years: 26,
                    amount: 4616.40
                },
                {
                    years: 28,
                    amount: 4616.40
                },
                {
                    years: 30,
                    amount: 4616.40
                },
                {
                    years: 32,
                    amount: 4616.40
                },
                {
                    years: 34,
                    amount: 4616.40
                },
                {
                    years: 36,
                    amount: 4616.40
                },
                {
                    years: 38,
                    amount: 4616.40
                },
                {
                    years: 40,
                    amount: 4616.40
                },
            ]
        },
        {
            rank: 'E-7',
            pay: [
                {
                    years: 20,
                    amount: 5473.20
                },
                {
                    years: 22,
                    amount: 5674.50
                },
                {
                    years: 24,
                    amount: 5782.50
                },
                {
                    years: 26,
                    amount: 6193.50
                },
                {
                    years: 28,
                    amount: 6193.50
                },
                {
                    years: 30,
                    amount: 6193.50
                },
                {
                    years: 32,
                    amount: 6193.50
                },
                {
                    years: 34,
                    amount: 6193.50
                },
                {
                    years: 36,
                    amount: 6193.50
                },
                {
                    years: 38,
                    amount: 6193.50
                },
                {
                    years: 40,
                    amount: 6193.50
                },
            ]
        },
        {
            rank: 'E-8',
            pay: [
                {
                    years: 20,
                    amount: 6130.20
                },
                {
                    years: 22,
                    amount: 6404.40
                },
                {
                    years: 24,
                    amount: 6556.50
                },
                {
                    years: 26,
                    amount: 6930.90
                },
                {
                    years: 28,
                    amount: 6930.90
                },
                {
                    years: 30,
                    amount: 7069.80
                },
                {
                    years: 32,
                    amount: 7069.80
                },
                {
                    years: 34,
                    amount: 7069.80
                },
                {
                    years: 36,
                    amount: 7069.80
                },
                {
                    years: 38,
                    amount: 7069.80
                },
                {
                    years: 40,
                    amount: 7069.80
                },
            ]
        },
        {
            rank: 'E-9',
            pay: [
                {
                    years: 20,
                    amount: 7102.80
                },
                {
                    years: 22,
                    amount: 7381.50
                },
                {
                    years: 24,
                    amount: 7673.70
                },
                {
                    years: 26,
                    amount: 8121.60
                },
                {
                    years: 28,
                    amount: 8121.60
                },
                {
                    years: 30,
                    amount: 8526.90
                },
                {
                    years: 32,
                    amount: 8526.90
                },
                {
                    years: 34,
                    amount: 8953.90
                },
                {
                    years: 36,
                    amount: 8953.90
                },
                {
                    years: 38,
                    amount: 9402.30
                },
                {
                    years: 40,
                    amount: 9402.30
                }
            ]
        },
        {
            rank: 'O-1E',
            pay: [
                {
                    years: 20,
                    amount: 5682.60
                },
                {
                    years: 22,
                    amount: 5682.60
                },
                {
                    years: 24,
                    amount: 5682.60
                },
                {
                    years: 26,
                    amount: 5682.60
                },
                {
                    years: 28,
                    amount: 5682.60
                },
                {
                    years: 30,
                    amount: 5682.60
                },
                {
                    years: 32,
                    amount: 5682.60
                },
                {
                    years: 34,
                    amount: 5682.60
                },
                {
                    years: 36,
                    amount: 5682.60
                },
                {
                    years: 38,
                    amount: 5682.60
                },
                {
                    years: 40,
                    amount: 5682.60
                },
            ]
        },
        {
            rank: 'O-2E',
            pay: [
                {
                    years: 20,
                    amount: 6715.80
                },
                {
                    years: 22,
                    amount: 6715.80
                },
                {
                    years: 24,
                    amount: 6715.80
                },
                {
                    years: 26,
                    amount: 6715.80
                },
                {
                    years: 28,
                    amount: 6715.80
                },
                {
                    years: 30,
                    amount: 6715.80
                },
                {
                    years: 32,
                    amount: 6715.80
                },
                {
                    years: 34,
                    amount: 6715.80
                },
                {
                    years: 36,
                    amount: 6715.80
                },
                {
                    years: 38,
                    amount: 6715.80
                },
                {
                    years: 40,
                    amount: 6715.80
                },
            ]
        },
        {
            rank: 'O-3E',
            pay: [
                {
                    years: 20,
                    amount: 8421.00
                },
                {
                    years: 22,
                    amount: 8421.00
                },
                {
                    years: 24,
                    amount: 8421.00
                },
                {
                    years: 26,
                    amount: 8421.00
                },
                {
                    years: 28,
                    amount: 8421.00
                },
                {
                    years: 30,
                    amount: 8421.00
                },
                {
                    years: 32,
                    amount: 8421.00
                },
                {
                    years: 34,
                    amount: 8421.00
                },
                {
                    years: 36,
                    amount: 8421.00
                },
                {
                    years: 38,
                    amount: 8421.00
                },
                {
                    years: 40,
                    amount: 8421.00
                }
            ]
        },
        {
            rank: 'O-4',
            pay: [
                {
                    years: 20,
                    amount: 9210.30
                },
                {
                    years: 22,
                    amount: 9210.30
                },
                {
                    years: 24,
                    amount: 9210.30
                },
                {
                    years: 26,
                    amount: 9210.30
                },
                {
                    years: 28,
                    amount: 9210.30
                },
                {
                    years: 30,
                    amount: 9210.30
                },
                {
                    years: 32,
                    amount: 9210.30
                },
                {
                    years: 34,
                    amount: 9210.30
                },
                {
                    years: 36,
                    amount: 9210.30
                },
                {
                    years: 38,
                    amount: 9210.30
                },
                {
                    years: 40,
                    amount: 9210.30
                }
            ]
        },
        {
            rank: 'O-5',
            pay: [
                {
                    years: 20,
                    amount: 10544.70
                },
                {
                    years: 22,
                    amount: 10861.80
                },
                {
                    years: 24,
                    amount: 10861.80
                },
                {
                    years: 26,
                    amount: 10861.80
                },
                {
                    years: 28,
                    amount: 10861.80
                },
                {
                    years: 30,
                    amount: 10861.80
                },
                {
                    years: 32,
                    amount: 10861.80
                },
                {
                    years: 34,
                    amount: 10861.80
                },
                {
                    years: 36,
                    amount: 10861.80
                },
                {
                    years: 38,
                    amount: 10861.80
                },
                {
                    years: 40,
                    amount: 10861.80
                }
            ]
        },
        {
            rank: 'O-6',
            pay: [
                {
                    years: 20,
                    amount: 12050.40
                },
                {
                    years: 22,
                    amount: 12367.50
                },
                {
                    years: 24,
                    amount: 12688.80
                },
                {
                    years: 26,
                    amount: 13310.70
                },
                {
                    years: 28,
                    amount: 13310.70
                },
                {
                    years: 30,
                    amount: 13576.50
                },
                {
                    years: 32,
                    amount: 13576.50
                },
                {
                    years: 34,
                    amount: 13576.50
                },
                {
                    years: 36,
                    amount: 13576.50
                },
                {
                    years: 38,
                    amount: 13576.50
                },
                {
                    years: 40,
                    amount: 13576.50
                }
            ]
        },
        {
            rank: 'O-7',
            pay: [
                {
                    years: 20,
                    amount: 14737.80
                },
                {
                    years: 22,
                    amount: 14737.80
                },
                {
                    years: 24,
                    amount: 14737.80
                },
                {
                    years: 26,
                    amount: 14813.70
                },
                {
                    years: 28,
                    amount: 14813.70
                },
                {
                    years: 30,
                    amount: 15110.10
                },
                {
                    years: 32,
                    amount: 15110.10
                },
                {
                    years: 34,
                    amount: 15110.10
                },
                {
                    years: 36,
                    amount: 15110.10
                },
                {
                    years: 38,
                    amount: 15110.10
                },
                {
                    years: 40,
                    amount: 15110.10
                },
            ]
        },
        {
            rank: 'O-8',
            pay: [
                {
                    years: 20,
                    amount: 16298.10
                },
                {
                    years: 22,
                    amount: 16700.10
                },
                {
                    years: 24,
                    amount: 16700.10
                },
                {
                    years: 26,
                    amount: 16700.10
                },
                {
                    years: 28,
                    amount: 16700.10
                },
                {
                    years: 30,
                    amount: 17118.30
                },
                {
                    years: 32,
                    amount: 17118.30
                },
                {
                    years: 34,
                    amount: 17545.80
                },
                {
                    years: 36,
                    amount: 17545.80
                },
                {
                    years: 38,
                    amount: 17545.80
                },
                {
                    years: 40,
                    amount: 17545.80
                }
            ]
        },
        {
            rank: 'O-9',
            pay: [
                {
                    years: 20,
                    amount: 17201.40
                },
                {
                    years: 22,
                    amount: 17449.80
                },
                {
                    years: 24,
                    amount: 17675.10
                },
                {
                    years: 26,
                    amount: 17675.10
                },
                {
                    years: 28,
                    amount: 17675.10
                },
                {
                    years: 30,
                    amount: 17675.10
                },
                {
                    years: 32,
                    amount: 17675.10
                },
                {
                    years: 34,
                    amount: 17675.10
                },
                {
                    years: 36,
                    amount: 17675.10
                },
                {
                    years: 38,
                    amount: 17675.10
                },
                {
                    years: 40,
                    amount: 17675.10
                },
            ]
        },
        {
            rank: 'O-10',
            pay: [
                {
                    years: 20,
                    amount: 17675.10
                },
                {
                    years: 22,
                    amount: 17675.10
                },
                {
                    years: 24,
                    amount: 17675.10
                },
                {
                    years: 26,
                    amount: 17675.10
                },
                {
                    years: 28,
                    amount: 17675.10
                },
                {
                    years: 30,
                    amount: 17675.10
                },
                {
                    years: 32,
                    amount: 17675.10
                },
                {
                    years: 34,
                    amount: 17675.10
                },
                {
                    years: 36,
                    amount: 17675.10
                },
                {
                    years: 38,
                    amount: 17675.10
                },
                {
                    years: 40,
                    amount: 17675.10
                },
            ]
        },
        {
            rank: 'W-1',
            pay: [
                {
                    years: 20,
                    amount: 6143.40
                },
                {
                    years: 22,
                    amount: 6143.40
                },
                {
                    years: 24,
                    amount: 6143.40
                },
                {
                    years: 26,
                    amount: 6143.40
                },
                {
                    years: 28,
                    amount: 6143.40
                },
                {
                    years: 30,
                    amount: 6143.40
                },
                {
                    years: 32,
                    amount: 6143.40
                },
                {
                    years: 34,
                    amount: 6143.40
                },
                {
                    years: 36,
                    amount: 6143.40
                },
                {
                    years: 38,
                    amount: 6143.40
                },
                {
                    years: 40,
                    amount: 6143.40
                },
            ]
        },
        {
            rank: 'W-2',
            pay: [
                {
                    years: 20,
                    amount: 6517.20
                },
                {
                    years: 22,
                    amount: 6652.80
                },
                {
                    years: 24,
                    amount: 6760.20
                },
                {
                    years: 26,
                    amount: 6760.20
                },
                {
                    years: 28,
                    amount: 6760.20
                },
                {
                    years: 30,
                    amount: 6760.20
                },
                {
                    years: 32,
                    amount: 6760.20
                },
                {
                    years: 34,
                    amount: 6760.20
                },
                {
                    years: 36,
                    amount: 6760.20
                },
                {
                    years: 38,
                    amount: 6760.20
                },
                {
                    years: 40,
                    amount: 6760.20
                },
            ]
        },
        {
            rank: 'W-3',
            pay: [
                {
                    years: 20,
                    amount: 7428.30
                },
                {
                    years: 22,
                    amount: 7599.60
                },
                {
                    years: 24,
                    amount: 7781.40
                },
                {
                    years: 26,
                    amount: 8029.50
                },
                {
                    years: 28,
                    amount: 8029.50
                },
                {
                    years: 30,
                    amount: 8029.50
                },
                {
                    years: 32,
                    amount: 8029.50
                },
                {
                    years: 34,
                    amount: 8029.50
                },
                {
                    years: 36,
                    amount: 8029.50
                },
                {
                    years: 38,
                    amount: 8029.50
                },
                {
                    years: 40,
                    amount: 8029.50
                }
            ]
        },
        {
            rank: 'W-4',
            pay: [
                {
                    years: 20,
                    amount: 8087.70
                },
                {
                    years: 22,
                    amount: 8473.80
                },
                {
                    years: 24,
                    amount: 8791.50
                },
                {
                    years: 26,
                    amount: 9153.60
                },
                {
                    years: 28,
                    amount: 9153.60
                },
                {
                    years: 30,
                    amount: 9336.30
                },
                {
                    years: 32,
                    amount: 9336.30
                },
                {
                    years: 34,
                    amount: 9336.30
                },
                {
                    years: 36,
                    amount: 9336.30
                },
                {
                    years: 38,
                    amount: 9336.30
                },
                {
                    years: 40,
                    amount: 9336.30
                }
                
            ]
        },
        {
            rank: 'W-5',
            pay: [
                {
                    years: 20,
                    amount: 8912.10
                },
                {
                    years: 22,
                    amount: 9364.20
                },
                {
                    years: 24,
                    amount: 9701.10
                },
                {
                    years: 26,
                    amount: 10073.40
                },
                {
                    years: 28,
                    amount: 10073.40
                },
                {
                    years: 30,
                    amount: 10578.00
                },
                {
                    years: 32,
                    amount: 10578.00
                },
                {
                    years: 34,
                    amount: 11106.00
                },
                {
                    years: 36,
                    amount: 11106.00
                },
                {
                    years: 38,
                    amount: 11662.50
                },
                {
                    years: 40,
                    amount: 11662.50
                }
            ]
        }
    ]

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    })

    const TooltipContent = (props) => {
        if (!props.active || !props.payload) {
            return
        }
        const tip = props.payload[0].payload
        return (
            <div style={{ background: "black", padding: 5, color: "white" }}>
                <div>Age: {tip.Year}</div>
                <div>Balance: {tip.Balance}</div>
            </div>
        )
    }

    const calcNewRetirementAge = (updatedTargetRetAmt) => {
        const netPreRetROR = (preRetROR - inflation) / 100;
        let currBal = currentSavings;
        let arr = [];
        const annualCont = contributionFreq === "Annually" ? contributions : contributions * 12;
        let newRetAge = currentAge;
        while (currBal < newTargetRetAmt) {
            currBal = annualCont + currBal * (1 + netPreRetROR);
            let conversion = Math.round(currBal)
            arr.push({
                Year: newRetAge,
                Balance: conversion
            })
            newRetAge += 1;
            if (newRetAge > 200) break;
        }
        setRetData(arr)
        return newRetAge;
    }

    const calcNewRetirementAgeWithVA = (updatedTargetRetAmt) => {
        const netPreRetROR = (preRetROR - inflation) / 100;
        let currBal = currentSavings;
        let arr = [];
        const annualCont = contributionFreq === "Annually" ? contributions : contributions * 12;
        let newRetAge = currentAge;
        while (currBal < updatedTargetRetAmt) {
            currBal = annualCont + currBal * (1 + netPreRetROR);
            let conversion = Math.round(currBal)
            arr.push({
                Year: newRetAge,
                Balance: conversion
            })
            newRetAge += 1;
            if (newRetAge > 200) break;
        }
        setRetDataWithVA(arr)
        return newRetAge;
    }


    const calcRetirementAge = (updatedTargetRetAmt) => {
        const netPreRetROR = (preRetROR - inflation) / 100;
        let currBal = currentSavings;
        let arr = [];
        const annualCont = contributionFreq === "Annually" ? contributions : contributions * 12;
        let retAge = currentAge;
        while (currBal < targetRetAmt) {
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

    const calcRetirementPercentage = (years) => {
        let increment = 0.5;
        let adjusted = years - 20;
        for (let i = 0; i < adjusted; i++) {
            increment += 0.025
        }
        return increment
    }

    const calcVADisability = (vaPer, deps, adtlC, schoolC, spouse, yearsToEighteen) => {
        let vaPercent = parseInt(vaPer)
        let choices = [
            'filler',
            'vetOnly',
            'vetWithSpouse',
            'vetWithSpouseAndOneParent',
            'vetWithSpouseAndTwoParents',
            'vetWithOneParent',
            'vetWithTwoParents',
            'vetWithOneChild',
            'vetWithOneChildAndSpouse',
            'vetWithOneChildAndSpouseAndOneParent',
            'vetWithOneChildAndSpouseTwoParents',
            'vetWithOneChildOneParent',
            'vetWithOneChildTwoParents'
        ]
        let final = 0;
        if (deps === 0) {
            return
        } else if (deps === '1') {
            let value = vaStatus[choices[1]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '2') {
            let value = vaStatus[choices[2]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '3') {
            let value = vaStatus[choices[3]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '4') {
            let value = vaStatus[choices[4]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '5') {
            let value = vaStatus[choices[5]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '6') {
            let value = vaStatus[choices[6]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '7') {
            let value = vaStatus[choices[7]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '8') {
            let value = vaStatus[choices[8]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '9') {
            let value = vaStatus[choices[9]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '10') {
            let value = vaStatus[choices[10]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '11') {
            let value = vaStatus[choices[11]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        } else if (deps === '12') {
            let value = vaStatus[choices[12]]
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final = value[i].amount * 12;
                }
            }
        }
        if (spouse === true) {
            let value = vaStatus['spouseReceivingAid'];
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final += (12 * value[i].amount)
                }
            }
        }
        if (adtlC !== 0) {
            let value = vaStatus['adtlChildUnderAge'];
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final += (12 * value[i].amount * adtlC)
                }
            }
        }
        if (schoolC !== 0) {
            let value = vaStatus['adtlChildrenAtSchool'];
            for (let i = 0; i < value.length; i++) {
                if (vaPercent === value[i].rating) {
                    final += (12 * value[i].amount * schoolC)
                }
            }
        }
        return final
    }

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
        let offsetPay = 0;
        for (let i = 0; i < payscale.length; i++) {
            if (retirementRank === payscale[i].rank) {
                for(let j = 0; j < payscale[i].pay.length; j++){
                    if(parseInt(yearsInService) === payscale[i].pay[j].years){
                        offsetPay = parseInt(payscale[i].pay[j].amount)
                    }
                }
            }
        }
        //removed (1.025 ** activeDutyAge) for bug testing.  This represents annual pay raises
        //all calculationsa are in current dollars, and assuming future pay creates an inbalance
        offsetPay = Math.round((offsetPay * retirementPercentage * 100 * 12 * .82) / 100)
        setPension(offsetPay)
        setNewRetirementExpense(annualRetExp - (offsetPay));
        let netPostRetROR = (postRetROR - inflation) / 100;
        if (netPostRetROR === 0 || netPostRetROR < 0) {
            netPostRetROR = 0.0000000001;
        }
        let updatedTargetRetAmt = annualRetExp / netPostRetROR;
        let RetAmtWithPension = newRetirementExpense / netPostRetROR;
        setNewTargetRetAmt(RetAmtWithPension)
        setTargetRetAmt(updatedTargetRetAmt);
        const retAge = calcRetirementAge(updatedTargetRetAmt);
        const newRetAge = calcNewRetirementAge(updatedTargetRetAmt);
        const retPercent = calcRetirementPercentage(yearsInService);
        setRetirementPercentage(retPercent);
        setRetirementAge(retAge);
        setNewRetAge(newRetAge);
        const disability = calcVADisability(VAPercentage, dependents, adtlChildren, schoolChildren, spouseAid, grown)
        //removed (1.025 ** activeDutyAge) for bug testing.  This represents annual pay raises
        let vaCalc = Math.round((disability * 100) / 100)
        setNewRetirementExpenseWithVA(annualRetExp - offsetPay - vaCalc);
        setPensionWithVA(offsetPay + vaCalc);
        let RetAmtWithVAPension = newRetirementExpenseWithVA / netPostRetROR;
        const vaRetAge = calcNewRetirementAgeWithVA(RetAmtWithVAPension)
        setRetAgeWithVA(vaRetAge);
        setTargetRetAmtWithVA(RetAmtWithVAPension);
    }, [annualRetExp,
        currentAge,
        currentSavings,
        contributions,
        contributionFreq,
        preRetROR,
        postRetROR,
        inflation,
        retirementAge,
        targetRetAmt,
        retirementRank,
        yearsInService,
        activeDutyAge,
        newRetirementExpense,
        newTargetRetAmt,
        VA,
        VAPercentage,
        dependents,
        adtlChildren,
        schoolChildren,
        spouseAid,
        grown,
        retAgeWithVA,
        pensionWithVA
    ])



    return (
        <Container>
            <Row>
                <Col>
                </Col>
                <Col xs={8}>
                    <h1>Financial Independence Calculator</h1>
                    <br></br>
                    <h2>You can retire at age {retirementAge}</h2>
                    <div>Civilian target retirement amount: {targetRetAmt ? formatter.format(targetRetAmt) : 0}</div>
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
                            <br></br>
                            <h2>Military Career</h2>
                            <label>
                                What is your projected retirement rank?
                                <select
                                    value={retirementRank}
                                    onChange={(e) => {
                                        setRetirementRank(e.target.value)
                                    }}
                                >
                                    <option type='string' value='E-5'>E-5</option>
                                    <option type='string' value='E-6'>E-6</option>
                                    <option type='string' value='E-7'>E-7</option>
                                    <option type='string' value='E-8'>E-8</option>
                                    <option type='string' value='E-9'>E-9</option>
                                    <option type='string' value='O-1E'>O-1E</option>
                                    <option type='string' value='O-2E'>O-2E</option>
                                    <option type='string' value='O-3E'>O-3E</option>
                                    <option type='string' value='O-4'>O-4</option>
                                    <option type='string' value='O-5'>O-5</option>
                                    <option type='string' value='O-6'>O-6</option>
                                    <option type='string' value='O-7'>O-7</option>
                                    <option type='string' value='O-8'>O-8</option>
                                    <option type='string' value='O-9'>O-9</option>
                                    <option type='string' value='O-10'>O-10</option>
                                    <option type='string' value='W-1'>W-1</option>
                                    <option type='string' value='W-2'>W-2</option>
                                    <option type='string' value='W-3'>W-3</option>
                                    <option type='string' value='W-4'>W-4</option>
                                    <option type='string' value='W-5'>W-5</option>
                                </select>
                            </label>
                            <label>
                                How many years until retirement?
                                <select
                                    value={activeDutyAge}
                                    onChange={(e) => {
                                        setActiveDutyAge(e.target.value)
                                    }}
                                >
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                    <option value='13'>13</option>
                                    <option value='14'>14</option>
                                    <option value='15'>15</option>
                                    <option value='16'>16</option>
                                    <option value='17'>17</option>
                                    <option value='18'>18</option>
                                    <option value='19'>19</option>
                                    <option value='20'>20</option>
                                </select>
                            </label>
                            <label>
                                What will be your final pay scale at retirement?
                                <select
                                    value={yearsInService}
                                    onChange={(e) => {
                                        setYearsInService(e.target.value)
                                    }}
                                >
                                    <option value='20'>20</option>
                                    <option value='22'>22</option>
                                    <option value='24'>24</option>
                                    <option value='26'>26</option>
                                    <option value='28'>28</option>
                                    <option value='30'>30</option>
                                    <option value='32'>32</option>
                                    <option value='34'>34</option>
                                    <option value='36'>36</option>
                                    <option value='38'>38</option>
                                    <option value='40'>40</option>
                                </select>
                            </label>
                            <h2>VA Disability</h2>
                            <label>
                                Are you service connected?
                                <input onChange={(() => VA === false ? setVA(true) : setVA(false))} type='checkbox'></input>
                                <div hidden={VA === true ? false : true}>
                                    Select your service connected disability percentage below.
                                </div>
                                <select hidden={VA === true ? false : true}
                                    value={VAPercentage}
                                    onChange={(e) => {
                                        setVAPercentage(e.target.value)
                                    }}
                                >
                                    <option value='0'>Choose</option>
                                    <option value='30'>30%</option>
                                    <option value='40'>40%</option>
                                    <option value='50'>50%</option>
                                    <option value='60'>60%</option>
                                    <option value='70'>70%</option>
                                    <option value='80'>80%</option>
                                    <option value='90'>90%</option>
                                    <option value='100'>100%</option>
                                </select>
                            </label>
                            <label hidden={VA === true ? false : true}>
                                <div>
                                    Select your number of dependents
                                </div>
                                <select hidden={VA === true ? false : true}
                                    value={dependents}
                                    onChange={(e) => {
                                        setDependents(e.target.value)
                                    }}
                                >
                                    <option value='0'>Choose</option>
                                    <option value='1'>Veteran Alone</option>
                                    <option value='2'>With Spouse</option>
                                    <option value='3'>With spouse and 1 parent</option>
                                    <option value='4'>With spouse and 2 parents</option>
                                    <option value='5'>With 1 parent</option>
                                    <option value='6'>With 2 parents</option>
                                    <option value='7'>Veteran with 1 child</option>
                                    <option value='8'>With 1 child and spouse</option>
                                    <option value='9'>With 1 child, spouse, and 1 parent</option>
                                    <option value='10'>With 1 child, spouse, and 2 parents</option>
                                    <option value='11'>With 1 child and 1 parent</option>
                                    <option value='12'>With 1 child and 2 parents</option>
                                </select>
                            </label>
                            <label hidden={VA === true ? false : true}>
                                <div>
                                    How many additional children under the age of 18?
                                </div>
                                <input
                                    type='number'
                                    value={adtlChildren}
                                    onChange={(e) => setAdtlChildren(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <label hidden={VA === true ? false : true}>
                                <div>
                                    How many children over age of 18 in a qualifying school program?
                                </div>
                                <input
                                    type='number'
                                    value={schoolChildren}
                                    onChange={(e) => setSchoolChildren(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <label hidden={VA === true ? false : true}>
                                Is your spouse (if applicable) receiving aid and attendance?
                                <input onChange={(() => spouseAid === false ? setSpouseAid(true) : setSpouseAid(false))} type='checkbox'></input>
                            </label>
                            <label hidden={VA === true ? false : true}>
                                <div>
                                    How many years (if applicable) until your youngest child reaches the age of 18?
                                </div>
                                <input
                                    type='number'
                                    value={grown}
                                    onChange={(e) => setGrown(parseInt(e.target.value)) || 0}
                                />
                            </label>
                        </div>
                    </form>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <br></br>
                <div>
                    <strong>Retirement Goal as a Civilian:</strong>
                </div>
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
            <Row>
                <br></br>
                <div hidden={pension ? false : true}>
                    <div>
                        Your annual military retirement pay, based on the time value of money, selected
                        grade, and a retirement of {yearsInService ? yearsInService : 20} years, after tax: {pension ? formatter.format(pension) : 0}
                    </div>
                    <br></br>
                    <div>
                        The amount you need to make up in order to reach your annual retirement expenses:
                        {newRetirementExpense ? formatter.format(newRetirementExpense) : 0}
                    </div>
                    <br></br>
                    <div>
                        Your updated target retirement amount based on your pension: {newTargetRetAmt ? formatter.format(newTargetRetAmt) : 0}
                    </div>
                    <h2>You can retire at age {newRetAge ? newRetAge : null}</h2>
                    <strong>Retirement Goal as a Retired Veteran:</strong>
                    <ResponsiveContainer width={"100%"} aspect={2} hidden={pension ? false : true}>
                        <AreaChart data={retData} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip content={<TooltipContent />} />
                            <Legend />
                            <XAxis dataKey={"Year"} />
                            <YAxis width={120} tickFormatter={(value) => formatter.format(value)} type={(value) => formatter.format(value)} />
                            <Area type="monotone" dataKey="Balance" stroke="#8884d8" fillOpacity={0.7} fill="blue" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Row>
            <Row>
                <br></br>
                <div hidden={VA ? false : true}>
                    <div>
                        Your annual military retirement pay + disability pay, based on the time value of money, selected
                        grade, and a retirement of {yearsInService ? yearsInService : 20} years, after taxed base pay: {pensionWithVA ? formatter.format(pensionWithVA) : 0}
                    </div>
                    <br></br>
                    <div>
                        The amount you need to make up in order to reach your annual retirement expenses:
                        {newRetirementExpenseWithVA ? formatter.format(newRetirementExpenseWithVA) : 0}
                    </div>
                    <br></br>
                    <div>
                        Your updated target retirement amount based on your pension: {targetRetAmtWithVA ? formatter.format(targetRetAmtWithVA) : 0}
                    </div>
                    <h2>You can retire at age {retAgeWithVA ? retAgeWithVA : null}</h2>
                    <strong>Retirement Goal as a Retired Veteran with Disability:</strong>
                    <ResponsiveContainer width={"100%"} aspect={2} hidden={pension ? false : true}>
                        <AreaChart data={retDataWithVA} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip content={<TooltipContent />} />
                            <Legend />
                            <XAxis dataKey={"Year"} />
                            <YAxis width={120} tickFormatter={(value) => formatter.format(value)} type={(value) => formatter.format(value)} />
                            <Area type="monotone" dataKey="Balance" stroke="#8884d8" fillOpacity={0.7} fill="purple" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Row>
        </Container>
    )
}

export default FinanceCalculator