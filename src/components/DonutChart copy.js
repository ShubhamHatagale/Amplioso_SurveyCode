import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function DonutChart(props, props2) {
    console.log(props)
    console.log(props2)

    const val1 = props.data.percentage_1;
    const val2 = props.data.percentage_2;
    const val3 = props.data.percentage_3;
    const val4 = props.data.percentage_4;



    return (
        <>
            <div style={{ width: 312, height: 312, position: "relative", left: "0%" }}>
                <CircularProgressbar
                    value={val1}
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

                        pathColor: `rgb(236,101,94, ${val1 / 100})`,
                        textColor: '#f88',
                        // trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                >



                </CircularProgressbar>
            </div>

            <div style={{ width: 252, height: 252, padding: "3px", position: "relative", left: "30px", bottom: "282px" }}>
                <CircularProgressbar
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



                </CircularProgressbar>
            </div>

            <div style={{ width: 192, height: 192, padding: "10px", position: "relative", left: "60px", bottom: "504px" }}>
                <CircularProgressbar
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



                </CircularProgressbar>
            </div>

            <div style={{ width: 123, height: 123, padding: "10px", position: "relative", left: "94px", bottom: "661px" }}>
                <CircularProgressbar
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



                </CircularProgressbar>
            </div>
        </>
    )
}
