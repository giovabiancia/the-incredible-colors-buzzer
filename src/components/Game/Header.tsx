import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch,RootStateOrAny } from "react-redux";
interface Header {
    punteggio: number;
}

const Header=(props:Header)=> {
    const punteggio = useSelector((state: RootStateOrAny) => {
    return state.punteggio})
    const history = useHistory()

    const goToHome=()=>{
        history.push('/')

    }
    return (

            <Row  className="mb-100">
                <Col className="center mt-4">
                    <h4 className="handler" onClick={goToHome}>Exit</h4></Col>
                <Col className="center mt-4"><h4>punteggio: {props.punteggio}</h4></Col>
            </Row>

    )
}
export default Header
