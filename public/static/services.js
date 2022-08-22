import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

export const createSong = async (name) => {
  try {
    const docRef = await addDoc(collection(db, "songs"), {
      name: name,
      duncan: false,
      ivan: false,
      christian: false,
      emiliano: false,
      createdAt: Date.now(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const q = query(collection(db, "songs"), orderBy("createdAt"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const songList = document.querySelector("#songlist");
  songList.innerHTML = "";
  querySnapshot.forEach((docElement) => {
    const song = { ...docElement.data(), id: docElement.id };

    const row = document.createElement("tr");

    const name = document.createElement("td");
    name.innerText = song.name;
    row.appendChild(name);

    const createInput = (playerName) => {
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      if (song[playerName]) {
        input.setAttribute("checked", "true");
      }
      input.addEventListener("change", async (e) => {
        const docRef = doc(db, "songs", song.id);

        await updateDoc(docRef, {
          [playerName]: e.target.checked,
        });
      });
      return input;
    };

    // const duncan = document.createElement("td");
    // duncan.appendChild(createInput("duncan"));
    // row.appendChild(duncan);

    const ivan = document.createElement("td");
    ivan.appendChild(createInput("ivan"));
    row.appendChild(ivan);

    const christian = document.createElement("td");
    christian.appendChild(createInput("christian"));
    row.appendChild(christian);

    const emiliano = document.createElement("td");
    emiliano.appendChild(createInput("emiliano"));
    row.appendChild(emiliano);

    const removeSong = document.createElement("td");
    const removeSongButton = document.createElement("button");
    removeSongButton.innerText = "x";
    removeSongButton.addEventListener("click", async () => {
      if (prompt("Write the name of the song: " + song.name) == song.name) {
        await deleteDoc(doc(db, "songs", song.id));
      }
    });
    removeSong.appendChild(removeSongButton);
    row.appendChild(removeSong);
    if (song.ivan && song.emiliano && song.christian) {
      row.setAttribute("class", "ready");
    }

    songList.appendChild(row);
  });
});
