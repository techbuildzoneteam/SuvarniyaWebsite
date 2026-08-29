// ==========================================================================
// Thaventhirakumar Suvarniya — Portfolio
// ==========================================================================
// All easily-editable content lives in `portfolioData` below.
// ==========================================================================
// Disable right-click
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

// Disable common developer-tool shortcuts
document.addEventListener("keydown", function (event) {

  // F12
  if (event.key === "F12") {
    event.preventDefault();
  }

  // Ctrl + Shift + I
  if (
    event.ctrlKey &&
    event.shiftKey &&
    event.key.toLowerCase() === "i"
  ) {
    event.preventDefault();
  }

  // Ctrl + Shift + J
  if (
    event.ctrlKey &&
    event.shiftKey &&
    event.key.toLowerCase() === "j"
  ) {
    event.preventDefault();
  }

  // Ctrl + U
  if (
    event.ctrlKey &&
    event.key.toLowerCase() === "u"
  ) {
    event.preventDefault();
  }
});
const portfolioData = {
  name: "Thaventhirakumar Suvarniya",
  role: "Software Engineering & IT Professional",
  email: "yaasuvarni@gmail.com",
  phone: "+94 75 124 6888",
  location: "Batticaloa, Sri Lanka",
  cvPath: "assets/cv/suvarniya-cv.pdf",
  profileImage: "assets/images/profile.jpg"
};

// Social links — replace "#" with real profile URLs when available.
const socialLinks = {
  email: "mailto:yaasuvarni@gmail.com",
  github: "#",
  linkedin: "https://www.linkedin.com/in/suvarniya-thaventhirakumar/"
};

// Work experience — most recent first.
const experience = [
  {
    period: "Current",
    role: "Student Counselor",
    org: "ESOFT Metro Campus, Batticaloa",
    description: "Supporting prospective and current students with course guidance and enquiries at the campus."
  },
  {
    period: "1 Year",
    role: "CRM Executive",
    org: "SPM Renewables",
    description: "Managed customer relationship activities and communications for the organization."
  },
  {
    period: "6 Months",
    role: "Insurance Advisor",
    org: "Union Assurance",
    description: "Advised clients on insurance products and supported policy-related enquiries."
  }
];

// Education — most recent first.
const education = [
  {
    period: "In progress",
    role: "HND in Software Engineering",
    org: "Higher National Diploma"
  },
  {
    period: "Completed",
    role: "Diploma in Information Technology",
    org: ""
  },
  {
    period: "2023",
    role: "GCE Advanced Level",
    org: ""
  },
  {
    period: "2020",
    role: "GCE Ordinary Level",
    org: ""
  }
];

// Projects — empty for now. When ready, add objects shaped like:
// { title, description, image, technologies: [], githubUrl, liveUrl, category }
const projects = [];

// ==========================================================================
// Theme
// ==========================================================================

(function initTheme(){
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);
  updateToggleState(initial);
})();

function updateToggleState(theme){
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const isDark = theme === "dark";
  btn.setAttribute("aria-pressed", String(isDark));
  btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

document.getElementById("themeToggle")?.addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateToggleState(next);
});

// ==========================================================================
// Mobile navigation
// ==========================================================================

const navBurger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

function closeMenu(){
  navLinks.classList.remove("is-open");
  navBurger.setAttribute("aria-expanded", "false");
  navBurger.setAttribute("aria-label", "Open menu");
}

navBurger?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navBurger.setAttribute("aria-expanded", String(isOpen));
  navBurger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ==========================================================================
// Active nav link on scroll
// ==========================================================================

