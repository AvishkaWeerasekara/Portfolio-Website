// --- MENU TOGGLE (For Mobile) ---
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};




// --- SCROLL SECTIONS ACTIVE LINK ---
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // --- STICKY NAVBAR ---
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // --- REMOVE TOGGLE ICON AND NAVBAR WHEN CLICKING LINK ---
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// --- DARK MODE TOGGLE ---
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

// Remove no-js class from body so CSS shows elements correctly
document.body.classList.remove('no-js');

// Animated Background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(${Math.random() * 50 + 100}, ${Math.random() * 50 + 200}, ${Math.random() * 50 + 200}, ${Math.random() * 0.5 + 0.1})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Reveal animations for elements using IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
}, { threshold: 0.15 });

// Observe elements with `.to-reveal` class (works if JS exists)
document.querySelectorAll('.to-reveal').forEach(el => revealObserver.observe(el));

// Animate progress bars and circular indicators when skills come into view
function animateNumber(el, start, end, duration, onUpdate) {
    const startTimestamp = performance.now();
    const easeOutCubic = t => (--t) * t * t + 1;
    function tick(now) {
        const progress = Math.min((now - startTimestamp) / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(start + (end - start) * eased);
        if (onUpdate) onUpdate(current);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const duration = 1100; // match CSS width transition for bars

            // Animate progress bars
            document.querySelectorAll('.progress-bar').forEach(bar => {
                const value = parseInt(bar.getAttribute('data-value')) || 0;
                // Start at 0 and force initial width 0 to ensure transition
                bar.style.width = '0%';
                // Trigger reflow then set to target so CSS transition runs
                void bar.offsetWidth;
                bar.style.width = value + '%';
                // animate the number inside the span and update accessibility attributes
                const span = bar.querySelector('span');
                bar.setAttribute('role', 'progressbar');
                bar.setAttribute('aria-valuemin', '0');
                bar.setAttribute('aria-valuemax', '100');
                animateNumber(span, 0, value, duration, (current) => {
                    span.textContent = current + '%';
                    bar.setAttribute('aria-valuenow', current);
                });
            });

            // Animate circular skills (background + numeric)
            document.querySelectorAll('.circle-skill').forEach(circle => {
                const val = parseInt(circle.getAttribute('data-value')) || 0;
                const span = circle.querySelector('span');
                // animate both numeric and conic gradient
                animateNumber(span, 0, val, duration, (current) => {
                    span.textContent = current + '%';
                    circle.style.background = `conic-gradient(var(--main-color) ${current}%, rgba(255,255,255,0.03) ${current}% )`;
                });
            });

            skillsObserver.disconnect();
        }
    });
}, { threshold: 0.15 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// Make entire portfolio cards clickable using 'data-link' attribute
document.querySelectorAll('.portfolio-item.clickable').forEach(item => {
    item.addEventListener('click', (e) => {
        const link = item.getAttribute('data-link') || item.querySelector('.overlay a')?.href || '#';
        if (link && link !== '#') {
            // open in new tab
            window.open(link, '_blank', 'noopener');
        }
    });
});

// Assign random photos to cards with .random-photo
const randomImageSources = [
    'https://picsum.photos/800/500?random=1',
    'https://picsum.photos/800/500?random=2',
    'https://picsum.photos/800/500?random=3',
    'https://picsum.photos/800/500?random=4',
    'https://picsum.photos/800/500?random=5'
];
document.querySelectorAll('.portfolio-item.random-photo img').forEach(img => {
    // Choose a random image from the list
    const src = randomImageSources[Math.floor(Math.random() * randomImageSources.length)];
    img.setAttribute('src', src);
});

// Simple hero title reveal (typing-like effect)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.classList.add('reveal');
}

// Typing effect for roles in the hero subtitle
const typedEl = document.querySelector('.typed');
if (typedEl) {
    const roles = ['Full Stack Developer', 'UI/UX Designer', 'Frontend Engineer'];
    let idx = 0;
    let charIdx = 0;
    let deleting = false;
    const typeSpeed = 80;
    const pause = 1600;

    function type() {
        const full = roles[idx];
        if (!deleting) {
            typedEl.textContent = full.slice(0, ++charIdx);
            if (charIdx === full.length) {
                deleting = true;
                setTimeout(type, pause);
                return;
            }
        } else {
            typedEl.textContent = full.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % roles.length;
            }
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

// Social links: try to open native app on mobile, fallback to web URL
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const appUrl = link.dataset.appUrl;
        const webUrl = link.dataset.webUrl || link.href;
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        // If not mobile or no app URL provided, let the anchor behave normally
        if (!isMobile || !appUrl) return;

        e.preventDefault();

        // Try to open the app via scheme; fallback to web after a timeout
        const timeout = 900; // ms
        const start = Date.now();

        // Try to open app - using location assign will attempt to open native app
        window.location = appUrl;

        // Fallback: after timeout, if app hasn't opened, open the web URL in a new tab
        setTimeout(() => {
            // If still in the page (app not opened), open web URL in new tab
            if (Date.now() - start < timeout + 200) {
                window.open(webUrl, '_blank', 'noopener');
            }
        }, timeout);
    });
});

