import { createResultComponents, maximax, maximin, rataRata, expectedValue, EVUC } from "./lib/appLogic.js";

import { updateInvestmentsValue, generateNewTable, populateTable } from "./lib/appFlow.js";

const investments = [
    { name: "Obligasi", values: [200, 65, 15] },
    { name: "Deposito", values: [175, 100, 40] },
    { name: "Properti", values: [250, 150, -100] },
];

const probabilities = [0.3, 0.5, 0.2];


// Select semua radio buttons opsiProgram
const radbutOpsiProgram = document.querySelectorAll('input[name="opsiProgram"]');

// Event listener untuk radio buttons opsiProgram
// Mengubah kondisi aplikasi dari studi kasus menjadi user input atau sebaliknya
radbutOpsiProgram.forEach(radio => {
  radio.addEventListener('change', () => {
    if(radio.value == "studiKasus"){
      // Sembunyikan input untuk kontrol model keputusan input
      const jumlahInput = document.getElementById("user-input-controls");
      jumlahInput.classList.add("hidden")

      // Ubah tabel menjadi default
      populateTable(investments);

      // Hapus result container
      const resultContainer = document.getElementById("results");
      resultContainer.innerHTML = "";

    }else if(radio.value == "userInput"){
      // Tampilkan input untuk kontrol model keputusan input
      const jumlahInput = document.getElementById("user-input-controls");
      jumlahInput.classList.remove("hidden")

      // Ubah tabel menjadi user input
      generateNewTable();

      // Hapus result container
      const resultContainer = document.getElementById("results");
      resultContainer.innerHTML = "";
    }
    
  });
});


// Fungsi utama untuk menghitung keputusan
function calculateDecisions() {
  let currentInvestments;

  // Ambil data investments sesuai dengan studi kasus atau dari user input
  const userInput = document.getElementById("userInput");
  if(userInput.checked){
    currentInvestments = updateInvestmentsValue();
  }else{
    currentInvestments = investments;
  }

  // Menghitung setiap nilai keputusan
  const maximaxDecision = maximax(currentInvestments);
  const maximinDecision = maximin(currentInvestments);
  const rataRataDecision = rataRata(currentInvestments);
  const expectedValues = expectedValue(currentInvestments, probabilities);
  const evuc = EVUC(currentInvestments, probabilities)
  const resultsDiv = document.getElementById("results");

  // Mengenerate html components untuk hasil
  const resultString = createResultComponents(maximaxDecision, maximinDecision, rataRataDecision, expectedValues, evuc);

  // Update html
  resultsDiv.innerHTML = resultString;
}

// Tombol untuk menghitung keputusan
const calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", calculateDecisions);

// Tombol untuk mengisi tabel berdasarkan user input
const buatTabelButton = document.getElementById("buatTabelButton");
buatTabelButton.addEventListener("click", generateNewTable);

// Saat aplikasi dimulai secara default menggunakan data studi kasus
document.addEventListener("DOMContentLoaded", () => {
  populateTable(investments);
});