function _ajax(settings, resolve, reject){
  $.ajax(settings).done(function(response){
    resolve(response);
  }).fail(function(jqXHR, textStatus){
    reject(jqXHR, textStatus);
  });
}

const origin = 'Universitas Kristen Maranatha, Sukawarna, Jawa Barat, West Java';
const destination = 'Rumah Sakit Melinda 2, Pasirkaliki, Bandung City, West Java';
const timestamp = '2017-03-25 22:00:00';

// const url = '10.17.10.185:5001/v1/multiple_route?' +
//   'origin=' + origin + 
//   '&destination=' + destination + 
//   '&timestamp=' + timestamp;
const url = "http://10.17.10.185:5001/v1/multiple_route?origin=Universitas%20Kristen%20Maranatha%2C%20Sukawarna%2C%20Jawa%20Barat%2C%20West%20Java&destination=Rumah%20Sakit%20Melinda%202%2C%20Pasirkaliki%2C%20Bandung%20City%2C%20West%20Java&timestamp=2017-03-25%2022%3A00%3A00"

console.log(url)

export function getRouting() {
  return new Promise(function (resolve, reject) {
    var settings = {
      "url": url,
      "async": true,
      "crossDomain": true,
      "method": "GET"
    }
    _ajax(settings, resolve, reject);
  });
}

