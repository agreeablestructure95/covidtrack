async function fetchCities() {
  try {
    const response = await fetch(
      "http://localhost:3000/get-collections/"
    );
    const data = await response.json();
    if (response.ok) {
      const citySelect = document.getElementById("cityName");
      citySelect.innerHTML =
        '<option value="" disabled selected>Select City</option>';

      for (const key in data) {
        const city = data[key];
        const cityTitleCase = city.charAt(0).toUpperCase() + city.slice(1);
        citySelect.innerHTML += `<option value="${city}">${cityTitleCase}</option>`;
      }
    } else {
      console.error("Failed to fetch city names:", data.message);
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}
window.onload = () => {
  fetchCities();
};
document
  .getElementById("hospital-resource-update-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const cityName = document.getElementById("cityName").value;
    const hospitalName = document.getElementById("hospitalName").value;
    const beds = document.getElementById("beds").value;
    const ventilators = document.getElementById("ventilators").value;
    const ICUCapacity = document.getElementById("ICUCapacity").value;
    const syringes = document.getElementById("syringes").value;
    const vaccineCapsules = document.getElementById("vaccineCapsules").value;
    const doctors = document.getElementById("doctors").value;
    const nurses = document.getElementById("nurses").value;
    const payload = {
      cityName: cityName,
      Name: hospitalName,
      Beds: beds,
      Ventilators: ventilators,
      ICUCapacity: ICUCapacity,
      Syringes: syringes,
      VaccineCapsules: vaccineCapsules,
      Doctors: doctors,
      Nurses: nurses,
    };
    try {
      const response = await fetch(
        "https://localhost:3000/covid/hospitals/resources/update/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      const messageDiv = document.getElementById("response-message");
      if (data.message === "OK") {
        messageDiv.innerText = "Submitted successfully!";
        messageDiv.classList.add("text-success");
      } else {
        messageDiv.innerText = "Error submitting the form!";
        messageDiv.classList.add("text-danger");
      }
    } catch (error) {
      console.error("Error updating hospital resources:", error);
      document.getElementById("response-message").innerText =
        "Error submitting the form!";
    }
  });
