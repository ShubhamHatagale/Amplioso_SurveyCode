import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CircularProgress } from '@material-ui/core';

export default function Step2(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;

    const uid = JSON.parse(localStorage.getItem('survey_token'));

    const [question, setquestion] = useState("")
    const [questionId, setquestionId] = useState("")
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [OptionData, setOptionData] = useState([])
    const [inputValue, setinputValue] = useState([{ inpV: "" }])
    const [SurveyAnswers, setSurveyAnswers] = useState([])

    const [OptData, setOptData] = useState("")
    const [OptionVal, setOptionVal] = useState("")
    const [impVal, setimpVal] = useState(0)
    const [loading, setloading] = useState(0)

    // let uid.userId = 1;
    const handleChange = (e) => {
        // setimpVal(e.target.value);
        var value1 = e.target.value;

        console.log(OptData);
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

                option_id: 191,
                answer: value1,
                created_by: uid.userId,
                updated_by: uid.userId,
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
                        // props.next(values);

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

                option_id: 191,
                answer: value1,
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
                        // props.next(values);

                    }
                    // GetAllRecords();
                })
                .catch((error) => console.log("error", error));


        }
    }


    const inputChange = (e) => {
        let val1 = e.target.value;
        let updId = e.target.id;
        console.log(val1)
        console.log(updId)
        setinputValue(val1);

        // if(updId){
        //     alert(updId)
        // }else{
        //     alert("erro")

        // }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // inputList.map((item,key)=>{
        var raw = JSON.stringify({
            survey_id: 0,
            survey_user_mapping_id: 0,
            surveyor_id: uid.userId,
            question_id: 0,
            option_id: updId ? updId : 0,
            answer: val1,
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
                }
                // GetallRecords();
            })
            .catch((error) => console.log("error", error));


        // props.next(values);


    }


    useEffect(() => {
        setloading(1)
        GetAllRecords().then(()=>{
            setloading(0)
        })

    }, []);

    if (loading === 1) {
        return <div className="loader"> <CircularProgress /></div>
    }


    const GetAllRecords = async () => {
        // console.log(props.data.que1)
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`http://208.109.14.182:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log("11111")
                console.log(result.data[0].first_name)
                setfirst_name(result.data[0].first_name)
                setlast_name(result.data[0].last_name)
            })
            .catch(error => console.log('error', error));

        const response2 = await fetch(`http://208.109.14.182:9000/masters/question/q_type/3`, requestOptions)
            .then(response2 => response2.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result)
                // if(result.length>0){
                let qID = result.data[5].id;
                setquestionId(qID);
                console.log(result.data[5].id)
                console.log(result.data[5].id)
                setquestion(result.data[5].question);
                getOptions(result.data[5].id);
                // }

            })
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
                    setOptData(rwsOpt.data.id);
                    setOptionVal(rwsOpt.data.answer)
                    setimpVal(rwsOpt.data.answer)

                }

            })
    }
    const handleSubmit = (values) => {
        if (impVal == 0) {
            return false
        }
        console.log(OptData);
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

                option_id: 191,
                answer: impVal,
                created_by: uid.userId,
                updated_by: uid.userId,
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

                option_id: 191,
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

    return (
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
                                    <div className="col-12">
                                        {/* <p className="fs-title-m">First, we’d like you to give us an overall rating (all things considered) for the performance period.</p> */}
                                        {/* <h2 className="fs-title">[1-10 scale] Overall, how would you rate the (year/ quarter) [FIRST NAME] has had?</h2> */}
                                        <p className="fs-title-m">Now, {question.replace("[FIRST NAME]", first_name)}</p>
                                        <br />
                                        <br />
                                        <div className="card pad-card">
                                            <div className="range-slider">
                                                <input className="range-slider__range" type="range" value={impVal} onChange={handleChange} name="inputVal" defaultValue={OptionVal} min={0} max={10} />
                                                <span className="range-slider__value" style={{ backgroundColor: impVal == 0 || impVal == "" || impVal == "NA" ? "rgb(221,38,60)" : "" }}>{impVal === 0 ? "NA" : impVal}</span> </div>
                                            <div>  {errors.inputVal && touched.inputVal && (
                                                <span className="error">{errors.inputVal}</span>
                                            )}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="form-card">
                                <div className="row">
                                    <div className="col-12">
                                        <p>First, we’d like you to give us an overall rating (all things considered) for the performance period.</p>
                                        <h2 className="fs-title">[1-10 scale] Overall, {question.replace("[FIRST NAME]", first_name)}</h2>
                                        <div className="card pad-card">
                                            <div className="range-slider">
                                                <input className="range-slider__range" type="range" value={values.inputVal} onChange={handleChange} name="inputVal" defaultValue={OptionVal} min={0} max={10} />
                                                <span className="range-slider__value">{values.first_name === 0 ? "NA" : values.first_name}</span> </div>
                                            <div>  {errors.first_name && touched.first_name && (
                                                <span className="error">{errors.first_name}</span>
                                            )}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <input type="button" onClick={() => props.next()} name="next" className="next action-button" defaultValue="Next" /> */}



                            <div className="col-lg-12">
                                <div className="button btn-align-step2">
                                    <input type="button" onClick={() => props.prev()} name="previous" className="previous-step-btn" defaultValue="Previous" />
                                    <button type="submit" name="next" className="next-step-btn" defaultValue="Next" >Next</button>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

