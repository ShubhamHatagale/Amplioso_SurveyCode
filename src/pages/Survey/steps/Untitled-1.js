<div className="feed_block_row row "  >
<div className='circle' style={{ position: "absolute", top: "23%", left: "272px" }}>
    <Star style={{ fill: "#FFFDFD", fontSize: "38px", position: "relative", right: "7px", top: "4px" }} />
</div>
<div className='page1_circle2' style={{ position: "absolute", top: "73%", left: "272px" }}>
    <CheckIcon style={{ fill: "#FFFDFD", fontSize: "38px", position: "relative", right: "7px", top: "4px" }} />
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

    <div className='text-white' style={{ position: "relative", left: "16px", top: "225px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }}>
        {/* <p>Feedback Report</p> */}
        <span>Feedback</span><br>
        </br><span>Report</span>
    </div>
</div>

<div className="col-lg-6 feed_block feed_block3 text-black">
    <div style={{ fontSize: "10px", color: "white", float: "left", padding: "20px 20px", flex: "0 0 auto", width: "100%" }}>
        {/* Company Details */}
    </div>
    <div style={{ color: "white", position: "relative", left: "16px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }}>
        <span>Conversant</span><br>
        </br><span>Technologies</span>
    </div>

    <div style={{ position: "relative", color: "white", left: "26px", top: "100px", textAlign: "justify", MozTextAlignLast: "justify", textAlignLast: "justify" }} >
        <span style={{ fontSize: "58px" }}>{new Date().getFullYear()}</span><br>
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
                <span style={{ fontSize: "22px", position: "relative", right: "9px", padding: "20px 20px", textTransform: "capitalize" }}>{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`}</span><br />
                <span style={{ fontSize: "8px", position: "relative", right: "9px", padding: "20px 20px", fontWeight: "100px" }}>{`${feedbackData[0].user_email}`}</span>
            </div>

            <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "46px" }}>
                <span style={{ fontSize: "8px", position: "relative", right: "9px", padding: "20px 20px" }}>Feedback Period</span><br />
                <span style={{ fontSize: "22px", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].period_start.split('T')[0]}</span><br />
                <span style={{ fontSize: "22px", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].period_end.split('T')[0]}</span><br />
            </div>

            <div style={{ textAlign: "justify", MozTextAlignLast: "justify", position: "relative", top: "76px", textTransform: "capitalize" }}>
                <span style={{ fontSize: "8px", position: "relative", right: "9px", padding: "20px 20px" }}>Created By</span><br />
                <span style={{ fontSize: "22px", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].ManagerId.first_name} {feedbackData[0].ManagerId.last_name}</span><br />
                <span style={{ fontSize: "8px", position: "relative", right: "9px", padding: "20px 20px" }}>Generated On</span><br />
                <span style={{ fontSize: "22px", position: "relative", right: "9px", padding: "20px 20px" }}>{feedbackData[0].createdAt.split('T')[0]}</span><br />

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

            {impVal && list1.length == 5 ? (
                <div style={{ position: "relative", top: "58px", left: "14px", fontSize: "40px" }}>

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
                        {/* {console.log(inputListFinal)} */}


                        {/* {inputListFinal[0].Feature.map((item, key) => {
                            console.log(item)
                        })} */}

                        {/* {inputListFinal[0].Feature1.map((item, key) => {
                            console.log(item)
                        })} */}


                        {inputListFinal[0].Feature.map((item, key) => {
                            // { console.log(item) }

                            return (
                                <>
                                    <div className='col-2'>
                                        <div style={{ fontSize: "16px" }}>
                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                <span style={{ fontSize: "20px", }}>{Math.ceil(list1[key][0].surveyMean).toFixed(1)}</span><br />
                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Survey</span><br />
                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Mean</span>
                                            </div>
                                        </div>

                                        <div style={{ padding: impValFn(list1[key][0].surveyMean, 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[0].color }} >
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
                                        <div style={{ padding: impValFn((item.range_val), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[1].color }} >
                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                        </div>
                                    </div>
                                    <div className='col-2' style={{ margin: "0px 18px 0px 3px" }}>
                                        <div style={{ fontSize: "16px" }}>
                                            <div style={{ position: "relative", top: "300px", paddingLeft: "4px" }}>
                                                <span style={{ fontSize: "20px", }}>{Math.ceil(list1[key][0].internalBenchmark).toFixed(1)}</span><br />
                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Internal</span><br />
                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Benchmark</span></div>
                                        </div>
                                        {/* <div style={{ padding: Math.ceil(Math.ceil(Val.[`data${key}`][0].internal_bench) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].internal_bench) * 9.2) : 92, width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[2].color }} > */}

                                        <div style={{ padding: impValFn((list1[key][0].internalBenchmark), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[2].color }} >
                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                        </div>
                                    </div>
                                    <div className='col-2'>
                                        <div style={{ fontSize: "16px" }}>
                                            <div style={{ position: "relative", top: "300px", right: "-24%" }}>
                                                <span style={{ fontSize: "20px", }}>{Math.ceil(list1[key][0].externalBenchmark).toFixed(1)}</span><br />
                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>External </span><br />
                                                <span style={{ fontWeight: "initial", fontSize: "10px" }}>Benchmark</span></div>
                                        </div>
                                        {/* <div style={{ padding: Math.ceil(Math.ceil(Val.[`data${key}`][0].external_bench) * 9.2) <= 92 ? Math.ceil(Math.ceil(Val.[`data${key}`][0].external_bench) * 9.2) : 92, width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[3].color }} > */}

                                        <div style={{ padding: impValFn((list1[key][0].externalBenchmark), 1, 9.2), width: 20, height: 20, transform: `translate(-50%,-50%)`, borderRadius: "100%", opacity: 0.8, backgroundColor: colorOptions.slices[3].color }} >
                                            <div className="sqr_bar " style={{ borderLeft: "1px solid rgb(38,38,38)", height: "300px" }}></div>
                                        </div>

                                    </div>
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

                    <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px" }}>

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
                                        <span style={{ fontSize: "12px", textAlign: "center", marginLeft: "5px" }}>{Math.ceil(Val.[`data${key}`][0].survey_mean).toFixed(1)}</span><br>
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
                                        <span style={{ fontSize: "12px", textAlign: "center", marginLeft: "5px" }}>{parseFloat(item.answer).toFixed(1)}</span><br>
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
                                        <span style={{ fontSize: "12px", textAlign: "center", marginLeft: "5px" }}>{Math.ceil(Val.[`data${key}`][0].internal_bench).toFixed(1)}</span><br>
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
                                        <span style={{ fontSize: "12px", textAlign: "center", marginLeft: "5px" }}>{Math.ceil(Val.[`data${key}`][0].external_bench).toFixed(1)}</span><br>
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
                <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", }}>

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


                <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", }}>

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



                <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", }}>

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
                <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", }}>

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

                                                        <div className='grp' style={{ position: "relative", left: "5px", textAlign: "end", fontSize: "12px", color: "black", top: "30px", width: "184px", height: "10px" }}>
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
{/* page ------ 6 */}
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
                <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", }}>

                    <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                        <div className="square_bar"></div>
                        <div className='page_left_header' >
                            <span className='text-future-potential'>Think-Act-Feel Leadership Rating</span>
                            {/* </br><span>Potential</span> */}
                        </div>

                        <div style={{ fontSize: "7px", position: "relative", bottom: "50px" }}>
                            {impVal4 && Val4 ? (
                                <>
                                    {Array.from({ length: 3 }, (item, key) => (
                                        <div className='row ' >

                                            <div className='col-lg-4 ' style={{ borderLeft: key % 0 == 0 ? "1px solid rgb(209,209,209)" : "", borderBlockEnd: key != 2 ? "1px solid rgb(209,209,209)" : "" }} >

                                                {[Val4.[`data${key}`][0].length > 0] ? (
                                                    <>

                                                        {/* <h1>{list1[3][key][0].surveyMean}</h1> */}

                                                        <div style={{ position: "relative", bottom: "60px", left: "-70px", paddingTop: "40px" }}>

                                                            <div className='grp' style={{ position: "relative", left: "5px", textAlign: "end", fontSize: "12px", color: "black", top: "30px", width: "184px", height: "10px" }}>
                                                                {/* {item.option} */}
                                                            </div>
                                                            <div className='grp' style={{ position: "relative", width: "100px", height: "34px", fontSize: "10px", }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][0].surveyMean)]} color={colorOptions.slices[0].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={inputListFinal[0].Feature3[key].range_val} color={colorOptions.slices[1].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][0].internalBenchmark)]} color={colorOptions.slices[2].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][0].externalBenchmark)]} color={colorOptions.slices[3].color} />

                                                            </div>

                                                        </div>

                                                    </>
                                                ) : null}
                                            </div>

                                            <div className='col-lg-4 ' style={{ borderLeft: key % 1 == 0 ? "1px solid rgb(209,209,209)" : "", borderBlockEnd: key != 2 ? "1px solid rgb(209,209,209)" : "" }} >

                                                {[Val4.[`data${key}`][0].length > 0] ? (
                                                    <>

                                                        <div style={{ position: "relative", bottom: "60px", left: "-70px", paddingTop: "40px" }}>

                                                            <div className='grp' style={{ position: "relative", left: "5px", textAlign: "end", fontSize: "12px", color: "black", top: "30px", width: "184px", height: "10px" }}>
                                                                {/* {item.option} */}
                                                            </div>
                                                            <div className='grp' style={{ position: "relative", width: "100px", height: "34px", fontSize: "10px", }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][1].surveyMean)]} color={colorOptions.slices[0].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={inputListFinal[0].Feature3[key].range_val1} color={colorOptions.slices[1].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][1].internalBenchmark)]} color={colorOptions.slices[2].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][1].externalBenchmark)]} color={colorOptions.slices[3].color} />

                                                            </div>

                                                        </div>

                                                    </>
                                                ) : null}
                                            </div>

                                            <div className='col-lg-4 ' style={{ borderLeft: key % 1 == 0 ? "1px solid rgb(209,209,209)" : "", borderBlockEnd: key != 2 ? "1px solid rgb(209,209,209)" : "" }} >

                                                {[Val4.[`data${key}`][0].length > 0] ? (
                                                    <>

                                                        <div style={{ position: "relative", bottom: "60px", left: "-70px", paddingTop: "40px" }}>

                                                            <div className='grp' style={{ position: "relative", left: "5px", textAlign: "end", fontSize: "12px", color: "black", top: "30px", width: "184px", height: "10px" }}>
                                                                {/* {item.option} */}
                                                            </div>
                                                            <div className='grp' style={{ position: "relative", width: "100px", height: "34px", fontSize: "10px", }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][2].surveyMean)]} color={colorOptions.slices[0].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={inputListFinal[0].Feature3[key].range_val2} color={colorOptions.slices[1].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][2].internalBenchmark)]} color={colorOptions.slices[2].color} />

                                                            </div>
                                                            <div className='grp ' style={{ position: "relative", width: "100px", height: "34px" }}>
                                                                <GraphVerticalBars percentage={[Math.ceil(list1[3][key][key].externalBenchmark)]} color={colorOptions.slices[3].color} />

                                                            </div>

                                                        </div>

                                                    </>
                                                ) : null}
                                            </div>
                                        </div>


                                    ))}


                                    <div className='row' style={{ position: "relative", bottom: "-70px", fontSize: "8px", left: "-1px" }}>
                                        {/* <hr style={{ width: "102%", textAlign: 'left', marginLeft: 0 }} /> */}


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



                                    {/* <div className='col-lg-6 ' style={{ borderLeft: "1px solid rgb(209,209,209)", fontWeight: "lighter" }} >
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

                                    </div> */}




                                </>
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

                <div style={{ position: "relative", top: "48px", left: "-5px", fontSize: "40px", }}>

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
                                        <div className='grp' style={{ position: "relative", left: "290px", fontSize: "20px", color: "black", top: "30px", width: "100px", height: "40px" }}>
                                            Think
                                        </div>

                                    </div>

                                </div>
                                <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                                    <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                                        <div className='grp' style={{ position: "relative", left: "290px", fontSize: "20px", color: "black", top: "30px", width: "100px", height: "40px" }}>
                                            Act
                                        </div>


                                    </div>

                                </div>
                                <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: "1px solid rgb(209,209,209)" }}>
                                    <div style={{ position: "relative", bottom: "20px", right: "240px", }}>
                                        <div className='grp' style={{ position: "relative", left: "290px", fontSize: "20px", color: "black", top: "30px", width: "100px", height: "40px" }}>
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
                <div style={{ position: "relative", top: "58px", left: "15px", fontSize: "40px", }}>

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
