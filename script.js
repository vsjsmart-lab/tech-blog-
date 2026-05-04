// ============================================
// ZEORIX TECH BLOG - JavaScript Logic
// ============================================

class BlogStore {
    constructor() {
        this.blogs = this.loadBlogs();
        this.initializeSampleBlogs();
    }

    loadBlogs() {
        const stored = localStorage.getItem('zeorixBlogs');
        return stored ? JSON.parse(stored) : [];
    }

    saveBlogs() {
        localStorage.setItem('zeorixBlogs', JSON.stringify(this.blogs));
    }

    initializeSampleBlogs() {
        if (this.blogs.length === 0) {
            this.blogs = [
                {
                    id: 1,
                    title: "Getting Started with React Hooks",
                    author: "Alex Johnson",
                    category: "Web Development",
                    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600",
                    excerpt: "Learn how to use React Hooks to manage state and side effects in your functional components.",
                    content: "React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore useState, useEffect, useContext, and custom hooks. You'll learn best practices and patterns that will make your code more maintainable and efficient.\n\nHooks allow you to use state and other React features without writing a class. This article covers everything from basic hooks to advanced patterns including performance optimization and custom hook creation.",
                    tags: ["React", "JavaScript", "Hooks"],
                    views: 1523,
                    readTime: "8 min",
                    date: "2026-04-28"
                },
                {
                    id: 2,
                    title: "Docker & Kubernetes: A Complete Guide",
                    author: "Sarah Williams",
                    category: "DevOps",
                    image: "https://images.unsplash.com/photo-1667372335814-92d8e0e4d3d5?w=600",
                    excerpt: "Master containerization and orchestration with Docker and Kubernetes for production-ready applications.",
                    content: "In this in-depth guide, we'll explore containerization with Docker and orchestration with Kubernetes. Learn how to create Docker images, manage containers, and deploy applications at scale using Kubernetes clusters.\n\nWe'll cover best practices for production deployments, including resource management, security considerations, and monitoring strategies. This guide is designed for developers transitioning from traditional deployment methods to cloud-native architecture.",
                    tags: ["Docker", "Kubernetes", "DevOps"],
                    views: 2341,
                    readTime: "12 min",
                    date: "2026-04-27"
                },
                {
                    id: 3,
                    title: "Machine Learning Fundamentals with Python",
                    author: "David Chen",
                    category: "AI & Machine Learning",
                    image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8b08f?w=600",
                    excerpt: "A beginner-friendly introduction to machine learning concepts and practical implementation using Python.",
                    content: "Machine learning is transforming industries and creating amazing applications. This tutorial covers the fundamental concepts of machine learning including supervised learning, unsupervised learning, and reinforcement learning.\n\nUsing Python libraries like scikit-learn, pandas, and TensorFlow, we'll build practical models and understand how to evaluate their performance. Perfect for data scientists and developers looking to enter the ML field.",
                    tags: ["Python", "Machine Learning", "AI"],
                    views: 3012,
                    readTime: "15 min",
                    date: "2026-04-26"
                },
                {
                    id: 4,
                    title: "Building REST APIs with Node.js and Express",
                    author: "Emma Davis",
                    category: "Web Development",
                    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
                    excerpt: "Create scalable and secure REST APIs using Node.js and Express framework with best practices.",
                    content: "Building robust REST APIs is crucial for modern web applications. This guide walks you through creating RESTful services using Node.js and Express, covering authentication, validation, error handling, and security.\n\nLearn about middleware, routing, database integration, and deployment strategies. We'll also cover testing, documentation, and performance optimization to ensure your APIs are production-ready.",
                    tags: ["Node.js", "Express", "API"],
                    views: 2876,
                    readTime: "10 min",
                    date: "2026-04-25"
                },
                {
                    id: 5,
                    title: "Cybersecurity Best Practices for Developers",
                    author: "Michael Brown",
                    category: "Cybersecurity",
                    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
                    excerpt: "Essential security practices every developer should implement to protect applications and user data.",
                    content: "Security should be a priority from day one. This comprehensive guide covers OWASP top 10 vulnerabilities, secure coding practices, authentication and authorization, encryption, and secure deployment.\n\nLearn how to identify and prevent common security vulnerabilities including SQL injection, cross-site scripting (XSS), and CSRF attacks. We'll also cover security testing, vulnerability management, and incident response.",
                    tags: ["Security", "Best Practices", "DevOps"],
                    views: 1654,
                    readTime: "11 min",
                    date: "2026-04-24"
                },
                {
                    id: 6,
                    title: "Advanced TypeScript Patterns and Techniques",
                    author: "Lisa Anderson",
                    category: "Web Development",
                    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600",
                    excerpt: "Explore advanced TypeScript features and design patterns for building scalable applications.",
                    content: "TypeScript is becoming the standard for large-scale JavaScript development. This advanced guide covers generics, decorators, modules, and advanced type systems.\n\nLearn how to structure large codebases, create reusable components, and leverage TypeScript's powerful type system for better code quality and maintainability. We'll cover real-world patterns used in production applications.",
                    tags: ["TypeScript", "JavaScript", "Advanced"],
                    views: 1298,
                    readTime: "9 min",
                    date: "2026-04-23"
                }
            ];
            this.saveBlogs();
        }
    }

