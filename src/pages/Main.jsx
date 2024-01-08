import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  const URL = "https://robust-safe-crafter.glitch.me/";
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");

  useEffect(() => {
    getUrl()
      .then((fetchedData) => {
        setData(fetchedData);
        loadCards(fetchedData);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const cityBtns = document.querySelectorAll(".city-btn");
    cityBtns.forEach((btn) => btn.addEventListener("click", handleCityButtonClick));

    return () => {
      cityBtns.forEach((btn) => btn.removeEventListener("click", handleCityButtonClick));
    };
  }, [data]);

  function getUrl() {
    return fetch(URL).then((response) => response.json());
  }

  function loadCards(cardsData) {
    const cardsContainer = document.querySelector(".cards");

    cardsContainer.innerHTML = "";

    if (cardsData) {
      cardsData.forEach((x) => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.innerHTML = `
          <img src="${x.image}" alt="${x.city}">
          <div className="text">
              <h3 className="price">€${x.price}</h3>
              <p className="city">${x.city}</p>
              <p>${x.description}</p>
          </div>
        `;

        cardsContainer.style.opacity = 0;

        setTimeout(function () {
          cardsContainer.prepend(newCard);
          cardsContainer.style.opacity = 1;
        }, 300);
      });
    }

    console.log(cardsData);
  }

  function handleCityButtonClick(event) {
    const city = event.target.textContent;
    const cityBtns = document.querySelectorAll(".city-btn");
    if (city !== "All") {
      const filter = data.filter((x) => x.city === city);
      loadCards(filter);
    } else {
      loadCards(data);
    }
    cityBtns.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    setSelectedCity(city);
  }

  return (
    <>
      <main>
        <p>Filter:</p>
        <div className="filter-section">
          <div className="cities">
            <Link><button className={`city-btn ${selectedCity === 'Vilnius' ? 'active' : ''}`}>Vilnius</button></Link>
            <button className={`city-btn ${selectedCity === 'Kaunas' ? 'active' : ''}`}>Kaunas</button>
            <button className={`city-btn ${selectedCity === 'Klaipėda' ? 'active' : ''}`}>Klaipėda</button>
            <button className={`city-btn ${selectedCity === 'All' ? 'active' : ''}`}>All</button>
          </div>
          <Link to="/Add" className="add-property">Add Property +</Link>
        </div>
      </main>

      <section className="cards"></section>
    </>
  );
};

export default Main;
