window.addEventListener("load", () => {
    var tekst = document.getElementById("tekst");
    var voegToe = document.getElementById("voegToe");
    var wis = document.getElementById("wis");
    var stickyboard = document.getElementById("stickyboard");
    var arrayLocalStorage = [];
    var noteNumber = 0;

    //Werkt niet in FireFox:
    for (key in localStorage) {
        arrayLocalStorage.push(localStorage.getItem(key));
    }

    console.log(arrayLocalStorage);

    //Werkt niet in FireFox:
    for(key in localStorage)
        if (key.indexOf("sticky") !== -1) {
            localStorage.removeItem(key)
        }

    localStorage.clear();

    var i=0;

    arrayLocalStorage.forEach((element) => {
        addSticky(element);
        localStorage.setItem("sticky"+i, element);
        i++;
    })

    voegToe.addEventListener("click", (e) => {
        if (!tekst.value) {         //dit is hetzelfde als: (tekst.value.length == 0)
            tekst.setAttribute("class", "form-control bg-danger");
            e.preventDefault();
        }
        else {tekst.setAttribute("class", "form-control");
            addSticky(tekst.value);
            tekst.value = "";
            tekst.focus();          //zorgt ervoor dat de cursor in het inputveld blijft staan, nadat je op de voegToe toets gedrukt hebt
        }
    });

    tekst.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        if (!tekst.value) {
            tekst.setAttribute("class", "form-control bg-danger");
            e.preventDefault();
        }
        else {
            tekst.setAttribute("class", "form-control");
            addSticky(tekst.value);
            tekst.value = "";
        }
    }
    });

    wis.addEventListener("click", () => {
        noteNumber = 0;
        stickyboard.innerHTML = "";
        //Werkt niet in FireFox:
        for(key in localStorage){
        if (key.indexOf("sticky") !== -1) {
            localStorage.removeItem(key)
        }}
        console.log("test");

    });

    stickyboard.addEventListener("dblclick", (e) => {
        if (e.target.id != "stickyboard"){
            var teVerwijderenSticky = document.getElementById(e.target.id);
            stickyboard.removeChild(teVerwijderenSticky);
            localStorage.removeItem(e.target.id);
        }
    });

    stickyboard.addEventListener("mousedown", (e) => {
        if (e.button == 2 && (e.target.id != "stickyboard")){
            var teWijzigenSticky = document.getElementById(e.target.id);
            var newTekst = prompt("Wijzig tekst", e.target.innerHTML)
            localStorage.setItem(e.target.id, newTekst);
            if (newTekst != null){
                e.target.innerHTML = newTekst;
            }
        }
    });

    function addSticky(stickyTekst){
        var stickynoteNew = document.createElement("div");
        stickynoteNew.setAttribute("id", "sticky"+noteNumber);
        stickynoteNew.setAttribute("class", "container sticky rotation col-md-3 col-sm-1");
        stickynoteNew.innerHTML = stickyTekst;
        stickyboard.appendChild(stickynoteNew);
        localStorage.setItem(document.getElementById("sticky"+noteNumber).id, stickyTekst);
        noteNumber++;
    };
})
