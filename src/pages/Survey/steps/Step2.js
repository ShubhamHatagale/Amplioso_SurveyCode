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
    const [inputListFinal, setInputListFinal] = useState([{ range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }, { range_val: 0 }]);
    const [RecordeData, setRecordeData] = useState();


    const GetAllRecords = async () => {
        // console.log(inputListFinal)
        // console.log(inputListFinal[0].range_val)

        // return false
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
            })
            .catch(error => console.log('error', error));

        const response2 = await fetch(`${process.env.REACT_APP_Base_URL_Backend}question/q_type/3`, requestOptions)
            .then(response2 => response2.json())
            .then(result => {
                console.log(result)
                let qID = result.data[1].id;
                setquestionId(qID);
                console.log(result.data[1].id)
                console.log(result.data[1].id)
                setquestion(result.data[1].question);
                getOptions(result.data[1].id);
                // getOptions1(result.data[0].id);
            })

        const responseSurveyAnswer = await fetch(`${process.env.REACT_APP_Base_URL_Backend}survey_answers`, requestOptions)
            .then(responseSurveyAnswer => responseSurveyAnswer.json())
            .then(surveyResult => {
                console.log(surveyResult.data)
                setSurveyAnswers(surveyResult.data);
            })

        const response4 = fetch(`${process.env.REACT_APP_Base_URL_Backend}survey_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                if (result.status == 200) {

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
                    if (MyValues.length > 0) {
                        MyValues.map((x, i) => {
                            let Feature = eval(x.feature1);
                            if (Feature) {
                                setInputListFinal(Feature)

                            }
                        })
                    }



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
        const response3 = fetch(`${process.env.REACT_APP_Base_URL_Backend}option/opt/${resIdC}`, requestOptions)
            .then(response3 => response3.json())
            .then(rwsOpt => {
                setOptionData(rwsOpt.data);

                console.log(rwsOpt.data)
                let optionDataResult = rwsOpt.data
                let val = [];
                // if (optionDataResult.length != inputListFinal.length) {
                //     optionDataResult.map((item, index) => {
                //         setInputListFinal(inputListFinal => [...inputListFinal, { range_val: 0 }])
                //     })
                // }


            })
    }




    useEffect(() => {
        // setInputListFinal("")



        setloading(1)
        GetAllRecords().then(() => {
            setloading(0)
        })

        // console.log(inputListFinal)



    }, []);

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(inputListFinal)
    // }


    const handleInputChange = (e, index) => {
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
        // console.log(RecordeData ? "true" : "false")

        // return false
        // if (impVal == 0) {
        //     return false
        // }
        console.log(questionId);


        // props.next(values);
        console.log("update")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // inputList.map((item,key)=>{
        var raw = JSON.stringify({
            feature1: inputListFinal,
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
                // GetAllRecords();
            })
            .catch((error) => console.log("error", error));


    };


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
                            <CircularProgressWithLabel size={70} data={uid.userId} value={5 * 10} />
                        </div>                        {/* <h3 className="smtxt">1 = Poor &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Outstanding &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3> */}
                    </div>
                </div>
                <div className="form-card">
                    <p className='fs-title-m'>Next, {question.replace("[FIRST NAME]", first_name)}</p>
                    <hr />
                    {/* <br /> */}
                    <br />
                    <h3 className="smtxt">1 = Poor &nbsp;&nbsp;|&nbsp;&nbsp;  10 = Outstanding &nbsp;&nbsp;|&nbsp;&nbsp; NA = Not Applicable</h3>
                    <br />

                    <div className="row">
                        {OptionData.map((item, i) => {
                            // console.log(item.id)
                            // console.log(SurveyAnswers)
                            var optionVal = SurveyAnswers.filter(({ option_id, created_by }) => option_id === item.id && created_by === uid.userId)

                            if (optionVal.length > 0) {
                                // console.log(optionVal[0].answer)
                            }

                            return (
                                <div className="col-sm-6">
                                    <div className="card pad-card">
                                        {inputListFinal ? (
                                            <div className="range-slider">
                                                <div className="sub-q" data-tip={item.option}>{item.option}</div>
                                                <ReactTooltip />

                                                <input className="range-slider__range"
                                                    type="range"
                                                    id={item.id}
                                                    // value={getFilteredValue(optionVal)}
                                                    defaultValue={0}
                                                    min={0}
                                                    max={10}
                                                    name="range_val"
                                                    value={inputListFinal[i].range_val}
                                                    ips="0"
                                                    onChange={(e) => handleInputChange(e, i)}
                                                />
                                                {/* <span>{inputListFinal[i].range_val}</span> */}
                                                <span className="range-slider__value" style={{ backgroundColor: inputListFinal[i].range_val == 0 || inputListFinal[i].range_val == null || inputListFinal[i].range_val == "" || inputListFinal[i].range_val == "NA" || "" ? "rgb(221,38,60)" : "" }}>
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

