// Fungsi untuk men-generate html berdasarkan hasil perhitungan model keputusan. Fungsi mengembalikan html berupa string
export function createResultComponents(maximax, maximin, rataRata, ev, evuc){
    console.log(evuc)
    console.log("")

    let resultString = "";

    resultString += `
        <div class="pl-4 p-2 text-xl font-bold border border-slate-400 rounded-md bg-slate-100">
          Pengambilan Keputusan pada Kondisi Ketidakpastian
        </div>

        <div class="pl-4 mt-2">
          <div class="text-xl font-bold">
            <span class="text-xl">&#8594;</span> Maximax (Keputusan Optimistik)
          </div>

          <div class="flex flex-col pl-5">
    `
    let maxString = ''
    maximax.nilaiMax.forEach((mx, i) => {
        resultString += `
            <span>Nilai maksimum alternatif ${mx.keputusan} : ${mx.max}</span>
        `
        maxString += `${mx.max}${i < maximax.nilaiMax.length - 1 ? ', ' : ''}`
    })
    
    resultString += `
        <span class="mt-2">Nilai maximax = max(${maxString})</span>
            <span>Nilai maximax = ${maximax.maximaxVal.max}</span>
            <span class="mt-2"><span class="">&#8594; </span>Maka, keputusan yang dipilih adalah investasi <strong>${maximax.maximaxVal.keputusan}</strong> dengan harapan mendapatkan hasil sebesar <strong>${maximax.maximaxVal.max} juta</strong></span>
          </div>
        </div>

        <div class="pl-4 mt-3 border-t border-slate-400 pt-1">
          <div class="text-xl font-bold">
            <span class="text-xl">&#8594;</span> Maximin (Keputusan Pesimistik)
          </div>

          <div class="flex flex-col pl-5">
    `

    let minString = ''
    maximin.nilaiMin.forEach((mx, i) => {
        resultString += `
            <span>Nilai minimum alternatif ${mx.keputusan} : ${mx.max}</span>
        `
        minString += `${mx.max}${i < maximin.nilaiMin.length - 1 ? ', ' : ''}`
    })

    resultString += `
        <span class="mt-2">Nilai maximin = max(${minString})</span>
            <span>Nilai maximin = ${maximin.maximinVal.max}</span>
            <span class="mt-2"><span class="">&#8594; </span>Maka, keputusan yang dipilih adalah investasi <strong>${maximin.maximinVal.keputusan}</strong> dengan harapan mendapatkan hasil sebesar <strong>${maximin.maximinVal.max} juta</strong></span>
          </div>
        </div>

        <div class="pl-4 mt-3 border-t border-slate-400 pt-1">
          <div class="text-xl font-bold ">
            <span class="text-xl">&#8594;</span> Sama Rata (Laplace)
          </div>

          <div class="flex flex-col pl-5">
    `

    let rerataString = ''
    rataRata.nilaiRata.forEach((rt, i) => {
        resultString += `
            <span>Nilai rata-rata alternatif ${rt.keputusan} : ${rt.rataRata}</span>
        `
        rerataString += `${rt.rataRata}${i < rataRata.nilaiRata.length - 1 ? ', ' : ''}`
    })

    resultString += `
        <span class="mt-2">Nilai rata-rata = max(${rerataString})</span>
            <span>Nilai rata-rata = ${rataRata.rataRataVal.rataRata}</span>
            <span class="mt-2"><span class="">&#8594; </span>Maka, keputusan yang dipilih adalah investasi <strong>${rataRata.rataRataVal.keputusan}</strong> dengan harapan mendapatkan hasil sebesar <strong>${rataRata.rataRataVal.rataRata} juta</strong></span>
          </div>
        </div>

        <div class="pl-4 p-2 mt-10 text-xl font-bold border border-slate-400 rounded-md bg-slate-100">
          Pengambilan Keputusan pada Kondisi Beresiko
        </div>

        <div class="pl-4 mt-2">
          <div class="text-xl font-bold ">
            <span class="text-xl">&#8594;</span> Expected Value (EV)
          </div>

          <div class="flex flex-col pl-5">
    `

    let evString = ''
    ev.nilaiEV.forEach((exv, i) => {
        resultString += `
            <span>EV ${exv.keputusan} = ${exv.functionString} = ${exv.ev}</span>
        `
        evString += `${exv.ev}${i < ev.nilaiEV.length - 1 ? ', ' : ''}`
    })

    let evpi = evuc.evucVal - ev.EVmax.ev

    resultString += `
        <span class="mt-2">Nilai EV = max(${evString})</span>
            <span>Nilai EV = ${ev.EVmax.ev}</span>
            <span class="mt-2"><span class="">&#8594; </span>Maka, keputusan yang dipilih adalah investasi <strong>${ev.EVmax.keputusan}</strong> dengan harapan mendapatkan hasil sebesar <strong>${ev.EVmax.ev} juta</strong></span>
          </div>
        </div>

        <div class="pl-4 p-2 mt-10 text-xl font-bold border border-slate-400 rounded-md bg-slate-100">
          Pengambilan Keputusan pada Kondisi Pasti
        </div>

        <div class="pl-4 mt-2">
          <div class="text-xl font-bold ">
            <span class="text-xl">&#8594;</span> Expected Value Under Certainty (EVUC)
          </div>

          <div class="flex flex-col pl-5">
            <span>EVUC = &Sigma;pi.Mi</span>
            <span>EVUC = ${evuc.functionString}</span>
            <span>EVUC = ${evuc.evucVal}</span>
            <span class="mt-2"><span class="">&#8594; </span>Maka, nilai harapan untuk EVUC sebesar <strong>${evuc.evucVal} juta</strong></span>
          </div>
        </div>

        <div class="pl-4 mt-3 border-t border-slate-400 pt-1">
          <div class="text-xl font-bold ">
            <span class="text-xl">&#8594;</span> Expected Value of Perfect Information (EVPI)
          </div>

          <div class="flex flex-col pl-5">
            <span>EVPI = EVUC - EVmaks</span>
            <span>EVPI = ${evuc.evucVal} - ${ev.EVmax.ev}</span>
            <span>EVPI = ${evpi}</span>
            <span class="mt-2"><span class="">&#8594; </span>Maka, nilai harapan untuk informasi sempurna sebesar <strong>${evpi} juta</strong></span>
          </div>
        </div>

      </div>
    </div>
    `

    return resultString;
}

