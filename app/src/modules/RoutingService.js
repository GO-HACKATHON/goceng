function _ajax(settings, resolve, reject){
  $.ajax(settings).done(function(response){
    resolve(response);
  }).fail(function(jqXHR, textStatus){
    reject(jqXHR, textStatus);
  });
}

export function getRouting(origin, destination) {
  const time = "2017-03-25 07:10:00"
  
  const url = "http://139.59.101.20:5001/v1/multiple_route?origin=" +
                origin + "&destination=" + destination + "&timestamp=" +
                time + "&intersections=1&area=jakarta2"
  
  console.log("getRouting url: " + url)
                
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

