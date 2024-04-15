let host = getHost();
updateTheNavigationBar();

async function addGuitar() {
    let message = "";
    let sn = document.getElementById("serial_number").value;
    let p = document.getElementById("price").value;
    let b = document.getElementById("builder").value;
    let m = document.getElementById("model").value;
    let t = document.getElementById("type").value;
    let bw = document.getElementById("back_wood").value;
    let tw = document.getElementById("top_wood").value;
    if (sn === "" || p === "" || b === "" || m === "" || t === "" || bw === "" || tw === "" ) {
        alert("Please fill in all fields!");
        return;
    }
    let guitar = {serialNumber: sn, price: p, builder: b, model: m, type: t, backWood: bw, topWood: tw};
    console.log("You entered: " + JSON.stringify(guitar));
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${configuration.token()}`
        },
        body: JSON.stringify(guitar)
    }
    let response = await fetch(host + "/inventory", request);
    if (response.status == 200) {
        message = "The guitar was added to the system.";
    } else {
        message = "Something went wrong. Please try again or contact the customer support team.";
    }
    console.log(message);
    return;
}