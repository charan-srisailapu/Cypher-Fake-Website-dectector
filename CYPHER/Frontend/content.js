(async () => {
  const currentUrl = window.location.href;

  const res = await fetch("http://127.0.0.1:5000/check-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: currentUrl }),
  });

  const data = await res.json();
  const status = data.status;

  const existing = document.getElementById("cypher-alert");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "cypher-alert";
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    padding: 16px 24px;
    background: ${status === "Safe" ? "#d1fae5" : "#fee2e2"};
    color: ${status === "Safe" ? "#065f46" : "#991b1b"};
    font-size: 16px;
    border-radius: 12px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    font-weight: 600;
  `;
  popup.innerText = status === "Safe" ? "✅ This site is Safe" : "🚨 This site is Unsafe!";
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 5000);
})();
