document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is loaded");

    // Load default page
    loadContent("sections/about.html");

    // Hide banner when user navigates
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadContent(page);
            hideBanner(); // Hide the banner on navigation
        });
    });
});

function loadContent(page) {
    const fullPath = `/theweaverchronicles/${page}`;
    console.log(`🔄 Fetching: ${fullPath}`);

    fetch(fullPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`❌ Error: ${fullPath} not found (Status ${response.status})`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("content").innerHTML = data;
            console.log(`✅ Successfully loaded ${fullPath}`);
        })
        .catch(error => {
            console.error(error);
            document.getElementById("content").innerHTML = "<h2>Page not found</h2>";
        });
}

// Hide banner on navigation or scroll
function hideBanner() {
    document.getElementById("banner").style.display = "none";
}

// Hide banner when scrolling
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) { // Adjust threshold if needed
        hideBanner();
    }
});
