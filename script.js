const projectData = {
  attendance: {
    type: "Academic Project",
    title: "Attendance Tracking System",
    description:
      "A student and teacher attendance system with student registration, subject assignment, daily attendance, attendance summaries, and database-backed records. This is currently represented without a screenshot; an image can be added later.",
    tags: ["C#", "WinForms", "Database"],
  },

  calendar: {
    type: "Web Project",
    title: "Birthday Month Calendar",
    description:
      "An interactive monthly calendar created as a web development project. It includes a birthday marker, date interactions, holidays, and important events.",
    tags: ["HTML", "CSS", "JavaScript"],
  },

  enrollment: {
    type: "Web Project",
    title: "Student Enrollment Form",
    description:
      "A structured web form designed to collect student information required for enrollment.",
    tags: ["HTML", "CSS"],
  },

  multiplication: {
    type: "Beginner Project",
    title: "Multiplication Table",
    description:
      "A simple 1–5 multiplication table created as an introductory HTML exercise.",
    tags: ["HTML"],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  // CURRENT YEAR
  document.getElementById("year").textContent = new Date().getFullYear();

  // THEME
  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  const updateThemeIcon = () => {
    themeToggle.textContent = document.body.classList.contains("dark")
      ? "☀"
      : "☾";
  };

  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "portfolio-theme",
      document.body.classList.contains("dark") ? "dark" : "light",
    );

    updateThemeIcon();
  });

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  menuToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(open));
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });
  });

  // PROJECT MODAL
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalType = document.getElementById("modalType");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");

  function openProject(key) {
    const project = projectData[key];

    if (!project) return;

    modalType.textContent = project.type;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalTags.innerHTML = project.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");
  }

  function closeProject() {
    modal.classList.remove("show");

    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".project-open") || !e.target.closest("a")) {
        openProject(card.dataset.project);
      }
    });
  });

  modalClose.addEventListener("click", closeProject);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProject();
    }
  });

  // CHATBOT
  const chatbot = document.getElementById("chatbot");

  const chatFab = document.getElementById("chatFab");

  const heroChatBtn = document.getElementById("heroChatBtn");

  const chatClose = document.getElementById("chatClose");

  const chatForm = document.getElementById("chatForm");

  const chatInput = document.getElementById("chatInput");

  const chatMessages = document.getElementById("chatMessages");

  // Open chatbot
  function openChat() {
    chatbot.classList.add("show");

    chatbot.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      chatInput.focus();
    }, 120);
  }

  // Close chatbot
  function closeChat() {
    chatbot.classList.remove("show");

    chatbot.setAttribute("aria-hidden", "true");
  }

  // Add message to chatbot
  function addMessage(text, who) {
    const div = document.createElement("div");

    div.className = `message ${who}`;

    div.textContent = text;

    chatMessages.appendChild(div);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send question to Groq backend
  async function ask(question) {
    if (!question.trim()) return;

    // Display visitor's message
    addMessage(question, "user");

    // Display loading message
    addMessage("Thinking...", "bot");

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: question,
        }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error.");
      }

      const data = await response.json();

      // Remove "Thinking..."
      const botMessages = chatMessages.querySelectorAll(".message.bot");

      const lastBotMessage = botMessages[botMessages.length - 1];

      if (lastBotMessage && lastBotMessage.textContent === "Thinking...") {
        lastBotMessage.remove();
      }

      // Display Groq response
      addMessage(data.reply || "Sorry, I couldn't generate a response.", "bot");
    } catch (error) {
      console.error("Chatbot error:", error);

      // Remove "Thinking..."
      const botMessages = chatMessages.querySelectorAll(".message.bot");

      const lastBotMessage = botMessages[botMessages.length - 1];

      if (lastBotMessage && lastBotMessage.textContent === "Thinking...") {
        lastBotMessage.remove();
      }

      // Display error
      addMessage(
        "Sorry, I'm having trouble connecting to the chatbot server.",
        "bot",
      );
    }
  }

  // CHATBOT BUTTONS
  chatFab.addEventListener("click", () => {
    if (chatbot.classList.contains("show")) {
      closeChat();
    } else {
      openChat();
    }
  });

  heroChatBtn.addEventListener("click", openChat);

  chatClose.addEventListener("click", closeChat);

  // CHAT FORM
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const question = chatInput.value.trim();

    if (!question) return;

    chatInput.value = "";

    ask(question);
  });

  // CHAT SUGGESTIONS
  document.querySelectorAll(".chat-suggestions button").forEach((btn) => {
    btn.addEventListener("click", () => {
      ask(btn.dataset.question);
    });
  });

  // ESCAPE KEY
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProject();

      closeChat();
    }
  });
});
