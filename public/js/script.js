document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#menu > li').forEach(menuItem => {
        menuItem.addEventListener('click', function() {
            const parentId = this.getAttribute('data-item');
            const submenu = document.querySelector(`ul[data-parent="${parentId}"]`);
            const randomDelay = Math.floor(Math.random() * (5000 - 250 + 1)) + 250; // Random delay between 250ms and 5000ms
            const start = performance.now(); // Start timing

            setTimeout(() => {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';

                // Make API call for menu item
                fetch(`/api/item/${parentId}`)
                    .then(response => response.json())
                    .then(data => console.log('API Response (Main Item):', data))
                    .catch(error => console.error('API Error (Main Item):', error));

                const duration = performance.now() - start; // Calculate time taken

                // Log main menu interaction with New Relic
                if (window.newrelic) {
                    newrelic.addPageAction(`Menu${parentId}Clicked`, { menuItem: parentId, delayDuration: duration });
                }
            }, randomDelay);
        });
    });

    document.querySelectorAll('.submenu > li').forEach(subMenuItem => {
        subMenuItem.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent triggering parent menu collapse
            const subItemId = this.getAttribute('data-subitem');
            const randomDelay = Math.floor(Math.random() * (5000 - 250 + 1)) + 250; // Random delay for sub-items

            setTimeout(() => {
                // Make API call for sub-menu item
                fetch(`/api/subitem/${subItemId}`)
                    .then(response => response.json())
                    .then(data => console.log('API Response (Sub Item):', data))
                    .catch(error => console.error('API Error (Sub Item):', error));

                // Log submenu interaction with New Relic
                if (window.newrelic) {
                    newrelic.addPageAction(`SubMenu${subItemId}Clicked`, { subMenuItem: subItemId });
                }
            }, randomDelay);
        });
    });
});
