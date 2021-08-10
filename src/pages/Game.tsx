import React , {useEffect, useState} from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import Header from '../components/Game/Header'
import Countdown from 'react-countdown';
import { useHistory } from 'react-router-dom';


const Game:React.FC=()=> {
    const [mainColor, setMainColor] = useState('gray')
    const [countDown, setCountDown] = useState(30)
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [millisecondo, setMillisecondo ] = useState(0);
    const [secondo, setSecondo ] = useState(0);
    const [punteggio, setPunteggio ] = useState(0);
    const history = useHistory()

 /* /60000 mi trovo i minuti

    minuti (63000) % 60000  --> 3000 /1000  */

  const [showModal, setShowModal] = useState(false);

  const tick = () => {
      /* setInterval(()=>{
          setMillisecondo((s)=>s-1);
      },1
      ) */

      /* var startTime = Date.now();

      setInterval(function() {
            var elapsedTime = Date.now() - startTime;
            var eTime = (elapsedTime / 1000).toFixed(3)
            setMillisecondo(eTime)
        }, 100); */
        var end:Date = new Date();
        // il gioco dura n secondi
        end.setSeconds(end.getSeconds() + 10);
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour *24;
        var timer:any;

        function showRemaining()
        {
            var now:Date = new Date();
            var distance = end.getTime() - now.getTime()

            if (distance < 0 ) {
            // handle expiry here..
            clearInterval( timer ); // stop the timer from continuing ..
            setMillisecondo(0)
            setOver(true)
            //alert('Expired'); // alert a message that the timer has expired..
            }else{
                var days = Math.floor(distance / _day);
                var hours = Math.floor( (distance % _day ) / _hour );
                var minutes = Math.floor( (distance % _hour) / _minute );
                var seconds = Math.floor( (distance % _minute) / _second );
                var milliseconds = distance % _second;
                 setMillisecondo(milliseconds)
                setSecondo(seconds)

            }

        }
        timer = setInterval(showRemaining, 10);
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
            tick()

        },randomRange*1000);
    }, [])


    const handleButtonClick=(color:string) => {
        if(color!==mainColor) {
            setShowModal(true);
            // imposta il timer a 0 e il punteggio a 0 il colore a grigio
        }else{
            // se clicca quello giusto allora aumento il punteggio
        }
    }
    const handleCloseModal = () => setShowModal(false);

    const handleTryAgain=()=>{
        // imposto il timer a 0 e il punteggio a 0
    }

    const goToHome=()=>{
        // torna alla home
        history.push('/')
    }



    return (
        <Container>

            <Header punteggio ={punteggio}></Header>
            <Row>
                <Col className=" mt-4 mb-4">

                  {/*   <h1>{`${s.toString().padStart(2, '0')}`}</h1> */}
                  <div >
                    <h1 style={{textAlign: 'center'}}>{secondo}.{millisecondo}</h1>
                  </div>




                </Col>
            </Row>
            <Row >
                <Col className="center "><div className={'mainLight '+mainColor}></div></Col>
            </Row>
            <Row className="buttonBar mt-4">
                <Col  xs='3'  className="center mt-4"><div className="buttonLight red" onClick={()=>handleButtonClick('red')}></div></Col>
                <Col  xs='3'  className="center mt-4"><div className="buttonLight blue" onClick={()=>handleButtonClick('blue')}></div></Col>
                <Col  xs='3'  className="center mt-4"><div className="buttonLight green" onClick={()=>handleButtonClick('green')}></div></Col>
                <Col  xs='3'  className="center mt-4"><div className="buttonLight yellow" onClick={()=>handleButtonClick('yellow')}></div></Col>
            </Row>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton >
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>Hai sbagliato colore!</Modal.Body>
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
