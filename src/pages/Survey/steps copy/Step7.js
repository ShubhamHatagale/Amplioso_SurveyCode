import { useEffect, useState } from "react"
import { Checkbox, CircularProgress } from '@material-ui/core';
import '../../../assets/css/Step7.css'
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel";
import { Modal } from "react-bootstrap";

export default function Step2(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;

    const uid = JSON.parse(localStorage.getItem('survey_token'));

    const [question, setquestion] = useState("")
    const [questionId, setquestionId] = useState("")
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [OptionDataCol1, setOptionDataCol1] = useState([])
    const [OptionDataCol2, setOptionDataCol2] = useState([])
    const [OptionDataColUnfav1, setOptionDataColUnfav1] = useState([])
    const [OptionDataColUnfav2, setOptionDataColUnfav2] = useState([])

    const [OptionDataCol3, setOptionDataCol3] = useState([])
    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [showError, setshowError] = useState(false)
    const [loading, setloading] = useState(false)

    const [Display, setDisplay] = useState(false);
    const [notification, setnotification] = useState(false);


    // let uid.userId = 1;

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
        // let optionID = parseInt(e.target.id);
        console.log(answer)
        // console.log(optionID)
        // var checkAll = SurveyAnswers.filter(({ option_id, created_by }) => option_id === optionID && created_by === uid.userId)
        // console.log(SurveyAnswers.filter(({question_id, option_id,answer, created_by }) => question_id === questionId && option_id === optionID && answer==="true" && created_by === uid.userId));
        var questionIdwiseData = (SurveyAnswers.filter(({ question_id, answer, created_by }) => question_id === questionId && answer === "true" && created_by === uid.userId));

        var alreadyVal = (SurveyAnswers.filter(({ question_id, option_id, created_by }) => question_id === questionId && option_id === parseInt(e.target.id) && created_by === uid.userId));
        console.log(alreadyVal)
        console.log(questionIdwiseData)

        if (alreadyVal.length > 5) {
            getSelectedOptions()

            console.log("morethan 5")
            setnotification("!Oops sorry, you can select only five options")
            setDisplay(true)
            // window.scrollTo(0, 0)
            setloading(0)
            return false
        } else if (alreadyVal.length === 0 && questionIdwiseData.length < 5) {
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

                option_id: parseInt(e.target.id),
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
            fetch(`http://localhost:9000/masters/survey_answers/`, requestOptions)
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
                    option_id: parseInt(e.target.id),
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
                fetch(`http://localhost:9000/masters/survey_answers/${alreadyVal[0].id}`, requestOptions)
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
                setnotification("!Oops sorry, you can select only five options")
                setDisplay(true);
                // window.scrollTo(0, 0)
                setloading(0)


            }

        } else {
            console.log("morethan 5")
            setnotification("!Oops sorry, you can select only five options")
            setDisplay(true)
            // window.scrollTo(0, 0)
            setloading(0)

        }


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
                let qID = result.data[6].id;
                setquestionId(qID);
                console.log(result.data[6].id)
                console.log(result.data[6].id)
                setquestion(result.data[6].question);
                getOptions(result.data[6].id);
                // }

            })


        const responseSurveyAnswer = await fetch(`http://localhost:9000/masters/survey_answers`, requestOptions)
            .then(responseSurveyAnswer => responseSurveyAnswer.json())
            .then(surveyResult => {
                console.log(surveyResult.data)
                setSurveyAnswers(surveyResult.data);

            })




    }

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
        const response = await fetch(`http://localhost:9000/masters/survey_answers/step5-7`, requestOptions)
            .then(response => response.json())
            .then(resData => {
                console.log("0008", resData.data)
                // setOptionLenght(resData.data)
                if (resData.data > 5) {
                    // alert("false")
                    console.log("morethan 5")
                    setnotification("!Oops sorry, you can select only five options")
                    setDisplay(true)
                    // window.scrollTo(0, 0)
                    setloading(0)
                    return false
                }
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
                // setOptionData(rwsOpt.data);

                console.log(questionId, "s")

                console.log(rwsOpt.data)
                console.log(rwsOpt.data.length, "d")
                let halfwayPoint = rwsOpt.data.length / 2;
                console.log(halfwayPoint);
                let columnA = rwsOpt.data.splice(0, halfwayPoint)
                let columnB = rwsOpt.data.splice(0)
                setOptionDataCol1(columnA);
                setOptionDataCol2(columnB);

                console.log(columnA);
                console.log(columnB);

            })

        const response4 = fetch(`http://localhost:9000/masters/option/opt/unfav/${resIdC}`, requestOptions)
            .then(response4 => response4.json())
            .then(rwsOpt => {
                // setlistRecord(rwsOpt.data);
                // setOptionData(rwsOpt.data);

                console.log(questionId, "s")

                console.log(rwsOpt.data)
                console.log(rwsOpt.data.length, "d")
                let halfwayPoint = rwsOpt.data.length / 2;
                console.log(halfwayPoint);
                let columnA = rwsOpt.data.splice(0, halfwayPoint)
                let columnB = rwsOpt.data.splice(0)
                setOptionDataColUnfav1(columnA);
                setOptionDataColUnfav2(columnB);

                console.log(columnA);
                console.log(columnB);

            })
    }


    useEffect(() => {
        setloading(1)
        GetAllRecords().then(() => {
            getSelectedOptions()
            setloading(0)
        })

    }, []);

    if (loading !== 0) {
        return <div className="loader"> <CircularProgress /></div>
    }


    return (
        <fieldset>

            <Modal
                size="sm"
                show={Display}
                onHide={() => setDisplay(false)}
                aria-labelledby="example-modal-sizes-title-md"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body className="success text-center mt-5">
                    {/* <img style={{ height: "80px", width: "80px" }} src={Ico12} /> */}
                    {/* <FaIconz.FaTimesCircle style={{ height: "60px", width: "60px" }} /> */}
                </Modal.Body>

                <Modal.Body className="success text-center text-danger bold h3">{notification}</Modal.Body>
                <Modal.Body className="success text-center text-black bold" ><p style={{ cursor: 'pointer' }} onClick={() => setDisplay(false)} >Ok</p></Modal.Body>

            </Modal>

            <div className="row">
                <div className="col-12">
                    {/* <h2 className="steps">70%</h2> */}
                    <div className="steps">
                        <CircularProgressWithLabel size={70} value={5 * 10} />
                    </div>
                </div>
            </div>
            <div className="form-card">
                <div className="row">
                    <p className="fs-title-m">{question.replace("[FIRST NAME]", first_name + " ")}</p>

                    <hr />
                    <br />
                    <br />

                    {showError == true ? (<span className="text-center bold text-danger">Please select only 5 options</span>) : null}
                    <div className="col-12">

                        {/*<h2 class="fs-title">[1-10 scale] Overall, how would you rate the (year/ quarter) [FIRST NAME] has had?</h2>*/}
                        <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                            <tbody><tr>
                                {/* <td height={40} colSpan={2} align="center" valign="top"><strong>Favorable</strong></td>
                                <td colSpan={2} align="center" valign="top"><strong>Unfavorable</strong></td> */}
                                <td height={40} colSpan={2} align="center" valign="top"><strong className="font-sixe">Favorable</strong></td>
                                <td colSpan={2} align="center" valign="top"><strong className="font-sixe">Unfavorable</strong></td>

                            </tr>
                                <tr>
                                    <td valign="top"><table border={0} cellPadding={0} cellSpacing={0} className="table row-select">
                                        <tbody>
                                            {OptionDataCol1.map((item, key) => {
                                                var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
                                                console.log('Option value is :', optionVal);
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
                                        </tbody></table></td>
                                    <td valign="top"><table border={0} cellPadding={0} cellSpacing={0} className="table row-select">
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
                                                                        <span>{item.option}</span>
                                                                    </label>
                                                                </div>
                                                            </div>



                                                        </td>
                                                        {/* value={optionVal.length > 0 ? optionVal[0].answer : true} */}
                                                    </tr>
                                                )
                                            })}

                                        </tbody></table></td>

                                    <td valign="top"><table border={0} cellPadding={0} cellSpacing={0} className="table row-select">
                                        <tbody>
                                            {OptionDataColUnfav1.map((item, key) => {
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

                                        </tbody></table></td>
                                    <td valign="top"><table border={0} cellPadding={0} cellSpacing={0} className="table row-select">
                                        <tbody>
                                            {OptionDataColUnfav2.map((item, key) => {
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

                                        </tbody></table></td>

                                </tr>
                            </tbody></table>
                    </div>
                </div>
            </div>
            <div className="button btn-align-step2">
                <input type="button" onClick={() => props.prev()} name="previous" className="previous-step-btn" defaultValue="Previous" />
                <input type="button" onClick={nextFunction} name="next" className="next-step-btn" defaultValue="Next" />
            </div>             </fieldset>
    )
}