/* --- LEARN SECTION BEHAVIOR --- */
const learnModal = document.getElementById('lessonModal');
const lessonTitle = document.getElementById('lessonTitle');
const lessonIntro = document.getElementById('lessonIntro');
const lessonCodeBlock = document.getElementById('lessonCode');
const editor = document.getElementById('editor');
const outputConsole = document.getElementById('outputConsole');
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');
const exerciseList = document.getElementById('exerciseList');
const closeLesson = document.getElementById('closeLesson');
const backToPortfolio = document.getElementById('backToPortfolio');
const simInput = document.getElementById('simInput');

const learnCards = document.querySelectorAll('.learn-card');

// Lesson content templates (simple beginner-friendly examples and exercises)
const lessonTemplates = {
    java: {
        title: 'Java — Classes & OOP',
        intro: 'Basic Java example showing classes, objects and a method call.',
        theory: [
            'Java is an object-oriented programming language with a strong typing system.',
            'Key concepts: classes, objects, constructors, methods, inheritance, and encapsulation.',
            'Use `public`, `private` and `protected` to control access; `static` for class members.'
        ],
        code: '/* Example 1: Person class and object */\npublic class Person {\n    String name;\n    int age;\n\n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public void sayHello() {\n        System.out.println("Hello, my name is " + name + ", age " + age);\n    }\n}\n\n/* Example 2: Inheritance */\nclass Animal {\n    public void speak() { System.out.println("Animal noise"); }\n}\nclass Dog extends Animal {\n    public void speak() { System.out.println("Woof!"); }\n}\n\n/* Example 3: Using an array and loop */\npublic class Main {\n    public static void main(String[] args) {\n        Person p = new Person("Avishka", 22);\n        p.sayHello();\n        Dog d = new Dog();\n        d.speak();\n    }\n}\n',
        run: (code) => {
            // Simulated run — parse known patterns and display expected output
            return 'Hello, my name is Avishka, age 22\n';
        },
        exercises: [
            { id: 1, q: 'Create a class Product with name and price, and print a product.', a: 'Product p = new Product("Bread", 150);' },
            { id: 2, q: 'Add a method to increase the price by percentage and print new price.', a: 'p.increasePrice(10);' },
            { id: 3, q: 'Create two classes with inheritance and override a method.', a: 'class Cat extends Animal { public void speak() { System.out.println("Meow"); } }' }
        ]
    },
    cpp: {
        title: 'C++ — Basic IO and Loops',
        intro: 'Simple C++ example showing console I/O and loops.',
        theory: [
            'C++ is a general-purpose language often used for system/software development.',
            'Key concepts: variables, functions, control flow (if/for/while), and I/O (cin/cout).',
            'Use headers like <iostream> and namespaces (e.g., std::).',
        ],
        code: '/* Example 1: Basic console I/O and loop */\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 3; // default\n    cout << "Enter a number: ";\n    cin >> n;\n    for (int i = 0; i < n; ++i) {\n        cout << i << "\\n";\n    }\n    return 0;\n}\n\n/* Example 2: Function and array */\n#include <iostream>\nusing namespace std;\n\nint sumArray(int arr[], int len) {\n    int sum = 0;\n    for (int i = 0; i < len; ++i) sum += arr[i];\n    return sum;\n}\n\nint main() {\n    int a[] = {1,2,3};\n    cout << sumArray(a, 3) << endl;\n}\n',
        run: (code, input) => {
            // Simulate input for n value; default 3
            const n = parseInt(input) || 3;
            let out = 'Enter a number: ';
            for (let i = 0; i < n; ++i) out += (i + '\n');
            return out;
        },
        exercises: [
            { id: 1, q: 'Create a loop that prints even numbers up to 10.', a: 'for (int i = 0; i <= 10; i += 2) cout << i;' },
            { id: 2, q: 'Implement a function to find the maximum in an array.', a: 'int max = arr[0]; for (...) if(arr[i] > max) max = arr[i];' }
        ]
    },
    python: {
        title: 'Python — Loops & Functions',
        intro: 'Small Python snippet showing loops, functions and a simple calculator function.',
        theory: [
            'Python is a high-level, interpreted language with simple syntax and dynamic typing.',
            'Key concepts: functions, loops, lists, dictionaries, and error handling (try/except).',
            'Indentation matters in Python — use consistent indentation for blocks.',
        ],
        code: '# Example 1: Function and loop\ndef add(a, b):\n    return a + b\n\nfor i in range(3):\n    print("i", i)\n\nprint("Sum:", add(5, 7))\n\n# Example 2: Simple calculator\ndef calculator():\n    a = int(input("Enter a: "))\n    b = int(input("Enter b: "))\n    print("Add:", a + b)\n\n# Example 3: List iteration\nnums = [1,2,3,4]\nfor n in nums:\n    print(n)\n',
        run: (code, input) => {
            return 'i 0\ni 1\ni 2\nSum: 12\n';
        },
        exercises: [
            { id: 1, q: 'Write a function multiply(a, b) and print multiply(3,4).', a: 'def multiply(a, b):\n    return a * b' },
            { id: 2, q: 'Write a function factorial(n) using loops.', a: 'def factorial(n):\n    result = 1\n    for i in range(1,n+1):\n        result *= i\n    return result' }
        ]
    },
        web: {
        title: 'Web Dev — HTML/CSS/JS',
        intro: 'Simple HTML/CSS/JS snippet — press the button to change its color.',
            theory: [
                'Web development uses HTML for structure, CSS for presentation, and JavaScript for behavior.',
                'Practice: small interactive examples and incremental improvements help you learn fast.',
                'JS basics: DOM manipulation, event handling, and simple animations.',
            ],
            code: `<!doctype html>
<html>
<head>
    <style>
        .btn { padding: 1rem 1.6rem; background: #00f0e0; color:#071826; border-radius: .6rem; }
    </style>
</head>
<body>
    <button class="btn" id="colorBtn">Click me</button>
    <script>
        document.getElementById("colorBtn").addEventListener("click", function() {
            this.style.background = this.style.background === 'rgb(255, 100, 220)' ? '#00f0e0' : 'rgb(255, 100, 220)';
        });
    <\/script>
</body>
</html>`,
        run: (code, input) => {
            // For web we will actually run the code in an iframe
            return null;
        },
        exercises: [
            { id: 1, q: 'Change the button color or text', a: '' }
        ]
    }
};

