document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is loaded");

    // Ensure navigation links are working
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default navigation
            const page = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            console.log(`🔄 Loading: ${page}`);
            loadContent(page);
        });
    });

    // Load default page
    loadContent("sections/about.html");
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
