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
    const [OptionDataCol, setOptionDataCol] = useState([])
    const [OptionDataColUnfav, setOptionDataColUnfav] = useState([])
    const [inputListFinal, setinputListFinal] = useState([])
    const [inputListFinal1, setinputListFinal1] = useState([])
    const [inputListFinal2, setinputListFinal2] = useState([])

    const [Val1, setVal1] = useState([])
    const [Val2, setVal2] = useState([])

    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [showError, setshowError] = useState(false)
    const [loading, setloading] = useState(false)

    const [Display, setDisplay] = useState(false);
    const [notification, setnotification] = useState(false);
    const [RecordeData, setRecordeData] = useState()


    // let uid.userId = 1;

    const handleSubmit = (values) => {


        // console.log(inputListFinal)
        var countInputList = inputListFinal.filter(({ favstatus }) => favstatus == true).length + inputListFinal.filter(({ unfstatus }) => unfstatus == true).length;
        console.log(countInputList)


        if (countInputList != 5) {
            setnotification("Please Select Any Five Optons")
            setDisplay(true)
            return false
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            feature6: inputListFinal,
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


    const handleInputChange = (e, i, option) => {
        // let check = checkCount();
        // console.log(check)
        console.log(inputListFinal)
        const { id, name, value, checked } = e.target;
        console.log(checked)
        const list = [...inputListFinal];

        // const unlist = [...inputListFinal2];

        console.log("Here is the Value", list);

        var countInputList = list.filter(({ favstatus }) => favstatus == true).length + list.filter(({ unfstatus }) => unfstatus == true).length;
        console.log(countInputList)
        if (countInputList == 5 && e.target.checked == true) {
            setnotification("You Can Select Only Five Options")
            setDisplay(true)
            return false
        }
        list[i][`${name}option_id`] = id;
        list[i][`${name}option_name`] = option;
        list[i][`${name}status`] = checked;
        setinputListFinal(list)

        // setinputListFinal([{ list }, { unlist }])

    }

    const GetAllRecords = async () => {
        // console.log(props.data.que1)
        if (inputListFinal.length != 100) {
            Array.from({ length: 100 }, (item, index) => {
                setinputListFinal(inputListFinal => [...inputListFinal, { favoption_id: 0, unfavoption_id: 0, favoption_name: "", unfoption_name: "", favstatus: false, unfstatus: false }])
            })
        }


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
                let qID = result.data[6].id;
                setquestionId(qID);
                console.log(result.data[6].id)
                console.log(result.data[6].id)
                setquestion(result.data[6].question);
                getOptions(result.data[6].id);
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
                let MyValues2 = result.data;

                console.log("Edit Values", MyValues);

                MyValues.map((x, i) => {
                    // console.log(i)
                    let Feature = eval(x.feature6);
                    // let Feature2 = eval(x.feature7);

                    console.log("feature", Feature);
                    if (Feature) {
                        // setinputListFinal(Feature)
                        console.log("feature1", Feature);
                        setinputListFinal(Feature)
                        // setinputListFinal2(Feature2)


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
        setloading(1)

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

                console.log(questionId, "s")

                console.log(rwsOpt.data)
                console.log(rwsOpt.data.length, "d")
                // let halfwayPoint = rwsOpt.data.length / 2;
                let halfwayPoint = rwsOpt.data;
                console.log(halfwayPoint);
                let column = rwsOpt.data;
                // let columnA = rwsOpt.data.splice(0, halfwayPoint)
                // let columnB = rwsOpt.data.splice(0)
                setOptionDataCol(halfwayPoint);

                if (column.length != inputListFinal1.length) {
                    column.map((item, index) => {
                        setinputListFinal1(inputListFinal1 => [...inputListFinal1, { option_id: null, range_val: 0, option: "", status: false }])
                    })
                    setloading(0)

                }




            })

        const response4 = fetch(`http://208.109.14.182:9000/masters/option/opt/unfav/${resIdC}`, requestOptions)
            .then(response4 => response4.json())
            .then(rwsOpt => {
                // setlistRecord(rwsOpt.data);
                // setOptionData(rwsOpt.data);
                setloading(0)


                console.log(questionId, "s")

                console.log(rwsOpt.data)
                console.log(rwsOpt.data.length, "d")
                // let halfwayPoint = rwsOpt.data.length / 2;
                let halfwayPoint = rwsOpt.data;
                console.log(halfwayPoint);
                // let columnA = rwsOpt.data.splice(0, halfwayPoint)
                // let columnB = rwsOpt.data.splice(0)
                let column2 = rwsOpt.data;
                setOptionDataColUnfav(halfwayPoint);
                // if (column2.length != inputListFinal2.length) {
                //     column2.map((item, index) => {
                //         setinputListFinal2(inputListFinal2 => [...inputListFinal2, { option_id: null, range_val: 0, option: "", status: false }])
                //     })

                // }


            })
    }


    useEffect(() => {
        setloading(1)
        GetAllRecords().then(() => {
            getSelectedOptions()
            setloading(0)
        })

        // console.log(inputListFinal)

    }, []);

    if (loading !== 0) {
        return <div className="loader"> <CircularProgress /></div>
    }


    // if (inputListFinal2.length != 40) {
    //     console.log(inputListFinal2.length)
    //     return <div className="loader"> <CircularProgress /></div>
    // }


    return (
        <fieldset>
            {console.log(inputListFinal2)}

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
                            <tbody>
                                <tr className="row p-5">
                                    <td className="col-6" height={40} colSpan={2} align="center" valign="top"><strong className="font-sixe">Favorable</strong></td>
                                    <td className="col-6" colSpan={2} align="center" valign="top"><strong className="font-sixe">Unfavorable</strong></td>
                                </tr>

                                <div className="row justify-content-center" style={{ width: "110%" }}>
                                    <div className="col-6">
                                        <tr className='row '>
                                            {OptionDataCol.map((item, i) => {
                                                return (
                                                    <div className='col-sm-6' >
                                                        <div className="container" >
                                                            <div >
                                                                <label>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="fav"
                                                                        onChange={(e) => handleInputChange(e, i, item.option)}
                                                                        // value={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer ? false : true}
                                                                        id={item.id}
                                                                        checked={inputListFinal[i].favstatus}
                                                                    />
                                                                    <span className="sub-q min-height"> {item.option}</span>

                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </tr>
                                    </div>

                                    <div className="col-6">
                                        <tr className='row' >
                                            {OptionDataColUnfav.map((item, i) => {
                                                return (
                                                    <div className='col-sm-6' >
                                                        <div className="container" >
                                                            <div >
                                                                <label>

                                                                    <input
                                                                        type="checkbox"
                                                                        name="unf"
                                                                        onChange={(e) => handleInputChange(e, i, item.option)}
                                                                        // value={optionVal.length > 0 && optionVal[0].question_id == questionId && optionVal[0].answer ? false : true}
                                                                        id={item.id}
                                                                        checked={inputListFinal[i].unfstatus}

                                                                    />
                                                                    <span className="unf sub-q min-height"> {item.option}</span>

                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </tr>

                                    </div>

                                </div>
                            </tbody></table>
                    </div>
                </div>
            </div>
            <div className="button btn-align-step2">
                <input type="button" onClick={() => props.prev()} name="previous" className="previous-step-btn" defaultValue="Previous" />
                <input type="button" onClick={handleSubmit} name="next" className="next-step-btn" defaultValue="Next" />
            </div>
        </fieldset>
    )
}

