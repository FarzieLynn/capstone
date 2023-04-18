import { Container, Row, Col } from 'react-bootstrap'
import './stylesheets/Finance.css'


const FinanceAdvanced = () => {

    const exportPdf = () => {
    
        window.print()
    }
      
    return (
        <Container id='advanced'>
            <br></br>
            <Row>
                <Col>
                    <img width='300px' src='https://canadianmortgagepro.com/images/buying-a-rental-income-property.jpg' alt=''/>
                </Col>
                <Col>
                    <strong>Take a look at Rental Properties</strong> - With your high score in the finance questionnaire,
                    you should take a look into rental properties if you haven't done so yet.  Not only do you generate
                    monthly income from rental prices, but your underlying asset grows in price (generally) as well.  If
                    you are able to acquire rental properties for a good price (do your analysis!), you'll grow your monthly
                    cash flow as well as your underlying asset value, creating generational wealth.
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <strong>Consider Buying and Selling Options Contracts</strong> - If you haven't ever looked into options
                    contracts, let today be the day.  They are single handedly one of the best financial instrucments to
                    grow wealth with.  You can purchase call options to capture the upswing of an asset, or you can purchase
                    put options to place "insurance" on it.  Take a look at selling call options on stocks that you own not
                    too far outside the money for a consistent return each month.  
                </Col>
                <Col>
                    <img width='300px' src='https://cdn.wallstreetmojo.com/wp-content/uploads/2019/12/Option-Contract-1.jpg' alt=''/>
                    <img width='300px' src='https://cdn.wallstreetmojo.com/wp-content/uploads/2015/09/Long-Put.png' alt=''/>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                    <img width='300px' src='https://images.ctfassets.net/dzdmblwsahji/3A4rsy1mxou837cpyLFTbK/c262265a59aed8ab645c82a1a3554aaf/Types-of-Microlenders_1.0.png?fl=progressive&fm=jpg' alt=''/>
                    <br></br>
                    <img width='300px' src='https://www.lendee.com/wp-content/webp-express/webp-images/uploads/2022/10/Peer-to-peer-Microlending.jpg.webp' alt=''/>
                </Col>
                <Col>
                    <strong>Look into Microloans as a Lender</strong> - If you are generating excess cash flow and building
                    a portfolio of wealth, take a look into offering microloans and lending services to other people and/or
                    small businesses.  Microloan interest rates typically range between 5% and 20%, and the repayment terms
                    are negotiable between a few months to 7 years.  Generally, microloans are for less than $50,000, with
                    SBA microloans averaging $14,735 in FY2019.  This can be a super easy way to take some of your money and
                    have it generate even more money, while doing little to no work.  This is also known as passive income.
                </Col>
            </Row>
            <button className='btn btn-dark pageBtn m-2' onClick={() => exportPdf()}>Print PDF</button>
        </Container>
    );
}
 
export default FinanceAdvanced;