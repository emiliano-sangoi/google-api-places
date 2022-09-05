/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck TODO remove when fixed
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
    });

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {

        const places = searchBox.getPlaces();

        console.log('Cantidad de lugares: ' + places.length);
console.log(places);

        if (places.length != 1) {
            console.log('Debe seleccionar un solo lugar');
            return;
        }
        /*
        *
        * 0:
address_components: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
adr_address: "<span class=\"street-address\">Av. Facundo Zuviría 5102</span>, <span class=\"postal-code\">S3002ESA</span> <span class=\"locality\">Santa Fe</span>, <span class=\"country-name\">Argentina</span>"
business_status: "OPERATIONAL"
formatted_address: "Av. Facundo Zuviría 5102, S3002ESA Santa Fe, Argentina"
formatted_phone_number: "0342 488-1100"
geometry:
location: _.Ee {lat: ƒ, lng: ƒ}
viewport: _.Df {yb: Cf, Qa: yf}
[[Prototype]]: Object
html_attributions: []
icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png"
icon_background_color: "#4B96F3"
icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet"
international_phone_number: "+54 342 488-1100"
name: "Deyro Autopartes"
opening_hours: {periods: Array(11), weekday_text: Array(7), isOpen: ƒ}
photos: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
place_id: "ChIJD0cgYNmptZURVfp6LnqANfA"
plus_code: {compound_code: '97JV+6W Ciudad de Santa Fe, Provincia de Santa Fe, Argentina', global_code: '47WX97JV+6W'}
rating: 4.2
reference: "ChIJD0cgYNmptZURVfp6LnqANfA"
reviews: (5) [{…}, {…}, {…}, {…}, {…}]
types: (4) ['car_repair', 'store', 'point_of_interest', 'establishment']
url: "https://maps.google.com/?cid=17308882005122546261"
user_ratings_total: 1093
utc_offset: (...)
utc_offset_minutes: -180
vicinity: "Avenida Facundo Zuviría 5102, Santa Fe"
website: "http://www.deyroautopartes.com.ar/"
get utc_offset: ƒ ()
set utc_offset: ƒ (c)
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
        *
        *
        *
        *
        *
        * */

        var international_phone_number = null;

        var lugar = places[0];
        var location = lugar.geometry.location;
        var formatted_phone_number = lugar.formatted_phone_number;
        if(typeof lugar.international_phone_number == 'string' ){
            international_phone_number = lugar.international_phone_number;
        }

        var website = lugar.website;
        var place_id = lugar.place_id;
        var name = lugar.name;
        var formatted_address = lugar.formatted_address;

        console.log(location.lat(),location.lng(),formatted_address, formatted_phone_number, international_phone_number, website, place_id, name, place);


        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

window.initAutocomplete = initAutocomplete;
