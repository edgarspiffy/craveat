// if (navigator.geolocation){
//   navigator.geolocation.getCurrentPosition(
//     position => getCity(position),
//     err => console.log(err)
//   );
// }

// function getCity(position){
//   fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&sensor=false")
//   .then(function(res){
//     console.log(res);
//   });
// }
        

// "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=false", function (data) {
//   console.log(data);

// function addLocation(){
//   const field = document.getElementById('geoField');
//   field.placeholder=`Search in `;
// }