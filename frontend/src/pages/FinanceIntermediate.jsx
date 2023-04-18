import { Container, Row, Col } from 'react-bootstrap'
import './stylesheets/Finance.css'

const FinanceIntermediate = () => {
    const exportPdf = () => {
    
        window.print()
    }
    return (
        <Container>
            <br></br>
            <Row>
                <Col>
                    <img width='300px' src='https://dividendsdiversify.com/wp-content/uploads/2019/09/debt.jpg' alt=''/>
                </Col>
                <Col>
                    <strong>Reduce or Eliminate Debt</strong> - A great intermediate financial goal is to
                    payoff debt.  Depending on your situation, this could take several years.  Getting your
                    debt under control is a key factor in avoiding financial problems.  The first debt to
                    look at is high-interest debt.  Usually, this is credit cards, but isn't necessarily
                    then only factor.  There is no better use for the excess cash you can create than paying
                    off higher interest credit card bills. 
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <strong>Pay off the highest interest first</strong> - Take a look at your student loan debt,
                     if you have any.  The average interest rate on student loan debt in the U.S. is about 6%.
                     This isn't too bad, but combined with other debt it can begin to add up.  If it is the highest
                     interest rate of your debts, you should seek to pay it off first to save yourself the most
                     possible money in the long run.  You can then put that saved interest towards something else,
                     like another debt (next highest interest) or an investment.
                </Col>
                <Col>
                    <img width='300px' src='https://dividendsdiversify.com/wp-content/uploads/2020/05/wealth-building-is-important.png' alt=''/>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <img width='300px' src='https://dividendsdiversify.com/wp-content/uploads/2020/11/insurance-policy.jpg' alt=''/>
                </Col>
                <Col>
                    <strong>Look into Home Ownership</strong> - If your debt to income ratio is looking pretty healthy
                    (lower than 30%), and you don't already own a home, start to look towards home ownership.  Maybe you
                    have your dream home picked out?  If you're seeking financial assistance here, it is more likely than
                    not you qualify for a VA loan, which doesn't require anything down.  It is one of the easiest ways to
                    get your foot in the door and own your own property.  Be careful, do your research, and avoid making
                    any quick decisions.  Set aside a pool of money for repairs, renovations, and any other fees you can
                    think of.
                </Col>
            </Row>
            <button className='btn btn-dark pageBtn m-2' onClick={() => exportPdf()}>Print PDF</button>
            <br></br>
        </Container>
    );
}
 
export default FinanceIntermediate;