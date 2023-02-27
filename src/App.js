import {useEffect, useState} from "react";
import {chunk, shuffle} from "lodash";


function App() {

  const cellStyle = {
    width: '40px',
    height: '40px',
    border: '2px solid silver',
    display:' inline-flex'
  }

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row'
  }

  const fieldStyle={
    margin: '30px',
    border: '2px solid silver',
    display: 'inline-block'
  }

  const [scale, setScale] = useState(2)
  const [field, setField] = useState([]);
  const [zero, setZero] = useState([]);
  const [,setWin] = useState(false);

  const generateField = () => {
    const generateArray = Array.from(Array(scale * scale).keys());
    const shuffledFieldArray = shuffle(generateArray);
    const chunkArray = chunk(shuffledFieldArray, scale);
    setField(chunkArray)
    setZero(findZero(chunkArray))
    setWin(false)
  }

  function findZero(arr) {
    let zeroCoord = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 0) {
          zeroCoord = [i, j]
        }
      }
    }
    return zeroCoord;
  }


  const swapCell = (x, y) => {
    //const cell = [x, y]
    if (x === zero[0] && Math.abs(zero[1] - y) === 1) {
      [field[x][y], field[zero[0]][zero[1]]] = [field[zero[0]][zero[1]], field[x][y]]
      setField([...field])
      setZero([x, y])
    }
    if (y === zero[1] && Math.abs(zero[0] - x) === 1) {
      [field[x][y], field[zero[0]][zero[1]]] = [field[zero[0]][zero[1]], field[x][y]]
      setField([...field])
      setZero([x, y])

    }
    console.log(zero[0], zero[1])
  }

  console.log(field.flat())

  const helper = (arr) => {
    const flatArr = arr.flat();
    if (flatArr[0] !== 1) return false;

    for (let i = 2; i < flatArr.length - 1; i++) {
      if (flatArr[i] - flatArr[i-1] !== 1) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    if (helper(field)) {
      setWin(true)
    }
  }, [])


  return <div style={{ textAlign: 'center'}}>
    <div>
      <input type="number" min='2' max='10' value={scale} onChange={(event) => setScale(event.target.value)}/>
      <button onClick={generateField}>Build Field</button>
    </div>



    <div style={fieldStyle} >
      {field.map((row, x) => (
        <div style={rowStyle}>
          {row.map((cell, y) => (
            <div style={cellStyle}
                 onClick={() => swapCell(x, y)}
            >
              {cell !== 0 ? cell : '   '}
            </div>
          ))}
        </div>
      ))}
    </div>

    <h1>
      {helper(field) && 'Winner!'}
    </h1>

  </div>;
}

export default App;
