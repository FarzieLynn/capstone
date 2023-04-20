import ProfessionalPrivacyAgreement from '../components/forms/ProfessionalPrivacyAgreement';
import { useNavigate } from 'react-router-dom';

function ProfessionalPrivacyAgreementPage() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const { printed_name, supporting_docs_attachments } =
            document.forms[0];

        if (printed_name.value === "" || supporting_docs_attachments.value === "") {
            alert("Please fill out all form elements.");
            return;
        }
        else {
            //setAlertBool(true);
            navigate("/login");
            return;
        }
    };

    return (
        <div>
            <div className="login-page">
                <div className="login-form" style={{ maxWidth: 600 }}>
                    {/* {alertBool
                        ?
                            <Alert variant="primary">Success! Your Professional Profile has been submitted for review. Once your review has been completed, you will be sent an email of confirmation or disapproval to the email provided. Please be sure to check your spam folder. Please allow 24 to 48 business hours for approval review.<Button onClick={closeAlert}>Close</Button> 
                            </Alert>
                        :
                        <>
                            <div className="title">Military Anonymous Professional Privacy Statement of Agreement & Understanding</div>
                            <ProfessionalPrivacyAgreement handleSubmit={handleSubmit} />
                        </>
                    } */}
                    <>
                        <div className="title">Military Anonymous Professional Privacy Statement of Agreement & Understanding</div>
                        <ProfessionalPrivacyAgreement handleSubmit={handleSubmit}/>
                    </>
                </div>

            </div>
        </div>
    )
}

export default ProfessionalPrivacyAgreementPage