// Portfolio Website Logger
// Tracks page views, clicks, navigation, form submissions, and errors

class PortfolioLogger {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.logs = [];
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    init() {
        this.logPageView();
        this.trackNavigation();
        this.trackClicks();
        this.trackFormSubmissions();
        this.trackErrors();
        this.trackScrollDepth();
        this.trackTimeOnPage();
    }

    createLogEntry(type, data) {
        const entry = {
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            type: type,
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...data
        };
        
        this.logs.push(entry);
        this.sendLog(entry);
        return entry;
    }

    logPageView() {
        this.createLogEntry('page_view', {
            title: document.title,
            referrer: document.referrer,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        });
    }

    trackNavigation() {
        // Track navigation link clicks
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', (e) => {
                this.createLogEntry('navigation_click', {
                    section: link.textContent.trim(),
                    href: link.getAttribute('href'),
                    element: 'navbar'
                });
            });
        });
    }

    trackClicks() {
        // Track button clicks
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createLogEntry('button_click', {
                    buttonText: btn.textContent.trim(),
                    buttonClass: btn.className,
                    section: this.getCurrentSection(btn)
                });
            });
        });

        // Track social media clicks
        document.querySelectorAll('.social-media a').forEach(link => {
            link.addEventListener('click', (e) => {
                this.createLogEntry('social_click', {
                    platform: link.getAttribute('aria-label') || 'unknown',
                    url: link.href
                });
            });
        });

        // Track portfolio item clicks
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const title = item.querySelector('h3')?.textContent || 'unknown';
                this.createLogEntry('portfolio_click', {
                    projectTitle: title,
                    link: item.getAttribute('data-link')
                });
            });
        });

        // Track learning card clicks
        document.querySelectorAll('.learn-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.createLogEntry('learn_click', {
                    language: card.getAttribute('data-lang'),
                    title: card.querySelector('h3')?.textContent
                });
            });
        });
    }

    trackFormSubmissions() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.createLogEntry('form_submission', {
                    formId: 'contactForm',
                    fields: {
                        hasName: !!document.getElementById('name')?.value,
                        hasEmail: !!document.getElementById('email')?.value,
                        hasSubject: !!document.getElementById('subject')?.value,
                        hasMessage: !!document.getElementById('message')?.value
                    }
                });
            });
        }
    }

    trackErrors() {
        window.addEventListener('error', (e) => {
            this.createLogEntry('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error?.stack
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.createLogEntry('promise_rejection', {
                reason: e.reason?.toString(),
                promise: e.promise
            });
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        let scrollTimer;

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollPercentage = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );
                
                if (scrollPercentage > maxScroll) {
                    maxScroll = scrollPercentage;
                    
                    // Log at 25%, 50%, 75%, 100%
                    if (maxScroll >= 25 && maxScroll < 50) {
                        this.createLogEntry('scroll_depth', { depth: '25%' });
                    } else if (maxScroll >= 50 && maxScroll < 75) {
                        this.createLogEntry('scroll_depth', { depth: '50%' });
                    } else if (maxScroll >= 75 && maxScroll < 100) {
                        this.createLogEntry('scroll_depth', { depth: '75%' });
                    } else if (maxScroll === 100) {
                        this.createLogEntry('scroll_depth', { depth: '100%' });
                    }
                }
            }, 500);
        });
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.createLogEntry('session_end', {
                timeSpentSeconds: timeSpent,
                totalLogs: this.logs.length
            });
        });
    }

    getCurrentSection(element) {
        const section = element.closest('section');
        return section?.id || 'unknown';
    }

    sendLog(logEntry) {
        // Console logging for development
        console.log('📊 Log:', logEntry);

        // Store in session storage for persistence
        try {
            const existingLogs = JSON.parse(sessionStorage.getItem('portfolioLogs') || '[]');
            existingLogs.push(logEntry);
            sessionStorage.setItem('portfolioLogs', JSON.stringify(existingLogs));
        } catch (e) {
            console.error('Failed to store log:', e);
        }

        // Send to analytics endpoint (implement your own)
        // this.sendToServer(logEntry);
    }

    sendToServer(logEntry) {
        // Example: Send to your backend
        fetch('/api/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logEntry)
        }).catch(err => console.error('Failed to send log:', err));
    }

    // Get all logs for the current session
    getSessionLogs() {
        return this.logs;
    }

    // Get logs from session storage
    getAllStoredLogs() {
        try {
            return JSON.parse(sessionStorage.getItem('portfolioLogs') || '[]');
        } catch (e) {
            return [];
        }
    }

    // Clear all logs
    clearLogs() {
        this.logs = [];
        sessionStorage.removeItem('portfolioLogs');
    }

    // Generate analytics summary
    getAnalyticsSummary() {
        const logs = this.getAllStoredLogs();
        
        return {
            totalLogs: logs.length,
            pageViews: logs.filter(l => l.type === 'page_view').length,
            navigationClicks: logs.filter(l => l.type === 'navigation_click').length,
            buttonClicks: logs.filter(l => l.type === 'button_click').length,
            socialClicks: logs.filter(l => l.type === 'social_click').length,
            portfolioClicks: logs.filter(l => l.type === 'portfolio_click').length,
            formSubmissions: logs.filter(l => l.type === 'form_submission').length,
            errors: logs.filter(l => l.type === 'javascript_error' || l.type === 'promise_rejection').length,
            maxScrollDepth: this.getMaxScrollDepth(logs)
        };
    }

    getMaxScrollDepth(logs) {
        const scrollLogs = logs.filter(l => l.type === 'scroll_depth');
        if (scrollLogs.length === 0) return '0%';
        
        const depths = scrollLogs.map(l => parseInt(l.depth));
        return Math.max(...depths) + '%';
    }
}

// Initialize logger when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioLogger = new PortfolioLogger();
    });
} else {
    window.portfolioLogger = new PortfolioLogger();
}

// Expose logger for debugging
window.viewLogs = () => {
    console.table(window.portfolioLogger.getAllStoredLogs());
    console.log('Summary:', window.portfolioLogger.getAnalyticsSummary());
};

window.clearLogs = () => {
    window.portfolioLogger.clearLogs();
    console.log('All logs cleared');
};