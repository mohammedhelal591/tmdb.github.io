let sideBoxWidth = $("#navList").outerWidth(true);
let allMovies = [];


$("#open").click(function () {

    $("#sideNav").animate({ left: "0" }, 500);
    $("#open").css("display", "none");
    $("#close").css("display", "block")
    $("#barList").html(` 
    <div class="text-left">
  <ul>
      <li><a href="#" onclick="nowPlaying()">Now Playing</a></li>
      <li><a href="#" onclick="popular()"> Popular</a></li>
      <li><a href="#" onclick="topRated()"> Top Rated</a></li>
      <li><a href="#" onclick="trending()"> Trending</a></li>
      <li><a href="#" onclick="upComing()"> Upcoming</a></li>
      <li><a id="contactUs" href="#contact"> Contact Us</a></li>
  </ul>
</div>`)
    $("#sideFooter").html(`<div class="social ">
    <div class="text-center d-flex flex-nowrap">
        <a href=""><i class="fab fa-facebook-f"></i></a>
        <a href=""><i class="fab fa-twitter mx-3"></i></a>
        <a href=""><i class="fas fa-globe"></i></a>
    </div>
    <div class="copyright m-auto text-left">
            <span>Copyright Â© 2019 All Rights Reserved</span>
    </div>
</div>`)
})


$("#close").click(function () {
    $("#sideNav").animate({ left: `-${sideBoxWidth}` }, 500);
    $("#close").css("display", "none");
    $("#open").css("display", "block")
});



async function nowPlaying() {
    let apiResponse = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=0e7f6408ebf5e9c66b81c776bb4679bd');
    allMovies = await apiResponse.json();
    allMovies = allMovies.results;
    displayMovies()
}
nowPlaying()


function displayMovies() {
    let cartoona = ``;
    for (let i = 0; i < allMovies.length; i++) {
        cartoona += `<div class="col-md-4 mt-5 col-sm-12 movie">
        <div class="film">
            <img src="https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}" class="img-fluid" alt="">
            <div class="img-overlay text-center">
                <h3 id="title" class="py-3 mt-5">${allMovies[i].title}</h3>
                <p id="desc">${allMovies[i].overview}</p>
                <h5 id="rate">${allMovies[i].vote_average}</h5>
                <h5 id="releaseDate">${allMovies[i].release_date}</h5>
            </div>
        </div>
    </div>`
    }
    document.getElementById("display").innerHTML = cartoona;
}


async function popular() {
    let apiResponse = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=0e7f6408ebf5e9c66b81c776bb4679bd');
    allMovies = await apiResponse.json();
    allMovies = allMovies.results;
    displayMovies()
}


async function topRated() {
    let apiResponse = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=0e7f6408ebf5e9c66b81c776bb4679bd');
    allMovies = await apiResponse.json();
    allMovies = allMovies.results;
    displayMovies()
}

async function trending() {
    let apiResponse = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=0e7f6408ebf5e9c66b81c776bb4679bd');
    allMovies = await apiResponse.json();
    allMovies = allMovies.results;
    displayMovies()
}


async function upComing() {
    let apiResponse = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=0e7f6408ebf5e9c66b81c776bb4679bd');
    allMovies = await apiResponse.json();
    allMovies = allMovies.results;
    displayMovies()
}


function searchMovie(searchTerm) {
    let cartoona = ``;

    for (let i = 0; i < allMovies.length; i++) {
        if (allMovies[i].title.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            cartoona += `<div class="col-md-4 mt-5 col-sm-12 movie">
        <div class="film">
            <img src="https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}" class="img-fluid" alt="">
            <div class="img-overlay text-center">
                <h3 id="title" class="py-5 my-3">${allMovies[i].title}</h3>
                <p id="desc">${allMovies[i].overview}</p>
                <h5 id="rate">${allMovies[i].vote_average}</h5>
                <h5 id="releaseDate">${allMovies[i].release_date}</h5>
            </div>
        </div>
    </div>`
        }
    }
    document.getElementById("display").innerHTML = cartoona;
}



