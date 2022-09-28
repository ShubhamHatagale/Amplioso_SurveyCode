import React, { useEffect, useState } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

export default function DonutChart(props, props2) {
    const val = props.data;
    console.log(props.data.percentage_1)
    console.log(props2)

    const BaseURL = process.env.REACT_APP_Base_URL_Backend;
    const token = localStorage.getItem("jwt");
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("");
    const [user_email, setuser_email] = useState("");

    const [question, setquestion] = useState("");
    const uid = JSON.parse(localStorage.getItem('survey_token'));
    const [OptData, setOptData] = useState("")
    const [OptionVal, setOptionVal] = useState("")
    const [impVal, setimpVal] = useState(0)
    const [survey_count, set_survey_count] = useState()
    const [managers_length, set_managers_length] = useState()
    const [company_length, set_company_length] = useState()

    const [questionId, setquestionId] = useState("")
    const [percentage, setpercentage] = useState({
        percentage_1: 50,
        percentage_2: 50,
        percentage_3: 50,
        percentage_4: 50,
    })

    // const percentage = {
    //     percentage_1: 50,
    //     percentage_2: 50,
    //     percentage_3: 50,
    //     percentage_4: 50,
    // }
    // console.log(percentage.percentage_3)
    console.log(percentage)

    const GetAllRecords = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(uid.userId)

        const response3 = fetch(`http://localhost:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result.status)
                if (result.status == 200) {
                    console.log(result.data[0].user_email)
                    setfirst_name(result.data[0].first_name)
                    setlast_name(result.data[0].last_name)
                    setuser_email(result.data[0].user_email)

                    var myHeaders2 = new Headers();
                    var requestOptions2 = {
                        method: 'GET',
                        headers: myHeaders2,
                        redirect: 'follow'
                    };

                    fetch(`http://localhost:9000/masters/collect_feedback/email/${result.data[0].user_email}`, requestOptions2)
                        .then(response => response.json())
                        .then(result => {
                            // setlistRecord(result.data);
                            console.log(result.data.length, "hh")
                            set_survey_count(result.data.length)

                        })
                        .catch(error => console.log('error', error));


                }
            }).then(() => {
                fetch(`http://localhost:9000/masters/question/q_type/3`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // setlistRecord(result.data);
                        console.log(result.data[0], "hh")

                        let qID = result.data[0].id;
                        setquestionId(qID);
                        console.log(result.data[0].id)
                        console.log(result.data[0].id)
                        setquestion(result.data[0].question);
                        getOptions(result.data[0].id);
                    })
                    .catch(error => console.log('error', error));



                fetch(`http://localhost:9000/masters/company/managers/data/allData`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // setlistRecord(result.data);
                        console.log(result.data, "hh")

                        set_managers_length(result.data.length)

                    })
                    .catch(error => console.log('error', error));


                fetch(`http://localhost:9000/masters/company`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // setlistRecord(result.data);
                        console.log(result.data, "company lenght")

                        set_company_length(result.data.length)

                    })
                    .catch(error => console.log('error', error));

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
                    console.log(rwsOpt.data)

                    setOptData(rwsOpt.data.id);
                    setOptionVal(rwsOpt.data.answer)
                    setimpVal(rwsOpt.data.answer)
                    console.log(rwsOpt.data.answer * 10)

                    // percentage.percentage_1 = rwsOpt.data.answer * 10
                    // percentage.percentage_2 = rwsOpt.data.answer * 10 / survey_count;
                    // percentage.percentage_3 = rwsOpt.data.answer * 10 / survey_count * survey_count / managers_length;
                    // percentage.percentage_4 = rwsOpt.data.answer * 10 / survey_count * survey_count / managers_length * survey_count / company_length;
                    console.log(percentage)
                    // percentage.percentage_1 = parseInt(rwsOpt.data.answer * 10) + rwsOpt.data.answer * 10 + 20 / rwsOpt.data.answer * 10


                }

            })
    }

    useEffect(() => {
        GetAllRecords();
    }, []);




   
    console.log(val)

    const val1 = impVal * 10;
    const val2 = 80;
    const val3 = 80;
    const val4 = 80;







    return (
        <>
            {console.log(typeof (val1))}
            {console.log(typeof (val2))}

            <div style={{ width: 312, height: 312, position: "relative", left: "0%" }}>
                <h1>{val}</h1>
                <CircularProgressbarWithChildren
                    value={impVal * 9}
                    // text={`${percentage}%`}
                    // circleRatio={5}
                    strokeWidth={10}
                    styles={buildStyles({

                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 1,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',

                        // Text size
                        textSize: '16px',

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,
                        pathTransition: 0.7,

                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',

                        // Colors

                        pathColor: `rgb(236,101,94, ${impVal * 9 / 100})`,
                        textColor: '#f88',
                        // trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                >

                    <div style={{ width: 246, height: 246, }}>
                        <CircularProgressbarWithChildren
                            value={val2}
                            // text={`${percentage}%`}
                            // circleRatio={5}
                            strokeWidth={14}
                            styles={buildStyles({

                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 1,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',

                                // Text size
                                textSize: '16px',

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,
                                pathTransition: 0.7,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `rgb(90,90,147, ${val2 / 100})`,
                                textColor: '#f88',
                                // trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        >

                            <div style={{ width: 172, height: 172 }}>
                                <CircularProgressbarWithChildren
                                    value={val3}
                                    // text={`${percentage}%`}
                                    // circleRatio={5}
                                    strokeWidth={18}
                                    styles={buildStyles({

                                        // Rotation of path and trail, in number of turns (0-1)
                                        rotation: 1,

                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                        strokeLinecap: 'butt',

                                        // Text size
                                        textSize: '16px',

                                        // How long animation takes to go from one percentage to another, in seconds
                                        pathTransitionDuration: 0.5,
                                        pathTransition: 0.7,

                                        // Can specify path transition in more detail, or remove it entirely
                                        // pathTransition: 'none',

                                        // Colors
                                        pathColor: `rgb(121,159,203, ${val3 / 100})`,
                                        textColor: '#f88',
                                        // trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7',
                                    })}
                                >

                                    <div style={{ width: 123, height: 123 }}>
                                        <CircularProgressbarWithChildren
                                            value={val4}
                                            // text={`${percentage}%`}
                                            // circleRatio={5}

                                            strokeWidth={26}
                                            styles={buildStyles({

                                                // Rotation of path and trail, in number of turns (0-1)
                                                rotation: 1,

                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                strokeLinecap: 'butt',

                                                // Text size
                                                textSize: '16px',

                                                // How long animation takes to go from one percentage to another, in seconds
                                                pathTransitionDuration: 0.5,
                                                pathTransition: 0.7,

                                                // Can specify path transition in more detail, or remove it entirely
                                                // pathTransition: 'none',

                                                // Colors
                                                pathColor: `rgb(214,225,185, ${val4 / 100})`,
                                                textColor: '#f88',
                                                // trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        >



                                        </CircularProgressbarWithChildren>
                                    </div>


                                </CircularProgressbarWithChildren>
                            </div>

                        </CircularProgressbarWithChildren>
                    </div>



                </CircularProgressbarWithChildren>
            </div>





        </>
    )
}
