import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

interface HeaderProp {
    punteggio: number;
    vita:number
}

const Header=(props:HeaderProp)=> {

    const history = useHistory()

    const goToHome=()=>{
        history.push('/')

    }
    return (

            <Row  className="mb-100">
                <Col className="center mt-4">
                    <h4 className="handler" onClick={goToHome}>Exit</h4></Col>
                <Col className="center mt-4">
                    <h4>punteggio: {props.punteggio}</h4>
                    <h4 style={{marginLeft:30}}>vita: {props.vita}</h4>
                </Col>
            </Row>

    )
}
export default Header
