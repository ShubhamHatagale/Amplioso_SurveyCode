import { Button, Checkbox, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
const items = [
    "Collaboration",
    "Vision and Purpose",
    "Sense of Humor",
    "Innovation",
    "Authenticity",
    "Risk Aversion",
];

export default function Step5(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;
    const uid = JSON.parse(localStorage.getItem('survey_token'));
    const [question, setquestion] = useState("")
    const [questionId, setquestionId] = useState("")
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [OptionDataCol1, setOptionDataCol1] = useState([])
    const [OptionDataCol2, setOptionDataCol2] = useState([])
    const [OptionDataCol3, setOptionDataCol3] = useState([])
    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [showError, setshowError] = useState(false)
    const [loading, setloading] = useState(0)
    const [OptionLenght, setOptionLenght] = useState()

    const nextFunction = () => {
        var questionIdwiseData = (SurveyAnswers.filter(({ question_id, answer, created_by }) => question_id === questionId && answer === "true" && created_by === uid.userId));
        console.log(questionIdwiseData.length)

        if (questionIdwiseData.length == 5) {
            props.next()
        }

    }



    const inputChange = (e) => {
        getSelectedOptions()

        setloading(1)

        console.log(questionId)
        console.log(SurveyAnswers)

        // console.log(e.target.id)
        let answer = e.target.value;
        let optionID = parseInt(e.target.id);
        console.log(answer)
        console.log(optionID)
        // var checkAll = SurveyAnswers.filter(({ option_id, created_by }) => option_id === optionID && created_by === uid.userId)
        // console.log(SurveyAnswers.filter(({question_id, option_id,answer, created_by }) => question_id === questionId && option_id === optionID && answer==="true" && created_by === uid.userId));
        var questionIdwiseData = (SurveyAnswers.filter(({ question_id, answer, created_by }) => question_id === questionId && answer === "true" && created_by === uid.userId));

        var alreadyVal = (SurveyAnswers.filter(({ question_id, option_id, created_by }) => question_id === questionId && option_id === optionID && created_by === uid.userId));
        console.log(alreadyVal)
        console.log(questionIdwiseData)

        // if (OptionLenght===5) {
        //     console.log("false fj")
        //     console.log("morethan 5")
        //     setshowError(true)
        //     window.scrollTo(0, 0)
        //     setloading(0)
        //     return false
        // }

        if (alreadyVal.length == 0 && questionIdwiseData.length < 5) {
            getSelectedOptions()
            console.log("post")
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
                option_id: optionID,
                answer: answer,
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
                        setloading(0)
                        GetAllRecords();
                        // props.next(values);

                    }
                    // GetAllRecords();
                })
                .catch((error) => console.log("error", error));


        } else if (alreadyVal.length > 0) {

            console.log(questionIdwiseData.length <= 5);
            console.log(alreadyVal[0].answer);
            console.log(alreadyVal[0].answer == "true" && questionIdwiseData.length < 5 || alreadyVal[0].answer == "false" && questionIdwiseData.length != 5)
            if (alreadyVal[0].answer == "true" && questionIdwiseData.length <= 5 || alreadyVal[0].answer == "false" && questionIdwiseData.length != 5) {
                console.log("update")

                console.log(alreadyVal[0].id)
                console.log(alreadyVal[0].answer == "false" ? true : false);

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                // inputList.map((item,key)=>{
                var raw = JSON.stringify({
                    survey_id: 0,
                    survey_user_mapping_id: 0,
                    surveyor_id: uid.userId,
                    question_id: questionId,
                    option_id: optionID,
                    answer: alreadyVal[0].answer == "false" ? "true" : "false",
                    created_by: uid.userId,
                    updated_by: uid.userId,
                });
                var requestOptions = {
                    method: "PUT",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };
                fetch(`http://208.109.14.182:9000/masters/survey_answers/${alreadyVal[0].id}`, requestOptions)
                    .then((response) => response.json())
                    .then((resData) => {
                        console.log(resData);
                        if (resData.status == 200) {
                            console.log("Values Submitted Succesfully");
                            setloading(0)
                            GetAllRecords();
                            // props.next(values);

                        }
                        // GetAllRecords();
                    })
                    .catch((error) => console.log("error", error));
            } else {
                setshowError(true)
                window.scrollTo(0, 0)
                setloading(0)


            }
        } else {
            console.log("morethan 5")
            setshowError(true)
            window.scrollTo(0, 0)
            setloading(0)


        }


        // props.next(values);


    }




    // let uid.userId = 1;


    const getSelectedOptions = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        var raw = JSON.stringify({
            question_id: 27,
            surveyor_id: uid.userId
        })
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        }
        const response = await fetch(`http://208.109.14.182:9000/masters/survey_answers/step5-7`, requestOptions)
            .then(response => response.json())
            .then(resData => {
                console.log("0008", resData.data)
                setOptionLenght(resData.data)
                if (resData.data === 5) {
                    // alert("false")
                    console.log("morethan 5")
                    setshowError(true)
                    window.scrollTo(0, 0)
                    setloading(0)
                    return false
                }
            })
    }



    const GetAllRecords = async () => {
        setshowError(false)

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
                let qID = result.data[4].id;
                setquestionId(qID);
                console.log(result.data[4].id)
                console.log(result.data[4].id)
                setquestion(result.data[4].question);
                getOptions(result.data[4].id);
                // }

            })

        const responseSurveyAnswer = await fetch(`http://208.109.14.182:9000/masters/survey_answers`, requestOptions)
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
        const response3 = fetch(`http://208.109.14.182:9000/masters/option/opt/${resIdC}`, requestOptions)
            .then(response3 => response3.json())
            .then(rwsOpt => {
                // setlistRecord(rwsOpt.data);
                // setOptionData(rwsOpt.data);

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
        // setloading(0)
        GetAllRecords()
            .then(() => {
                // setloading(0)
                getSelectedOptions()
            })

    }, []);

    if (loading === 1) {
        return <div className="loader"> <CircularProgress /></div>
    }

    return (
        <>
            {loading === 1 ? (<div className="loader" style={{ position: "fixed", top: "0px" }}> <CircularProgress /></div>) : null}

            <fieldset style={{ pointerEvents: loading === 1 ? "none" : "all" }}>
                <div className="row">
                    <div className="col-12">
                        <h2 className="steps">50%</h2>
                    </div>
                </div>
                <div className="form-card">
                    <div className="row">
                        {/* <Checkbox onChange={inputChange}
                    /> */}
                        <p className='fs-title-m'>{question.replace("[FIRST NAME ] ", first_name + " ")}</p>
                        <hr />
                        <br />
                        <br />
                        <div className="text-center bold text-danger" >
                            {showError == true ? (<span >Please select only 5 options</span>) : null}
                        </div>

                        <div className="col-12" >

                            <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <table border={0} cellPadding={0} cellSpacing={0} className="table row-select">
                                                <tbody>

                                                    {OptionDataCol1.map((item, key) => {
                                                        var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
                                                        console.log(optionVal)
                                                        return (
                                                            <tr name={item.id} value="ee"  >
                                                                <td>
                                                                    <div className="container" >
                                                                        <div >
                                                                            <label>
                                                                                <input type="checkbox" onChange={inputChange} value={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer ? false : true}
                                                                                    id={item.id}
                                                                                    checked={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer == "true" ? optionVal[0].answer : false}
                                                                                />
                                                                                <span className="sub-q min-height"> {item.option}</span>

                                                                            </label>
                                                                        </div>
                                                                    </div>


                                                                </td>
                                                                {/* value={optionVal.length > 0 ? optionVal[0].answer : true} */}
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                        </td>

                                        <td>
                                            <table border={0} cellPadding={0} cellSpacing={0} className="table row-select">
                                                <tbody>

                                                    {OptionDataCol2.map((item, key) => {
                                                        var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
                                                        console.log(optionVal)
                                                        return (
                                                            <tr name={item.id} value="ee"  >
                                                                <td>
                                                                    <div className="container" >
                                                                        <div >
                                                                            <label>
                                                                                <input type="checkbox" onChange={inputChange} value={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer ? false : true}
                                                                                    id={item.id}
                                                                                    checked={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer == "true" ? optionVal[0].answer : false}
                                                                                />
                                                                                <span className="sub-q min-height"> {item.option}</span>

                                                                            </label>
                                                                        </div>
                                                                    </div>


                                                                </td>
                                                                {/* value={optionVal.length > 0 ? optionVal[0].answer : true} */}
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                        </td>


                                        <td>
                                            <table border={0} cellPadding={0} cellSpacing={0} className="table row-select">
                                                <tbody>

                                                    {OptionDataCol3.map((item, key) => {
                                                        var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
                                                        console.log(optionVal)
                                                        return (
                                                            <tr name={item.id} value="ee"  >
                                                                <td>
                                                                    <div className="container" >
                                                                        <div >
                                                                            <label>
                                                                                <input type="checkbox" onChange={inputChange} value={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer ? false : true}
                                                                                    id={item.id}
                                                                                    checked={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer == "true" ? optionVal[0].answer : false}
                                                                                />
                                                                                <span className="sub-q min-height"> {item.option}</span>

                                                                            </label>
                                                                        </div>
                                                                    </div>


                                                                </td>
                                                                {/* value={optionVal.length > 0 ? optionVal[0].answer : true} */}
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                        </td>

                                    </tr>
                                </tbody></table>

                            {/* {OptionDataCol1.map((item, key) => {
                            return (
                                <div class="col-sm-4 p-3" onSelect={SelectedOption}>
                                    {item.option}
                                </div>
                                
                            )
                        })} */}

                        </div>
                        {/* <div className="col-sm-4" >

                        {OptionDataCol2.map((item, key) => {
                            return (
                                <div class="col-sm-4 p-3">
                                    {item.option}
                                </div>
                            )
                        })}

                    </div>

                    <div className="col-sm-4" >

                        {OptionDataCol3.map((item, key) => {
                            return (
                                <div class="col-sm-4 p-3">
                                    {item.option}
                                </div>
                            )
                        })}

                    </div> */}

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

