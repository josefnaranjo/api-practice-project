const searchInput = document.querySelector(".search_input");
const searchBtn = document.querySelector(".btn_search");

let map, searchManager;

searchBtn.addEventListener("click", () => {
// Clear existing entities on the map
map.entities.clear();

// Geocode the search input value
geocodeQuery(searchInput.value);
});

// Initialize map
function getMap() {
    // Create new map instance
    map = new Microsoft.Maps.Map("#main--map", {
        // Set map credentials
        credentials: 'ArFmpbhf3V1hUEjwto8KypnVGYJQKnCDjglDnEQtMdlMZy8bY5FFk9Sz22LhTtBS'
    });
}

// Function to geocode a query
function geocodeQuery(query){
    // Check if searchManager is loaded
    if(!searchManager){
        // Load search module and call function again
        Microsoft.Maps.loadModule("Microsoft.Maps.Search", function (){
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            geocodeQuery(query);
        });
    } else{
        // Create search request object
        let searchRequest = {
            where: query, // Query to search
            callback: function(f){
                if(f && f.results && f.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(f.results[0].location);
                    map.entities.push(pin); // Add pushpin to map

                    map.setView({ bounds: f.results[0].bestView }); // Set map view
                } else {
                    alert("Not found..."); // Alert if no results found
                }
            },
            errorCallback: function(e){
                alert("Error..."); // Alert if error occurs
            }
        };
        // Call geocode method with search request
        searchManager.geocode(searchRequest);
    }
}