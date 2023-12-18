const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},


//map//
buildMap() {
    this.map = L.map('map', {
        center: this.coordinates,
        zoom: 13,
    });


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(this.map);


const marker = L.marker(this.coordinates)
marker
.addTo(this.map)
.bindPopup('<p1><b>You are here</b><br></p1>')
.openPopup()

},

addMarkers() {
    for (var i = 0; i < this.businesses.length; i++) {
        this.markers = L.marker([
            this.businesses[i].lat,
            this.business[i].long,
        ])
        .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
        .addTo(this.map)
        }
    },

}

async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}
async function getFourSquare(business) {
    let clientId = '3J5YNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34';
    let clientSecret = 'IPGTGUNL5IUETNNIQXNVXWQD@AB!QDIWZZY0B5UXb0NHPDQU';
    let limit = 5 
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]
    let response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lat},${lon}&query=${business}`
	);
    let data = await response.text()
    let parseData = JSON.parse(data);
    let businesses = parseData.response.groups[0].items
    return businesses
}

function processBusinesses(data) {
    let businesses = parseData.map((element) => {
        let location = {
            name: element.venue.name,
            lat: element.venue.location.lat,
            long: element.venue.location.lng,
        };
        return location
    })
    return businesses
}

window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.buildMap()
}

document.getElementById('business').addEventListener('change', async (event) => {
    event.preventDefault()
    let business = event.target.value;
    console.log(business);
});
// navigator.geolocation.getCurrentPosition(function(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;

//     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
// })
// const myMaps = L.map('map').setview([35.4813406, -78.545404], 13);

// const redMarker = L.marker([35.4813406, -78.545404]);
// redMarker.addTo(myMap).bindPopup('<p1><b>Benson, NC</b></p1>').openPopup();

// const coffee = L.marker([35.51658, -78.56025]).addTo(myMap).bindPopup('<p1><b>Dunkin Donuts</b></p1>').openPopup()

// const Hotel = L.marker( [3560746, -7856025]).addTo(myMap).bindPopup('<p1><b>Super 8</b></p1>').openPopup()

// const Resturant = L.marker([35.51553, -78.55525]).addTo(myMap).bindPopup('<p1><b>Red Neck BBQ</b></p1>').openPopup()

// const Market = L.marker([35.51819, -78.56071]).addTo(myMap).bindPopup('<p1><b>Food Lion</b></p1>').openPopup()

// const bus5 = L.marker([35.4813406, -78.545404]).addTo(myMap).bindPopup('<p1><b>Home</b></p1>').openPopup()

//adding polygon//
// const polygon = L.polygon([
//     // Draw the 2nd Arrondissement                                          
    // [48.863368120198004, 2.3509079846928516],//Coffee Shop Marker//
    // [48.86933262048345, 2.3542531602919805],//Hotel Marker//
    // [48.87199261164275, 2.3400569901592183],//Resturant Marker//
    // [48.86993336274516, 2.3280142476578813],//Market marker//
    // [,]//Current User Marker//


// ],{
//     color: "red", fillOpacity: .2
// } ).addTo(myMap);

// //dropDownBox//

// function handleDropDownChange() {
//     const dropDown = document.getElementById('dropDown');
//     const selectedOption = dropDown.options[dropDown.selectIndex].text;
   
//     const selectedOptionElementtextContent = `Selected Option: ${selectedOption}`;
// }

// async function placeSearch() {
//    try {
//     const searchParams = new URLSearchParams({
//         query: '',
//         li: '35.4813406, -78.545404',
//         open_now: 'true',
//         sort: 'DISTANCE'
//     });
//     const results = await fetch(
//         `https://api.foursquare.com/v3/places/search?${searchParams}`,
//         {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 Authorization: 'fsq3atTHiCaBogRfFunxJOE0di3X8mGCU6a8N+nAksEn7X8=',

//             }
//         }   
//     );
//       const data = await results.json();
//     return data;
//    } catch (err) {
//       console.error(err);
//  }
    
  
// }
// //Foursquare api//
//  mapboxgl.accessToken = 'fsq3atTHiCaBogRfFunxJOE0di3X8mGCU6a8N+nAksEn7X8=';

// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/light-v10',
//     center: [-74.5,40],//starting position [long, lat]//
//     zoom: 12,
// });

// //Foursquare Method//
// const fsqAPIToken = 'FSQ_API_TOKEN';

// let userLat;
// let userLng;
// let sessionToken = generateRandomSessionToken();

// async function autocomplete(query) {
//     const {lng, lat} = map.getCenter();
//     userLat = lat;
//     userLng = lng;
//     try {
//         const searchParams = new URLSearchParams({
//             query,
//             types: 'place',  //type of results to return//
//             ll: `${userLat}, ${userLng}`,  //represents long/lat you wish to retrieve//
//             radius: 50000, // defines distance in meters to return place//
//             session_token: sessionToken,
//         }).toString();
//         const searchResults = await fetch(
//             'https://api.foursquare.com/v3/autocomplete?${searchParams}',
//             {
//                 method: 'get',
//                 headers: new Headers({
//                     Accept: 'application/json',
//                     Authorization: fsqAPIToken,
//                 }),
//             }
//         );
//         const data = await searchResults.json();
//         return data.results;
//         }catch(error) {
//          throw error;   
//         }
    
// }

//Foursquare Drop Down Box//
// const inputField = document.getElementById('explorer-search');
// const dropDownField = document.getElementById('explorer-dropdown');
// const ulField = document.getElementById('explorer-suggestions');

// const isFetching = false;
// async function changeAutoComplete({
//     target
// }) {
//     const {
//         value: inputSearch = ''
//     } = target;
//     ulField.innerHTML = '';
//     if (inputSearch.length && !isFectching) {
//       try {
//         isFetching = true;
//         const results = await autocomplete(inputSearch);
//         if (results && results.length) {
//             results.forEach((value) => {
//                 additem(value);
//             });
//         } 
//       } catch (err) {
//         logError(err);
//       } finally {
//         isFetching = false;
//         dropDownField.style.display = 'block';
//       } 
//     } else {
//         dropDownField.styledisplay = 'none';
//     }
// }

// function logError(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
// }

//  function additem(value) {
//     const placeDetail = value[value.type];
//     if (!placeDetail || !placeDetail.geocodes || !placeDetail.geocodes.main) return;
//     const {latitude, longitude} = placeDetail.geocodes.main;
//     const {link} = value;
//     const dataObject = JSON.stringify({latitude, longitude, link});
//     ulField.innerHTML +=`
//     <li class="explorer--dropdown-item">
//     <div>${value.text.primary}</div>
//     <div>${value.text.secondary}</div>
//      </li>`
