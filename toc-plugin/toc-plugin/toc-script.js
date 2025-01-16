
// JavaScript to dynamically create a TOC and highlight the active link in all elements with the class 'toc'
document.addEventListener('DOMContentLoaded', function() {
    const tocContainers = document.getElementsByClassName('toc'); // Get all elements with the class 'toc'
    const postContent = document.querySelector('.table-of-contents');
    
    // Check if the postContent element exists
    if (!postContent) {
        console.warn('Post content not found!');
        return;
    }

    const headings = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocList = document.createElement('ul');
    
    if (headings.length > 0) {
        const tocTitle = document.createElement('h2');
        tocTitle.textContent = 'Table of Contents';
        tocList.appendChild(tocTitle);

        headings.forEach(function(heading) {
            const level = heading.tagName.replace('H', '');
            const headingText = heading.textContent;
            const headingId = headingText.toLowerCase().replace(/\s+/g, '-'); // Create ID
            heading.id = headingId; // Set ID to heading

            // Create TOC entry
            const tocItem = document.createElement('li');
            tocItem.classList.add('toc-level-' + level);

            const tocLink = document.createElement('a');
            tocLink.href = '#' + headingId;
            tocLink.textContent = headingText;

            tocItem.appendChild(tocLink);
            tocList.appendChild(tocItem);
        });
    }

    // Append the TOC to every container with the 'toc' class
    Array.from(tocContainers).forEach(function(tocContainer) {
        const tocClone = tocList.cloneNode(true);  // Clone the TOC for each container
        tocContainer.appendChild(tocClone);
    });

    // Highlight active TOC link on scroll
    const tocLinks = document.querySelectorAll('.toc a');

    window.addEventListener('scroll', function() {
        let currentHeading = null;

        headings.forEach(function(heading) {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 150) {  // Distance from the top of the viewport
                currentHeading = heading;
            }
        });

        tocLinks.forEach(function(link) {
            link.classList.remove('active');
            if (currentHeading && link.getAttribute('href').substring(1) === currentHeading.id) {
                link.classList.add('active');
            }
        });
    });
});