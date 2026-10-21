/*
  REGOLE
  - Continua quello che hai iniziato stamani in classe.
  - Niente eventi (li vediamo domani): chiama le funzioni dalla console o all'avvio.
  - Solo const/let, mai var. Solo querySelector/querySelectorAll per il DOM.
*/

/* SCRIVI QUI LE TUE FUNZIONI:
   1. Modifica aggiungiTask per accettare priorita
   2. Aggiungi bottone Elimina su ogni task
   6. evidenzia(indice) / togliEvidenza(indice)
   7. data automatica nel task
   8. contaPerPriorita()
*/

// ARRAY DI OGGETTI

const form = document.querySelector("form");
const idTasks = document.querySelector("#lista-task");
const newTask = document.getElementById("nuovo-task");
const lvlTask = document.getElementById("lvlTask");
const counter = document.querySelector("#contatore");
const all = document.getElementById("all");
const active = document.getElementById("active");
const done = document.getElementById("done");
const erroreTask = document.getElementById("errore-task");

const myArray = [];
let contatoreId = 0;
let filtroCorrente = "all";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //controlla se la form è vuota

  if (newTask.value.trim() === "") {
    erroreTask.textContent = "Devi aggiungere una task!";
    return;
  }

  const task = {
    task: newTask.value,
    typeTask: lvlTask.value,
    data: new Date(),
  };

  myArray.push(task);

  aggiungiTask(task);
  counter.textContent = agggiornaContatore();

  newTask.value = "";
});

// END

//AGGIUNGE LE TASK AL DOM

function aggiungiTask(task) {
  //li per le task

  const li = document.createElement("li");
  li.classList.add(`priorita-${task.typeTask}`);

  //checkbox

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  li.appendChild(checkbox);

  //task

  const textTasks = document.createElement("span");
  textTasks.textContent = task.task;
  li.appendChild(textTasks);

  //livello priorità task

  const typeTask = document.createElement("span");
  typeTask.classList.add("badge");
  typeTask.textContent = task.typeTask;
  li.appendChild(typeTask);

  //data

  const dataTask = document.createElement("span");
  dataTask.classList.add("data", "divData");
  dataTask.textContent = task.data.toLocaleString("it-IT");

  ///button

  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.textContent = "Elimina";
  btnDelete.id = `id${contatoreId++}`;
  dataTask.appendChild(btnDelete);
  li.appendChild(dataTask);

  idTasks.appendChild(li);

  //button che elimina la corretta task

  btnDelete.addEventListener("click", () => {
    const index = myArray.indexOf(task);

    if (index !== -1) {
      myArray.splice(index, 1);
      li.remove();
      counter.textContent = agggiornaContatore();
    }
  });

  //checkbox sbarrati

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      textTasks.classList.add("cbDone");
    } else {
      textTasks.classList.remove("cbDone");
    }
  });

  //checkbox filtrati

  filtraTask();
}

all.addEventListener("click", (e) => {
  e.preventDefault();
  filtroCorrente = "all";
  filtraTask();
});

active.addEventListener("click", (e) => {
  e.preventDefault();
  filtroCorrente = "active";
  filtraTask();
});

done.addEventListener("click", (e) => {
  e.preventDefault();
  filtroCorrente = "done";
  filtraTask();
});

function filtraTask() {
  const lista = document.querySelectorAll("#lista-task li");

  lista.forEach((li) => {
    const checkbox = li.querySelector('input[type="checkbox"]');

    if (filtroCorrente === "all") {
      li.style.display = "";
    } else if (filtroCorrente === "active" && !checkbox.checked) {
      li.style.display = "";
    } else if (filtroCorrente === "done" && checkbox.checked) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
}

// END

// CONTATORE

function agggiornaContatore() {
  return myArray.length;
}

counter.textContent = agggiornaContatore();

//END
