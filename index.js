const API_URL = "http://universities.hipolabs.com/search?country=";

const universitiesEl = document.getElementById("universities");
const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const loadingEl = document.getElementById("loading");
const messageEl = document.getElementById("message");


getUniversities("Uzbekistan");

searchBtn.addEventListener("click", () => {
  const country = countryInput.value.trim();
  if (country !== "") {
    getUniversities(country);
  }
});

async function getUniversities(country) {
  universitiesEl.innerHTML = "";
  messageEl.textContent = "";
  loadingEl.classList.remove("hidden");

  try {
    const response = await fetch(API_URL + country);
    const data = await response.json();

    if (data.length === 0) {
      messageEl.textContent = "University not found";
      return;
    }

    renderUniversities(data);
  } catch (error) {
    messageEl.textContent = "Error loading";
  } finally {
    loadingEl.classList.add("hidden");
  }
}

function renderUniversities(list) {
  list.forEach((uni) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${uni.name}</h3>
      <p><strong>Country:</strong> ${uni.country}</p>
      <a href="${uni.web_pages[0]}" target="_blank">Visit website</a>
    `;

    universitiesEl.appendChild(card);
  });
}