export function maximax(investments) {
    let nilaiMax = [];
    let maximaxVal = {max:-Infinity};
    for(let i = 0; i < investments.length; i++){
        let maxVal = Math.max(...investments[i].values)
        let maxObj = {keputusan:investments[i].name, max:maxVal}
        nilaiMax.push(maxObj)
        if(maxObj.max > maximaxVal.max){
        maximaxVal = maxObj
        }
    }
    return {maximaxVal, nilaiMax}
}

export function maximin(investments) {
    let nilaiMin = [];
    let maximinVal = {max:-Infinity};
    for(let i = 0; i < investments.length; i++){
        let minVal = Math.min(...investments[i].values)
        let minObj = {keputusan:investments[i].name, max:minVal}
        nilaiMin.push(minObj)
        if(minObj.max > maximinVal.max){
        maximinVal = minObj
        }
    }
    return {maximinVal, nilaiMin}
}

export function rataRata(investments) {
    let nilaiRata = [];
    let rataRataVal = {rataRata:-Infinity};
    for(let i = 0; i < investments.length; i++){
        let sum = investments[i].values.reduce((acc, cur) => acc + cur, 0);
        console.log(sum)
        let rerata = sum / investments[i].values.length;
        console.log(rerata)
        let curRataRata = parseFloat(rerata.toFixed(2));
        console.log(curRataRata)
        let rerataObj = {keputusan:investments[i].name, rataRata:curRataRata}
        nilaiRata.push(rerataObj)
        if(rerataObj.rataRata > rataRataVal.rataRata){
        rataRataVal = rerataObj
        }
    }
    return {rataRataVal, nilaiRata}
}

export function expectedValue(investments, probabilities) {
    let nilaiEV = [];
    let EVmax = {ev:-Infinity};
    for(let i = 0; i < investments.length; i++){
        
        let functionString = ""
        let curEV = 0; 

        for(let j = 0; j < probabilities.length; j++){
        curEV += probabilities[j] * investments[i].values[j];

        functionString += probabilities[j].toString() + " * " + investments[i].values[j].toString();

        if(j < probabilities.length - 1){
            functionString += " + "
        }
        }

        let evObj = {keputusan:investments[i].name, ev:curEV, functionString}
        nilaiEV.push(evObj)

        if(evObj.ev > EVmax.ev){
        EVmax = evObj
        }
    }
    return {EVmax, nilaiEV}
}

export function EVUC(investments, probabilities){
    let functionString = "";
    let evucVal = 0;
    for(let i = 0; i < probabilities.length; i++){
        
        let maxValInProspek = -Infinity
        for(let j = 0; j < investments.length; j++){
        if(investments[j].values[i] > maxValInProspek){
            maxValInProspek = investments[j].values[i]
        }
        }

        evucVal += probabilities[i] * maxValInProspek
        functionString += `${probabilities[i]} * ${maxValInProspek}`

        if(i < probabilities.length - 1){
        functionString += " + "
        }
    }

    return {evucVal, functionString}
}