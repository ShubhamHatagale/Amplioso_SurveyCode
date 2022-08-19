import React, { useState, useEffect } from 'react'
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


    const inputChange = (e) => {
        let val1 = e.target.value;
        let updId = e.target.id;
        console.log(val1)
        console.log(updId)
        setimpVal(val1);

        // if(updId){
        //     alert(updId)
        // }else{
        //     alert("erro")

        // }


    }

    const handleSubmit = (values) => {
        if (impVal == "") {
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

                option_id: 0,
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

                option_id: 0,
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




    useEffect(() => {

        setloading(1)
        GetAllRecords().then(() => {
            setloading(0)
        })

    }, []);

    if (loading === 1) {
        return <div className='loader'><CircularProgress /></div>
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
                let qID = result.data[7].id;
                setquestionId(qID);
                console.log(result.data[7].id)
                console.log(result.data[7].id)
                setquestion(result.data[7].question);
                getOptions(result.data[7].id);
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

    return (
        <fieldset>
            <div className="row">
                <div className="col-12">
                    <h2 className="steps">80%</h2>
                </div>
            </div>
            <div className="form-card">
                <div className="row">
                    <div className="col-12">
                        <p className="fs-title-m">{question.replace("[FIRST NAME]", first_name + " ")}</p>
                        <hr />
                        <br />
                        <br />
                        {/* <p>Before we let you go, is there anything else on your mind that you’d like to share specific to the performance, strengths, or improvement opportunities for [FIRST NAME]. </p> */}
                        <div className="card pad-card">
                            <div className="card-header">
                                <h4 className="font-sixe">Write a Comment </h4>
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <div className="mb-3">
                                        <textarea className="form-control" value={impVal} rows={4} id="comment" placeholder="type comment here...." onChange={inputChange} defaultValue={impVal.inpV} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="button btn-align-step2">
                    <input type="button" onClick={() => props.prev()} name="previous" className="previous-step-btn" defaultValue="Previous" />
                    <input type="button" onClick={handleSubmit} name="next" className="next-step-btn" defaultValue="Next" />
                </div>
            </div>
        </fieldset>
    )
}

