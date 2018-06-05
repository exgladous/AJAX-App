var input = document.getElementById("search"),
    output = document.getElementById("output"),
    submitbutton = document.getElementById("submit"),
    clearbutton = document.getElementById("clear");

submitbutton.addEventListener("click", sendRequest);
clearbutton.addEventListener("click", clear);

function sendRequest() {
    name = input.value;
    // input.value = ""

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                displayResponseData(this.responseText);
            } else if (this.status === 404) {
                output.textContent = "No Breaches Found"
            }
        } else {

        }
    };
    httpRequest.open("GET", "https://haveibeenpwned.com/api/v2/breachedaccount/" + name, true);
    httpRequest.send();
}

function displayResponseData(data) {
    output.textContent = ""
    data = JSON.parse(data);
    console.log(data);
    table = document.createElement("table");

    tr = document.createElement("tr");
    td = document.createElement("td");
    txt = document.createTextNode("");

    txt.textContent = "Name";
    td.appendChild(txt);
    tr.appendChild(td);

    td = document.createElement("td");
    txt = document.createTextNode("");

    txt.textContent = "URL";
    td.appendChild(txt);
    tr.appendChild(td);

    td = document.createElement("td");
    txt = document.createTextNode("");

    txt.textContent = "Date";
    td.appendChild(txt);
    tr.appendChild(td);

    td = document.createElement("td");
    txt = document.createTextNode("");

    txt.textContent = "Description";
    td.appendChild(txt);
    tr.appendChild(td);

    table.appendChild(tr)

    for (i = 0; i < data.length; i++) {
        tr = document.createElement("tr");
        td = document.createElement("td");
        txt = document.createTextNode("");

        txt.textContent = data[i].Title;
        td.appendChild(txt);
        tr.appendChild(td);

        td = document.createElement("td");
        txt = document.createTextNode("");

        txt.textContent = data[i].Domain;
        td.appendChild(txt);
        tr.appendChild(td);

        td = document.createElement("td");
        txt = document.createTextNode("");

        txt.textContent = data[i].BreachDate;
        td.appendChild(txt);
        tr.appendChild(td);

        td = document.createElement("td");
        txt = document.createTextNode("");

        td.innerHTML = data[i].Description;
        tr.appendChild(td);

        table.appendChild(tr);
    }
    output.appendChild(table)
}

function clear() {
    output.textContent = ""
}
