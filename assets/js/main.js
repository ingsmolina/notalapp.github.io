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