import React, { useEffect, useState } from 'react';
import "../assets/css/style.css"
import "../assets/css/form-steps.css"
import logo from "../assets/images/logo-info.png"
import profile from "../assets/images/profile/pic1.jpg"
import { useHistory } from 'react-router-dom';
export default function SurveyHeader(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;
    const [isActive, setActive] = useState("false");
    const token = localStorage.getItem("jwt");
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [validToken, setvalidToken] = useState(false);
    const history = useHistory();
    const survey_token = localStorage.getItem('survey_token');
    const uid = JSON.parse(localStorage.getItem('survey_token'));
    const [ImageUrl, setImageUrl] = useState("")

    // alert(token_ele)

    // const uid = uid.userId;

    const handleToggle = () => {
        setActive(!isActive);
    };

    function chekAuthUser() {
        // console.log(uid.userId)
        // console.log(survey_token.userId)
        console.log(uid)
        // if (uid) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // inputList.map((item,key)=>{
        var raw = JSON.stringify({
            token_ele: uid.token,
        });
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch(`http://localhost:9000/masters/check_survey_key`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData);
                if (resData.status == 200) {
                    console.log(resData.data);
                    setvalidToken(true)
                    console.log("valid token")
                    // localStorage.setItem("survey_token", token_ele)
                    // GetAllRecords();
                    // props.next(values);

                } else {
                    console.log("Invalid Token")
                    setvalidToken(false)
                    history.push("/unauthorized_tkn")
                }
                // GetAllRecords();
            })
            .catch((error) => console.log("error", error));
        // } else {
        //     history.push("/unauthorized_tkn")
        // }
    }

    console.log(uid)

    const GetAllRecords = () => {
        // alert(BaseURL)
        console.log(uid)
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/masters/employeedetails/manager/${uid.managerId}`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
            // console.log(resData)
            // console.log(resData.data.length)
            // console.log(resData.data[0].prof_img)
            if (resData.data.length > 0) {
                // alert("1")
                console.log(resData.data[0].prof_img)
                setImageUrl(resData.data[0].prof_img)
                setfirst_name(resData.data[0].first_name)
                setlast_name(resData.data[0].last_name)
                // setImageUrl("http://dev.amplioso.com/images/" + resData.data[0].prof_img)

            }

        })

        fetch(`http://localhost:9000/masters/collect_feedback/${uid.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result.data[0].first_name)
                // setfirst_name(result.data[0].first_name)
                // setlast_name(result.data[0].last_name)
                // alert(result.data[0].prof_img)
                console.log(result.data[0])
                // setImageUrl("http://dev.amplioso.com/images/" + "1615629352514-logo.png")
                // setImageUrl("http://dev.amplioso.com/images/" + result.data[0].prof_img)

            })

            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if (uid == null) {
            history.push({
                pathname: "/unauthorized_tkn",
                state: "Token Error"
            })
            return false
        }
        chekAuthUser()
        GetAllRecords();
    })

    return (
        <div>
            {/* <div className="nav-header">
                <a href="/" className="brand-logo"><img className="logo-abbr" src={logo} alt="company_logo" />
                </a>
            </div> */}
            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown header-profile">
                                    <a className="nav-link"
                                        onClick={handleToggle} role="button" data-bs-toggle="dropdown">
                                        <div className="header-info me-3"> <span className="fs-16 font-w600 " style={{ textTransform: "capitalize" }}>{first_name} {last_name}</span> <small className="text-end fs-14 font-w400">April 2021 - June 2021</small> </div>
                                        {/* {console.log(ImageUrl)} */}
                                        {/* <span>shhyu{"http://dev.amplioso.com/images/" + ImageUrl}</span> */}
                                        {ImageUrl ? <img src={"http://dev.amplioso.com/images/" +ImageUrl} width={20} /> :
                                            <div
                                                style={{
                                                    textTransform: "uppercase", border: "1px solid gray", borderRadius: "50px", height: "43px", width: "45px", textAlign: "center",
                                                    // boxShadow:"0px 1px 4px 0px grey" 
                                                }}>
                                                <h2 style={{ color: "#996161", marginTop: "2px" }} >
                                                    {first_name.charAt(0) + "" + last_name.charAt(0)}
                                                </h2>
                                            </div>}
                                    </a>
                                    <div className={`dropdown-menu dropdown-menu-end  ${isActive ? "" : "show"}`} > <a href="app-profile.html" className="dropdown-item ai-icon">
                                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-blk" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth='2' strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx={12} cy={7} r={4} />
                                        </svg>
                                        <span className="ms-2">Profile </span> </a> <a href="https://ventic.dexignzone.com/xhtml/error-404.html" className="dropdown-item ai-icon">
                                            <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-blk" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth='2' strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                <polyline points="16 17 21 12 16 7" />
                                                <line x1={21} y1={12} x2={9} y2={12} />
                                            </svg>
                                            <span className="ms-2">Logout </span> </a> </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div>{props.data}</div>
        </div>
    )
}
// }
