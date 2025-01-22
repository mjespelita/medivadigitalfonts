// Function to fetch font data from a JSON file and append @font-face to the <head>
function loadFontsFromJson() {
    // Fetch the fonts JSON data
    fetch('fonts/fonts.json')
        .then(response => response.json())  // Parse JSON data
        .then(fonts => {
            appendFontFaces(fonts);  // Pass the fonts data to append @font-face rules
        })
        .catch(error => {
            console.error('Error loading fonts:', error);  // Handle any errors
        });
}

// Function to generate and append @font-face rules dynamically to the <head>
function appendFontFaces(fonts) {
    // Create a new <style> element
    const style = document.createElement('style');
    style.type = 'text/css';

    // Loop through the fonts and generate the @font-face rules
    let cssContent = '';
    fonts.forEach(font => {
        cssContent += `
@font-face {
    font-family: '${font.name}';
    src: url('https://raw.githubusercontent.com/mjespelita/medivadigitalfonts/main/fonts/${font.url}') format('woff2');
}

.${font.name} {
    font-family: '${font.name}' !important;
}
`;
    });

    // Append the CSS content to the <style> element
    style.innerHTML = cssContent;

    // Append the <style> element to the <head>
    document.head.appendChild(style);
}

// Load fonts when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadFontsFromJson();  // Call the function to fetch the JSON and append fonts
});