    addBlog(blog) {
        blog.id = Date.now();
        blog.views = 0;
        blog.date = new Date().toISOString().split('T')[0];
        this.blogs.unshift(blog);
        this.saveBlogs();
        return blog;
    }

    getAllBlogs() {
        return this.blogs;
    }

    getBlogById(id) {
        return this.blogs.find(blog => blog.id === parseInt(id));
    }

    getStats() {
        const totalBlogs = this.blogs.length;
        const totalViews = this.blogs.reduce((sum, blog) => sum + blog.views, 0);
        const authors = new Set(this.blogs.map(blog => blog.author));
        const avgReadTime = this.blogs.length > 0
            ? Math.round(this.blogs.reduce((sum, blog) => {
                const time = parseInt(blog.readTime);
                return sum + time;
            }, 0) / this.blogs.length)
            : 0;

        return {
            totalBlogs,
            totalViews,
            totalAuthors: authors.size,
            avgReadTime
        };
    }

    incrementViews(id) {
        const blog = this.getBlogById(id);
        if (blog) {
            blog.views++;
            this.saveBlogs();
        }
    }
}

// Initialize store
const blogStore = new BlogStore();

// ============================================
// DOM ELEMENTS
// ============================================

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');
const pages = document.querySelectorAll('.page');
const modal = document.getElementById('blogModal');
const closeBtn = document.querySelector('.close');
const toast = document.getElementById('toast');

// ============================================
// NAVIGATION & PAGE ROUTING
// ============================================

function navigateTo(pageId) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    mobileLinks.forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    const activeMobileLink = document.querySelector(`.mobile-link[data-page="${pageId}"]`);

    if (activeLink) activeLink.classList.add('active');
    if (activeMobileLink) activeMobileLink.classList.add('active');

    // Close mobile menu
    mobileMenu.classList.remove('show');
    navToggle.classList.remove('active');

    // Load page-specific content
    if (pageId === 'home') {
        renderFeaturedBlogs();
        updateStats();
    } else if (pageId === 'blogs') {
        renderAllBlogs();
    }
}

// Navigation click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateTo(pageId);
    });
});

mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateTo(pageId);
    });
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.borderBottomColor = 'rgba(55, 65, 81, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(55, 65, 81, 1)';
    }
});

// ============================================
// HOME PAGE - FEATURED BLOGS
// ============================================

function renderFeaturedBlogs() {
    const featuredContainer = document.getElementById('featuredBlogs');
    const blogs = blogStore.getAllBlogs().slice(0, 3);

    featuredContainer.innerHTML = blogs.map(blog => createBlogCard(blog)).join('');
    attachBlogCardListeners();
}

// ============================================
// BLOGS PAGE - ALL BLOGS
// ============================================

function renderAllBlogs(filter = null) {
    const blogsList = document.getElementById('blogsList');
    const noResults = document.getElementById('noResults');
    let blogs = blogStore.getAllBlogs();

    // Apply filters
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';

    blogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm) ||
            blog.excerpt.toLowerCase().includes(searchTerm) ||
            blog.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || blog.category === category;
        return matchesSearch && matchesCategory;
    });

    if (blogs.length === 0) {
        blogsList.innerHTML = '';
        noResults.style.display = 'flex';
    } else {
        blogsList.innerHTML = blogs.map(blog => createBlogCard(blog)).join('');
        noResults.style.display = 'none';
        attachBlogCardListeners();
    }
}

// ============================================
// BLOG CARD COMPONENT
// ============================================

