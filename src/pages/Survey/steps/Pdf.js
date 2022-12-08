import React, { useState, useEffect, useRef } from 'react'
import ReactTooltip from 'react-tooltip';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Chart } from "react-google-charts";
import { useHistory } from "react-router-dom";
import '../../../assets/css/pdf_design.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import { Box, Card, Container } from '@material-ui/core';
// import logo from "../assets/images/logo-wt.png";
import logo_icon from "../../../assets/images/deflogo.png";
import star_img from "../../../assets/images/star_img.jpg";
import Star from '@material-ui/icons/StarRate';
import CheckIcon from '@material-ui/icons/Check';
import DonutChart from '../../../components/DonutChart';
import GraphVerticalBars from '../../../components/GraphVerticalBars';

export default function Pdf(props) {
  const BaseURL = process.env.REACT_APP_Base_URL_Backend;
  const [impVal2Devided1, set_impVal2Devided1] = useState()
  const [impVal2Devided2, set_impVal2Devided2] = useState()

  const [survey_count, set_survey_count] = useState()
  const [managers_length, set_managers_length] = useState()
  const [company_length, set_company_length] = useState()
  const [pdfShowDes, setpdfShowDes] = useState(0);
  const history = useHistory();
  const [beliverName, setbeliverName] = useState("");
  const [inputListFinal, setInputListFinal] = useState([{ competition: "" }]);
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

  const [ans, setans] = useState([])

  const [questionId, setquestionId] = useState("")
  const [OptionData, setOptionData] = useState([])
  const [OptionDataCol1, setOptionDataCol1] = useState([])
  const [OptionDataCol2, setOptionDataCol2] = useState([])
  const [OptionDataCol3, setOptionDataCol3] = useState([])
  const [OptionDataCol5, setOptionDataCol5] = useState([])
  const [OptionDataCol5_2, setOptionDataCol5_2] = useState([])
  const [OptionDataCol5_3, setOptionDataCol5_3] = useState([])
  const [data, setData] = useState({
    // inputVal: 0,
    last_name: "",
    email: "",
    password: "",
    que1: "",
  });

  const exportPDFWithMethod = () => {
    setpdfShowDes(1);
    setTimeout(() => {
      // alert(pdfShowDes);
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();

        setTimeout(() => {
          setpdfShowDes(0);
        }, 100)
      }
    }, 100)

  };
  const pdfExportComponent = React.useRef(null);

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

  // const data_g_1 = [
  //   ["Task", "Hours per Day"],
  //   ["Self Assessment", 40,
  //     ["Survey Mean", 40],
  //     ["Internal Benchmark", 6],
  //     ["External Benchmark", 7],
  //   ]
  // ];





  const options = {
    // title: "My Daily Activities",
    legend: "none",
    // legend: "none",
    // pieSliceText: "label",
    title: "Swiss Language Use (100 degree rotation)",
    // pieStartAngle: 100,
    slices: {
      0: { color: "rgb(214,225,185)" },
      1: { color: "rgb(121,159,203)" },
      2: { color: "rgb(55,55,94)" },
      3: { color: "rgb(236,101,94)" },

    },
  };

  const options_2 = {
    // title: "My Daily Activities",
    legend: "none",
    // legend: "none",
    // pieSliceText: "label",
    title: "Shubham knows it",
    // pieStartAngle: 100,
    slices: {
      0: { color: "rgb(214,225,185)" },
      1: { color: "rgb(121,159,203)" },
      2: { color: "rgb(55,55,94)" },
      3: { color: "rgb(236,101,94)" },

    },
  };



  const GetAllRecords = () => {
    // var question_id = q_id;
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://208.109.14.182:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {

          console.log(result.data)
          // let aa = JSON.parse(result.data[0])
          console.log(result.data[0])
          setfeedbackData(result.data)

          var myHeaders2 = new Headers();
          var requestOptions2 = {
            method: 'GET',
            headers: myHeaders2,
            redirect: 'follow'
          };

          fetch(`http://208.109.14.182:9000/masters/collect_feedback/email/${result.data[0].user_email}`, requestOptions2)
            .then(response => response.json())
            .then(result1 => {
              // setlistRecord(result1.data);
              if (result1.status == 200) {
                console.log(result1)
                console.log(result.data[0])
                console.log(result1.data.length, "hh")
                set_survey_count(result1.data.length)



                fetch(`http://208.109.14.182:9000/masters/question/q_type/3`, requestOptions)
                  .then(response => response.json())
                  .then(result2 => {
                    // setlistRecord(result2.data);
                    if (result2.status == 200) {
                      console.log(result2.data, "allQuestionsByType")

                      console.log(result2.data[0], "hh")
                      let qID = result2.data[0].id;
                      setquestionId(qID);
                      console.log(result2.data[0].id)
                      console.log(result2.data[0].id)
                      setquestion(result2.data[0].question);
                      // getOptions(result.data[0].id);



                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[0].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_answers_same`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            console.log(result3.data.id)
                            console.log(result3.data.answer)

                            // setOptData(result3.data.id);
                            // setOptionVal(result3.data.answer)
                            setimpVal(result3.data.answer)

                          }

                        })

                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[1].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            console.log(result3.data)
                            setimpVal2(result3.data)
                            let halfwayPoint = result3.data.length / 2;
                            let Devided1 = result3.data.splice(0, halfwayPoint)
                            let Devided2 = result3.data.splice(0, halfwayPoint)
                            set_impVal2Devided1(Devided1)
                            set_impVal2Devided2(Devided2)
                            // console.log(result3.data.answers)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            console.log(impVal2)
                            console.log(impVal2[0])

                          }

                        })

                      fetch(`http://208.109.14.182:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3_1 => {
                          // setlistRecord(result3_1.data);

                          // console.log(questionId, "jj")
                          if (result3_1.data) {
                            console.log(result3_1.data)
                            setimpVal2(result3_1.data)

                            console.log(impVal2)

                          }

                        })



                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[2].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            console.log(result3.data)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            setimpVal3(result3.data)
                            console.log(impVal2)
                            console.log(impVal2[0])

                          }

                        })



                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[3].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            console.log(result3.data)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            setimpVal4(result3.data)


                          }

                        })


                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[4].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            console.log(result3.data)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            setimpVal5(result3.data)


                          }

                        })




                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[6].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result4 => {
                          // setlistRecord(result4.data);

                          // console.log(questionId, "jj")
                          if (result4.data) {
                            console.log(result4.data)
                            // console.log(result4.data.answer)

                            // setOptData(result4.data.ids);
                            // setOptionVal(result4.data.answer)
                            setimpVal7(result4.data)


                          }

                        })

                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[7].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_answers_same`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result5 => {
                          // setlistRecord(result5.data);
                          console.log(result5.data + "ccc")

                          // console.log(questionId, "jj")
                          if (result5.data) {
                            console.log(result5.data.answer + "ccc")
                            // console.log(result5.data.answer)

                            // setOptData(result5.data.ids);
                            // setOptionVal(result5.data.answer)
                            setimpVal8(result5.data.answer)


                          }

                        })



                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: uid.userId,
                        question_id: result2.data[5].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`http://208.109.14.182:9000/masters/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            console.log(result3.data)
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

                      fetch(`http://208.109.14.182:9000/masters/company/managers/data/allData`, requestOptions4)
                        .then(response => response.json())
                        .then(result4 => {
                          // console.log(result4,"res4")
                          if (result4.status == 200) {
                            // setlistRecord(result4.data);

                            console.log(result4.data, "hhs")
                            set_managers_length(result4.data.length)


                            fetch(`http://208.109.14.182:9000/masters/company`, requestOptions4)
                              .then(response => response.json())
                              .then(result5 => {
                                // setlistRecord(result5.data);
                                if (result5.status == 200) {
                                  console.log(result5.data, "company lenght")
                                  set_company_length(result5.data.length)

                                  console.log(result, "eer")
                                  console.log(result1)
                                  console.log(result2)
                                  // console.log(result3)
                                  console.log(result4)
                                  console.log(result5)

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
    GetAllRecords(0);
  }, []);


  const checkFunction = (abc) => {
    return abc + 5;
  }

  const surveyMean = (value) => {
    let survey_mean = value / survey_count;
    return survey_mean
  }

  const internalBenchmark = (value) => {
    let internal_benchmark = value / survey_count * survey_count / managers_length;
    return internal_benchmark
  }

  const externalBenchmark = (value) => {
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

  return (
    <>
      {/* <DonutChart data={percentage} data1={impVal} >

      </DonutChart> */}

      <button
        type="button"
        class="btn downloadbtn waves-effect p-3"
        onClick={exportPDFWithMethod}
      >
        Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
      </button>
      <h1>{checkFunction(5)}</h1>
      <h1>{checkFunction(10)}</h1>

      <Chart
        chartType="PieChart"
        data={data_g}
        options={options}
        width={"100%"}
        height={"400px"}

      />






      {/* <Pdf_page2 /> */}

      {/* page ----3 */}

      {/* page ------ 5 */}
      {/* page ------ 6 */}
      {/* page ------ 7 */}
      {/* page --------8 */}


      {/* page -----4 */}
      {/* page ------ 6 */}
      {/* page -----4 */}






      {/* PDF-----------------------> */}
      <div
        style={{
          position: "absolute",
          left: "-3000px",
          top: 0,
          color: "black",
        }}>
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
                <div className='row ' >
                  <div className='col-lg-6 text-white' >
                    Feedback Done Right
                  </div>
                  <div className='col-lg-6 text-white'>
                    www.amplioso.com
                  </div>
                </div>

                <div className='text-white' style={{ fontSize: "40px", fontWeight: "bold", position: "relative", left: "16px", top: "225px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }}>
                  {/* <p>Feedback Report</p> */}
                  <span>Feedback</span><br>
                  </br><span>Report</span>
                </div>
              </div>

              <div className="col-lg-6 feed_block feed_block3 text-black">
                <div style={{ fontSize: "10px", color: "white", float: "left", padding: "20px 20px" }}>Company Details</div>
                <div style={{ fontSize: "40px", color: "white", fontWeight: "bold", position: "relative", left: "16px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }}>
                  <span>Conversant</span><br>
                  </br><span>Technologies</span>
                </div>

                <div style={{ position: "relative", color: "white", left: "26px", top: "100px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }} >
                  <span style={{ fontSize: "58px", fontWeight: "bold" }}>2021</span><br>
                  </br><span style={{ fontSize: "10px" }}>www.amplioso.com</span>

                </div>
              </div>

              {feedbackData ? (
                <>
                  <div className="col-lg-6 feed_block feed_block4 text-black">
                    <div style={{ fontSize: "10px", position: "relative", left: "-85px", padding: "20px 20px" }}>Employee Details</div>
                    {/* <span >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`}</span> */}
                    {/* {console.log(feedbackData)} */}
                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "8px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`}</span><br />
                      <span style={{ fontSize: "10px", position: "relative", right: "9px", padding: "20px 20px" }}>{`${feedbackData[0].user_email}`}</span>
                    </div>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "46px" }}>
                      <span style={{ fontSize: "10px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Feedback Period</span><br />
                      <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Jan-Jun</span><br />
                      <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>2021</span><br />
                    </div>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "76px" }}>
                      <span style={{ fontSize: "10px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Created By</span><br />
                      <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Nishant Makam</span><br />
                      <span style={{ fontSize: "10px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>Generated On</span><br />
                      <span style={{ fontSize: "22px", fontWeight: "bold", position: "relative", right: "9px", padding: "20px 20px" }}>23 Jul 2021</span><br />

                    </div>

                  </div>
                </>
              ) : null}        </div>

            {/* page ---1 */}
            {/* <Pdf_page1 /> */}
            < div className=" row page-break feed_block_row" >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                <div >
                  <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                  <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                  <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Overall</span><br>
                        </br><span>Performence</span>
                      </div>
                      {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                      <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px" }}>
                        <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                        </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                      </div>
                      <div className='row' style={{ border: "0px solid black", width: "100%", position: "relative", left: "25%", top: "180px" }}>
                        <div className='col-lg-3' style={{ width: "140px", height: "140px", transform: "translate(-50%,-50%)", borderRadius: "80%", opacity: 0.8, backgroundColor: "rgb(211, 65, 57)" }} >
                          <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "200px", position: "relative", left: "50%", top: "50%" }}></div>
                          <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "30%" }}>
                            <div style={{ fontSize: "6px" }}>{impVal}</div>
                            <div style={{ fontSize: "6px" }}>Self</div>
                            <div style={{ fontSize: "6px" }}>Assessment</div>
                          </div>
                        </div>
                        <div className='col-lg-3' style={{ width: "140px", height: "140px", transform: "translate(-70%,-50%)", borderRadius: "80%", opacity: 0.8, backgroundColor: "#5e8ec4" }} >
                          <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "200px", position: "relative", left: "50%", top: "50%" }}></div>
                          <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "30%" }}>
                            {/* {console.log(impVal + "/" + survey_count)}
                            {console.log(impVal)} */}

                            <div style={{ fontSize: "6px" }}>{surveyMean(impVal)}</div>
                            <div style={{ fontSize: "6px" }}>Survey</div>
                            <div style={{ fontSize: "6px" }}>Mean</div>
                          </div>
                        </div>
                        <div className='col-lg-3' style={{ width: "140px", height: "140px", transform: "translate(-110%,-50%)", borderRadius: "80%", opacity: 0.8, backgroundColor: "rgb(175, 199, 208)" }} >
                          <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "200px", position: "relative", left: "50%", top: "50%" }}></div>
                          <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "30%" }}>
                            {/* {console.log(impVal + "/" + survey_count + "*" + survey_count + "/" + managers_length)} */}
                            <div style={{ fontSize: "6px" }}>{internalBenchmark(impVal)}</div>
                            <div style={{ fontSize: "6px" }}>Internal</div>
                            <div style={{ fontSize: "6px" }}>Benchmark</div>
                          </div>
                        </div>
                        <div className='col-lg-3' style={{ width: "140px", height: "140px", transform: "translate(-130%,-50%)", borderRadius: "80%", opacity: 0.8, backgroundColor: "rgb(226, 235, 200)" }} >
                          <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "200px", position: "relative", left: "50%", top: "50%" }}></div>
                          <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "30%" }}>
                            <div style={{ fontSize: "6px" }}>{externalBenchmark(impVal)}</div>
                            <div style={{ fontSize: "6px" }}>External</div>
                            <div style={{ fontSize: "6px" }}>Assessment</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* <hr style={{ border: "1px solid black", width: "200rem", textAlign: 'left', marginLeft: 0 }} /> */}
              <div style={{ fontSize: "8px", position: "relative", top: "210px" }}>
                <hr style={{ border: "1px solid black", width: "200rem", textAlign: 'left', marginLeft: 0 }} />

                <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>2021</span>
                <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>Conversant Technologies</span>

              </div>

            </div >

            {/* <Pdf_page2 /> */}
            <div className=" row page-break feed_block_row" >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                <div >
                  <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                  <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                  <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} >amplioso</span>
                  <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div style={{ borderLeft: "6px solid #799FCB", height: "84px" }}></div>
                      <div className='page_left_header'>
                        <span>Personal Brand</span><br>
                        </br><span>Favorability Rating</span>
                      </div>



                      {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                      <div style={{ fontSize: "7px", fontWeight: "lighter", position: "relative", bottom: "80px", left: "16px" }}>
                        <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                        </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                      </div>
                    </div>

                    <div style={{ position: "relative", bottom: "30px", left: "18%" }}>
                      <div  style={{ margin: "5px" }}>

                        <div style={{ width: 312, height: 312, position: "relative", left: "0%" }}>
                          {/* <h1>{impVal}</h1> */}
                          <div>
                            <div style={{ fontSize: "8px", position: "relative", top: "60px", color: "gray" }}>{impVal * 10}%</div>
                            <div style={{ fontSize: "8px", position: "relative", top: "80px", color: "gray" }}>{surveyMean(impVal * 10)}%</div>
                            <div style={{ fontSize: "8px", position: "relative", top: "100px", color: "gray" }}>{internalBenchmark(impVal * 10)}%</div>
                            <div style={{ fontSize: "8px", position: "relative", top: "120px", color: "gray" }}>{externalBenchmark(impVal * 10)}%</div>
                          </div>


                          <CircularProgressbarWithChildren
                            value={impVal * 10}
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

                              pathColor: `rgb(236,101,94, ${impVal * 10 / 100})`,
                              textColor: '#f88',
                              // trailColor: '#d6d6d6',
                              backgroundColor: '#3e98c7',
                            })}
                          >

                            <div style={{ width: 246, height: 246, }}>
                              <CircularProgressbarWithChildren
                                value={surveyMean(impVal * 10)}
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
                                  pathColor: `rgb(90,90,147, ${impVal * 10 / 100})`,
                                  textColor: '#f88',
                                  // trailColor: '#d6d6d6',
                                  backgroundColor: '#3e98c7',
                                })}
                              >

                                <div style={{ width: 172, height: 172 }}>
                                  <CircularProgressbarWithChildren
                                    value={internalBenchmark(impVal * 10)}
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
                                      pathColor: `rgb(121,159,203, ${internalBenchmark(impVal * 10) / 100})`,
                                      textColor: '#f88',
                                      // trailColor: '#d6d6d6',
                                      backgroundColor: '#3e98c7',
                                    })}
                                  >

                                    <div style={{ width: 123, height: 123 }}>
                                      <CircularProgressbarWithChildren
                                        value={externalBenchmark(impVal * 10)}
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
                                          pathColor: `rgb(214,225,185, ${externalBenchmark(impVal * 10) / 100})`,
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

                      </div>


                    </div>

                  </div>

                </div>

              </div>

              <div className='row block_sqr p-5'>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='single_sqr_list2' style={{ backgroundColor: "rgb(218,37,12)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Survey Mean</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='single_sqr_list2' style={{ backgroundColor: "rgb(55,55,94)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Self Assessment</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='single_sqr_list2' style={{ backgroundColor: "rgb(53,98,136)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Internal Benchmark</div>

                  </div>
                </div>

                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='single_sqr_list2' style={{ backgroundColor: "rgb(170,207,221)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>External Benchmark</div>
                  </div>
                </div>
              </div>

              <hr style={{ border: "1px solid black", width: "500rem", textAlign: 'left', marginLeft: 0, position: "absolute", bottom: "10px" }} />
              <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
                <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>2021</span>
                <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>Conversant Technologies</span>
              </div>
            </div >

            {/* page ----3 */}
            <div className=" row page-break feed_block_row"  >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                <div >
                  {feedbackData ? (
                    <>
                      <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                      <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                      <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} >amplioso</span>
                    </>) : null}            <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Universal </span><br>
                        </br><span>Competency Ratings</span>
                      </div>



                      {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                      <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px" }}>
                        <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                        </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                      </div>
                    </div>

                    <div style={{ position: "relative", bottom: "5px" }}>
                      <div style={{ position: "relative", top: "100px", right: "290px" }}>
                        <div style={{ position: "relative", bottom: "60px", fontSize: "8px" }}>10.0</div>
                        <div style={{ position: "relative", bottom: "12px", fontSize: "8px" }}>5.0</div>
                        <div style={{ position: "relative", top: "50px", fontSize: "8px" }}>1.0</div>
                      </div>
                      {impVal2 ? (
                        <>
                          <div  style={{ margin: "5px", width: "520px", height: "138px", border: "1px solid #707070", borderTop: "#FFFFFF", borderRight: "#FFFFFF" }}>
                            {impVal2.map((item, key) => (
                              <div style={{ marginLeft: "10px" }}>

                                <h1>{console.log(key % 2 == 0)}</h1>

                                <div className='graph_bar'>
                                  <div style={{ width: "100%", height: item.answer * 10, backgroundColor: key % 2 == 0 ? ("rgb(55,55,94)") : "rgb(218,37,12)", }}></div>
                                </div>
                                <div className='graph_bar'>
                                  <div style={{ width: "100%", height: surveyMean(item.answer * 10), backgroundColor: key % 2 == 0 ? ("rgb(86,86,151)") : "rgb(235,82,71)", }}></div>
                                </div>
                                <div className='graph_bar'>
                                  <div style={{ width: "100%", height: internalBenchmark(item.answer * 10), backgroundColor: key % 2 == 0 ? ("rgb(140,140,210)") : "rgb(241,158,152)", }}></div>
                                </div>
                                <div className='graph_bar'>
                                  <div style={{ width: "100%", height: externalBenchmark(item.answer * 10), backgroundColor: key % 2 == 0 ? ("rgb(155,155,246)") : "rgb(249,218,216)", }}></div>

                                </div>
                                <div style={{ width: "16px", height: "10rem", float: "left" }}></div>
                                {/* <div style={{ position: "relative", right: "414px", top: "280px", transform: "rotate(-90deg)" }} >fdsdds</div> */}
                                {/* <div className='col-lg-2' style={{ fontSize: "8px", position: "absolute", top: "100px" }}>{item.option}</div> */}

                              </div>
                            ))}
                            <div class="display-table">
                              <div style={{ fontSize: "8px" }}>
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

                {/* {impVal2 ? (<div className='row' style={{ width: "60%", marginLeft: "10px" }}>
            {impVal2.map((item, key) => (
              <div className='col-1 text-center' style={{ position: "absolute", bottom: "0px",transform: "rotate(-90deg)", fontSize: "8px", width: "30px" }}>
                <span>{item.option}</span>
              </div>
            ))}
          </div>) : null} */}

                {/* {impVal2 ? (
            <div className='row' style={{ marginLeft: "8%", height: "200px", width: "60%", float: "left", border: "1px solid #ff0000", position: "relative" }}>
              {impVal2.map((item, key) => (
                <div className='col-1 text-center' style={{ transform: "rotate(-90deg)", fontSize: "8px", width: "30px", position: "absolute", bottom: "0px" }}>{item.option}</div>
              ))}
            </div>) : null} */}

              </div>

              <div className='row p-5' style={{ marginLeft: "5%", position: "relative", bottom: "60px" }}>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(218,37,12)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(55,55,94)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Survey Mean</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(235,82,71)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(86,86,151)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Self Assessment</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(241,158,152)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(140,140,210)" }}>
                      <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Internal Benchmark</div>

                    </div>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(249,218,216)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(155,155,246)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>External Benchmark</div>
                  </div>
                </div>
              </div>


              <hr style={{ border: "1px solid black", width: "500rem", textAlign: 'left', marginLeft: 0, position: "absolute", bottom: "10px" }} />
              <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
                <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>2021</span>
                <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>Conversant Technologies</span>
              </div>
            </div>


            {/* page -----4 */}
            <div className=" row page-break feed_block_row"  >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                <div >
                  <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                  <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                  <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} >amplioso</span>
                  <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Universal</span><br>
                        </br><span>Competency Ratings</span>
                      </div>



                      {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                      <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px" }}>
                        <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                        </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                      </div>
                    </div>

                    <div style={{ position: "relative", bottom: "100px" }}>
                      <div style={{ position: "relative", top: "100px", right: "290px" }}>
                        <div style={{ position: "relative", bottom: "60px", fontSize: "8px" }}>10.0</div>
                        <div style={{ position: "relative", bottom: "12px", fontSize: "8px" }}>5.0</div>
                        <div style={{ position: "relative", top: "50px", fontSize: "8px" }}>1.0</div>
                      </div>

                      {impVal2Devided1 ? (
                        <div style={{ margin: "5px", width: "520px", height: "138px", border: "1px solid #707070", borderTop: "#FFFFFF", borderRight: "#FFFFFF" }}>
                          {impVal2Devided1.map((item, key) => (
                            <>
                              <div style={{ width: "36px", height: "12rem", float: "left" }}></div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: item.answer * 10, backgroundColor: key % 2 == 0 ? "rgb(218,37,12)" : "rgb(55,55,94)", }}></div>
                              </div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: surveyMean(item.answer * 10), backgroundColor: key % 2 == 0 ? "rgb(235,82,71)" : "rgb(86,86,151)", }}></div>
                              </div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: internalBenchmark(item.answer * 10), backgroundColor: key % 2 == 0 ? "rgb(241,158,152)" : "rgb(140,140,210)", }}></div>
                              </div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: externalBenchmark(item.answer * 10), backgroundColor: key % 2 == 0 ? "rgb(249,218,216)" : "rgb(155,155,246)", }}></div>
                              </div>
                            </>
                          ))}


                          <div className='row graph_labels2' >
                            {impVal2Devided1.map((item, key) => (
                              <div className='col-lg-2 text-center' style={{ width: "76px", marginLeft: "8px" }} >
                                {item.option}{console.log(item.option)}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>


                    <div style={{ position: "relative", bottom: "200px" }}>
                      {/* <div style={{ position: "relative", top: "40px", right: "760px" }}>
                        <div style={{ position: "relative", top: "5rem" }}>10.0</div>
                        <div style={{ position: "relative", top: "8rem" }}>5.0</div>
                        <div style={{ position: "relative", top: "11rem" }}>0.1</div>
                      </div> */}


                      <div style={{ position: "relative", top: "40px", right: "760px" }}>
                        <div style={{ position: "relative", top: "5rem" }}>10.0</div>
                        <div style={{ position: "relative", top: "8rem" }}>5.0</div>
                        <div style={{ position: "relative", top: "11rem" }}>0.1</div>
                      </div>


                      {/* <div style={{ position: "relative", top: "100px", right: "290px" }}>
                        <div style={{ position: "relative", bottom: "60px", fontSize: "8px" }}>10.0</div>
                        <div style={{ position: "relative", bottom: "12px", fontSize: "8px" }}>5.0</div>
                        <div style={{ position: "relative", top: "50px", fontSize: "8px" }}>1.0</div>
                      </div> */}

                      {impVal2Devided2 ? (
                        <div style={{ margin: "5px", width: "520px", height: "138px", border: "1px solid #707070", borderTop: "#FFFFFF", borderRight: "#FFFFFF" }}>

                          {impVal2Devided2.map((item, key) => (
                            <>
                              <div style={{ width: "36px", height: "12rem", float: "left" }}></div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: parseInt(item.answer * 10), backgroundColor: key % 2 == 0 ? "rgb(218,37,12)" : "rgb(55,55,94)", }}></div>
                              </div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: surveyMean(item.answer * 10), backgroundColor: key % 2 == 0 ? "rgb(235,82,71)" : "rgb(86,86,151)", }}></div>
                              </div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: internalBenchmark(item.answer * 10), backgroundColor: key % 2 == 0 ? "rgb(241,158,152)" : "rgb(140,140,210)", }}></div>
                              </div>
                              <div className='graph_bar_2'>
                                <div style={{ width: "100%", height: externalBenchmark(item.answer * 10), backgroundColor: key % 2 == 0 ? "rgb(249,218,216)" : "rgb(155,155,246)", }}></div>
                              </div>
                            </>
                          ))}

                          <div className='row graph_labels2' >
                            {impVal2Devided2.map((item, key) => (
                              <div className='col-lg-2 text-center' style={{ width: "76px", marginLeft: "8px" }} >
                                {item.option}{console.log(item.option)}
                              </div>
                            ))}
                          </div>


                        </div>
                      ) : null}
                    </div>


                  </div>

                </div>

              </div>

              {/* <div className='row p-5' style={{ marginLeft: "5%", justifyContent: "center", padding: "10px 10px", position: "relative", bottom: "140px" }}>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(218,37,12)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(55,55,94)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Survey Mean</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(235,82,71)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(86,86,151)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Self Assessment</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(241,158,152)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(140,140,210)" }}>
                      <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Internal Benchmark</div>

                    </div>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(249,218,216)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(155,155,246)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>External Benchmark</div>
                  </div>
                </div>
              </div> */}


              <hr style={{ border: "1px solid black", width: "500rem", textAlign: 'left', marginLeft: 0, position: "absolute", bottom: "10px" }} />
              <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
                <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>2021</span>
                <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>Conversant Technologies</span>
              </div>
            </div>





            {/* page ------ 5 */}
            <div className=" row page-break feed_block_row"  >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                <div >
                  <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                  <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                  <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} >amplioso</span>
                  <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Future</span><br>
                        </br><span>Potential</span>
                      </div>

                      <div style={{ fontSize: "7px", position: "relative", bottom: "80px" }}>
                        {impVal3 ? (
                          <div className='row ' >
                            {impVal3.map((item, key) => (
                              <div className='col-lg-6 ' style={{ borderLeft: key % 2 != 0 ? "1px solid rgb(209,209,209)" : "", borderBlockEnd: "1px solid rgb(209,209,209)" }} >
                                {/* <div className='col-lg-6 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)" }}> */}
                                <div style={{ position: "relative", bottom: "60px", left: "20px", paddingTop: "40px" }}>

                                  <div className='grp' style={{ position: "relative", left: "5px", textAlign: "end", fontSize: "12px", fontWeight: "bold", color: "black", top: "30px", width: "184px", height: "10px" }}>
                                    {item.option}
                                  </div>
                                  <div className='grp' style={{ position: "relative", width: "100px", height: "34px", fontSize: "10px", }}>
                                    <GraphVerticalBars percentage={item.answer * 10} color={`rgb(236,101,94)`} />

                                  </div>
                                  <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                    <GraphVerticalBars percentage={surveyMean(item.answer * 10)} color={`rgb(55,55,94)`} />

                                  </div>
                                  <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                    <GraphVerticalBars percentage={internalBenchmark(item.answer * 10)} color={`rgb(121,159,203)`} />

                                  </div>
                                  <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                    <GraphVerticalBars percentage={externalBenchmark(item.answer * 10)} color={`rgb(214,225,185)`} />

                                  </div>

                                </div>

                              </div>

                            ))}



                            <div className='col-lg-6 ' style={{ borderLeft: "1px solid rgb(209,209,209)", borderBlockEnd: "1px solid rgb(209,209,209)" }} >
                              <div style={{ position: "relative", bottom: "5px", left: "50px", paddingTop: "40px" }}>
                                <div className='row m-2' >
                                  <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: "rgb(236,101,94)" }}>
                                  </div>
                                  <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px" }}>
                                    Survey Mean
                                  </div>
                                </div>

                                <div className='row m-2' >
                                  <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: "rgb(55,55,94)" }}>
                                  </div>
                                  <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px" }}>
                                    Self Assessment
                                  </div>
                                </div>
                                <div className='row m-2' >
                                  <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: "rgb(121,159,203)" }}>
                                  </div>
                                  <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px" }}>
                                    Internal Benchmark
                                  </div>
                                </div>
                                <div className='row m-2' >
                                  <div className='col-lg-3 single_sqr_list2' style={{ backgroundColor: "rgb(214,225,185)" }}>
                                  </div>
                                  <div className='col-lg-3 w-50' style={{ textAlign: "left", textSize: "12px", paddingLeft: "50px" }}>
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
                <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>2021</span>
                <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>Conversant Technologies</span>
              </div>


            </div>




            {/* page ------ 6 */}
            <div className=" row page-break feed_block_row"  >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                <div >
                  {feedbackData ? (
                    <>
                      <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                      <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                      <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} >amplioso</span>
                    </>
                  ) : null}
                  <div style={{ position: "relative", top: "48px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Think-Act-Feel</span><br>
                        </br><span>Leadership Rating</span>
                      </div>

                      <div style={{ fontSize: "7px", position: "relative", bottom: "100px" }}>

                        <div className='row' >
                          <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)" }}>
                            <div style={{ position: "relative", bottom: "20px", right: "240px" }}>
                              <div className='grp' style={{ position: "relative", left: "290px", fontSize: "26px", fontWeight: "bold", color: "black", top: "20px", width: "100px", height: "40px" }}>
                                Think
                              </div>

                            </div>

                          </div>
                          <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                            <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                              <div className='grp' style={{ position: "relative", left: "290px", fontSize: "26px", fontWeight: "bold", color: "black", top: "20px", width: "100px", height: "40px" }}>
                                Act
                              </div>


                            </div>

                          </div>
                          <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                            <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                              <div className='grp' style={{ position: "relative", left: "290px", fontSize: "26px", fontWeight: "bold", color: "black", top: "20px", width: "100px", height: "40px" }}>
                                Feel
                              </div>


                            </div>

                          </div>

                        </div>
                        {impVal4 ? (
                          <div className='row ' >
                            {impVal4.map((item, key) => (
                              <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: key % 3 != 0 ? "1px solid rgb(209,209,209)" : "" }}>
                                <div style={{ position: "relative", bottom: "0px", left: "0px" }}>
                                  {/* <span>
                              {surveyMean(item.answer * 10)}
                              {internalBenchmark(item.answer * 10)}
                              {externalBenchmark(item.answer * 10)}

                            </span> */}
                                  <Chart
                                    chartType="PieChart"
                                    data={[
                                      ["Task", "Hours per Day"],
                                      ["Self Assessment", parseInt(item.answer * 10)],
                                      ["Survey Mean", surveyMean(item.answer * 10)],
                                      ["Internal Benchmark", internalBenchmark(item.answer * 10)],
                                      ["External Benchmark", externalBenchmark(item.answer * 10)],
                                    ]}
                                    options={{
                                      // title: "My Daily Activities",
                                      legend: "none",
                                      // legend: "none",
                                      // pieSliceText: "label",
                                      title: item.option,
                                      // pieStartAngle: 100,
                                      slices: {
                                        0: { color: "rgb(214,225,185)" },
                                        1: { color: "rgb(121,159,203)" },
                                        2: { color: "rgb(55,55,94)" },
                                        3: { color: "rgb(236,101,94)" },

                                      },
                                    }}
                                    height={"90%"}
                                    width={"100px"}

                                  />
                                </div>

                              </div>
                            ))}





                          </div>
                        ) : null}




                      </div>



                    </div>
                  </div>

                </div>
                {/* <div className='row block_sqr'>
            <div className='col-lg-3'>
              <div className='row'>
                <div className='single_sqr_list2' style={{ backgroundColor: "rgb(218,37,12)" }}>
                </div>
                <div style={{ fontSize: "12px", position: "relative", right: "40px", }}>Survey Mean</div>
              </div>
 
            </div>
            <div className='col-lg-3'>
              <div className='row'>
                <div className='single_sqr_list2' style={{ backgroundColor: "rgb(55,55,94)" }}>
                </div>
                <div style={{ fontSize: "12px", position: "relative", right: "40px", }}>Self Assessment</div>
              </div>
 
            </div>
            <div className='col-lg-3'>
              <div className='row'>
                <div className='single_sqr_list2' style={{ backgroundColor: "rgb(53,98,136)" }}>
                </div>
                <div style={{ fontSize: "12px", position: "relative", right: "40px", }}>Internal Benchmark</div>
 
              </div>
            </div>
 
            <div className='col-lg-3'>
              <div className='row'>
                <div className='single_sqr_list2' style={{ backgroundColor: "rgb(170,207,221)" }}>
                </div>
                <div style={{ fontSize: "12px", position: "relative", right: "40px", }}>External Benchmark</div>
              </div>
            </div>
          </div> */}

              </div>
              {/* <hr style={{ border: "1px thin rgb(209,209,209)", marginLeft: 0, position: "absolute", bottom: "30px" }} />
        <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
          <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
          <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>2021</span>
          <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>Conversant Technologies</span>
        </div> */}

            </div>


            {/* page ------ 7 */}
            <div className=" row page-break feed_block_row"  >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                <div >
                  {feedbackData ? (
                    <>
                      <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                      <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                      <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} >amplioso</span>
                    </>
                  ) : null}
                  <div style={{ position: "relative", top: "48px", left: "-5px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Think-Act-Feel</span><br>
                        </br><span>Leadership Rating</span>
                      </div>

                      <div style={{ fontSize: "7px", position: "relative", bottom: "60px" }}>
                        {/* <h1 className='fontCheck'>amplioso</h1>
           <h1>Amplioso</h1> */}

                        <div className='row' >
                          <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)" }}>
                            <div style={{ position: "relative", bottom: "20px", right: "240px" }}>
                              <div className='grp' style={{ position: "relative", left: "290px", fontSize: "26px", fontWeight: "bold", color: "black", top: "20px", width: "100px", height: "40px" }}>
                                Think
                              </div>

                            </div>

                          </div>
                          <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                            <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                              <div className='grp' style={{ position: "relative", left: "290px", fontSize: "26px", fontWeight: "bold", color: "black", top: "20px", width: "100px", height: "40px" }}>
                                Act
                              </div>


                            </div>

                          </div>
                          <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                            <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                              <div className='grp' style={{ position: "relative", left: "290px", fontSize: "26px", fontWeight: "bold", color: "black", top: "20px", width: "100px", height: "40px" }}>
                                Feel
                              </div>


                            </div>

                          </div>

                        </div>



                        {impVal4 ? (
                          <div className='row' style={{ boder: "1px solid black", paddingLeft: "3px" }}>
                            {impVal4.map((item, key) => (
                              <div className='col-4' style={{ boder: "1px solid black", height: "150px", borderBlockEnd: "1px solid rgb(209,209,209)", borderRight: "1px solid rgb(209,209,209)" }}>
                                {/* <h1>{item.answer * 10}</h1>
                                <h1>{surveyMean(item.answer * 10)}surveymean</h1>
                                <h1>{internalBenchmark(item.answer * 10)}</h1>
                                <h1>{externalBenchmark(item.answer * 10)}</h1> */}

                                <div className='row' style={{ border: "0px solid black", width: "250px", position: "relative", left: "25%", top: "50%" }}>
                                  <div className='col-lg-3' style={{ width: item.answer * 10 + "px", height: item.answer * 10 + "px", transform: "translate(-50%,-50%)", borderRadius: "50%", opacity: 0.8, backgroundColor: "rgb(211, 65, 57)" }} >
                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(209,209,209)", height: "50px", position: "relative", left: "50%", top: "50%" }}></div>
                                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", }}>
                                      <div style={{ fontSize: "6px" }}>{surveyMean(item.answer * 10)}</div>
                                      <div style={{ fontSize: "6px" }}>Self</div>
                                      <div style={{ fontSize: "6px" }}>Assessment</div>
                                    </div>
                                  </div>
                                  <div className='col-lg-3' style={{ width: surveyMean(item.answer * 10) + "px", height: surveyMean(item.answer * 10) + "px", transform: "translate(-70%,-50%)", borderRadius: "50%", opacity: 0.8, backgroundColor: "#5e8ec4" }} >
                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(209,209,209)", height: "50px", position: "relative", left: "50%", top: "50%" }}></div>
                                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", }}>
                                      <div style={{ fontSize: "6px" }}>9.0</div>
                                      <div style={{ fontSize: "6px" }}>Survey</div>
                                      <div style={{ fontSize: "6px" }}>Mean</div>
                                    </div>
                                  </div>
                                  <div className='col-lg-3' style={{ width: internalBenchmark(item.answer * 10) + "px", height: internalBenchmark(item.answer * 10) + "px", transform: "translate(-110%,-50%)", borderRadius: "50%", opacity: 0.8, backgroundColor: "rgb(175, 199, 208)" }} >
                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(209,209,209)", height: "50px", position: "relative", left: "50%", top: "50%" }}></div>
                                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", }}>
                                      <div style={{ fontSize: "6px" }}>9.0</div>
                                      <div style={{ fontSize: "6px" }}>Internal</div>
                                      <div style={{ fontSize: "6px" }}>Benchmark</div>
                                    </div>
                                  </div>
                                  <div className='col-lg-3' style={{ width: externalBenchmark(item.answer * 10) + "px", height: externalBenchmark(item.answer * 10) + "px", transform: "translate(-130%,-50%)", borderRadius: "50%", opacity: 0.8, backgroundColor: "rgb(226, 235, 200)" }} >
                                    <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(209,209,209)", height: "50px", position: "relative", left: "50%", top: "50%" }}></div>
                                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify", }}>
                                      <div style={{ fontSize: "6px" }}>9.0</div>
                                      <div style={{ fontSize: "6px" }}>External</div>
                                      <div style={{ fontSize: "6px" }}>Benchmark</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            ))}



                          </div>) : null}





                      </div>



                    </div>
                  </div>

                </div>


              </div>


            </div>




            {/* page --------8 */}
            <div className=" row page-break feed_block_row" >
              <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                {feedbackData ? (<div >
                  <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                  <span style={{ float: "left", paddingLeft: "20px", fontSize: "8px" }} >/ Jan-Jun 2021</span>
                  <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} >amplioso</span>
                  <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Opportunities</span><br>
                        </br><span>Overview</span>
                      </div>
                      {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                      {impVal5 ? (<div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px" }}>
                        <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                        </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                        <div className='row'>
                          {impVal5.map((item, key) => (
                            <div className='col-lg-12 m-2' style={{ border: "1px solid #F1F1F1", lineHeight: "22px", width: "100px", textAlign: "center" }}>{item.option}</div>
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
                      {console.log(impVal7)}
                      {impVal7 ? (
                        <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px" }}>
                          <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                          </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>

                          {/* <div className='row'>
                    {impVal5.map((item, key) => ( */}
                          <div className='row'>
                            {impVal7.map((item, key) => (
                              <>
                                <div className="square col-lg-2" style={{ height: "10px", width: "10px", padding: "5px", backgroundColor: "#555", margin: "5px" }}></div>
                                <div className="square col-lg-2" style={{ text: "center", padding: "5px" }}>{item.option}</div>
                              </>
                            ))}
                          </div>
                          {/* ))}
                  </div> */}
                        </div>) : null}

                    </div>


                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                      <div className="square_bar"></div>
                      <div className='page_left_header'>
                        <span>Additional</span><br>
                        </br><span>Comments</span>
                      </div>
                      {/* vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j */}
                      <div style={{ fontSize: "7px", position: "relative", bottom: "80px", left: "16px" }}>
                        <span>the quick,brown fox jumps over a lazy dog, djs flock by when mtv ax quiz prog.junk mtv quiz graced by fox whelps.bawds jog,flick quartz, </span><br>
                        </br><span>vex nymphs.waltz,bad nymph,for quick jigs vex! fox nymphs grab quick-j</span>
                        {impVal8 ? (<div>{impVal8}</div>) : null}

                      </div>

                    </div>
                  </div>

                </div>) : null}

              </div>

              <div className='row block_sqr'>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(218,37,12)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(55,55,94)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Survey Mean</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(235,82,71)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(86,86,151)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Self Assessment</div>
                  </div>

                </div>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(241,158,152)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(140,140,210)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>Internal Benchmark</div>

                  </div>
                </div>

                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(249,218,216)" }}>
                    </div>
                    <div className='sqr_list2' style={{ backgroundColor: "rgb(155,155,246)" }}>
                    </div>
                    <div style={{ fontSize: "12px", position: "relative", right: "40px", top: "10px" }}>External Benchmark</div>
                  </div>
                </div>
              </div>

              <hr style={{ border: "1px solid black", width: "500rem", textAlign: 'left', marginLeft: 0, position: "absolute", bottom: "10px" }} />
              <div style={{ fontSize: "8px", position: "absolute", bottom: "0px" }}>
                <span style={{ position: "relative", left: "45%", bottom: "10px" }}>www.amplioso.com</span>
                <span style={{ position: "relative", left: "-20%", bottom: "10px" }}>2021</span>
                <span style={{ position: "relative", left: "-45%", bottom: "10px" }}>Conversant Technologies</span>
              </div>
            </div>





          </PDFExport>
        ) : (null)}

      </div>



    </>

  )
}

