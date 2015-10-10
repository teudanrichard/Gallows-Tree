pontszam = 50;

function continueGame() {
    szam = parseInt(localStorage.getItem("word"));
    szo = words[szam];
    hossz = szo.length;
    hiba = 0;
    document.getElementById("image").src = "images/128/" + (hiba + 1) + ".png";
    nhibas_b = [26];
    hibas_b = [26];
    jo = "";
    hibas = "";
    k = 0;
    szoCheck2(szam, hossz);
    var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (var i = 0; i < abc.length; i++) {
        if (localStorage.getItem("wrong").indexOf(abc[i]) != -1) {
            checkChar2(abc[i]);
        } else if (localStorage.getItem("good").indexOf(abc[i]) != -1) {
            checkChar2(abc[i]);
        } else {
            document.getElementById(abc[i]).disabled = false;
            document.getElementById(abc[i]).style.backgroundColor = "#D8D8D8";
        }
    }
    pontszam = parseInt(localStorage.getItem("score"));
    kiir("pontszam", "Score: " + pontszam);
    var element = document.getElementById('diffSelect');
    element.value = parseInt(localStorage.getItem("diff"));
    kiir("difficult","Difficult: "+localStorage.getItem("diff"));
}

function ujSzo() {
    
    szam = Math.floor((Math.random() * words.length) + 1);
    szo = words[szam];
    hossz = szo.length;
    if(hossz<4){
        ujSzo();
    }
    hiba = 0;
    document.getElementById("image").src = "images/128/" + (hiba + 1) + ".png";
    nhibas_b = [26];
    hibas_b = [26];
    jo = "";
    hibas = "";
    k = 0;
    var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    for (var i = 0; i < abc.length; i++) {
        document.getElementById(abc[i]).disabled = false;
        document.getElementById(abc[i]).style.backgroundColor = "#D8D8D8";
    }
    kiir("error", "");
    localStorage.setItem("word", szam);
    localStorage.setItem("wrong", "");
    localStorage.setItem("good", "");
    localStorage.setItem("score", "" + pontszam);
    var element = document.getElementById('diffSelect');
    element.value = parseInt(localStorage.getItem("diff"));
    kiir("difficult","Difficult: "+localStorage.getItem("diff"));
    kiir("pontszam","Score: "+localStorage.getItem("score"));
    szoCheck(szam, hossz);
    
}

function szoCheck(szam, hossz) {
    kitalalando = [hossz];
    var megjelenit = "";
    for (i = 0; i < hossz; i++) {
        kitalalando[i] = "_";
        megjelenit = megjelenit + " " + kitalalando[i];
    }
    kiir("szo-kitalalando", "" + megjelenit);
    for (var i = 0; i < parseInt(localStorage.getItem("diff")); i++) {
        if (parseInt(localStorage.getItem("diff")) == 3) {
            if (szo.split("")[0] != szo.split("")[1] && szo.split("")[0] != szo.split("")[2] && szo.split("")[1] != szo.split("")[2]) {
                checkChar(szo.split("")[i]);
            } else if (szo.split("")[0] == szo.split("")[1]) {
                checkChar(szo.split("")[0]);
                checkChar(szo.split("")[2]);
                break;
            } else if (szo.split("")[0] == szo.split("")[2]) {
                checkChar(szo.split("")[0]);
                checkChar(szo.split("")[1]);
                break;
            } else if (szo.split("")[1] == szo.split("")[2]) {
                checkChar(szo.split("")[0]);
                checkChar(szo.split("")[1]);
                break;
            }
        } else if (parseInt(localStorage.getItem("diff")) == 2) {
            if (szo.split("")[0] != szo.split("")[1]) {
                checkChar(szo.split("")[i]);
            } else if (szo.split("")[0] == szo.split("")[1]) {
                checkChar(szo.split("")[0]);
                break;
            }
        } else {
            checkChar(szo.split("")[0]);
        }
    }
}
function szoCheck2(szam, hossz) {
    kitalalando = [hossz];
    var megjelenit = "";
    for (i = 0; i < hossz; i++) {
        kitalalando[i] = "_";
        megjelenit = megjelenit + " " + kitalalando[i];
    }
    kiir("szo-kitalalando", "" + megjelenit);
}
function minusScore(){
    pontszam-=1;
}

function checkScore(score){
    if(localStorage.getItem("hscore") == null)
        localStorage.setItem("hscore",score);
    
    if(parseInt(localStorage.getItem("hscore"))<score){
        localStorage.setItem("hscore",score);
    }
    
}

