function toggleSection() {
  const section = document.querySelector(".section");
  const content = document.getElementById("school-info");
  const arrow = document.getElementById("arrow").querySelector("i");

  section.classList.toggle("active"); // tu zmiana wyglądu
  content.classList.toggle("show");

  if (content.classList.contains("show")) {
    arrow.classList.replace("fa-chevron-down", "fa-chevron-up");
  } else {
    arrow.classList.replace("fa-chevron-up", "fa-chevron-down");
  }
}

function aktualizujCzasOkazania() {
  const span = document.getElementById("czas-okazania");
  const teraz = new Date();

  // formatowanie czasu: DD.MM.RRRR HH:MM
  const dzien = String(teraz.getDate()).padStart(2, '0');
  const miesiac = String(teraz.getMonth() + 1).padStart(2, '0');
  const rok = teraz.getFullYear();

  const godzina = String(teraz.getHours()).padStart(2, '0');
  const minuta = String(teraz.getMinutes()).padStart(2, '0');

  span.textContent = `${dzien}.${miesiac}.${rok} ${godzina}:${minuta}`;
}

// ustaw czas od razu po załadowaniu strony
document.addEventListener("DOMContentLoaded", aktualizujCzasOkazania);



document.addEventListener("DOMContentLoaded", () => {
  // imię i nazwisko
  if (localStorage.getItem("fullname")) {
    document.querySelector(".full-name").innerHTML = localStorage.getItem("fullname");
  }

  // rola (Uczeń/Uczennica) + zmiana szerokości
  if (localStorage.getItem("role")) {
    const roleEl = document.querySelector(".role");
    const role = localStorage.getItem("role");

    roleEl.innerText = role;
    roleEl.classList.remove("uczen", "uczennica");

    if (role === "Uczennica") {
      roleEl.classList.add("uczennica");
    } else {
      roleEl.classList.add("uczen");
    }
  }

  // data urodzenia
  if (localStorage.getItem("dob")) {
    document.querySelectorAll(".field .value")[0].innerText = localStorage.getItem("dob");
  }

  // PESEL
  if (localStorage.getItem("pesel")) {
    document.querySelectorAll(".field .value")[1].innerText = localStorage.getItem("pesel");
  }

  // wiek
  if (localStorage.getItem("age")) {
    document.querySelector(".age").innerText = localStorage.getItem("age");
  }

  // zdjęcie
  if (localStorage.getItem("photo")) {
    const img = document.querySelector(".photo img");
    img.src = localStorage.getItem("photo");
    img.style.objectFit = "cover";
  }

  // termin ważności
  if (localStorage.getItem("expiry")) {
    document.querySelector(".valid-inside .right b").innerText = localStorage.getItem("expiry");
  }

  // szkoła
  const schoolInfo = `
    ${localStorage.getItem("schoolName") || ""}<br><br>
    ${localStorage.getItem("schoolStreet") || ""}<br>
    <div class="school-line">
      ${localStorage.getItem("schoolCity") || ""} <span class="green-number">${localStorage.getItem("schoolPhone") || ""}</span>
    </div>
    <br>Dyrektor szkoły: ${localStorage.getItem("schoolDirector") || ""}
  `;
  document.getElementById("school-info").innerHTML = schoolInfo;
});

function generujNumerLegitymacji() {
  // losowe dwie cyfry po zerze
  const losowe = String(Math.floor(Math.random() * 100)).padStart(2, "0");

  // rok szkolny
  const teraz = new Date();
  let rok = teraz.getFullYear() % 100; // ostatnie dwie cyfry roku
  let miesiac = teraz.getMonth() + 1;

  if (miesiac >= 9) {
    return `0${losowe}/${rok}/${rok + 1}`;
  } else {
    return `0${losowe}/${rok - 1}/${rok}`;
  }
}

function ustawDaneLegitymacji() {
  let numer = localStorage.getItem("legitNumber");

  // jeśli brak w localStorage → generujemy i zapisujemy
  if (!numer) {
    numer = generujNumerLegitymacji();
    localStorage.setItem("legitNumber", numer);
  }

  document.getElementById("legit-number").innerText = numer;

  // data wydania też może być zapisana (żeby nie zmieniała się codziennie)
  let issueDate = localStorage.getItem("issueDate");
  if (!issueDate) {
    const teraz = new Date();
    const dzien = String(teraz.getDate()).padStart(2, "0");
    const miesiac = String(teraz.getMonth() + 1).padStart(2, "0");
    const rok = teraz.getFullYear();
    issueDate = `${dzien}.${miesiac}.${rok}`;
    localStorage.setItem("issueDate", issueDate);
  }

  document.getElementById("issue-date").innerText = issueDate;
}

document.addEventListener("DOMContentLoaded", () => {
  ustawDaneLegitymacji();
});
function obliczTerminWaznosci() {
  const teraz = new Date();
  let rok = teraz.getFullYear();

  // jeśli mamy wrzesień (miesiąc 9) lub później → termin na wrzesień następnego roku
  if (teraz.getMonth() + 1 >= 9) {
    rok = rok + 1;
  }

  return `30.09.${rok}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // ustaw termin ważności w białej ramce
  const expiry = obliczTerminWaznosci();
  document.querySelector(".valid-inside .right b").innerText = expiry;
});
