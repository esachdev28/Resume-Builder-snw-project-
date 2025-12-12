const nameInput = document.getElementById('nameInput');
const titleInput = document.getElementById('titleInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const locationInput = document.getElementById('locationInput');
const summaryInput = document.getElementById('summaryInput');
const skillsInput = document.getElementById('skillsInput');
const experienceList = document.getElementById('experience-list');
const addExperienceBtn = document.getElementById('addExperienceBtn');
const projectsList = document.getElementById('projects-list');
const addProjectBtn = document.getElementById('addProjectBtn');
const preview = document.querySelector('.resume-preview-content');
const paper = document.getElementById('resumePreview');

const urlParams = new URLSearchParams(window.location.search);
let currentTheme = urlParams.get('theme') || 'modern';
// Theme Selection Logic
const themeCards = document.querySelectorAll('.mini-theme-card');

// Theme Selection with Smooth Transition
window.selectTheme = function (themeName) {
    const previewElement = document.getElementById('resumePreview');

    // Start transition
    previewElement.classList.add('changing');

    // Wait for fade out
    setTimeout(() => {
        currentTheme = themeName;

        // Update active state in sidebar
        document.querySelectorAll('.mini-theme-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.theme === themeName) {
                card.classList.add('active');
            }
        });

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('theme', themeName);
        window.history.pushState({}, '', url);

        updatePreview();

        // Fade back in
        setTimeout(() => {
            previewElement.classList.remove('changing');
        }, 50);
    }, 300);
};

// Initialize Active Theme
if (currentTheme) {
    selectTheme(currentTheme);
} else {
    updatePreview();
    // Set default active state
    const defaultCard = document.querySelector('.mini-theme-card[data-theme="modern"]');
    if (defaultCard) defaultCard.classList.add('active');
}

function addExperienceField() {
    const div = document.createElement('div');
    div.className = 'experience-entry';
    div.innerHTML = `
        <div class="experience-header">
            <span class="experience-title">Position ${document.querySelectorAll('.experience-entry').length + 1}</span>
            <button class="btn-remove" onclick="this.closest('.experience-entry').remove(); updatePreview()">Remove</button>
        </div>
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="exp-title" placeholder="e.g. Senior Developer">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" class="exp-company" placeholder="e.g. Google">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" class="exp-date" placeholder="e.g. 2020">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="text" placeholder="Present">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="exp-desc" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
    `;
    experienceList.appendChild(div);

    // Add event listeners to new inputs
    div.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
}
function addProjectField() {
    const div = document.createElement('div');
    div.className = 'project-entry';
    div.innerHTML = `
        <div class="experience-header">
            <span class="experience-title">Project</span>
            <button class="btn-remove" onclick="this.closest('.project-entry').remove(); updatePreview()">Remove</button>
        </div>
        <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="proj-title" placeholder="e.g. Resume Builder">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="proj-desc" rows="3" placeholder="What the project does..."></textarea>
        </div>
    `;
    projectsList.appendChild(div);

    div.querySelectorAll('input, textarea').forEach(i => i.addEventListener('input', updatePreview));
}


function updatePreview() {
    const experienceEntries = [];
    document.querySelectorAll('.experience-entry').forEach(entry => {
        experienceEntries.push({
            title: entry.querySelector('.exp-title').value || 'Job Title',
            company: entry.querySelector('.exp-company').value || 'Company Name',
            date: entry.querySelector('.exp-date').value || 'Date',
            description: entry.querySelector('.exp-desc').value || 'Description of your role and achievements...'
        });
    });

    const projectEntries = [];
    document.querySelectorAll('.project-entry').forEach(e => {
        projectEntries.push({
            title: e.querySelector('.proj-title').value || 'Project Title',
            description: e.querySelector('.proj-desc').value || 'Project description...'
        });
    });

    // REST OF YOUR updatePreview CODE BELOW THIS


    // If no experience, add a placeholder
    if (experienceEntries.length === 0) {
        experienceEntries.push({
            title: 'Job Title',
            company: 'Company Name',
            date: '2020 - Present',
            description: 'Description of your role and achievements...'
        });
    }

    const data = {
        name: nameInput.value || 'Your Name',
        title: titleInput.value || 'Job Title',
        email: emailInput.value || 'email@example.com',
        phone: phoneInput.value || '123-456-7890',
        location: locationInput.value || 'City, Country',
        summary: summaryInput.value || 'Professional summary goes here...',
        experience: experienceEntries,
        skills: skillsInput.value || 'Skill 1, Skill 2, Skill 3' ,
        projects: projectEntries
    };

    renderTheme(data);
}

