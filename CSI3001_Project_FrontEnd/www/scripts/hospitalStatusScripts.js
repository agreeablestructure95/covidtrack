async function fetchHospitalResources() {
  try {
    const response = await fetch(
      "http://localhost:3000/covid/hospitals/resources/"
    );
    const data = await response.json();
    if (data.message === "OK") {
      generateHospitalTables(data.projection);
    } else {
      document.getElementById("hospitals-container").innerHTML =
        "<p>No data available</p>";
    }
  } catch (error) {
    console.error("Error fetching hospital resources data:", error);
    document.getElementById("hospitals-container").innerHTML =
      "<p>Error fetching data</p>";
  }
}
function generateHospitalTables(projection) {
  const container = document.getElementById("hospitals-container");
  container.innerHTML = "";
  for (const [key, values] of Object.entries(projection)) {
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
              <th>Hospital Name</th>
              <th>Beds</th>
              <th>Ventilators</th>
              <th>ICU Capacity</th>
              <th>Syringes</th>
              <th>Vaccine Capsules</th>
              <th>Doctors</th>
              <th>Nurses</th>
            </tr>
          </thead>
          <tbody>
        `;
    values.forEach((hospital) => {
      table.innerHTML += `
            <tr>
              <td>${hospital.Name}</td>
              <td>${hospital.Beds}</td>
              <td>${hospital.Ventilators}</td>
              <td>${hospital.ICUCapacity}</td>
              <td>${hospital.Syringes}</td>
              <td>${hospital.VaccineCapsules}</td>
              <td>${hospital.Doctors}</td>
              <td>${hospital.Nurses}</td>
            </tr>
          `;
    });
    table.innerHTML += `</tbody>`;
    const regionHeader = document.createElement("h4");
    regionHeader.classList.add("text-danger", "mt-4");
    regionHeader.innerText = key.charAt(0).toUpperCase() + key.slice(1);
    container.appendChild(regionHeader);
    container.appendChild(table);
  }
}
fetchHospitalResources();
