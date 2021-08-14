import React from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import Header from '../components/Game/Header'
import { useHistory } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import useGameLogic from '../hooks/useGameLogic';





const Game:React.FC=()=> {


    const history = useHistory()
    const logic = useGameLogic()


    const goToHome=()=>{
        // torna alla home
        history.push('/')
    }


    return (
        <Container>

            <Header punteggio ={logic.punteggio} vita={logic.vita}></Header>
            <Row>
                <Col className=" mt-4 mb-4 center">
                  <div style={{height:'fit-content', width:200}}>
                    <h1 style={{marginLeft:65}} >{logic.secondi}.{logic.millisecondi}</h1>
                  </div>
                </Col>
            </Row>
            <Row >
                <Col className="center "><div className={'mainLight '+logic.mainColor}></div></Col>
            </Row>
            <Row className="buttonBar mt-4">
                {logic.buttonColors.map((color, i)=>
                    <Col key={i}  xs='3'  className="center mt-4"><div className={"buttonLight "+color} onClick={()=>logic.handleButtonClick(color, Date.now())}></div></Col>

                )}
            </Row>
            <Row className="mt-4">
                <Col className="center mt-4 ">
                    <ReactAudioPlayer
                    src={'/supermario.mp3'}
                    autoPlay={true}
                    muted={logic.over}
                    loop
                    volume={0.4}

                    />
                </Col>
            </Row>



            <Modal show={logic.showModal} onHide={logic.handleCloseModal} centered backdrop="static">
                <Modal.Header closeButton >
                <Modal.Title></Modal.Title>
                </Modal.Header>
                {logic.vita ===3 ?
                    <Modal.Body>Gioco Terminato!
                    {logic.champion && <h4>Sei il campione !!</h4>}

                    {logic.showInputModal &&
                    <div>
                        <p >Congratulazioni il tuo punteggio di {logic.punteggio} rientra tra i primi 2 della leaderBoard</p>
                        <input placeholder="inserici il tuo nome" type="text"  maxLength={3} value={logic.playerName} onChange={(e)=>logic.setPlayerName(e.target.value)}></input>
                    </div>
                    }
                    </Modal.Body>:
                    <Modal.Body>
                            <h4> Ti rimangono {3-logic.vita} vite</h4>

                    </Modal.Body>
                }

                <Modal.Footer>

                {logic.vita === 3 ?
                   <Button variant="secondary" onClick={logic.handleTryAgain}>Riprova a giocare</Button>:
                   <Button variant="secondary" onClick={logic.handleKeepGoing}>Continua</Button>
                }


                <Button variant="primary" onClick={goToHome}>
                    Torna a Home
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default Game
