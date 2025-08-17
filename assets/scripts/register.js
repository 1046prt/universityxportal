document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // Show loading
    document.getElementById("loading").style.display = "flex";

    // Simulate registration process
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("notification").classList.add("show");

      // Redirect to login after successful registration
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }, 2000);
  });
