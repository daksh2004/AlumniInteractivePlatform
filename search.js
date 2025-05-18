const fakeDatabase = {
    "c#": [
        {
            name: "Dhruv Kumar Sinha",
            branchyear: "CSE/26",
            experience: "Game Developer - 2 Yr",
            skills: ["C #", "C++", "Unreal Engine", "Godot Engine", "Unity", "Blender", "3D Modelling", "Game Design", "Game Development", "Game Testing", "Game Programming", "Game Mechanics", "Game Physics", "Game AI", "Game Animation", "Game Graphics", "Game Sound", "Game Music", "Game Story", "Game Level Design", "Game UI", "Game UX", "Game Monetization", "Game Marketing", "Game Publishing", "Game Distribution", "Game Community Management", "Game Analytics", "Game Performance", "Game Optimization", "Game Security", "Game Networking", "Game Multiplayer", "Game VR", "Game AR", "Game MR", "Game XR", "Game Cloud", "Game Streaming", "Game Blockchain", "Game NFT", "Game Cryptocurrency", "Game Web3", "Game Metaverse", "Game AI/ML", "Game Data Science", "Game Big Data", "Game IoT", "Game Edge Computing", "Game Quantum Computing", "Game 5G", "Game 6G", "Game 7G", "Game 8G", "Game 9G", "Game 10G", "Game 11G", "Game 12G", "Game 13G", "Game 14G", "Game 15G", "Game 16G", "Game 17G", "Game 18G", "Game 19G", "Game 20G"],
            image: "Profile.png",
            linkedin: "https://www.linkedin.com/in/dhruv-sinha-986251241/"
        },
        {
            name: "Ravi Mehra",
            branchyear: "CSE/26",
            experience: "Student",
            skills: ["C #", "Unity", "Blender"],
            image: "Profile.png",
            linkedin: "https://www.linkedin.com/in/ravi-mehra-123456789/"
        },
        {
            name: "Ravi Mehra",
            branchyear: "CSE/26",
            experience: "Unity Developer - 3 Yr",
            skills: ["C #", "Unity", "Blender"],
            image: "Profile.png",
            linkedin: "https://www.linkedin.com/in/ravi-mehra-123456789/"
        },
        {
            name: "Ravi Mehra",
            branchyear: "CSE/26",
            experience: "Unity Developer - 3 Yr",
            skills: ["C #", "Unity", "Blender"],
            image: "Profile.png",
            linkedin: "https://www.linkedin.com/in/ravi-mehra-123456789/"
        }
    ],
    "godot engine": [
        {
            name: "Dhruv",
            branchyear: "CSE/26",
            experience: "Game Developer - 2 Yr",
            skills: ["C #", "C++", "Unreal Engine", "Godot Engine"],
            image: "Profile.png",
            linkedin: "https://www.linkedin.com/in/dhruv-kumar-sinha-123456789/"
        }
    ]
};
function handleSearch() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Clear previous

    if (input === "") {
        resultsDiv.innerHTML = "<p>Please enter a skill to search.</p>";
        return;
    }

    const users = fakeDatabase[input];

    if (users && users.length > 0) {
        const profilesHTML = users.map((user, index) => {
            const visibleSkills = user.skills.slice(0, 5);
            const hiddenSkills = user.skills.slice(5);
            const uniqueId = `extraSkills-${index}`;

            return `
                <div class="profile-card">
                    <div class="profile-pic" style="background-image: url('${user.image}')"></div>
                    <div class="profile-details">
                        <h2>${user.name}</h2>
                        <p><strong>Branch/Year:</strong> ${user.branchyear}</p>
                        <p><strong>Experience:</strong> ${user.experience}</p>
                        <div class="skill-tags">
                            ${visibleSkills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                            ${
                                hiddenSkills.length > 0 
                                    ? `<span class="tag show-more" onclick="toggleSkills('${uniqueId}', this)">+${hiddenSkills.length} more</span>
                                       <span id="${uniqueId}" class="extra-skills" style="display: none;">
                                           ${hiddenSkills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                                       </span>`
                                    : ''
                            }
                        </div>
                    </div>
                    <a class="profile-linkdin" style="background-image: url('Linkdin.png')" href="${user.linkedin}" target="_blank"></a>
                </div>
            `;
        }).join("");

        resultsDiv.innerHTML = `<div class="scroll-wrapper">${profilesHTML}</div>`;
    } else {
        resultsDiv.innerHTML = `<p>No users found with skill "${input}".</p>`;
    }
}

// This toggles hidden skills when "+n more" is clicked
function toggleSkills(id, btn) {
    const hidden = document.getElementById(id);
    const isHidden = hidden.style.display === "none";
    hidden.style.display = isHidden ? "inline" : "none";
    btn.textContent = isHidden ? "Show less" : `+${hidden.childElementCount} more`;
}
