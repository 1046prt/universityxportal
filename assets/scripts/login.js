document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple validation
  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Show loading
  document.getElementById("loading").style.display = "flex";

  // Simulate login process
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("notification").classList.add("show");

    // Redirect to dashboard after successful login
    setTimeout(() => {
      window.location.href = "course_registration.html";
    }, 2000);
  }, 1500);
});
