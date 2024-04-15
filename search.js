let host = getHost();
let guitars = [];
updateTheNavigationBar();

async function search() {
    if (guitars.length == 0) {
        guitars = await getAllMatchingGuitars();
    }
    let table = document.getElementById("searchResult");
    table.innerHTML = "";
    for (let guitar of guitars) {
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        let cell5 = document.createElement("td");
        let cell6 = document.createElement("td");
        let cell7 = document.createElement("td");
        let sn = document.createTextNode(guitar.serialNumber);
        let p = document.createTextNode(guitar.price);
        let b = document.createTextNode(guitar.builder);
        let m = document.createTextNode(guitar.model);
        let t = document.createTextNode(guitar.type);
        let bw = document.createTextNode(guitar.backWood);
        let tw = document.createTextNode(guitar.topWood);
        cell1.appendChild(sn);
        cell2.appendChild(p);
        cell3.appendChild(b);
        cell4.appendChild(m);
        cell5.appendChild(t);
        cell6.appendChild(bw);
        cell7.appendChild(tw);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        table.appendChild(row);
    }
    guitars = []
    return;
}

async function getAllMatchingGuitars() {
    let request = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${configuration.token()}`
        }
    };
    let guitarSerialNumber = document.getElementById("serial_number").value ?? '';
    let guitarPrice = document.getElementById("price").value ?? -1;
    let guitarBuilder = document.getElementById("builder").value ?? '';
    let guitarModel = document.getElementById("model").value ?? '';
    let guitarType = document.getElementById("type").value ?? '';
    let guitarBackWood = document.getElementById("back_wood").value ?? '';
    let guitarTopWood = document.getElementById("top_wood").value ?? '';
    let searchparameters = `?serialNumber=${guitarSerialNumber}&price=${guitarPrice}&builder=${guitarBuilder}&model=${guitarModel}&type=${guitarType}&backWood=${guitarBackWood}&topWood=${guitarTopWood}`;
    let response = await fetch(host + "/inventory/search" + searchparameters, request);
    if (response.status == 200) {
        guitars = await response.json();
    }
    else {
        console.log(response);
        alert("Something went wrong trying to search for your desired guitar.")
    }
    return guitars;
}