/* ============================================
   RESUME BUILDER - JAVASCRIPT
   ============================================ */

// Data Structure
const resumeData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    summary: '',
    photo: null,
    education: [],
    experience: [],
    skills: [],
    projects: []
};

// DOM Elements
const form = document.getElementById('resumeForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const linkedinInput = document.getElementById('linkedin');
const summaryInput = document.getElementById('summary');
const photoInput = document.getElementById('photo');
const skillInput = document.getElementById('skillInput');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillsList = document.getElementById('skillsList');
const resumePreview = document.getElementById('resumePreview');
const themeToggle = document.getElementById('themeToggle');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    setupEventListeners();
    updatePreview();
    checkTheme();
});

// Event Listeners Setup
function setupEventListeners() {
    // Personal Info
    fullNameInput.addEventListener('input', (e) => {
        resumeData.fullName = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });

    emailInput.addEventListener('input', (e) => {
        resumeData.email = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });

    phoneInput.addEventListener('input', (e) => {
        resumeData.phone = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });

    addressInput.addEventListener('input', (e) => {
        resumeData.address = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });

    linkedinInput.addEventListener('input', (e) => {
        resumeData.linkedin = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });

    summaryInput.addEventListener('input', (e) => {
        resumeData.summary = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });

    // Photo Upload
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                resumeData.photo = event.target.result;
                updatePreview();
                saveToLocalStorage();
            };
            reader.readAsDataURL(file);
        }
    });

    // Skills
    addSkillBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addSkill();
    });

    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });

    // Education
    document.getElementById('addEducationBtn').addEventListener('click', (e) => {
        e.preventDefault();
        addEducation();
    });

    // Experience
    document.getElementById('addExperienceBtn').addEventListener('click', (e) => {
        e.preventDefault();
        addExperience();
    });

    // Projects
    document.getElementById('addProjectBtn').addEventListener('click', (e) => {
        e.preventDefault();
        addProject();
    });

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Download & Clear
    downloadBtn.addEventListener('click', downloadPDF);
    clearBtn.addEventListener('click', clearAll);
}

// Skill Functions
function addSkill() {
    const skillText = skillInput.value.trim();
    if (skillText && !resumeData.skills.includes(skillText)) {
        resumeData.skills.push(skillText);
        skillInput.value = '';
        updateSkillsList();
        updatePreview();
        saveToLocalStorage();
    }
}

function removeSkill(index) {
    resumeData.skills.splice(index, 1);
    updateSkillsList();
    updatePreview();
    saveToLocalStorage();
}

function updateSkillsList() {
    skillsList.innerHTML = resumeData.skills.map((skill, index) => `
        <div class="skill-tag">
            ${skill}
            <button type="button" onclick="removeSkill(${index})">✕</button>
        </div>
    `).join('');
}

// Education Functions
function addEducation() {
    const index = resumeData.education.length;
    resumeData.education.push({
        degree: '',
        college: '',
        year: ''
    });
    renderEducation();
}

function renderEducation() {
    document.getElementById('educationList').innerHTML = resumeData.education.map((edu, index) => `
        <div class="entry-group">
            <button type="button" class="remove-btn" onclick="removeEducation(${index})">Remove</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" placeholder="B.Sc. Computer Science" value="${edu.degree}" 
                           onchange="updateEducation(${index}, 'degree', this.value)">
                </div>
                <div class="form-group">
                    <label>College/University</label>
                    <input type="text" placeholder="University Name" value="${edu.college}"
                           onchange="updateEducation(${index}, 'college', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Year of Graduation</label>
                <input type="text" placeholder="2023" value="${edu.year}"
                       onchange="updateEducation(${index}, 'year', this.value)">
            </div>
        </div>
    `).join('');
}

function updateEducation(index, field, value) {
    resumeData.education[index][field] = value;
    updatePreview();
    saveToLocalStorage();
}

function removeEducation(index) {
    resumeData.education.splice(index, 1);
    renderEducation();
    updatePreview();
    saveToLocalStorage();
}

// Experience Functions
function addExperience() {
    const index = resumeData.experience.length;
    resumeData.experience.push({
        company: '',
        role: '',
        duration: '',
        description: ''
    });
    renderExperience();
}

function renderExperience() {
    document.getElementById('experienceList').innerHTML = resumeData.experience.map((exp, index) => `
        <div class="entry-group">
            <button type="button" class="remove-btn" onclick="removeExperience(${index})">Remove</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" placeholder="Company Name" value="${exp.company}"
                           onchange="updateExperience(${index}, 'company', this.value)">
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" placeholder="Job Title" value="${exp.role}"
                           onchange="updateExperience(${index}, 'role', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" placeholder="Jan 2022 - Present" value="${exp.duration}"
                       onchange="updateExperience(${index}, 'duration', this.value)">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Describe your responsibilities and achievements..." rows="2"
                          onchange="updateExperience(${index}, 'description', this.value)">${exp.description}</textarea>
            </div>
        </div>
    `).join('');
}

function updateExperience(index, field, value) {
    resumeData.experience[index][field] = value;
    updatePreview();
    saveToLocalStorage();
}

function removeExperience(index) {
    resumeData.experience.splice(index, 1);
    renderExperience();
    updatePreview();
    saveToLocalStorage();
}

