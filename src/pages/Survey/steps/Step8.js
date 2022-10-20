import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';
import { Modal } from 'react-bootstrap';

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
    const [notification, setnotification] = useState(false);
    const [Display, setDisplay] = useState(false);
    const [inputListFinal, setInputListFinal] = useState([{ comment: "" }]);
    const [RecordeData, setRecordeData] = useState()

    // let uid.userId = 1;


    const handleInputChange = (e) => {

        const { name, value } = e.target;
        const list = [...inputListFinal];
        console.log("Here is the Value", list);
        list[0][name] = value;
        setInputListFinal(list);

        // if(updId){
        //     alert(updId)
        // }else{
        //     alert("erro")

        // }


    }

    const handleSubmit = (values) => {

        if (inputListFinal[0].comment == "") {
            setnotification("Please Type Your Comment")
            setDisplay(true)
            return false
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            feature7: inputListFinal,
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
            })
            .catch((error) => console.log("error", error));



    }




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
                let qID = result.data[7].id;
                setquestionId(qID);
                console.log(result.data[7].id)
                console.log(result.data[7].id)
                setquestion(result.data[7].question);
                // getOptions(result.data[7].id);
                // }

            })

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
                MyValues.map((x, i) => {
                    console.log(i)
                    let Feature = eval(x.feature7);
                    // console.log("feature", Feature);
                    if (Feature) {
                        setInputListFinal(Feature)
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
        const response3 = fetch(`http://localhost:9000/masters/survey_answers_same`, requestOptions)
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
                    {/* <h2 className="steps">80%</h2> */}
                    <div className="steps">
                        <CircularProgressWithLabel size={70} value={5 * 10} />
                    </div>
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
                                        <textarea className="form-control" value={inputListFinal[0].comment} rows={4} id="comment" placeholder="type comment here...." name="comment" onChange={handleInputChange} />
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

