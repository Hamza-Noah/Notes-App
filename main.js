let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".notes-container");
let notes = document.querySelector(".textarea");

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

window.onload = function () {
  addElementsToPageFrom(arrayOfNotes);
};

submit.onclick = function () {
  if (input.value !== "" && notes.value !== "") {
    addNotesToArray(input.value, notes.value);
    input.value = "";
    notes.value = "";
  }
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
});

function addNotesToArray(noteTitle, noteDescription) {
  const note = {
    id: Date.now(),
    title: noteTitle,
    description: noteDescription,
    completed: false,
  };

  arrayOfNotes.push(note);

  localStorage.setItem("notes", JSON.stringify(arrayOfNotes));

  addElementsToPageFrom(arrayOfNotes);
}

function addElementsToPageFrom(arrayOfNotes) {
  tasksDiv.innerHTML = "";

  arrayOfNotes.forEach((note) => {
    let div = document.createElement("div");
    div.className = "note";
    div.setAttribute("data-id", note.id);

    let titleNote = document.createElement("div");
    titleNote.className = "note-title";
    titleNote.appendChild(document.createTextNode(note.title));

    let descriptionNote = document.createElement("div");
    descriptionNote.className = "note-description";
    descriptionNote.appendChild(document.createTextNode(note.description));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete Note"));

    div.appendChild(titleNote);
    div.appendChild(descriptionNote);
    div.appendChild(span);

    tasksDiv.appendChild(div);
  });
}

function deleteTaskWith(taskId) {
  arrayOfNotes = arrayOfNotes.filter((note) => note.id != taskId);

  localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
}
