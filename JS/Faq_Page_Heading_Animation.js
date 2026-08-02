document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;

          // Toggle the display of the answer
          if (answer.style.display === 'block') {
              answer.style.display = 'none';
          } else {
              answer.style.display = 'block';
          }
      });
  });
});

function toggleMenu() {
  const menu = document.querySelector('.nav-links');
  menu.classList.toggle('show');
}



document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          // Check if the current document is index.html
          const isBlogPageLink = targetHref.endsWith('Blog_Page_Heading_Animation.html');
          const isFAQPageLink = targetHref.endsWith('faq_page_heading_animations.html');

          if (isBlogPageLink) {
              // Allow default behavior if the link is pointing to Blog_Page_Heading_Animation.html
              return;
          }
          
          if (isFAQPageLink) {
              // Allow default behavior if the link is pointing to Blog_Page_Heading_Animation.html
              return;
          }


          if (window.location.pathname.endsWith('index.html')) {
              // Prevent default behavior if the current document is index.html
              event.preventDefault();
              
              // Extract the target ID from the href attribute
              const targetId = this.getAttribute('href').substring(1);
              const targetSection = document.getElementById(targetId);
  
              // Smooth scroll to the target section if it exists
              if (targetSection) {
                  targetSection.scrollIntoView({ behavior: 'smooth' });
              }
          } else {
              // If not index.html, do not prevent the default behavior
              // This allows the browser to handle the navigation
          }
      });
  });
  

  const contactLink = document.querySelector('nav a[href="#section4"]');

  //contactLink.addEventListener('click', function(event) {
  //    event.preventDefault();
  //    window.location.href = 'mailto:contact@AnchorWebDesigns.com?subject=Hi I am contacting you from AnchorWebDesigns.com about services';
  //});

  // Add horizontal scrolling with mouse wheel
  const horizontalScroll = document.querySelector('.horizontal-scroll');
  horizontalScroll.addEventListener('wheel', function(event) {
      if (event.deltaY !== 0) {
          event.preventDefault();
          this.scrollBy({
              left: event.deltaY < 0 ? -window.innerWidth : window.innerWidth,
              behavior: 'smooth'
          });
      }
  });

  // Arrow click navigation
  document.querySelectorAll('.round').forEach(arrow => {
      arrow.addEventListener('click', function() {
          const direction = this.classList.contains('back') ? -1 : 1;
          horizontalScroll.scrollBy({
              left: direction * window.innerWidth,
              behavior: 'smooth'
          });
      });
  });
});
