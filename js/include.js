// /js/include.js

document.addEventListener("DOMContentLoaded", () => {
  // HEADER
  fetch("partials/header.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);
    });

  // FOOTER
  fetch("partials/footer.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", data);
    });
});