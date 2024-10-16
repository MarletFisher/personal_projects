/********************************************************************************
 *  WEB422 – Assignment 2
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Frank Cheng Student ID: 051702033 Date: Sept 30, 2024
 *
 ********************************************************************************/

let countriesTableBody;
let searchForm;
let nameInput;
let clearFormBtn;
let prevPageBtn;
let currentPageBtn;
let nextPageBtn;
let detailsModal;
let modalTitle;
let modalBody;

let page = 1; // number
let perPage = 10; // number
let searchName = null; // string

let totalPagesCount = 20;

function loadCountriesData(page = 1, name) {
	searchName = name ? name : "";
	let url = `http://localhost:8080/api/countries?page=${page}&perPage=${perPage}&name=${searchName}`;
	console.log("Calling", url);
	let url2 = `http://localhost:8080/api/countries`; // for getting totalPages
	// let countryData;

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			// totalPagesCount = data.totalPages;
			populateTable(data);
			updatePagination();
		})
		.catch((err) => console.log("Error in loadCountriesData():", err));
}

function populateTable(countries) {
	// countriesTableBody
	countries.forEach((country) => {
		const row = document.createElement("tr");
		row.innerHTML = `
      <td>${country.name}</td>
      <td><img src="${country.flag}" alt="Flag" width="50"></td>
      <td>${country.nativeName}</td>
      <td><img src="${
				country.coatOfArms
			}" alt="Coat of Arms" class="img-fluid w-100"></td>
      <td>${country.a3code}</td>
      <td>${country.capital}</td>
      <td>${country.languages}</td>
      <td>${country.population.toLocaleString()}</td>
      <td>${country.area.toLocaleString()} km²</td>
      <td>${country.currencies.map((currency) => currency.name).join(", ")}</td>
      <td>${country.region}</td>
      <td>${country.subregion}</td>
      <td>${country.continents}</td>
    `;

		row.addEventListener("click", () => {
			loadCountryDetails(country._id);
		});

		countriesTableBody.appendChild(row);
	});
}

function loadCountryDetails(countryId) {
	const url = `http://localhost:8080/api/countries/${countryId}`;

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((country) => {
			// modalTitle
			// modalBody

			modalTitle.innerHTML = country.name;
			modalBody.innerHTML = `
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Languages:</strong> ${country.languages}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Currencies:</strong> ${country.currencies}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Continents:</strong> ${country.continents}</p>`;

			detailsModal.show();
		})
		.catch((err) => console.log("Error in load country details:", err));
}

function updatePagination() {
	currentPageBtn.textContent = `Page ${page} of ${totalPagesCount}`;

	prevPageBtn.parentElement.classList.toggle("disabled", page === 1);

	nextPageBtn.parentElement.classList.toggle(
		"disabled",
		page === totalPagesCount
	);
}

window.onload = () => {
	countriesTableBody = document.querySelector("#countriesTable tbody");
	searchForm = document.getElementById("searchForm");
	nameInput = document.getElementById("name");
	clearFormBtn = document.getElementById("clearForm");
	prevPageBtn = document.getElementById("previous-page");
	currentPageBtn = document.getElementById("current-page");
	nextPageBtn = document.getElementById("next-page");
	modalTitle = document.querySelector(".modal-title");
	modalBody = document.querySelector(".modal-body");
	detailsModal = new bootstrap.Modal(document.getElementById("detailsModal"), {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});

	console.log("Page is fully loaded");
	console.log(nextPageBtn);
	nextPageBtn.addEventListener("click", (event) => {
		event.preventDefault();
		if (page < totalPagesCount) {
			page += 1;
			console.log("page is now", page);
			wipeTable();
			loadCountriesData(page);
		}
	});

	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const name = document.getElementById("name").value;
		wipeTable();
		loadCountriesData(1, name);
	});

	clearFormBtn.addEventListener("click", (event) => {
		event.preventDefault();
		nameInput.value = "";
		wipeTable();
		loadCountriesData(1);
	});

	// detailsModal.show();
	loadCountriesData();
};

function wipeTable() {
	countriesTableBody.innerHTML = "";
}
