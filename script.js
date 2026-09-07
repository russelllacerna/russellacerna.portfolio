const projectData = {
  attendance: {
    type: "Academic Project",
    title: "Attendance Tracking System",
    description: "A student and teacher attendance system with student registration, subject assignment, daily attendance, attendance summaries, and database-backed records. This is currently represented without a screenshot; an image can be added later.",
    tags: ["C#", "WinForms", "Database"]
  },
  calendar: {
    type: "Web Project",
    title: "Birthday Month Calendar",
    description: "An interactive monthly calendar created as a web development project. It includes a birthday marker, date interactions, holidays, and important events.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  enrollment: {
    type: "Web Project",
    title: "Student Enrollment Form",
    description: "A structured web form designed to collect student information required for enrollment.",
    tags: ["HTML", "CSS"]
  },
  multiplication: {
    type: "Beginner Project",
    title: "Multiplication Table",
    description: "A simple 1–5 multiplication table created as an introductory HTML exercise.",
    tags: ["HTML"]
  }
};

const chatbotAnswers = [
  {
    keys: ["who", "russ", "about"],
    answer: "Russ is Russel Lacerna, a 4th-year BSIT student at Philippine Christian University. He's interested in IT support, networking, and web development, and likes learning through hands-on projects."
  },
  {
    keys: ["skill", "skills", "language", "programming"],
    answer: "Russ's listed technical areas include Java, Python, C#, HTML, CSS, JavaScript, basic networking, IT support, hardware handling, and operating-system setup. His tools include VS Code, GitHub, Excel, and Word."
  },
  {
    keys: ["project", "projects", "built", "made"],
    answer: "The portfolio currently features four projects: an Attendance Tracking System, Birthday Month Calendar, Student Enrollment Form, and a 1–5 Multiplication Table."
  },
  {
    keys: ["calendar", "birthday"],
    answer: "The Birthday Month Calendar is an interactive web project with a birthday marker, date interactions, holidays, and important events. It uses HTML, CSS, and JavaScript."
  },
  {
    keys: ["enrollment", "form"],
    answer: "The Student Enrollment Form is a web project designed to collect student information required for enrollment. It uses HTML and CSS."
  },
  {
    keys: ["multiplication", "table"],
    answer: "The Multiplication Table is a small introductory HTML project showing multiplication from 1 through 5."
  },
  {
    keys: ["attendance", "system"],
    answer: "The Attendance Tracking System is an academic project with student registration, subject assignment, daily attendance, attendance summaries, and database-backed records. It was built with C# and Windows Forms."
  },
  {
    keys: ["ojt", "internship", "experience", "support", "connext"],
    answer: "Russ had IT Support OJT experience at Connext Global Solutions. His hands-on tasks included hardware handling, system-unit work, OS formatting/installation, device deployment and retrieval, equipment logging, and practicing Cat6 Ethernet cable preparation."
  },
  {
    keys: ["school", "university", "college", "study", "course", "pcu"],
    answer: "Russ is a 4th-year Bachelor of Science in Information Technology (BSIT) student at Philippine Christian University (PCU)."
  },
  {
    keys: ["hobby", "hobbies", "interest", "interests", "free", "game", "games", "anime", "movie", "movies", "jogging", "badminton", "volleyball", "roblox"],
    answer: "Outside technology, Russ enjoys gaming, including Roblox and other games, as well as jogging, badminton, volleyball, movies, and anime."
  },
  {
    keys: ["email", "contact", "reach"],
    answer: "You can contact Russ through email at russelllacernaa@gmail.com."
  }
];

function getBotAnswer(question) {
  const q = question.toLowerCase();
  let best = null;
  let score = 0;

  for (const item of chatbotAnswers) {
    const matches = item.keys.filter(key => q.includes(key)).length;
    if (matches > score) {
      score = matches;
      best = item.answer;
    }
  }

  return best || "I can answer questions about Russ's profile, skills, projects, education, OJT experience, interests, and contact information. Try asking one of those.";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Theme
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  const updateThemeIcon = () => {
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
  };
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("dark") ? "dark" : "light");
    updateThemeIcon();
  });

  // Mobile nav
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  menuToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("open")));

  // Project modal
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalType = document.getElementById("modalType");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");

  function openProject(key) {
    const p = projectData[key];
    if (!p) return;
    modalType.textContent = p.type;
    modalTitle.textContent = p.title;
    modalDescription.textContent = p.description;
    modalTags.innerHTML = p.tags.map(tag => `<span>${tag}</span>`).join("");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeProject() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".project-open") || !e.target.closest("a")) openProject(card.dataset.project);
    });
  });
  modalClose.addEventListener("click", closeProject);
  modal.addEventListener("click", e => { if (e.target === modal) closeProject(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeProject();
      closeChat();
    }
  });

  // Chatbot UI — V2 intentionally uses local portfolio knowledge for now.
  const chatbot = document.getElementById("chatbot");
  const chatFab = document.getElementById("chatFab");
  const heroChatBtn = document.getElementById("heroChatBtn");
  const chatClose = document.getElementById("chatClose");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  function openChat() {
    chatbot.classList.add("show");
    chatbot.setAttribute("aria-hidden", "false");
    setTimeout(() => chatInput.focus(), 120);
  }
  function closeChat() {
    chatbot.classList.remove("show");
    chatbot.setAttribute("aria-hidden", "true");
  }
  function addMessage(text, who) {
    const div = document.createElement("div");
    div.className = `message ${who}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function ask(question) {
    if (!question.trim()) return;
    addMessage(question, "user");
    setTimeout(() => addMessage(getBotAnswer(question), "bot"), 250);
  }

  chatFab.addEventListener("click", () => {
    if (chatbot.classList.contains("show")) closeChat();
    else openChat();
  });
  heroChatBtn.addEventListener("click", openChat);
  chatClose.addEventListener("click", closeChat);
  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const question = chatInput.value.trim();
    chatInput.value = "";
    ask(question);
  });
  document.querySelectorAll(".chat-suggestions button").forEach(btn => {
    btn.addEventListener("click", () => ask(btn.dataset.question));
  });
});
