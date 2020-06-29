import React from 'react';
const { useState } = React;

const Counter = () => {

  const [count, setCount] = useState(10)
  const handleClick = (type) => {
    if (type === 'increment') setCount(count + 1)
    if (type === 'decrement') setCount(count - 1)
  }

  return (
    <div className="container">
      {count < 10 &&
        (<div
          className="chevron chevron-up"
          style={{ visibility: count >= 10 && 'hidden' }}
          onClick={() => handleClick('increment')} />)
      }
      <div className="number">
        {count}
      </div>
      {count >= 0 && (
        <div
          className="chevron chevron-down"
          style={{ visibility: count <= 0 && 'hidden' }}
          onClick={() => handleClick('decrement')} />)
      }
    </div>
  )
}

export default Counter