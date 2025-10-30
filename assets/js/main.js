// Notal — vanilla JS helpers

// 1) Mobile navbar hamburger toggle
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

  nav.addEventListener('click', function(e){
    if(e.target && e.target.tagName && e.target.tagName.toLowerCase()==='a'){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      setIcon(false);
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      setIcon(false);
    }
  });
})();

// 2) Persist simple language preference when tapping EN
(function(){
  var link = document.getElementById('langLink');
  if(!link) return;
  link.addEventListener('click', function(){
    try{ localStorage.setItem('notal_lang', 'en'); }catch(_){ }
  });
})();

// 3) (Optional) Smooth details animation for FAQ — safe if elements absent
(function(){
  var details = document.querySelectorAll('section#faq details');
  if(!details || !details.length) return;
  details.forEach(function(det){
    det.addEventListener('toggle', function(){
      // Let the browser handle it; keep minimal to avoid layout jank
    });
  });
})();
