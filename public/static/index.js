import { createSong } from "./services.js";

const submitSongHandler = async (e) => {
  e.preventDefault();
  const inputSong = document.querySelector("#inputSong");
  await createSong(inputSong.value);
  inputSong.value = "";
};

document
  .querySelector("#addSongForm")
  .addEventListener("submit", submitSongHandler);
