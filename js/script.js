document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is loaded");

    // Load default content only if we are on the index page
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/theweaverchronicles/") {
        loadContent("sections/about.html");
    } else {
        hideBanner(); // Ensure banner stays hidden if user lands on a different page
    }

    // Attach click events to navigation links
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            loadContent(page);
            hideBanner(); // Hide the banner when navigating
        });
    });

    // Hide banner when scrolling
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) { // Adjust threshold if needed
            hideBanner();
        }
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

// Function to hide the banner
function hideBanner() {
    const banner = document.getElementById("banner");
    if (banner) {
        banner.style.display = "none";
    }
}

// Function to show the banner only on index.html
function showBanner() {
    const banner = document.getElementById("banner");
    if (banner && (window.location.pathname.endsWith("index.html") || window.location.pathname === "/theweaverchronicles/")) {
        banner.style.display = "block";
    }
}
