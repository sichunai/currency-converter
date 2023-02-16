import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [clicked, setClicked] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [outputCurrency, setOutputCurrency] = useState("GBP");
  const [inputValue, setInputValue] = useState(null);
  const [outputValue, setOutputValue] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(
      `https://v6.exchangerate-api.com/v6/ee28c875c5b6be2f4dbc3d5d/latest/USD`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setCurrencies(Object.keys(data.conversion_rates));
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(
    () => {
      let ignore = false;
      if (!conversionRate) {
        fetch(
          `https://v6.exchangerate-api.com/v6/ee28c875c5b6be2f4dbc3d5d/pair/${inputCurrency}/${outputCurrency}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (!ignore) {
              setConversionRate(data.conversion_rate);
            }
          });
        return () => {
          ignore = true;
        };
      }
    },
    [conversionRate, inputCurrency, outputCurrency]
  );

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleInputValue = (value) => {
    setInputValue(value);
    const outputValue = value * conversionRate;
    setOutputValue(outputValue);
  };

  const handleOutputValue = (value) => {
    setOutputValue(value);
    const inputValue = value / conversionRate;
    setInputValue(inputValue);
  };

  const handleInputCurrency = (value) => {
    setConversionRate(null);
    setInputCurrency(value);
    const outputValue = inputValue * conversionRate;
    setOutputValue(outputValue);
  };

  const handleOutputCurrency = (value) => {
    setOutputCurrency(value);
    const inputValue = outputValue / conversionRate;
    setInputValue(inputValue);
  };

  return (
    <div className="App">
      <h1>Dwight Funding Assesment</h1>
      <div className="input-currency">
        <label>
          Choose current currency
          <select onChange={(e) => handleInputCurrency(e.target.value)}>
            <option value="USD">USD</option>
            {currencies
              ? currencies.map((cur) => <option value={cur}> {cur}</option>)
              : ""}
          </select>
        </label>
        <label>
          Input value
          <input
            value={inputValue}
            onChange={(e) => handleInputValue(e.target.value)}
          />
        </label>
      </div>
      <div className="output-currency">
        <label>
          Choose desired currency
          <select onChange={(e) => handleOutputCurrency(e.target.value)}>
            <option value="GBP">GBP</option>
            {currencies
              ? currencies.map((cur) => <option value={cur}> {cur}</option>)
              : ""}
          </select>
        </label>
        <label>
          Output value
          <input
            value={outputValue}
            onChange={(e) => handleOutputValue(e.target.value)}
          />
        </label>
      </div>
      <button onClick={() => handleClick()}>Click Me</button>
      {clicked ? <h1>Lets get some data!</h1> : ""}
    </div>
  );
};

export default App;
