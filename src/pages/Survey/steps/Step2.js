// chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html  
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';

export default function Step2(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;
    const uid = JSON.parse(localStorage.getItem('survey_token'));
    const [question, setquestion] = useState("")
    const [first_name, setfirst_name] = useState("")
    const [OptionData, setOptionData] = useState([])
    const [questionId, setquestionId] = useState("")
    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [loading, setloading] = useState(0);


    function validate() {
        var valid_val = true;
        OptionData.map((item, key) => {
            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
            if (optionVal.length == 0) {
                console.log(false)
                valid_val = false
            }

            optionVal.map((item, key) => {
                console.log(item)
                if (item.answer == 0 || item.length == 0) {
                    console.log(false)
                    valid_val = false
                }
            })
        })
        return valid_val
    }

    const nextFunction = () => {
        // if (validate()) {
        //     props.next()
        // }
        props.next()

    }

    const inputChange = (e) => {
        setloading(1)
        let val1 = e.target.value;
        let optionId = e.target.id;
        console.log(val1)
        console.log(questionId)
        console.log(optionId)
        var alreadyVal = (SurveyAnswers.filter(({ question_id, option_id, created_by }) => question_id == questionId && option_id == optionId && created_by == uid.userId));
        console.log(alreadyVal)
        if (alreadyVal.length > 0) {
            console.log("update")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
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

                    }
                    setloading(0)

                })
                .catch((error) => console.log("error", error));

        } else {
            console.log("post")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
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
        }

    }

    const GetAllRecords = async () => {
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
            })
            .catch(error => console.log('error', error));

        const response2 = await fetch(`http://localhost:9000/masters/question/q_type/3`, requestOptions)
            .then(response2 => response2.json())
            .then(result => {
                console.log(result)
                let qID = result.data[1].id;
                setquestionId(qID);
                console.log(result.data[1].id)
                console.log(result.data[1].id)
                setquestion(result.data[1].question);
                getOptions(result.data[1].id);
                getOptions1(result.data[0].id);
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
                setOptionData(rwsOpt.data);
            })
    }

    const getOptions1 = (resIdC) => {
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
        const response3 = fetch(`http://localhost:9000/masters/survey_answers_same`, requestOptions)
            .then(response3 => response3.json())
            .then(rwsOpt => {
                if (rwsOpt.data) {
                    console.log(rwsOpt.data)
                }
            })
    }


    useEffect(() => {
        setloading(1)
        GetAllRecords().then(() => {
            setloading(0)
        })

    }, []);


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
                        </div>                        {/* <h3 className="smtxt">1 = Poor &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Outstanding &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3> */}
                    </div>
                </div>
                <div className="form-card">
                    <p className='fs-title-m'>Next, {question.replace("[FIRST NAME]", first_name)}</p>
                    <hr />
                    <br />
                    <br />
                    <h3 className="smtxt">1 = Poor &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Outstanding &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3>
                    <div className="row">
                        {OptionData.map((item, key) => {
                            // console.log(item.id)
                            console.log(SurveyAnswers)
                            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                            if (optionVal.length > 0) {
                                console.log(optionVal[0].answer)
                            }

                            // console.log()

                            // var total = nums.reduce(function(a,b) {
                            //     return (+a)+(+b);
                            // });

                            return (
                                <div className="col-sm-6">
                                    <div className="card pad-card">
                                        <div className="range-slider">
                                            <div className="sub-q" data-tip={item.option}>{item.option}</div>
                                            <ReactTooltip />
                                            {/* style={{pointerEvents:loading==0}} */}
                                            {/* <h1>{getFilteredValue(optionVal)}</h1> */}
                                            {console.log(getFilteredValue(optionVal))}
                                            <input className="range-slider__range" type="range" id={item.id} value={getFilteredValue(optionVal)} defaultValue={0} min={0} max={10} onChange={inputChange} />
                                            <span className="range-slider__value" style={{ backgroundColor: getFilteredValue(optionVal) == 0 || getFilteredValue(optionVal) == null || getFilteredValue(optionVal) == "" || getFilteredValue(optionVal) == "NA"||"" ? "rgb(221,38,60)" : "" }}>{optionVal.length > 0 ? ( getFilteredValue(optionVal)==0? "NA" :getFilteredValue(optionVal) ) : "NA"}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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

