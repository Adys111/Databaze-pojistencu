// Funkce která ověří data před odesláním, popřípadě vyhodí upozornění
function validateForm() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    if (name == "") {
        alert("Je vyžadováno jméno");
        return false;
    }

    if (age == "") {
        alert("Je vyžadován věk");
        return false;
    }
    else if (age < 1) {
        alert("Věk musí být větší než 0");
        return false;
    }

    if (address == "") {
        alert("Je vyžadována adresa");
        return false;
    }

    if (email == "") {
        alert("Je vyžadován email");
        return false;
    }
    else if (!email.includes("@")) {
        alert("Špatný email");
        return false;
    }

    return true
}

// Funkce která zobrazí data z localstorage
function showData() {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    let html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Smazat</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Upravit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Načte všechna data z localstorage
document.onload = showData();

// Funkce pro přidání pojištěnců do localstorage
function AddData() {
    // pokud je formulář správně
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;

        let peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }

        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

// Funkce pro vymazání dat z localstorage
function deleteData(index) {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// Funkce pro úpravu pojištěnce update/edit
function updateData(index) {
    // Upravit button se schová a přidat pojištěnce button přidá pojištěnce
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function(){
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            // Přidat pojištěnce button se schová a upravit button nám pomůže upravit informace v localstorage
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}