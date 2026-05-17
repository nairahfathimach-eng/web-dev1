/*Scroll effect*/
const header = document.getElementById('header');

if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/*Toggle*/
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');

  if (menu) {
    menu.classList.toggle('open');
  }
}

document.querySelectorAll('.mobile-menu a').forEach(function (link) {
  link.addEventListener('click', function () {
    const menu = document.getElementById('mobileMenu');

    if (menu) {
      menu.classList.remove('open');
    }
  });
});

document.addEventListener('click', function (event) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');

  if (menu && hamburger) {
    if (
      !menu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      menu.classList.remove('open');
    }
  }
});

/*Login*/
function openModal() {
  const overlay = document.getElementById('modalOverlay');

  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');

  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModalOutside(event) {
  const overlay = document.getElementById('modalOverlay');

  if (overlay && event.target === overlay) {
    closeModal();
  }
}

function switchTab(tab, clickedTabEl) {

  document.querySelectorAll('.modal-tab').forEach(function (t) {
    t.classList.remove('active');
  });

  clickedTabEl.classList.add('active');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const modalTitle = document.getElementById('modalTitle');

  if (tab === 'login') {

    if (loginForm) {
      loginForm.style.display = 'block';
    }

    if (registerForm) {
      registerForm.style.display = 'none';
    }

    if (modalTitle) {
      modalTitle.textContent = 'Welcome Back';
    }

  } else {

    if (loginForm) {
      loginForm.style.display = 'none';
    }

    if (registerForm) {
      registerForm.style.display = 'block';
    }

    if (modalTitle) {
      modalTitle.textContent = 'Create Account';
    }
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

/*Image slider*/
let currentSlide = 0;

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');

function goToSlide(n) {

  if (slides.length === 0) return;

  slides[currentSlide].classList.remove('active');

  if (dots[currentSlide]) {
    dots[currentSlide].classList.remove('active');
  }

  currentSlide = n;

  slides[currentSlide].classList.add('active');

  if (dots[currentSlide]) {
    dots[currentSlide].classList.add('active');
  }
}

if (slides.length > 0) {

  setInterval(function () {
    goToSlide((currentSlide + 1) % slides.length);
  }, 5000);

  let touchStartX = 0;
  let touchEndX = 0;

  const heroSection = document.querySelector('.hero');

  if (heroSection) {

    heroSection.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    heroSection.addEventListener('touchend', function (e) {

      touchEndX = e.changedTouches[0].screenX;

      const dist = touchStartX - touchEndX;

      if (dist > 50) {
        goToSlide((currentSlide + 1) % slides.length);
      }

      if (dist < -50) {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
      }
    });
  }
}
const brandsSwiperEl = document.querySelector('.brands-swiper');

if (brandsSwiperEl) {

  new Swiper('.brands-swiper', {

    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,

    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },

    breakpoints: {

      640: {
        slidesPerView: 4
      },

      1024: {
        slidesPerView: 6
      },
    },
  });
}
/*Booking search*/
document.addEventListener('DOMContentLoaded', function () {

  const btnBook = document.querySelector('.btn-book');

  if (btnBook) {

    btnBook.addEventListener('click', function () {

      const allSelects = document.querySelectorAll('.book-field select');
      const allInputs = document.querySelectorAll('.book-field input');

      const destination = allSelects[0];
      const checkIn = allInputs[0];
      const checkOut = allInputs[1];
      const guests = allSelects[1];

      clearErrors();

      let hasError = false;

      if (!destination || destination.value === 'Select Destination') {

        showError(destination, 'Please select a destination');
        hasError = true;
      }
      if (!checkIn || checkIn.value === '') {

        showError(checkIn, 'Please select a check-in date');
        hasError = true;
      }
      if (!checkOut || checkOut.value === '') {

        showError(checkOut, 'Please select a check-out date');
        hasError = true;
      }
      if (
        checkIn &&
        checkOut &&
        checkIn.value &&
        checkOut.value
      ) {

        if (new Date(checkOut.value) <= new Date(checkIn.value)) {

          showError(
            checkOut,
            'Check-out must be after check-in'
          );

          hasError = true;
        }
      }
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (
        checkIn &&
        checkIn.value &&
        new Date(checkIn.value) < today
      ) {

        showError(
          checkIn,
          'Check-in cannot be in the past'
        );

        hasError = true;
      }
      if (!hasError) {

        showSuccess(
          destination.value,
          checkIn.value,
          checkOut.value,
          guests ? guests.value : '1 Person'
        );
      }
    });
  }
  function showError(field, message) {

    if (!field) return;

    field.style.borderColor = '#E24B4A';
    field.style.background = 'rgba(226,75,74,0.12)';

    const err = document.createElement('div');

    err.className = 'booking-error';
    err.textContent = '⚠ ' + message;

    field.parentNode.appendChild(err);

    field.addEventListener('change', function () {

      field.style.borderColor = '';
      field.style.background = '';

      const e = field.parentNode.querySelector('.booking-error');

      if (e) {
        e.remove();
      }

    }, { once: true });
  }
  function clearErrors() {

    document.querySelectorAll('.booking-error').forEach(function (e) {
      e.remove();
    });

    document.querySelectorAll(
      '.book-field select, .book-field input'
    ).forEach(function (f) {

      f.style.borderColor = '';
      f.style.background = '';
    });
  }
  function formatDate(dateStr) {

    const d = new Date(dateStr);

    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  function showSuccess(destination, checkIn, checkOut, guests) {

    const nights = Math.round(
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24)
    );

    const old = document.getElementById('searchPopup');

    if (old) {
      old.remove();
    }

    const popup = document.createElement('div');

    popup.id = 'searchPopup';
    popup.classList.add('search-popup');

    popup.innerHTML = `
      <div id="searchPopupInner" class="search-popup-inner">

        <button 
          id="closePopup" 
          class="close-popup-x"
          aria-label="Close popup"
        >
          ×
        </button>

        <h3 class="popup-title">
          Your Search is Ready!
        </h3>

        <p class="popup-subtitle">
          Here is your trip summary
        </p>

        <div class="popup-row">
          <span class="popup-label">Destination</span>
          <span class="popup-value">${destination}</span>
        </div>

        <div class="popup-row">
          <span class="popup-label">Check In</span>
          <span class="popup-value">${formatDate(checkIn)}</span>
        </div>

        <div class="popup-row">
          <span class="popup-label">Check Out</span>
          <span class="popup-value">${formatDate(checkOut)}</span>
        </div>

        <div class="popup-row">
          <span class="popup-label">Duration</span>
          <span class="popup-value">
            ${nights} night${nights !== 1 ? 's' : ''}
          </span>
        </div>

        <div class="popup-row popup-row-last">
          <span class="popup-label">Guests</span>
          <span class="popup-value">${guests}</span>
        </div>

        <a href="package.html" id="popupBtn" class="popup-btn">
          Browse Packages →
        </a>

        <button 
          id="closePopupBtn"
          class="close-popup-btn"
        >
          Close
        </button>

      </div>
    `;

    document.body.appendChild(popup);

    const btn = document.getElementById('popupBtn');

    btn.addEventListener('mouseover', function () {
      btn.style.transform = 'scale(1.03)';
    });

    btn.addEventListener('mouseout', function () {
      btn.style.transform = 'scale(1)';
    });
    const closeBtn2 = document.getElementById('closePopupBtn');

    closeBtn2.addEventListener('click', function () {
      popup.remove();
    });
    const closeX = document.getElementById('closePopup');

    closeX.addEventListener('click', function () {
      popup.remove();
    });
    popup.addEventListener('click', function (e) {

      if (e.target === popup) {
        popup.remove();
      }
    });
  }

});
/*Login*/
window.addEventListener('load', function () {
  const user = localStorage.getItem('holidae_user');
  if (user) {
    const userData = JSON.parse(user);
    updateNavbarLoggedIn(userData.name);
  }
});

function openModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    clearModalErrors();
  }
}
function closeModalOutside(event) {
  const overlay = document.getElementById('modalOverlay');
  if (overlay && event.target === overlay) {
    closeModal();
  }
}
function switchTab(tab, clickedTabEl) {
  document.querySelectorAll('.modal-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  clickedTabEl.classList.add('active');
  clearModalErrors();

  const loginForm    = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const modalTitle   = document.getElementById('modalTitle');

  if (tab === 'login') {
    if (loginForm)    loginForm.style.display    = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (modalTitle)   modalTitle.textContent     = 'Welcome Back';
  } else {
    if (loginForm)    loginForm.style.display    = 'none';
    if (registerForm) registerForm.style.display = 'block';
    if (modalTitle)   modalTitle.textContent     = 'Create Account';
  }
}
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeModal();
});
document.addEventListener('DOMContentLoaded', function () {

  /* ---- LOGIN BUTTON ---- */
  const loginBtn = document.querySelector('#loginForm .btn-submit');

  if (loginBtn) {
    loginBtn.addEventListener('click', function () {

      const email    = document.querySelector('#loginForm input[type="email"]');
      const password = document.querySelector('#loginForm input[type="password"]');

      clearModalErrors();
      let hasError = false;

      
      if (!email.value.trim()) {
        showModalError(email, 'Please enter your email');
        hasError = true;
      }

      if (!password.value.trim()) {
        showModalError(password, 'Please enter a password');
        hasError = true;
      }

      if (!hasError) {
        const namePart = email.value.split('@')[0];
        const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        localStorage.setItem('holidae_user', JSON.stringify({
          name:  name,
          email: email.value.trim()
        }));
        showModalSuccess('Welcome, ' + name + '! ');
        setTimeout(function () {
          closeModal();
          updateNavbarLoggedIn(name);
        }, 1000);
      }
    });
  }

  /*Register button*/
  const registerBtn = document.querySelector('#registerForm .btn-submit');

  if (registerBtn) {
    registerBtn.addEventListener('click', function () {

      const name     = document.querySelector('#registerForm input[type="text"]');
      const email    = document.querySelector('#registerForm input[type="email"]');
      const password = document.querySelectorAll('#registerForm input[type="password"]')[0];
      const confirm  = document.querySelectorAll('#registerForm input[type="password"]')[1];

      clearModalErrors();
      let hasError = false;
      if (!name.value.trim()) {
        showModalError(name, 'Please enter your name');
        hasError = true;
      }

      if (!email.value.trim()) {
        showModalError(email, 'Please enter your email');
        hasError = true;
      }

      if (!password.value.trim()) {
        showModalError(password, 'Please enter a password');
        hasError = true;
      }

      if (!confirm.value.trim()) {
        showModalError(confirm, 'Please confirm your password');
        hasError = true;
      }
      if (password.value && confirm.value) {
        if (password.value !== confirm.value) {
          showModalError(confirm, 'Passwords do not match');
          hasError = true;
        }
      }

      if (!hasError) {
        const userName = name.value.trim();

        localStorage.setItem('holidae_user', JSON.stringify({
          name:  userName,
          email: email.value.trim()
        }));
        showModalSuccess('Account created! Welcome, ' + userName + '!');
        setTimeout(function () {
          closeModal();
          updateNavbarLoggedIn(userName);
        }, 1000);
      }
    });
  }

});

