import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Step1(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;
    const token = localStorage.getItem("jwt");
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("");
    const [question, setquestion] = useState("");
    const uid = JSON.parse(localStorage.getItem('survey_token'));
    const [loading, setloading] = useState(0);


    const [OptData, setOptData] = useState("")
    const [OptionVal, setOptionVal] = useState("")
    const [impVal, setimpVal] = useState(0)

    const [questionId, setquestionId] = useState("")

    const [data, setData] = useState({
        // inputVal: 0,
        last_name: "",
        email: "",
        password: "",
        que1: "",
    });

    // let uid = 1;
    const [value, setValue] = useState(0);
    const handleChange = (e) => {
        setimpVal(e.target.value);
    }


    const handleSubmit = (values) => {
        console.log(impVal)
        if (impVal == 0) {
            return false
        }
        console.log(questionId);
        if (OptData) {
            console.warn("update")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // inputList.map((item,key)=>{
            var raw = JSON.stringify({
                survey_id: 0,
                employee_id: uid.employeeId,
                survey_user_mapping_id: 0,
                surveyor_id: uid.userId,
                company_id: uid.companyId,
                manager_id: uid.managerId,
                question_id: questionId,

                option_id: 190,
                answer: impVal,
                created_by: uid.userId,
                updated_by: uid.userId
            });
            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`http://208.109.14.182:9000/masters/survey_answers/${OptData}`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Values Submitted Succesfully");
                        GetAllRecords();
                        props.next(values);

                    }
                    // GetAllRecords();
                })
                .catch((error) => console.log("error", error));

        } else {
            console.warn("post")
            // props.next(values);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // inputList.map((item,key)=>{
            var raw = JSON.stringify({
                survey_id: 0,
                employee_id: uid.employeeId,
                survey_user_mapping_id: 0,
                surveyor_id: uid.userId,
                company_id: uid.companyId,
                manager_id: uid.managerId,
                question_id: questionId,

                option_id: 190,
                answer: impVal,
                created_by: uid.userId,
                updated_by: uid.userId,
            });
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`http://208.109.14.182:9000/masters/survey_answers/`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Values Submitted Succesfully");
                        GetAllRecords();
                        props.next(values);

                    }
                    // GetAllRecords();
                })
                .catch((error) => console.log("error", error));


        }

    };
    const stepOneValidationSchema = Yup.object({
        // first_name: Yup.number().required().label("First name").min(1, "Please select a value")
        // last_name: Yup.string().required().label("Last name")
    });

    const GetAllRecords = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(uid.userId)

        const response3 = fetch(`http://208.109.14.182:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result.data[0].first_name)
                setfirst_name(result.data[0].first_name)
                setlast_name(result.data[0].last_name)
            }).then(() => {
                fetch(`http://208.109.14.182:9000/masters/question/q_type/3`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // setlistRecord(result.data);
                        console.log(result.data[0], "hh")

                        let qID = result.data[0].id;
                        setquestionId(qID);
                        console.log(result.data[0].id)
                        console.log(result.data[0].id)
                        setquestion(result.data[0].question);
                        getOptions(result.data[0].id);
                    })

                    .catch(error => console.log('error', error));
            }).then(() => setloading(0))


    }


    const getOptions = (resIdC) => {
        // console.log("checkIDsss", resIdC, questionId)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw1 = JSON.stringify({
            surveyor_id: uid.userId,
            question_id: resIdC,
        });
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw1,
            redirect: "follow",
        };

        const response3 = fetch(`http://208.109.14.182:9000/masters/survey_answers_same`, requestOptions)
            .then(response3 => response3.json())
            .then(rwsOpt => {
                // setlistRecord(rwsOpt.data);

                // console.log(questionId, "jj")
                if (rwsOpt.data) {
                    console.log(rwsOpt.data.id)
                    console.log(rwsOpt.data.answer)

                    setOptData(rwsOpt.data.id);
                    setOptionVal(rwsOpt.data.answer)
                    setimpVal(rwsOpt.data.answer)

                }

            })
    }

    useEffect(() => {
        setloading(1)
        GetAllRecords()
    }, []);

    if (loading === 1) {
        return <div className="loader"> <CircularProgress /></div>
    }

    return (
        // <fieldset>
        <div>
            <Formik
                validationSchema={stepOneValidationSchema}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    const {
                        values,
                        // handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty
                    } = formik;
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="steps">10%</h2>
                                    <h3 className="smtxt">1 = Poor &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Outstanding &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3>
                                </div>
                            </div>
                            <div className="form-card">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className="fs-title-m">First, we’d like you to give us an overall rating (all things considered) for the performance period.</p>
                                        <h2 className="fs-title1">[1-10 scale] Overall, {question.replace("[FIRST NAME]", first_name)}</h2>

                                        <div className="card pad-card">
                                            <div className="range-slider">
                                                <input className="range-slider__range" type="range" value={impVal} onChange={handleChange} name="inputVal" defaultValue={OptionVal} min={0} max={10} />
                                                <span className="range-slider__value" style={{ backgroundColor: impVal == 0 || impVal == "" || impVal == "NA" ? "rgb(221,38,60)" : "" }} >{impVal == 0 ? "NA" : impVal}</span> </div>
                                            {/* <span className="range-slider__value" style={{backgroundColor:"rgb(221,38,60)"}} >{impVal == 0 ? "NA" : impVal}</span> </div> */}

                                            <div>
                                                {errors.inputVal && touched.inputVal && (
                                                    <span className="error">{errors.inputVal}</span>
                                                )}</div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="button btn-align-step">
                                            <button type="submit" className="btn-next-step">Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <input type="button" onClick={() => props.next()} name="next" className="next action-button" defaultValue="Next" /> */}

                        </Form>
                    );
                }}
            </Formik>
        </div>
        //  </fieldset >
    )
}

