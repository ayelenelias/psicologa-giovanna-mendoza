/**
 * App.js - Interactivity & UX Logic
 * Psicóloga Giovanna Mendoza - M.P. 4777
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initBreathingWidget();
  initQuickWhatsAppLauncher();
  initModalBackdropDismiss();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !header) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    header.classList.toggle('mobile-menu-active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('mobile-menu-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   2. NATIVE <dialog> MODAL HANDLING
   ========================================================================== */
const bookingDialog = document.getElementById('bookingDialog');

function openBookingModal() {
  if (bookingDialog && typeof bookingDialog.showModal === 'function') {
    bookingDialog.showModal();
  } else {
    // Fallback if dialog not supported
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function closeBookingModal() {
  if (bookingDialog && typeof bookingDialog.close === 'function') {
    bookingDialog.close();
  }
}

// Light dismiss: Close dialog when clicking outside the dialog content
function initModalBackdropDismiss() {
  if (!bookingDialog) return;

  bookingDialog.addEventListener('click', (event) => {
    const rect = bookingDialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeBookingModal();
    }
  });
}

/* ==========================================================================
   3. FAQ ACCORDION (Interactive & Accessible)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items (mutually exclusive)
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   4. MINDFUL BREATHING WIDGET (Pausa Consciente 4-4-4)
   ========================================================================== */
function initBreathingWidget() {
  const circle = document.getElementById('breathingCircle');
  const label = document.getElementById('breathingLabel');
  const instruction = document.getElementById('breathingInstruction');
  
  if (!circle || !label || !instruction) return;

  const states = [
    { label: 'Inhala', instruction: 'Inhalá suave y profundo por la nariz...', className: 'inhale', duration: 4000 },
    { label: 'Mantené', instruction: 'Mantené el aire sin forzar...', className: 'hold', duration: 4000 },
    { label: 'Exhala', instruction: 'Exhalá lentamente soltando toda la tensión...', className: 'exhale', duration: 4000 }
  ];

  let currentIndex = 0;

  function runCycle() {
    const currentState = states[currentIndex];
    
    // Update labels and classes
    label.textContent = currentState.label;
    instruction.textContent = currentState.instruction;
    
    circle.className = 'breathing-circle ' + currentState.className;

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % states.length;
      runCycle();
    }, currentState.duration);
  }

  // Start the calming breathing loop
  runCycle();
}

/* ==========================================================================
   5. QUICK WHATSAPP MESSAGE LAUNCHER (100% WhatsApp, sin formularios)
   ========================================================================== */
function initQuickWhatsAppLauncher() {
  const btn = document.getElementById('openWhatsAppBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const nameInput = document.getElementById('quickName');
    const reasonSelect = document.getElementById('quickReason');

    const name = nameInput ? nameInput.value.trim() : '';
    const reason = reasonSelect ? reasonSelect.value : 'agendar una primera sesión';

    let messageText = 'Hola Lic. Giovanna, vi tu página web y me gustaría ' + reason + '.';
    if (name) {
      messageText += ' Mi nombre es ' + name + '.';
    }

    showToast('¡Abriendo WhatsApp para comunicarte con Giovanna!');

    setTimeout(() => {
      const waUrl = 'https://wa.me/5493814590619?text=' + encodeURIComponent(messageText);
      window.open(waUrl, '_blank');
    }, 600);
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
