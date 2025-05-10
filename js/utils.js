document.addEventListener("DOMContentLoaded", () => {
  const popupVisto = localStorage.getItem("popupVisto");
  if (!popupVisto) {
    document.getElementById("sustaina-popup").style.display = "flex";
  }

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookies = document.getElementById("accept-cookies");
  if (!localStorage.getItem("cookiesAceitos")) {
    cookieBanner.style.display = "flex";
  }

  acceptCookies?.addEventListener("click", () => {
    localStorage.setItem("cookiesAceitos", "true");
    cookieBanner.style.display = "none";
  });

  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTop.classList.add("show");
      backToTop.classList.remove("hide");
    } else {
      backToTop.classList.add("hide");
      backToTop.classList.remove("show");
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
function fecharPopup() {
  document.getElementById("sustaina-popup").style.display = "none";
  localStorage.setItem("popupVisto", "true");
}
