import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";
import Step1 from "../steps/Step5";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Modal from "react-bootstrap/Modal";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ReactTooltip from 'react-tooltip';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Chart } from "react-google-charts";
import '../../../assets/css/pdf_design.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Card, Container } from '@material-ui/core';
// import logo from "../assets/images/logo-wt.png";
import logo_icon from "../../../assets/images/deflogo.png";
import star_img from "../../../assets/images/star_img.jpg";
import Star from '@material-ui/icons/StarRate';
import CheckIcon from '@material-ui/icons/Check';
import DonutChart from '../../../components/DonutChart';
import GraphVerticalBars from '../../../components/GraphVerticalBars';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';

export default function Step9(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;
    const [DisplayDiv, setDisplayDiv] = useState(true);
    const [pdfShowDes, setpdfShowDes] = useState(0);
    const history = useHistory();
    const [beliverName, setbeliverName] = useState("");
    const [SurveyVal, setSurveyVal] = useState({});


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const currDateForm = monthNames[new Date().getMonth()].substring(0, 3) + "-" + monthNames[new Date().getMonth() + 1].substring(0, 3) + " " + new Date().getFullYear();

    const exportPDFWithMethod = () => {
        setpdfShowDes(1);
        setTimeout(() => {
            // alert(pdfShowDes);
            if (pdfExportComponent.current) {
                pdfExportComponent.current.save();

                setTimeout(() => {
                    setpdfShowDes(0);
                }, 2000)
            }
        }, 2000)

    };
    const pdfExportComponent = React.useRef(null);



    const [impVal2Devided1, set_impVal2Devided1] = useState()
    const [impVal2Devided2, set_impVal2Devided2] = useState()

    const [survey_count, set_survey_count] = useState()
    const [managers_length, set_managers_length] = useState()
    const [company_length, set_company_length] = useState()
    const [inputListFinal, setInputListFinal] = useState([]);
    const [SurveyAnswers, setSurveyAnswers] = useState([])
    const [viewModal, setviewModal] = useState(false);

    const token = localStorage.getItem("jwt");
    const [feedbackData, setfeedbackData] = useState()

    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("");
    const [question, setquestion] = useState([]);
    const [answer0, setanswer0] = useState([])
    const [answer1, setanswer1] = useState([])
    const [answer2, setanswer2] = useState([])
    const [answer3, setanswer3] = useState([])
    const [answer4, setanswer4] = useState([])
    const [answer5, setanswer5] = useState([])
    const [answer6, setanswer6] = useState([])

    const [options0, setoptions0] = useState([])
    const [options1, setoptions1] = useState([])
    const [options2, setoptions2] = useState([])
    const [options3, setoptions3] = useState([])
    const [options4, setoptions4] = useState([])
    const [options5, setoptions5] = useState([])
    const [options6, setoptions6] = useState([])
    const [heights, setheights] = useState("10rem")


    const uid = JSON.parse(localStorage.getItem('survey_token'));


    const [OptData, setOptData] = useState("")
    const [OptionVal, setOptionVal] = useState("")
    const [impVal, setimpVal] = useState(0)
    const [impVal2, setimpVal2] = useState(0)
    const [impVal3, setimpVal3] = useState(0)
    const [impVal4, setimpVal4] = useState(0)
    const [impVal5, setimpVal5] = useState(0)
    const [impVal6, setimpVal6] = useState(0)
    const [impVal7, setimpVal7] = useState(0)
    const [impVal8, setimpVal8] = useState(0)
    const [impVal9, setimpVal9] = useState(0)

    const [Val, setVal] = useState("")
    const [Val2, setVal2] = useState("")
    const [Val3, setVal3] = useState("")
    const [Val4, setVal4] = useState("")
    const [Val5, setVal5] = useState("")
    const [Val6, setVal6] = useState("")
    const [Val7, setVal7] = useState("")
    const [Val8, setVal8] = useState("")
    const [Val9, setVal9] = useState("")

    const [ans, setans] = useState([])

    const [questionId, setquestionId] = useState("")
    const [OptionData, setOptionData] = useState([])
    const [OptionDataCol1, setOptionDataCol1] = useState([])
    const [OptionDataCol2, setOptionDataCol2] = useState([])
    const [OptionDataCol3, setOptionDataCol3] = useState([])
    const [OptionDataCol5, setOptionDataCol5] = useState([])
    const [OptionDataCol5_2, setOptionDataCol5_2] = useState([])
    const [OptionDataCol5_3, setOptionDataCol5_3] = useState([])
    const [RecordeData, setRecordeData] = useState([])

    const [ReportData, setReportData] = useState({})
    const [step_1, setstep_1] = useState()
    const [step_2, setstep_2] = useState()
    const [step_3, setstep_3] = useState()
    const [step_4, setstep_4] = useState()
    const [cal, setcal] = useState("")
    const [list1, setlist1] = useState([])

    const [data, setData] = useState({
        // inputVal: 0,
        last_name: "",
        email: "",
        password: "",
        que1: "",
    });



    const percentage = {
        percentage_1: parseInt(impVal * 10) + impVal * 10 + 20 / impVal * 10,
        percentage_2: parseInt(impVal * 10),
        percentage_3: 70,
        percentage_4: 90,
    }

    const percentage2 = {
        percentage_1: impVal * 10,
        percentage_2: parseInt(impVal * 10) + impVal * 10 + 20 / impVal * 10,
        percentage_3: 50,
        percentage_4: 150,
    }

    const val1 = "abc";

    const data_g = [
        ["Task", "Hours per Day"],
        ["Work", parseInt(impVal * 10) + parseInt(impVal) * 10 + 20 / parseInt(impVal) * 10],
        ["Eat", parseInt(impVal * 10)],
        ["Commute", 6],
        ["Sleep", 7],
    ];

    const options = {
        // title: "My Daily Activities",
        legend: "none",
        // legend: "none",
        // pieSliceText: "label",
        title: "Swiss Language Use (100 degree rotation)",
        // pieStartAngle: 100,
        slices: {
            0: { color: "rgb(214,225,185)" },
            1: { color: "rgb(53,98,136)" },
            2: { color: "rgb(55,55,94)" },
            3: { color: "rgb(236,101,94)" },

        },
    };


    const colorOptions = {
        slices: {
            0: { color: "rgb(168,26,12)" },
            1: { color: "rgb(55,55,94)" },
            2: { color: "rgb(53,98,136)" },
            3: { color: "rgb(170,207,221)" },
        },
    }


    const options_2 = {
        // title: "My Daily Activities",
        legend: "none",
        // legend: "none",
        // pieSliceText: "label",
        title: "Shubham knows it",
        // pieStartAngle: 100,
        slices: {
            0: { color: "rgb(214,225,185)" },
            1: { color: "rgb(53,98,136)" },
            2: { color: "rgb(55,55,94)" },
            3: { color: "rgb(236,101,94)" },

        },
    };



    const checkUserHosting = async (hostEmail, callback) => {
        let hostEmailData = await fetch(`http://localhost:9000/masters/company/managers/${uid.companyId}`)
        //use string literals
        let hostEmailJson = await hostEmailData.json();
        return hostEmailJson;
    }


    const ManagersLength = async () => {
        var myHeaders4 = new Headers();
        var requestOptions4 = {
            method: 'GET',
            headers: myHeaders4,
            redirect: 'follow'
        };


        fetch(`http://localhost:9000/masters/company/managers/${uid.companyId}`, requestOptions4)
            .then(response => response.json())
            .then(result4 => {
                // console.log(result4,"res4")

                if (result4.status == 200) {
                    // setlistRecord(result4.data);
                    // console.log(result4 + "hhhh")
                    // console.log(result4.data, "hhs")
                    set_managers_length(result4.data.length)


                    fetch(`http://localhost:9000/masters/company`, requestOptions4)
                        .then(response => response.json())
                        .then(result5 => {
                            // setlistRecord(result5.data);
                            if (result5.status == 200) {
                                // console.log(result5.data, "company lenght")
                                set_company_length(result5.data.length)


                            }
                        })
                        .catch(error => console.log('error', error));

                }

            })
            .catch(error => console.log('error', error));


    }

    const impValFn = (val, valmed, intoVal) => {
        return parseFloat(val <= 1 ? valmed * intoVal : val * intoVal)
    }

    const GetAllRecords = async () => {
        // var question_id = q_id;
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch(`http://localhost:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 200) {

                    // console.log(result.data)
                    // let aa = JSON.parse(result.data[0])
                    console.log(result.data[0])
                    setfeedbackData(result.data)

                    var myHeaders2 = new Headers();
                    var requestOptions2 = {
                        method: 'GET',
                        headers: myHeaders2,
                        redirect: 'follow'
                    };

                    fetch(`http://localhost:9000/masters/collect_feedback/email/${result.data[0].user_email}`, requestOptions2)
                        .then(response => response.json())
                        .then(result1 => {
                            // setlistRecord(result1.data);
                            if (result1.status == 200) {
                                // console.log(result1)
                                // console.log(result.data[0])
                                // console.log(result1.data.length, "hh")
                                set_survey_count(result1.data.length)



                                fetch(`http://localhost:9000/masters/question/q_type/3`, requestOptions)
                                    .then(response => response.json())
                                    .then(result2 => {
                                        // setlistRecord(result2.data);
                                        if (result2.status == 200) {
                                            // console.log(result2.data, "allQuestionsByType")

                                            // console.log(result2.data[0], "hh")
                                            let qID = result2.data[0].id;
                                            setquestionId(qID);
                                            // console.log(result2.data[0].id)
                                            // console.log(result2.data[0].id)
                                            setquestion(result2.data[0].question);
                                            // getOptions(result.data[0].id);

                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[0].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result3 => {
                                                    // setlistRecord(result3.data);

                                                    // console.log(questionId, "jj")
                                                    if (result3.data) {
                                                        // console.log(result3.data.id)
                                                        // console.log(result3.data.answer)

                                                        // setOptData(result3.data.id);
                                                        // setOptionVal(result3.data.answer)
                                                        console.log("result3" + JSON.stringify(result3))
                                                        let step = 1
                                                        setVal(result3)
                                                        setimpVal(result3.data)


                                                    }

                                                })

                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[1].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result3 => {
                                                    // setlistRecord(result3.data);
                                                    // console.log(result3)
                                                    // console.log(questionId, "jj")
                                                    if (result3.data) {
                                                        let halfwayPoint = result3.data.length / 2;
                                                        let Devided1 = result3.data.splice(0, halfwayPoint)
                                                        let Devided2 = result3.data.splice(0, halfwayPoint)
                                                        set_impVal2Devided1(Devided1)
                                                        set_impVal2Devided2(Devided2)

                                                    }

                                                })

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result3_1 => {
                                                    // setlistRecord(result3_1.data);

                                                    // console.log(questionId, "jj")
                                                    if (result3_1.data) {
                                                        // console.log(result3_1.data)
                                                        setVal2(result3_1)
                                                        setimpVal2(result3_1.data)
                                                        console.log(result3_1.data)
                                                        console.log(result3_1)

                                                        let step = 2;
                                                        let myValues = result3_1.data;

                                                    }

                                                })



                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[2].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result3 => {
                                                    // setlistRecord(result3.data);
                                                    // console.log(questionId, "jj")
                                                    if (result3.status == 200) {
                                                        console.log(result3)

                                                        // console.log(result3.data)
                                                        // console.log(result3.data.answer)

                                                        // setOptData(result3.data.ids);
                                                        // setOptionVal(result3.data.answer)
                                                        setimpVal3(result3.data)
                                                        setVal3(result3)

                                                        console.log(result3)
                                                        // console.log(impVal2)
                                                        // console.log(impVal2[0])

                                                    }

                                                })



                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[3].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result3 => {
                                                    // setlistRecord(result3.data);

                                                    // console.log(questionId, "jj")
                                                    if (result3.status == 200) {
                                                        // console.log(result3.data)
                                                        // console.log(result3.data.answer)

                                                        // setOptData(result3.data.ids);
                                                        // setOptionVal(result3.data.answer)
                                                        setVal4(result3)
                                                        setimpVal4(result3.data)


                                                    }

                                                })


                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[4].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result3 => {
                                                    // setlistRecord(result3.data);

                                                    // console.log(questionId, "jj")
                                                    if (result3.data) {
                                                        // console.log(result3.data)
                                                        // console.log(result3.data.answer)

                                                        // setOptData(result3.data.ids);
                                                        // setOptionVal(result3.data.answer)
                                                        setimpVal5(result3.data)


                                                    }

                                                })




                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[6].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result4 => {
                                                    // setlistRecord(result4.data);

                                                    // console.log(questionId, "jj")
                                                    if (result4.data) {
                                                        // console.log(result4.data)
                                                        // console.log(result4.data.answer)

                                                        // setOptData(result4.data.ids);
                                                        // setOptionVal(result4.data.answer)
                                                        setimpVal7(result4.data)


                                                    }

                                                })

                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[7].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_answers_same`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result5 => {
                                                    // setlistRecord(result5.data);
                                                    // console.log(result5.data + "ccc")

                                                    // console.log(questionId, "jj")
                                                    if (result5.data) {
                                                        // console.log(result5.data.answer + "ccc")
                                                        // console.log(result5.data.answer)

                                                        // setOptData(result5.data.ids);
                                                        // setOptionVal(result5.data.answer)
                                                        setimpVal8(result5.data.answer)


                                                    }

                                                })



                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            var raw1 = JSON.stringify({
                                                surveyor_id: 5,
                                                question_id: result2.data[5].id,
                                            });
                                            var requestOptions = {
                                                method: "POST",
                                                headers: myHeaders,
                                                body: raw1,
                                                redirect: "follow",
                                            };

                                            fetch(`http://localhost:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                                                .then(response3 => response3.json())
                                                .then(result3 => {
                                                    // setlistRecord(result3.data);

                                                    // console.log(questionId, "jj")
                                                    if (result3.data) {
                                                        // console.log(result3.data)
                                                        // console.log(result3.data.answer)

                                                        // setOptData(result3.data.ids);
                                                        // setOptionVal(result3.data.answer)
                                                        setimpVal6(result3.data)


                                                    }

                                                })


                                            var myHeaders4 = new Headers();
                                            var requestOptions4 = {
                                                method: 'GET',
                                                headers: myHeaders4,
                                                redirect: 'follow'
                                            };

                                            // console.log(result.data[0].company_id)

                                            fetch(`http://localhost:9000/masters/company/managers/${result.data[0].company_id}`, requestOptions4)
                                                .then(response => response.json())
                                                .then(result4 => {
                                                    // console.log(result4,"res4")

                                                    if (result4.status == 200) {
                                                        // setlistRecord(result4.data);
                                                        // console.log(result4)
                                                        // console.log(result4.data, "hhs")
                                                        // set_managers_length(result4.data.length)


                                                        fetch(`http://localhost:9000/masters/company`, requestOptions4)
                                                            .then(response => response.json())
                                                            .then(result5 => {
                                                                // setlistRecord(result5.data);
                                                                if (result5.status == 200) {
                                                                    // console.log(result5.data, "company lenght")
                                                                    set_company_length(result5.data.length)

                                                                    // console.log(result, "eer")
                                                                    // console.log(result1)
                                                                    // console.log(result2)
                                                                    // console.log(result4)
                                                                    // console.log(result5)
                                                                    // exportPDFWithMethod();

                                                                }
                                                            })
                                                            .catch(error => console.log('error', error));

                                                    }

                                                })
                                                .catch(error => console.log('error', error));



                                        }

                                    })
                                    .catch(error => console.log('error', error));




                            }

                        })
                        .catch(error => console.log('error', error));
                }
            })
    }


    useEffect(() => {
        ManagersLength();

        console.log(colorOptions)
        GetSurveyFeedRec()
        GetAllRecords().then(() => {
            setTimeout(() => {
                // exportPDFWithMethod()
            }, 2000);
        })

    }, []);



    const surveyMean = (value) => {
        // console.log(value)
        // console.log(`${value} / ${survey_count} = ${value/survey_count}`)
        let survey_mean = value / survey_count;
        // let internal_benchmark = survey_mean * survey_count / managers_length;
        // let external_benchmark = internal_benchmark * survey_count / company_length;
        return survey_mean
    }



    const internalBenchmark = (value) => {
        // console.log(value)
        // console.log(`${value} / ${survey_count}* ${survey_count} / ${managers_length}`)
        let internal_benchmark = value / survey_count * survey_count / managers_length;
        return internal_benchmark
    }

    const externalBenchmark = (value) => {
        // console.log(`${value} / ${survey_count} * ${survey_count} / ${managers_length}* ${survey_count} / ${company_length}`)
        let external_benchmark = value / survey_count * survey_count / managers_length * survey_count / company_length;
        return external_benchmark
    }

    const data_g_1 = [
        ["Task", "Hours per Day"],
        ["Self Assessment", parseInt(impVal * 10)],
        ["Survey Mean", surveyMean(impVal * 10)],
        ["Internal Benchmark", internalBenchmark(impVal * 10)],
        ["External Benchmark", externalBenchmark(impVal * 10)],
    ];


    function checkbtn() {
        console.log(cal)
        console.log(list1)

    }

    const calculate = (val) => {
        console.log(val)
        var featSum = 0
        // featSum += parseInt(val[0].range_val)
        // setcal([...cal, featSum])

        // setcal((prev) => ({ ...prev, ...newData }));

        console.log(cal)
        console.log(featSum)

    }

    // const getActivity = async () => {
    //     let jsonData = await checkUserHosting();
    //     //now you can directly use jsonData
    // }

    const GetSurveyFeedRec = async () => {
        // console.log(managers_length ? managers_length : 0)
        let jsonData = await checkUserHosting();

        // console.log(getActivity())

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(uid)
        fetch(`http://localhost:9000/masters/survey_feedback/company/${uid.companyId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result.data.length)
                console.log(result.data)
                let MyValues = result.data;
                console.log("Edit Values", MyValues);

                // console.log(MyValues.reduce(add, 0))
                // const sum = MyValues.reduce(add, 0)

                // console.log(sum)


                async function calco(val) {
                    let jsonData = await checkUserHosting();

                    let surveyMean = val * 2 / 2;
                    let internalBenchmark = val * 2 / 2;
                    let externalBenchmark = val * 2 / 2;

                    return { surveyMean, internalBenchmark, externalBenchmark, jsonData }
                }

                async function sumArray(array) {
                    let sum = 0 // the sum is initialed to 0

                    /* js arrays are zero-index based
                    ourArray.length = 5, the initialization block is set to 0.
                    the last item is index 4 that is < 5 (what we define in the condition block)
                    */
                    // var featSum = []
                    var [feature1_sum0] = [0];
                    var [feature1Sum0, feature1Sum1, feature1Sum2, feature1Sum3, feature1Sum4, feature1Sum5, feature1Sum6, feature1Sum7, feature1Sum8, feature1Sum9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    var [feature2Sum0, feature2Sum1, feature2Sum2, feature2Sum3, feature2Sum4] = [0, 0, 0, 0, 0]
                    var [feature3Sum0, feature3Sum1, feature3Sum2] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
                    var [feature5_sum0] = [0];

                    var [featArr0, featArr1, featArr2, featArr3, featArr4] = [[], [], [], [], []]
                    // var featArr1 = []

                    for (let i = 0; i < array.length; i++) {
                        // take every item in the array and add it to sum variable
                        console.log(eval(array[i].feature)[0].range_val)
                        // console.log(eval(array[i].feature1))
                        var feat = eval(array[i].feature)
                        var feat1 = eval(array[i].feature1)
                        var feat2 = eval(array[i].feature2)
                        var feat3 = eval(array[i].feature3)
                        // var feat4 = eval(array[i].feature4)
                        var feat5 = eval(array[i].feature5)
                        // var feat6 = eval(array[i].feature6)
                        // var feat7 = eval(array[i].feature7)

                        // featSum += parseInt(eval(array[i].feature)[0].range_val)
                        // for (var a = 0; a < 4; a++) {
                        console.log(feat[0].range_val)

                        feature1_sum0 += parseInt(feat[0].range_val)

                        feature1Sum0 += parseInt(feat1[0].range_val)
                        feature1Sum1 += parseInt(feat1[1].range_val)
                        feature1Sum2 += parseInt(feat1[2].range_val)
                        feature1Sum3 += parseInt(feat1[3].range_val)
                        feature1Sum4 += parseInt(feat1[4].range_val)
                        feature1Sum5 += parseInt(feat1[5].range_val)
                        feature1Sum6 += parseInt(feat1[6].range_val)
                        feature1Sum7 += parseInt(feat1[7].range_val)
                        feature1Sum8 += parseInt(feat1[8].range_val)
                        feature1Sum9 += parseInt(feat1[9].range_val)


                        feature2Sum0 += parseInt(feat2[0].range_val)
                        feature2Sum1 += parseInt(feat2[1].range_val)
                        feature2Sum2 += parseInt(feat2[2].range_val)
                        feature2Sum3 += parseInt(feat2[3].range_val)
                        feature2Sum4 += parseInt(feat2[4].range_val)

                        feature3Sum0[0] += parseInt(feat3[0].range_val)
                        feature3Sum0[1] += parseInt(feat3[1].range_val)
                        feature3Sum0[2] += parseInt(feat3[2].range_val)
                        feature3Sum1[0] += parseInt(feat3[0].range_val1)
                        feature3Sum1[1] += parseInt(feat3[1].range_val1)
                        feature3Sum1[2] += parseInt(feat3[2].range_val1)
                        feature3Sum2[0] += parseInt(feat3[0].range_val2)
                        feature3Sum2[1] += parseInt(feat3[1].range_val2)
                        feature3Sum2[2] += parseInt(feat3[2].range_val2)


                        feature5_sum0 += parseInt(feat5[0].range_val)



                        // feature3Sum1 += parseInt(feat3[1].range_val)
                        // feature3Sum2 += parseInt(feat3[2].range_val)




                    }




                    // console.log(feature3Sum0[1])

                    // console.log(feature3Sum1)
                    // console.log(feature3Sum2)

                    console.log(jsonData)
                    let survey_mean = feature1_sum0 / array.length;
                    let internal_benchmark = (survey_mean * array.length) / 2;
                    let external_benchmark = (survey_mean * array.length) / 2;

                    console.log(calco(feature1_sum0))
                    featArr0.push(await calco(feature1Sum0))

                    featArr1.push(feature1Sum0)
                    featArr1.push(feature1Sum1)
                    featArr1.push(feature1Sum2)
                    featArr1.push(feature1Sum3)
                    featArr1.push(feature1Sum4)
                    featArr1.push(feature1Sum5)
                    featArr1.push(feature1Sum6)
                    featArr1.push(feature1Sum7)
                    featArr1.push(feature1Sum8)
                    featArr1.push(feature1Sum9)


                    featArr2.push(feature2Sum0)
                    featArr2.push(feature2Sum1)
                    featArr2.push(feature2Sum2)
                    featArr2.push(feature2Sum3)
                    featArr2.push(feature2Sum4)


                    console.log(feature3Sum0[0])
                    console.log(feature3Sum0[1])
                    console.log(feature3Sum0[2])

                    console.log(feature3Sum1[0])
                    console.log(feature3Sum1[1])
                    console.log(feature3Sum1[2])


                    console.log(feature3Sum2[0])
                    console.log(feature3Sum2[1])
                    console.log(feature3Sum2[2])

                    featArr3.push([feature3Sum0[0], feature3Sum1[0], feature3Sum2[0]])
                    featArr3.push([feature3Sum0[1], feature3Sum1[1], feature3Sum2[1]])
                    featArr3.push([feature3Sum0[2], feature3Sum1[2], feature3Sum2[2]])


                    featArr4.push(feature5_sum0)


                    // featArr3.push([feature3Sum0[0], feature3Sum0[1], feature3Sum0[2]])
                    // featArr3.push([feature3Sum1[0], feature3Sum1[1], feature3Sum1[2]])
                    // featArr3.push([feature3Sum2[0], feature3Sum2[1], feature3Sum2[2]])

                    // console.log("fatSum" + featSum1) // 11
                    // console.log(sum) // 11
                    // return sum
                    // return sum
                    console.log(featArr0) // 11
                    console.log(featArr1) // 11
                    console.log(featArr2) // 11
                    console.log(featArr3) // 11
                    console.log(featArr4) // 11

                    return [featArr0, featArr1, featArr2, featArr3, featArr4]

                }
                //   console.log(add(3,2))

                console.log(sumArray(MyValues)); // logs 11

                var [featarr] = [[]];

                var [featarr1_0,
                    featarr1_1,
                    featarr1_2,
                    featarr1_3,
                    featarr1_4,
                    featarr1_5,
                    featarr1_6,
                    featarr1_7,
                    featarr1_8,
                    featarr1_9
                ] = [
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        []
                    ];

                // var featarr1_0 = [];

                MyValues.map((x, i) => {
                    var Feature = eval(x.feature);
                    var Feature1 = eval(x.feature1);

                    console.log(Feature)
                    console.log(Feature1[0])
                    // calculate(Feature1)

                    // Feature1.map
                    featarr.push(Feature[0].range_val)

                    // Feature1.map((x, i) => {
                    //     // featarr1_[i].push(Feature1[i].range_val)
                    //     setlist1(list1 => [...list1, Feature1[i].range_val])
                    // })

                    featarr1_0.push(Feature1[0].range_val)
                    featarr1_1.push(Feature1[1].range_val)
                    featarr1_2.push(Feature1[2].range_val)
                    featarr1_3.push(Feature1[3].range_val)
                    featarr1_4.push(Feature1[4].range_val)
                    featarr1_5.push(Feature1[5].range_val)
                    featarr1_6.push(Feature1[6].range_val)
                    featarr1_7.push(Feature1[7].range_val)
                    featarr1_8.push(Feature1[8].range_val)
                    featarr1_9.push(Feature1[9].range_val)



                    // console.log(Feature.reduce((n, { range_val }) => n + parseInt(range_val), 0))

                    // var Feature1 = eval(x.feature1);
                    // var Feature2 = eval(x.feature2);
                    // var Feature3 = eval(x.feature3);
                    // var Feature4 = eval(x.feature4);
                    // var Feature5 = eval(x.feature5);
                    // var Feature6 = eval(x.feature6);
                    // var Feature7 = eval(x.feature7);

                    if (Feature) {
                        console.log("feature", Feature);

                        // setInputListFinal([Feature],[Feature1])
                        // setInputListFinal(inputListFinal => [...inputListFinal, { Feature, Feature1, Feature2, Feature3, Feature4, Feature5, Feature6, Feature7 }])

                    }
                })
                console.log(featarr)

                console.log(featarr1_0)
                console.log(featarr1_1)
                console.log(featarr1_2)
                console.log(featarr1_3)
                console.log(featarr1_4)
                console.log(featarr1_5)
                console.log(featarr1_6)
                console.log(featarr1_7)
                console.log(featarr1_8)
                console.log(featarr1_9)

            })

        fetch(`http://localhost:9000/masters/survey_feedback/${uid.userId}`, requestOptions)
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
                    var Feature = eval(x.feature);
                    var Feature1 = eval(x.feature1);
                    var Feature2 = eval(x.feature2);
                    var Feature3 = eval(x.feature3);
                    var Feature4 = eval(x.feature4);
                    var Feature5 = eval(x.feature5);
                    var Feature6 = eval(x.feature6);
                    var Feature7 = eval(x.feature7);

                    if (Feature) {
                        console.log("feature", Feature);
                        // setInputListFinal([Feature],[Feature1])
                        setInputListFinal(inputListFinal => [...inputListFinal, { Feature, Feature1, Feature2, Feature3, Feature4, Feature5, Feature6, Feature7 }])

                    }

                })

            })
    }

    return (
        <>

            {DisplayDiv ? (
                <>
                    <button onClick={checkbtn} > check</button>
                    {/* <Pdf_page1 /> */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row" style={{ padding: "25px 0px 0px 25px" }} >
                                <div >
                                    <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "capitalize" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                    <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                    <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span>
                                    {console.log("val==> " + impVal)}

                                    {impVal ? (
                                        <div style={{ position: "relative", top: "58px", left: "14px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div className="square_bar"></div>
                                            <div className='page_left_header' style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <span>Overall</span><br>
                                                </br><span>Performance</span>
                                            </div>
                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify", fontSize: "7px", position: "relative", bottom: "80px", left: "16px", color: "#9C9C9C" }}>
                                                <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                                                </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                                            </div>
                                            <div className='row p-5' style={{ textAlign: "justify", MozTextAlignLast: "justify", border: "0px solid black", width: "100%", position: "relative", left: "5%", top: "-40px" }}>
                                                {console.log(inputListFinal)}
                                                {inputListFinal[0].Feature.map((item, key) => {
                                                    console.log(item)
                                                })}


                                                {inputListFinal[0].Feature.map((item, key) => {
                                                    // { console.log(item) }

                                                    return (
                                                        <>
                                                            {[Val.[`data${key}`][0].length > 0] ? (
                                                                <>
                                                                    <div className='col-2'>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                                                {/* <span style={{ fontSize: "20px", }}>{Math.ceil(Val.[`data${key}`][0].survey_mean).toFixed(1)}</span><br /> */}
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Survey</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Mean</span>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ padding: impValFn(item.answer, 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[0].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className='col-2' style={{ margin: "0px 18px 0px 18px" }}>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                                                <span style={{ fontSize: "20px", }}>{Math.ceil(item.range_val).toFixed(1)}</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Self</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Assessment</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Math.ceil(Math.ceil(Val.[`data${key}`][0].survey_mean) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].survey_mean) * 9.2) : 92 */}
                                                                        <div style={{ padding: impValFn((4), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[1].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-2' style={{ margin: "0px 18px 0px 3px" }}>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                                                <span style={{ fontSize: "20px", }}>{Math.ceil(Val.[`data${key}`][0].internal_bench).toFixed(1)}</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Internal</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Benchmark</span></div>
                                                                        </div>
                                                                        {/* <div style={{ padding: Math.ceil(Math.ceil(Val.[`data${key}`][0].internal_bench) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].internal_bench) * 9.2) : 92, width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[2].color }} > */}

                                                                        <div style={{ padding: impValFn((Val.[`data${key}`][0].internal_bench), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[2].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-2'>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", right: "-24%" }}>
                                                                                <span style={{ fontSize: "20px", }}>{Math.ceil(Val.[`data${key}`][0].external_bench).toFixed(1)}</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>External </span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Benchmark</span></div>
                                                                        </div>
                                                                        {/* <div style={{ padding: Math.ceil(Math.ceil(Val.[`data${key}`][0].external_bench) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].external_bench) * 9.2) : 92, width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[3].color }} > */}

                                                                        <div style={{ padding: impValFn((Val.[`data${key}`][0].external_bench), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[3].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                                                        </div>

                                                                    </div>
                                                                </>

                                                            ) : null}
                                                        </>
                                                    )
                                                })}

                                            </div>
                                        </div>) : null}

                                </div>


                                <div style={{ fontSize: "8px", position: "absolute", bottom: "2%", left: "-14px" }}>
                                    <hr style={{ width: "102%", textAlign: 'left', marginLeft: 0 }} />
                                    <span style={{ position: "relative", left: "45%", bottom: "2px" }}>www.amplioso.com</span>
                                    <span style={{ position: "relative", left: "-20%", bottom: "2px" }}>{new Date().getFullYear()}</span>
                                    <span style={{ position: "relative", left: "-45%", bottom: "2px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                </div>

                            </div >
                        </>
                    ) : null}
                </>


            ) : null}

            <fieldset>
                <div className="row">
                    <div className="col-12">
                        {/* <h2 className="steps">100%</h2> */}
                        <div className="steps">
                            <CircularProgressWithLabel size={70} value={5 * 10} />
                        </div>
                    </div>
                </div>

                <div className="form-card" style={{ height: 'auto' }}>

                    <h2 className="purple-text text-center"><strong>You did it!</strong> <br />
                        Wasn’t that easy?</h2>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <div className="success-animation">
                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" />
                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-7 text-center">
                            <h5 className="purple-text text-center">Thank you for your time. We now hope others will return the favor for you someday. Wish you much success.</h5>
                        </div>
                    </div>
                </div>


            </fieldset >





            <button
                type="button"
                class="btn downloadbtn waves-effect"
                onClick={exportPDFWithMethod}
            >
                Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
            </button>

            {pdfShowDes > 0 ? (
                <PDFExport paperSize="A4" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} >
                    <div className="feed_block_row row "  >
                        <div className='circle' style={{ position: "absolute", top: "23%", left: "272px" }}>
                            <Star style={{ fill: "#FFFDFD", fontSize: "38px", position: "relative", right: "7px", top: "4px" }} />
                        </div>
                        <div className='page1_circle2' style={{ position: "absolute", top: "73%", left: "272px" }}>
                            <CheckIcon style={{ fill: "#FFFDFD", fontWeight: "bold", fontSize: "38px", position: "relative", right: "7px", top: "4px" }} />
                        </div>

                        <div className="col-lg-6 feed_block feed_block1 text-black">
                            <img className="logo_icon" src={logo_icon} alt="company_logo" />
                            <div>
                                <p >THE QUICK, BROWN FOX JUMPS OVER A LAZY DOG. DJS<br />
                                    FLOCK BY WHEN MTV AX QUIZ PROG. JUNK MTV QUIZ <br />
                                    GRACED BY FOX WHELPS. BAWDS JOG, FLICK QUARTZ, VEX<br />
                                    NYMPHS. WALTZ, BAD NYMPH, FOR QUICK JIGS VEX! FOX<br />
                                    NYMPHS GRAB QUICK-JIVED WALTZ BRICK QUIZ WHANGS<br />
                                    JUMPY VELDT FOX. BRIGHT VIXENS JUMP; DOZY FOWL</p>
                            </div>
                        </div>

                        <div className="col-lg-6 feed_block feed_block2">
                            {/* <div className='row ' >
                                <div className='col-lg-6 text-white' >
                                    Feedback Done Right
                                </div>
                                <div className='col-lg-6 text-white'>
                                    www.amplioso.com
                                </div>
                            </div> */}

                            <div className='text-white' style={{ fontSize: "40px", fontWeight: "bold", position: "relative", left: "16px", top: "225px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }}>
                                {/* <p>Feedback Report</p> */}
                                <span>Feedback</span><br>
                                </br><span>Report</span>
                            </div>
                        </div>

                        <div className="col-lg-6 feed_block feed_block3 text-black">
                            <div style={{ fontSize: "10px", color: "white", float: "left", padding: "20px 20px" }}>
                                {/* Company Details */}
                            </div>
                            <div style={{ fontSize: "40px", color: "white", fontWeight: "bold", position: "relative", left: "16px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }}>
                                <span>Conversant</span><br>
                                </br><span>Technologies</span>
                            </div>

                            <div style={{ position: "relative", color: "white", left: "26px", top: "100px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }} >
                                <span style={{ fontSize: "58px", fontWeight: "bold" }}>{new Date().getFullYear()}</span><br>
                                </br><span style={{ fontSize: "10px" }}>www.amplioso.com</span>

                            </div>
                        </div>

                        {feedbackData ? (
                            <>
                                <div className="col-lg-6 feed_block feed_block4 text-black">
                                    <div style={{ fontSize: "10px", position: "relative", left: "-85px", padding: "20px 20px" }}>
                                        {/* Employee Details */}
                                    </div>
                                    {/* <span >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`}</span> */}
                                    {/* {console.log(feedbackData)} */}
                                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "8px" }}>
                                        <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px", textTransform: "capitalize" }}>{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`}</span><br />
                                        <span style={{ fontSize: "10px", position: "relative", right: "9px", padding: "20px 20px" }}>{`${feedbackData[0].user_email}`}</span>
                                    </div>

                                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "46px" }}>
                                        <span style={{ fontSize: "10px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Feedback Period</span><br />
                                        <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].period_start.split('T')[0]}</span><br />
                                        <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].period_end.split('T')[0]}</span><br />
                                    </div>

                                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "76px", textTransform: "capitalize" }}>
                                        <span style={{ fontSize: "10px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Created By</span><br />
                                        <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].ManagerId.first_name} {feedbackData[0].ManagerId.last_name}</span><br />
                                        <span style={{ fontSize: "10px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Generated On</span><br />
                                        <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].createdAt.split('T')[0]}</span><br />

                                    </div>

                                </div>
                            </>
                        ) : null}        </div>
                    {/* <Pdf_page1 /> */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row" style={{ padding: "25px 0px 0px 25px" }} >
                                <div >
                                    <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "capitalize" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                    <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                    <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span>
                                    {console.log("val==> " + impVal)}

                                    {impVal ? (
                                        <div style={{ position: "relative", top: "58px", left: "14px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div className="square_bar"></div>
                                            <div className='page_left_header' style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <span>Overall</span><br>
                                                </br><span>Performance</span>
                                            </div>
                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify", fontSize: "7px", position: "relative", bottom: "80px", left: "16px", color: "#9C9C9C" }}>
                                                <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                                                </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                                            </div>
                                            <div className='row p-5' style={{ textAlign: "justify", MozTextAlignLast: "justify", border: "0px solid black", width: "100%", position: "relative", left: "5%", top: "-40px" }}>
                                                {impVal.map((item, key) => {
                                                    return (
                                                        <>
                                                            {[Val.[`data${key}`][0].length > 0] ? (
                                                                <>
                                                                    <div className='col-2'>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                                                <span style={{ fontSize: "20px", }}>{Math.ceil(Val.[`data${key}`][0].survey_mean).toFixed(1)}</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Survey</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Mean</span>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ padding: impValFn(item.answer, 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[0].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className='col-2' style={{ margin: "0px 18px 0px 18px" }}>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                                                <span style={{ fontSize: "20px", }}>{Math.ceil(item.answer).toFixed(1)}</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Self</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Assessment</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Math.ceil(Math.ceil(Val.[`data${key}`][0].survey_mean) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].survey_mean) * 9.2) : 92 */}
                                                                        <div style={{ padding: impValFn((Val.[`data${key}`][0].survey_mean), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[1].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-2' style={{ margin: "0px 18px 0px 3px" }}>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                                                <span style={{ fontSize: "20px", }}>{Math.ceil(Val.[`data${key}`][0].internal_bench).toFixed(1)}</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Internal</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Benchmark</span></div>
                                                                        </div>
                                                                        {/* <div style={{ padding: Math.ceil(Math.ceil(Val.[`data${key}`][0].internal_bench) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].internal_bench) * 9.2) : 92, width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[2].color }} > */}

                                                                        <div style={{ padding: impValFn((Val.[`data${key}`][0].internal_bench), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[2].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-2'>
                                                                        <div style={{ fontSize: "16px" }}>
                                                                            <div style={{ position: "relative", top: "300px", right: "-24%" }}>
                                                                                <span style={{ fontSize: "20px", }}>{Math.ceil(Val.[`data${key}`][0].external_bench).toFixed(1)}</span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>External </span><br />
                                                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Benchmark</span></div>
                                                                        </div>
                                                                        {/* <div style={{ padding: Math.ceil(Math.ceil(Val.[`data${key}`][0].external_bench) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].external_bench) * 9.2) : 92, width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[3].color }} > */}

                                                                        <div style={{ padding: impValFn((Val.[`data${key}`][0].external_bench), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[3].color }} >
                                                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                                                        </div>

                                                                    </div>
                                                                </>

                                                            ) : null}
                                                        </>
                                                    )
                                                })}

                                            </div>
                                        </div>) : null}

                                </div>


                                <div style={{ fontSize: "8px", position: "absolute", bottom: "2%", left: "-14px" }}>
                                    <hr style={{ width: "102%", textAlign: 'left', marginLeft: 0 }} />
                                    <span style={{ position: "relative", left: "45%", bottom: "2px" }}>www.amplioso.com</span>
                                    <span style={{ position: "relative", left: "-20%", bottom: "2px" }}>{new Date().getFullYear()}</span>
                                    <span style={{ position: "relative", left: "-45%", bottom: "2px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                </div>

                            </div >
                        </>
                    ) : null}
                    {/* <Pdf_page2 /> */}
                    {feedbackData ? (
                        <>
                            {impVal ? (
                                <div className=" row page-break feed_block_row" >
                                    <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                                        <div >
                                            {feedbackData ? (
                                                <>
                                                    <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "capitalize" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                                    <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                                    <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span></>) : null}

                                            <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                                                <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                    <div style={{ borderLeft: "6px solid #799FCB", height: "84px" }}></div>
                                                    <div className='page_left_header'>
                                                        <span>Personal Brand </span><br>
                                                        </br><span>Favorability Rating</span>
                                                    </div>



                                                    {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                                                    <div style={{ fontSize: "7px", fontWeight: "lighter", position: "relative", bottom: "80px", left: "16px", color: "#9C9C9C" }}>
                                                        <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                                                        </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                                                    </div>
                                                </div>

                                                <div style={{ position: "relative", bottom: "30px", left: "18%" }}>
                                                    <div style={{ margin: "5px" }}>

                                                        <> <div style={{ width: 312, height: 312, position: "relative", left: "0%" }}>
                                                            {/* <h1>{impVal}</h1> */}

                                                            {impVal.map((item, key) => {
                                                                return (
                                                                    <>
                                                                        <div>
                                                                            <div style={{ fontSize: "8px", position: "relative", top: "60px", color: "white" }}>{item.answer ? (item.answer) : null}</div>
                                                                            <div style={{ fontSize: "8px", position: "relative", top: "80px", color: "white" }}>{Math.ceil(Val.[`data${key}`][0].survey_mean.toFixed(1))}</div>
                                                                            <div style={{ fontSize: "8px", position: "relative", top: "100px", color: "white" }}>{Math.ceil(Val.[`data${key}`][0].internal_bench.toFixed(1))}</div>
                                                                            <div style={{ fontSize: "8px", position: "relative", top: "120px", color: "white" }}>{Math.ceil(Val.[`data${key}`][0].external_bench.toFixed(1))}</div>
                                                                        </div>





                                                                        <CircularProgressbarWithChildren
                                                                            value={impValFn((Val.[`data${key}`][0].survey_mean), 1, 10)}
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
                                                                                pathColor: `rgb(168,26,12, ${impValFn((Val.[`data${key}`][0].survey_mean), 1, 10)})`,

                                                                                // pathColor: `rgb(168,26,12, ${item.answer * 10 / 100})`,
                                                                                textColor: '#f88',
                                                                                // trailColor: '#d6d6d6',
                                                                                backgroundColor: '#3e98c7',
                                                                            })}
                                                                        >
                                                                            {/* <hr style={{width:"20%"}} /> */}

                                                                            <div style={{ width: 246, height: 246, }}>
                                                                                {/* <span>{impValFn(item.answer,1,10)}</span> */}
                                                                                <CircularProgressbarWithChildren
                                                                                    // value={Math.ceil(9) * 10}
                                                                                    value={impValFn(item.answer, 1, 10)}
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
                                                                                        pathColor: `rgb(55,55,94, ${impValFn(item.answer, 1, 10)})`,
                                                                                        textColor: '#f88',
                                                                                        // trailColor: '#d6d6d6',
                                                                                        backgroundColor: '#3e98c7',
                                                                                    })}
                                                                                >

                                                                                    <div style={{ width: 172, height: 172 }}>
                                                                                        <CircularProgressbarWithChildren
                                                                                            value={impValFn((Val.[`data${key}`][0].internal_bench), 1, 10)}
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
                                                                                                pathColor: `rgb(53,98,136, ${impValFn((Val.[`data${key}`][0].internal_bench), 1, 10)})`,
                                                                                                textColor: '#f88',
                                                                                                // trailColor: '#d6d6d6',
                                                                                                backgroundColor: '#3e98c7',
                                                                                            })}
                                                                                        >

                                                                                            <div style={{ width: 123, height: 123 }}>
                                                                                                <CircularProgressbarWithChildren
                                                                                                    value={impValFn((Val.[`data${key}`][0].external_bench), 1, 10)}
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
                                                                                                        pathColor: `rgb(170,207,221, ${impValFn((Val.[`data${key}`][0].external_bench), 1, 10)})`,
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

                                                                    </>
                                                                )
                                                            })}
                                                        </div>

                                                        </>
                                                    </div>


                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {impVal.map((item, key) => {
                                        return (
                                            <>
                                                <div className='row block_sqr p-5'>
                                                    <div className='col-lg-3' style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                        <div className='row'>
                                                            <div className='single_sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                                            </div>
                                                            <div style={{
                                                                // color:"black",
                                                                fontSize: "9px",
                                                                position: "relative",
                                                                // bottom:"90px",
                                                                left: "-14px",
                                                            }}>
                                                                <span style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center", marginLeft: "5px" }}>{Math.ceil(Val.[`data${key}`][0].survey_mean).toFixed(1)}</span><br>
                                                                </br><span>Survey</span><br>
                                                                </br><span>Mean</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-lg-3' style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                        <div className='row'>
                                                            <div className='single_sqr_list2' style={{ backgroundColor: colorOptions.slices[1].color }}>
                                                            </div>

                                                            <div style={{
                                                                // color:"black",
                                                                fontSize: "9px",
                                                                position: "relative",
                                                                // bottom:"90px",
                                                                left: "-14px",
                                                            }}>
                                                                <span style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center", marginLeft: "5px" }}>{parseFloat(item.answer).toFixed(1)}</span><br>
                                                                </br><span>Self</span><br>
                                                                </br><span>Assessment</span>
                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className='col-lg-3' style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                        <div className='row'>
                                                            <div className='single_sqr_list2' style={{ backgroundColor: colorOptions.slices[2].color }}>
                                                            </div>
                                                            <div style={{
                                                                // color:"black",
                                                                fontSize: "9px",
                                                                position: "relative",
                                                                // bottom:"90px",
                                                                left: "-14px",
                                                            }}>
                                                                <span style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center", marginLeft: "5px" }}>{Math.ceil(Val.[`data${key}`][0].internal_bench).toFixed(1)}</span><br>
                                                                </br><span>Internal</span><br>
                                                                </br><span>Benchmark</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-3' style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                        <div className='row'>
                                                            <div className='single_sqr_list2' style={{ backgroundColor: colorOptions.slices[3].color }}>
                                                            </div>
                                                            <div style={{
                                                                // color:"black",
                                                                fontSize: "9px",
                                                                position: "relative",
                                                                // bottom:"90px",
                                                                left: "-14px",
                                                            }}>
                                                                <span style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center", marginLeft: "5px" }}>{Math.ceil(Val.[`data${key}`][0].external_bench).toFixed(1)}</span><br>
                                                                </br><span>External</span><br>
                                                                </br><span>Benchmark</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}

                                    < hr style={{ border: "1px solid black", width: "500rem", textAlign: 'left', marginLeft: 0, position: "absolute", bottom: "10px" }} />
                                    <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
                                        <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                                        <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>{new Date().getFullYear()}</span>
                                        <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                    </div>
                                </div >
                            ) : null}
                        </>
                    ) : null}
                    {/* page ----3 */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row"  >
                                <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                                    <div >
                                        {feedbackData ? (
                                            <>
                                                <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "capitalize" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                                <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                                <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span></>) : null}
                                        <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar"></div>
                                                <div className='page_left_header'>
                                                    <span>Universal </span><br>
                                                    </br><span>Competency Ratings</span>
                                                </div>



                                                {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                                                <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px", color: "#9C9C9C" }}>
                                                    <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                                                    </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                                                </div>
                                            </div>

                                            <div style={{ position: "relative", bottom: "5px" }}>
                                                <div style={{ position: "relative", top: "100px", right: "290px", fontWeight: "lighter" }}>
                                                    <div style={{ position: "relative", bottom: "34px", fontSize: "8px" }}>10.0</div>
                                                    <div style={{ position: "relative", bottom: "-5px", fontSize: "8px" }}>5.0</div>
                                                    <div style={{ position: "relative", bottom: "-34px", fontSize: "8px" }}>0.1</div>
                                                </div>
                                                {impVal2 ? (
                                                    <>
                                                        <div style={{ margin: "5px", width: "520px", height: "138px", border: "1px solid #707070", borderTop: "#FFFFFF", borderRight: "#FFFFFF" }}>
                                                            {impVal2.map((item, key) => (
                                                                <>
                                                                    {[Val2.[`data${key}`][0].length > 0] ? (<>
                                                                        <div style={{ marginLeft: "10px" }}>
                                                                            <div className='graph_bar'>
                                                                                <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key}`][0].survey_mean)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key}`][0].survey_mean)] * 10 : 100, backgroundColor: key % 1 == 0 ? (colorOptions.slices[0].color) : "rgb(218,37,12)", }}></div>
                                                                            </div>
                                                                            <div className='graph_bar'>
                                                                                <div style={{ width: "100%", height: item.answer * 10, backgroundColor: key % 1 == 0 ? (colorOptions.slices[1].color) : "rgb(235,82,71)", }}></div>
                                                                            </div>
                                                                            <div className='graph_bar'>
                                                                                <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key}`][0].internal_bench)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key}`][0].internal_bench)] * 10 : 100, backgroundColor: key % 1 == 0 ? (colorOptions.slices[2].color) : "rgb(241,158,152)", }}></div>
                                                                            </div>
                                                                            <div className='graph_bar'>
                                                                                <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key}`][0].external_bench)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key}`][0].external_bench)] * 10 : 100, backgroundColor: key % 1 == 0 ? (colorOptions.slices[3].color) : "rgb(249,218,216)", }}></div>

                                                                            </div>
                                                                            <div style={{ width: "16px", height: "10rem", float: "left" }}></div>

                                                                        </div>
                                                                    </>) : null}
                                                                </>
                                                            ))}
                                                            <div class="display-table">
                                                                <div style={{ fontSize: "10px", fontWeight: "lighter" }}>
                                                                    {impVal2.map((item, key) => (
                                                                        <div className='options2_1 '>{item.option}</div>

                                                                    ))}


                                                                </div>

                                                            </div>

                                                        </div>


                                                    </>
                                                ) : null}


                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className='row p-5' style={{ marginLeft: "6%", position: "relative", bottom: "-20px" }}>
                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Survey Mean</div>
                                        </div>

                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[1].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Self Assessment</div>
                                        </div>

                                    </div>


                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[2].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Internal Benchmark</div>
                                        </div>
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[3].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>External Benchmark</div>
                                        </div>
                                    </div>
                                </div>


                                <div style={{ fontSize: "8px", position: "absolute", bottom: "2%", left: "-14px" }}>
                                    <hr style={{ width: "102%", textAlign: 'left', marginLeft: 0 }} />
                                    <span style={{ position: "relative", left: "45%", bottom: "2px" }}>www.amplioso.com</span>
                                    <span style={{ position: "relative", left: "-20%", bottom: "2px" }}>{new Date().getFullYear()}</span>
                                    <span style={{ position: "relative", left: "-45%", bottom: "2px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                </div>
                            </div>
                        </>
                    ) : null}


                    {/* page -----4 */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row"  >
                                <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                                    <div >
                                        {feedbackData ? (
                                            <>
                                                <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "capitalize" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                                <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                                <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span></>) : null}


                                        <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar"></div>
                                                <div className='page_left_header'>
                                                    <span>Universal</span><br>
                                                    </br><span>Competency Ratings</span>
                                                </div>



                                                {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                                                <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px", color: "#9C9C9C" }}>
                                                    <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                                                    </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                                                </div>
                                            </div>

                                            <div style={{ position: "relative", bottom: "100px" }}>
                                                <div style={{ position: "relative", top: "100px", right: "290px", fontWeight: "lighter" }}>
                                                    <div style={{ position: "relative", bottom: "60px", fontSize: "8px" }}>10.0</div>
                                                    <div style={{ position: "relative", bottom: "12px", fontSize: "8px" }}>5.0</div>
                                                    <div style={{ position: "relative", top: "50px", fontSize: "8px" }}>1.0</div>
                                                </div>

                                                {impVal2Devided1 && Val2 ? (
                                                    <div style={{ margin: "5px", width: "520px", height: "138px", border: "1px solid #707070", borderTop: "#FFFFFF", borderRight: "#FFFFFF" }}>

                                                        {impVal2Devided1.map((item, key) => (
                                                            <>
                                                                {[Val2.[`data${key}`][0].length > 0] ? (
                                                                    <>
                                                                        <div style={{ width: "36px", height: "12rem", float: "left" }}></div>
                                                                        <div className='graph_bar_2'>
                                                                            <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key}`][0].survey_mean)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key}`][0].survey_mean)] * 10 : 100, backgroundColor: key % 1 == 0 ? colorOptions.slices[0].color : "rgb(55,55,94)", }}></div>
                                                                        </div>
                                                                        <div className='graph_bar_2'>
                                                                            <div style={{ width: "100%", height: item.answer * 10, backgroundColor: key % 1 == 0 ? colorOptions.slices[1].color : "rgb(86,86,151)", }}></div>
                                                                        </div>
                                                                        <div className='graph_bar_2'>
                                                                            <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key}`][0].internal_bench)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key}`][0].internal_bench)] * 10 : 100, backgroundColor: key % 1 == 0 ? colorOptions.slices[2].color : "rgb(140,140,210)", }}></div>
                                                                        </div>
                                                                        <div className='graph_bar_2'>
                                                                            <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key}`][0].external_bench)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key}`][0].external_bench)] * 10 : 100, backgroundColor: key % 1 == 0 ? colorOptions.slices[3].color : "rgb(155,155,246)", }}></div>
                                                                        </div>
                                                                    </>
                                                                ) : null}
                                                            </>))}




                                                        <div className='row graph_labels2' >
                                                            {impVal2Devided1.map((item, key) => (
                                                                <div className='col-lg-2 text-center' style={{ width: "76px", marginLeft: "8px", fontWeight: "lighter" }} >
                                                                    {item.option}
                                                                    {/* {console.log(item.option)} */}
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>
                                                ) : null}
                                            </div>



                                        </div>



                                        <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar" style={{ visibility: "hidden" }}></div>
                                                <div className='page_left_header'>
                                                    {/* <span>Universal</span><br>
                                            </br><span>Competency Ratings</span> */}
                                                </div>



                                                <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px", color: "#9C9C9C" }}>
                                                    {/* <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                                            </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span> */}
                                                </div>
                                            </div>

                                            <div style={{ position: "relative", bottom: "100px" }}>
                                                <div style={{ position: "relative", top: "100px", right: "290px", fontWeight: "lighter" }}>
                                                    <div style={{ position: "relative", bottom: "60px", fontSize: "8px" }}>10.0</div>
                                                    <div style={{ position: "relative", bottom: "12px", fontSize: "8px" }}>5.0</div>
                                                    <div style={{ position: "relative", top: "50px", fontSize: "8px" }}>1.0</div>
                                                </div>

                                                {impVal2Devided2 && Val2 ? (
                                                    <div style={{ margin: "5px", width: "520px", height: "138px", border: "1px solid #707070", borderTop: "#FFFFFF", borderRight: "#FFFFFF" }}>
                                                        {impVal2Devided2.map((item, key) => (
                                                            <>
                                                                {[Val2.[`data${key}`][0].length > 0] ? (
                                                                    <>
                                                                        <div style={{ width: "36px", height: "12rem", float: "left" }}></div>
                                                                        <div className='graph_bar_2'>

                                                                            <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key + 1}`][0].survey_mean)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key + 1}`][0].survey_mean)] * 10 : 100, backgroundColor: key % 1 == 0 ? colorOptions.slices[0].color : "rgb(55,55,94)", }}></div>
                                                                        </div>
                                                                        <div className='graph_bar_2'>
                                                                            <div style={{ width: "100%", height: item.answer * 10, backgroundColor: key % 1 == 0 ? colorOptions.slices[1].color : "rgb(86,86,151)", }}></div>
                                                                        </div>
                                                                        <div className='graph_bar_2'>
                                                                            <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key + 1}`][0].survey_mean)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key + 1}`][0].survey_mean)] * 10 : 100, backgroundColor: key % 1 == 0 ? colorOptions.slices[2].color : "rgb(140,140,210)", }}></div>
                                                                        </div>
                                                                        <div className='graph_bar_2'>
                                                                            <div style={{ width: "100%", height: [Math.ceil(Val2.[`data${key + 1}`][0].survey_mean)] * 10 <= 100 ? [Math.ceil(Val2.[`data${key + 1}`][0].survey_mean)] * 10 : 100, backgroundColor: key % 1 == 0 ? colorOptions.slices[3].color : "rgb(155,155,246)", }}></div>
                                                                        </div>
                                                                    </>
                                                                ) : null}
                                                            </>))}


                                                        <div className='row graph_labels2' >
                                                            {impVal2Devided2.map((item, key) => (
                                                                <div className='col-lg-2 text-center' style={{ width: "76px", marginLeft: "8px", fontWeight: "lighter" }} >
                                                                    {item.option}
                                                                    {/* {console.log(item.option)} */}
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>
                                                ) : null}
                                            </div>



                                        </div>

                                    </div>

                                </div>




                                <div className='row p-5' style={{ marginLeft: "6%", position: "relative", bottom: "90px" }}>
                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Survey Mean</div>
                                        </div>

                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[1].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Self Assessment</div>
                                        </div>

                                    </div>


                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[2].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Internal Benchmark</div>
                                        </div>
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[3].color }}>
                                            </div>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                            </div> */}
                                            <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>External Benchmark</div>
                                        </div>
                                    </div>
                                </div>


                                <div style={{ fontSize: "8px", position: "absolute", bottom: "2%", left: "-14px" }}>
                                    <hr style={{ width: "102%", textAlign: 'left', marginLeft: 0 }} />
                                    <span style={{ position: "relative", left: "45%", bottom: "2px" }}>www.amplioso.com</span>
                                    <span style={{ position: "relative", left: "-20%", bottom: "2px" }}>{new Date().getFullYear()}</span>
                                    <span style={{ position: "relative", left: "-45%", bottom: "2px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                </div>
                            </div>
                        </>
                    ) : null}



                    {/* page ------ 5 */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row"  >
                                <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                                    <div >
                                        {feedbackData ? (
                                            <>
                                                <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "capitalize" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                                <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                                <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span>

                                            </>
                                        ) : null}
                                        <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar"></div>
                                                <div className='page_left_header' >
                                                    <span className='text-future-potential'>Future Potential</span>
                                                    {/* </br><span>Potential</span> */}
                                                </div>

                                                <div style={{ fontSize: "7px", position: "relative", bottom: "50px" }}>
                                                    {impVal3 && Val3 ? (
                                                        <div className='row ' >
                                                            {impVal3.map((item, key) => (
                                                                <div className='col-lg-6 ' style={{ borderLeft: key % 2 != 0 ? "1px solid rgb(209,209,209)" : "", borderBlockEnd: key != 4 ? "1px solid rgb(209,209,209)" : "" }} >

                                                                    {[Val3.[`data${key}`][0].length > 0] ? (
                                                                        <>

                                                                            <div style={{ position: "relative", bottom: "60px", left: "20px", paddingTop: "40px" }}>

                                                                                <div className='grp' style={{ position: "relative", left: "5px", textAlign: "end", fontSize: "12px", fontWeight: "bold", color: "black", top: "30px", width: "184px", height: "10px" }}>
                                                                                    {item.option}
                                                                                </div>
                                                                                <div className='grp' style={{ position: "relative", width: "100px", height: "34px", fontSize: "10px", }}>
                                                                                    <GraphVerticalBars percentage={[Math.ceil(Val3.[`data${key}`][0].survey_mean)]} color={colorOptions.slices[0].color} />

                                                                                </div>
                                                                                <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                                    <GraphVerticalBars percentage={item.answer} color={colorOptions.slices[1].color} />

                                                                                </div>
                                                                                <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                                    <GraphVerticalBars percentage={[Math.ceil(Val3.[`data${key}`][0].internal_bench)]} color={colorOptions.slices[2].color} />

                                                                                </div>
                                                                                <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                                    <GraphVerticalBars percentage={[Math.ceil(Val3.[`data${key}`][0].external_bench)]} color={colorOptions.slices[3].color} />

                                                                                </div>

                                                                            </div>
                                                                        </>
                                                                    ) : null}
                                                                </div>

                                                            ))}



                                                            <div className='col-lg-6 ' style={{ borderLeft: "1px solid rgb(209,209,209)", fontWeight: "lighter" }} >
                                                                <div style={{ position: "relative", bottom: "5px", left: "50px", paddingTop: "40px" }}>
                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            Survey Mean
                                                                        </div>
                                                                    </div>

                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[1].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            Self Assessment
                                                                        </div>
                                                                    </div>
                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[2].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            Internal Benchmark
                                                                        </div>
                                                                    </div>
                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[3].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            External Benchmark
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>





                                                        </div>
                                                    ) : null}


                                                </div>



                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <hr style={{ border: "1px thin rgb(209,209,209)", marginLeft: 0, position: "absolute", bottom: "20px" }} />
                                <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
                                    <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                                    <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>{new Date().getFullYear()}</span>
                                    <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                </div>


                            </div>
                        </>
                    ) : null}


                    {/* page ------ 5 */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row"  >
                                <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                                    <div >
                                        {feedbackData ? (
                                            <>
                                                <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "capitalize" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                                <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                                <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span>

                                            </>
                                        ) : null}
                                        <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar"></div>
                                                <div className='page_left_header' >
                                                    <span className='text-future-potential'>Think-Act-Feel Leadership Rating</span>
                                                    {/* </br><span>Potential</span> */}
                                                </div>

                                                <div style={{ fontSize: "7px", position: "relative", bottom: "50px" }}>
                                                    {impVal4 && Val4 ? (
                                                        <div className='row ' >
                                                            {impVal3.map((item, key) => (
                                                                <div className='col-lg-6 ' style={{ borderLeft: key % 2 != 0 ? "1px solid rgb(209,209,209)" : "", borderBlockEnd: key != 4 ? "1px solid rgb(209,209,209)" : "" }} >

                                                                    {[Val4.[`data${key}`][0].length > 0] ? (
                                                                        <>

                                                                            <div style={{ position: "relative", bottom: "60px", left: "20px", paddingTop: "40px" }}>

                                                                                <div className='grp' style={{ position: "relative", left: "5px", textAlign: "end", fontSize: "12px", fontWeight: "bold", color: "black", top: "30px", width: "184px", height: "10px" }}>
                                                                                    {item.option}
                                                                                </div>
                                                                                <div className='grp' style={{ position: "relative", width: "100px", height: "34px", fontSize: "10px", }}>
                                                                                    <GraphVerticalBars percentage={[Math.ceil(Val4.[`data${key}`][0].survey_mean)]} color={colorOptions.slices[0].color} />

                                                                                </div>
                                                                                <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                                    <GraphVerticalBars percentage={item.answer} color={colorOptions.slices[1].color} />

                                                                                </div>
                                                                                <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                                    <GraphVerticalBars percentage={[Math.ceil(Val4.[`data${key}`][0].internal_bench)]} color={colorOptions.slices[2].color} />

                                                                                </div>
                                                                                <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                                    <GraphVerticalBars percentage={[Math.ceil(Val4.[`data${key}`][0].external_bench)]} color={colorOptions.slices[3].color} />

                                                                                </div>

                                                                            </div>
                                                                        </>
                                                                    ) : null}
                                                                </div>

                                                            ))}



                                                            <div className='col-lg-6 ' style={{ borderLeft: "1px solid rgb(209,209,209)", fontWeight: "lighter" }} >
                                                                <div style={{ position: "relative", bottom: "5px", left: "50px", paddingTop: "40px" }}>
                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[0].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            Survey Mean
                                                                        </div>
                                                                    </div>

                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[1].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            Self Assessment
                                                                        </div>
                                                                    </div>
                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[2].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            Internal Benchmark
                                                                        </div>
                                                                    </div>
                                                                    <div className='row m-2' >
                                                                        <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: colorOptions.slices[3].color }}>
                                                                        </div>
                                                                        <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px", marginTop: "inherit" }}>
                                                                            External Benchmark
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>





                                                        </div>
                                                    ) : null}


                                                </div>



                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <hr style={{ border: "1px thin rgb(209,209,209)", marginLeft: 0, position: "absolute", bottom: "20px" }} />
                                <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
                                    <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                                    <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>{new Date().getFullYear()}</span>
                                    <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                </div>


                            </div>
                        </>
                    ) : null}


                    {/* page ------ 6 */}

                    {/* page ------ 7 */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row"  >
                                <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                                    <div >
                                        {feedbackData ? (
                                            <>
                                                <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "uppercase" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                                <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                                <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span>
                                            </>
                                        ) : null}

                                        <div style={{ position: "relative", top: "48px", left: "-5px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div style={{ position: "relative", left: "22px" }}>
                                                    <div className="square_bar"></div>
                                                    <div className='page_left_header' style={{}}>
                                                        <span className='Think-Act-Feel-Leadership-Rating'>Think-Act-Feel Leadership Rating</span>

                                                        {/* <span>Think-Act-Feel</span><br>
                                                        </br><span>Leadership Rating</span> */}
                                                    </div>
                                                </div>


                                                <div style={{ fontSize: "7px", position: "relative", bottom: "60px" }}>
                                                    <div className='row' >
                                                        <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)" }}>
                                                            <div style={{ position: "relative", bottom: "20px", right: "240px" }}>
                                                                <div className='grp' style={{ position: "relative", left: "290px", fontSize: "20px", fontWeight: "bold", color: "black", top: "30px", width: "100px", height: "40px" }}>
                                                                    Think
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                                                            <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                                                                <div className='grp' style={{ position: "relative", left: "290px", fontSize: "20px", fontWeight: "bold", color: "black", top: "30px", width: "100px", height: "40px" }}>
                                                                    Act
                                                                </div>


                                                            </div>

                                                        </div>
                                                        <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                                                            <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                                                                <div className='grp' style={{ position: "relative", left: "290px", fontSize: "20px", fontWeight: "bold", color: "black", top: "30px", width: "100px", height: "40px" }}>
                                                                    Feel
                                                                </div>


                                                            </div>

                                                        </div>

                                                    </div>



                                                    {impVal4 && Val4 ? (
                                                        <div className='row' style={{ boder: "1px solid black" }}>
                                                            {impVal4.map((item, key) => (
                                                                <>
                                                                    {[Val4.[`data${key}`][0].length > 0] ? (
                                                                        <div className='col-4' style={{
                                                                            // boder: "1px solid black",
                                                                            height: "190px",
                                                                            // borderBlockEnd: key <= 5 ? "1px solid rgb(209,209,209)" : "",
                                                                            // borderRight: parseInt((key + 1) % 3) != 0 ? "1px solid rgb(209,209,209)" : "",

                                                                        }}>
                                                                            <div className='row'>
                                                                                <div className='row' style={{ height: "190px", width: "500px", marginLeft: "auto" }}>

                                                                                    {[Val4.[`data${key}`][0].length > 0] ? (
                                                                                        <>
                                                                                            {console.log((parseInt(key + 1) % 3) != 0)}
                                                                                            <div className='col-1'>
                                                                                                <div style={{ fontSize: "16px" }}>
                                                                                                    <div style={{ position: "relative", paddingLeft: "4px" }}>
                                                                                                        {/* <span style={{ fontSize: "20px", }}>{parseFloat(item.answer).toFixed(1)}</span><br /> */}

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div style={{
                                                                                                    padding: parseFloat(item.answer * 5),
                                                                                                    width: 20,
                                                                                                    height: 20,
                                                                                                    transform: `translate(-5%,50%)`,
                                                                                                    borderRadius: "100%",
                                                                                                    opacity: 0.8,
                                                                                                    position: "relative",
                                                                                                    backgroundColor: colorOptions.slices[0].color

                                                                                                }} >
                                                                                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "66px" }}>
                                                                                                    </div>
                                                                                                    <span style={{ fontSize: "8px", position: "relative", top: "-10px", left: "3px" }}>{parseFloat(item.answer).toFixed(1)}</span><br />

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='col-1' >
                                                                                                <div style={{ fontSize: "16px" }}>
                                                                                                    <div style={{ position: "relative", paddingLeft: "4px" }}>
                                                                                                        {/* <span style={{ fontSize: "8px",position:"relative",top:"-10px",left:"3px" }}>{(Val4.[`data${key}`][0].survey_mean).toFixed(1)}</span><br /> */}
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div style={{
                                                                                                    padding: Math.ceil(Math.ceil(Val4.[`data${key}`][0].survey_mean) * 5) <= 50 ? Math.ceil(Math.ceil(Val4.[`data${key}`][0].survey_mean) * 5) : 50,
                                                                                                    width: 20,
                                                                                                    height: 20,
                                                                                                    transform: `translate(-5%,50%)`,
                                                                                                    borderRadius: "100%",
                                                                                                    opacity: 0.8,
                                                                                                    position: "relative",
                                                                                                    backgroundColor: colorOptions.slices[1].color
                                                                                                }} >
                                                                                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "66px" }}></div>
                                                                                                    <span style={{ fontSize: "8px", position: "relative", top: "-10px", left: "3px" }}>{(Val4.[`data${key}`][0].survey_mean).toFixed(1)}</span><br />

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='col-1' >
                                                                                                <div style={{ fontSize: "16px" }}>
                                                                                                    <div style={{ position: "relative", paddingLeft: "4px" }}>
                                                                                                        {/* <span style={{ fontSize: "8px",position:"relative",top:"-10px",left:"3px" }}>{(Val4.[`data${key}`][0].internal_bench).toFixed(1)}</span><br /> */}
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div style={{
                                                                                                    padding: Math.ceil(Math.ceil(Val4.[`data${key}`][0].internal_bench) * 5) <= 50 ? Math.ceil(Math.ceil(Val4.[`data${key}`][0].internal_bench) * 5) : 50,
                                                                                                    width: 20,
                                                                                                    height: 20,
                                                                                                    transform: `translate(-5%,50%)`,
                                                                                                    borderRadius: "100%",
                                                                                                    opacity: 0.8,
                                                                                                    position: "relative",
                                                                                                    backgroundColor: colorOptions.slices[2].color
                                                                                                }} >
                                                                                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "66px" }}></div>
                                                                                                    <span style={{ fontSize: "8px", position: "relative", top: "-10px", left: "3px" }}>{(Val4.[`data${key}`][0].internal_bench).toFixed(1)}</span><br />

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='col-1' >
                                                                                                <div style={{ fontSize: "16px" }}>
                                                                                                    <div style={{ position: "relative", paddingLeft: "4px" }}>
                                                                                                        {/* <span style={{ fontSize: "8px",position:"relative",top:"-10px",left:"3px" }}>{(Val4.[`data${key}`][0].internal_bench).toFixed(1)}</span><br /> */}
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div style={{
                                                                                                    padding: Math.ceil(Math.ceil(Val4.[`data${key}`][0].internal_bench) * 5) <= 50 ? Math.ceil(Math.ceil(Val4.[`data${key}`][0].internal_bench) * 5) : 50,
                                                                                                    width: 20,
                                                                                                    height: 20,
                                                                                                    transform: `translate(-5%,50%)`,
                                                                                                    borderRadius: "100%",
                                                                                                    opacity: 0.8,
                                                                                                    position: "relative",
                                                                                                    backgroundColor: colorOptions.slices[3].color
                                                                                                }} >
                                                                                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "66px" }}></div>
                                                                                                    <span style={{ fontSize: "8px", position: "relative", top: "-10px", left: "3px" }}>{(Val4.[`data${key}`][0].internal_bench).toFixed(1)}</span><br />

                                                                                                </div>
                                                                                            </div>
                                                                                        </>

                                                                                    ) : null}
                                                                                </div>

                                                                            </div>




                                                                        </div>
                                                                    ) : null}

                                                                </>
                                                            ))}



                                                        </div>) : null}





                                                </div>



                                            </div>
                                        </div>

                                    </div>




                                </div>

                                <div className='row' style={{ position: "relative", bottom: "10px", fontSize: "8px", left: "20px" }}>
                                    <hr style={{ width: "102%", textAlign: 'left', marginLeft: 0 }} />


                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            <div className='sqr_list2' style={{ backgroundColor: "rgb(168,26,12)" }}>
                                                <div style={{ position: "relative", right: "-18px", width: "max-content", top: "2px" }}>Survey Mean</div>
                                            </div>
                                            {/* <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Survey Mean</div> */}
                                        </div>

                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: "rgb(235,82,71)" }}>
                                    </div> */}
                                            <div className='sqr_list2' style={{ backgroundColor: "rgb(55,55,94)" }}>
                                                <div style={{ position: "relative", right: "-18px", width: "max-content", top: "2px" }}>Self Assessment</div>

                                            </div>
                                            {/* <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Self Assessment</div> */}
                                        </div>

                                    </div>


                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: "rgb(241,158,152)" }}>
                                    </div> */}
                                            <div className='sqr_list2' style={{ backgroundColor: "rgb(53,98,136)" }}>
                                                <div style={{ position: "relative", right: "-18px", width: "max-content", top: "2px" }}>Internal Benchmark</div>

                                            </div>
                                            {/* <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>Internal Benchmark</div> */}
                                        </div>
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='row'>
                                            {/* <div className='sqr_list2' style={{ backgroundColor: "rgb(249,218,216)" }}>
                                    </div> */}
                                            <div className='sqr_list2' style={{ backgroundColor: "rgb(170,207,221)" }}>
                                                <div style={{ position: "relative", right: "-18px", width: "max-content", top: "2px" }}>External Benchmark</div>

                                            </div>
                                            {/* <div style={{ fontSize: "10px", position: "relative", right: "40px", top: "10px" }}>External Benchmark</div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}


                    {/* page --------8 */}
                    {feedbackData ? (
                        <>
                            <div className=" row page-break feed_block_row" >
                                <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                                    {feedbackData ? (<div >
                                        <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "uppercase" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                        <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                        <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span>
                                        <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar"></div>
                                                <div className='page_left_header'>
                                                    <span>Opportunities</span><br>
                                                    </br><span>Overview</span>
                                                </div>
                                                {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                                                {impVal5 ? (
                                                    <div style={{ fontSize: "7px", position: "relative", bottom: "50px", left: "16px", color: "black", fontWeight: "lighter", maxWidth: "60%" }}>
                                                        <div className='row'>
                                                            {impVal5.map((item, key) => (
                                                                <div className='col-lg-4 m-2' style={{ border: "1px solid #F1F1F1", lineHeight: "22px", width: "100px", textAlign: "center" }}>{item.option}</div>
                                                            ))}
                                                        </div>

                                                    </div>) : null}


                                            </div>

                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar"></div>
                                                <div className='page_left_header'>
                                                    <span>Personal</span><br>
                                                    </br><span>Brand Overview</span>
                                                </div>
                                                {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                                                {/* {console.log(impVal7)} */}
                                                {impVal7 ? (
                                                    <div style={{ fontSize: "7px", position: "relative", bottom: "50px", left: "16px", color: "black", fontWeight: "lighter" }}>
                                                        <div className='row'>
                                                            {impVal7.map((item, key) => (
                                                                <>
                                                                    <div className="square col-lg-2" style={{ height: "2px", width: "2px", padding: "2px", backgroundColor: "black", margin: "5px" }}></div>
                                                                    <div className="square col-lg-2" style={{ text: "center", marginTop: "2px", padding: "2px", fontWeight: "lighter" }}>{item.option}</div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>


                                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                                <div className="square_bar"></div>
                                                <div className='page_left_header'>
                                                    <span>Additional</span><br>
                                                    </br><span>Comments</span>
                                                </div>
                                                {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                                                <div style={{ fontSize: "7px", position: "relative", bottom: "50px", left: "16px", color: "black", fontWeight: "lighter", color: "black" }}>
                                                    {impVal8 ? (<div>{impVal8}</div>) : null}
                                                </div>

                                            </div>
                                        </div>

                                    </div>) : null}

                                </div>


                                <hr style={{ border: "1px  black", width: "500rem", textAlign: 'left', marginLeft: 0, position: "absolute", bottom: "30px" }} />
                                <div style={{ fontSize: "8px", position: "absolute", bottom: "8px" }}>
                                    <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                                    <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>{new Date().getFullYear()}</span>
                                    <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>{feedbackData[0].CompanyId.company_name}</span>
                                </div>
                            </div>
                        </>
                    ) : null}




                </PDFExport>
            ) : (null)}





















        </>
    )
}

