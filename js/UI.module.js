"use strict";
/// <reference types="../@types/jquery" />
import { Home } from "./Home.module.js";
// import { Details } from "./details.module";
export class UI {
  constructor() {
    const thatClass = this;
    let currentTab = "#mmorpg";
    //Spinner for first time
    $(".loading").css("display", "flex");
    thatClass.getDataFromAPI(currentTab, thatClass);

    //Handle Click
    $(".nav-link").click(function () {
      $("body").css("overflow", "hidden");
      let theCurrentTab = $(this).attr("href");
      $(".loading").fadeIn(300);
      $(".loading").css("display", "flex");
      thatClass.getDataFromAPI(theCurrentTab, thatClass);
    });
  }

  //   Get Data From API
  async getDataFromAPI(theCurrentTab, thatClass) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6c42417d60msh87a2dd654530cc3p1b283ejsn36d9376a6b4e",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${
        theCurrentTab.split("#")[1]
      }`,
      options
    );
    let myData = await response.json();

    $("body").css("overflow", "auto");
    const newHome = new Home(theCurrentTab);
    $(".loading").fadeOut(500, function () {
      $(window).scrollTop(0);
    });

    console.log(myData);
    let cartona = "";
    for (let i = 0; i < myData.length; i++) {
      cartona += `<div class="col-lg-3 col md-4 col-sm-6 mb-5">
        <div id ="${myData[i].id}" class="card h-100 bg-transparent" role="button">
              <div class="card-body">
                <figure class="position-relative">
                  <img
                    class="card-img object-fit-cover h-100"
                    src="${myData[i].thumbnail}"
                    />
                    </figure>
                    
                    <figcaption>
                    <div class="hstack justify-content-between">
                    <h3 class="h6 small">${myData[i].title}</h3>
                    <span class="free-badge">Free</span>
                  </div>
                  
                  <p class="small text-center opacity-50">
                  ${myData[i].short_description}
                  </p>
                  </figcaption>
                  </div>
                  
                  <footer class="small">
                <span class="">${myData[i].genre}</span>
                <span class="">${myData[i].platform}</span>
                </footer>
                </div>
                </div>`;
    }

    document.querySelector(`${theCurrentTab} .row`).innerHTML = cartona;

    $(".card").click(function () {
      $(".big-section").addClass("my-none");
      $(".details").removeClass("my-none");
      $("body").css("overflow", "hidden");
      $(".loading").fadeIn(300);
      $(".loading").css("display", "flex");
      thatClass.getDataFromAPIForDetails(this.id);
    });
  }

  async getDataFromAPIForDetails(id) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6c42417d60msh87a2dd654530cc3p1b283ejsn36d9376a6b4e",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    let lastResponse = await response.json();
    $("body").css("overflow", "auto");
    $(".loading").fadeOut(500, function () {
      $(window).scrollTop(0);
    });
    console.log(lastResponse);
    $(".details").html(`<div class="container">
    <header class="hstack justify-content-between">
      <h1 class="text-center h3 py-4">Details Game</h1>
      <button class="btn-close btn-close-white" id="btnClose"></button>
    </header>
    <div class="row g-4" id="detailsContent">
      <div class="col-md-4">
        <img
       src="${lastResponse.thumbnail}"
          class="w-100"
          alt="image details"
        />
      </div>
      <div class="col-md-8">
        <h3>Title: ${lastResponse.title}</h3>
        <p>Category: <span class="badge text-bg-info">${lastResponse.genre}</span></p>
        <p>Platform: <span class="badge text-bg-info">${lastResponse.platform}</span></p>
        <p>Status: <span class="badge text-bg-info">${lastResponse.status}</span></p>
        <p class="small">
          ${lastResponse.description}
        </p>
        <a
          class="btn btn-outline-warning"
          target="_blank"
          href="${lastResponse.freetogame_profile_url}"
          >Show Game</a
        >
      </div>
    </div>
  </div>`);

    $("#btnClose").click(function () {
      $(".big-section").removeClass("my-none");
      $(".details").addClass("my-none");
    });
  }
}
