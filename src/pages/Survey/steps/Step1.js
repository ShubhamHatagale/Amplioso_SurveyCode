import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
// import LinearProgress from '@material-ui/core/CircularProgress';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel'
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
    const [impVal, setimpVal] = useState([{ range_val: 0 }])
    const [inputListFinal, setInputListFinal] = useState([{ range_val: 0 }]);

    const [questionId, setquestionId] = useState("")
    const [RecordeData, setRecordeData] = useState()


    // let uid = 1;
    const [value, setValue] = useState(0);
    const handleInputChange = (e) => {
        // let name=e.tar
        // setimpVal([...impVal,{range_val:e.target.value}]);
        // setimpVal(impVal => [...impVal, { range_val: e.target.value }])
        // inputListFinal.push({ range_val: e.target.value })
        const { name, value } = e.target;
        const list = [...inputListFinal];
        console.log("Here is the Value", list);
        list[0][name] = value;
        setInputListFinal(list);


    }


    const handleSubmit = (values) => {
        console.log(RecordeData)
        // console.log(RecordeData ? "true" : "false")

        // return false
        // if (impVal == 0) {
        //     return false
        // }
        console.log(questionId);


        // props.next(values);
        if (RecordeData.length > 0) {
            console.log("update")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // inputList.map((item,key)=>{
            var raw = JSON.stringify({
                feature: inputListFinal,
                updated_by: uid.userId
            });
            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`http://localhost:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    if (resData.status == 200) {
                        console.log("Values Submitted Succesfully");
                        GetAllRecords();
                        props.next(values);
                        console.log(resData);


                    }
                    // GetAllRecords();
                })
                .catch((error) => console.log("error", error));
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // inputList.map((item,key)=>{
            var raw = JSON.stringify({
                employee_id: uid.employeeId,
                surveyor_id: uid.userId,
                question_id: questionId,
                manager_id: uid.managerId,
                company_id: uid.companyId,
                feature: inputListFinal,
                created_by: uid.userId,
                updated_by: uid.userId
            });
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`http://localhost:9000/masters/survey_feedback`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    if (resData.status == 200) {
                        console.log("Values Submitted Succesfully");
                        GetAllRecords();
                        props.next(values);
                        console.log(resData);


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

        const response3 = fetch(`http://localhost:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result.data[0].first_name)
                setfirst_name(result.data[0].first_name)
                setlast_name(result.data[0].last_name)
            }).then(() => {
                fetch(`http://localhost:9000/masters/question/q_type/3`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // setlistRecord(result.data);
                        console.log(result.data[0], "hh")

                        let qID = result.data[0].id;
                        setquestionId(qID);
                        console.log(result.data[0].id)
                        console.log(result.data[0].id)
                        setquestion(result.data[0].question);
                        // getOptions(result.data[0].id);
                    })

                    .catch(error => console.log('error', error));
            }).then(() => setloading(0))


        const response4 = fetch(`http://localhost:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result)
                console.log(result.data)
                setRecordeData(result.data)
                console.log(result.data.feature)

                let MyValues = result.data;
                // if (MyValues.length > 0) {
                //   setedituser(true);
                //   setUpid(result.data[0].id);
                // }
                console.log("Edit Values", MyValues);
                MyValues.map((x,i)=>{
                    console.log(i)
                    let Feature = eval(x.feature);
                    console.log("feature", Feature);
                    setInputListFinal(Feature)
                })



            })

    }


    const getOptions = (resIdC) => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response3 = fetch(`http://localhost:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
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
                    setInputListFinal(rwsOpt.data.answer)

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
                        // handleInputChange,
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
                                <div className="col-8"></div>

                                <div className="col-4">
                                    {/* <CircularProgressWithLabel value={50}  /> */}
                                    <div className="steps"><CircularProgressWithLabel size={70} value={impVal * 10} />
                                    </div>
                                    {/* <LinearProgress value={10} /> */}
                                    {/* <CircularProgress variant="determinate" value={50} /> */}

                                    {/* <h3 className="smtxt">1 = Poor &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Outstanding &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3> */}
                                </div>
                            </div>
                            <div className="form-card">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className="fs-title-m">First, we’d like you to give us an overall rating (all things considered) for the performance period.</p>
                                        <h2 className="fs-title1">[1-10 scale] Overall, {question.replace("[FIRST NAME]", first_name)}</h2>
                                        {/* <hr /> */}
                                        <h3 className="smtxt">1 = Poor &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Outstanding &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3>

                                        <br />
                                        <br />
                                        <div className="card pad-card">
                                            <div className="range-slider">
                                                <input className="range-slider__range" type="range" name="range_val" onChange={handleInputChange} value={inputListFinal[0].range_val} defaultValue={OptionVal} min={0} max={10} />
                                                {/* <span className="range-slider__value" >{inputListFinal[0].range_val}</span>  */}
                                                <span className="range-slider__value" style={{ backgroundColor: inputListFinal[0].range_val == 0 || inputListFinal[0].range_val == "" || inputListFinal[0].range_val == "NA" ? "rgb(221,38,60)" : "" }} >{inputListFinal[0].range_val == 0 ? "NA" : inputListFinal[0].range_val}</span>

                                            </div>
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

