// Geo Location code adapted from: https://www.tutorialrepublic.com/html-tutorial/html5-geolocation.php

// Set global variable
var watchID;
var prevLat;
var prevLong;
// the latitude and longitude of Henties Bay Namibia
var prevLatHome = -22.1147;
var prevLongHome = 14.2732;
// the latitude and longitude of Windhoek Namibia
// var prevLatHome = -22.5608807;
// var prevLongHome = 17.0657549;

// JavaScript program to calculate Distance Between
// Two Points on Earth
function getDistance(lat1, lat2, lon1, lon2) {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result and  round
    return Math.round((c * r));
}

function showPosition() {
    if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(successCallback);
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

function successCallback(position) {
    document.getElementById("toggleWatchBtn").innerHTML = "Stop checking my location";

    // Check position has been changed or not before doing anything
    if (prevLat != position.coords.latitude || prevLong != position.coords.longitude) {

        // Set previous location
        prevLat = position.coords.latitude;
        prevLong = position.coords.longitude;
        // get the distance
        let distance = getDistance(prevLat, prevLatHome, prevLong, prevLongHome);
        // set add details
        basedOnDistance(distance);
    }
}

function basedOnDistance(distance) {
    // set notice
    let positionInfo = "Your current position is (Latitude: " + prevLat + ", Longitude: " + prevLong + ") which is " + distance + " kilometers away!";
    // update the result
    document.getElementById("result").innerHTML = positionInfo;
    document.getElementById("default-image").style.display = 'none';
    // show ad
    if (distance > 1000) {
        // they are far away and need to book a flight
        document.getElementById("book-flight-image").style.display = 'block';
        document.getElementById("rent-car-image").style.display = 'none';
        document.getElementById("walking-distance-image").style.display = 'none';
    } else if (distance < 10) {
        // they are close enough to walk
        document.getElementById("book-flight-image").style.display = 'none';
        document.getElementById("rent-car-image").style.display = 'none';
        document.getElementById("walking-distance-image").style.display = 'block';
    } else {
        // they are far, but in driving distance and need to book a rental vehicle
        document.getElementById("book-flight-image").style.display = 'none';
        document.getElementById("rent-car-image").style.display = 'block';
        document.getElementById("walking-distance-image").style.display = 'none';
    }
}

function startWatch() {
    document.getElementById("toggleWatchBtn").addEventListener('click', function () {
        if (watchID) {
            document.getElementById("toggleWatchBtn").innerHTML = "Start checking my location";
            navigator.geolocation.clearWatch(watchID);
            watchID = false;
        } else {
            document.getElementById("toggleWatchBtn").innerHTML = "Acquiring Geo Location...";
            showPosition();
        }
    });
}

// Initialise the whole system (above)
window.onload = startWatch;