export const portfolioData = {
  personal: {
    name: "Nishant Thakur",
    role: "Software Developer",
    email: "nishant.krthakur111@gmail.com",
    phone: "+977 65700153",
    location: "Harharmahadev, KTM",
    description: "I build elegant, high-performance applications using modern technologies. Passionate about creating solutions that solve real-world problems through clean code and intuitive design.",
    bio: "I'm a dedicated software developer with a passion for creating innovative solutions that solve real-world problems. My journey in technology began with a fascination for how software can transform ideas into powerful applications that impact people's lives.",
    approach: "My approach combines analytical thinking with creative problem-solving to develop efficient and elegant solutions. I believe in writing clean, maintainable code and staying updated with the latest industry trends and best practices."
  },
  
  skills: [
    {
      category: "Frontend",
      icon: "fab fa-react",
      technologies: ["React", "JavaScript", "TypeScript", "HTML/CSS"]
    },
    {
      category: "Mobile",
      icon: "fas fa-mobile-alt",
      technologies: ["Flutter", "Dart", "Android"]
    },
    {
      category: "Backend & Cloud",
      icon: "fas fa-server",
      technologies: ["Python", "Node.js", "AWS", "GCP", "Docker", "MangoDB"]
    },
    {
      category: "System Design",
      icon: "fas fa-project-diagram",
      technologies: ["Architecture",  "APIs", "Database Design"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Real-Time Video Chat App",
      description: "A modern video calling application enabling instant peer-to-peer communication through web browsers. Features room-based meetings, audio/video controls, multi-user support, and responsive design that works seamlessly across desktop and mobile devices.",
      technologies: ["React", "Node.js", "Socket.io", "WebRTC", "Express", "CSS3"],
      gradient: "linear-gradient(135deg, #10b981, #3b82f6)",
      demoUrl: "https://video-chat-app-i16z.onrender.com/",
      sourceUrl: "https://github.com/Nishant-git0/video-chat-app.git",
      featured: true
    },
    {
      id: 2,
      title: "HomeLink",
      description: "A responsive realestate website which allow to search for rent and sell houses and list it.",
      technologies: ["React", "Nodejs", "MangoDB", "REST API"],
      gradient: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
      demoUrl: "#",
      sourceUrl: "#",
      featured: true
    },
    
  ],

  interests: [
    "Full-Stack Development",
    "Cloud Architecture", 
    "Mobile Applications",
    "UI/UX Design",
    "System Design",
    "DevOps"
  ],

  socialLinks: [
    { platform: "github", url: "https://github.com/nishantthakur", icon: "fab fa-github" },
    { platform: "linkedin", url: "https://linkedin.com/in/nishantthakur", icon: "fab fa-linkedin-in" },
    { platform: "twitter", url: "https://twitter.com/nishantthakur", icon: "fab fa-twitter" },
    { platform: "instagram", url: "https://instagram.com/nishantthakur", icon: "fab fa-instagram" }
  ],

  navigation: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ],

};