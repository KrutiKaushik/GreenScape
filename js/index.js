document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();

  AOS.init();
});

function initializeEventListeners() {
  const hamburger = document.getElementById("hamburger-menu");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-item");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close-popup");

  if (popup && closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active");
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active");
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
}

function calculateCost() {
  try {
    const yardSize = parseFloat(document.getElementById("yard-size").value);
    if (!yardSize || isNaN(yardSize)) {
      alert("Please enter a valid yard size");
      return;
    }

    const designType = document.querySelector(
      'input[name="design-type"]:checked'
    ).value;

    const selectedExtras = document.querySelectorAll(
      'input[name="extras"]:checked'
    );

    let baseCost = yardSize * 10;

    switch (designType) {
      case "premium":
        baseCost *= 1.5;
        break;
      case "luxury":
        baseCost *= 2;
        break;
      default:
        break;
    }

    let extrasTotal = 0;
    let extrasText = [];
    selectedExtras.forEach((extra) => {
      switch (extra.value) {
        case "lighting":
          extrasTotal += 2000;
          extrasText.push("Lighting");
          break;
        case "irrigation":
          extrasTotal += 3000;
          extrasText.push("Irrigation");
          break;
        case "pathway":
          extrasTotal += 1500;
          extrasText.push("Pathway");
          break;
      }
    });

    const totalCost = baseCost + extrasTotal;

    const resultHTML = `
            <div class="estimate-details">
                <p><strong>Project Details:</strong></p>
                <p>Yard Size: ${yardSize.toLocaleString()} sq ft</p>
                <p>Design Type: ${
                  designType.charAt(0).toUpperCase() + designType.slice(1)
                }</p>
                <p>Additional Features: ${
                  extrasText.length ? extrasText.join(", ") : "None"
                }</p>
                <hr>
                <p class="base-cost">Base Cost: $${baseCost.toLocaleString()}</p>
                ${
                  extrasTotal > 0
                    ? `<p class="extras-cost">Extras Cost: $${extrasTotal.toLocaleString()}</p>`
                    : ""
                }
                <p class="total-cost"><strong>Total Estimated Cost: $${totalCost.toLocaleString()}</strong></p>
            </div>
        `;

    const popup = document.getElementById("popup");
    const popupResult = document.getElementById("popup-result");

    if (!popup || !popupResult) {
      console.error("Popup elements not found!");
      return;
    }

    popupResult.innerHTML = resultHTML;
    popup.classList.add("active");
  } catch (error) {
    console.error("Error in calculateCost:", error);
    alert("An error occurred while calculating the cost. Please try again.");
  }
}

function handleContactFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  alert("Thank you for your message! We will get back to you soon.");
  event.target.reset();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".topbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 1)";
  }
});
