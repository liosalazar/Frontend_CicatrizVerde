import React, { useState } from "react";

const AverageForm = () => {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [average, setAverage] = useState(null);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddNumber = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setInputValue(""); // Limpiar el campo después de agregar el número
    }
  };

  const calculateAverage = () => {
    if (numbers.length === 0) return;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / numbers.length;
    setAverage(avg);
  };

  return (
    <div>
      <h3>Calcular Promedio</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ingresa un número"
      />
      <button onClick={handleAddNumber}>Agregar Número</button>

      <div>
        <h4>Números ingresados:</h4>
        <ul>
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>

      <button onClick={calculateAverage}>Calcular Promedio</button>

      {average !== null && (
        <div>
          <h4>Promedio: {average}</h4>
        </div>
      )}
    </div>
  );
};

export default AverageForm;
