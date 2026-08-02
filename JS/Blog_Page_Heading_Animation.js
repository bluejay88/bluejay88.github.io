document.addEventListener('DOMContentLoaded', () => {
  const blogEntriesContainer = document.getElementById('blog-entries');

  // Example blog entries
  const blogEntries = [
      {
          title: 'Our Latest Web Design Trends',
          author: 'Jane Doe',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
          imageUrl: 'https://via.placeholder.com/400',
          date: 'August 25, 2024'
      },
      {
          title: 'How to Improve Your Website’s UX',
          author: 'John Smith',
          content: 'Nullam vehicula, urna sit amet volutpat dignissim, elit mauris blandit sapien, eu suscipit justo est sed ligula.',
          imageUrl: 'https://via.placeholder.com/400',
          date: 'August 20, 2024'
      }
  ];

  function renderEntries() {
      blogEntriesContainer.innerHTML = ''; // Clear existing entries

      blogEntries.forEach(entry => {
          const entryElement = document.createElement('div');
          entryElement.className = 'blog-entry';
          entryElement.innerHTML = `
              <h2 class="entry-title">${entry.title}</h2>
              <p class="entry-author">By ${entry.author}</p>
              <div class="entry-content">
                  <div class="image">
                      <img src="${entry.imageUrl}" alt="Blog Image">
                  </div>
                  <div class="text">
                      <p>${entry.content}</p>
                  </div>
              </div>
              <p class="entry-date">${entry.date}</p>
          `;
          blogEntriesContainer.appendChild(entryElement);
      });
  }

  // Initial render
  renderEntries();
});




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
