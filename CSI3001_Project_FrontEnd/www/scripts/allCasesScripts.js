async function fetchRegions() {
  try {
    const response = await fetch(
      "http://localhost:3000/get-collections/"
    );
    const data = await response.json();
    if (response.ok) {
      const regionSelect = document.getElementById("region-select");
      regionSelect.innerHTML = '<option value="">--Choose a Region--</option>';
      regionSelect.innerHTML += '<option value="All">All</option>';
      for (const key in data) {
        const region = data[key];
        const regionTitleCase =
          region.charAt(0).toUpperCase() + region.slice(1);
        regionSelect.innerHTML += `<option value="${region}">${regionTitleCase}</option>`;
      }
    } else {
      console.error("Failed to fetch regions:", data.message);
    }
  } catch (error) {
    console.error("Error fetching regions:", error);
  }
}
window.onload = () => {
  fetchRegions();
};
async function fetchCovidCases(region) {
  let endpoint = region === "All" ? "covid/cases" : `covid/cases/${region}`;
  try {
    const response = await fetch(
      `http://localhost:3000/${endpoint}`
    );
    const data = await response.json();

    if (data.message === "OK") {
      generateRegionTables(data.projection);
    } else {
      document.getElementById("cases-container").innerHTML =
        "<p>No data available</p>";
    }
  } catch (error) {
    console.error("Error fetching COVID cases data:", error);
    document.getElementById("cases-container").innerHTML =
      "<p>Error fetching data</p>";
  }
}
function generateRegionTables(projection) {
  const container = document.getElementById("cases-container");
  container.innerHTML = "";
  for (const [key, entries] of Object.entries(projection)) {
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
                    <th>Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Dosage</th>
                    <th>Covid Status</th>
                    <th>Vaccine Status</th>
                </tr>
            </thead>
            <tbody>
                ${entries
                  .map(
                    (entry) => `
                    <tr>
                        <td>${entry.Name}</td>
                        <td>${entry.Age}</td>
                        <td>${entry.Sex}</td>
                        <td>${entry.Dosage}</td>
                        <td>${entry.CovidStatus}</td>
                        <td>${
                          entry.VaccineStatus ? "Vaccinated" : "Not Vaccinated"
                        }</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        `;
    const regionHeader = document.createElement("h4");
    regionHeader.classList.add("text-danger", "mt-4");
    regionHeader.innerText = key.charAt(0).toUpperCase() + key.slice(1);
    container.appendChild(regionHeader);
    container.appendChild(table);
  }
}
