import { Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import welcome from "../../assets/images/w2.jpg"
import * as Yup from "yup";

function Instruction() {
    const history = useHistory();
    const [Display, setDisplay] = useState(false);
    const [Display1, setDisplay1] = useState(false);

    const [img_urls, setimg_urls] = useState("");

    // useEffect(() => {
    //     setDisplay(true)
    // }, [])
    const uid = JSON.parse(localStorage.getItem('survey_token'));

    const initialValues = {
        prof_img: "",
    };

    const validate = Yup.object({
        prof_img: Yup.string()
            .required("Prof Image is required"),

    });

    const GetAllRecords = () => {
        var header = new Headers();
        var request = {
            method: "GET",
            headers: header,
            redirect: "follow"
        }
        fetch(`${process.env.REACT_APP_Base_URL_Backend}employeedetails/manager/${uid.managerId}`, request)
            .then((response) => response.json())
            .then((resData) => {
                // console.log(resData)
                // console.log(resData.data.length)
                console.log(resData.data[0].prof_img)
                if (resData.data[0].prof_img == "" || resData.data[0].prof_img == "null" || resData.data[0].prof_img == null ) {
                    setDisplay(true)
                }

                if (resData.data.length > 0) {
                    // alert("1")
                    console.log(resData.data[0].prof_img)
                    setimg_urls("http://dev.amplioso.com/images/" + resData.data[0].prof_img)
                } else {
                    setDisplay(true)
                }

            })

    }

    useEffect(() => {
        GetAllRecords()
    }, [])

    const OnSubmitForm = (values) => {
        console.log(values)

        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization");

        var formdata = new FormData();
        // console.log("gg")

        if (values) {
            formdata.append('prof_img', values.prof_img, values.prof_img.name);
        }

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_Base_URL_Backend}employeedetails/manager_id/updateprofile_img/${uid.managerId}`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                if (resData.status == 200) {
                    console.log("uploaded successfully")
                    GetAllRecords()

                    setDisplay1(true)
                    setTimeout(() => {
                        setDisplay1(false)
                        setDisplay(false)
                        GetAllRecords()
                    }, 2000);



                }
                GetAllRecords()

            })
            .catch((error) => console.log("error", error));
    }


    return (
        <section className="about-area about-back-bg pt-120 pb-85 mb0" >

            <Modal
                size="sm"
                show={Display1}
                onHide={() => setDisplay1(false)}
                aria-labelledby="example-modal-sizes-title-md"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>

                <Modal.Body className="success text-center " >
                    {/* <img style={{ height: "80px", width: "80px" }} src={Ico12} /> */}
                    {/* <FaIconz.FaTimesCircle style={{ height: "60px", width: "60px" }} /> */}
                    <div>
                        <h3 class="dynamic-message"> Image Uploaded Succesfully </h3>
                    </div>
                </Modal.Body>

                {/* <Modal.Body className="success text-center text-danger bold h3">shubh</Modal.Body>
                <Modal.Body className="success text-center text-black bold" ><p style={{ cursor: 'pointer' }} onClick={() => setDisplay(false)} >Ok</p></Modal.Body> */}

            </Modal>

            <Modal
                size="xl"
                show={Display}
                onHide={() => setDisplay(false)}
                aria-labelledby="example-modal-sizes-title-md"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>

                <Modal.Body className="success text-center mt-5" style={{ backgroundColor: "#7b2cbf" }}>
                    {/* <img style={{ height: "80px", width: "80px" }} src={Ico12} /> */}
                    {/* <FaIconz.FaTimesCircle style={{ height: "60px", width: "60px" }} /> */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={(values, props) => {
                            OnSubmitForm(values, props);
                        }}
                        render={({ values, errors, touched, handleReset, setFieldValue, formik }) => {
                            return (

                                <Form class="form-container">
                                    <div class="upload-files-container">
                                        <div class="drag-file-area">
                                            <span class="material-icons-outlined upload-icon"> file_upload </span>
                                            <h3 class="dynamic-message"> Drag & drop any file here </h3>
                                            <label class="label"> or <span class="browse-files">
                                                <input type="file" class="default-file-input"
                                                    onChange={value => {
                                                        // console.log(value.target.files && value.target.files[0])
                                                        setFieldValue(`prof_img`, (value.target.files && value.target.files[0] ? value.target.files[0] : ""))
                                                        // setFieldValue(`img_url`, (value.target.files && value.target.files[0] ? URL.createObjectURL(value.target.files[0]) : ""))
                                                        setimg_urls(value.target.files && value.target.files[0] ? URL.createObjectURL(value.target.files[0]) : "")
                                                    }
                                                    }
                                                />
                                                <span class="browse-files-text">browse file</span> <span>from device</span> </span> </label>
                                            <span class="browse-files-text">{values.prof_img.name}</span>
                                            {/* {console.log(values)} */}

                                            {/* <div className="file-path-wrapper">
                                                <img src={values ? values.img_url : ""} className="comapnylogoimg" style={{ marginLeft: "18px" }} width="120" height="85" />
                                            </div> */}
                                            <div className="file-path-wrapper">
                                                {/* <input className="file-path validate" type="text" defaultValue="Profile" /> */}
                                                <img src={img_urls ? img_urls : ""} className="comapnylogoimg" style={{ marginLeft: "18px" }} width="120" height="85" alt="img" />
                                            </div>
                                        </div>
                                        <span class="cannot-upload-message"> <span class="material-icons-outlined">error</span> Please select a file first <span class="material-icons-outlined cancel-alert-button">cancel</span> </span>
                                        <div class="file-block">
                                            <div class="file-info"> <span class="material-icons-outlined file-icon">description</span> <span class="file-name"> </span> | <span class="file-size">  </span> </div>
                                            <span class="material-icons remove-file-icon">delete</span>
                                            <div class="progress-bar"> </div>
                                        </div>
                                        <button type="submit" class="upload-button" > Upload </button>
                                    </div>
                                </Form>



                            )
                        }}
                    />
                </Modal.Body>

                {/* <Modal.Body className="success text-center text-danger bold h3">shubh</Modal.Body>
                <Modal.Body className="success text-center text-black bold" ><p style={{ cursor: 'pointer' }} onClick={() => setDisplay(false)} >Ok</p></Modal.Body> */}

            </Modal>
            <div className="container fullwidthcont">
                <div className="row clearfix">
                    <div className="col-lg-7 text-pad1">
                        <strong>A few things you should know before we jump in:</strong>
                        <ul className="abt-list">
                            <li>All questions seek your personal perspective. There are no right or wrong answers. </li>
                            <li>Responses are anonymized and only aggregated insights are shared with the person on whom feedback is sought and their manager. </li>
                            <li>You may select NA (Not Applicable) as your response under scenarios where you’ve either not had enough opportunity to observe the competency being rated, are unsure, or would like to skip the question.</li>
                            <li>You can come back to the previous pages to change your answers. However, once the survey is submitted, your answers cannot be changed.</li>
                        </ul><br />
                        <p>
                            You are about to give someone the gift of feedback. Thank you for that commitment. We know your time is valuable. From this point on, we only need 5-10 minutes of your time. Let’s get started.
                        </p>
                        <div className="button btn-align">
                            <a className="btn-next-start" onClick={() => history.push('/surveyform')}><span className="txt">Let's Get Started <i className="fa fa-angle-double-right" aria-hidden="true" /></span></a>                              </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="abt-img-bak" />
                        <br />
                        <br />

                        <img src={welcome} className="img-intr" alt="welcome" />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Instruction;
