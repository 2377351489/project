// 页面交互脚本：主题切换、项目渲染、侧边导航高亮、移动端菜单
// 项目数据来自 projects-data.js（需先于本文件引入）

// 主题切换：浅色/深色切换，localStorage 记住用户上一次选择
function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const apply = function (theme) {
    root.setAttribute("data-theme", theme);
    btn.textContent = theme === "dark" ? "浅色" : "深色";
  };

  apply(localStorage.getItem("theme") === "dark" ? "dark" : "light");

  btn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem("theme", next);
  });
}

// 渲染项目列表：数据驱动，新增项目只需修改 projects-data.js
function renderProjects() {
  const list = document.getElementById("project-list");
  if (!list || typeof PROJECTS === "undefined") return;

  list.innerHTML = PROJECTS.map(function (p) {
    const stack = p.stack.map(function (t) {
      return "<li>" + t + "</li>";
    }).join("");
    const cls = p.featured ? " project-item--featured" : "";
    return (
      '<article class="project-item' + cls + '">' +
        '<figure class="project-media">' +
          '<img src="' + p.image + '" alt="「' + p.name + '」项目配图" loading="lazy">' +
        "</figure>" +
        '<div class="project-info">' +
          '<div class="project-meta">' +
            '<span class="project-category">' + p.category + "</span>" +
            '<span class="project-time">' + p.time + "</span>" +
          "</div>" +
          '<h3 class="project-name">' + p.name + "</h3>" +
          '<p class="project-desc">' + p.desc + "</p>" +
          '<ul class="project-stack">' + stack + "</ul>" +
        "</div>" +
      "</article>"
    );
  }).join("");
}

// 滚动监听：左侧导航高亮当前浏览到的区块
function initScrollSpy() {
  const links = document.querySelectorAll(".main-nav .nav-link");
  const sections = document.querySelectorAll(".main-content section[id]");
  if (!links.length || !sections.length) return;

  const setActive = function (id) {
    links.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

// 移动端菜单开合：点击按钮展开/收起，点击导航项后自动收起
function initMenu() {
  const sidebar = document.querySelector(".sidebar");
  const toggle = document.querySelector(".menu-toggle");
  if (!sidebar || !toggle) return;

  const close = function () {
    sidebar.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "菜单";
  };

  toggle.addEventListener("click", function () {
    const open = sidebar.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "关闭" : "菜单";
  });

  document.querySelectorAll(".main-nav .nav-link").forEach(function (link) {
    link.addEventListener("click", close);
  });
}

// 图片放大预览：点击项目图片打开遮罩层，点击空白/大图/关闭按钮/Esc 键关闭
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = lightbox ? lightbox.querySelector(".lightbox-img") : null;
  const closeBtn = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  if (!lightbox || !img || !closeBtn) return;

  let lastFocus = null;

  const open = function (source) {
    img.src = source.src;
    img.alt = source.alt;
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = function () {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    img.src = "";
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll(".project-media img").forEach(function (source) {
    source.addEventListener("click", function () {
      open(source);
    });
  });

  closeBtn.addEventListener("click", close);
  img.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) close();
  });
}

initTheme();
renderProjects();
initScrollSpy();
initMenu();
initLightbox();
