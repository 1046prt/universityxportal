document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("loading").style.display = "flex";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("notification").classList.add("show");
      this.reset();
      setTimeout(() => {
        document.getElementById("notification").classList.remove("show");
      }, 3000);
    }, 1500);
  });
