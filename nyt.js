const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //1
const key = "AZPdRj6hFYg6nxnCAcBekS3aVEvdweOH"; //2
let url; //3

/*
<!------------------------->
 querySelector() returns the first Element within the document that matches the specified selector or group of selectors. If no matches are found, null is returned. (written with a for="search" in HTML file in a similar way to class.)
*/

// grabbing all the references to all the HTML DOM elements you'll need to manipulate for later into variables.
//SEARCH FORM
const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector("form"); //tag
const submitBtn = document.querySelector(".submit"); //class

//RESULTS NAVIGATION
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");

//RESULTS SECTION
const section = document.querySelector("section");

//initial style to none
//Hide the "previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = "none";

//Sets the pageNumber to 0 by default, and sets displayNav to false to further ensure that it won't be visible until we want it to be
//define the initial page number and status of the navigation being displayed
let pageNumber = 0; // variable passed into loops. important that it starts at 0. 

//addEventListener() method will help dentify a target and then add an event listener on that target. Event targets can be an element, the document object, the window object, or any other object that supports events.
// Event listeners to control the functionality
//1                     //2
searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage); //3
previousBtn.addEventListener("click", previousPage); //3

/* 1 - searchForm variable targets the form element in the HTML page. Can use the searchForm variable and call the addEventListener method on it. Listens to things happening on the particular element. (which is the searchForm)

Looking for the submit event. It's an HTML form event. Submit event fires on a form, not a button. (The form is submitted by pressing the submit button). Fires of a function called fetchResults (second Parameter in the function).

2 - Same is true for the other two items, except they are called click events. When clicking the next button, we fire off a function called nextPage. When we click on the previous button, we run previousPage.
 
NOTE: the click event is fired when a pointing device button (usually a mouse's primary button) is pressed and released on a single element
*/

function submitSearch(e) {
  pageNumber = 0;
  fetchResults(e);
}

//1
function fetchResults(e) { /* 1 - the little (e) is an event handling function. Every event handling function receives an event object. An object is a "thing" that holds a bunch of propertires (variables) and methods (functions). The handle, the e, is similar to a variable that allows you to interact with the object. */

  e.preventDefault(); //1
  /* 1 - added the preventDefault method to make sure that a request isn't acutally sent. Even though we tell our code to submit the data, we don't actually want data to be submitted anywhere. This isn't a form where we are signing up for something or filling out data to be saved in a database. That is the default nature of a form element: to submit data, to send a POST request.

  We are using the form to construct our GET request. We are using the form to gather the data for that request.
  */
  url = //specific to end points and ? = signifies going past
    //& = signifies passing variables to a function
    baseURL +
    "?api-key=" +
    key +
    "&page=" +
    pageNumber +
    "&q=" +
    searchTerm.value; //3 - Versatile query string. The url variable is loaded with other variables and url requirements. We have our base for the API, our key, the page number that corresponds to the results array, and our specific value. We need to grab the value of the element. Without it


  //INSERT HERE
  if (startDate.value !== '') {
    url += "&begin_date=" + startDate.value;
  };
  /*
    This is a rudimentary version of form validation, which is a method of ensuring that specific fields are filled out in a form. You've seen form validation. Think about when you go sign up for a new account somewhere, and you are prompted for more information. Form Validation will force you to enter information. In this case, we are not being forced to enter a start date or end date. It's optional. If the input fields for dates aren't blank, denoted by the !== '', the date values will be added to the URL string. If they're blank, the expressions inside of the conditionals are ignored.
    */

  if (endDate.value !== '') {
    url += "&end_date=" + endDate.value;
  };
  //END HERE
  fetch(url)
    .then(function (result) {
      // 1 - r(member that fetch is a reserved keyword in JavaScript that allows us to make a request for info, similar to using a GET request with HTTP. The url is given to fetch as a parameter, which sends the request to the url.
      return result.json(); // 2 - Meanwhile it creates a promise containing a result object. This is our response. Remember promises when we have asynchronous, long-running operations. Fetch gets the network resource, which might take a long time to resolve. It will convert the response into a json. object by returning the result.json function

      //returns URL results into json data
    })
    .then(function (json) {
      displayResults(json); // 3 - that json object is used in another promise (set off by the second.then) to send the information received to another function. console.log is used to see the jason data...
    });
}

