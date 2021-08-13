import React , {useCallback, useEffect, useState, useContext} from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import Header from '../components/Game/Header'
import Countdown from 'react-countdown';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { GameContext } from './../context/GameContext';
import ReactAudioPlayer from 'react-audio-player';
import  axios  from 'axios';




const Game:React.FC=()=> {
    const [mainColor, setMainColor] = useState('gray')
    const [playerName, setPlayerName] = useState('')
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
    const [gameDuration, setGameDuration] = useState(10)
    const [game,setGame] = useContext(GameContext)
    const [champion, setChampion] = useState(false)
    const [buttonColors, setButtonColors] = useState(['red', 'green', 'yellow', 'blue'])

    const gameDurationFixed = 10




  const tick = (click:boolean, timeClick:number) => {
    var end:Date = new Date();

      // se è il click del bottone.. clearInterval
        if (click) {
            console.log('tempo trascorso in secondi'+ (gameDuration- secondi))
            console.log('secondi '+ secondi)
            console.log('millisecondi '+ millisecondi)
            let timeNow = secondi + (millisecondi/1000)
            console.log('timeNow secondi + millisecondi '+ timeNow)

            if(timeNow > gameDurationFixed/5){
                // se il tempo è maggiore di 1/5
                clearInterval(intervalID)
                end.setSeconds(end.getSeconds() + gameDuration );
                setGameDuration((prev)=>prev-0.2)
            }else{
                clearInterval(intervalID)
                end.setSeconds(end.getSeconds() + gameDurationFixed/5 );
               //
            }
        }else{
            end.setSeconds(end.getSeconds() + gameDuration); // 10 s
        }
        setStart((prev) => !prev)
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
        let buttonSound = new Audio("/buttonSound.wav")
        buttonSound.play()


        // CAMBIA ORDINE AI COLORI

        var randomOrder = buttonColors.sort(func);

        function func(a:string, b:string) {
        return 0.5 - Math.random();
        }

        setButtonColors(randomOrder)

        if(color==mainColor){
            // se il click è giusto faccio ripartire un altro timer
            tick(true,  Date.now())

            // cambio i colori ai bottoni in modo casuale
            const colorsArray = ["red","blue","green","yellow"];
            const random = Math.floor(Math.random() * colorsArray.length);
            setMainColor(colorsArray[random])

            // assegno un punteggio in base al range di tempo
            let timeDifference = (timeClick-timeStart) /1000
            let middle= (gameDuration/3)*2
            let last = (gameDuration/3)

            if (timeDifference<gameDuration && timeDifference>middle){
                setPunteggio((prev)=>prev+50)

            }else if (timeDifference<middle && timeDifference>last){
                setPunteggio((prev)=>prev+25)
            }else if (timeDifference<last && timeDifference>0){
                setPunteggio((prev)=>prev+10)
            }

        }
        if(color!==mainColor) {
            // se sbaglia mostro modal azzero intervallo
            setShowModal(true);
            clearInterval(intervalID);
            setIntervalID(-1);
            setMainColor('gray')
        }else if(over){
            setShowModal(true);
        }


    }

    const handleCloseModal = () => {
        setShowModal(false)
        setPlayerName('')
        setPunteggio(0)
        setOver(false)
        setGameDuration(10)
    }

    const handleTryAgain=()=>{
        // salvo la giocata
        let objGame = {
            playerName: playerName,
            punteggio: punteggio,
        }
        setGame((prev:any) =>[...prev, objGame ])
        handleCloseModal()
        setShowInputModal(false)
        // ricomincia
        setRestart((prev) =>!prev)
    }
    const goToHome=()=>{
        // torna alla home
        history.push('/')
    }

    useEffect(() => checkConditions(), [punteggio]);

    const checkConditions = ()=>{
        // se sono le prime 10 giocate salvali tutti ho messo 2 per semplificare il debug

        if (game.length < 2){
            setShowInputModal(true)
        }
        // se non sono le prime 10
        if (game.length >=2){
            // controlla che il punteggio attuale sia tra i primi 10 della leaderboard
            for (var i = 0; i < game.length; i++) {
                var oldPoint = game[i].punteggio
                console.log('punteggi passati:'+ oldPoint)

                if(punteggio>oldPoint){
                    if(i<2){
                        setShowInputModal(true)
                    }
                    if(i===1){
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
                {buttonColors.map((color)=>
                    <Col  xs='3'  className="center mt-4"><div className={"buttonLight "+color} onClick={()=>handleButtonClick(color, Date.now())}></div></Col>

                )}
            </Row>
            <Row className="mt-4">
                <Col className="center mt-4 ">
                    <ReactAudioPlayer
                    src={'/supermario.mp3'}
                    autoPlay={true}
                    muted={over}
                    loop
                    volume={0.4}
                    controls
                    />
                </Col>
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
