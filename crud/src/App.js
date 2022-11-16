import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Cards from "./components/cards/Cards";

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListGames(response.data);
    });
  }, []);

  return (
    <div className="app-container">
      <div className="register-container">
        <h1>Cadastro de Jogos</h1>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome do jogo"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="cost"
          placeholder="Digite o preço do jogo"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="category"
          placeholder="Digite a categoria do jogo"
          className="register-input"
          onChange={handleChangeValues}
        />
        <button onClick={() => handleClickButton()}>Cadastrar</button>
      </div>

      {typeof listGames !== "undefined" &&
        listGames.map((value) => {
          return (
            <Cards
              key={value.id}
              listCard={listGames}
              setListCard={setListGames}
              id={value.idgames}
              name={value.game}
              cost={value.cost}
              category={value.category}
            />
          );
        })}
    </div>
  );
}

export default App;
