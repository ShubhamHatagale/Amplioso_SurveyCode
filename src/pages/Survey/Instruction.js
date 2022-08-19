import React from 'react'
import { useHistory } from "react-router-dom";
import welcome from "../../assets/images/w2.jpg"
function Instruction() {
    const history = useHistory();
    return (
        <section className="about-area about-back-bg pt-120 pb-85 mb0" >
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
                    <div className="abt-img-bak"/>
                    <br/>
                    <br/>
           
                    <img src={welcome} className="img-intr" alt="welcome" />
     
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Instruction;
