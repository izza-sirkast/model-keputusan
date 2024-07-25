const investments = [
    { name: "Obligasi", values: [200, 65, 15] },
    { name: "Deposito", values: [175, 100, 40] },
    { name: "Properti", values: [250, 150, -100] },
  ];

  const probabilities = [0.3, 0.5, 0.2];

  function populateTable() {
    const tbody = document.getElementById("investment-tbody");
    tbody.innerHTML = "";

    investments.forEach((investment) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = investment.name;
      row.appendChild(nameCell);

      investment.values.forEach((value) => {
        const valueCell = document.createElement("td");
        valueCell.textContent = value;
        row.appendChild(valueCell);
      });

      tbody.appendChild(row);
    });
  }

  function calculateDecisions() {
    function expectedValue(investments, probabilities) {
      return investments.map((inv) => ({
        name: inv.name,
        value: inv.values.reduce(
          (sum, val, index) => sum + val * probabilities[index],
          0
        ),
      }));
    }

    function maximax(investments) {
      return investments.reduce(
        (max, inv) => {
          const maxVal = Math.max(...inv.values);
          return maxVal > max.value
            ? { name: inv.name, value: maxVal }
            : max;
        },
        { name: "", value: -Infinity }
      );
    }

    function maximin(investments) {
      return investments.reduce(
        (max, inv) => {
          const minVal = Math.min(...inv.values);
          return minVal > max.value
            ? { name: inv.name, value: minVal }
            : max;
        },
        { name: "", value: -Infinity }
      );
    }

    function rataRata(investments) {
      return investments.reduce(
        (max, inv) => {
          const avgVal =
            inv.values.reduce((a, b) => a + b) / inv.values.length;
          return avgVal > max.value
            ? { name: inv.name, value: avgVal }
            : max;
        },
        { name: "", value: -Infinity }
      );
    }

    const expectedValues = expectedValue(investments, probabilities);
    const maximaxDecision = maximax(investments);
    const maximinDecision = maximin(investments);
    const rataRataDecision = rataRata(investments);
    const expectedValueDecision = expectedValues.reduce(
      (max, ev) => (ev.value > max.value ? ev : max),
      { name: "", value: -Infinity }
    );

    const EVUC = investments[0].values
      .map((_, i) => Math.max(...investments.map((inv) => inv.values[i])))
      .reduce((sum, val, index) => sum + val * probabilities[index], 0);
    const EVPI = EVUC - expectedValueDecision.value;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
    <div class="result-item"><strong>Keputusan Maximax:</strong> ${
      maximaxDecision.value
    } (${maximaxDecision.name})</div>
    <div class="result-item"><strong>Keputusan Maximin:</strong> ${
      maximinDecision.value
    } (${maximinDecision.name})</div>
    <div class="result-item"><strong>Keputusan Sama Rata:</strong> ${
      rataRataDecision.value
    } (${rataRataDecision.name})</div>
    <div class="result-item"><strong>Expected Value Obligasi:</strong> ${
      expectedValues.find((ev) => ev.name === "Obligasi").value
    }</div>
    <div class="result-item"><strong>Expected Value Deposito:</strong> ${
      expectedValues.find((ev) => ev.name === "Deposito").value
    }</div>
    <div class="result-item"><strong>Expected Value Properti:</strong> ${
      expectedValues.find((ev) => ev.name === "Properti").value
    }</div>
    <div class="result-item"><strong>Keputusan Expected Value:</strong> ${
      expectedValueDecision.name
    }</div>
    <div class="result-item"><strong>Expected Value Under Certainly (EVUC):</strong> ${EVUC}</div>
    <div class="result-item"><strong>Expected Value of Perfect Information (EVPI):</strong> ${EVPI}</div>
`;
  }

  document.addEventListener("DOMContentLoaded", populateTable);