import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Landing:React.FC=()=> {
    const history = useHistory()
    const goToGame=()=>{
        history.push('/game')
    }
    const goToLeaderBoard=()=>{
        history.push('/leader-board')
    }

    return (
        <Container  >
            <Row  style={{height:'100vh'}}>
                <Col className="center mt-4" style={{flexDirection:'column'}} sm='12'>
                    <h1 style={{textAlign:'center'}}>The incredible color buzzer</h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className="btn buttonHome" onClick={goToGame}>Start</button>
                    <button className="btn buttonHome mt-4" onClick={goToLeaderBoard}>Leader Board</button>

                </Col>

            </Row>

        </Container>
    )
}
export default Landing
