// Wait for the DOM (all HTML) to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Find all tab links and all tab content panels
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add a click event listener to each tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            
            // Get the 'data-tab' value (e.g., "planner" or "next-bus")
            const tabId = link.dataset.tab;
            
            // Find the one content panel that matches the tabId
            const targetContent = document.getElementById(tabId);

            // --- Remove 'active' class from ALL tabs and ALL content ---
            
            // Loop over all tab links and remove the 'active' class
            tabLinks.forEach(item => {
                item.classList.remove('active');
            });

            // Loop over all content panels and remove the 'active' class
            tabContents.forEach(item => {
                item.classList.remove('active');
            });

            // --- Add 'active' class to ONLY the clicked tab and its matching content ---
            
            // Add 'active' to the specific link that was clicked
            link.classList.add('active');
            
            // Add 'active' to the matching content panel to make it visible
            targetContent.classList.add('active');
        });
    });


    // Get the new location button and the 'From' input field
    const locationBtn = document.getElementById('get-location-btn');
    const fromInput = document.getElementById('from-location');

    locationBtn.addEventListener('click', () => {
        // Check if the browser supports the Geolocation API
        if (navigator.geolocation) {
            
            // Give user feedback
            fromInput.value = 'Getting location...';

            // Ask for the user's current position
            navigator.geolocation.getCurrentPosition(
                
                // --- Success Callback ---
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    
                    // Fill the input with the coordinates
                    fromInput.value = `Lat: ${lat.toFixed(4)}, Long: ${long.toFixed(4)}`;
                },
                
                // --- Error Callback ---
                (error) => {
                    console.error("Error getting location: ", error);
                    fromInput.value = ''; // Clear the input
                    
                    if (error.code == error.PERMISSION_DENIED) {
                        alert("Location access was denied. Please allow it in your browser settings to use this feature.");
                    } else {
                        alert("Sorry, we could not get your location.");
                    }
                }
            );

        } else {
            // Browser doesn't support Geolocation
            alert('Sorry, your browser does not support Geolocation.');
        }
    });



});