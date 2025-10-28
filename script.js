document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const loading = document.getElementById("loading");
  const themeToggle = document.getElementById("themeToggle");
  const musicEnabled = document.getElementById("musicEnabled");
  const volumeControl = document.getElementById("volumeControl");
  const oldTheme = document.getElementById("oldTheme");
  const bgMusic = document.getElementById("bgMusic");

  // Theme system
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
      localStorage.setItem("theme", currentTheme);
    });
  }

  // Old theme toggle
  if (oldTheme) {
    oldTheme.checked = localStorage.getItem("oldTheme") === "true";
    oldTheme.addEventListener("change", () => {
      localStorage.setItem("oldTheme", oldTheme.checked);
      alert("Theme will change on reload!");
    });
  }

  // Music system
  if (bgMusic) {
    const musicState = localStorage.getItem("musicEnabled") === "true";
    const savedVolume = parseFloat(localStorage.getItem("musicVolume")) || 0.5;
    bgMusic.volume = savedVolume;

    if (musicState) bgMusic.play();

    if (musicEnabled) {
      musicEnabled.checked = musicState;
      musicEnabled.addEventListener("change", () => {
        if (musicEnabled.checked) {
          bgMusic.play();
          localStorage.setItem("musicEnabled", true);
        } else {
          bgMusic.pause();
          localStorage.setItem("musicEnabled", false);
        }
      });
    }
  }

  // Volume control
  if (volumeControl) {
    volumeControl.value = localStorage.getItem("musicVolume") || 0.5;
    volumeControl.addEventListener("input", () => {
      if (bgMusic) bgMusic.volume = volumeControl.value;
      localStorage.setItem("musicVolume", volumeControl.value);
    });
  }

  // Loading animation
  if (loading && app) {
    setTimeout(() => {
      loading.classList.add("hidden");
      app.classList.remove("hidden");
    }, 1200);
  }
});
