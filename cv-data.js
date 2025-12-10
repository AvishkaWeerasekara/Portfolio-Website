// CV Data for Avishka Weerasekara
const cvData = {
    personalInfo: {
        name: "Avishka Weerasekara",
        title: "Software Engineering Student | Full Stack Developer",
        email: "avishkaak324@gmail.com",
        phone: "0714660658",
        location: "Sri Lanka",
        github: "https://github.com/AvishkaWeerasekara",
        linkedin: "https://www.linkedin.com/in/avishka-kalhara-128115365"
    },
    
    summary: "An undergraduate student in Software Engineering at General Sir John Kotelawala Defence University. I completed my school education at H/Walasmulla National School, where I developed a strong foundation in technology and problem-solving. I am passionate about building innovative software solutions, learning modern technologies, and continuously improving my skills. With a keen interest in development, creativity, and real-world problem-solving, I am committed to shaping my career as a dedicated and forward-thinking software engineer.",
    
    education: [
        {
            degree: "BSc (Hons) in Software Engineering",
            institution: "General Sir John Kotelawala Defence University",
            period: "Current",
            description: "Pursuing a comprehensive software engineering degree focusing on modern development practices, algorithms, and system design."
        },
        {
            degree: "Secondary Education",
            institution: "H/Walasmulla National School",
            period: "Completed",
            description: "Developed strong foundation in technology, mathematics, and problem-solving."
        }
    ],
    
    certifications: [
        {
            title: "Diploma in Introduction to Networking",
            issuer: "Cisco Networking Academy",
            date: "November 2025",
            description: "Network protocols, IP addressing, basic network configuration, and troubleshooting techniques."
        },
        {
            title: "Diploma in English Language",
            issuer: "Southern Province Department of Education",
            date: "November 2024",
            description: "Advanced English grammar, vocabulary, and communication skills."
        },
        {
            title: "Diploma in Information Technology",
            issuer: "Southern Province Department of Education",
            date: "November 2024",
            description: "Computing fundamentals, software applications, database management, and programming concepts."
        },
        {
            title: "Certified Remedial Teaching Skills in Mathematics",
            issuer: "Southern Province Department of Education",
            date: "July 2025",
            description: "Two-day workshop in collaboration with Sasnaka Sansada Foundation."
        }
    ],
    
    skills: {
        programming: ["Python", "Java", "C++", "JavaScript", "PHP", "HTML/CSS"],
        frameworks: ["Node.js", "React (Learning)"],
        databases: ["MySQL", "MongoDB"],
        tools: ["Git", "GitHub", "Adobe Photoshop", "Adobe Animate"],
        other: ["Networking Fundamentals", "Cybersecurity Basics", "Problem Solving", "Team Collaboration"]
    },
    
    coreCompetencies: [
        {
            name: "Python Programming",
            level: "Intermediate",
            percentage: 75
        },
        {
            name: "Java Development",
            level: "Intermediate",
            percentage: 75
        },
        {
            name: "Web Development (HTML/CSS/JS/PHP)",
            level: "Intermediate",
            percentage: 80
        },
        {
            name: "SQL Database Management",
            level: "Intermediate",
            percentage: 70
        },
        {
            name: "C++ Programming",
            level: "Advanced",
            percentage: 85
        },
        {
            name: "Networking Fundamentals",
            level: "Advanced",
            percentage: 85
        }
    ],
    
    softSkills: {
        "Creativity": 90,
        "Problem Solving": 75,
        "Teamwork": 85,
        "Communication": 65
    },
    
    experience: [
        {
            role: "Student Developer",
            organization: "Developers Stack",
            period: "Current",
            description: "Learning modern full-stack development practices and building real-world projects."
        },
        {
            role: "Volunteer",
            organization: "IEE Chapter - KDU",
            period: "Current",
            description: "Assisting with workshops, mentoring students, and event coordination."
        },
        {
            role: "Volunteer",
            organization: "BCS Chapter - KDU",
            period: "Current",
            description: "Supporting coding sessions and tech community events."
        },
        {
            role: "Volunteer",
            organization: "Sasnaka Sansada Foundation",
            period: "Current",
            description: "Supporting community education and outreach programs."
        }
    ],
    
    projects: [
        {
            name: "Bakery Management System",
            description: "A comprehensive system for managing bakery operations, inventory, and sales.",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            link: "https://github.com/AvishkaWeerasekara/We.git"
        },
        {
            name: "Portfolio Website",
            description: "Personal portfolio with interactive components and animations.",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "https://github.com/AvishkaWeerasekara/Portfolio-Website.git"
        },
        {
            name: "POS System",
            description: "Product page, cart, and checkout flow layout with responsive design.",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#"
        }
    ]
};

