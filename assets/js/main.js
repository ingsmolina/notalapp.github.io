// Notal — vanilla JS (minimal)

// Mobile navbar hamburger toggle
(function(){
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if(!btn || !nav) return;

  var icon = btn.querySelector('i');
  function setIcon(isOpen){
    if(!icon) return;
    icon.classList.remove('fa-bars','fa-xmark');
    icon.classList.add(isOpen ? 'fa-xmark' : 'fa-bars');
  }

  function toggle(){
    var isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    setIcon(isOpen);
  }

  btn.addEventListener('click', toggle);

  // Close on link click (mobile)
  nav.addEventListener('click', function(e){
    var t = e.target;
    if(t && t.tagName && t.tagName.toLowerCase()==='a'){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      setIcon(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      setIcon(false);
    }
  });
})();

// Language preference + route mapping (hybrid: 2 URLs, auto-redirect)
(function(){
  // 1) Detect current language from URL prefix
  var isEN = location.pathname.startsWith('/en/');
  var currentLang = isEN ? 'en' : 'es';

  // 2) Read preferred language
  var stored = null;
  try { stored = localStorage.getItem('notal_lang'); } catch(_) {}
  var pref = (stored === 'en' || stored === 'es') ? stored : null;

  // 3) Route map pairs between ES and EN for simple sections
  //    Add here any page you soport: support, privacy, home
  var routePairs = [
    { es: '/',               en: '/en/' },
    { es: '/index.html',     en: '/en/' },            // opcional según servidor
    { es: '/support.html',   en: '/en/support.html' },
    { es: '/privacy.html',   en: '/en/privacy.html' },
    { es: '/#features',      en: '/en/#features' },
    { es: '/#pricing',       en: '/en/#pricing' },
  ];

  function normalize(path){
    // Mantiene el hash si existe en la ruta de la tabla; para path actual, conserva hash real
    // Simplifica dobles barras, ignora query (SEO friendly)
    var p = path.split('?')[0];
    return p;
  }

  // Encuentra la contraparte de la URL actual en el otro idioma
  function findCounterpart(langTarget){
    var here = location.pathname + (location.hash || '');
    here = normalize(here);
    for (var i=0; i<routePairs.length; i++){
      var row = routePairs[i];
      if (currentLang === 'es' && here === normalize(row.es)) return row[langTarget];
      if (currentLang === 'en' && here === normalize(row.en)) return row[langTarget];
    }
    // Fallback: si no hay match exacto, usa home del target
    return (langTarget === 'en') ? '/en/' : '/';
  }

  // 4) Auto-redirect si la preferencia no coincide con el idioma actual
  if (pref && pref !== currentLang) {
    var target = findCounterpart(pref);
    if (target && target !== (location.pathname + location.hash)) {
      location.replace(target);
      return; // detener más lógica en esta carga
    }
  }

  // 5) Click en el conmutador ES/EN: guardar preferencia y saltar a la contraparte
  var langLink = document.getElementById('langLink');
  if (langLink) {
    langLink.addEventListener('click', function(e){
      // Guardar preferencia según destino del link (si apunta a /en/ => 'en', si apunta a / => 'es')
      try {
        var href = langLink.getAttribute('href') || '';
        var next = href.startsWith('/en/') ? 'en' : 'es';
        localStorage.setItem('notal_lang', next);
      } catch (_){}

      // Nota: dejamos que el navegador siga el href (no prevenimos el default).
      // La próxima carga ya estará en el idioma preferido y se mantendrá en toda la navegación.
    });
  }
})();

// Smooth scroll for internal anchor links
(function() {
  var links = document.querySelectorAll('a[href*="#"]');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (!href || href.charAt(0) !== '#') {
        // Allow /#features, /en/#pricing, etc.
        var url = new URL(this.href);
        if (url.pathname !== location.pathname) return; // allow navigation across pages
        if (!url.hash) return;
        e.preventDefault();
        var target = document.querySelector(url.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', url.hash);
        }
        return;
      }
      // Same-page hash (#id)
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
    });
  }
})();

// Back to Top button logic
(function() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  // Mostrar / ocultar al hacer scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) { // aparece después de 400px
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  // Scroll suave hacia arriba
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();