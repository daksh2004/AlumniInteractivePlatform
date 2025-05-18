document.addEventListener("DOMContentLoaded", () => {
  // === Modal Elements ===
  const profileModal = createModal("Edit Profile", [
    { label: "Name", id: "edit-name" },
    { label: "Gmail", id: "edit-gmail" },
    { label: "LinkedIn URL", id: "edit-linkedin" },
    { label: "Current Role", id: "edit-role" },
    { label: "Experience", id: "edit-exp" },
  ]);

  const skillModal = createModal("Add Skill", [
    { label: "Select Skill", id: "skill-dropdown", type: "select", options: [
      "JavaScript", "Godot", "Unreal Engine", "HTML", "CSS", "Spring Boot", "MySQL", "C++", "Python", "Git"
    ]}
  ]);

  document.body.appendChild(profileModal.container);
  document.body.appendChild(skillModal.container);

  // === Element References ===
  const editBtn = document.querySelector(".edit-btn");
  const userName = document.querySelector(".user-info h2");
  const subtext = document.querySelector(".subtext");
  const gmailLink = document.querySelector('a[href^="sinhadhruv16@gmail.com"]');
  const linkedinLink = document.querySelector('a[href*="linkedin.com"]');
  const badge = document.querySelector(".badge");
  const skillsBox = document.querySelector(".skills-box");
  const addBtn = document.querySelector(".add-btn");

  // === Edit Profile Logic ===
  editBtn.addEventListener("click", () => {
    // Pre-fill values
    profileModal.inputs["edit-name"].value = userName.textContent;
    profileModal.inputs["edit-gmail"].value = gmailLink.getAttribute("href").replace("mailto:", "");
    profileModal.inputs["edit-linkedin"].value = linkedinLink.getAttribute("href");
    const [role, exp] = badge.textContent.split("·").map(s => s.trim());
    profileModal.inputs["edit-role"].value = role;
    profileModal.inputs["edit-exp"].value = exp;

    profileModal.show(() => {
      userName.textContent = profileModal.inputs["edit-name"].value;
      gmailLink.setAttribute("href", `mailto:${profileModal.inputs["edit-gmail"].value}`);
      linkedinLink.setAttribute("href", profileModal.inputs["edit-linkedin"].value);
      badge.textContent = `${profileModal.inputs["edit-role"].value} · ${profileModal.inputs["edit-exp"].value}`;
      subtext.textContent = "Current role | Experience 🔒";
    });
  });

  // === Add Skill Logic ===
  addBtn.addEventListener("click", () => {
    skillModal.inputs["skill-dropdown"].selectedIndex = 0;
    skillModal.show(() => {
      const skill = skillModal.inputs["skill-dropdown"].value;
      if (!skill) return;

      // Avoid duplicate skills
      if ([...skillsBox.children].some(child => child.dataset.skill === skill)) return;

      const skillTag = document.createElement("div");
      skillTag.textContent = skill;
      skillTag.dataset.skill = skill;
      skillTag.style.cssText = `
        display: inline-flex;
        align-items: center;
        margin: 12px;
        padding: 16px 24px;
        background: #fff;
        border: 2px solid #6d28d9;
        border-radius: 24px;
        font-size: 28px;
        color: #6d28d9;
      `;

      const removeBtn = document.createElement("span");
      removeBtn.textContent = "❌";
      removeBtn.style.cssText = "margin-left: 12px; cursor: pointer;";
      removeBtn.addEventListener("click", () => skillsBox.removeChild(skillTag));

      skillTag.appendChild(removeBtn);
      skillsBox.appendChild(skillTag);
    });
  });

  // === Utility: Create Modal ===
  function createModal(title, fields) {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 1000;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
      background: white; padding: 32px; border-radius: 24px; width: 90%; max-width: 500px;
    `;

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.style.marginBottom = "24px";
    modal.appendChild(heading);

    const inputs = {};

    fields.forEach(field => {
      const label = document.createElement("label");
      label.textContent = field.label;
      label.style.display = "block";
      label.style.marginTop = "16px";

      let input;
      if (field.type === "select") {
        input = document.createElement("select");
        input.style.width = "100%";
        input.style.fontSize = "20px";
        input.innerHTML = `<option value="">--Select--</option>` +
          field.options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
      } else {
        input = document.createElement("input");
        input.type = "text";
        input.style.width = "100%";
        input.style.fontSize = "20px";
      }

      input.id = field.id;
      input.style.padding = "10px";
      input.style.marginTop = "8px";
      input.style.borderRadius = "10px";
      input.style.border = "1px solid #ccc";

      inputs[field.id] = input;
      modal.appendChild(label);
      modal.appendChild(input);
    });

    const btn = document.createElement("button");
    btn.textContent = "Save";
    btn.style.cssText = `
      margin-top: 32px; padding: 12px 24px; font-size: 18px; background: #6d28d9;
      color: white; border: none; border-radius: 12px; cursor: pointer;
    `;

    const closeModal = () => container.style.display = "none";

    btn.addEventListener("click", () => {
      if (container.onSave) container.onSave();
      closeModal();
    });

    modal.appendChild(btn);
    container.appendChild(modal);

    return {
      container,
      inputs,
      show(onSave) {
        container.onSave = onSave;
        container.style.display = "flex";
      }
    };
  }
});
