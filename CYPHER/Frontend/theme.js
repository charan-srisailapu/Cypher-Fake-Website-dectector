document.getElementById("theme-toggle").addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
  });
  
  window.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark", theme === "dark");
    document.getElementById("theme-toggle").checked = theme === "dark";
  });
  