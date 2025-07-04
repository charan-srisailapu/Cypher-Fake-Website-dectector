document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    fetch("http://127.0.0.1:5000/check-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: tab.url }),
    })
      .then((res) => res.json())
      .then((data) => {
        const statusEl = document.getElementById("status");
        if (data.status === "Safe") {
          statusEl.innerText = "✅ This site is Safe";
          statusEl.classList.add("safe");
        } else if (data.status === "Unsafe") {
          statusEl.innerText = "🚨 This site is Unsafe!";
          statusEl.classList.add("unsafe");
        } else {
          statusEl.innerText = "❓ Status: Unknown";
        }
      });
  });
});

document.getElementById("theme-toggle").addEventListener("change", function () {
  const body = document.body;
  if (this.checked) {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    localStorage.setItem("theme", "dark");
  }
});
