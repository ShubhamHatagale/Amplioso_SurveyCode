import { ListItem, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';

export default function Step3(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;

    const uid = JSON.parse(localStorage.getItem('survey_token'));

    const [question, setquestion] = useState("")
    const [questionId, setquestionId] = useState("")
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [OptionData, setOptionData] = useState([])
    const [inputValue, setinputValue] = useState([{ inpV: "" }])
    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [loading, setloading] = useState(0)
    // const [inputListFinal, setInputListFinal] = useState([{ range_value: 0, range_value: 0, range_value: 0, range_value: 0, range_value: 0 }]);
    // let uid.userId = 1;
    const [inputListFinal, setInputListFinal] = useState([{ range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }]);
    const [RecordeData, setRecordeData] = useState()


    function validate() {
        var ssr = true;
        OptionData.map((item, key) => {
            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)
            if (optionVal.length == 0) {
                console.log(false)
                ssr = false
            }

            optionVal.map((item, key) => {
                if (item.answer == 0) {
                    ssr = false
                }
            })
        })
        return ssr
    }

    const nextFunction = () => {
        // if (validate()) {
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
        const response = await fetch(`${process.env.REACT_APP_Base_URL_Backend}collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log("11111")
                console.log(result.data[0].first_name)
                setfirst_name(result.data[0].first_name)
                setlast_name(result.data[0].last_name)
            })
            .catch(error => console.log('error', error));

        const response2 = await fetch(`${process.env.REACT_APP_Base_URL_Backend}question/q_type/3`, requestOptions)
            .then(response2 => response2.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result)
                // if(result.length>0){
                let qID = result.data[2].id;
                setquestionId(qID);
                console.log(result.data[2].id)
                console.log(result.data[2].id)
                setquestion(result.data[2].question);
                getOptions(result.data[2].id);
                // }

            })

        const response4 = fetch(`${process.env.REACT_APP_Base_URL_Backend}survey_feedback/${uid.userId}`, requestOptions)
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
                    let Feature = eval(x.feature2);
                    console.log("feature", Feature);
                    if (Feature) {
                        setInputListFinal(Feature)

                    }
                })



            })

        const responseSurveyAnswer = await fetch(`${process.env.REACT_APP_Base_URL_Backend}survey_answers`, requestOptions)
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
        const response3 = fetch(`${process.env.REACT_APP_Base_URL_Backend}option/opt/${resIdC}`, requestOptions)
            .then(response3 => response3.json())
            .then(rwsOpt => {
                // setlistRecord(rwsOpt.data);
                setOptionData(rwsOpt.data);

                console.log(questionId, "jj")

                console.log(rwsOpt.data)


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

    const handleInputChange = (e, index) => {
        console.log(e.target.value)
        console.log(e.target.name)
        // alert(index)

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
            feature2: inputListFinal,
            updated_by: uid.userId
        });
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_Base_URL_Backend}survey_feedback/${uid.userId}`, requestOptions)
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
                            <CircularProgressWithLabel size={70} data={uid.userId} value={5 * 10} />
                        </div>
                        {/* <h2 className="steps">30%</h2> */}
                        {/* <h3 className="smtxt">1 = Completely Disagree &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Completely Agree &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3> */}
                    </div>
                </div>
                <div className="form-card">
                    <div className="row">
                        {/* <p>Next, we’d like you to tell us how you’d rate [FIRST NAME] on a few competencies that help predict their
                        future potential. On a 10-point scale, give us your agreement rating on the following.</p> */}

                        <p className='fs-title-m'>Next, {question.replace("[FIRST NAME]", first_name)}</p>
                        <hr />
                        <br />
                        <br />
                        {/* <br /> */}
                        <h3 className="smtxt">1 = Completely Disagree &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Completely Agree &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3>
                        <br />
                        <br />



                        {OptionData.map((item, i) => {
                            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                            return (
                                <div className="col-sm-12">
                                    <div className="card pad-card">
                                        {inputListFinal ? (
                                            <div className="range-slider">
                                                {/* <h3 className="sub-q">{item.option}</h3> */}
                                                <div className="sub-q" data-tip={item.option}>{item.option}</div>
                                                <ReactTooltip />

                                                <input className="range-slider__range" type="range" id={item.id}
                                                    // value={getFilteredValue(optionVal)}
                                                    name="range_val"
                                                    value={inputListFinal[i].range_val}
                                                    defaultValue={0}
                                                    min={0}
                                                    max={10}
                                                    onChange={(e) => handleInputChange(e, i)} />

                                                <span className="range-slider__value" style={{ backgroundColor: inputListFinal[i].range_val == 0 || inputListFinal[i].range_val == null || inputListFinal[i].range_val == "" || inputListFinal[i].range_val == "NA" ? "rgb(221,38,60)" : "" }}>
                                                    {(inputListFinal[i].range_val == 0 ? "NA" : inputListFinal[i].range_val)}

                                                </span>
                                            </div>
                                        ) : null}
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className="button btn-align-step2">
                    <input type="button" onClick={() => props.prev()} name="previous" className="previous-step-btn" defaultValue="Previous" />
                    <input type="button" onClick={handleSubmit} name="next" className="next-step-btn" defaultValue="Next" />
                </div>
            </fieldset>
        </>
    )
}

