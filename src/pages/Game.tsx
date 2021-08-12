import React , {useCallback, useEffect, useState, useContext} from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import Header from '../components/Game/Header'
import Countdown from 'react-countdown';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { GameContext } from './../context/GameContext';


const Game:React.FC=()=> {
    const [mainColor, setMainColor] = useState('gray')
    const [playerName, setPlayerName] = useState('')
    const [counter, setCounter] = useState(0)
    const [over, setOver] = useState(false);
    const [millisecondi, setMillisecondi ] = useState(0);
    const [secondi, setSecondi ] = useState(0);
    const [intervalID, setIntervalID] = useState(-1);
    const [restart, setRestart] = useState(false)
    const [start, setStart] = useState(false)
    const [punteggio, setPunteggio ] = useState(0);
    const [timeStart, setTimeStart] = useState(0)
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
    const [gameDuration, setGameDuration] = useState(5)
    const [game,setGame] = useContext(GameContext)
    const [champion, setChampion] = useState(false)


  const tick = (click:boolean, timeClick:number) => {

      // se è il click del bottone.. clearInterval
        if (click) {
            // cancello l'intervallo attuale e ne faccio un altro
            clearInterval(intervalID)
            // end non è più i secondi attuali + la durata del gioco
            // ma i secondi trascorsi
            var end:Date = new Date();
            // secondi trascorsi
            // tempo trascorso in secondi

            // DEVI FARE IN MODO CHE IL CRONOMETRO NON CAMBI .... POI SOTTRAI 0,2

            // input
            console.log('tempo trascorso in secondi'+ (gameDuration- secondi))

            console.log('secondi '+ secondi)
            console.log('millisecondi '+ millisecondi)

            console.log('secondi attuali', end.getSeconds())

            let mil = millisecondi/1000
            let time = secondi+mil
            console.log('secondi + millisecondi'+ time)

            // output il tempo finale aumentato di 0,2
            end.setSeconds(end.getSeconds() + time);


        }else{
            // nessun click
            var end:Date = new Date();
            end.setSeconds(end.getSeconds() + gameDuration); // 10 s
        }
        setStart((prev) => !prev)
      /*   console.log('TICK: start time'+timeStart) */

        var _second = 1000;
        var _minute = _second * 60;
        var timer:any;
        function showRemaining()
        {
            var now:Date = new Date();
            var distance = end.getTime() - now.getTime()
            if (distance < 0 ) {
                clearInterval( timer );
                setMillisecondi(0)
                setOver(true)
                // funzione per confrontarlo con quello degli ultimi 10
                setShowModal(true)

                checkConditions()

            }else{
                var seconds = Math.floor( (distance % _minute) / _second );
                var milliseconds = distance % _second;
                setMillisecondi(milliseconds)
                setSecondi(seconds)
            }
        }
        timer = setInterval(showRemaining, 10);
        setIntervalID(()=>timer)
  };


 // in un tempo che va da 0.5 a 1.5 la luce centrale mostra un colore.
    useEffect(() => {
        setOver(false)

        let min = 0.5;
        let max = 1.5;
        let randomRange = Math.random() * (max - min) + min;
        setTimeout(() => {
            const colorsArray = ["red","blue","green","yellow"];
            const random = Math.floor(Math.random() * colorsArray.length);
            setMainColor(colorsArray[random])
            tick(false, 0 )
            /* saveDate() */
        },randomRange*1000);
        // Il tempo parte dopo randomRange
    }, [restart])



    useEffect(() => {
        setChampion(false);


      var starts = Date.now()
      setTimeStart(()=>starts)
      /* console.log('useEffect: start time'+starts) */
    }, [start])




    const handleButtonClick=(color:string, timeClick:number) => {
        // a ogni click diminuisce il tempo di 0,2s
        /* console.log(secondi)
        console.log(millisecondi) */

        // devi richiamare la funzione tick()
        // dirgli che al click si diminuisce di 0,2 altrimenti continua normale

        if(color==mainColor){
            // DA FINIRE LA DIMINUIZIONE DI 0,2
            /* tick(true, timeClick) */
            const colorsArray = ["red","blue","green","yellow"];
            const random = Math.floor(Math.random() * colorsArray.length);
            setMainColor(colorsArray[random])
            let timeDifference = (timeClick-timeStart) /1000
            /* console.log('ButtonClick: timeStart'+timeStart)
            console.log('ButtonClick: timeClick'+timeClick)
            console.log('ButtonClick: timeDifference'+timeDifference) */
            let middle= (gameDuration/3)*2
            let last = (gameDuration/3)

            if (timeDifference<gameDuration && timeDifference>middle){
                setPunteggio((prev)=>prev+50)

            }else if (timeDifference<middle && timeDifference>last){
                setPunteggio((prev)=>prev+25)
            }else if (timeDifference<last && timeDifference>0){
                setPunteggio((prev)=>prev+10)
            }
            // se clicca quello giusto allora aumento il punteggio
            // salvo nello stato la giocata
        }
        if(color!==mainColor) {
            setShowModal(true);
            clearInterval(intervalID);
            setIntervalID(-1);
            setMainColor('gray')
        }else if(over){
            setShowModal(true);

        }
        console.log('handleButtonClick: setto punteggio')
        console.log('handleButtonClick punteggio: '+punteggio)

    }

    const handleCloseModal = () => {
        setShowModal(false)
        setPlayerName('')
        console.log('closeModal: riazzero punteggio')
        setPunteggio(0)

    }

    const handleTryAgain=()=>{
        // salvo la giocata
        console.log('handleTryAgain: salvo giocata')

        console.log('handleTryAgain punteggio: '+punteggio)
        let objGame = {
            playerName: playerName,
            punteggio: punteggio,

        }
        setGame((prev:any) =>[...prev, objGame ])
        handleCloseModal()
        setShowInputModal(false)
        setRestart((prev) =>!prev)
    }
    const goToHome=()=>{
        // torna alla home
        history.push('/')
    }

    useEffect(() => checkConditions(), [punteggio]);

    const checkConditions = ()=>{
        // se sono le prime 10 giocate salvali tutti ho messo 2 per semplificare il debug
        // PROBLEMA IL PUNTEGGIO QUI è 0
        console.log('checkConditions: controllo condizioni')
        console.log('checkConditions punteggio: '+punteggio)

        if (game.length < 2){

            setShowInputModal(true)
        }
        // se non sono le prime 10
        if (game.length >=2){
            // controlla che il punteggio attuale sia tra i primi 10 della leaderboard
            for (var i = 0; i < game.length; i++) {
                var oldPoint = game[i].punteggio

                if(punteggio>oldPoint){
                    if(i<2){
                        setShowInputModal(true)
                    }
                    if(i==1){
                        console.log('you are the champion')
                        setChampion(true)
                    }
                }
            }
        }
    }



    return (
        <Container>

            <Header punteggio ={punteggio}></Header>
            <Row>
                <Col className=" mt-4 mb-4">

                  {/*   <h1>{`${s.toString().padStart(2, '0')}`}</h1> */}
                  <div >
                    <h1 style={{textAlign: 'center'}}>{secondi}.{millisecondi}</h1>
                  </div>

                </Col>
            </Row>
            <Row >
                <Col className="center "><div className={'mainLight '+mainColor}></div></Col>
            </Row>
            <Row className="buttonBar mt-4">
                <Col  xs='3'  className="center mt-4"><div className="buttonLight red" onClick={()=>handleButtonClick('red', Date.now())}></div></Col>
                <Col  xs='3'  className="center mt-4"><div className="buttonLight blue" onClick={()=>handleButtonClick('blue', Date.now())}></div></Col>
                <Col  xs='3'  className="center mt-4"><div className="buttonLight green" onClick={()=>handleButtonClick('green', Date.now())}></div></Col>
                <Col  xs='3'  className="center mt-4"><div className="buttonLight yellow" onClick={()=>handleButtonClick('yellow', Date.now())}></div></Col>
            </Row>



            <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
                <Modal.Header closeButton >
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>Gioco Terminato!
                    {champion && <h4>Sei il campione !!</h4>}

                    {showInputModal &&
                    <div >
                        <p >Congratulazioni il tuo punteggio di {punteggio} rientra tra i primi 2 della leaderBoard</p>
                        <input placeholder="inserici il tuo nome" type="text"  maxLength={3} value={playerName} onChange={(e)=>setPlayerName(e.target.value)}></input>
                    </div>

                    }


                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleTryAgain}>
                    Riprova a giocare
                </Button>
                <Button variant="primary" onClick={goToHome}>
                    Torna a Home
                </Button>
                </Modal.Footer>
            </Modal>


        </Container>
    )
}
export default Game
