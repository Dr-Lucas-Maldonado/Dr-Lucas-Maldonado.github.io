/**
 * scripts.js
 * JavaScript for Dr. Lucas Maldonado's portfolio (https://mainprofile.netlify.app)
 * Handles interactive elements like collapsible sections and future pop-ups/GIF toggles
 */

/**
 * Toggles visibility of skill lists in Technical Skills section (index.html)
 * @param {string} id - ID of the <ul> element to toggle (e.g., 'programming-skills')
 */
function toggleSkills(id) {
    const element = document.getElementById(id);
    const button = element ? element.nextElementSibling : null;
    if (element && button) {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
            button.textContent = 'Show Less';
        } else {
            element.classList.add('hidden');
            button.textContent = 'Show More';
        }
    } else {
        console.warn(`Element with ID ${id} or its button not found.`);
    }
}

/**
 * Placeholder for future pop-up functionality (e.g., publications.html DOI links)
 * Example: Open a pop-up window for external links
 */
/*
function openPopup(url) {
    window.open(url, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
}
*/

/**
 * Placeholder for future GIF toggle functionality (e.g., languagesBioinformatics.gif)
 * Example: Show/hide GIF visualizations
 */
/*
function toggleGif(gifId) {
    const gif = document.getElementById(gifId);
    if (gif) {
        gif.classList.toggle('hidden');
    }
}
*/
