import React, { useState } from 'react'
import CalcBtn from './components/CalcBtn/CalcBtn'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [operator, setOperator] = useState('')
  let previousVal = 0

  let buttons = [
    'C',
    '+/-',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
  ]

  const reset = () => {
    setDisplay('0')
    setOperator('')
  }

  const toggleSign = () => {
    if (
      !isNaN(display.charAt(0)) &&
      (display.charAt(0) !== '0' || display.substring(0, 2) === '0.') &&
      display.length < 9
    ) {
      setDisplay('-'.concat(display))
    } else if (display.charAt(0) === '-') {
      setDisplay(display.substring(1))
    }
  }

  const handleOperator = (value) => {
    if (previousVal !== 0 && operator !== '' && value === '=') {
      operate(operator)
      setOperator('')
    }
  }

  const operate = (sign) => {}

  const actionReceiver = (value) => {
    if (value === 'C') {
      reset()
    } else if (value === '+/-') {
      toggleSign()
    } else if (isNaN(value) && value !== '.') {
      handleOperator(value)
    } else {
      if (display.length < 9 && display !== '0') {
        setDisplay(display.concat(value))
      } else if (display === '0') {
        if (value === '.') {
          setDisplay(display.concat(value))
        } else {
          setDisplay(value)
        }
      }
    }
  }

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="numpad">
        {buttons.map((elem) => {
          let type
          if (!isNaN(+elem) || elem === '.') {
            type = 'number'
          } else {
            if (elem === '*' || elem === '+' || elem === '-' || elem === '/' || elem === '=') {
              type = 'operator'
            } else {
              type = 'util'
            }
          }
          return (
            <CalcBtn
              clickHandler={actionReceiver}
              value={elem}
              type={type}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
