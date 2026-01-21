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