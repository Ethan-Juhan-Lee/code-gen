import { FC, useEffect, useState } from 'react'
import Square from './Square'

const INITIAL_GAME_STATE = ['', '', '', '', '', '', '', '', '']
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const Game: FC = () => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE)
  const [currentPlayer, setCurrentPlayer] = useState('x')

  useEffect(() => {
    checkForWinner()
  }, [gameState])

  const resetBoard = (): void => {
    setGameState(INITIAL_GAME_STATE)
  }

  const handleWin = (): void => {
    window.alert(`Congrats player ${currentPlayer}! You are the winner!`)
    resetBoard()
  }
  const handleDraw = (): void => {
    window.alert('The game ended in a draw')
    resetBoard()
  }

  const checkForWinner = (): void => {
    let roundWon = false
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i]

      const a = gameState[winCombo[0]]
      const b = gameState[winCombo[1]]
      const c = gameState[winCombo[2]]

      if ([a, b, c].includes('')) {
        continue
      }

      if (a === b && b === c) {
        roundWon = true
        break
      }
    }
    if (roundWon) {
      setTimeout(() => {
        handleWin()
      }, 500)
      return
    }
    if (!gameState.includes('')) {
      setTimeout(handleDraw, 500)
      return
    }

    changePlayer()
  }

  const changePlayer = (): void => {
    setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
  }

  const handleCellClick = (event: any): void => {
    const cellIndex = Number(event.target.getAttribute('data-cell-index'))

    const currentValue = gameState[cellIndex]

    if (currentValue !== '') {
      return
    }

    const newValues = [...gameState]
    newValues[cellIndex] = currentPlayer
    setGameState(newValues)
  }

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-t from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 text-white">
        Tic Tac Toe Game Page
      </h1>
      <div className="grid grid-cols-3 gap-3 mx-auto w-96">
        {gameState.map((player, index) => (
          <Square
            key={index}
            onClick={(event) => {
              handleCellClick(event)
            }}
            {...{ index, player }}
          ></Square>
        ))}
      </div>
      <div>Score Goes Here</div>
    </div>
  )
}
