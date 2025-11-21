const fs = require('fs');
const path = require('path');

// Read projects.js and extract the projects array
const projectsJsContent = fs.readFileSync('projects.js', 'utf8');
// Extract the projects array using eval (safe in this context since we control the file)
const projects = eval(projectsJsContent.match(/const projects = (\[[\s\S]*?\]);/)[1]);

// Template for project HTML
function generateProjectHTML(project) {
    const mediaUrl = '../' + project.mediaUrl;
    let mediaHTML = '';
    
    if (project.mediaType === 'image') {
        mediaHTML = `<img class="project-image" src="${mediaUrl}" alt="${project.title}">`;
    } else if (project.mediaType === 'video') {
        const videoType = project.mediaUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4';
        mediaHTML = `<video class="project-video" controls preload="metadata">
            <source src="${mediaUrl}" type="${videoType}">
            Your browser does not support the video tag.
        </video>`;
    } else if (project.mediaType === 'pdf') {
        mediaHTML = `<div class="project-pdf-container">
            <div id="pdf-pages-wrapper" class="pdf-pages-wrapper"></div>
        </div>
        <script>
            // Initialize PDF.js worker
            if (typeof pdfjsLib !== 'undefined') {
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }
            
            function waitForPDFJS(callback) {
                if (typeof pdfjsLib !== 'undefined') {
                    callback();
                } else {
                    setTimeout(() => waitForPDFJS(callback), 100);
                }
            }
            
            const pdfUrl = '${mediaUrl}';
            const pdfPagesWrapper = document.getElementById('pdf-pages-wrapper');
            let pdfDoc = null;
            const scale = 1.5;
            
            function loadPDF(url) {
                if (window.location.protocol === 'file:') {
                    pdfPagesWrapper.innerHTML = 
                        '<div style="padding: 2rem; text-align: center; color: #666; margin-bottom: 1rem;">' +
                        '<p>For infinite scroll PDF viewing, please use a local server:</p>' +
                        '<code style="background: #f0f0f0; padding: 0.5rem; display: inline-block; margin-top: 0.5rem;">python3 -m http.server 8080</code>' +
                        '</div>' +
                        '<iframe src="' + url + '" style="width: 100%; height: 80vh; border: none;" type="application/pdf"></iframe>';
                    return;
                }
                
                if (typeof pdfjsLib === 'undefined') {
                    pdfPagesWrapper.innerHTML = 
                        '<p style="padding: 2rem; text-align: center; color: #666;">PDF.js library is loading. Please wait...</p>';
                    setTimeout(() => loadPDF(url), 500);
                    return;
                }
                
                pdfjsLib.getDocument({
                    url: url,
                    withCredentials: false
                }).promise.then(function(pdf) {
                    pdfDoc = pdf;
                    pdfPagesWrapper.innerHTML = '';
                    
                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        renderPage(pageNum);
                    }
                }).catch(function(error) {
                    console.error('Error loading PDF:', error);
                    pdfPagesWrapper.innerHTML = 
                        '<p style="padding: 2rem; text-align: center; color: #666;">Error loading PDF: ' + error.message + '</p>' +
                        '<iframe src="' + url + '" style="width: 100%; height: 80vh; border: none;" type="application/pdf"></iframe>';
                });
            }
            
            function renderPage(pageNum) {
                pdfDoc.getPage(pageNum).then(function(page) {
                    const viewport = page.getViewport({scale: scale});
                    
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    canvas.className = 'pdf-page-canvas';
                    
                    const pageContainer = document.createElement('div');
                    pageContainer.className = 'pdf-page-container';
                    pageContainer.appendChild(canvas);
                    
                    pdfPagesWrapper.appendChild(pageContainer);
                    
                    const renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            }
            
            waitForPDFJS(() => {
                loadPDF(pdfUrl);
            });
        </script>`;
    }
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.title} - Portfolio</title>
    <link rel="stylesheet" href="../styles.css">
    ${project.mediaType === 'pdf' ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>' : ''}
</head>
<body>
    <!-- Navigation -->
    <nav class="project-nav">
        <a href="../index.html" class="back-button">← Back to Portfolio</a>
    </nav>

    <!-- Project Detail Content -->
    <main class="project-detail">
        <div class="project-media-container">
            ${mediaHTML}
        </div>
        <div class="project-content">
            <h1 class="project-title">${project.title}</h1>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
        </div>
    </main>
</body>
</html>`;
}

// Create projects directory if it doesn't exist
const projectsDir = path.join(__dirname, 'projects');
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
}

// Generate HTML file for each project
projects.forEach(project => {
    const html = generateProjectHTML(project);
    const filename = `${project.id}.html`;
    const filepath = path.join(projectsDir, filename);
    fs.writeFileSync(filepath, html, 'utf8');
    console.log(`Generated: ${filename}`);
});

console.log(`\nGenerated ${projects.length} project HTML files.`);

