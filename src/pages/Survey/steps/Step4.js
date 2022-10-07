import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';
import "../../../assets/css/steps.css"
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
    const [inputListFinal, setInputListFinal] = useState([{ range_val: 0, range_val1: 0, range_val2: 0 }, { range_val: 0, range_val1: 0, range_val2: 0 }, { range_val: 0, range_val1: 0, range_val2: 0 }]);
    const [RecordeData, setRecordeData] = useState()

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

            const response4 = fetch(`http://localhost:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
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
                    let Feature = eval(x.feature3);
                    console.log("feature", Feature);
                    if (Feature) {
                        setInputListFinal(Feature)

                    }
                })



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


  

    const handleInputChange = (e, index) => {

        console.log(index)
        console.log(e.target.value)
        console.log(e.target.name)
        const { name, value } = e.target;
        const list = [...inputListFinal];
        console.log("Here is the Value", list);
        list[index][name] = value;
        setInputListFinal(list);

    }


    const handleSubmit = (values) => {
        console.log(RecordeData)
        console.log(questionId);
        // props.next(values);
        console.log("update")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            feature3: inputListFinal,
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


    };



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
                        <div className="colOwn" >
                            <div className="cardp pad-cardp">
                                <h2 className="fs-title">{first_name} THINKS</h2>
                            </div>

                            {OptionDataCol1.map((item, i) => {
                                var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                                return (

                                    <div className="cardp pad-cardp" >
                                        <div className="range-slider" >
                                            <h3 className="sub-q min-height">{item.option}</h3>
                                            <input className="range-slider__range" type="range" id={item.id} value={inputListFinal[i].range_val} name="range_val" onChange={(e) => handleInputChange(e, i)} defaultValue={0} min={0} max={10} />
                                            <span className="range-slider__value " style={{ backgroundColor: inputListFinal[i].range_val == 0 || inputListFinal[i].range_val == "" || inputListFinal[i].range_val == null || inputListFinal[i].range_val == "NA" ? "rgb(221,38,60)" : "" }}>{optionVal.length > 0 ? (inputListFinal[i].range_val == 0 ? "NA" : inputListFinal[i].range_val) : "NA"}</span> </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="colOwn" >

                            <div className="cardp pad-cardp">
                                <h2 className="fs-title">{first_name} ACTS</h2>
                            </div>


                            {OptionDataCol2.map((item, i) => {
                                var optionVal1 = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                                return (

                                    <div className="cardp pad-cardp" >
                                        <div className="range-slider" >
                                            <h3 className="sub-q min-height">{item.option}</h3>
                                            <input className="range-slider__range" type="range"
                                                id={item.id}
                                                name="range_val1"
                                                value={inputListFinal[i].range_val1}
                                                onChange={(e) => handleInputChange(e, i)}
                                                defaultValue={0}
                                                min={0}
                                                max={10} />
                                            <span className="range-slider__value" style={{ backgroundColor: inputListFinal[i].range_val1 == 0 || inputListFinal[i].range_val1 == "" || inputListFinal[i].range_val1 == null || inputListFinal[i].range_val1 == "NA" ? "rgb(221,38,60)" : "" }}>{optionVal1.length > 0 ? (inputListFinal[i].range_val1 == 0 ? "NA" : inputListFinal[i].range_val1) : "NA"}</span> </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="colOwn" >

                            <div className="cardp pad-cardp">
                                <h2 className="fs-title">{first_name} Makes Me FEEL</h2>
                            </div>

                            {OptionDataCol3.map((item, i) => {
                                var optionVal2 = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                                return (

                                    <div className="cardp pad-cardp" >
                                        <div className="range-slider" >
                                            <h3 className="sub-q min-height">{item.option}</h3>
                                            <input className="range-slider__range" type="range"
                                                id={item.id}
                                                value={inputListFinal[i].range_val2}
                                                // onChange={inputChange}
                                                name="range_val2"
                                                onChange={(e) => handleInputChange(e, i)}
                                                defaultValue={0}
                                                min={0}
                                                max={10} />
                                            <span className="range-slider__value" style={{ backgroundColor: inputListFinal[i].range_val2 == 0 || inputListFinal[i].range_val2 == "" || inputListFinal[i].range_val2 == null || inputListFinal[i].range_val2 == "NA" ? "rgb(221,38,60)" : "" }}>{optionVal2.length > 0 ? (inputListFinal[i].range_val2 == 0 ? "NA" : inputListFinal[i].range_val2) : "NA"}</span> </div>
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
                        <input type="button" onClick={handleSubmit} name="next" className="next-step-btn" defaultValue="Next" />
                    </div>
                </div>
            </fieldset>
        </>
    )
}

