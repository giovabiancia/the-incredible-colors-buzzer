import React, {useContext} from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { GameContext } from './../context/GameContext';

const LeaderBoard:React.FC=()=> {
    const [game] = useContext(GameContext)
    const history = useHistory()
    const goToHome=()=>{
        // torna alla home
        history.push('/')
    }

    return (
        <Container>
            <Row>
                <Col className="center">
                    <h1>Leaderboard</h1>
                </Col>

            </Row>

            <Row>
                <Col className="center mt-4 ">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Nome giocatore</th>
                        <th>Punteggio</th>

                        </tr>
                    </thead>
                    <tbody>
                        {game.map((g:any,i:number)=>
                        <tr key = {i}>
                            <td>{i+1}</td>
                            <td style={{textTransform: "uppercase"}}>{g.playerName}</td>
                            <td>{g.punteggio}</td>
                        </tr>


                        )}
                    </tbody>
                </Table>
                </Col>
            </Row>
            <Row>
                <Col >
                    <button className="btn btn-primary" onClick={goToHome}>Home</button>
                </Col>

            </Row>

        </Container>
    )
}
export default LeaderBoard
