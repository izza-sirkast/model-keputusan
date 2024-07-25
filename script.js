const investments = [
    { name: "Obligasi", values: [200, 65, 15] },
    { name: "Deposito", values: [175, 100, 40] },
    { name: "Properti", values: [250, 150, -100] },
];


const probabilities = [0.3, 0.5, 0.2];

// Select semua radio buttons opsiProgram
const radbutOpsiProgram = document.querySelectorAll('input[name="opsiProgram"]');

// Event listener untuk radio buttons opsiProgram
radbutOpsiProgram.forEach(radio => {
  radio.addEventListener('change', () => {
    if(radio.value == "studiKasus"){
      // Sembunyikan input untuk kontrol model keputusan input
      const jumlahInput = document.getElementById("user-input-controls");
      jumlahInput.classList.add("hidden")

      // Ubah tabel menjadi default
      populateTable();

    }else if(radio.value == "userInput"){
      // Tampilkan input untuk kontrol model keputusan input
      const jumlahInput = document.getElementById("user-input-controls");
      jumlahInput.classList.remove("hidden")

      // Ubah tabel menjadi user input
      generateNewTable();
    }
    
  });
});


function generateNewTable(){
  const numAlternatives = parseInt(document.getElementById("numAlternatives").value);
  const tbody = document.getElementById("investment-tbody");
  tbody.innerHTML = "";

  // Generate body
  for (let i = 0; i < numAlternatives; i++) {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.className = "p-1 border rounded alternativeInvestments";
      nameCell.appendChild(nameInput);
      row.appendChild(nameCell);

      for (let j = 0; j < 3; j++) {
        const valueCell = document.createElement("td");
        const valueInput = document.createElement("input");
        valueInput.type = "number";
        valueInput.className = `p-1 border rounded nilaiProspek-${i}`;
        valueCell.appendChild(valueInput);
        row.appendChild(valueCell);
      }

      tbody.appendChild(row);
  }
}

function updateInvestmentsValue(){
  const alternativeInvestments = document.getElementsByClassName("alternativeInvestments")

  // investments baru
  let investments = [];

  for(let i = 0; i < alternativeInvestments.length; i++){
    const aiVal = alternativeInvestments[i].value
    
    // Validasi nilai alternative investments
    if(aiVal == ""){
      return alert("Semua alternative investments harus diisi");
    }

    console.log(aiVal)
    let newInvestment = {};
    newInvestment.name = aiVal;
    newInvestment.values = [];

    const curProspekValues = document.getElementsByClassName(`nilaiProspek-${i}`);
    console.log(curProspekValues)

    for(let j = 0; j < curProspekValues.length; j++){
      const pv = curProspekValues[j].value;
      console.log(pv)
      if(pv == "" || !pv){
        return alert("Semua nilai prospek harus diisi"); 
      }
      newInvestment.values.push(pv);
    }

    investments.push(newInvestment)

  }

  console.log(investments)
}

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
  updateInvestmentsValue();
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
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Keputusan Maximax:</strong> ${
    maximaxDecision.value
  } (${maximaxDecision.name})</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Keputusan Maximin:</strong> ${
    maximinDecision.value
  } (${maximinDecision.name})</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Keputusan Sama Rata:</strong> ${
    rataRataDecision.value
  } (${rataRataDecision.name})</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Expected Value Obligasi:</strong> ${
    expectedValues.find((ev) => ev.name === "Obligasi").value
  }</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Expected Value Deposito:</strong> ${
    expectedValues.find((ev) => ev.name === "Deposito").value
  }</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Expected Value Properti:</strong> ${
    expectedValues.find((ev) => ev.name === "Properti").value
  }</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Keputusan Expected Value:</strong> ${
    expectedValueDecision.name
  }</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Expected Value Under Certainly (EVUC):</strong> ${EVUC}</div>
  <div class="mb-3 p-4 bg-slate-50 border border-slate-200 rounded-md"><strong>Expected Value of Perfect Information (EVPI):</strong> ${EVPI}</div>
`;
}

document.addEventListener("DOMContentLoaded", populateTable);