function displayResults(json) { //needs a parameter to pass all the info to the function
  while (section.firstChild) { //scans and tries to detect children objects and removes them
    section.removeChild(section.firstChild); //refresh to do another search.
  } //section stores all article objects that we will be iterating through. while loops clear previous search items. Otherwise it would append.

  let articles = json.response.docs;

  if (articles.length === 10) { // makes the article 10 blocks
    nav.style.display = 'block' //shows
  } else {
    nav.style.display = 'none'; //hides
  }

  if (articles.length === 0) { //if the articles come back with no results log that it has no results.
    let para = document.createElement('p');
    para.textContent = 'No results returned.'
    section.appendChild(para);
  } else {
    for (let i = 0; i < articles.length; i++) {
      let article = document.createElement('article'); //1 - create an article variable that will create a node in the DOM that is an article element. Remember the article is an HTML5 element
      let heading = document.createElement('h2'); //2 - creates a heading variable that creates a node in the DOM that is an h2 element.
      let link = document.createElement('a');
      let img = document.createElement('img');
      let para1 = document.createElement('p');
      let para2 = document.createElement('p');
      let clearfix = document.createElement('div');

      let current = articles[i]; //creating a variable for the array articles

      link.href = current.web_url; //actually makes them clickable links
      link.textContent = current.headline.main;
      para1.textContent = current.snippet; //snipet of the paragraph in the article space.
      para2.textContent = 'Keywords: '; // displays all the key words
      for (let j = 0; j < current.keywords.length; j++) { //iterates
        let span = document.createElement('span'); //span placeholder. keyword create a span. gathering the keywords. creating a paragraph to a p tag. 
        span.textContent = current.keywords[j].value + ' ';
        para2.appendChild(span); //appends the p keyword in the second paragraph.
      }

      if (current.multimedia.length > 0) { //pulling the first image.
        img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
        img.alt = current.headline.main; //if not don't.
      }

      clearfix.setAttribute('class', 'clearfix'); //makes things shift into the entire box to fit. there's a float, it fixes everything from being messed up.

      article.appendChild(heading); //3 - call appndChild() on the article element. This will create a child node on that element. We pass in heading to the appendChild method. This means that there will be an h2 element created inside each article element.
      heading.appendChild(link); //insert between open bracket and closing bracket
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(para2);
      article.appendChild(clearfix);
      section.appendChild(article); //4 - we have a section in our original html file, we call the appendChild() method on the section element. We pass in the article to that. This way, the article is a child of section, and the h2 is a grandchild of section.
    }
  }
};

function nextPage(e) {
  pageNumber++; //adding to the page number, fetch results
  fetchResults(e); //
}; //5

function previousPage(e) {
  if (pageNumber > 0) {
    pageNumber--; //decreasing the page numbers, fetch results
  } else {
    return;
  }
  fetchResults(e);
  console.log('Page:', pageNumber);
}//5 - add a few basic functions to define nextPage and previousPage and log them.

/*
<!------ ------->

NOTE ABOUT ENDPOINTS!: Remember that when we fetch data from an API, we make a request for some kind of data to a specific point. That point is called an endpoint and comes in the form of a URL. That URL is the gateway to the server, which ultimately does the logic of looking for the proper data in the database. In the code above, we use the endpoint, the baseURL, and add our query string to it so that it can access the proper data.

KEYTERMS!:

baseURL: The actual web address for the API
apiKey: Your key allowing you access into the API
page: The current page of resutls being accessed
q: This is the search term, or query, that we are looking for in the API
begin_date: The earliest (furthest away) date from which we want to see articles
end_date: The latest (most recent) date from which we want to see articles

*/
// //SEARCH FORM
// const searchTerm = document.querySelector(".search");
// const startDate = document.querySelector(".start-date");
// const endDate = document.querySelector(".end-date");
// const searchForm = document.querySelector("form");
// const submitBtn = document.querySelector(".submit");

// //RESULTS NAVIGATION
// const nextBtn = document.querySelector(".next");
// const previousBtn = document.querySelector(".prev");
// const nav = document.querySelector("nav");

// //RESULTS SECTION
// const section = document.querySelector("section");

// nav.style.display = "none";

// let pageNumber = 0;

// console.log("PageNumber:", pageNumber); //pagination

// let displayNav = false;

// searchForm.addEventListener("submit", fetchResults);
// nextBtn.addEventListener("click", nextPage); //3 ok
// previousBtn.addEventListener("click", previousPage); //3 ok

