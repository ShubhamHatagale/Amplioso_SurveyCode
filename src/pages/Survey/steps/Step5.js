import { Button, Checkbox, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';

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
    const [OptionDataCol, setOptionDataCol] = useState([])
    const [OptionDataCol1, setOptionDataCol1] = useState([])
    const [OptionDataCol2, setOptionDataCol2] = useState([])
    const [OptionDataCol3, setOptionDataCol3] = useState([])
    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [showError, setshowError] = useState(false)
    const [loading, setloading] = useState(0)
    const [OptionLenght, setOptionLenght] = useState()
    const [noti, setNoti] = useState(false)

    const [notification, setnotification] = useState("");
    const [Display, setDisplay] = useState(false);
    const [inputListFinal, setInputListFinal] = useState([]);
    const [inputListFinal1, setInputListFinal1] = useState([]);
    const [inputListFinal2, setInputListFinal2] = useState([]);

    const [RecordeData, setRecordeData] = useState()
    // const [inputListFinal, setInputListFinal] = useState([{ range_val: 0, option: "", option_id: 0 }, { range_val: 0, option: "", option_id: 0 }, { range_val: 0, option: "", option_id: 0 }, { range_val: 0, option: "", option_id: 0 }, { range_val: 0, option: "", option_id: 0 }]);



    const handleSubmit = (values) => {
        // var questionIdwiseData = (SurveyAnswers.filter(({ question_id, answer, created_by }) => question_id === questionId && answer === "true" && created_by === uid.userId));

        var countInputList = inputListFinal.filter(({ status }) => status == true).length;

        if (countInputList != 5) {
            setnotification("Please Select Only Five Options")
            setDisplay(true)
            return false
        }



        console.log(RecordeData)
        console.log(questionId);
        // props.next(values);
        console.log("update")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            feature4: inputListFinal,
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
            })
            .catch((error) => console.log("error", error));






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
        const response = await fetch(`http://208.109.14.182:9000/masters/survey_answers/step5-7`, requestOptions)
            .then(response => response.json())
            .then(resData => {
                console.log("0008", resData.data)
                setOptionLenght(resData.data)
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

        const response4 = fetch(`http://208.109.14.182:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result)
                console.log(result.data)
                setRecordeData(result.data)
                console.log(result.data.feature)

                let MyValues = result.data;
                console.log("Edit Values", MyValues);

                MyValues.map((x, i) => {
                    // console.log(i)
                    let Feature = eval(x.feature4);
                    console.log("feature", Feature);
                    if (Feature) {
                        setInputListFinal(Feature)

                    }
                })



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
        setloading(1)
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
                console.log(rwsOpt.data)
                console.log("yes")
                setOptionDataCol(rwsOpt.data);
                // console.log(questionId, "jj")

                // console.log(rwsOpt.data)
                // console.log(rwsOpt.data.length, "d")
                // let halfwayPoint = rwsOpt.data.length;
                // console.log(halfwayPoint);
                let column = rwsOpt.data;
                // let columnA = rwsOpt.data.splice(0, halfwayPoint)
                // let columnB = rwsOpt.data.splice(0, halfwayPoint)
                // let columnC = rwsOpt.data.splice(0)
                // setOptionDataCol1(columnA);
                // setOptionDataCol2(columnB);
                // setOptionDataCol3(columnC);
                // setOptionDataCol(column);
                // console.log(column);

                // console.log(columnA);
                // console.log(columnB);
                // console.log(columnC);

                if (column.length != inputListFinal.length) {
                    column.map((item, index) => {
                        setInputListFinal(inputListFinal => [...inputListFinal, { option_id: null, range_val: 0, option: "", status: false }])
                    })
                    setloading(0)

                }

                // if (columnB.length != inputListFinal.length) {
                //     columnB.map((item, index) => {
                //         console.log(item)
                //         setInputListFinal(inputListFinal1 => [...inputListFinal1, { range_val: 0 }])
                //     })
                // }


                // if (columnC.length != inputListFinal.length) {
                //     columnC.map((item, index) => {
                //         console.log(item)
                //         setInputListFinal(inputListFinal2 => [...inputListFinal2, { range_val: 0 }])
                //     })
                // }


                // if (columnB.length != inputListFinal.length) {
                //     columnB.map((item, index) => {
                //         console.log(item)
                //         setInputListFinal(inputListFinal => [...inputListFinal, { range_val1: 0 }])
                //     })
                // }

                // if (columnC.length != inputListFinal.length) {
                //     columnC.map((item, index) => {
                //         console.log(item)
                //         setInputListFinal(inputListFinal => [...inputListFinal, { range_val3: 0 }])
                //     })
                // }



            })
    }


    useEffect(() => {
        // setloading(0)
        GetAllRecords()
            .then(() => {
                // setloading(0)
                getSelectedOptions()
            })

        // renderModal()

    }, []);

    if (loading === 1) {
        return <div className="loader"> <CircularProgress /></div>
    }
    // const renderModal = () => {
    //     // e.preventDefault()
    //     // alert("hhg")
    //     setnotification("!Oops sorry, you can select only five options")
    //     setDisplay(true)
    // }

    const handleInputChange = (e, i, option) => {

        var countInputList = inputListFinal.filter(({ status }) => status == true).length;

        if (countInputList == 5 && e.target.checked == true) {
            setnotification("You Can Select Only Five Options")
            setDisplay(true)
            return false
        }

        const { id, name, value, checked } = e.target;
        console.log(checked)
        const list = [...inputListFinal];
        console.log("Here is the Value", list);
        // list[i][name] = value;
        list[i]["option_id"] = id;
        list[i][name] = option;
        list[i]["status"] = checked;
        setInputListFinal(list);


    }

    return (
        <>
            {loading === 1 ? (<div className="loader" style={{ position: "fixed", top: "0px" }}> <CircularProgress /></div>) : null}

            <fieldset style={{ pointerEvents: loading === 1 ? "none" : "all" }}>
                {/* <ModalComp data={{ display: noti, notification: "Errorss" }} /> */}
                <Modal
                    size="md"
                    show={Display}
                    onHide={() => setDisplay(false)}
                    aria-labelledby="example-modal-sizes-title-md"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Notification</Modal.Title>
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
                        {/* <h2 className="steps">50%</h2> */}
                        <div className="steps">
                            <CircularProgressWithLabel size={70} value={5 * 10} />
                        </div>
                    </div>
                </div>
                <div className="form-card">
                    {/* <button onClick={renderModal}  >check</button> */}

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



                        <div className="row p-5" >
                            <table className="table text-center">
                                {/* <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                    
                                </thead> */}

                                <tbody>
                                    <tr className='row'>
                                        {OptionDataCol.map((item, i) => {
                                            return (
                                                <div className='col-sm-4' >
                                                    <div className="container" >
                                                        {console.log(inputListFinal)}
                                                        {inputListFinal ? (<div >
                                                            <label  >
                                                                <input type="checkbox"
                                                                    name="option"
                                                                    onChange={(e) => handleInputChange(e, i,item.option)}
                                                                    // value={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer ? false : true}
                                                                    id={item.id}
                                                                    checked={inputListFinal[i].status}
                                                                />
                                                                <span className="sub-q min-height"> {item.option}</span>

                                                            </label>
                                                        </div>) : null}
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </tr>

                                </tbody>
                            </table>
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
        </>
    )
}