async function searchAll(newSearch) {
    let movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0e7f6408ebf5e9c66b81c776bb4679bd&query=${newSearch}&include_adult=false`);
    newMovies = await movieResponse.json();
    newMovies = newMovies.results;
    let cartoona = ``;
    for (let i = 0; i < newMovies.length; i++) {
        if (allMovies[i].title.toLowerCase().includes(newSearch.toLowerCase()) == true) {
            cartoona += `<div class="col-md-4 mt-5 col-sm-12 movie">
        <div class="film">
            <img src="https://image.tmdb.org/t/p/w500${newMovies[i].poster_path}" class="img-fluid" alt="">
            <div class="img-overlay text-center">
                <h3 id="title" class="py-5 my-3">${newMovies[i].title}</h3>
                <p id="desc">${newMovies[i].overview}</p>
                <h5 id="rate">${newMovies[i].vote_average}</h5>
                <h5 id="releaseDate">${newMovies[i].release_date}</h5>
            </div>
        </div>
    </div>`
        }
    }
    document.getElementById("display").innerHTML = cartoona;
}




let userRepass = $("#passRetype");
let userPass = $("#passType");
let userAge = $("#age");
let userEmail = $("#email");
let userPhone = $("#phone");
let userName = $("#name");
let btn = {
    name: false,
    email: false,
    phone: false,
    age: false,
    pass: false,
    repass: false
}




$("#name").blur(function () {
    let regex = /^[A-Z][a-zA-Z]{2,20}$/
    if (regex.test(userName.val()) == false) {
        $("#nameWarning").removeClass("warning");
        $("#nameWarning").addClass("warning1");
    }
    else {
        $("#nameWarning").removeClass("warning1");
        $("#nameWarning").addClass("warning");
        btn.name = true;
        openBtn();
    }
})

$("#email").blur(function () {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (regex.test(userEmail.val()) == false) {
        $("#emailWarning").removeClass("warning");
        $("#emailWarning").addClass("warning1");
    }
    else {
        $("#emailWarning").removeClass("warning1");
        $("#emailWarning").addClass("warning");
        btn.email = true;
        openBtn();
    }
})

$("#phone").blur(function () {
    let regex = /^(\+2|002)?[01][0125][0-9]{9}$/
    if (regex.test(userPhone.val()) == false) {
        $("#phoneWarning").removeClass("warning");
        $("#phoneWarning").addClass("warning1");
    }
    else {
        $("#phoneWarning").removeClass("warning1");
        $("#phoneWarning").addClass("warning");
        btn.phone = true;
        openBtn();
    }
})

$("#age").blur(function () {
    let regex = /(?:\b|-)([1-9]{1,2}[0]?|100)\b/
    if (regex.test(userAge.val()) == false) {
        $("#ageWarning").removeClass("warning");
        $("#ageWarning").addClass("warning1");
    }
    else {
        $("#ageWarning").removeClass("warning1");
        $("#ageWarning").addClass("warning");
        btn.age = true;
        openBtn();
    }
})

$("#passType").blur(function () {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (regex.test(userPass.val()) == false) {
        $("#passWarning").removeClass("warning");
        $("#passWarning").addClass("warning1");
    }
    else {
        $("#passWarning").removeClass("warning1");
        $("#passWarning").addClass("warning");
        btn.pass = true;
        openBtn();
    }
})

$("#passRetype").blur(function () {

    if (userRepass.val() === userPass.val()) {
        $("#rePassWarning").removeClass("warning1");
        $("#rePassWarning").addClass("warning");
        btn.repass = true;
        openBtn();
    }
    else {
        $("#rePassWarning").removeClass("warning");
        $("#rePassWarning").addClass("warning1");
    }
})

function openBtn()
{
    if (btn.name == true && btn.email == true && btn.phone == true && btn.age == true && btn.pass == true && btn.repass == true)
    {
        $("#myBtn").removeClass("disabled");
    }
}

