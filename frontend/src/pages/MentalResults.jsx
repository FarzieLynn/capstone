import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import './stylesheets/MentalResults.css';


export default function MentalResults({score}) {


  const exportPdf = async () => {
    window.print()
}

  return (
    
    <Container id="results">
  
    <Row>
        <h3>Your condition is "{`${score}`}".</h3>
    </Row>
        <Row>
        <h5 className="text-start"> Here are some tips to help you get started with self-care: </h5> 
          </Row>
          <Row>
          <Stack gap={4} className="text-start" >
          <ol>
            <li>A balanced diet and plenty of water can improve your energy and focus throughout the day. Also, limit caffeinated beverages such as soft drinks or coffee.</li>
            <li>Get regular exercise. Just 30 minutes of walking every day can help boost your mood and improve your health. Small amounts of exercise add up, so don’t be discouraged if you can’t do 30 minutes at one time.</li>
            <li>Eat healthy, regular meals and stay hydrated.</li>
            <li>Make sleep a priority. Stick to a schedule, and make sure you’re getting enough sleep. Blue light from devices and screens can make it harder to fall asleep, so reduce blue light exposure from your phone or computer before bedtime.</li>
            <li>Try a relaxing activity. Explore relaxation or wellness programs or apps, which may incorporate meditation, muscle relaxation, or breathing exercises. Schedule regular times for these and other healthy activities you enjoy such as journaling.</li>
            <li>Set goals and priorities. Decide what must get done now and what can wait. Learn to say “no” to new tasks if you start to feel like you’re taking on too much. Try to be mindful of what you have accomplished at the end of the day, not what you have been unable to do.</li>
            <li>Practice gratitude. Remind yourself daily of things you are grateful for. Be specific. Write them down at night, or replay them in your mind</li>
            <li>Focus on positivity. Identify and challenge your negative and unhelpful thoughts.</li>
            <li>Stay connected. Reach out to your friends or family members who can provide emotional support and practical help.</li>
            <li>Self-care looks different for everyone, and it is important to find what you need and enjoy. It may take trial and error to discover what works best for you. In addition, although self-care is not a cure for mental illnesses, understanding what causes or triggers your mild symptoms and what coping techniques work for you can help manage your mental health.</li>
          </ol>         
        <strong className="text-center">If you or someone you know is struggling or having thoughts of suicide, call or text the 988 Suicide & Crisis Lifeline at 988 or chat at 988lifeline.org. This service is confidential, free, and available 24 hours a day, 7 days a week. In life-threatening situations, call 911.</strong>
        </Stack>
        </Row>
    
      <button id="printBtn" className='btn btn-dark pageBtn m-2' onClick={() => exportPdf()}>Save Results</button> 
    </Container>
  )
}
