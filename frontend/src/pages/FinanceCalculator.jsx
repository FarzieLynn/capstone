import './stylesheets/Calculator.css'
import './stylesheets/Finance.css'
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
    const yearsServed = Number(localStorage.getItem("yearsInService") || 20)

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
    const [yearsInService, setYearsInService] = useState(yearsServed);
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
    const [penaltySS, setPenaltySS] = useState();
    const [fullSS, setFullSS] = useState();
    const [bonusSS, setBonusSS] = useState();
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
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 22,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 24,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 26,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 28,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 30,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 32,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 34,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 36,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 38,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                },
                {
                    years: 40,
                    amount: 3874.80,
                    penaltyRate: 1084.00,
                    fullRate: 1549.00,
                    bonusRate: 1998.00
                }
            ]
        },
        {
            rank: 'E-6',
            pay: [
                {
                    years: 20,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 22,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 24,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 26,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 28,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 30,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 32,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 34,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 36,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 38,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
                {
                    years: 40,
                    amount: 4616.40,
                    penaltyRate: 1200.00,
                    fullRate: 1722.00,
                    bonusRate: 2227.00
                },
            ]
        },
        {
            rank: 'E-7',
            pay: [
                {
                    years: 20,
                    amount: 5473.20,
                    penaltyRate: 1334.00,
                    fullRate: 1922.00,
                    bonusRate: 2492.00
                },
                {
                    years: 22,
                    amount: 5674.50,
                    penaltyRate: 1366.00,
                    fullRate: 1969.00,
                    bonusRate: 2554.00
                },
                {
                    years: 24,
                    amount: 5782.50,
                    penaltyRate: 1382.00,
                    fullRate: 1994.00,
                    bonusRate: 2587.00
                },
                {
                    years: 26,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
                {
                    years: 28,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
                {
                    years: 30,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
                {
                    years: 32,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
                {
                    years: 34,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
                {
                    years: 36,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
                {
                    years: 38,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
                {
                    years: 40,
                    amount: 6193.50,
                    penaltyRate: 1466.00,
                    fullRate: 2090.00,
                    bonusRate: 2715.00
                },
            ]
        },
        {
            rank: 'E-8',
            pay: [
                {
                    years: 20,
                    amount: 6130.20,
                    penaltyRate: 1437.00,
                    fullRate: 2076.00,
                    bonusRate: 2695.00
                },
                {
                    years: 22,
                    amount: 6404.40,
                    penaltyRate: 1479.00,
                    fullRate: 2139.00,
                    bonusRate: 2779.00
                },
                {
                    years: 24,
                    amount: 6556.50,
                    penaltyRate: 1504.00,
                    fullRate: 2175.00,
                    bonusRate: 2827.00
                },
                {
                    years: 26,
                    amount: 6930.90,
                    penaltyRate: 1562.00,
                    fullRate: 2262.00,
                    bonusRate: 2942.00
                },
                {
                    years: 28,
                    amount: 6930.90,
                    penaltyRate: 1562.00,
                    fullRate: 2262.00,
                    bonusRate: 2942.00
                },
                {
                    years: 30,
                    amount: 7069.80,
                    penaltyRate: 1583.00,
                    fullRate: 2295.00,
                    bonusRate: 2985.00
                },
                {
                    years: 32,
                    amount: 7069.80,
                    penaltyRate: 1583.00,
                    fullRate: 2295.00,
                    bonusRate: 2985.00
                },
                {
                    years: 34,
                    amount: 7069.80,
                    penaltyRate: 1583.00,
                    fullRate: 2295.00,
                    bonusRate: 2985.00
                },
                {
                    years: 36,
                    amount: 7069.80,
                    penaltyRate: 1583.00,
                    fullRate: 2295.00,
                    bonusRate: 2985.00
                },
                {
                    years: 38,
                    amount: 7069.80,
                    penaltyRate: 1583.00,
                    fullRate: 2295.00,
                    bonusRate: 2985.00
                },
                {
                    years: 40,
                    amount: 7069.80,
                    penaltyRate: 1583.00,
                    fullRate: 2295.00,
                    bonusRate: 2985.00
                }
            ]
        },
        {
            rank: 'E-9',
            pay: [
                {
                    years: 20,
                    amount: 7102.80,
                    penaltyRate: 1589.00,
                    fullRate: 2303.00,
                    bonusRate: 2996.00
                },
                {
                    years: 22,
                    amount: 7381.50,
                    penaltyRate: 1632.00,
                    fullRate: 2367.00,
                    bonusRate: 3082.00
                },
                {
                    years: 24,
                    amount: 7673.70,
                    penaltyRate: 1678.00,
                    fullRate: 2435.00,
                    bonusRate: 3172.00
                },
                {
                    years: 26,
                    amount: 8121.60,
                    penaltyRate: 1748.00,
                    fullRate: 2540.00,
                    bonusRate: 3311.00
                },
                {
                    years: 28,
                    amount: 8121.60,
                    penaltyRate: 1748.00,
                    fullRate: 2540.00,
                    bonusRate: 3311.00
                },
                {
                    years: 30,
                    amount: 8526.90,
                    penaltyRate: 1811.00,
                    fullRate: 2635.00,
                    bonusRate: 3436.00
                },
                {
                    years: 32,
                    amount: 8526.90,
                    penaltyRate: 1811.00,
                    fullRate: 2635.00,
                    bonusRate: 3436.00
                },
                {
                    years: 34,
                    amount: 8953.90,
                    penaltyRate: 1878.00,
                    fullRate: 2734.00,
                    bonusRate: 3512.00
                },
                {
                    years: 36,
                    amount: 8953.90,
                    penaltyRate: 1878.00,
                    fullRate: 2734.00,
                    bonusRate: 3512.00
                },
                {
                    years: 38,
                    amount: 9402.30,
                    penaltyRate: 1948.00,
                    fullRate: 2814.00,
                    bonusRate: 3576.00
                },
                {
                    years: 40,
                    amount: 9402.30,
                    penaltyRate: 1948.00,
                    fullRate: 2814.00,
                    bonusRate: 3576.00
                }
            ]
        },
        {
            rank: 'O-1E',
            pay: [
                {
                    years: 20,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 22,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 24,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 26,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 28,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 30,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 32,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 34,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 36,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 38,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
                {
                    years: 40,
                    amount: 5682.60,
                    penaltyRate: 1366.00,
                    fullRate: 1971.00,
                    bonusRate: 2556.00
                },
            ]
        },
        {
            rank: 'O-2E',
            pay: [
                {
                    years: 20,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 22,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 24,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 26,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 28,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 30,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 32,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 34,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 36,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 38,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
                {
                    years: 40,
                    amount: 6715.80,
                    penaltyRate: 1528.00,
                    fullRate: 2212.00,
                    bonusRate: 2875.00
                },
            ]
        },
        {
            rank: 'O-3E',
            pay: [
                {
                    years: 20,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 22,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 24,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 26,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 28,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 30,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 32,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 34,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 36,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 38,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                },
                {
                    years: 40,
                    amount: 8421.00,
                    penaltyRate: 1795.00,
                    fullRate: 2610.00,
                    bonusRate: 3403.00
                }
            ]
        },
        {
            rank: 'O-4',
            pay: [
                {
                    years: 20,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 22,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 24,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 26,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 28,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 30,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 32,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 34,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 36,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 38,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                },
                {
                    years: 40,
                    amount: 9210.30,
                    penaltyRate: 1918.00,
                    fullRate: 2793.00,
                    bonusRate: 3549.00
                }
            ]
        },
        {
            rank: 'O-5',
            pay: [
                {
                    years: 20,
                    amount: 10544.70,
                    penaltyRate: 2097.00,
                    fullRate: 2939.00,
                    bonusRate: 3742.00
                },
                {
                    years: 22,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 24,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 26,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 28,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 30,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 32,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 34,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 36,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 38,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                },
                {
                    years: 40,
                    amount: 10861.80,
                    penaltyRate: 2120.00,
                    fullRate: 2974.00,
                    bonusRate: 3788.00
                }
            ]
        },
        {
            rank: 'O-6',
            pay: [
                {
                    years: 20,
                    amount: 12050.40,
                    penaltyRate: 2207.00,
                    fullRate: 3103.00,
                    bonusRate: 3960.00
                },
                {
                    years: 22,
                    amount: 12367.50,
                    penaltyRate: 2231.00,
                    fullRate: 3138.00,
                    bonusRate: 4006.00
                },
                {
                    years: 24,
                    amount: 12688.80,
                    penaltyRate: 2254.00,
                    fullRate: 3173.00,
                    bonusRate: 4053.00
                },
                {
                    years: 26,
                    amount: 13310.70,
                    penaltyRate: 2299.00,
                    fullRate: 3240.00,
                    bonusRate: 4141.00
                },
                {
                    years: 28,
                    amount: 13310.70,
                    penaltyRate: 2299.00,
                    fullRate: 3240.00,
                    bonusRate: 4141.00
                },
                {
                    years: 30,
                    amount: 13576.50,
                    penaltyRate: 2317.00,
                    fullRate: 3264.00,
                    bonusRate: 4169.00
                },
                {
                    years: 32,
                    amount: 13576.50,
                    penaltyRate: 2317.00,
                    fullRate: 3264.00,
                    bonusRate: 4169.00
                },
                {
                    years: 34,
                    amount: 13576.50,
                    penaltyRate: 2317.00,
                    fullRate: 3264.00,
                    bonusRate: 4169.00
                },
                {
                    years: 36,
                    amount: 13576.50,
                    penaltyRate: 2317.00,
                    fullRate: 3264.00,
                    bonusRate: 4169.00
                },
                {
                    years: 38,
                    amount: 13576.50,
                    penaltyRate: 2317.00,
                    fullRate: 3264.00,
                    bonusRate: 4169.00
                },
                {
                    years: 40,
                    amount: 13576.50,
                    penaltyRate: 2317.00,
                    fullRate: 3264.00,
                    bonusRate: 4169.00
                }
            ]
        },
        {
            rank: 'O-7',
            pay: [
                {
                    years: 20,
                    amount: 14737.80,
                    penaltyRate: 2394.00,
                    fullRate: 3358.00,
                    bonusRate: 4276.00
                },
                {
                    years: 22,
                    amount: 14737.80,
                    penaltyRate: 2394.00,
                    fullRate: 3358.00,
                    bonusRate: 4276.00
                },
                {
                    years: 24,
                    amount: 14737.80,
                    penaltyRate: 2394.00,
                    fullRate: 3358.00,
                    bonusRate: 4276.00
                },
                {
                    years: 26,
                    amount: 14813.70,
                    penaltyRate: 2399.00,
                    fullRate: 3363.00,
                    bonusRate: 4283.00
                },
                {
                    years: 28,
                    amount: 14813.70,
                    penaltyRate: 2399.00,
                    fullRate: 3363.00,
                    bonusRate: 4283.00
                },
                {
                    years: 30,
                    amount: 15110.10,
                    penaltyRate: 2417.00,
                    fullRate: 3385.00,
                    bonusRate: 4308.00
                },
                {
                    years: 32,
                    amount: 15110.10,
                    penaltyRate: 2417.00,
                    fullRate: 3385.00,
                    bonusRate: 4308.00
                },
                {
                    years: 34,
                    amount: 15110.10,
                    penaltyRate: 2417.00,
                    fullRate: 3385.00,
                    bonusRate: 4308.00
                },
                {
                    years: 36,
                    amount: 15110.10,
                    penaltyRate: 2417.00,
                    fullRate: 3385.00,
                    bonusRate: 4308.00
                },
                {
                    years: 38,
                    amount: 15110.10,
                    penaltyRate: 2417.00,
                    fullRate: 3385.00,
                    bonusRate: 4308.00
                },
                {
                    years: 40,
                    amount: 15110.10,
                    penaltyRate: 2417.00,
                    fullRate: 3385.00,
                    bonusRate: 4308.00
                },
            ]
        },
        {
            rank: 'O-8',
            pay: [
                {
                    years: 20,
                    amount: 16298.10,
                    penaltyRate: 2482.00,
                    fullRate: 3464.00,
                    bonusRate: 4396.00
                },
                {
                    years: 22,
                    amount: 16700.10,
                    penaltyRate: 2502.00,
                    fullRate: 3488.00,
                    bonusRate: 4422.00
                },
                {
                    years: 24,
                    amount: 16700.10,
                    penaltyRate: 2502.00,
                    fullRate: 3488.00,
                    bonusRate: 4422.00
                },
                {
                    years: 26,
                    amount: 16700.10,
                    penaltyRate: 2502.00,
                    fullRate: 3488.00,
                    bonusRate: 4422.00
                },
                {
                    years: 28,
                    amount: 16700.10,
                    penaltyRate: 2502.00,
                    fullRate: 3488.00,
                    bonusRate: 4422.00
                },
                {
                    years: 30,
                    amount: 17118.30,
                    penaltyRate: 2522.00,
                    fullRate: 3511.00,
                    bonusRate: 4448.00
                },
                {
                    years: 32,
                    amount: 17118.30,
                    penaltyRate: 2522.00,
                    fullRate: 3511.00,
                    bonusRate: 4448.00
                },
                {
                    years: 34,
                    amount: 17545.80,
                    penaltyRate: 2541.00,
                    fullRate: 3533.00,
                    bonusRate: 4471.00
                },
                {
                    years: 36,
                    amount: 17545.80,
                    penaltyRate: 2541.00,
                    fullRate: 3533.00,
                    bonusRate: 4471.00
                },
                {
                    years: 38,
                    amount: 17545.80,
                    penaltyRate: 2541.00,
                    fullRate: 3533.00,
                    bonusRate: 4471.00
                },
                {
                    years: 40,
                    amount: 17545.80,
                    penaltyRate: 2541.00,
                    fullRate: 3533.00,
                    bonusRate: 4471.00
                }
            ]
        },
        {
            rank: 'O-9',
            pay: [
                {
                    years: 20,
                    amount: 17201.40,
                    penaltyRate: 2526.00,
                    fullRate: 3516.00,
                    bonusRate: 4453.00
                },
                {
                    years: 22,
                    amount: 17449.80,
                    penaltyRate: 2537.00,
                    fullRate: 3528.00,
                    bonusRate: 4466.00
                },
                {
                    years: 24,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 26,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 28,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 30,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 32,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 34,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 36,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 38,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 40,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
            ]
        },
        {
            rank: 'O-10',
            pay: [
                {
                    years: 20,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 22,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 24,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 26,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 28,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 30,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 32,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 34,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 36,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 38,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
                {
                    years: 40,
                    amount: 17675.10,
                    penaltyRate: 2546.00,
                    fullRate: 3539.00,
                    bonusRate: 4478.00
                },
            ]
        },
        {
            rank: 'W-1',
            pay: [
                {
                    years: 20,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 22,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 24,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 26,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 28,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 30,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 32,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 34,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 36,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 38,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
                {
                    years: 40,
                    amount: 6143.40,
                    penaltyRate: 1438.00,
                    fullRate: 2078.00,
                    bonusRate: 2699.00
                },
            ]
        },
        {
            rank: 'W-2',
            pay: [
                {
                    years: 20,
                    amount: 6517.20,
                    penaltyRate: 1496.00,
                    fullRate: 2165.00,
                    bonusRate: 2813.00
                },
                {
                    years: 22,
                    amount: 6652.80,
                    penaltyRate: 1518.00,
                    fullRate: 2197.00,
                    bonusRate: 2856.00
                },
                {
                    years: 24,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 26,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 28,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 30,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 32,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 34,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 36,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 38,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
                {
                    years: 40,
                    amount: 6760.20,
                    penaltyRate: 1535.00,
                    fullRate: 2222.00,
                    bonusRate: 2889.00
                },
            ]
        },
        {
            rank: 'W-3',
            pay: [
                {
                    years: 20,
                    amount: 7428.30,
                    penaltyRate: 1639.00,
                    fullRate: 2378.00,
                    bonusRate: 3096.00
                },
                {
                    years: 22,
                    amount: 7599.60,
                    penaltyRate: 1666.00,
                    fullRate: 2418.00,
                    bonusRate: 3149.00
                },
                {
                    years: 24,
                    amount: 7781.40,
                    penaltyRate: 1695.00,
                    fullRate: 2460.00,
                    bonusRate: 3205.00
                },
                {
                    years: 26,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                },
                {
                    years: 28,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                },
                {
                    years: 30,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                },
                {
                    years: 32,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                },
                {
                    years: 34,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                },
                {
                    years: 36,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                },
                {
                    years: 38,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                },
                {
                    years: 40,
                    amount: 8029.50,
                    penaltyRate: 1734.00,
                    fullRate: 2519.00,
                    bonusRate: 3282.00
                }
            ]
        },
        {
            rank: 'W-4',
            pay: [
                {
                    years: 20,
                    amount: 8087.70,
                    penaltyRate: 1742.00,
                    fullRate: 2532.00,
                    bonusRate: 3300.00
                },
                {
                    years: 22,
                    amount: 8473.80,
                    penaltyRate: 1803.00,
                    fullRate: 2621.00,
                    bonusRate: 3418.00
                },
                {
                    years: 24,
                    amount: 8791.50,
                    penaltyRate: 1853.00,
                    fullRate: 2696.00,
                    bonusRate: 3488.00
                },
                {
                    years: 26,
                    amount: 9153.60,
                    penaltyRate: 1909.00,
                    fullRate: 2781.00,
                    bonusRate: 3540.00
                },
                {
                    years: 28,
                    amount: 9153.60,
                    penaltyRate: 1909.00,
                    fullRate: 2781.00,
                    bonusRate: 3540.00
                },
                {
                    years: 30,
                    amount: 9336.30,
                    penaltyRate: 1938.00,
                    fullRate: 2807.00,
                    bonusRate: 3567.00
                },
                {
                    years: 32,
                    amount: 9336.30,
                    penaltyRate: 1938.00,
                    fullRate: 2807.00,
                    bonusRate: 3567.00
                },
                {
                    years: 34,
                    amount: 9336.30,
                    penaltyRate: 1938.00,
                    fullRate: 2807.00,
                    bonusRate: 3567.00
                },
                {
                    years: 36,
                    amount: 9336.30,
                    penaltyRate: 1938.00,
                    fullRate: 2807.00,
                    bonusRate: 3567.00
                },
                {
                    years: 38,
                    amount: 9336.30,
                    penaltyRate: 1938.00,
                    fullRate: 2807.00,
                    bonusRate: 3567.00
                },
                {
                    years: 40,
                    amount: 9336.30,
                    penaltyRate: 1938.00,
                    fullRate: 2807.00,
                    bonusRate: 3567.00
                }

            ]
        },
        {
            rank: 'W-5',
            pay: [
                {
                    years: 20,
                    amount: 8912.10,
                    penaltyRate: 1871.00,
                    fullRate: 2724.00,
                    bonusRate: 3506.00
                },
                {
                    years: 22,
                    amount: 9364.20,
                    penaltyRate: 1942.00,
                    fullRate: 2810.00,
                    bonusRate: 3571.00
                },
                {
                    years: 24,
                    amount: 9701.10,
                    penaltyRate: 1995.00,
                    fullRate: 2846.00,
                    bonusRate: 3620.00
                },
                {
                    years: 26,
                    amount: 10073.40,
                    penaltyRate: 2053.00,
                    fullRate: 2887.00,
                    bonusRate: 3674.00
                },
                {
                    years: 28,
                    amount: 10073.40,
                    penaltyRate: 2053.00,
                    fullRate: 2887.00,
                    bonusRate: 3674.00
                },
                {
                    years: 30,
                    amount: 10578.00,
                    penaltyRate: 2099.00,
                    fullRate: 2943.00,
                    bonusRate: 3747.00
                },
                {
                    years: 32,
                    amount: 10578.00,
                    penaltyRate: 2099.00,
                    fullRate: 2943.00,
                    bonusRate: 3747.00
                },
                {
                    years: 34,
                    amount: 11106.00,
                    penaltyRate: 2138.00,
                    fullRate: 3000.00,
                    bonusRate: 3824.00
                },
                {
                    years: 36,
                    amount: 11106.00,
                    penaltyRate: 2138.00,
                    fullRate: 3000.00,
                    bonusRate: 3824.00
                },
                {
                    years: 38,
                    amount: 11662.50,
                    penaltyRate: 2179.00,
                    fullRate: 3061.00,
                    bonusRate: 3904.00
                },
                {
                    years: 40,
                    amount: 11662.50,
                    penaltyRate: 2179.00,
                    fullRate: 3061.00,
                    bonusRate: 3904.00
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
        let penalty = 0;
        let full = 0;
        let bonus = 0;
        for (let i = 0; i < payscale.length; i++) {
            if (retirementRank === payscale[i].rank) {
                for (let j = 0; j < payscale[i].pay.length; j++) {
                    if (parseInt(yearsInService) === payscale[i].pay[j].years) {
                        offsetPay = parseInt(payscale[i].pay[j].amount);
                        penalty = Math.round((parseInt(payscale[i].pay[j].penaltyRate) * 12 * 100 * .8) / 100);
                        full = Math.round((parseInt(payscale[i].pay[j].fullRate) * 12 * 100) / 100 * .8);
                        bonus = Math.round((parseInt(payscale[i].pay[j].bonusRate) * 12 * 100) / 100 * .8);
                    }
                }
            }
        }
        setPenaltySS(penalty);
        setFullSS(full);
        setBonusSS(bonus)
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
            <Row id="hide">
                <Col>
                </Col>
                <Col xs={8}>
                    <br></br>
                    <br></br>
                    <h1>Financial Independence Calculator</h1>
                    <br></br>
                    <h2>You can retire at age {retirementAge}</h2>
                    <div>Civilian target retirement: {targetRetAmt ? formatter.format(targetRetAmt) : 0}</div>
                    <form className='text-start'>
                        <div className='d-flex flex-column w-100'>
                            <label>
                                Annual retirement expenses (today's dollars)
                            </label>
                            <input
                                className='w-25'
                                type='number'
                                value={annualRetExp}
                                onChange={(e) => setAnnualRetExp(parseInt(e.target.value) || 0)}
                            />
                            <label>
                                Current Age
                            </label>
                            <input
                                className='w-25'
                                type='number'
                                className='w-25'
                                value={currentAge}
                                onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
                            />
                            <label>
                                Current savings balance
                            </label>
                            <input
                                type='number'
                                className='w-25'
                                value={currentSavings}
                                onChange={(e) => setCurrentSavings(parseInt(e.target.value) || 0)}
                            />
                            <label>
                                Regular contributions
                            </label>
                            <input
                                type='number'
                                className='w-25'
                                value={contributions}
                                onChange={(e) => setContributions(parseInt(e.target.value) || 0)}
                            />
                            <label>
                                Contribution frequency
                            </label>
                            <select
                                value={contributionFreq}
                                className='w-25'
                                onChange={(e) => setContributionFreq(parseInt(e.target.value) || 0)}
                            >
                                <option value='Monthly'>Monthly</option>
                                <option value='Annually'>Annually</option>
                            </select>
                            <h2>Advanced</h2>
                            <label>
                                Pre-retirement rate of return
                            </label>
                            <input
                                type='number'
                                className='w-25'
                                value={preRetROR}
                                onChange={(e) => setPreRetROR(parseInt(e.target.value) || 0)}
                            />
                            <label>
                                Post-retirement rate of return
                            </label>
                            <input
                                type='number'
                                className='w-25'
                                value={postRetROR}
                                onChange={(e) => setPostRetROR(parseInt(e.target.value) || 0)}
                            />
                            <label>
                                Inflation
                            </label>
                            <input
                                type='number'
                                className='w-25'
                                value={inflation}
                                onChange={(e) => setInflation(parseInt(e.target.value) || 0)}
                            />
                            <br></br>
                            <h2>Military Career</h2>
                            <label>
                                Projected retirement rank
                            </label>
                            <select
                                value={retirementRank}
                                className='w-25'
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
                            <label>
                                Years until retirement:
                            </label>
                            <select
                                value={activeDutyAge}
                                className='w-25'
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
                            <label>
                                Total years served:
                            </label>
                            <select
                                value={yearsInService}
                                className='w-25'
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
                            <br></br>
                            <h2>VA Disability</h2>
                            <label>
                                Are you service connected?
                                <input onChange={(() => VA === false ? setVA(true) : setVA(false))} type='checkbox'></input>
                                <div hidden={VA === true ? false : true}>
                                    Service connected disability %.
                                </div>
                                <select hidden={VA === true ? false : true}
                                    className='w-25'
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
                                    Number of dependents
                                </div>
                                <select hidden={VA === true ? false : true}
                                    className='w-25'
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
                                    Children under 18:
                                </div>
                                <input
                                    type='number'
                                    className='w-25'
                                    value={adtlChildren}
                                    onChange={(e) => setAdtlChildren(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <label hidden={VA === true ? false : true}>
                                <div>
                                    Children over 18 in school:
                                </div>
                                <input
                                    type='number'
                                    className='w-25'
                                    value={schoolChildren}
                                    onChange={(e) => setSchoolChildren(parseInt(e.target.value) || 0)}
                                />
                            </label>
                            <label hidden={VA === true ? false : true}>
                                Spouse (if applicable) receiving aid/attendance?
                                <input onChange={(() => spouseAid === false ? setSpouseAid(true) : setSpouseAid(false))} type='checkbox'></input>
                            </label>
                            <label hidden={VA === true ? false : true}>
                                <div>
                                    Years (if applicable) until youngest child turns 18?
                                </div>
                                <input
                                    type='number'
                                    className='w-25'
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
            <Row id="hide">
                <br></br>
                <div>
                    <center><strong>Retirement Goal as a Civilian:</strong></center>
                </div>
                <ResponsiveContainer width={"100%"} aspect={2}>
                    <AreaChart data={data} margin={{ top: 10, right: 5, left: 5, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<TooltipContent />} />
                        <Legend />
                        <XAxis dataKey={"Year"} />
                        <YAxis width={120} tickFormatter={(value) => formatter.format(value)} type={(value) => formatter.format(value)} />
                        <Area type="monotone" dataKey="Balance" stroke="#8884d8" fillOpacity={0.7} fill="green" />
                    </AreaChart>
                </ResponsiveContainer>
            </Row>
                <br></br>
            <Row>
                <div id="chart" hidden={pension ? false : true}>
                    <div>
                        Annual military retirement pay based on your
                        grade and {yearsInService ? yearsInService : 20} years served after tax: 
                        <strong> {pension ? formatter.format(pension) : 0}</strong>
                    </div>
                    <br></br>
                    <div>
                        The amount you need to make up in order to reach your annual retirement expenses:
                        <strong> {newRetirementExpense ? formatter.format(newRetirementExpense) : 0}</strong>
                    </div>
                    <br></br>
                    <div id="chart2">
                        Your updated target retirement amount based on your pension: {newTargetRetAmt ? formatter.format(newTargetRetAmt) : 0}
                    </div>
                    <center><h2>New retirement age: {newRetAge ? newRetAge : null}</h2></center>
                    <br></br>
                    <center><strong>Retirement Goal as a Retired Veteran:</strong></center>
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
               
                <div id="chart3" hidden={VA ? false : true}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                    <div>
                        Annual military retirement pay + disability based on your
                        grade and {yearsInService ? yearsInService : 20} years served after tax: <strong> {pensionWithVA ? formatter.format(pensionWithVA) : 0}</strong>
                    </div>
                    <br></br>
                    <div>
                        The amount you need to make up in order to reach your annual retirement expenses:
                        <strong> {newRetirementExpenseWithVA ? formatter.format(newRetirementExpenseWithVA) : 0}</strong>
                    </div>
                    <br></br>
                    <div id="chart">
                        Your updated target retirement amount based on your pension: <strong> {targetRetAmtWithVA ? formatter.format(targetRetAmtWithVA) : 0}</strong>
                    </div>
                    <center><h2>New retirement age {retAgeWithVA ? retAgeWithVA : null}</h2></center>
                    <br></br>
                    <center><strong>Retirement Goal as a Retired Veteran with Disability:</strong></center>
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
                <br></br>
                <br></br>
                <div id="chart" hidden={pension ? false : true} className='text-center'>
                    <div hidden={VA ? true : false}>
                        Final annual retirement pay with military pension and social security:<br></br>
                        <div className='fw-bold'>
                            Ages {parseInt(currentAge)+parseInt(activeDutyAge)} to 62: {formatter.format(pension)}<br></br>
                            Age 62: {formatter.format(pension + penaltySS)}<br></br>
                            Age 67: {formatter.format(pension + fullSS)}<br></br>
                            Age 70: {formatter.format(pension + bonusSS)}<br></br>
                        </div>
                        <button id="printBtn" className='btn btn-dark pageBtn m-2' onClick={() => exportPdf()}>Save Results</button>
                    </div>
                </div>
                <div id="chart" hidden={VA ? false : true} className='text-center'>
                    Final annual retirement pay with military pension, disability, and social security not counting
                    annuity payouts for your investments:<br></br>
                    <strong>Ages {parseInt(currentAge)+parseInt(activeDutyAge)} to 62: {formatter.format(pensionWithVA)}</strong><br></br>
                    <strong>Age 62: {formatter.format(penaltySS + pensionWithVA)}</strong><br></br>
                    <strong>Age 67: {formatter.format(fullSS + pensionWithVA)}</strong><br></br>
                    <strong>Age 70: {formatter.format(bonusSS + pensionWithVA)}</strong><br></br>
                <button id="printBtn" className='btn btn-dark pageBtn m-2' onClick={() => exportPdf()}>Save Results</button>
                </div>
            </Row>
        </Container>
    )
}

export default FinanceCalculator