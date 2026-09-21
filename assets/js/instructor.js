// ==================== 網頁載入完成後執行 ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 導航列功能 ====================
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滾動時改變導航列樣式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 手機選單切換
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // 切換漢堡選單動畫
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // 點擊連結後關閉手機選單
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // 平滑捲動到指定區塊
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 高亮當前區塊的導航連結
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ==================== 回到頂部按鈕 ====================
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==================== 表單處理 ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 取得表單資料
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 這裡可以串接後端API或發送郵件
        // 目前只顯示提示訊息
        alert('感謝您的訊息！我會盡快回覆您。\n\n' +
              '姓名：' + formData.name + '\n' +
              '信箱：' + formData.email);
        
        // 重置表單
        contactForm.reset();
    });
    }
    
    // ==================== 滾動動畫 ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 為需要動畫的元素添加初始樣式和觀察
    const animatedElements = document.querySelectorAll(
        '.course-card, .expertise-card, .stat-card, .testimonial-card, .case-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ==================== 統計數字動畫 ====================
    const stats = document.querySelectorAll('.stat-number');
    let animatedStats = false;
    
    function animateStats() {
        if (animatedStats) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCount = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(updateCount);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 30);
        });
        
        animatedStats = true;
    }
    
    // 當統計數字進入視窗時開始動畫
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ==================== 技能標籤互動效果 ====================
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // ==================== 課程卡片特效 ====================
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'var(--bg-light)';
        });
    });
    
    // ==================== 圖片延遲載入 ====================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ==================== 主視覺背景特效 ====================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const techPattern = this.querySelector('.tech-pattern');
            if (techPattern) {
                techPattern.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            }
        });
    }
    
    // ==================== 滾動指示器 ====================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ==================== 表單驗證即時回饋 ====================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // 電子郵件格式驗證
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value) && this.value !== '') {
                this.style.borderColor = '#ef4444';
            }
        });
    }
    
    // ==================== 手機裝置優化 ====================
    // 防止在移動裝置上懸停效果造成的問題
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // ==================== 效能優化：節流函數 ====================
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    }
    
    // 優化滾動事件
    window.addEventListener('scroll', throttle(function() {
        // 滾動相關的優化處理
    }, 100));
    
    // ==================== 預載入重要圖片 ====================
    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // 可以在這裡添加需要預載入的圖片路徑
    // preloadImages(['images/hero-bg.jpg', 'images/about.jpg']);
    
    // ==================== 列印友善處理 ====================
    window.addEventListener('beforeprint', function() {
        // 列印前的處理
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        // 列印後的處理
        document.body.classList.remove('printing');
    });
    
    // ==================== 證照分類切換功能 ====================
    const certTabs = document.querySelectorAll('.cert-tab');
    const certGrids = document.querySelectorAll('.cert-grid');
    
    console.log('證照標籤數量:', certTabs.length);
    console.log('證照區塊數量:', certGrids.length);
    
    if (certTabs.length > 0) {
        certTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                console.log('點擊證照標籤:', this.dataset.certCategory);
                
                // 移除所有active class
                certTabs.forEach(t => t.classList.remove('active'));
                certGrids.forEach(g => g.classList.remove('active'));
                
                // 添加active class到當前tab
                this.classList.add('active');
                
                const category = this.dataset.certCategory;
                
                // 顯示對應的證照
                const targetGrid = document.querySelector(`[data-cert-group="${category}"]`);
                console.log('找到目標區塊:', targetGrid);
                if (targetGrid) {
                    targetGrid.classList.add('active');
                }
            });
        });
    } else {
        console.log('警告：找不到證照標籤元素');
    }

    // ==================== 作品集篩選功能 ====================
    const portfolioTabs = document.querySelectorAll('.portfolio-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有active class
            portfolioTabs.forEach(t => t.classList.remove('active'));
            // 添加active class到當前tab
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // 篩選作品
            portfolioItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ==================== 作品集項目動畫 ====================
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        portfolioObserver.observe(item);
    });
    
    // ==================== 初始化完成提示 ====================
    console.log('網站初始化完成！');
    console.log('Andy老師講師網站 v3.0 - 證照圖片展示 + 完整作品集');
    
});

// ==================== 暗黑模式切換（可選功能）====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// 檢查使用者偏好
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== 工具函數 ====================

// 格式化日期
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('zh-TW', options);
}

// 複製到剪貼簿
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('已複製到剪貼簿！');
    }).catch(err => {
        console.error('複製失敗:', err);
    });
}

// 檢測瀏覽器
function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
    if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) return 'IE';
    return 'Unknown';
}

// ==================== 效能監控（開發用）====================
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`頁面載入時間: ${pageLoadTime}ms`);
        }, 0);
    });
}

