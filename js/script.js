document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is loaded");

    // Load the default content (About page) on first visit
    loadContent("./sections/about.html");
});

function loadContent(page) {
    console.log(`🔄 Loading: ${page}`);

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
