import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import image from '../../assets/images/default-logo.png'

const TokenExpiredPage = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location)
  }, [])
  return (
    // <div>{location.state ? location.state : "token expired"}</div>

    <section className="about-area about-back-bg pt-120 pb-85 mb0">
      <img className='m-3' src={image} style={{ padding: "5px" }} height={`60px`} />

      <div className="container fullwidthcont">
        <div className='text-center' style={{ fontSize: "50px", position: "relative", bottom: "-350px" }}>! {location.state ? location.state : "token expired"}</div>
      </div>
    </section>

  )
}

export default TokenExpiredPage