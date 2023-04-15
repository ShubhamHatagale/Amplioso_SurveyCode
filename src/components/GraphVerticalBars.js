import React from 'react'

export default function GraphVerticalBars(props) {
    console.log(props);
    const percentage = Math.ceil(props.percentage);
    const color = props.color;

    return (
        <>
            <div className='graph_bar_test'>
                <div style={{ width: "100%", height: percentage * 10 > 100 ? "100%" : `${percentage * 8}%`, backgroundColor: color }}>
                    <div style={{ width: "98%", height: percentage * 10 + 5, backgroundColor: color }}>
                        {/* <div style={{ color: "white", transform: "rotate(-90deg)", textAlign: "start", fontSize: "8px" }}>{percentage > 100 ? "100%" : `${percentage}%`}</div> */}
                    </div> <div style={{ color: "white", transform: "rotate(-90deg)", textAlign: "end", fontSize: "8px",marginTop:"-5px" }}>{percentage > 10 ? "10.0" : `${percentage}.0`}</div>
                    {/* <span>{percentage}</span> */}
                </div>
            </div>

        </>
    )
}