function diffSelect(){
    var number = parseInt(document.getElementById("diffSelect").value);
    localStorage.setItem("diff",""+number);
}
function keres(beirt) {
    var talalat = 0;
    for (var i = 0; i < hossz; i++) {
        if (kitalalando[i] === "_") {
            if (beirt === szo.split("")[i]) {
                kitalalando[i] = beirt;
                talalat++;
            } else {
                kitalalando[i] = "_";
            }
        }
    }
    if (talalat === 0) {
        document.getElementById(beirt).style.backgroundColor = "rgba(255,30,30,0.5)";
        hiba++;
        if (hiba <= 7) {
            document.getElementById("image").src = "images/128/" + (hiba+1) + ".png";
        }

        var van = 0;
        for (var i = 0; i < hibas_b.length; i++) {
            if (beirt === hibas_b[i]) {
                van = 1;
            }
        }
        for (var i = 0; i < kitalalando.length; i++) {
            if (beirt === kitalalando[i]) {
                van = 1;
            }
        }
        if (!van) {
            hibas_b[k++] = beirt;
            hibas += beirt + ",";
            localStorage.setItem("wrong", hibas);
            kiir("error", localStorage.getItem("wrong"));
        }
    } else {
        jo += beirt + ",";
        localStorage.setItem("good", jo);
        document.getElementById(beirt).style.backgroundColor = "rgba(30,255,30,0.5)";
    }
    var megjelenit = "";

    for (i = 0; i < hossz; i++) {
        megjelenit = megjelenit + " " + kitalalando[i];
    }
    kiir("szo-kitalalando", "" + megjelenit);
}

function keres2(beirt) {
    var talalat = 0;
    for (var i = 0; i < hossz; i++) {
        if (kitalalando[i] === "_") {
            if (beirt === szo.split("")[i]) {
                kitalalando[i] = beirt;
                talalat++;
                kiir("pontszam", "Score: " + pontszam);
            } else {
                kitalalando[i] = "_";
            }
        }
    }
    if (talalat === 0) {
        document.getElementById(beirt).style.backgroundColor = "rgba(255,30,30,0.5)";
        hiba++;
        if (hiba <= 7) {
            document.getElementById("image").src = "images/128/" + (hiba+1) + ".png";
        }

        var van = 0;
        for (var i = 0; i < hibas_b.length; i++) {
            if (beirt === hibas_b[i]) {
                van = 1;
            }
        }
        for (var i = 0; i < kitalalando.length; i++) {
            if (beirt === kitalalando[i]) {
                van = 1;
            }
        }
        if (!van) {
            hibas_b[k++] = beirt;
            hibas += beirt + ",";
            kiir("error", localStorage.getItem("wrong"));
        }
    } else {
        kiir("pontszam", "Score: " + pontszam);
        jo += beirt + ",";
        document.getElementById(beirt).style.backgroundColor = "rgba(30,255,30,0.5)";
    }
    var megjelenit = "";

    for (i = 0; i < hossz; i++) {
        megjelenit = megjelenit + " " + kitalalando[i];
    }
    kiir("szo-kitalalando", "" + megjelenit);
}

function checkChar2(param) {
    document.getElementById(param).disabled = true;
    if(pontszam <= 0)
    {
        alert("Game over.");
        pontszam=50;
        window.location.href = "NewGame.html";
    }
    keres2(param);
    if (hiba >= 7) {
        var confirm_alert = confirm("Sorry the word is: \n"+szo);
        if (confirm_alert == true) {
            pontszam -= hiba;
            kiir("pontszam", "Score: " + pontszam);
            localStorage.setItem("score", "" + pontszam);
            checkScore(localStorage.getItem("score"));
            ujSzo();
        } else {
            pontszam -= hiba;
            alert("Vége a játéknak\nAz elért pontszámod: " + pontszam);
            window.location.href = "index.html";
        }
    } else {
        if (kitalalando.join("") === szo) {
            var confirm_alert = confirm("Szeretnél új szót kérni és folytatni a játékot?");
            if (confirm_alert == true) {
                pontszam += szo.length;
                kiir("pontszam", "Score: " + pontszam);
                localStorage.setItem("score", "" + pontszam);
                checkScore(localStorage.getItem("score"));
                ujSzo();
            } else {
                alert("Vége a játéknak\nAz elért pontszámod: " + pontszam);
                window.location.href = "menu.html";
            }
        }
    }
}
function checkChar(param) {
    document.getElementById(param).disabled = true;
    if(pontszam <= 0)
    {
        alert("Game over.");
        pontszam=50;
        window.location.href = "NewGame.html";
    }
    keres(param);
    if (hiba >= 7) {
        var confirm_alert = confirm("Sorry the word is: \n"+szo+"\nDo you want to continue?");
        if (confirm_alert == true) {
            pontszam -= hiba;
            kiir("pontszam", "Score: " + pontszam);
            localStorage.setItem("score", "" + pontszam);
            checkScore(localStorage.getItem("score"));
            ujSzo();
        } else {
            pontszam -= hiba;
            alert("Congratulation\nYour score is: " + pontszam);
            window.location.href = "index.html";
        }
    } else {
        if (kitalalando.join("") === szo) {
            var confirm_alert = confirm("Good job: \n"+szo+"\nDo you want to continue?");
            if (confirm_alert == true) {
                pontszam += szo.length;
                kiir("pontszam", "Score: " + pontszam);
                localStorage.setItem("score", "" + pontszam);
                checkScore(localStorage.getItem("score"));
                ujSzo();
            } else {
                pontszam += szo.length;
                alert("Congratulation\nYour score is: " + pontszam);
                window.location.href = "index.html";
            }
        }
    }
}
function saveDifficulty(nehezseg){
    localStorage.setItem(nehezseg);
}

function kiir(hova, mit) {
    document.getElementById(hova).innerHTML = mit;
}