/* eslint no-restricted-globals: 0 */
/* tengan piedad porque si uso Number.isNaN literalmente deja de funcionar todo. mejor lo dejo con isNaN y somos felices todos :) */
import React, { useState } from 'react'
import CalcBtn from './components/CalcBtn/CalcBtn'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [operator, setOperator] = useState('')
  const [resetDisplay, setResetDisplay] = useState(false)
  const [previousVal, setPreviousVal] = useState(0)

  const buttons = [
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
    setPreviousVal(0)
    setResetDisplay(false)
  }

  const toggleSign = () => {
    if (
      !isNaN(display.charAt(0))
      && (display.charAt(0) !== '0' || display.substring(0, 2) === '0.')
      && display.length < 9
    ) {
      setDisplay('-'.concat(display))
    } else if (display.charAt(0) === '-') {
      setDisplay(display.substring(1))
    }
  }

  const operate = (sign) => {
    switch (sign) {
      case '+':
        if (previousVal + parseFloat(display) < 0 || previousVal + parseFloat(display) > 999999999){
          setDisplay('ERROR')
        } else {
          setDisplay((previousVal + parseFloat(display)).toString())
        }
        setPreviousVal(0)
        break
      case '-':
        if (previousVal - parseFloat(display) < 0){
          setDisplay('ERROR')
        } else {
          setDisplay((previousVal - parseFloat(display)).toString())
        }
        setPreviousVal(0)
        break
      case '*':
        if (previousVal * parseFloat(display) < 0 || previousVal * parseFloat(display) > 999999999){
          setDisplay('ERROR')
        } else {
          setDisplay((previousVal * parseFloat(display)).toString().substring(0, 10))
        }
        setPreviousVal(0)
        break
      case '/':
        if (display === '0' || previousVal / parseFloat(display) < 0 || previousVal / parseFloat(display) > 999999999) {
          setDisplay('ERROR')
        } else {
          setDisplay((previousVal / parseFloat(display)).toString().substring(0, 10))
        }
        setPreviousVal(0)
        break
      case '%':
        if (display === '0' || previousVal / parseFloat(display) < 0) {
          setDisplay('ERROR')
        } else {
          setDisplay((previousVal % parseFloat(display)).toString().substring(0, 10))
          setPreviousVal(0)
        }
        break
      default:
        break
    }
  }

  const handleOperator = (value) => {
    if (operator !== '' && value === '=') {
      operate(operator)
      setOperator('')
    } else if (operator === '' && value !== '=') {
      setOperator(value)
      setResetDisplay(true)
    }
  }

  const actionReceiver = (value) => {
    if (value === 'C') {
      reset()
    } else if (value === '+/-') {
      toggleSign()
    } else if (isNaN(value) && value !== '.') {
      handleOperator(value)
    } else if (!resetDisplay) {
      if (display.length < 9 && display !== '0') {
        setDisplay(display.concat(value))
      } else if (display === '0') {
        if (value === '.') {
          setDisplay(display.concat(value))
        } else {
          setDisplay(value)
        }
      }
    } else if (resetDisplay && (!isNaN(value) || value === '.')) {
      setPreviousVal(parseFloat(display))
      setDisplay(value === '.' ? '0.' : value)
      setResetDisplay(false)
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
          } else if (elem === '*' || elem === '+' || elem === '-' || elem === '/' || elem === '=') {
            type = 'operator'
          } else {
            type = 'util'
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
