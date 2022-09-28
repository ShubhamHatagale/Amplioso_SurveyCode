import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';
export default function Step2(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;

    const uid = JSON.parse(localStorage.getItem('survey_token'));

    const [question, setquestion] = useState("")
    const [questionId, setquestionId] = useState("")
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [OptionData, setOptionData] = useState([])
    const [OptionDataCol1, setOptionDataCol1] = useState([])
    const [OptionDataCol2, setOptionDataCol2] = useState([])
    const [OptionDataCol3, setOptionDataCol3] = useState([])
    const [inputValue, setinputValue] = useState([{ inpV: "" }])
    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [loading, setloading] = useState(0)

    // let uid.userId = 1;

    function validate() {
        var ssr = true;
        OptionDataCol1.map((item, key) => {
            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
            if (optionVal.length == 0) {
                ssr = false
            }

            optionVal.map((item, key) => {
                // console.log(item)
                if (item.answer == 0) {
                    ssr = false
                }
            })
        })
        OptionDataCol2.map((item, key) => {
            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
            if (optionVal.length == 0) {
                ssr = false
            }
            optionVal.map((item, key) => {
                // console.log(item)
                if (item.answer == 0) {
                    ssr = false
                }
            })
        })
        OptionDataCol3.map((item, key) => {
            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
            if (optionVal.length == 0) {
                ssr = false
            }
            optionVal.map((item, key) => {
                // console.log(item)
                if (item.answer == 0) {
                    ssr = false
                }
            })
        })
        return ssr
    }

    const nextFunction = () => {
        console.log(validate())
        var check = validate()
        console.log(check)
        // if (check) {
        //     props.next()
        // }
        props.next()

    }

    const GetAllRecords = async () => {
        // console.log(props.data.que1)
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`http://localhost:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log("11111")
                console.log(result.data[0].first_name)
                setfirst_name(result.data[0].first_name)
                setlast_name(result.data[0].last_name)
            })
            .catch(error => console.log('error', error));

        const response2 = await fetch(`http://localhost:9000/masters/question/q_type/3`, requestOptions)
            .then(response2 => response2.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result)
                // if(result.length>0){
                let qID = result.data[3].id;
                setquestionId(qID);
                console.log(result.data[3].id)
                console.log(result.data[3].id)
                setquestion(result.data[3].question);
                getOptions(result.data[3].id);
                // }

            })

        const responseSurveyAnswer = await fetch(`http://localhost:9000/masters/survey_answers`, requestOptions)
            .then(responseSurveyAnswer => responseSurveyAnswer.json())
            .then(surveyResult => {
                console.log(surveyResult.data)
                setSurveyAnswers(surveyResult.data);

            })
    }

    const getOptions = (resIdC) => {
        console.log("checkIDsss", resIdC, questionId)
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response3 = fetch(`http://localhost:9000/masters/option/opt/${resIdC}`, requestOptions)
            .then(response3 => response3.json())
            .then(rwsOpt => {
                // setlistRecord(rwsOpt.data);
                setOptionData(rwsOpt.data);

                console.log(questionId, "jj")

                console.log(rwsOpt.data)
                console.log(rwsOpt.data.length, "d")
                let halfwayPoint = rwsOpt.data.length / 3;
                console.log(halfwayPoint);
                let columnA = rwsOpt.data.splice(0, halfwayPoint)
                let columnB = rwsOpt.data.splice(0, halfwayPoint)
                let columnC = rwsOpt.data.splice(0)
                setOptionDataCol1(columnA);
                setOptionDataCol2(columnB);
                setOptionDataCol3(columnC);

                console.log(columnA);
                console.log(columnB);
                console.log(columnC);

            })
    }

    useEffect(() => {
        setloading(1)
        GetAllRecords().then(() => {
            setloading(0)
        })

    }, []);

    // if (loading === 1) {
    //     return <div className="loader"> <CircularProgress /></div>
    // }


    const inputChange = (e) => {
        setloading(1)

        let val1 = e.target.value;
        let optionId = e.target.id;
        console.log(val1)
        console.log(optionId)
        setinputValue(val1);

        console.log(SurveyAnswers)
        var alreadyVal = (SurveyAnswers.filter(({ question_id, option_id, created_by }) => question_id == questionId && option_id == optionId && created_by == uid.userId));
        console.log(alreadyVal)

        if (alreadyVal.length > 0) {
            console.log("update")
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
                option_id: optionId,
                answer: val1,
                created_by: uid.userId,
                updated_by: uid.userId,
            });
            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`http://localhost:9000/masters/survey_answers/${alreadyVal[0].id}`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Values Submitted Succesfully");
                        GetAllRecords();
                        setloading(0)
                        // props.next(values);

                    }
                    // GetAllRecords();
                })
                .catch((error) => console.log("error", error));

        } else {
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

                option_id: optionId,
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
            fetch(`http://localhost:9000/masters/survey_answers/`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Values Submitted Succesfully");
                        setloading(0)

                    }
                    GetAllRecords();
                })
                .catch((error) => console.log("error", error));


            // props.next(values);
        }



    }

    const getFilteredValue = (optionVal) => {
        return optionVal.length != 0 ? optionVal[0].answer : null
    }

    return (
        <>
            {loading === 1 ? (<div className="loader"> <CircularProgress /></div>) : null}

            <fieldset style={{ pointerEvents: loading === 1 ? "none" : "all" }}>
                <div className="row">
                    <div className="col-12">
                        <div className="steps">
                            <CircularProgressWithLabel size={70} value={5 * 10} />
                        </div>
                        {/* <h2 className="steps">40%</h2> */}
                        {/* <h3 className="smtxt">1 = Completely Disagree &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Completely Agree &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3> */}
                    </div>
                </div>
                <div className="form-card">
                    <p className='fs-title-m'>{question.replace("[FIRST NAME]", first_name).replace("[FIRST NAME]", first_name)}</p>
                    <hr />
                    <br />
                    <br />
                    {/* <br /> */}
                    <h3 className="smtxt">1 = Completely Disagree &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Completely Agree &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3>

                    <div className="row">

                        <div className="col-sm-4">

                            <div className="card pad-card">
                                <h2 className="fs-title">{first_name} THINKS</h2>
                            </div>

                        </div>
                        <div className="col-sm-4">

                            <div className="card pad-card">
                                <h2 className="fs-title">{first_name} ACTS</h2>
                            </div>

                        </div>
                        <div className="col-sm-4">

                            <div className="card pad-card">
                                <h2 className="fs-title">{first_name} Makes Me FEEL</h2>
                            </div>

                        </div>


                        <div className="col-sm-4" >

                            {OptionDataCol1.map((item, key) => {
                                var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                                return (

                                    <div className="card pad-card" >
                                        <div className="range-slider" >
                                            <h3 className="sub-q min-height">{item.option}</h3>
                                            <input className="range-slider__range" type="range" id={item.id} value={getFilteredValue(optionVal)} onChange={inputChange} defaultValue={0} min={0} max={10} />
                                            <span className="range-slider__value " style={{ backgroundColor: getFilteredValue(optionVal) == 0 || getFilteredValue(optionVal) == "" || getFilteredValue(optionVal) == null || getFilteredValue(optionVal) == "NA" ? "rgb(221,38,60)" : "" }}>{optionVal.length > 0 ? ( getFilteredValue(optionVal)==0? "NA" :getFilteredValue(optionVal) ) : "NA"}</span> </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="col-sm-4" >
                            {OptionDataCol2.map((item, key) => {
                                var optionVal1 = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                                return (

                                    <div className="card pad-card" >
                                        <div className="range-slider" >
                                            <h3 className="sub-q min-height">{item.option}</h3>
                                            <input className="range-slider__range" type="range" id={item.id} value={getFilteredValue(optionVal1)} onChange={inputChange} defaultValue={0} min={0} max={10} />
                                            <span className="range-slider__value" style={{ backgroundColor: getFilteredValue(optionVal1) == 0 || getFilteredValue(optionVal1) == "" || getFilteredValue(optionVal1) == null || getFilteredValue(optionVal1) == "NA" ? "rgb(221,38,60)" : "" }}>{optionVal1.length > 0 ? ( getFilteredValue(optionVal1)==0? "NA" :getFilteredValue(optionVal1) ) : "NA"}</span> </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="col-sm-4" >
                            {OptionDataCol3.map((item, key) => {
                                var optionVal2 = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                                return (

                                    <div className="card pad-card" >
                                        <div className="range-slider" >
                                            <h3 className="sub-q min-height">{item.option}</h3>
                                            <input className="range-slider__range" type="range" id={item.id} value={getFilteredValue(optionVal2)} onChange={inputChange} defaultValue={0} min={0} max={10} />
                                            <span className="range-slider__value" style={{ backgroundColor: getFilteredValue(optionVal2) == 0 || getFilteredValue(optionVal2) == "" || getFilteredValue(optionVal2) == null || getFilteredValue(optionVal2) == "NA" ? "rgb(221,38,60)" : "" }}>{optionVal2.length > 0 ? ( getFilteredValue(optionVal2)==0? "NA" :getFilteredValue(optionVal2) ) : "NA"}</span> </div>
                                        {/* <span>{optionVal2.length > 0 ? optionVal2[0].answer : null}</span> */}

                                    </div>
                                )
                            })}


                        </div>

                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="button btn-align-step2">
                        <input type="button" onClick={() => props.prev()} name="previous" className="previous-step-btn" defaultValue="Previous" />
                        <input type="button" onClick={nextFunction} name="next" className="next-step-btn" defaultValue="Next" />
                    </div>
                </div>
            </fieldset>
        </>
    )
}

