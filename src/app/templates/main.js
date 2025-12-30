let portfolioData = null;

async function loadPortfolioData() {
     try {
       // No localhost needed - use relative path!
       const response = await fetch('http://localhost:3000/api/GettingUserData', {
         headers: {
           'Authorization': `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..vxgLalpa7sbpb4r0.EGRYKN3y8cpJXqx6IH3dzZGylBX1wOIoObEWGAofqmlzjgHakl1e3GLzFZTzjgcJo6W51IVsWx0byEk3olKe7ctTOTBzck8v6rgLBmB9A823qoJW-2Y0lKi8bqhlyzl307tgVQfnRixdQ0TOoMwi8lExDCdCTO2jtrFo_yLc_GgdVpLFyxM2VsdkMyrrMjjyhX4ZshbZ2H6LTOTae8qKa7xnMt2oIQ0Fs0TTRxCjEvil.Mc9n0PMbijzDpXW9CnIGng` // Add your token
         }
       });
       const jsonData = await response.json();
       portfolioData = jsonData.data;
       return portfolioData;
     } catch (error) {
       console.error('Error loading portfolio data:', error);
       return null;
     }
   }

function initParticles() {
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#3b82f6'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5,
          random: false
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3b82f6',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    }

    anime({
      targets: themeToggle,
      rotate: 360,
      duration: 500,
      easing: 'easeInOutQuad'
    });
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function populateHero(data) {
  const logoText = document.querySelector('.logo-text');
  const heroName = document.querySelector('.hero-name');
  const heroTitle = document.querySelector('.hero-title');
  const heroDescription = document.querySelector('.hero-description');
  const profileImage = document.querySelector('.profile-image');
  const socialLinks = document.querySelector('.social-links');
  const footerName = document.querySelector('.footer-name');

  const firstName = data.personalInfo.fullName.split(' ')[0];
  logoText.textContent = firstName;
  heroName.textContent = data.personalInfo.fullName;
  heroTitle.textContent = data.jobSearchTitle;
  heroDescription.textContent = data.professionalSummary;
  footerName.textContent = data.personalInfo.fullName;

  if (data.image && data.image.length > 0) {
    profileImage.src = data.image[0];
  }

  const socialLinksData = [];
  if (data.personalInfo.github && data.personalInfo.github !== 'N/A') {
    socialLinksData.push({ icon: 'fab fa-github', url: data.personalInfo.github });
  }
  if (data.personalInfo.linkedin && data.personalInfo.linkedin !== 'N/A') {
    socialLinksData.push({ icon: 'fab fa-linkedin', url: data.personalInfo.linkedin });
  }
  if (data.onlinePresence?.twitter) {
    socialLinksData.push({ icon: 'fab fa-twitter', url: data.onlinePresence.twitter });
  }
  if (data.personalInfo.email) {
    socialLinksData.push({ icon: 'fas fa-envelope', url: `mailto:${data.personalInfo.email}` });
  }

  socialLinks.innerHTML = socialLinksData.map(social => `
    <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer">
      <i class="${social.icon}"></i>
    </a>
  `).join('');

  const footerSocial = document.querySelector('.footer-social');
  footerSocial.innerHTML = socialLinks.innerHTML;

  anime.timeline()
    .add({
      targets: '.greeting',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    })
    .add({
      targets: '.hero-name',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    }, '-=600')
    .add({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    }, '-=600')
    .add({
      targets: '.hero-description',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    }, '-=600')
    .add({
      targets: '.hero-buttons .btn',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo'
    }, '-=600')
    .add({
      targets: '.social-link',
      opacity: [0, 1],
      scale: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutElastic(1, .8)'
    }, '-=400');

  anime({
    targets: '.image-wrapper',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 1200,
    easing: 'easeOutElastic(1, .6)'
  });
}

function populateAbout(data) {
  const aboutDescription = document.querySelector('.about-description');
  aboutDescription.textContent = data.professionalSummary;

  const yearsExperience = data.experience?.length || 0;
  const projectsCompleted = data.projects?.length || 0;
  const technologiesCount = data.skills?.technical?.length || 0;

  const statNumbers = document.querySelectorAll('.stat-number');
  const statValues = [yearsExperience, projectsCompleted, technologiesCount];

  statNumbers.forEach((statNumber, index) => {
    statNumber.setAttribute('data-count', statValues[index]);
  });
}

function populateSkills(data) {
  const technicalSkillsContainer = document.getElementById('technicalSkills');
  const toolsSkillsContainer = document.getElementById('toolsSkills');
  const languageSkillsContainer = document.getElementById('languageSkills');
  const softSkillsContainer = document.getElementById('softSkills');

  if (data.skills?.technical) {
    technicalSkillsContainer.innerHTML = data.skills.technical.map(skill => `
      <span class="skill-tag">${skill}</span>
    `).join('');
  }

  if (data.tools) {
    toolsSkillsContainer.innerHTML = data.tools.map(tool => `
      <span class="skill-tag">${tool}</span>
    `).join('');
  }

  if (data.skills?.languages) {
    languageSkillsContainer.innerHTML = data.skills.languages.map(language => `
      <span class="skill-tag">${language}</span>
    `).join('');
  }

  if (data.skills?.soft) {
    softSkillsContainer.innerHTML = data.skills.soft.map(skill => `
      <span class="skill-tag">${skill}</span>
    `).join('');
  }
}

function formatDate(dateString) {
  if (!dateString) return 'Present';
  const [year, month] = dateString.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function populateExperience(data) {
  const experienceTimeline = document.getElementById('experienceTimeline');

  if (data.experience && data.experience.length > 0) {
    experienceTimeline.innerHTML = data.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3 class="timeline-title">${exp.title}</h3>
          <div class="timeline-company">${exp.company}</div>
          <div class="timeline-date">
            <i class="fas fa-calendar"></i>
            ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}
          </div>
          <ul class="timeline-responsibilities">
            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }
}

function populateEducation(data) {
  const educationGrid = document.getElementById('educationGrid');

  if (data.education && data.education.length > 0) {
    educationGrid.innerHTML = data.education.map(edu => `
      <div class="education-card">
        <h3 class="education-degree">${edu.degree}</h3>
        <div class="education-institution">${edu.institution}</div>
        <div class="education-details">
          ${edu.location !== 'N/A' ? `
            <div class="education-detail">
              <i class="fas fa-map-marker-alt"></i>
              ${edu.location}
            </div>
          ` : ''}
          <div class="education-detail">
            <i class="fas fa-graduation-cap"></i>
            ${edu.graduationYear}
          </div>
        </div>
      </div>
    `).join('');
  }
}

function populateProjects(data) {
  const projectsGrid = document.getElementById('projectsGrid');
  const noProjects = document.getElementById('noProjects');

  if (data.projects && data.projects.length > 0) {
    projectsGrid.innerHTML = data.projects.map(project => `
      <div class="project-card">
        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description || ''}</p>
          ${project.technologies ? `
            <div class="project-tech">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          ` : ''}
          <div class="project-links">
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" class="project-link primary" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
            ` : ''}
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" class="project-link secondary" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> Code
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');
    noProjects.style.display = 'none';
  } else {
    projectsGrid.style.display = 'none';
    noProjects.style.display = 'block';
  }
}

function populateContact(data) {
  const contactInfo = document.getElementById('contactInfo');

  const contactItems = [];

  if (data.personalInfo.email) {
    contactItems.push({
      icon: 'fas fa-envelope',
      title: 'Email',
      value: data.personalInfo.email
    });
  }

  if (data.personalInfo.phone) {
    contactItems.push({
      icon: 'fas fa-phone',
      title: 'Phone',
      value: data.personalInfo.phone
    });
  }

  if (data.personalInfo.location) {
    contactItems.push({
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: data.personalInfo.location
    });
  }

  contactInfo.innerHTML = contactItems.map(item => `
    <div class="contact-item">
      <div class="contact-icon">
        <i class="${item.icon}"></i>
      </div>
      <div class="contact-details">
        <h3>${item.title}</h3>
        <p>${item.value}</p>
      </div>
    </div>
  `).join('');
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    anime({
      targets: contactForm.querySelector('.btn-primary'),
      scale: [1, 0.95, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });

    setTimeout(() => {
      alert('Thank you for your message! This is a demo form.');
      contactForm.reset();
    }, 500);
  });
}

function initScrollAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.skill-category').forEach((category, index) => {
      gsap.from(category, {
        scrollTrigger: {
          trigger: category,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.education-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.contact-item').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: 'power3.out'
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(statNumber => {
      const targetValue = parseInt(statNumber.getAttribute('data-count'));

      ScrollTrigger.create({
        trigger: statNumber,
        start: 'top 80%',
        onEnter: () => {
          anime({
            targets: statNumber,
            innerHTML: [0, targetValue],
            duration: 2000,
            round: 1,
            easing: 'easeOutExpo'
          });
        }
      });
    });
  }
}

function initSkillTagAnimations() {
  const skillTags = document.querySelectorAll('.skill-tag');

  skillTags.forEach((tag, index) => {
    tag.addEventListener('mouseenter', () => {
      anime({
        targets: tag,
        scale: 1.1,
        duration: 300,
        easing: 'easeOutElastic(1, .6)'
      });
    });

    tag.addEventListener('mouseleave', () => {
      anime({
        targets: tag,
        scale: 1,
        duration: 300,
        easing: 'easeOutElastic(1, .6)'
      });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const targetPosition = target.offsetTop - 80;

        anime({
          targets: document.scrollingElement || document.documentElement,
          scrollTop: targetPosition,
          duration: 1000,
          easing: 'easeInOutQuad'
        });
      }
    });
  });
}

async function init() {
  const data = await loadPortfolioData();

  if (!data) {
    console.error('Failed to load portfolio data');
    return;
  }

  populateHero(data);
  populateAbout(data);
  populateSkills(data);
  populateExperience(data);
  populateEducation(data);
  populateProjects(data);
  populateContact(data);

  initParticles();
  initThemeToggle();
  initMobileMenu();
  initNavbarScroll();
  initContactForm();
  initSmoothScroll();

  setTimeout(() => {
    initScrollAnimations();
    initSkillTagAnimations();
  }, 100);

  document.title = `${data.personalInfo.fullName} - Portfolio`;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
