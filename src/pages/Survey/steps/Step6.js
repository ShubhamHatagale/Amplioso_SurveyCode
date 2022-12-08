import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CircularProgress } from '@material-ui/core';
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel";

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
    const [RecordeData, setRecordeData] = useState()
    const [inputListFinal, setInputListFinal] = useState([{ range_val: 0 }]);
    const [valInp, setvalInp] = useState([{ range_val: 0 }]);





    useEffect(() => {
        setloading(1)
        GetAllRecords().then(() => {
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

        const response4 = fetch(`http://208.109.14.182:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
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
                MyValues.map((x, i) => {
                    console.log(i)
                    let Feature = eval(x.feature5);
                    if (Feature) {
                        console.log("feature", Feature);
                        setvalInp(Feature)
                    }

                })



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
        // if (impVal == 0) {
        //     return false
        // }

        console.log("update")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // inputList.map((item,key)=>{
        var raw = JSON.stringify({
            feature5: valInp,
            updated_by: uid.userId
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch(`http://208.109.14.182:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
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

    };


    const handleInputChange = (e) => {
        // let name=e.tar
        // setimpVal([...impVal,{range_val:e.target.value}]);
        // setimpVal(impVal => [...impVal, { range_val: e.target.value }])
        // valInp.push({ range_val: e.target.value })

        const { name, value } = e.target;
        console.log(value)
        const list = [...valInp];
        console.log("Here is the Value", valInp);
        list[0][name] = value;
        setvalInp(list);

    }


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
                                    <div className="steps"><CircularProgressWithLabel size={70} data={uid.userId} value={impVal * 10} />
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
                                                <input className="range-slider__range" type="range" name="range_val" onChange={handleInputChange} value={valInp[0].range_val} defaultValue={OptionVal} min={0} max={10} />
                                                <span className="range-slider__value" style={{ backgroundColor: valInp[0].range_val == 0 || valInp[0].range_val == "" || valInp[0].range_val == "NA" ? "rgb(221,38,60)" : "" }} >{valInp[0].range_val == 0 ? "NA" : valInp[0].range_val}</span>
                                            </div>

                                            <div>
                                                {errors.inputVal && touched.inputVal && (
                                                    <span className="error">{errors.inputVal}</span>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="button btn-align-step2">
                                            <input type="button" onClick={() => props.prev()} name="previous" className="previous-step-btn" defaultValue="Previous" />
                                            <button type="submit" name="next" className="next-step-btn" defaultValue="Next" >Next</button>
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
    )
}

