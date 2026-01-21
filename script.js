'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });







// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });

}


// Notification Toast Variables
const toast = document.querySelector("[data-toast]");
const toastCloseBtn = document.querySelector("[data-toast-close]");

// Check if elements exist before adding event listeners
if (toast && toastCloseBtn) {
  // Function to close toast
  const closeToast = function () {
    toast.classList.remove("active");
  }

  // Add event listener to close button
  toastCloseBtn.addEventListener("click", closeToast);

  // Form Submission Handling
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(form);

      // Disable button to prevent multiple submissions
      if (formBtn) {
        formBtn.setAttribute("disabled", "");
        formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
      }

      // Google Apps Script URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwqfGSm4XSKzcWXchSUVeaJgKZjhwcjNoloCtDqnH_e2tG7J9hOJxoPo77ngLGgp6K3xw/exec';

      fetch(scriptURL, {
        method: 'POST',
        body: formData
      })
        .then(response => {
          // Reset Form
          form.reset();
          if (formBtn) {
            formBtn.removeAttribute("disabled");
            formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
          }

          // Show Toast
          if (toast) {
            toast.classList.add("active");
            setTimeout(closeToast, 4000);
          }
        })
        .catch(error => {
          console.error('Error!', error.message);
          if (formBtn) {
            formBtn.removeAttribute("disabled");
            formBtn.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon><span>Error!</span>';
          }
        });

    });
  }
}
// Disable Right Click
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};

// Console Branding
console.clear();
console.log(
  '%c This site is managed by Anindya Hazra',
  'color: #ffdb70; font-size: 20px; font-weight: bold; background: #2b2b2c; padding: 10px; border-radius: 5px;'
);


// Modal Variables
const modalContainer = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const modalOverlay = document.querySelector('[data-modal-overlay]');

// Modal Content Variables
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');
const modalCategory = document.querySelector('[data-modal-category]');
const modalImg = document.querySelector('[data-modal-img]');
const modalLink = document.querySelector('[data-modal-link]');

// Modal Toggle Function
const modalToggle = function () {
  modalContainer.classList.toggle('active');
  modalOverlay.classList.toggle('active');
}

// Close Modal Event
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', modalToggle);
}
if (modalOverlay) {
  modalOverlay.addEventListener('click', modalToggle);
}

// Open Modal Function (Global to access from HTML onclick)
// Open Modal Function
const openModal = function (elem) {
  // Get data from clicked element
  const title = elem.dataset.title;
  const category = elem.dataset.category;
  const description = elem.dataset.description;
  const url = elem.dataset.url;
  const techStack = elem.dataset.techStack;
  const features = elem.dataset.features;

  // Populate Modal Basic Info
  if (modalTitle) modalTitle.innerHTML = title;
  if (modalCategory) modalCategory.innerHTML = category;
  if (modalText) modalText.innerHTML = description;
  if (modalLink) modalLink.href = url;

  // Populate Tech Stack
  const modalTechList = document.querySelector('[data-modal-tech-list]');
  if (modalTechList) {
    modalTechList.innerHTML = ''; // Clear previous
    if (techStack) {
      const techs = techStack.split(',').map(t => t.trim());
      techs.forEach(tech => {
        const li = document.createElement('li');
        li.classList.add('modal-tech-item');
        li.innerText = tech;
        modalTechList.appendChild(li);
      });
      modalTechList.parentElement.style.display = 'block';
    } else {
      modalTechList.parentElement.style.display = 'none';
    }
  }

  // Populate Features
  const modalFeaturesList = document.querySelector('[data-modal-features-list]');
  if (modalFeaturesList) {
    modalFeaturesList.innerHTML = ''; // Clear previous
    if (features) {
      const feats = features.split('|').map(f => f.trim());
      feats.forEach(feat => {
        const li = document.createElement('li');
        li.classList.add('modal-features-item');
        li.innerText = feat;
        modalFeaturesList.appendChild(li);
      });
      modalFeaturesList.parentElement.style.display = 'block';
    } else {
      modalFeaturesList.parentElement.style.display = 'none';
    }
  }



  // Show Modal
  modalToggle();
}

// Add Click Event to Project Images
const projectImages = document.querySelectorAll('.project-img');

for (let i = 0; i < projectImages.length; i++) {
  projectImages[i].addEventListener("click", function () {
    openModal(this);
  });
}

