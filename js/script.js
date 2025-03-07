document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is loaded");

    // Show or hide the banner based on the initial page load
    if (isOnIndexPage()) {
        showBanner();
        loadContent("sections/about.html");
    } else {
        hideBanner();
    }

    // Attach event listeners to navigation links
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            loadContent(page);
            hideBanner(); // Hide banner when navigating
        });
    });

    // Hide banner when scrolling down, show when scrolled back to the top
    window.addEventListener("scroll", function () {
        if (window.scrollY === 0 && isOnIndexPage()) {
            showBanner(); // Show banner when scrolled all the way up
        } else {
            hideBanner(); // Hide banner when scrolling down
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

// Function to check if we're on the index page
function isOnIndexPage() {
    return window.location.pathname.endsWith("index.html") || window.location.pathname === "/theweaverchronicles/";
}

// Function to hide the banner
function hideBanner() {
    const banner = document.getElementById("banner");
    if (banner) {
        banner.style.display = "none";
    }
}

// Function to show the banner
function showBanner() {
    const banner = document.getElementById("banner");
    if (banner && isOnIndexPage()) {
        banner.style.display = "block";
    }
}
