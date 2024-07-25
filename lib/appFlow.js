// Fungsi untuk mendapatkan nilai investment baru sesuai dengan input user
export function updateInvestmentsValue(){
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
        if(pv == "" || !pv){
            return alert("Semua nilai prospek harus diisi"); 
        }
        newInvestment.values.push(parseInt(pv));
        }

        investments.push(newInvestment)

    }

    return investments
}

// Mengenerate tabel sesuai dengan jumlah input keinginan user
export function generateNewTable(){
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

    // Hapus result container
    const resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";
}

// Fungsi untuk mengisi tabel sesuai dengan data default (studi kasus)
export function populateTable(investments) {
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