import React, { useState } from 'react'
import Controller from '../components/Controller'
import Footer from '../components/Footer'

const Converter = () => {
  const [inputValue, setInputValue] = useState(0)
  const handleInputChange = (e) => {
    const { value } = e.target
    setInputValue(value)
  }
  return (
    <div class="container">
      <div class="card-header">Network Speed Converter</div>
      <div class="card-body">
        <Controller />
        <div className="converter">
          <div className="flex-1">
            <div className="converter-title">Set</div>
            <input
              type="number"
              class="input-number"
              min="0"
              value={inputValue}
              onChange={handleInputChange} />
          </div>

          <span className="angle-icon fa-2x">
            <i className="fas fa-angle-right"></i>
          </span>

          <div className="text-right flex-1">
            <div className="converter-title">Show</div>
            <input type="text" className="input-number text-right" value={inputValue / 8} disabled />
          </div>
        </div>
      </div>
      <Footer inputValue={inputValue} />
    </div>
  )
}

export default Converter