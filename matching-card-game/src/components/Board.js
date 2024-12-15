import React, { useState, useEffect } from "react"
import "../styles/Board.css"
import { Fruits } from "../assets/Fruits"
export default function Board() {
    const [board, setBoard] = useState([
        [[" ", 0], [" ", 0], [" ", 0], [" ", 0], [" ", 0]],
        [[" ", 0], [" ", 0], [" ", 0], [" ", 0], [" ", 0]],
        [[" ", 0], [" ", 0], [" ", 0], [" ", 0], [" ", 0]],
        [[" ", 0], [" ", 0], [" ", 0], [" ", 0], [" ", 0]],
    ])

    const [matched, setMatched] = useState(0)
    const [secondClick, setSecondClick] = useState(false)
    const [previousData, setPreviousData] = useState([])
    const [time, setTime] = useState()
    useEffect(() => {
        setGame()
    }, [])

    useEffect(() => {
        if (matched == 10) {
            setTimeout(() => {
                const totalTime = (Date.now() - time) / 1000
                window.alert(`CONGRATUALATIONS , YOU WON ! TIME : ${totalTime} SECONDS`)
                window.location.href = "/"
            }, 250)
        }
    }, [matched])

    function setGame() {

        var i, fruitLoopCounter;
        const bufferBoard = [...board]
        for (fruitLoopCounter = 0; fruitLoopCounter < 5; fruitLoopCounter++) {
            for (i = 0; i < 4; i++) {
                var a = Math.floor(Math.random() * 4)
                var b = Math.floor(Math.random() * 5)
                while (bufferBoard[a][b][0] != " ") {
                    a = Math.floor(Math.random() * 4)
                    b = Math.floor(Math.random() * 5)
                }
                bufferBoard[a][b][0] = Fruits[fruitLoopCounter]
            }
        }
        setBoard(bufferBoard)
        setTime(Date.now())

    }
    function handleClick(event) {
        if (event.target.className == "row-value-hidden") {
            event.target.classList.add("row-value-hidden-animation")
            setTimeout(() => {
                const i = event.target.parentElement.id;
                const j = event.target.id
                var matched = 0
                if (secondClick) {
                    if (board[previousData[0]][previousData[1]][0] == board[i][j][0]) {
                        setMatched(previousScore => previousScore + 1)
                        matched = 1
                        const revertBoard = [...board]
                        revertBoard[previousData[0]][previousData[1]][1] = 1
                        revertBoard[i][j][1] = 1
                        setBoard(revertBoard)
                        setPreviousData([])
                    }
                    else {
                        setTimeout(() => {
                            const revertBoard = [...board]
                            revertBoard[previousData[0]][previousData[1]][1] = 0
                            revertBoard[i][j][1] = 0
                            setBoard(revertBoard)
                            setPreviousData([])
                        }, 500)
                    }
                }
                setSecondClick(prevState => !prevState)
                event.target.classList.add("row-value-focus")

                const newVisiblityBoard = [...board];
                if (matched == 0)
                    newVisiblityBoard[i][j][1] = -1
                setPreviousData([i, j])

                setBoard(newVisiblityBoard)

            }, 250)
        }
        else
            return

    }
    return (

        <>
            <div className="main-wrapper">
                {board.map((row, rowIndex) => {
                    return <div className="row-wrapper" key={rowIndex} id={rowIndex}>
                        {row.map((value, valueIndex) => {
                            return value[1] == 0 ?
                                <div key={valueIndex} className="row-value-hidden" id={valueIndex} onClick={handleClick}>  </div>
                                :
                                value[1] == 1 ?
                                    <div key={valueIndex} className="row-value-visible" id={valueIndex} onClick={handleClick}> {value[0]}</div>
                                    :
                                    <div key={valueIndex} className="row-value-focus" id={valueIndex} onClick={handleClick}>{value[0]} </div>

                        })}
                    </div>
                })}


            </div>
        </>
    )
} 