document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is loaded");

    // Ensure banner is visible only on the index page and at the top
    //if (isOnIndexPage() && window.scrollY === 0) {
    //    showBanner();
    //    loadContent("sections/about.html");
    //} else {
    //    hideBanner();
    //}

    // Attach event listeners to navigation links
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            loadContent(page);
            hideBanner(); // Hide banner when navigating
        });
    });

    // Show/hide banner only when user scrolls up/down
    window.addEventListener("scroll", function () {
        if (window.scrollY === 0 && isOnIndexPage()) {
            showBanner(); // Show banner if scrolled all the way up
        } else {
            hideBanner(); // Hide banner when scrolling down
        }
    });
});

function loadContent(page) {
    console.log(`🔄 Fetching: ${page}`);

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`❌ Error: ${page} not found (Status ${response.status})`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("content").innerHTML = data;
            console.log(`✅ Successfully loaded ${page}`);
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
        banner.style.opacity = "0";
        banner.style.pointerEvents = "none";
        banner.style.transition = "opacity 0.5s ease-in-out";
    }
}

// Function to show the banner
function showBanner() {
    const banner = document.getElementById("banner");
    if (banner && isOnIndexPage()) {
        banner.style.opacity = "1";
        banner.style.pointerEvents = "auto";
        banner.style.display = "flex"; // Ensures the banner is visible
    }
}

@media screen and (max-width: 768px) {
    .red, .purple, .gold {
        font-size: 1.1em; /* Slightly larger text */
        text-shadow: none; /* Remove glow if it's too harsh */
    }
}
