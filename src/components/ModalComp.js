import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

const ModalComp = (props) => {
    const [notification, setnotification] = useState("truelllk");
    const [paymentNoti, setpaymentNoti] = useState(false);

    const propsData = props.data.notification;
    // const propsBolean = props.data.display;
    useEffect(()=>{
        setpaymentNoti(props.data.display)
    },[])

    return (
        <Modal
            size="lg"
            show={paymentNoti}
            onHide={() => setpaymentNoti(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>

            <Modal.Body className="success text-center mt-5">
                {/* <img style={{ height: "80px", width: "80px" }} src={Ico12} /> */}
                {/* <FaIconz.FaTimesCircle style={{ height: "60px", width: "60px" }} /> */}
            </Modal.Body>

            <Modal.Body className="success text-center text-danger bold h3">{propsData}</Modal.Body>
            <Modal.Body className="success text-center text-black bold" ><p style={{ cursor: 'pointer' }} onClick={() => setpaymentNoti(false)} >Ok</p></Modal.Body>

        </Modal>
    )
}

export default ModalComp
