import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import StepOne from "./steps/Step1"
import StepTwo from "./steps/Step2"
import StepThree from "./steps/Step3"
import StepFour from "./steps/Step4"
import StepFive from "./steps/Step5"
import StepSix from "./steps/Step6"
import StepSeven from "./steps/Step7"
import StepEight from "./steps/Step8"
import StepNine from "./steps/Step9"
import Pdf from "./steps/Pdf";
export default function SurveyForm() {
    const [data, setData] = useState({
        first_name: 0,
        last_name: "",
        email: "",
        password: ""
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [width, setWidth] = useState(12);

    const makeRequest = (formData) => {
        console.log("Form Submitted", formData);
    };

    const handleNextStep = (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));
        if (final) {
            makeRequest(newData);
            return;
        }
        setCurrentStep((prev) => prev + 1);
        setWidth((prev) => prev + 11);
    };

    const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1);
        setWidth((prev) => prev - 11);
    };
    const steps = [
        // <Pdf />,
        <StepOne next={handleNextStep} data={data} />,
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepFour next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepFive next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepSix next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepSeven next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepEight next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepNine next={handleNextStep} prev={handlePrevStep} data={data} />
    ];

    return (
        <div className="content-body">
            <div className="container-fluid bg-img">
                <div className="form-head mb-4 flex-wrap align-items-center">
                    <div className="me-auto">
                        <div className="row justify-content-center">
                            <div className="col-lg-12 text-center p-0 mt-3 mb-2 form-box" style={{ marginBottom: '40px !important' }}>
                                <div className="px-0 pb-0 mt-3 mb-3">
                                    <div id="msform">
                                        {/* <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin={0} aria-valuemax={100} style={{ width: `${width}%` }} />
                                        </div> */}
                                        <div className="App">{steps[currentStep]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// const stepOneValidationSchema = Yup.object({
//     first_name: Yup.string().required().label("First name"),
//     last_name: Yup.string().required().label("Last name")
// });

// const StepOne = (props) => {
//     const handleSubmit = (values) => {
//         props.next(values);
//     };

//     return (
//         <Formik
//             validationSchema={stepOneValidationSchema}
//             initialValues={props.data}
//             onSubmit={handleSubmit}
//         >
//             {() => (
//                 <Form>
//                     <p>First Name</p>
//                     <Field name="first_name" />
//                     <ErrorMessage name="first_name" />

//                     <p>Last Name</p>
//                     <Field name="last_name" />
//                     <ErrorMessage name="last_name" />

//                     <button type="submit">Next</button>
//                 </Form>
//             )}
//         </Formik>
//     );
// };

// const stepTwoValidationSchema = Yup.object({
//     email: Yup.string().required().email().label("Email"),
//     password: Yup.string().required().label("Password")
// });

// const StepTwo = (props) => {
//     const handleSubmit = (values) => {
//         props.next(values, true);
//     };

//     return (
//         <Formik
//             validationSchema={stepTwoValidationSchema}
//             initialValues={props.data}
//             onSubmit={handleSubmit}
//         >
//             {({ values }) => (
//                 <Form>
//                     <p>Email</p>
//                     <Field name="email" />
//                     <ErrorMessage name="email" />

//                     <p>Password</p>
//                     <Field name="password" />
//                     <ErrorMessage name="password" />

//                     <button type="button" onClick={() => props.prev(values)}>
//                         Back
//                     </button>
//                     <button type="submit">Submit</button>
//                 </Form>
//             )}
//         </Formik>
//     );
// };
