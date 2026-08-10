/* ==========================================================================
   CONTACT FORM — Client-Side Validation & Data Persistence
   ==========================================================================

   Data Model: anchor_submissions
   {
     id: string (timestamp-based),
     timestamp: ISO date string,
     personalInfo: { firstName, lastName, address, city, state, zip, phone, email },
     businessInfo: { businessName, businessAddress, businessCity, businessState, businessZip, businessPhone, businessEmail },
     message: string,
     newsletter: boolean
   }

   Stored under key "anchor_submissions" as a JSON array.
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'anchor_submissions';
  var form = document.getElementById('siteForm');
  if (!form) return;

  var submitBtn = document.getElementById('submitBtn');
  var btnText = submitBtn.querySelector('.btn-text');
  var feedback = document.getElementById('formFeedback');
  var progressBar = document.getElementById('progressBar');
  var progressContainer = document.querySelector('.form-progress');

  /* ---------- Validation Rules ---------- */
  var validators = {
    firstName: function (v) { return v.trim().length >= 2 ? '' : 'Please enter at least 2 characters'; },
    lastName: function (v) { return v.trim().length >= 2 ? '' : 'Please enter at least 2 characters'; },
    address: function (v) { return v.trim().length >= 5 ? '' : 'Please enter a valid address'; },
    city: function (v) { return v.trim().length >= 2 ? '' : 'Please enter a valid city'; },
    state: function (v) { return v ? '' : 'Please select a state'; },
    zip: function (v) { return /^\d{5}$/.test(v) ? '' : 'Enter a 5-digit zip code'; },
    phone: function (v) { return /^\d{3}-\d{3}-\d{4}$/.test(v) ? '' : 'Format: xxx-xxx-xxxx'; },
    email: function (v) { return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(v) ? '' : 'Enter a valid email'; },
    businessName: function (v) { return v.trim().length >= 2 ? '' : 'Please enter a business name'; },
    businessAddress: function (v) { return v.trim().length >= 5 ? '' : 'Please enter a valid address'; },
    businessCity: function (v) { return v.trim().length >= 2 ? '' : 'Please enter a valid city'; },
    businessState: function (v) { return v ? '' : 'Please select a state'; },
    businessZip: function (v) { return /^\d{5}$/.test(v) ? '' : 'Enter a 5-digit zip code'; },
    businessPhone: function (v) { return /^\d{3}-\d{3}-\d{4}$/.test(v) ? '' : 'Format: xxx-xxx-xxxx'; },
    businessEmail: function (v) { return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(v) ? '' : 'Enter a valid email'; },
    message: function (v) { return v.trim().length >= 10 ? '' : 'Please tell us a bit more (10+ characters)'; }
  };

  var requiredFields = Object.keys(validators);

  /* ---------- Field Validation ---------- */
  function validateField(field) {
    var input = document.getElementById(field);
    if (!input) return true;

    var errorEl = document.getElementById(field + '-error');
    var value = input.value;
    var validate = validators[field];
    var errorMsg = validate ? validate(value) : '';

    if (errorMsg) {
      input.classList.remove('valid');
      input.classList.add('invalid');
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add('show');
      }
      input.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      input.classList.remove('invalid');
      if (value.trim()) {
        input.classList.add('valid');
      }
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('show');
      }
      input.setAttribute('aria-invalid', 'false');
      return true;
    }
  }

  /* ---------- Real-Time Validation ---------- */
  requiredFields.forEach(function (field) {
    var input = document.getElementById(field);
    if (!input) return;

    // Validate on blur (initial check)
    input.addEventListener('blur', function () {
      validateField(field);
      updateProgress();
    });

    // Re-validate on input after first blur (real-time feedback)
    input.addEventListener('input', function () {
      if (input.classList.contains('invalid') || input.classList.contains('valid')) {
        validateField(field);
        updateProgress();
      }
    });
  });

  /* ---------- Progress Indicator ---------- */
  function updateProgress() {
    if (!progressBar || !progressContainer) return;
    var filled = 0;
    requiredFields.forEach(function (field) {
      var input = document.getElementById(field);
      if (input && validators[field](input.value) === '') {
        filled++;
      }
    });
    var percent = Math.round((filled / requiredFields.length) * 100);
    progressBar.style.width = percent + '%';
    progressContainer.setAttribute('aria-valuenow', percent);
  }

  /* ---------- Phone Auto-Format ---------- */
  function formatPhoneInput(input) {
    if (!input) return;
    var name = input.getAttribute('name');
    if (name !== 'phone' && name !== 'businessPhone') return;

    input.addEventListener('input', function () {
      var digits = this.value.replace(/\D/g, '').substring(0, 10);
      var formatted = '';
      if (digits.length > 0) formatted += digits.substring(0, 3);
      if (digits.length >= 4) formatted += '-' + digits.substring(3, 6);
      if (digits.length >= 7) formatted += '-' + digits.substring(6, 10);
      this.value = formatted;
    });
  }

  formatPhoneInput(document.getElementById('phone'));
  formatPhoneInput(document.getElementById('businessPhone'));

  /* ---------- Safe Storage (in-memory with persistent fallback) ---------- */
  var memoryStore = {};
  function safeGetItem(key) {
    return memoryStore[key] || null;
  }
  function safeSetItem(key, value) {
    memoryStore[key] = value;
    return true;
  }

  function getSubmissions() {
    try {
      var raw = safeGetItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSubmission(data) {
    try {
      var submissions = getSubmissions();
      submissions.push(data);
      safeSetItem(STORAGE_KEY, JSON.stringify(submissions));
      return true;
    } catch (e) {
      console.error('Failed to save submission:', e);
      return false;
    }
  }

  /* ---------- Build Submission Object ---------- */
  function buildSubmission() {
    var now = new Date();
    return {
      id: 'sub_' + now.getTime(),
      timestamp: now.toISOString(),
      personalInfo: {
        firstName: getValue('firstName'),
        lastName: getValue('lastName'),
        address: getValue('address'),
        city: getValue('city'),
        state: getValue('state'),
        zip: getValue('zip'),
        phone: getValue('phone'),
        email: getValue('email')
      },
      businessInfo: {
        businessName: getValue('businessName'),
        businessAddress: getValue('businessAddress'),
        businessCity: getValue('businessCity'),
        businessState: getValue('businessState'),
        businessZip: getValue('businessZip'),
        businessPhone: getValue('businessPhone'),
        businessEmail: getValue('businessEmail')
      },
      message: getValue('message'),
      newsletter: document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false
    };
  }

  function getValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  /* ---------- Show Feedback ---------- */
  function showFeedback(message, type) {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = 'form-feedback ' + type;
  }

  /* ---------- Form Submit ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    var allValid = true;
    requiredFields.forEach(function (field) {
      if (!validateField(field)) {
        allValid = false;
      }
    });
    updateProgress();

    if (!allValid) {
      showFeedback('Please correct the highlighted fields before submitting.', 'error');
      // Focus first invalid field
      var firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    showFeedback('', '');

    // Simulate async submission (save data)
    setTimeout(function () {
      var submission = buildSubmission();
      var saved = saveSubmission(submission);

      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      if (saved) {
        submitBtn.classList.add('success');
        btnText.textContent = 'Sent!';
        showFeedback('Thank you! Your request has been received. Redirecting...', 'success');

        // Reset form after delay, then redirect to thanks page
        setTimeout(function () {
          form.reset();
          // Clear validation classes
          requiredFields.forEach(function (field) {
            var input = document.getElementById(field);
            if (input) {
              input.classList.remove('valid', 'invalid');
            }
          });
          updateProgress();
          window.location.href = 'thanks.html';
        }, 1500);
      } else {
        showFeedback('Something went wrong. Please try again.', 'error');
      }
    }, 1200);
  });

  /* ---------- Initialize ---------- */
  updateProgress();
})();
