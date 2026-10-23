/**
 * ELEVRA GLOBAL EXPORTS — Client Interaction Script
 * Features:
 *  - Sticky Header scroll styling
 *  - Responsive mobile navigation with escape and click-outside closure
 *  - Accessible Product Specification & Legal Modals with focus trapping
 *  - Pre-selected Product Quotation flow
 *  - Accessible FAQ Accordion
 *  - In-browser Quotation Validation & Summary Generator (No server dependency)
 *  - Clipboard copy with reliable fallback & optional mailto draft
 *  - Dynamic copyright year
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. SPECIFICATION DATA FOR PRODUCTS & LEGAL POLICIES
     ------------------------------------------------------------------------ */
  const PRODUCT_SPECS = {
    turmeric: {
      title: 'Turmeric (Curcuma longa)',
      overview: 'Sourced from principal turmeric belts in India. Available in whole fingers, bulbs, and milled powder suited for food processors, seasoning blenders, and botanical extractors.',
      parameters: [
        'Curcumin Profile: Typically evaluated between 2.0% and 5.0% depending on origin and lot',
        'Moisture Content: Generally targeted below 10%–12% for dried rhizomes',
        'Extraneous Matter: Cleaned to buyer thresholds; Sortex or hand-picked options',
        'Physical Form: Polished (single/double polished) or unpolished fingers, split bulbs, powder (mesh 60–100)'
      ],
      packaging: 'Supplied in 25 kg / 50 kg PP woven bags, multi-ply craft paper bags, or food-grade poly-lined sacks.',
      disclaimer: 'Parameters above are illustrative of typical commercial dialogues. Confirmed specifications, laboratory parameters, and crop availability are established per individual inquiry.'
    },
    cumin: {
      title: 'Cumin Seeds (Cuminum cyminum)',
      overview: 'Distinctively aromatic Indian cumin seeds suitable for wholesale distribution, ground spice formulations, and oleoresin distillation.',
      parameters: [
        'Purity Standard: Machine-cleaned (98%–99%) or Sortex-cleaned (up to 99.5% purity)',
        'Moisture Content: Typically targeted under 9.0%',
        'Volatile Oil: Discussed per lot, commonly 1.5% to 3.0% v/w',
        'Total Ash / Acid-Insoluble Ash: Aligned per destination market requirements'
      ],
      packaging: 'Packed in 25 kg or 50 kg PP bags, paper sacks, or bulk tote bags upon arrangement.',
      disclaimer: 'Final grade characteristics, purity certificates, and test sheets are confirmed upon commercial contracting.'
    },
    coriander: {
      title: 'Coriander Seeds (Coriandrum sativum)',
      overview: 'Golden-green to light-brown whole coriander seeds and split coriander (dal) valued for sweet, citrus-tinged notes in curry powders and seasoning mixtures.',
      parameters: [
        'Seed Integrity: Whole round seeds, split seeds (dal), or finely milled ground powder',
        'Colour Consistency: Grade selection considers uniform seed color and minimal darkening',
        'Moisture Content: Typically targeted below 9%–10%',
        'Extraneous Matter: Calibrated per machine-cleaned or Sortex processing tiers'
      ],
      packaging: 'Offered in 25 kg bags with protective liners to retain volatile aroma.',
      disclaimer: 'Visual seed grade, moisture, and split percentages are verified against mutually agreed sample reference lots.'
    },
    chilli: {
      title: 'Red Chilli (Capsicum annuum)',
      overview: 'A wide spectrum of Indian dried chillies spanning vibrant high-color mild varieties (e.g., Byadgi/Kashmiri types) to sharp, pungent commercial varieties (e.g., Teja/S17).',
      parameters: [
        'Pungency Range: Low heat (< 15,000 SHU) up to sharp heat (50,000–85,000+ SHU)',
        'Colour Value: 50 ASTA to 140+ ASTA depending on selected variety and processing season',
        'Stem Requirement: Available With Stem, Stemless, or Cut Stem',
        'Moisture Level: Maintained below 11% to preserve color and texture'
      ],
      packaging: 'Packed in jute bales, carton boxes, or poly-lined bags to avoid pod breakage and color degradation.',
      disclaimer: 'Pungency (SHU) and ASTA color values require lot-specific laboratory testing certificates upon contract confirmation.'
    },
    pepper: {
      title: 'Black Pepper (Piper nigrum)',
      overview: 'Recognized as the King of Spices, sourced from Malabar and Southern Indian growing regions for food ingredient manufacturers, repackers, and extraction plants.',
      parameters: [
        'Bulk Density / Test Weight: Offered in standard densities (500 g/L, 550 g/L, to 570+ g/L garbled)',
        'Moisture Content: Maintained below 12.0%',
        'Piperine Content: Typically 4.0% to 6.5% according to grade and lot',
        'Garbled Quality: Garbled (mechanically sorted and destoned) or ungarbled specifications'
      ],
      packaging: 'Packed in 25 kg or 50 kg multi-wall craft paper or laminated PP bags with inner moisture barriers.',
      disclaimer: 'Light berries percentage, pinhead allowance, and bulk density are verified per buyer specifications.'
    }
  };

  const LEGAL_CONTENT = {
    privacy: {
      title: 'Privacy Notice (Demonstration)',
      kicker: 'LEGAL & DATA HANDLING',
      html: `
        <p><strong>Portfolio Showcase Status:</strong> This website is an illustrative design created by a freelance website designer to showcase user experience, B2B architecture, and UI/UX design capabilities.</p>
        <h4>Data Collection & Storage</h4>
        <p>This demo website <strong>does not record, store, or transmit personal data</strong> to any external database or third-party web service. Any information entered into the quotation form is processed purely on client-side memory inside your web browser.</p>
        <h4>Cookies & Local Storage</h4>
        <p>No tracking cookies, marketing pixels, or surveillance scripts are deployed on this site.</p>
        <div class="modal-disclaimer-box">
          For commercial implementations, custom backend pipelines adhering to GDPR, CCPA, or regional data compliance can be incorporated as needed.
        </div>
      `
    },
    terms: {
      title: 'Terms of Demonstration Use',
      kicker: 'PORTFOLIO NOTICE',
      html: `
        <p><strong>Demonstration Purpose:</strong> "Elevra Global Exports" is a fictional entity created solely to demonstrate modern, high-conversion B2B website design for agricultural trading companies.</p>
        <h4>No Commercial Offer</h4>
        <p>The product descriptions, specifications, packaging options, and trading terms shown do not constitute legally binding commercial quotations, supply guarantees, or contracts of sale.</p>
        <h4>Intellectual Property</h4>
        <p>All design layouts, layout structures, and interface code belong to the portfolio designer for client presentation purposes. Photography is sourced under legitimate Unsplash royalty-free licenses.</p>
      `
    }
  };

  /* ------------------------------------------------------------------------
     2. DYNAMIC YEAR
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     3. STICKY HEADER SCROLL STATE
     ------------------------------------------------------------------------ */
  const header = document.getElementById('site-header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ------------------------------------------------------------------------
     4. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-wrapper a');

  const openMobileMenu = () => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    primaryNav.classList.add('is-open');
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    primaryNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on click outside header
    document.addEventListener('click', (e) => {
      if (primaryNav.classList.contains('is-open') && !header.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        closeMobileMenu();
        menuToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. ACCESSIBLE MODAL SYSTEM (SPECS & LEGAL)
     ------------------------------------------------------------------------ */
  const modal = document.getElementById('app-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalKicker = document.getElementById('modal-kicker');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalSecondaryClose = document.getElementById('modal-secondary-close');
  const modalEnquireBtn = document.getElementById('modal-enquire-btn');

  let activeProductForModal = null;
  let previouslyFocusedElement = null;

  const openModal = () => {
    if (!modal) return;
    previouslyFocusedElement = document.activeElement;
    modal.removeAttribute('hidden');
    document.body.classList.add('modal-open');
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hasAttribute('hidden')) return;
    modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
      previouslyFocusedElement = null;
    }
  };

  const showProductSpecModal = (productId) => {
    const data = PRODUCT_SPECS[productId];
    if (!data) return;

    activeProductForModal = data.title.split(' ')[0]; // E.g., 'Turmeric', 'Cumin'
    modalKicker.textContent = 'PRODUCT SPECIFICATION GUIDE';
    modalTitle.textContent = data.title;

    let paramsList = data.parameters.map((p) => `<li>${p}</li>`).join('');

    modalBody.innerHTML = `
      <h4>Overview</h4>
      <p>${data.overview}</p>
      <h4>Standard Trade Parameters</h4>
      <ul>${paramsList}</ul>
      <h4>Packaging Considerations</h4>
      <p>${data.packaging}</p>
      <div class="modal-disclaimer-box">
        <strong>Commercial Note:</strong> ${data.disclaimer}
      </div>
    `;

    modalEnquireBtn.style.display = 'inline-flex';
    modalEnquireBtn.textContent = `Enquire About ${activeProductForModal}`;
    openModal();
  };

  const showLegalModal = (legalType) => {
    const data = LEGAL_CONTENT[legalType];
    if (!data) return;

    modalKicker.textContent = data.kicker;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.html;
    modalEnquireBtn.style.display = 'none';
    openModal();
  };

  // Wire product "View Specifications" buttons
  document.querySelectorAll('.js-open-spec').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pid = e.currentTarget.getAttribute('data-product-id');
      showProductSpecModal(pid);
    });
  });

  // Wire footer product links to open specs
  document.querySelectorAll('.js-footer-product-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = e.currentTarget.getAttribute('data-product-id');
      showProductSpecModal(pid);
    });
  });

  // Wire legal buttons
  document.querySelectorAll('.js-open-legal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const type = e.currentTarget.getAttribute('data-legal-type');
      showLegalModal(type);
    });
  });

  // Modal close handlers
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalSecondaryClose) modalSecondaryClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      // Backdrop click closes
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keyboard focus trap inside modal & Escape key
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    });
  }

  // Modal CTA: Preselect and jump to quotation form
  if (modalEnquireBtn) {
    modalEnquireBtn.addEventListener('click', () => {
      closeModal();
      if (activeProductForModal) {
        selectProductAndScroll(activeProductForModal);
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. PRODUCT & PACKAGING PRE-SELECTION INTEGRATION
     ------------------------------------------------------------------------ */
  const productSelect = document.getElementById('productSelect');
  const packagingSelect = document.getElementById('packagingSelect');
  const contextBanner = document.getElementById('form-context-banner');
  const contextText = document.getElementById('form-context-text');
  const clearContextBtn = document.getElementById('clear-context-btn');
  const contactSection = document.getElementById('contact');

  const showContextNotice = (msg) => {
    if (!contextBanner || !contextText) return;
    contextText.textContent = msg;
    contextBanner.removeAttribute('hidden');
  };

  const hideContextNotice = () => {
    if (contextBanner) contextBanner.setAttribute('hidden', '');
  };

  if (clearContextBtn) {
    clearContextBtn.addEventListener('click', hideContextNotice);
  }

  const selectProductAndScroll = (productName) => {
    if (productSelect) {
      // Match option value
      for (let i = 0; i < productSelect.options.length; i++) {
        if (productSelect.options[i].value.toLowerCase().includes(productName.toLowerCase())) {
          productSelect.selectedIndex = i;
          break;
        }
      }
      showContextNotice(`Selected "${productName}" from your enquiry click.`);
    }
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Focus product select
      setTimeout(() => {
        if (productSelect) productSelect.focus();
      }, 500);
    }
  };

  const selectPackagingAndScroll = (packagingType) => {
    if (packagingSelect) {
      packagingSelect.value = packagingType;
      showContextNotice(`Packaging preference set to "${packagingType}".`);
    }
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (packagingSelect) packagingSelect.focus();
      }, 500);
    }
  };

  // Wire product catalog enquiry buttons
  document.querySelectorAll('.js-enquire-product').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pName = e.currentTarget.getAttribute('data-product-name');
      selectProductAndScroll(pName);
    });
  });

  // Wire packaging enquiry buttons
  document.querySelectorAll('.js-enquire-packaging').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pkgVal = e.currentTarget.getAttribute('data-packaging-value');
      selectPackagingAndScroll(pkgVal);
    });
  });

  /* ------------------------------------------------------------------------
     7. ACCESSIBLE FAQ ACCORDION
     ------------------------------------------------------------------------ */
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      if (!panel) return;

      // Close all panels in accordion
      faqTriggers.forEach((otherTrigger) => {
        otherTrigger.setAttribute('aria-expanded', 'false');
        const otherPanelId = otherTrigger.getAttribute('aria-controls');
        const otherPanel = document.getElementById(otherPanelId);
        if (otherPanel) {
          otherPanel.setAttribute('hidden', '');
        }
      });

      // If clicked wasn't already expanded, open it
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });

    // Keyboard Arrow navigation for FAQ
    trigger.addEventListener('keydown', (e) => {
      const triggersArray = Array.from(faqTriggers);
      const index = triggersArray.indexOf(trigger);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = triggersArray[(index + 1) % triggersArray.length];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = triggersArray[(index - 1 + triggersArray.length) % triggersArray.length];
        prev.focus();
      }
    });
  });

  /* ------------------------------------------------------------------------
     8. B2B QUOTATION FORM VALIDATION & SUMMARY GENERATOR
     ------------------------------------------------------------------------ */
  const quoteForm = document.getElementById('quotation-form');
  const resultPanel = document.getElementById('inquiry-result-panel');
  const summaryTextarea = document.getElementById('generated-summary-text');
  const copyBtn = document.getElementById('copy-summary-btn');
  const mailtoLink = document.getElementById('mailto-fallback-link');
  const editInquiryBtn = document.getElementById('edit-inquiry-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  const fields = {
    fullName: {
      input: document.getElementById('fullName'),
      error: document.getElementById('fullName-error'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Please enter your full name.')
    },
    companyName: {
      input: document.getElementById('companyName'),
      error: document.getElementById('companyName-error'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Company name is required for B2B inquiries.')
    },
    businessEmail: {
      input: document.getElementById('businessEmail'),
      error: document.getElementById('businessEmail-error'),
      validate: (v) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!v.trim()) return 'Business email is required.';
        if (!re.test(v.trim())) return 'Please provide a valid corporate email format.';
        return '';
      }
    },
    destinationCountry: {
      input: document.getElementById('destinationCountry'),
      error: document.getElementById('destinationCountry-error'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Destination country is required for trade feasibility.')
    },
    productSelect: {
      input: document.getElementById('productSelect'),
      error: document.getElementById('productSelect-error'),
      validate: (v) => (v.trim() ? '' : 'Please select an intended product from our portfolio.')
    },
    estimatedQuantity: {
      input: document.getElementById('estimatedQuantity'),
      error: document.getElementById('estimatedQuantity-error'),
      validate: (v) => (v.trim().length >= 1 ? '' : 'Please specify an estimated volume (e.g., 5 MT, 1 x 20ft FCL).')
    },
    privacyConsent: {
      input: document.getElementById('privacyConsent'),
      error: document.getElementById('privacyConsent-error'),
      validate: (v, el) => (el.checked ? '' : 'Please acknowledge the portfolio demonstration notice.')
    }
  };

  // Realtime clear on input
  Object.keys(fields).forEach((key) => {
    const item = fields[key];
    if (item.input) {
      item.input.addEventListener('input', () => {
        if (item.input.classList.contains('has-error')) {
          item.input.classList.remove('has-error');
          if (item.error) item.error.textContent = '';
        }
      });
      if (item.input.type === 'checkbox') {
        item.input.addEventListener('change', () => {
          if (item.error) item.error.textContent = '';
        });
      }
    }
  });

  const validateWholeForm = () => {
    let isValid = true;
    let firstErrorElement = null;

    Object.keys(fields).forEach((key) => {
      const field = fields[key];
      if (!field.input) return;

      const errorMessage = field.validate(field.input.value, field.input);
      if (errorMessage) {
        isValid = false;
        field.input.classList.add('has-error');
        if (field.error) field.error.textContent = errorMessage;
        if (!firstErrorElement) firstErrorElement = field.input;
      } else {
        field.input.classList.remove('has-error');
        if (field.error) field.error.textContent = '';
      }
    });

    if (firstErrorElement) {
      firstErrorElement.focus();
    }
    return isValid;
  };

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateWholeForm()) {
        return;
      }

      // Collect form values
      const formData = {
        name: fields.fullName.input.value.trim(),
        company: fields.companyName.input.value.trim(),
        email: fields.businessEmail.input.value.trim(),
        phone: document.getElementById('phoneWhatsapp')?.value.trim() || 'Not specified',
        country: fields.destinationCountry.input.value.trim(),
        product: fields.productSelect.input.value,
        quantity: fields.estimatedQuantity.input.value.trim(),
        packaging: document.getElementById('packagingSelect')?.value || 'To be discussed',
        notes: document.getElementById('additionalRequirements')?.value.trim() || 'No additional requirements noted.',
        timestamp: new Date().toUTCString()
      };

      // Construct formatted summary text
      const summaryText = [
        '======================================================',
        'B2B INQUIRY SPECIFICATION SUMMARY',
        'Demonstration Brand: Elevra Global Exports',
        `Generated: ${formData.timestamp}`,
        '======================================================',
        '',
        '[BUYER PROFILE]',
        `Contact Name        : ${formData.name}`,
        `Company Organization: ${formData.company}`,
        `Business Email      : ${formData.email}`,
        `Phone / WhatsApp    : ${formData.phone}`,
        `Destination Country : ${formData.country}`,
        '',
        '[COMMODITY REQUIREMENTS]',
        `Product Requested   : ${formData.product}`,
        `Estimated Volume    : ${formData.quantity}`,
        `Packaging Format    : ${formData.packaging}`,
        '',
        '[TARGET SPECIFICATIONS & NOTES]',
        formData.notes,
        '',
        '------------------------------------------------------',
        'Notice: This inquiry was generated inside a portfolio demo.',
        'No data was transmitted over the network.',
        '======================================================'
      ].join('\n');

      if (summaryTextarea) {
        summaryTextarea.value = summaryText;
      }

      // Configure fallback mailto link
      if (mailtoLink) {
        const mailSubject = encodeURIComponent(`B2B Spice Inquiry: ${formData.product} - ${formData.company}`);
        const mailBody = encodeURIComponent(summaryText);
        mailtoLink.href = `mailto:demo-inquiries@elevra-exports.example?subject=${mailSubject}&body=${mailBody}`;
      }

      // Toggle UI Panels
      quoteForm.style.display = 'none';
      if (resultPanel) {
        resultPanel.removeAttribute('hidden');
        resultPanel.scrollIntoView({ behavior: 'smooth' });
      }
      if (copyFeedback) copyFeedback.textContent = '';
    });
  }

  // Modify Details button: returns back to form without erasing inputs
  if (editInquiryBtn) {
    editInquiryBtn.addEventListener('click', () => {
      if (resultPanel) resultPanel.setAttribute('hidden', '');
      if (quoteForm) {
        quoteForm.style.display = 'block';
        quoteForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Clipboard copy handler with robust fallback
  if (copyBtn && summaryTextarea) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = summaryTextarea.value;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(
          () => {
            showCopySuccess();
          },
          () => {
            fallbackCopy(textToCopy);
          }
        );
      } else {
        fallbackCopy(textToCopy);
      }
    });
  }

  const fallbackCopy = (text) => {
    try {
      summaryTextarea.focus();
      summaryTextarea.select();
      const successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess();
      } else {
        showCopyError();
      }
    } catch (err) {
      showCopyError();
    }
  };

  const showCopySuccess = () => {
    if (!copyFeedback) return;
    copyFeedback.style.color = 'var(--color-primary)';
    copyFeedback.textContent = '✓ Summary copied to clipboard successfully.';
    setTimeout(() => {
      if (copyFeedback) copyFeedback.textContent = '';
    }, 4000);
  };

  const showCopyError = () => {
    if (!copyFeedback) return;
    copyFeedback.style.color = 'var(--color-error)';
    copyFeedback.textContent = 'Please press Ctrl+C / Cmd+C inside the text box to copy.';
  };
});