function createBlogCard(blog) {
    const authorInitials = blog.author.split(' ').map(n => n[0]).join('');
    return `
        <div class="blog-card" data-blog-id="${blog.id}">
            <div class="blog-image" style="background-image: url('${blog.image}');">
                <div class="blog-category">${blog.category}</div>
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-meta">
                    <div class="blog-author">
                        <div class="blog-author-avatar">${authorInitials}</div>
                        <span>${blog.author}</span>
                    </div>
                    <div class="blog-stats">
                        <div class="blog-stat">
                            <i class="fas fa-eye"></i>
                            ${blog.views}
                        </div>
                        <div class="blog-stat">
                            <i class="fas fa-clock"></i>
                            ${blog.readTime}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachBlogCardListeners() {
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const blogId = parseInt(card.getAttribute('data-blog-id'));
            showBlogModal(blogId);
        });
    });
}

// ============================================
// MODAL - VIEW FULL BLOG
// ============================================

function showBlogModal(blogId) {
    const blog = blogStore.getBlogById(blogId);
    if (!blog) return;

    blogStore.incrementViews(blogId);

    const authorInitials = blog.author.split(' ').map(n => n[0]).join('');
    const modalContent = document.getElementById('modalBlogContent');

    modalContent.innerHTML = `
        <div class="modal-blog-header">
            <h2 class="modal-blog-title">${blog.title}</h2>
            <div class="modal-blog-meta">
                <div class="modal-blog-meta-item">
                    <i class="fas fa-user"></i>
                    <span>${blog.author}</span>
                </div>
                <div class="modal-blog-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(blog.date)}</span>
                </div>
                <div class="modal-blog-meta-item">
                    <i class="fas fa-tag"></i>
                    <span>${blog.category}</span>
                </div>
                <div class="modal-blog-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${blog.readTime} read</span>
                </div>
                <div class="modal-blog-meta-item">
                    <i class="fas fa-eye"></i>
                    <span>${blog.views} views</span>
                </div>
            </div>
        </div>
        <img src="${blog.image}" alt="${blog.title}" class="modal-blog-image">
        <div class="modal-blog-content">${blog.content}</div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(55, 65, 81, 0.5);">
            <h4 style="color: var(--text-primary); margin-bottom: 10px;">Tags:</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${blog.tags.map(tag => `<span style="background: rgba(0, 212, 255, 0.1); border: 1px solid var(--border-color); color: var(--accent-blue); padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">#${tag}</span>`).join('')}
            </div>
        </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// CREATE BLOG FORM
// ============================================

const createBlogForm = document.getElementById('createBlogForm');

createBlogForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const blog = {
        title: document.getElementById('blogTitle').value,
        author: document.getElementById('blogAuthor').value,
        category: document.getElementById('blogCategory').value,
        image: document.getElementById('blogImage').value,
        excerpt: document.getElementById('blogExcerpt').value,
        content: document.getElementById('blogContent').value,
        tags: document.getElementById('blogTags').value.split(',').map(tag => tag.trim()),
        readTime: calculateReadTime(document.getElementById('blogContent').value)
    };

    // Validate
    if (!blog.title || !blog.author || !blog.category || !blog.image || !blog.excerpt || !blog.content) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    blogStore.addBlog(blog);
    showToast('Article published successfully! 🎉', 'success');
    createBlogForm.reset();

    setTimeout(() => {
        navigateTo('blogs');
    }, 1500);
});

function calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${Math.max(1, minutes)} min`;
}

// ============================================
// SEARCH & FILTER
// ============================================

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

if (searchInput) {
    searchInput.addEventListener('input', () => renderAllBlogs());
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', () => renderAllBlogs());
}

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message sent successfully! We\'ll get back to you soon. ✉️', 'success');
        contactForm.reset();
    });
}

// ============================================
// CATEGORY NAVIGATION
// ============================================

const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        navigateTo('blogs');
        setTimeout(() => {
            document.getElementById('categoryFilter').value = category;
            renderAllBlogs();
        }, 100);
    });
});

// ============================================
// UPDATE STATS
// ============================================

function updateStats() {
    const stats = blogStore.getStats();
    document.getElementById('totalBlogs').textContent = stats.totalBlogs;
    document.getElementById('totalViews').textContent = stats.totalViews.toLocaleString();
    document.getElementById('totalAuthors').textContent = stats.totalAuthors;
    document.getElementById('avgReadTime').textContent = stats.avgReadTime;
}

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
    updateStats();
});
