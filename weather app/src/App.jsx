import { useState } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);

  async function callCityWeather() {
    try {
      setLoading(true);
      let Obj = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${`b12cf50211460dad4ceac9c8130d39d2`}`
      );
      let Data = await Obj.json();
      setdata(Data);
      console.log(data.message);
      setInitial(false);
    } catch (error) {
      
      setInitial(true);
    }

    setLoading(false);

    console.log(data);
  }

  return (
    <>
      <input
        type="text"
        placeholder="enter city name"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />

      <button onClick={callCityWeather}>See Weather</button>

      {initial && <></>}

      {loading && <div>Loading....</div>}
      {!initial && data.cod && <p>{data.message}</p>}
      {!initial && data.coord && (
        <div>
          <>
            <ul>
              <li>temprature : {(data.main.temp - 273.15).toFixed(2)} C</li>

              <li>humidity : {data.main.humidity}</li>
              <li> Wind Speed : {data.wind.speed}</li>
            </ul>
          </>
        </div>
      )}
    </>
  );
}

export default App;