// Function to generate CV HTML
function generateCVHTML() {
    const { personalInfo, summary, education, certifications, skills, coreCompetencies, softSkills, experience, projects } = cvData;
    
    return `
        <div class="cv-header">
            <h1>${personalInfo.name}</h1>
            <p class="cv-title">${personalInfo.title}</p>
            <div class="cv-contact">
                <p><i class='bx bx-envelope'></i> ${personalInfo.email}</p>
                <p><i class='bx bx-phone'></i> ${personalInfo.phone}</p>
                <p><i class='bx bx-map'></i> ${personalInfo.location}</p>
            </div>
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-user-circle'></i> Professional Summary</h2>
            <p>${summary}</p>
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-briefcase'></i> Experience</h2>
            ${experience.map(exp => `
                <div class="cv-item">
                    <h3>${exp.role} - ${exp.organization}</h3>
                    <p class="cv-period">${exp.period}</p>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-book-bookmark'></i> Education</h2>
            ${education.map(edu => `
                <div class="cv-item">
                    <h3>${edu.degree}</h3>
                    <p class="cv-institution">${edu.institution}</p>
                    <p class="cv-period">${edu.period}</p>
                    <p>${edu.description}</p>
                </div>
            `).join('')}
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-certification'></i> Certifications</h2>
            ${certifications.map(cert => `
                <div class="cv-item">
                    <h3>${cert.title}</h3>
                    <p class="cv-institution">${cert.issuer}</p>
                    <p class="cv-period">${cert.date}</p>
                    <p>${cert.description}</p>
                </div>
            `).join('')}
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-code-alt'></i> Technical Skills</h2>
            <div class="cv-skills-grid">
                <div class="cv-skill-category">
                    <h3>Programming Languages</h3>
                    <p>${skills.programming.join(', ')}</p>
                </div>
                <div class="cv-skill-category">
                    <h3>Frameworks & Libraries</h3>
                    <p>${skills.frameworks.join(', ')}</p>
                </div>
                <div class="cv-skill-category">
                    <h3>Databases</h3>
                    <p>${skills.databases.join(', ')}</p>
                </div>
                <div class="cv-skill-category">
                    <h3>Tools & Technologies</h3>
                    <p>${skills.tools.join(', ')}</p>
                </div>
                <div class="cv-skill-category">
                    <h3>Other Skills</h3>
                    <p>${skills.other.join(', ')}</p>
                </div>
            </div>
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-star'></i> Core Competencies</h2>
            <div class="cv-competencies">
                ${coreCompetencies.map(comp => `
                    <div class="cv-competency-item">
                        <div class="cv-comp-header">
                            <span>${comp.name}</span>
                            <span class="cv-comp-level">${comp.level}</span>
                        </div>
                        <div class="cv-comp-bar">
                            <div class="cv-comp-fill" style="width: ${comp.percentage}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-trending-up'></i> Soft Skills</h2>
            <div class="cv-soft-skills">
                ${Object.entries(softSkills).map(([skill, value]) => `
                    <div class="cv-soft-skill">
                        <span>${skill}</span>
                        <span class="cv-skill-value">${value}%</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="cv-section">
            <h2><i class='bx bx-code-block'></i> Featured Projects</h2>
            ${projects.map(proj => `
                <div class="cv-item">
                    <h3>${proj.name}</h3>
                    <p>${proj.description}</p>
                    <p class="cv-tech"><strong>Technologies:</strong> ${proj.technologies.join(', ')}</p>
                    ${proj.link !== '#' ? `<p class="cv-link"><a href="${proj.link}" target="_blank" rel="noopener">View Project →</a></p>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// Make it available globally
window.cvData = cvData;
window.generateCVHTML = generateCVHTML;