// Projects Functions
function addProject() {
    const index = resumeData.projects.length;
    resumeData.projects.push({
        title: '',
        description: ''
    });
    renderProjects();
}

function renderProjects() {
    document.getElementById('projectsList').innerHTML = resumeData.projects.map((proj, index) => `
        <div class="entry-group">
            <button type="button" class="remove-btn" onclick="removeProject(${index})">Remove</button>
            <div class="form-group">
                <label>Project Title</label>
                <input type="text" placeholder="Project Name" value="${proj.title}"
                       onchange="updateProject(${index}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Project description and your contribution..." rows="2"
                          onchange="updateProject(${index}, 'description', this.value)">${proj.description}</textarea>
            </div>
        </div>
    `).join('');
}

function updateProject(index, field, value) {
    resumeData.projects[index][field] = value;
    updatePreview();
    saveToLocalStorage();
}

function removeProject(index) {
    resumeData.projects.splice(index, 1);
    renderProjects();
    updatePreview();
    saveToLocalStorage();
}

// Update Preview
function updatePreview() {
    let html = `<div class="resume-header">`;

    if (resumeData.photo) {
        html += `<img src="${resumeData.photo}" alt="Profile" class="resume-photo">`;
    }

    html += `
        <h1 class="resume-name">${resumeData.fullName || 'Your Name'}</h1>
        <div class="resume-contact">
            ${resumeData.email ? `<span>📧 ${resumeData.email}</span>` : ''}
            ${resumeData.phone ? `<span>📱 ${resumeData.phone}</span>` : ''}
            ${resumeData.address ? `<span>📍 ${resumeData.address}</span>` : ''}
            ${resumeData.linkedin ? `<span>🔗 ${resumeData.linkedin}</span>` : ''}
        </div>
    </div>`;

    if (resumeData.summary) {
        html += `<div class="resume-summary">${resumeData.summary}</div>`;
    }

    // Education Section
    if (resumeData.education.some(e => e.degree || e.college)) {
        html += `<div class="resume-section">
            <h2 class="resume-section-title">🎓 Education</h2>`;
        resumeData.education.forEach(edu => {
            if (edu.degree || edu.college) {
                html += `
                    <div class="resume-entry">
                        <div class="entry-header">
                            <span class="entry-title">${edu.degree || 'Degree'}</span>
                            <span class="entry-date">${edu.year || ''}</span>
                        </div>
                        <div class="entry-subtitle">${edu.college || 'College/University'}</div>
                    </div>`;
            }
        });
        html += `</div>`;
    }

    // Experience Section
    if (resumeData.experience.some(e => e.company || e.role)) {
        html += `<div class="resume-section">
            <h2 class="resume-section-title">💼 Experience</h2>`;
        resumeData.experience.forEach(exp => {
            if (exp.company || exp.role) {
                html += `
                    <div class="resume-entry">
                        <div class="entry-header">
                            <span class="entry-title">${exp.role || 'Position'}</span>
                            <span class="entry-date">${exp.duration || ''}</span>
                        </div>
                        <div class="entry-subtitle">${exp.company || 'Company'}</div>
                        ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ''}
                    </div>`;
            }
        });
        html += `</div>`;
    }

    // Skills Section
    if (resumeData.skills.length > 0) {
        html += `<div class="resume-section">
            <h2 class="resume-section-title">⭐ Skills</h2>
            <div class="skills-section">
                ${resumeData.skills.map(skill => `<div class="resume-skill">${skill}</div>`).join('')}
            </div>
        </div>`;
    }

    // Projects Section
    if (resumeData.projects.some(p => p.title || p.description)) {
        html += `<div class="resume-section">
            <h2 class="resume-section-title">🚀 Projects</h2>`;
        resumeData.projects.forEach(proj => {
            if (proj.title || proj.description) {
                html += `
                    <div class="resume-entry">
                        <div class="entry-title">${proj.title || 'Project'}</div>
                        ${proj.description ? `<div class="entry-description">${proj.description}</div>` : ''}
                    </div>`;
            }
        });
        html += `</div>`;
    }

    resumePreview.innerHTML = html;
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
        Object.assign(resumeData, JSON.parse(saved));
        fullNameInput.value = resumeData.fullName;
        emailInput.value = resumeData.email;
        phoneInput.value = resumeData.phone;
        addressInput.value = resumeData.address;
        linkedinInput.value = resumeData.linkedin;
        summaryInput.value = resumeData.summary;
        updateSkillsList();
        renderEducation();
        renderExperience();
        renderProjects();
    }
}

// Dark Mode
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
}

function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.innerHTML = `<span class="theme-icon">${isDark ? '☀️' : '🌙'}</span>`;
}

// Download PDF
function downloadPDF() {
    const element = resumePreview;
    const opt = {
        margin: 10,
        filename: `${resumeData.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    // Fallback to print dialog if html2pdf not available
    window.print();
}

// Clear All
function clearAll() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        Object.assign(resumeData, {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            linkedin: '',
            summary: '',
            photo: null,
            education: [],
            experience: [],
            skills: [],
            projects: []
        });

        form.reset();
        updateSkillsList();
        renderEducation();
        renderExperience();
        renderProjects();
        updatePreview();
        localStorage.removeItem('resumeData');
        alert('All data cleared successfully!');
    }
}