function renderTheme(data) {
    let html = '';

    // Reset basic styles
    paper.style.background = '#ffffff';
    paper.style.color = '#000000';
    paper.style.fontFamily = "'Inter', sans-serif";

    // Helper to generate experience HTML based on theme
    const renderExp = (item, styleType) => {
        switch (styleType) {
            case 'modern':
                return `
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <strong style="color: #1f2937;">${item.title}</strong>
                            <span style="color: #6b7280; font-size: 0.9em;">${item.date}</span>
                        </div>
                        <div style="color: #2563eb; font-weight: 500; margin-bottom: 5px;">${item.company}</div>
                        <p style="color: #374151; white-space: pre-line; line-height: 1.5;">${item.description}</p>
                    </div>`;
            case 'minimal':
                return `
                    <div style="margin-bottom: 20px;">
                        <div style="margin-bottom: 5px;">
                            <span style="font-weight: 600; color: #111827;">${item.title}</span>
                            <span style="color: #9ca3af;"> | </span>
                            <span style="color: #4b5563;">${item.company}</span>
                        </div>
                        <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">${item.date}</div>
                        <p style="color: #374151; white-space: pre-line; line-height: 1.6;">${item.description}</p>
                    </div>`;
            case 'creative':
                return `
                    <div style="margin-bottom: 20px; position: relative; padding-left: 20px; border-left: 2px solid #e5e7eb;">
                        <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: #2563eb; border-radius: 50%;"></div>
                        <h4 style="color: #1f2937; font-weight: 700; margin-bottom: 2px;">${item.title}</h4>
                        <div style="color: #2563eb; font-size: 14px; margin-bottom: 5px;">${item.company}</div>
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 8px;">${item.date}</div>
                        <p style="color: #4b5563; white-space: pre-line; line-height: 1.5;">${item.description}</p>
                    </div>`;
            case 'professional':
                return `
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">
                            <div>
                                <span style="font-weight: 700; color: #1f2937; font-size: 1.1em;">${item.title}</span>
                                <span style="color: #6b7280; margin: 0 5px;">at</span>
                                <span style="font-weight: 600; color: #374151;">${item.company}</span>
                            </div>
                            <span style="font-weight: 600; color: #1f2937; font-size: 0.9em;">${item.date}</span>
                        </div>
                        <p style="color: #374151; white-space: pre-line; line-height: 1.6; text-align: justify;">${item.description}</p>
                    </div>`;
            case 'executive':
                return `
                    <div style="margin-bottom: 25px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="font-family: serif; font-weight: 700; font-size: 1.1em; color: #111827;">${item.company}</span>
                            <span style="color: #4b5563; font-style: italic;">${item.date}</span>
                        </div>
                        <div style="font-weight: 600; color: #374151; margin-bottom: 10px;">${item.title}</div>
                        <p style="color: #4b5563; white-space: pre-line; line-height: 1.8;">${item.description}</p>
                    </div>`;
            case 'compact':
                return `
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                            <strong style="color: #059669;">${item.title}</strong>
                            <span style="font-size: 0.85em; color: #6b7280;">${item.date}</span>
                        </div>
                        <div style="font-size: 0.9em; font-weight: 600; color: #374151; margin-bottom: 5px;">${item.company}</div>
                        <p style="font-size: 0.9em; color: #374151; white-space: pre-line; line-height: 1.4;">${item.description}</p>
                    </div>`;
            case 'bold':
                return `
                    <div style="margin-bottom: 25px;">
                        <h4 style="font-weight: 900; color: #111827; font-size: 1.1em; margin-bottom: 2px;">${item.title.toUpperCase()}</h4>
                        <div style="color: #4b5563; font-weight: 600; margin-bottom: 5px;">${item.company} | ${item.date}</div>
                        <p style="color: #374151; white-space: pre-line; line-height: 1.6;">${item.description}</p>
                    </div>`;
            case 'tech':
                return `
                    <div style="margin-bottom: 20px; padding-left: 15px; border-left: 1px dashed #d1d5db;">
                        <div style="color: #2563eb; font-weight: bold; margin-bottom: 2px;">{</div>
                        <div style="padding-left: 20px;">
                            <div style="color: #4b5563;">role: "<span style="color: #059669;">${item.title}</span>",</div>
                            <div style="color: #4b5563;">company: "<span style="color: #059669;">${item.company}</span>",</div>
                            <div style="color: #4b5563;">period: "<span style="color: #059669;">${item.date}</span>",</div>
                            <div style="color: #4b5563;">desc: \`<span style="color: #374151;">${item.description}</span>\`</div>
                        </div>
                        <div style="color: #2563eb; font-weight: bold; margin-top: 2px;">},</div>
                    </div>`;
            default:
                return '';
        }
    };

    const experienceHtml = data.experience.map(item => renderExp(item, currentTheme)).join('');

    switch (currentTheme) {
        case 'modern':
            html = `
                <div style="border-left: 5px solid #2563eb; padding-left: 20px; margin-bottom: 30px;">
                    <h1 style="font-size: 36px; color: #1f2937; margin-bottom: 5px; font-weight: 800;">${data.name}</h1>
                    <h2 style="font-size: 18px; color: #2563eb; font-weight: 600;">${data.title}</h2>
                </div>
                <div style="display: flex; gap: 20px; margin-bottom: 30px; font-size: 14px; color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px;">
                    <span>${data.email}</span>
                    <span>•</span>
                    <span>${data.phone}</span>
                    <span>•</span>
                    <span>${data.location}</span>
                </div>
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #1f2937; font-size: 16px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase;">Profile</h3>
                    <p style="color: #374151; line-height: 1.6;">${data.summary}</p>
                </div>
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #1f2937; font-size: 16px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase;">Experience</h3>
                    ${experienceHtml}
                </div>
                <div style="margin-bottom: 25px;">
    <h3 style="color: #1f2937; font-size: 16px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase;">Projects</h3>
    ${data.projects.length > 0 
        ? data.projects.map(p => `
            <div style="margin-bottom: 15px;">
                <strong>${p.title}</strong>
                <p style="color:#374151; line-height:1.5;">${p.description}</p>
            </div>
        `).join('')
        : `<p style="color:#6b7280;">No projects added yet.</p>`
    }
</div>

                <div>
                    <h3 style="color: #1f2937; font-size: 16px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase;">Skills</h3>
                    <p style="color: #374151; line-height: 1.6;">${data.skills}</p>
                </div>
            `;
            break;

        case 'minimal':
            html = `
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-size: 32px; font-weight: 300; letter-spacing: 2px; margin-bottom: 10px;">${data.name.toUpperCase()}</h1>
                    <p style="font-size: 14px; color: #6b7280; letter-spacing: 1px;">${data.title.toUpperCase()}</p>
                    <div style="margin-top: 15px; font-size: 12px; color: #6b7280;">
                        ${data.email} &nbsp;|&nbsp; ${data.phone} &nbsp;|&nbsp; ${data.location}
                    </div>
                </div>
                <div style="margin-bottom: 30px; padding: 0 20px;">
                    <p style="text-align: center; color: #4b5563; font-style: italic;">${data.summary}</p>
                </div>
                <div style="border-top: 1px solid #e5e7eb; padding-top: 30px;">
                    <div style="display: grid; grid-template-columns: 150px 1fr; gap: 20px; margin-bottom: 20px;">
                        <h3 style="font-size: 14px; font-weight: 600; color: #111827;">EXPERIENCE</h3>
                        <div>${experienceHtml}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 150px 1fr; gap: 20px;">
                        <h3 style="font-size: 14px; font-weight: 600; color: #111827;">SKILLS</h3>
                        <p style="font-size: 14px; color: #374151; line-height: 1.6;">${data.skills}</p>
                    </div>
                </div>
            `;
            break;

        case 'creative':
            paper.style.background = '#f8fafc';
            html = `
                <div style="background: #2563eb; color: white; padding: 40px; margin: -40px -40px 30px -40px;">
                    <h1 style="font-size: 42px; margin-bottom: 5px;">${data.name}</h1>
                    <p style="font-size: 18px; opacity: 0.9;">${data.title}</p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
                    <div>
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #2563eb; border-bottom: 2px solid #bfdbfe; padding-bottom: 5px; margin-bottom: 15px;">CONTACT</h3>
                            <div style="font-size: 14px; color: #4b5563; line-height: 2;">
                                <div>${data.email}</div>
                                <div>${data.phone}</div>
                                <div>${data.location}</div>
                            </div>
                        </div>
                        <div>
                            <h3 style="color: #2563eb; border-bottom: 2px solid #bfdbfe; padding-bottom: 5px; margin-bottom: 15px;">SKILLS</h3>
                            <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">${data.skills}</p>
                        </div>
                    </div>
                    <div>
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #2563eb; border-bottom: 2px solid #bfdbfe; padding-bottom: 5px; margin-bottom: 15px;">PROFILE</h3>
                            <p style="color: #374151; line-height: 1.6;">${data.summary}</p>
                        </div>
                        <div>
                            <h3 style="color: #2563eb; border-bottom: 2px solid #bfdbfe; padding-bottom: 5px; margin-bottom: 15px;">EXPERIENCE</h3>
                            <div>${experienceHtml}</div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'professional':
            html = `
                <div style="border-bottom: 4px solid #1f2937; padding-bottom: 20px; margin-bottom: 30px;">
                    <h1 style="font-size: 40px; color: #1f2937; font-weight: 700;">${data.name}</h1>
                    <p style="font-size: 20px; color: #4b5563;">${data.title}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 30px; background: #f3f4f6; padding: 15px; border-radius: 4px;">
                    <span>${data.email}</span>
                    <span>${data.phone}</span>
                    <span>${data.location}</span>
                </div>
                <div style="margin-bottom: 25px;">
                    <h3 style="background: #1f2937; color: white; padding: 5px 10px; display: inline-block; margin-bottom: 15px; font-size: 14px; font-weight: 600;">PROFESSIONAL SUMMARY</h3>
                    <p style="color: #374151; line-height: 1.6;">${data.summary}</p>
                </div>
                <div style="margin-bottom: 25px;">
                    <h3 style="background: #1f2937; color: white; padding: 5px 10px; display: inline-block; margin-bottom: 15px; font-size: 14px; font-weight: 600;">WORK HISTORY</h3>
                    <div>${experienceHtml}</div>
                </div>
                <div>
                    <h3 style="background: #1f2937; color: white; padding: 5px 10px; display: inline-block; margin-bottom: 15px; font-size: 14px; font-weight: 600;">CORE COMPETENCIES</h3>
                    <p style="color: #374151; line-height: 1.6;">${data.skills}</p>
                </div>
            `;
            break;

        case 'executive':
            html = `
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-family: serif; font-size: 42px; color: #111827; margin-bottom: 10px;">${data.name}</h1>
                    <p style="font-size: 16px; color: #6b7280; text-transform: uppercase; letter-spacing: 2px;">${data.title}</p>
                    <div style="margin-top: 20px; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 10px 0; color: #4b5563; font-size: 14px;">
                        ${data.email} • ${data.phone} • ${data.location}
                    </div>
                </div>
                <div style="margin-bottom: 30px;">
                    <h3 style="font-family: serif; font-size: 18px; color: #111827; border-bottom: 1px solid #111827; padding-bottom: 5px; margin-bottom: 15px;">Executive Profile</h3>
                    <p style="color: #374151; line-height: 1.8;">${data.summary}</p>
                </div>
                <div style="margin-bottom: 30px;">
                    <h3 style="font-family: serif; font-size: 18px; color: #111827; border-bottom: 1px solid #111827; padding-bottom: 5px; margin-bottom: 15px;">Professional Experience</h3>
                    <div>${experienceHtml}</div>
                </div>
                <div>
                    <h3 style="font-family: serif; font-size: 18px; color: #111827; border-bottom: 1px solid #111827; padding-bottom: 5px; margin-bottom: 15px;">Areas of Expertise</h3>
                    <p style="color: #374151; line-height: 1.8;">${data.skills}</p>
                </div>
            `;
            break;

        case 'compact':
            html = `
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #059669; padding-bottom: 10px; margin-bottom: 20px;">
                    <div>
                        <h1 style="font-size: 28px; color: #059669; font-weight: 700; margin: 0;">${data.name}</h1>
                        <p style="font-size: 16px; color: #374151; margin: 0;">${data.title}</p>
                    </div>
                    <div style="text-align: right; font-size: 12px; color: #6b7280;">
                        <div>${data.email}</div>
                        <div>${data.phone}</div>
                        <div>${data.location}</div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                    <div>
                        <h3 style="color: #059669; font-size: 14px; font-weight: 700; margin-bottom: 10px;">EXPERIENCE</h3>
                        <div>${experienceHtml}</div>
                    </div>
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #059669; font-size: 14px; font-weight: 700; margin-bottom: 10px;">SUMMARY</h3>
                            <p style="font-size: 13px; color: #374151; line-height: 1.5;">${data.summary}</p>
                        </div>
                        <div>
                            <h3 style="color: #059669; font-size: 14px; font-weight: 700; margin-bottom: 10px;">SKILLS</h3>
                            <p style="font-size: 13px; color: #374151; line-height: 1.5;">${data.skills}</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'bold':
            html = `
                <div style="background: #111827; color: white; padding: 30px; margin: -40px -40px 30px -40px;">
                    <h1 style="font-size: 48px; font-weight: 900; letter-spacing: -1px; margin-bottom: 10px;">${data.name}</h1>
                    <p style="font-size: 20px; color: #9ca3af;">${data.title}</p>
                </div>
                <div style="display: flex; gap: 40px;">
                    <div style="width: 30%;">
                        <div style="margin-bottom: 30px;">
                            <h3 style="font-weight: 900; font-size: 14px; margin-bottom: 15px; letter-spacing: 1px;">CONTACT</h3>
                            <div style="font-size: 14px; color: #4b5563; line-height: 2;">
                                <div>${data.email}</div>
                                <div>${data.phone}</div>
                                <div>${data.location}</div>
                            </div>
                        </div>
                        <div>
                            <h3 style="font-weight: 900; font-size: 14px; margin-bottom: 15px; letter-spacing: 1px;">SKILLS</h3>
                            <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">${data.skills}</p>
                        </div>
                    </div>
                    <div style="width: 70%;">
                        <div style="margin-bottom: 30px;">
                            <h3 style="font-weight: 900; font-size: 14px; margin-bottom: 15px; letter-spacing: 1px;">PROFILE</h3>
                            <p style="color: #374151; line-height: 1.6;">${data.summary}</p>
                        </div>
                        <div>
                            <h3 style="font-weight: 900; font-size: 14px; margin-bottom: 15px; letter-spacing: 1px;">EXPERIENCE</h3>
                            <div>${experienceHtml}</div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'tech':
            paper.style.fontFamily = "'Courier New', Courier, monospace";
            html = `
                <div style="border-bottom: 1px dashed #333; padding-bottom: 20px; margin-bottom: 20px;">
                    <h1 style="font-size: 32px; color: #2563eb;">> ${data.name}</h1>
                    <p style="font-size: 16px; color: #4b5563;">// ${data.title}</p>
                </div>
                <div style="margin-bottom: 20px; font-size: 14px; color: #6b7280;">
                    const contact = {
                        email: "${data.email}",
                        phone: "${data.phone}",
                        location: "${data.location}"
                    };
                </div>
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #2563eb; font-size: 18px; margin-bottom: 10px;">function getSummary() {</h3>
                    <div style="padding-left: 20px; border-left: 2px solid #e5e7eb;">
                        <p style="color: #374151; line-height: 1.6;">return "${data.summary}";</p>
                    </div>
                    <h3 style="color: #2563eb; font-size: 18px; margin-top: 10px;">}</h3>
                </div>
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #2563eb; font-size: 18px; margin-bottom: 10px;">function getExperience() {</h3>
                    <div style="padding-left: 20px; border-left: 2px solid #e5e7eb;">
                        <div>${experienceHtml}</div>
                    </div>
                    <h3 style="color: #2563eb; font-size: 18px; margin-top: 10px;">}</h3>
                </div>
                <div>
                    <h3 style="color: #2563eb; font-size: 18px; margin-bottom: 10px;">const skills = [</h3>
                    <div style="padding-left: 20px;">
                        <p style="color: #374151; line-height: 1.6;">"${data.skills}"</p>
                    </div>
                    <h3 style="color: #2563eb; font-size: 18px; margin-top: 10px;">];</h3>
                </div>
            `;
            break;
    }

    preview.innerHTML = html;
}

[nameInput, titleInput, emailInput, phoneInput, locationInput, summaryInput, skillsInput].forEach(input => {
    if (input) input.addEventListener('input', updatePreview);
});

if (addExperienceBtn) {
    addExperienceBtn.addEventListener('click', addExperienceField);
}
if (addProjectBtn) {
    addProjectBtn.addEventListener('click', addProjectField);
}


// Add one initial experience field
addExperienceField();

function downloadPDF() {
    const element = document.getElementById('resumePreview');
    const name = nameInput.value || 'Resume';
    const filename = `${name.replace(/\s+/g, '_')}_Resume.pdf`;

    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Temporarily remove shadow for clean PDF
    const originalShadow = element.style.boxShadow;
    element.style.boxShadow = 'none';

    html2pdf().set(opt).from(element).save().then(() => {
        // Restore shadow
        element.style.boxShadow = originalShadow;
    });
}