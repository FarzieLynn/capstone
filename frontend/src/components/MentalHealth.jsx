import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import { Button, Form } from 'react-bootstrap';

function MentalHealth() {
  const [surveyTable, setSurveyTable] = useState([]);
  const [surveyResults, setSurveyResults] = useState([]);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');


  const save = (value) => {alert(value)}
  const cancel = () => {alert("Cancelled")}

  const generateOptionsList = () => {
    return [
      { label: 'Never', value: 'one' },
      { label: 'Sometimes', value: 'two' },
      { label: 'Frequently', value: 'three' },
      { label: 'Always', value: 'four' }
    ];

  };

  let surveyQuestionsList = ['Feeling nervous, anxious or on edge?', 'Not being able to stop or control worrying?','Worrying too much about different things?','Trouble relaxing?', 'Being so restless that it is hard to sit still?','Becoming easily annoyed or irritable?', 'Feeling afraid as if something awful might happen?']
  console.log(surveyQuestionsList)

   
      surveyQuestionsList.map(question => { surveyTable.push(
       <>
       <li className="list-group-item">
       <h6>{question}</h6> 
        <Form>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Never"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />
               <Form.Check
                  inline
                  label="Sometimes"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                />
                 <Form.Check
                  inline
                  label="Frequently"
                  name="group1"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="Always"
                  name="group1"
                  type={type}
                  id={`inline-${type}-3`}
                />
              </div>
          ))}
        </Form>
      </li>
      </>
      )
      });
       return(
        <div>
        <h1>Mental Health Survey</h1>
          
          <ul className="list-group list-group-flush">
              {surveyTable}
          </ul>
          <Button variant="dark">Save Results</Button>
          </div>
       )

      }

export default MentalHealth;