const sections = document.querySelectorAll("main section[id]");
const navLinkEls = document.querySelectorAll(".nav__link");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const id = entry.target.getAttribute("id");
      navLinkEls.forEach(link => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(section => navObserver.observe(section));

// ==========================================================================
// Reveal-on-scroll animation
// ==========================================================================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ==========================================================================
// Render experience / education timelines
// ==========================================================================

function renderTimeline(containerId, items){
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(item => `
    <li class="timeline-item reveal">
      <div class="timeline-item__period">${escapeHtml(item.period)}</div>
      <div>
        <div class="timeline-item__role">${escapeHtml(item.role)}</div>
        ${item.org ? `<div class="timeline-item__org">${escapeHtml(item.org)}</div>` : ""}
        ${item.description ? `<div class="timeline-item__desc">${escapeHtml(item.description)}</div>` : ""}
      </div>
    </li>
  `).join("");
  container.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

renderTimeline("experienceList", experience);
renderTimeline("educationList", education);

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ==========================================================================
// Projects (renders cards if projects are added later; otherwise keeps
// the "coming soon" placeholder already in the HTML)
// ==========================================================================

function renderProjects(){
  if (!projects.length) return; // placeholder markup stays as-is
  const container = document.getElementById("projectsContainer");
  container.classList.remove("projects__empty");
  container.innerHTML = projects.map(p => `
    <article class="project-card reveal">
      ${p.image ? `<img src="${p.image}" alt="${escapeHtml(p.title)}">` : ""}
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.description)}</p>
      ${p.technologies?.length ? `<ul class="tag-list">${p.technologies.map(t => `<li>${escapeHtml(t)}</li>`).join("")}</ul>` : ""}
      <div class="project-card__links">
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener">Code</a>` : ""}
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener">Live demo</a>` : ""}
      </div>
    </article>
  `).join("");
  container.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}
renderProjects();

// ==========================================================================
// Social links wiring
// ==========================================================================

function wireSocialLinks(){
  const map = {
    socialGithub: socialLinks.github,
    socialLinkedin: socialLinks.linkedin,
    footerGithub: socialLinks.github,
    footerLinkedin: socialLinks.linkedin
  };
  Object.entries(map).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el && url) el.setAttribute("href", url);
  });
}
wireSocialLinks();

// ==========================================================================
// Contact form
// ==========================================================================
//
// This is a static site, so no message is actually transmitted. To connect
// a real backend, swap the body of `sendMessage()` below for a call to
// Formspree, Web3Forms, EmailJS, or your own API endpoint.
//
// Example (Formspree):
//   await fetch("https://formspree.io/f/YOUR_FORM_ID", {
//     method: "POST",
//     headers: { "Accept": "application/json" },
//     body: formData
//   });

const CONTACT_FORM_CONFIG = {
  provider: null, // e.g. "formspree" | "web3forms" | "emailjs" | "custom"
  endpoint: null   // e.g. "https://formspree.io/f/YOUR_FORM_ID"
};

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

const fields = {
  name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
  email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
  subject: { input: document.getElementById("subject"), error: document.getElementById("subjectError") },
  message: { input: document.getElementById("message"), error: document.getElementById("messageError") }
};

function validateField(key){
  const { input, error } = fields[key];
  const value = input.value.trim();
  let message = "";

  if (!value){
    message = "This field is required.";
  } else if (key === "email"){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) message = "Enter a valid email address.";
  }

  error.textContent = message;
  input.closest(".form-row").classList.toggle("has-error", Boolean(message));
  return !message;
}

Object.keys(fields).forEach(key => {
  fields[key].input.addEventListener("blur", () => validateField(key));
});

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const validations = Object.keys(fields).map(validateField);
  if (!validations.every(Boolean)){
    formStatus.textContent = "Please fix the highlighted fields.";
    formStatus.className = "form-status error";
    return;
  }

  submitBtn.classList.add("is-loading");
  submitBtn.disabled = true;
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try{
    await sendMessage({
      name: fields.name.input.value.trim(),
      email: fields.email.input.value.trim(),
      subject: fields.subject.input.value.trim(),
      message: fields.message.input.value.trim()
    });

    formStatus.textContent = "Message ready — connect a form provider to enable sending.";
    formStatus.className = "form-status success";
    contactForm.reset();
  } catch (err){
    formStatus.textContent = "Something went wrong. Please try again or email me directly.";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.classList.remove("is-loading");
    submitBtn.disabled = false;
  }
});

async function sendMessage(data){
  // No backend is connected yet. Replace this block once a provider
  // (Formspree, Web3Forms, EmailJS, or a custom API) is configured above.
  if (!CONTACT_FORM_CONFIG.endpoint){
    await new Promise(resolve => setTimeout(resolve, 600));
    console.info("Contact form submitted (no backend connected):", data);
    return;
  }

  const response = await fetch(CONTACT_FORM_CONFIG.endpoint, {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Request failed");
}

// ==========================================================================
// Footer year
// ==========================================================================

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();






