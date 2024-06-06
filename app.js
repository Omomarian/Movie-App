const text_input_field = document.getElementById("text_input_field");
const search_btn = document.getElementById("search_btn");
let movie_info_contanier = document.getElementById("movie_info_container");
console.log(text_input_field);
console.log(search_btn);

// add a click event to the search button
search_btn.addEventListener("click", getMovieInfo);

//create a function called getMovieInfo
async function getMovieInfo(e) {
  // this is to prevent the form from auto refreshing
  e.preventDefault();

  //the movie to search for
  const movieTitle = text_input_field.value.trim();

  console.log(movieTitle);

  //show loading text while getting the movie
  movie_info_container.innerHTML = `<section class="flex justify-center items-center max-w-[600px] bg-white p-4 rounded-md">
  <div class="loader"></div>
  <h1 class="text-[2rem] font-bold bg-white rounded-md p-2">Getting movie...</h1>
  </section>`;
  try {
    //make an https request to the movie api
    const data = await fetch(
      `http://www.omdbapi.com/?apikey=d54c66e3&t=${movieTitle}`
    );
    const movieInfo = await data.json();
    console.log(movieInfo);
    //check if movie was not found
    if (movieInfo.Error) {
      movie_info_container.innerHTML = `<h1 class="text-[4rem] text-red-400 bg-white">${movieInfo.Error}</h1>`;
      return;
    }

    //show the actual movie info
    movie_info_container.innerHTML = `<section
          class="flex flex-col lg:flex-row gap-5 max-w-[600px] justify-between w-full bg-white p-4 rounded-lg"
        >
          <div>
            <h2 class="text-3xl font-bold tracking-wider">${movieInfo.Title}</h2>
            <p>
              <strong class="mr-2">Year:</strong
              ><span class="text-gray-500">${movieInfo.Year}</span>
            </p>
            <p>
              <strong class="mr-2">Released:</strong
              ><span class="text-gray-500">${movieInfo.Released}</span>
            </p>
            <p>
              <strong class="mr-2">Duration:</strong
              ><span class="text-gray-500">${movieInfo.Runtime}</span>
            </p>
            <p>
              <strong class="mr-2">Genre:</strong
              ><span class="text-gray-500">${movieInfo.Genre}</span>
            </p>
            <p>
              <strong class="mr-2">Director:</strong
              ><span class="text-gray-500">${movieInfo.Director}</span>
            </p>
            <p>
              <strong class="mr-2">Plot:</strong
              ><span class="text-gray-500">${movieInfo.Plot}</span>
            </p>
            <p>
              <strong class="mr-2">Awards:</strong
              ><span class="text-gray-500">${movieInfo.Awards}</span>
            </p>
          
          </div>
          <div>
            <img class="max-m-[600px] w-full rounded-md" 
              src=${movieInfo.Poster}
              alt="poster"
            />
          </div>
        </section>`;
  } catch (error) {
    console.log(error);
  }
}
