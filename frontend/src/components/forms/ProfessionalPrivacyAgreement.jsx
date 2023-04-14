import { Form, Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProfessionalPrivacyAgreement({ handleSubmit }) {
    const navigate = useNavigate();
    // const supportingDocs = [];

    const handleUpload = (e) => {
        // Below conditional goes through uploaded files and adds them to supportingDocs array above
        // Not sure if we'll need to validate these for now, but adding just in case
        // if (e.target.files) {
        //     for (let i = 0 ; i < e.target.files.length ; i++ ) {
        //         let file = e.target.files[i];
        //         supportingDocs.push(file);
        //     }            
        // }
    }

    return (
        <Form>
            <Form.Text style={{ whiteSpace: 'pre-wrap' }}>
                {"*Must be agreed to by professional before profile is created*\n"}

                {"\tI hereby affirm that I am qualified to provide expertise in the areas previously stated on the Military Anonymous platform. I understand the gravity of my role and the importance of providing support and guidance to individuals seeking help.\n"}

                {"\tI possess the necessary qualifications, training, and experience to offer advice and guidance in the area(s) previously stated. I hold a Degree/Certification/License in the required field of study and have qualifying years of experience working in the related field that I will provide documentation for below.\n"}

                {"\tI understand that the individuals seeking help on the Military Anonymous platform may be dealing with complex issues, including mental health concerns, financial management, fitness and nutrition, and/or mentorship. I am committed to offering my services with the utmost professionalism, confidentiality, and empathy.\n"}

                {"\tI further attest that I have read and understand the privacy statement of the Military Anonymous platform, and I will not sell any user information or charge any fees for my services. I will maintain strict confidentiality and adhere to all guidelines and regulations set forth by the Military Anonymous platform.\n"}

                {"\tI affirm that I will provide my services on a voluntary basis and set my own availability on the platform. I understand that my involvement is purely voluntary, and I may withdraw my services at any time.\n"}

                {"\tIn conclusion, I am committed to offering my expertise in the area of expertise previously stated to those seeking help on the Military Anonymous platform. I will conduct myself with professionalism, confidentiality, and empathy, and I understand the importance of maintaining strict privacy and adherence to all guidelines and regulations set forth by the platform."}
            </Form.Text>
            <Form.Group className="mb-3">
                <Form.Label>Print First and Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="printed_name"
                    placeholder="First and Last Name"
                />
                <Form.Label style={{ fontStyle: 'italic', fontSize: 'small' }}>By signing this document you confirm that all information provided is true.</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Upload Supporting Documentation</Form.Label>
                <Form.Control
                    type="file"
                    multiple
                    name="supporting_docs_attachments"
                    onChange={handleUpload}
                />
            </Form.Group>

            <Button
                variant="primary"
                className="m-2"
                onClick={(e) => handleSubmit(e)}
            >
                Create Account
            </Button>
            <Button variant="primary" onClick={(e) => navigate("/login")}>
                Cancel
            </Button>
        </Form>
    );
}

export default ProfessionalPrivacyAgreement;
