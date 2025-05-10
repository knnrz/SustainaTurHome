document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(`${currentTheme}-theme`);

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    document.body.classList.toggle("dark-theme", !isDark);
    document.body.classList.toggle("light-theme", isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  });
});