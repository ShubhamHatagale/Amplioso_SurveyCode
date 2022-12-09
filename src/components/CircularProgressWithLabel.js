import React, { useState, useEffect } from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



function CircularProgressWithLabel(props) {
  const propData = props.data;

  const uid = JSON.parse(localStorage.getItem('survey_token'));
  const [RecordeData, setRecordeData] = useState()
  const [sumVal, setsumVal] = useState()

  const GetRecords = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response4 = fetch(`${process.env.REACT_APP_Base_URL_Backend}survey_feedback/${propData}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          console.log(result)
          console.log(result.data)
          setRecordeData(result.data)
          let MyValues = result.data;

          if (MyValues.length > 0) {
            MyValues.map((x, i) => {
              let Feature = eval(x.feature);
              let Feature1 = eval(x.feature1);
              let Feature2 = eval(x.feature2);
              let Feature3 = eval(x.feature3);
              let Feature4 = eval(x.feature4);
              let Feature5 = eval(x.feature5);
              let Feature6 = eval(x.feature6);
              let Feature7 = eval(x.feature7);
              let Feature8 = eval(x.feature8);


              var f1 = Feature ? Feature[0].range_val : 0;
              let f2 = Feature1 ? Math.ceil(Feature1.reduce((n, { range_val }) => n + parseInt(range_val), 0) / Feature1.length) : 0;
              let f3 = Feature2 ? Math.ceil((Feature2.reduce((n, { range_val }) => n + parseInt(range_val), 0)) / Feature2.length) : 0;
              let f4 = Feature3 ? Math.ceil((Feature3.reduce((n, { range_val }) => n + parseInt(range_val), 0) + Feature3.reduce((n, { range_val1 }) => n + parseInt(range_val1), 0) + Feature3.reduce((n, { range_val2 }) => n + parseInt(range_val2), 0)) / (Feature3.length * Feature3.length)) : 0;
              let f5 = Feature5 ? Feature5[0].range_val : 0

              console.log(parseInt(f1) + " " + parseInt(f2) + " " + parseInt(f3) + " " + parseInt(f4) + " " + parseInt(f5))
              let sum = (parseInt(f1) + parseInt(f2) + parseInt(f3) + parseInt(f4) + parseInt(f5)) * 2
              console.log(sum)
              setsumVal(sum)
            })
          }
        }


      })
  }

  useEffect(() => {
    console.log(propData)
    GetRecords()
  }, [])


  return (
    <div style={{ width: 100, height: 100, float: "right" }}>
      <CircularProgressbar value={sumVal ? sumVal : 0} strokeWidth={10} text={sumVal ? sumVal : "0"} />
    </div>
  );
}



export default CircularProgressWithLabel;