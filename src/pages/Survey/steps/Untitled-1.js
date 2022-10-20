{/* page ------ 6 */ }
{
    feedbackData ? (
        <>
            <div className=" row page-break feed_block_row"  >
                <div className='row' style={{ padding: "25px 0px 0px 25px" }}>
                    <div style={{ position: "relative", top: "-22px" }}>
                        {feedbackData ? (
                            <>
                                <span style={{ float: "left", paddingLeft: "15px", fontSize: "8px", textTransform: "uppercase" }} >{`${feedbackData[0].first_name} ${feedbackData[0].last_name}`} </span>
                                <span style={{ float: "left", paddingLeft: "5px", fontSize: "8px", textTransform: "uppercase" }} >/ {currDateForm}</span>
                                <span style={{ float: "right", paddingRight: "15px", fontSize: "8px" }} ><img className="logo_icon headerRightLogo" src={logo_icon} alt="company_logo" /></span>
                            </>
                        ) : null}
                        <div style={{ position: "relative", top: "24px", left: "15px", fontSize: "40px", fontWeight: "bold" }}>

                            <div style={{ textAlign: "justify", MozTextAlignLast: "justify" }}>
                                <div className="square_bar"></div>
                                <div className='page_left_header'>
                                    <span className='Think-Act-Feel-Leadership-Rating'>Think-Act-Feel Leadership Rating</span>
                                    {/* </br><span style={{ position: "relative", top: "-16px" }}>Leadership Rating</span> */}
                                </div>

                                <div style={{ fontSize: "7px", position: "relative", bottom: "54px" }}>

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
                                        <div className='row ' >
                                            {impVal4.map((item, key) => (
                                                <>



                                                    {[Val4.[`data${key}`][0].length > 0] ? (
                                                        <div className='col-lg-4 ' style={{ borderBlockEnd: "1px solid rgb(209,209,209)", borderLeft: key % 3 != 0 ? "1px solid rgb(209,209,209)" : "" }}>
                                                            <span style={{ fontWeight: "lighter", fontSize: "10px" }}>{item.option}</span>
                                                            <div style={{ position: "relative", bottom: "0px", left: "-14px" }}>

                                                                <Chart
                                                                    chartType="PieChart"
                                                                    data={[
                                                                        ["Task", "Hours per Day"],
                                                                        ["Survey Mean", [Math.ceil(Val4.[`data${key}`][0].survey_mean)] * 10],
                                                                        ["Self Assessment", item.answer * 10],
                                                                        ["Internal Benchmark", [Math.ceil(Val4.[`data${key}`][0].internal_bench)] * 10],
                                                                        ["External Benchmark", [Math.ceil(Val4.[`data${key}`][0].external_bench)] * 10],
                                                                    ]}
                                                                    options={{
                                                                        // title: "My Daily Activities",
                                                                        legend: "none",
                                                                        // legend: "none",
                                                                        // pieSliceText: "label",
                                                                        // title: item.option,
                                                                        // pieStartAngle: 100,
                                                                        slices: {
                                                                            0: { color: colorOptions.slices[0].color },
                                                                            1: { color: colorOptions.slices[1].color },
                                                                            2: { color: colorOptions.slices[2].color },
                                                                            3: { color: colorOptions.slices[3].color },

                                                                        },
                                                                    }}
                                                                    height={"80%"}
                                                                    width={"50%"}

                                                                />
                                                            </div>

                                                        </div>
                                                    ) : null}
                                                </>

                                            ))}





                                        </div>
                                    ) : null}




                                </div>



                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </>
    ) : null
}