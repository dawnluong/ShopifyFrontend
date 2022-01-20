// function adapted from https://dev.to/msdeshmukh009/how-to-use-nasa-s-apod-api-2iec
function nasarequested() {
  const baseUrl = "https://api.nasa.gov/planetary/apod?api_key=";
  const apiKey = "Lxn6DHjeAiDmf4fvEgTpCgXgPz6djNmOYOVq0dMi";
  const dateInput = document.querySelector("#datepicker");
  const title = document.querySelector("#title");
  const mediaSection = document.querySelector("#media-section");
  const information = document.querySelector("#description");
  const currentDate = moment(new Date()).format("YYYY-MM-DD")

  const imageSection = `<a id="hdimg" href="" target="-blank">
  <div class="image-div">
  <img id="image_of_the_day" src="" alt="image-by-nasa">
  </div>
 </a>`;

  const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`;

  let newDate = "&date=" + dateInput.value + "&";

  function fetchData() {
    try {
      fetch(baseUrl + apiKey + newDate)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          diplaydata(json);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function diplaydata(data) {
    title.innerHTML = data.title;
    date.innerHTML = data.date;
    dateInput.max = currentDate;
    dateInput.min = "1995-06-16";

    if (data.media_type == "video") {
      mediaSection.innerHTML = videoSection;
      document.getElementById("videoLink").src = data.url;
    } else {
      mediaSection.innerHTML = imageSection;
      document.getElementById("hdimg").href = data.hdurl;
      document.getElementById("image_of_the_day").src = data.url;
    }
    information.innerHTML = data.explanation;
  }
  fetchData();
}
const dateInput = document.querySelector("#datepicker");
dateInput.addEventListener("change", (e) => {
  e.preventDefault();
  nasarequested();
});
nasarequested().onload;