/*Update navbar after login*/
function updateNavbarLoggedIn(name) {
  const loginBtn = document.querySelector('.btn-login');

  if (loginBtn) {
    loginBtn.outerHTML = `
      <div class="user-nav" id="userNav">
        <span class="user-greeting">${name}</span>
        <button class="btn-logout" onclick="logoutUser()">Logout</button>
      </div>
    `;
  }
}

/*Log out*/
function logoutUser() {
  localStorage.removeItem('holidae_user');

  const userNav = document.getElementById('userNav');
  if (userNav) {
    userNav.outerHTML = `
      <button class="btn-login" onclick="openModal()">
        Login / Register
      </button>
    `;
  }
}

/*Helpers*/
function showModalError(field, message) {
  if (!field) return;
  field.style.borderColor = '#E24B4A';

  const err = document.createElement('div');
  err.className   = 'modal-field-error';
  err.textContent = '⚠ ' + message;
  err.style.cssText = `
    color: #E24B4A;
    font-size: 0.75rem;
    margin-top: -8px;
    margin-bottom: 8px;
    font-family: 'Poppins', sans-serif;
  `;
  field.parentNode.insertBefore(err, field.nextSibling);

  field.addEventListener('input', function () {
    field.style.borderColor = '';
    const e = field.parentNode.querySelector('.modal-field-error');
    if (e) e.remove();
  }, { once: true });
}

function showModalSuccess(message) {
  clearModalErrors();
  const modal = document.querySelector('.modal');
  if (!modal) return;

  const existing = modal.querySelector('.modal-success');
  if (existing) existing.remove();

  const msg = document.createElement('div');
  msg.className   = 'modal-success';
  msg.textContent = '' + message;
  msg.style.cssText = `
    background: #f0fff6;
    color: #27500A;
    border: 1px solid #C0EDD4;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
    font-family: 'Poppins', sans-serif;
    text-align: center;
  `;

  const tabs = modal.querySelector('.modal-tabs');
  if (tabs) tabs.after(msg);
}

function clearModalErrors() {
  document.querySelectorAll('.modal-field-error').forEach(function (e) {
    e.remove();
  });
  document.querySelectorAll('.modal-success').forEach(function (e) {
    e.remove();
  });
  document.querySelectorAll('.modal input').forEach(function (f) {
    f.style.borderColor = '';
  });
}