const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //1
const key = "AZPdRj6hFYg6nxnCAcBekS3aVEvdweOH"; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

//RESULTS NAVIGATION
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");

//RESULTS SECTION
const section = document.querySelector("section");

nav.style.display = "none";

let pageNumber = 0;

console.log("PageNumber:", pageNumber); //pagination

let displayNav = false;

searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage); //3 ok
previousBtn.addEventListener("click", previousPage); //3 ok

//1 two conditionals - inserted here
function fetchResults(e) {
  e.preventDefault(); //2 ok
  // Assemble the full URL
  url =
    baseURL +
    "?api-key=" +
    key +
    "&page=" +
    pageNumber +
    "&q=" +
    searchTerm.value; //3
  console.log("URL:", url);

  function nextPage(e) {
    pageNumber++; //1
    fetchResults(e); //2
    console.log("Page number:", pageNumber); //3
  } //pagination : next page

  function previousPage(e) {
    if (pageNumber > 0) {
      //1
      pageNumber--; //2
    } else {
      return; //3
    }
    fetchResults(e); //4
    console.log("Page:", pageNumber); //5
  } // pagination : next page

  if (startDate.value !== "") {
    console.log(startDate.value);
    url += "&begin_date=" + startDate.value;
  }

  if (endDate.value !== "") {
    url += "&end_date=" + endDate.value;
  } //ok

  //1 fetch 3 - replaced display results 01
  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      displayResults(json); //1 & //3
    });
}

//2
function displayResults(json) {
  console.log("DisplayResults", json);
}

function displayResults(json) {
  console.log(json.response.docs);
} //4 # working with json

function displayResults(json) {
  let articles = json.response.docs;
  console.log(articles);
} // 4 #storing the data

function displayResults(json) {
  let articles = json.response.docs;

  if (articles.length === 0) {
    console.log("No results");
  } else {
    //Display the data
  }
} // if

function displayResults(json) {
  let articles = json.response.docs;

  if (articles.length === 0) {
    console.log("No results");
  } else {
    for (let i = 0; i < articles.length; i++) {
      console.log(i);
    }
  }
} //else

function displayResults(json) {
  let articles = json.response.docs;

  if (articles.length === 0) {
    console.log("No results");
  } else {
    for (let i = 0; i < articles.length; i++) {
      let article = document.createElement("article"); //1
      let heading = document.createElement("h2");
      //2

      article.appendChild(heading); //3
      section.appendChild(article); //4
    }
  }
} //dom container

function displayResults(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild); //1
  }
} // # Updating : removing the First Result

function displayResults(json) {
  let articles = json.response.docs;

  if (articles.length >= 10) {
    nav.style.display = "block"; //shows the nav display if 10 items are in the array
  } else {
    nav.style.display = "none"; //hides the nav display if less than 10 items are in the array
  }
} // # navigation :adding the navigation

function displayResults(json) {
  let articles = json.response.docs;

  if (articles.length === 0) {
    console.log("No results");
  } else {
    for (let i = 0; i < articles.length; i++) {
      let article = document.createElement("article");
      let heading = document.createElement("h2");
      let link = document.createElement("a");

      let img = document.createElement("img"); //Images : the code

      let para = document.createElement("p"); // code additions
      let clearfix = document.createElement("div"); //1 //code additions

      let current = articles[i]; //2
      console.log("Current:", current); //3

      link.href = current.web_url; //4
      link.textContent = current.headline.main; //5

      para.textContent = "Keywords: "; // code addition

      //4 - Code additions
      for (let j = 0; j < current.keywords.length; j++) {
        //5
        let span = document.createElement("span"); // the code
        //6
        span.textContent += current.keywords[j].value + " ";
        //7
        para.appendChild(span);
      } // code additions

      //2
      if (current.multimedia.length > 0) {
        //3
        img.src = "http://www.nytimes.com/" + current.multimedia[0].url; //images
        //4
        img.alt = current.headline.main;
      }

      //8
      clearfix.setAttribute("class", "clearfix"); // code additions

      article.appendChild(heading);
      heading.appendChild(link); //6

      article.appendChild(img);

      article.appendChild(para); // code additions
      article.appendChild(clearfix); // code additions

      section.appendChild(article);
    }
  }
} // #links : In this module, we'll make the links show up as headings.; adding an anchor element

function nextPage() {
  console.log("Next button clicked");
} //5 ok

function previousPage() {
  console.log("Next button clicked");
} //5 ok
