/* Store API URL in string variable */
let url = "https://api.wheretheiss.at/v1/satellites/25544"

/* Locate latitude, longitude, and time span elements */
let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeFetched = document.querySelector('#time')

/* Interval at which map updates ISS location */
let update = 10000

let maxFailedAttempts = 3

/* Declare issMarker variable but do not initialize at this point. Do not yet have coordinates of ISS. */
let issMarker

/* Instantiate a new Leaflet icon object */
let issIcon = L.icon({
    iconUrl: '08_iss_icon.png',
    iconSize: [50, 50],
    iconSize: [25, 25]
})

/* Instantiate a map object */
/* Center map on coordinates 0,0 (center of world). Set zoom to 1 (least zoom/whole world). */
let map = L.map('iss-map').setView([0,0], 1)

/* Add tile layer to map */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/* Call iss() with argument of max 3 failed attempts */
iss(maxFailedAttempts)

/* setInterval function removed, using recursive setTimeout instead */
// setInterval(iss, update)

/* Function to retrieve ISS coordinates */
function iss(attempts) {

        if (attempts <= 0) {
            alert('Failed to contact ISS server after several attempts')
            return
        }

        /* fetch() returns a promise that resolves to a response object */
        /* If promise is fulfilled (ie, if fetch is resolved) 'then' is called. If not, 'catch' is called */
        /* json() takes a response object and returns a promise that resolves to a json object */
        /* Anything returned from a 'then' block is sent to any subsequent 'then' blocks */
        /* json returned from res.json() is passed to 'issData' parameter in next 'then' block */
        fetch(url)

            .then( res => res.json() )

            .then(issData => {
                console.log(issData)
                let lat = issData.latitude
                let long = issData.longitude
                issLat.innerHTML = lat
                issLong.innerHTML = long

                /* Create marker if it does not already exists and add to map */
                /* marker() takes coordinates and options (eg, icon) as arguments */
                if (!issMarker) {
                    issMarker = L.marker( [lat, long], {icon: issIcon} ).addTo(map)

                /* Move marker if it already exists using setLatLng() method */
                } else {
                    issMarker.setLatLng([lat, long])
                }

                /* Instantiate a new Date object. Insert into span element. */
                let now = Date()
                timeFetched.innerHTML = now
            })

            /* This catch block can catch errors from both fetch(url) and res.json() */
            /* Decrements attempts variable each time a promise fails to resolve */
            .catch(err => {
                attempts--
                console.log('ERROR', err)
            })

            /* recursion: when function calls itself */
            /* finally() runs whether or not fetch succeeded (ie, will try again - failure doesn't halt program) */
            /* Calls iss() again after a delay of [update] milliseconds */
            /* setTimeout() waits for a specified interval then calls function once */
            /* Arguments listed after timeout interval */
            .finally( () => setTimeout(iss, update, attempts))

}




