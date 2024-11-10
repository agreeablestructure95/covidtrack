document
  .getElementById("update-case-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const region = document.getElementById("region").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const dosage = document.getElementById("dosage").value;
    const covidStatus = document.getElementById("covidStatus").value;
    const vaccineStatus = document.getElementById("vaccineStatus").value;
    const payload = {
      cityName: region,
      Name: name,
      Age: age,
      Sex: sex,
      Dosage: dosage,
      CovidStatus: covidStatus,
      VaccineStatus: vaccineStatus === "true",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/covid/cases/update/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data);
      document.getElementById("response-message").innerText = data.message; // Display response message
    } catch (error) {
      console.error("Error updating case:", error);
      document.getElementById("response-message").innerText =
        "Error updating case.";
    }
  });