// //1 two conditionals - inserted here
// function fetchResults(e) {
//   e.preventDefault(); //2 ok
//   // Assemble the full URL
//   url =
//     baseURL +
//     "?api-key=" +
//     key +
//     "&page=" +
//     pageNumber +
//     "&q=" +
//     searchTerm.value; //3
//   console.log("URL:", url);

//   function nextPage(e) {
//     pageNumber++; //1
//     fetchResults(e); //2
//     console.log("Page number:", pageNumber); //3
//   } //pagination : next page

//   function previousPage(e) {
//     if (pageNumber > 0) {
//       //1
//       pageNumber--; //2
//     } else {
//       return; //3
//     }
//     fetchResults(e); //4
//     console.log("Page:", pageNumber); //5
//   } // pagination : next page

//   if (startDate.value !== "") {
//     console.log(startDate.value);
//     url += "&begin_date=" + startDate.value;
//   }

//   if (endDate.value !== "") {
//     url += "&end_date=" + endDate.value;
//   } //ok

//   //1 fetch 3 - replaced display results 01
//   fetch(url)
//     .then(function (result) {
//       return result.json();
//     })
//     .then(function (json) {
//       displayResults(json); //1 & //3
//     });
// }

// //2
// function displayResults(json) {
//   console.log("DisplayResults", json);
// }

// function displayResults(json) {
//   console.log(json.response.docs);
// } //4 # working with json

// function displayResults(json) {
//   let articles = json.response.docs;
//   console.log(articles);
// } // 4 #storing the data

// function displayResults(json) {
//   let articles = json.response.docs;

//   if (articles.length === 0) {
//     console.log("No results");
//   } else {
//     //Display the data
//   }
// } // if

// function displayResults(json) {
//   let articles = json.response.docs;

//   if (articles.length === 0) {
//     console.log("No results");
//   } else {
//     for (let i = 0; i < articles.length; i++) {
//       console.log(i);
//     }
//   }
// } //else

// function displayResults(json) {
//   let articles = json.response.docs;

//   if (articles.length === 0) {
//     console.log("No results");
//   } else {
//     for (let i = 0; i < articles.length; i++) {
//       let article = document.createElement("article"); //1
//       let heading = document.createElement("h2");
//       //2

//       article.appendChild(heading); //3
//       section.appendChild(article); //4
//     }
//   }
// } //dom container

// function displayResults(json) {
//   while (section.firstChild) {
//     section.removeChild(section.firstChild); //1
//   }
// } // # Updating : removing the First Result

// function displayResults(json) {
//   let articles = json.response.docs;

//   if (articles.length >= 10) {
//     nav.style.display = "block"; //shows the nav display if 10 items are in the array
//   } else {
//     nav.style.display = "none"; //hides the nav display if less than 10 items are in the array
//   }
// } // # navigation :adding the navigation

// function displayResults(json) {
//   let articles = json.response.docs;

//   if (articles.length === 0) {
//     console.log("No results");
//   } else {
//     for (let i = 0; i < articles.length; i++) {
//       let article = document.createElement("article");
//       let heading = document.createElement("h2");
//       let link = document.createElement("a");

//       let img = document.createElement("img"); //Images : the code

//       let para = document.createElement("p"); // code additions
//       let clearfix = document.createElement("div"); //1 //code additions

//       let current = articles[i]; //2
//       console.log("Current:", current); //3

//       link.href = current.web_url; //4
//       link.textContent = current.headline.main; //5

//       para.textContent = "Keywords: "; // code addition

//       //4 - Code additions
//       for (let j = 0; j < current.keywords.length; j++) {
//         //5
//         let span = document.createElement("span"); // the code
//         //6
//         span.textContent += current.keywords[j].value + " ";
//         //7
//         para.appendChild(span);
//       } // code additions

//       //2
//       if (current.multimedia.length > 0) {
//         //3
//         img.src = "http://www.nytimes.com/" + current.multimedia[0].url; //images
//         //4
//         img.alt = current.headline.main;
//       }

//       //8
//       clearfix.setAttribute("class", "clearfix"); // code additions

//       article.appendChild(heading);
//       heading.appendChild(link); //6

//       article.appendChild(img);

//       article.appendChild(para); // code additions
//       article.appendChild(clearfix); // code additions

//       section.appendChild(article);
//     }
//   }
// } // #links : In this module, we'll make the links show up as headings.; adding an anchor element

// function nextPage() {
//   console.log("Next button clicked");
// } //5 ok

// function previousPage() {
//   console.log("Next button clicked");
// } //5 ok
