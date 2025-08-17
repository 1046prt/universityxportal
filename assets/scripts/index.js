window.alert("This project is still under development! Stay tuned");
document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".form-slide");
  const progressSteps = document.querySelectorAll(".progress-step");
  const progressLabels = document.querySelectorAll(".progress-label");
  const progressFill = document.getElementById("progress-fill");
  const form = document.getElementById("registration-form");
  const loading = document.getElementById("loading");
  let currentStep = 1;

  // Progress navigation
  function updateProgress(step) {
    // Update progress bar fill
    if (progressFill) {
      progressFill.style.width =
        ((step - 1) / (progressSteps.length - 1)) * 100 + "%";
    }

    // Update step indicators
    progressSteps.forEach((stepEl, idx) => {
      if (idx + 1 < step) {
        stepEl.classList.remove("active");
        stepEl.classList.add("completed");
        stepEl.innerHTML = '<i class="fas fa-check"></i>';
      } else if (idx + 1 === step) {
        stepEl.classList.add("active");
        stepEl.classList.remove("completed");
        stepEl.innerHTML = step;
      } else {
        stepEl.classList.remove("active", "completed");
        stepEl.innerHTML = idx + 1;
      }
    });

    // Update step labels
    progressLabels.forEach((label, idx) => {
      if (idx + 1 === step) {
        label.classList.add("active");
      } else {
        label.classList.remove("active");
      }
    });

    // Show current step
    steps.forEach((stepEl, idx) => {
      if (idx + 1 === step) {
        stepEl.classList.add("active");
      } else {
        stepEl.classList.remove("active");
      }
    });
  }

  // Show validation error
  function showValidationError(input, message) {
    input.classList.add("is-invalid");
    const error = document.createElement("div");
    error.className = "invalid-feedback";
    error.innerText = message;
    input.parentElement.appendChild(error);
  }

  // Clear validation errors
  function clearValidationErrors() {
    const invalidInputs = document.querySelectorAll(".is-invalid");
    invalidInputs.forEach((input) => {
      input.classList.remove("is-invalid");
      const feedback = input.parentElement.querySelector(".invalid-feedback");
      if (feedback) {
        feedback.remove();
      }
    });
  }

  // Email validation
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Initialize form navigation if form exists
  if (form) {
    // Next and Previous button handlers
    const nextStep1 = document.getElementById("next-step-1");
    if (nextStep1) {
      nextStep1.addEventListener("click", function () {
        clearValidationErrors();
        const nameInput = document.getElementById("student-name");
        const enrollmentInput = document.getElementById("enrollment-number");
        const emailInput = document.getElementById("email");

        if (nameInput.value.trim() === "") {
          showValidationError(nameInput, "Please enter your name");
          return;
        }

        if (enrollmentInput.value.trim() === "") {
          showValidationError(
            enrollmentInput,
            "Please enter your enrollment number"
          );
          return;
        }

        if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
          showValidationError(emailInput, "Please enter a valid email address");
          return;
        }

        currentStep = 2;
        updateProgress(currentStep);
      });
    }

    const prevStep2 = document.getElementById("prev-step-2");
    if (prevStep2) {
      prevStep2.addEventListener("click", function () {
        currentStep = 1;
        updateProgress(currentStep);
      });
    }

    const nextStep2 = document.getElementById("next-step-2");
    if (nextStep2) {
      nextStep2.addEventListener("click", function () {
        clearValidationErrors();
        const courseInput = document.getElementById("course");
        const specializationInput = document.getElementById("specialization");

        if (courseInput.value === "") {
          showValidationError(courseInput, "Please select a course");
          return;
        }

        currentStep = 3;
        updateProgress(currentStep);
      });
    }

    const prevStep3 = document.getElementById("prev-step-3");
    if (prevStep3) {
      prevStep3.addEventListener("click", function () {
        currentStep = 2;
        updateProgress(currentStep);
      });
    }

    const nextStep3 = document.getElementById("next-step-3");
    if (nextStep3) {
      nextStep3.addEventListener("click", function () {
        clearValidationErrors();
        const yearInput = document.getElementById("year");
        const semInput = document.getElementById("sem");

        if (yearInput.value === "") {
          showValidationError(yearInput, "Please select your year");
          return;
        }

        // Populate semester options based on selected year
        const year = yearInput.value;
        semInput.innerHTML = ""; // Clear previous options
        if (year === "1") {
          semInput.innerHTML += '<option value="1">1st Semester</option>';
          semInput.innerHTML += '<option value="2">2nd Semester</option>';
        } else if (year === "2") {
          semInput.innerHTML += '<option value="3">3rd Semester</option>';
          semInput.innerHTML += '<option value="4">4th Semester</option>';
        } else if (year === "3") {
          semInput.innerHTML += '<option value="5">5th Semester</option>';
          semInput.innerHTML += '<option value="6">6th Semester</option>';
        } else if (year === "4") {
          semInput.innerHTML += '<option value="7">7th Semester</option>';
          semInput.innerHTML += '<option value="8">8th Semester</option>';
        }

        currentStep = 4;
        updateProgress(currentStep);
      });
    }

    const prevStep4 = document.getElementById("prev-step-4");
    if (prevStep4) {
      prevStep4.addEventListener("click", function () {
        currentStep = 3;
        updateProgress(currentStep);
      });
    }

    const submitForm = document.getElementById("submit-form");
    if (submitForm) {
      submitForm.addEventListener("click", function (event) {
        event.preventDefault();
        clearValidationErrors();
        const semInput = document.getElementById("sem");
        const subjectInput = document.getElementById("subject");

        if (semInput.value === "") {
          showValidationError(semInput, "Please select a semester");
          return;
        }

        if (subjectInput.selectedOptions.length === 0) {
          showValidationError(
            subjectInput,
            "Please select at least one subject"
          );
          return;
        }

        // Show loading spinner
        if (loading) {
          loading.style.display = "flex";
        }

        // Simulate form submission
        setTimeout(() => {
          if (loading) {
            loading.style.display = "none";
          }
          const notification = document.getElementById("notification");
          if (notification) {
            notification.classList.add("show");
            setTimeout(() => {
              notification.classList.remove("show");
            }, 3000);
          }
          form.reset();
          currentStep = 1;
          updateProgress(currentStep);
        }, 2000);
      });
    }

    // Initialize semester options based on year selection
    const yearInput = document.getElementById("year");
    if (yearInput) {
      yearInput.addEventListener("change", function () {
        const year = this.value;
        const semInput = document.getElementById("sem");
        semInput.innerHTML = ""; // Clear previous options
        if (year === "1") {
          semInput.innerHTML += '<option value="1">1st Semester</option>';
          semInput.innerHTML += '<option value="2">2nd Semester</option>';
        } else if (year === "2") {
          semInput.innerHTML += '<option value="3">3rd Semester</option>';
          semInput.innerHTML += '<option value="4">4th Semester</option>';
        } else if (year === "3") {
          semInput.innerHTML += '<option value="5">5th Semester</option>';
          semInput.innerHTML += '<option value="6">6th Semester</option>';
        } else if (year === "4") {
          semInput.innerHTML += '<option value="7">7th Semester</option>';
          semInput.innerHTML += '<option value="8">8th Semester</option>';
        }
      });
    }

    // Initialize subject options based on semester selection
    const semInput = document.getElementById("sem");
    if (semInput) {
      semInput.addEventListener("change", function () {
        const sem = this.value;
        const course = document.getElementById("course").value;
        const subjectInput = document.getElementById("subject");

        // Clear previous options
        subjectInput.innerHTML = "";

        // Populate subjects based on course and semester
        if (course === "cse" || course === "ds-ai") {
          if (sem === "1") {
            subjectInput.innerHTML +=
              '<option value="math1">Engineering Mathematics I</option>';
            subjectInput.innerHTML +=
              '<option value="physics">Engineering Physics</option>';
            subjectInput.innerHTML +=
              '<option value="chem">Engineering Chemistry</option>';
            subjectInput.innerHTML +=
              '<option value="prog">Programming Fundamentals</option>';
            subjectInput.innerHTML +=
              '<option value="eng">Technical English</option>';
          } else if (sem === "2") {
            subjectInput.innerHTML +=
              '<option value="math2">Engineering Mathematics II</option>';
            subjectInput.innerHTML +=
              '<option value="dsa">Data Structures & Algorithms</option>';
            subjectInput.innerHTML +=
              '<option value="digital">Digital Electronics</option>';
            subjectInput.innerHTML +=
              '<option value="oop">Object Oriented Programming</option>';
            subjectInput.innerHTML +=
              '<option value="comm">Communication Skills</option>';
          } else if (sem === "3" || sem === "4") {
            subjectInput.innerHTML +=
              '<option value="dbms">Database Management Systems</option>';
            subjectInput.innerHTML +=
              '<option value="os">Operating Systems</option>';
            subjectInput.innerHTML +=
              '<option value="cn">Computer Networks</option>';
            subjectInput.innerHTML +=
              '<option value="daa">Design & Analysis of Algorithms</option>';
            subjectInput.innerHTML +=
              '<option value="web">Web Technologies</option>';
          } else if (sem === "5" || sem === "6") {
            subjectInput.innerHTML +=
              '<option value="se">Software Engineering</option>';
            subjectInput.innerHTML +=
              '<option value="ai">Artificial Intelligence</option>';
            subjectInput.innerHTML +=
              '<option value="ml">Machine Learning</option>';
            subjectInput.innerHTML +=
              '<option value="cloud">Cloud Computing</option>';
            subjectInput.innerHTML +=
              '<option value="cyber">Cyber Security</option>';
          } else if (sem === "7" || sem === "8") {
            subjectInput.innerHTML +=
              '<option value="ds">Distributed Systems</option>';
            subjectInput.innerHTML +=
              '<option value="nlp">Natural Language Processing</option>';
            subjectInput.innerHTML +=
              '<option value="iot">Internet of Things</option>';
            subjectInput.innerHTML +=
              '<option value="blockchain">Blockchain Technologies</option>';
            subjectInput.innerHTML +=
              '<option value="proj">Capstone Project</option>';
          }
        } else if (course === "electrical" || course === "electronics") {
          if (sem === "1" || sem === "2") {
            subjectInput.innerHTML +=
              '<option value="math1">Engineering Mathematics I</option>';
            subjectInput.innerHTML +=
              '<option value="physics">Engineering Physics</option>';
            subjectInput.innerHTML +=
              '<option value="circuits">Electric Circuits</option>';
            subjectInput.innerHTML +=
              '<option value="prog">Programming Fundamentals</option>';
            subjectInput.innerHTML +=
              '<option value="eng">Technical English</option>';
          } else if (sem === "3" || sem === "4") {
            subjectInput.innerHTML +=
              '<option value="emag">Electromagnetic Fields</option>';
            subjectInput.innerHTML +=
              '<option value="signals">Signals & Systems</option>';
            subjectInput.innerHTML +=
              '<option value="digital">Digital Electronics</option>';
            subjectInput.innerHTML +=
              '<option value="control">Control Systems</option>';
            subjectInput.innerHTML +=
              '<option value="power">Power Electronics</option>';
          } else {
            subjectInput.innerHTML +=
              '<option value="advanced">Advanced Electrical Course</option>';
            subjectInput.innerHTML +=
              '<option value="elective1">Elective 1</option>';
            subjectInput.innerHTML +=
              '<option value="elective2">Elective 2</option>';
            subjectInput.innerHTML +=
              '<option value="elective3">Elective 3</option>';
          }
        } else if (course === "civil" || course === "mechanical") {
          if (sem === "1" || sem === "2") {
            subjectInput.innerHTML +=
              '<option value="math1">Engineering Mathematics I</option>';
            subjectInput.innerHTML +=
              '<option value="physics">Engineering Physics</option>';
            subjectInput.innerHTML +=
              '<option value="graphics">Engineering Graphics</option>';
            subjectInput.innerHTML +=
              '<option value="mechanics">Engineering Mechanics</option>';
            subjectInput.innerHTML +=
              '<option value="eng">Technical English</option>';
          } else {
            subjectInput.innerHTML +=
              '<option value="advanced">Advanced Course</option>';
            subjectInput.innerHTML +=
              '<option value="elective1">Elective 1</option>';
            subjectInput.innerHTML +=
              '<option value="elective2">Elective 2</option>';
            subjectInput.innerHTML +=
              '<option value="elective3">Elective 3</option>';
          }
        } else {
          // Default subjects if no course is selected
          subjectInput.innerHTML +=
            '<option value="">Please select a course and semester first</option>';
        }
      });
    }
  }

  // Navigation and Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
      themeToggle.checked = true;
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Mobile Navigation
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      // Toggle icon
      const icon = navToggle.querySelector("i");
      if (icon) {
        if (navMenu.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  // Mobile dropdown toggle
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".dropdown-toggle");
    if (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          this.parentNode.classList.toggle("active");
        }
      });
    }
  });

  // Close the mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".nav-menu") &&
      !e.target.closest(".nav-toggle") &&
      window.innerWidth < 992
    ) {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }

      dropdowns.forEach((dropdown) => {
        if (dropdown.classList.contains("active")) {
          dropdown.classList.remove("active");
        }
      });
    }
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
      dropdowns.forEach((dropdown) => {
        if (dropdown.classList.contains("active")) {
          dropdown.classList.remove("active");
        }
      });
    }
  });
});
