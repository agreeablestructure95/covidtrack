async function fetchVaccinationStatus() {
  try {
    const response = await fetch(
      "http://localhost:3000/covid/vaccination-status/"
    );
    const data = await response.json();
    if (data.message === "OK") {
      generateVaccinationTables(data.projection);
    } else {
      document.getElementById("vaccination-container").innerHTML =
        "<p>No data available</p>";
    }
  } catch (error) {
    console.error("Error fetching vaccination status data:", error);
    document.getElementById("vaccination-container").innerHTML =
      "<p>Error fetching data</p>";
  }
}
function generateVaccinationTables(projection) {
  console.log(projection);
  const container = document.getElementById("vaccination-container");
  container.innerHTML = "";

  for (const [key, values] of Object.entries(projection)) {
    console.log(key);
    console.log(values);
    const table = document.createElement("table");
    table.classList.add(
      "table",
      "table-striped",
      "table-bordered",
      "table-hover",
      "mt-4",
      "table-blue"
    );
    table.innerHTML = `
          <thead class="table-danger">
            <tr>
              <th>Region</th>
              <th>Total Alive</th>
              <th>Total Alive Vaccinated</th>
              <th>Percentage of Vaccinated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
              <td>${values.totalAlive}</td>
              <td>${values.totalAliveVaccinated}</td>
              <td>${values.percentageOfVaccinated.toFixed(2)}%</td>
            </tr>
          </tbody>
        `;
    container.appendChild(table);
  }
}
fetchVaccinationStatus();