let currentLessonLang = null;
// Utility: open lesson for a selected language
function openLesson(lang) {
    const t = lessonTemplates[lang];
    if (!t) return;
    lessonTitle.textContent = t.title;
    lessonIntro.textContent = t.intro;
    // Populate theory notes if available
    const lessonTheoryElement = document.getElementById('lessonTheory');
    if (t.theory && lessonTheoryElement) {
        lessonTheoryElement.innerHTML = '<h4>Key Concepts</h4><ul>' + t.theory.map(s => `<li>${s}</li>`).join('') + '</ul>';
    } else if (lessonTheoryElement) {
        lessonTheoryElement.innerHTML = '';
    }
    lessonCodeBlock.textContent = t.code;
    editor.value = t.code;
    outputConsole.textContent = '-- Run the code to see output --';
    exerciseList.innerHTML = '';
    t.exercises.forEach(ex => {
        const div = document.createElement('div');
        div.className = 'exercise-item';
        div.innerHTML = `<p><strong>Q${ex.id}:</strong> ${ex.q}</p><details><summary>Hint & Solution</summary><pre>${ex.a}</pre></details>`;
        exerciseList.appendChild(div);
    });
    currentLessonLang = lang;
    // show modal
    learnModal.setAttribute('aria-hidden', 'false');
}

// Close modal
function closeLessonModal() {
    learnModal.setAttribute('aria-hidden', 'true');
}

// Attach listeners to learn cards
learnCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const lang = card.getAttribute('data-lang');
        openLesson(lang);
    });
    // keyboard accessibility
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const lang = card.getAttribute('data-lang');
            openLesson(lang);
        }
    });
});

// Run button logic
runBtn.addEventListener('click', () => {
    const code = editor.value;
    const templateLang = currentLessonLang || 'web';
    if (templateLang === 'web') {
        // Run the code in an iframe preview
        // remove old preview if exists
        const oldIframe = document.querySelector('.output-box iframe');
        if (oldIframe) oldIframe.remove();
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.border = '1px solid rgba(255,255,255,0.03)';
        document.querySelector('.output-box').appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(code);
        iframe.contentWindow.document.close();
        outputConsole.textContent = '-- Preview above --';
    } else {
        // Simulated run for non-web languages
        const userInput = simInput?.value || '';
        const result = lessonTemplates[templateLang].run(code, userInput);
        outputConsole.textContent = result || 'No output';
    }
});

// Reset to example
resetBtn.addEventListener('click', () => {
    // reset editor to lesson code
    const t = lessonTemplates[currentLessonLang];
    if (t) editor.value = t.code;
    outputConsole.textContent = '-- Run the code to see output --';
    const iframe = document.querySelector('.output-box iframe');
    if (iframe) iframe.remove();
});

// Close modal button
closeLesson.addEventListener('click', closeLessonModal);
backToPortfolio.addEventListener('click', (e) => {
    closeLessonModal();
    // scroll to portfolio
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
});

// Close modal on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && learnModal.getAttribute('aria-hidden') === 'false') {
        closeLessonModal();
    }
});

// Close modal by clicking outside the modal inner
learnModal.addEventListener('click', (e) => {
    if (e.target === learnModal) closeLessonModal();
});

// Contact form submission using EmailJS
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const params = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'ashinisteeven2003@gmail.com'
    };
    emailjs.send("service_p1911v9", "template_e2a5r0k", params)
        .then(function(response) {
            showNotification('Message sent successfully!', 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            showNotification('Failed to send message. Please try again.', 'error');
        });
});

// Function to show notification
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '300px';
    notification.style.wordWrap = 'break-word';

    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else {
        notification.style.backgroundColor = '#f44336';
    }

    // Add to body
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}
