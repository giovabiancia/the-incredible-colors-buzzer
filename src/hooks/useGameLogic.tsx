import { useState, useContext, useEffect } from 'react'
import { GameContext } from '../context/GameContext';


export default function useTimer(){
    const [millisecondi, setMillisecondi ] = useState(0);
    const [playerName, setPlayerName] = useState('')
    const [secondi, setSecondi ] = useState(0);
    const [intervalID, setIntervalID] = useState(-1);
    const [gameDuration, setGameDuration] = useState(10)
    const [showModal, setShowModal] = useState(false);
    const [start, setStart] = useState(false)
    const [timeStart, setTimeStart] = useState(0)
    const [showInputModal, setShowInputModal] = useState(false);
    const [restart, setRestart] = useState(false)
    const [over, setOver] = useState(false);
    const [champion, setChampion] = useState(false)
    const [showChampion, setShowChampion] = useState(false)
    const [punteggio, setPunteggio ] = useState(0);
    const [mainColor, setMainColor] = useState('gray')
    const [vita, setVita] = useState(1)
    const [game,setGame] = useContext(GameContext)
    const [buttonColors, setButtonColors] = useState(['red', 'green', 'yellow', 'blue'])
    const gameDurationFixed = 10

    useEffect(() => checkConditions(), [punteggio]);

    useEffect(() => {
        setOver(false)
        //setChampion(false);
        var starts = Date.now()
        setTimeStart(()=>starts)
        return ()=>{setOver(true)}
    }, [start])

    useEffect(() => {

        let min = 0.5;
        let max = 1.5;
        let randomRange = Math.random() * (max - min) + min;
        setTimeout(() => {
            const colorsArray = ["red","blue","green","yellow"];
            const random = Math.floor(Math.random() * colorsArray.length);
            setMainColor(colorsArray[random])
            tick(false)
        },randomRange*1000);
    }, [restart])




    const tick = (click:boolean) => {
        var end:Date = new Date();
          // se clicca bottone fai partire un nuovo intervallo
            if (click) {

                let timeNow = secondi + (millisecondi/1000)
                // se il tempo è maggiore di 1/5 diminuisci dal tempo totale 0,2
                if(timeNow > gameDurationFixed/5){
                    clearInterval(intervalID)
                    end.setSeconds(end.getSeconds() + gameDuration );
                    setGameDuration((prev)=>prev-0.2)
                }else{
                    // altrimenti riparti da 1/5 del totale del tempo
                    clearInterval(intervalID)
                    end.setSeconds(end.getSeconds() + gameDurationFixed/5 );
                }
            }else{
                // se non è un click fai partire il tempo
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
      const checkConditions = ()=>{
        // se sono le prime 10 giocate salvali tutti ho messo 2 per semplificare il debug
        if (game.length < 10){
            setShowInputModal(true)
        }
        // se non sono le prime 10
        if (game.length >=10){
            // controlla che il punteggio attuale sia tra i primi 10 della leaderboard

            for (var i = 0; i < game.length; i++) {
                var oldPoint = game[i].punteggio

                if(punteggio>oldPoint){
                    // se è tra i migliori 2
                    if(i<2){
                        setShowInputModal(true)
                    }
                    // se è il migliore
                    if(i===0){
                        setShowInputModal(true)
                        setChampion(true)
                    }
                }
            }
        }

    }
    const handleTryAgain=()=>{
        // salvo la giocata
        setChampion(false)
        handleCloseModal()
        setShowInputModal(false)
        // ricomincia
        setRestart((prev) =>!prev)
        if (vita === 3 ){
            setVita(0)
            let objGame = {
                playerName: playerName,
                punteggio: punteggio,
            }
            setGame((prev:any) =>[...prev, objGame ])
        }
        setVita((prev)=>prev+1)
    }
    const handleKeepGoing=()=>{
        // salvo la giocata
        handleCloseModal()
        setShowInputModal(false)
        // ricomincia
        setRestart((prev) =>!prev)
        setVita((prev)=>prev+1)

    }
    const handleCloseModal = () => {
        setShowModal(false)
        setPlayerName('')
        if(vita===3){
            setPunteggio(0)
        }
        setOver(true)
        setGameDuration(10)
    }

    const handleButtonClick=(color:string, timeClick:number) => {
        let buttonSound = new Audio("/buttonSound.wav")
        buttonSound.play()
        // CAMBIA ORDINE AI COLORI
        var randomOrder = buttonColors.sort(func);
        function func(a:string, b:string) {
        return 0.5 - Math.random();
        }
        setButtonColors(randomOrder)
        if(color===mainColor){
            // se il click è giusto faccio ripartire un altro timer
            tick(true)
            // cambio i colori ai bottoni in modo casuale
            const colorsArray = ["red","blue","green","yellow"];
            const random = Math.floor(Math.random() * colorsArray.length);
            setMainColor(colorsArray[random])

            // assegno un punteggio in base al range di tempo rimanente sull' orologio in quel momento
            let timeDifference = (timeClick-timeStart) /1000
            let middle= (gameDurationFixed/3)*2
            let last = (gameDurationFixed/3)

            if (timeDifference<gameDurationFixed && timeDifference>middle){
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
            setOver(true);
        }else if(over){
            setShowModal(true);
        }
    }
    return{
        millisecondi, secondi, intervalID,gameDuration,  punteggio, over, champion, showModal,  showInputModal,mainColor,playerName, vita, buttonColors,showChampion,setShowChampion,handleKeepGoing, setButtonColors,handleButtonClick, handleTryAgain,  setVita, handleCloseModal, setPlayerName,  setMainColor, setShowInputModal,  setOver, setPunteggio, tick, checkConditions, setChampion, setGameDuration, setIntervalID, setShowModal
    }
}
