import React from 'react'
import PropTypes from 'prop-types'
import './CalcBtn.css'

function CalcBtn({ clickHandler, value, type }) {
  return (
    <button value={value} onClick={() => clickHandler(value)} className={`calcbtn ${type}`} type="button">
      {value}
    </button>
  )
}

CalcBtn.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default CalcBtn
