
import React from 'react'
import welcome from "../../assets/images/Welcome.png"
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useJwt } from "react-jwt";
import { useLayoutEffect } from 'react';
import { useState } from 'react';
function WelcomeScreen(props) {
    const BaseURL = process.env.REACT_APP_Base_URL_Backend;
    const [validToken, setvalidToken] = useState(false);
    const [ManagerId, setManagerId] = useState();

    const history = useHistory();
    const { token_ele } = useParams();

    // const { decodedToken, isExpired } = useJwt(token_ele);



    function chekAuthUser() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // inputList.map((item,key)=>{
        var raw = JSON.stringify({
            token_ele: token_ele,
        });
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch(`http://208.109.14.182:9000/masters/check_survey_key`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData);
                if (resData.status == 200) {
                    var myHeadersCf = new Headers();
                    var requestOptions = {
                        method: 'GET',
                        headers: myHeadersCf,
                        redirect: 'follow'
                    };

                    fetch(`http://208.109.14.182:9000/masters/collect_feedback/${resData.data.id}`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            // setlistRecord(result.data);
                            // setManagerId(result.data[0].manager_id)
                            // console.log(result.data)

                            if (result.status == 200) {
                                let current_date = new Date().toISOString().split('T')[0]
                                let endDate = result.data[0].period_end;
                                if (current_date > endDate) {
                                    console.log("false")
                                    history.push('/unauthorized_tkn')
                                    return false
                                }

                                var survey_user = {
                                    token: token_ele,
                                    userId: parseInt(resData.data.id),
                                    employeeId: parseInt(result.data[0].employee_id),
                                    managerId: parseInt(result.data[0].manager_id),
                                    companyId: parseInt(result.data[0].company_id),
                                };
                            }


                            console.log(resData);
                            setvalidToken(true)
                            localStorage.setItem("survey_token", JSON.stringify(survey_user))

                        })

                        .catch(error => console.log('error', error));




                    // console.log(resData);
                    // setvalidToken(true)
                    // localStorage.setItem("survey_token", JSON.stringify(survey_user))
                    // GetAllRecords();
                    // props.next(values);

                } else {
                    setvalidToken(false)

                    // history.push("/Error404")
                }
                // GetAllRecords();
            })
            .catch((error) => console.log("error", error));

    }

    useEffect(() => {
        console.log(token_ele)
        chekAuthUser()
    }, [])



    // useEffect(() => {
    //     console.log("useEffect")
    //     console.log(isExpired)

    // }, [])

    return (

        <section className="about-area about-back-bg pt-120 pb-85 mb0">
            <div className="container fullwidthcont">
                {/* {console.log(validToken)} */}
                {validToken ? (
                    <div className="row clearfix screen-height">
                        <div className="col-lg-6 col-sm-6 img-position-container">
                            <div className="abt-img-bak3"></div>
                            <br />
                            <br />
                            <img src={welcome} className="img-home" alt="welcome" />
                        </div>
                        <div className="col-lg-6 col-sm-6 text-home">
                            <h5>Welcome!</h5>
                            <div className="line" />
                            <p>
                                We all need feedback. It’s what makes us all better. At Amplioso (amplio = Latin for improvement), we’re passionate about 360-degree feedback and take it seriously. We don’t take you through an unnecessary barrage of questions. We know what matters.
                            </p>
                            <br />
                            <br />
                            <div className="button btn-align">
                                <a className="btn-next" onClick={() => history.push('/instruction')}><span className="txt">Next <i className="fa fa-angle-double-right" aria-hidden="true" /></span></a>                              </div>
                        </div>


                    </div>) : null}
            </div>
        </section>
    );
}

export default WelcomeScreen;