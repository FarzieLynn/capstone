import { Container, Row, Col } from 'react-bootstrap'
import './stylesheets/Finance.css'

const FinanceBeginner = () => {
    return (
        <Container>
            <br></br>
            <Row>
                <Col className='col'>
                    <img width='300px' src='https://cdn.corporatefinanceinstitute.com/assets/finance-definition.jpg' alt='Finance' />
                </Col>
                <Col className='col'>
                    <strong>Create a Budget</strong> — Look at all your monthly expenses and divide them into needs
                    vs. wants. Determine what you can do without, but don’t cut out all of the fun
                    things you enjoy. It’s important to leave yourself some room for a concert or
                    dinner out every now and then. However, you can probably cut out recurring things
                    that aren’t essential and can be quite expensive, such as cable or a gym membership.
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col className='col'>
                    <strong>Pay Attention to Interest Rates</strong> — Pay off high-interest loans first, so that
                    you’re not paying more than necessary in the long run. Also, open a savings account with the best
                    interest rate, and make your money work for you.
                </Col>
                <Col className='col'>
                    <img width='300px' src='http://www.chalet-ancolie.com/wp-content/uploads/2021/12/Financial-Function.jpg' alt='' />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <img width='300px' src='https://investedwallet.com/wp-content/uploads/2019/02/best-personal-finance-tips.webp' alt ='' />
                </Col>
                <Col>
                    <strong>Set Aside a Reasonable Percentage for Savings</strong> — Financial experts recommend
                    allocating 20% of your income towards savings. You can do this by following the famous 50/20/30 
                    rule of budgeting. If you can follow this rule, you’ll be able to build an emergency fund, pay
                     off your consumer debts, and kickstart a retirement savings.
                </Col>
            </Row>
        </Container>
    );
}

export default FinanceBeginner;