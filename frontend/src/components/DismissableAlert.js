import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const DismissableAlert = ({alert, setShowAlert}) => {
  //To use this you must pass an object to alert with an error boolean and a message string
  //You must also pass a setShowAlert function that is a boolean to be able to click out of the alert

  return (
    <>
      <Alert show={true} variant={alert.error ? "danger" : "success"} onClose={() => setShowAlert(false)} className="pt-0 pb-0 mt-3 " >
      

        <div className="d-flex justify-content-between align-items-center p-1 m-0">
        <span>
          {alert.message}
        </span>
        
          <button type="button" className="btn-close p-0 m-0" aria-label="Close alert" onClick={() => setShowAlert(false)}></button>
        </div>

      </Alert>
    </>
  );
}