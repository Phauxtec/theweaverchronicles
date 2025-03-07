document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is loaded");

    // Load default content
    loadContent("sections/about.html");
});

function loadContent(page) {
    const fullPath = `/theweaverchronicles/${page}`;
    console.log(`🔄 Loading: ${fullPath}`);

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
