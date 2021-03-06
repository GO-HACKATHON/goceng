function _ajax(settings, resolve, reject){
  $.ajax(settings).done(function(response){
    resolve(response);
  }).fail(function(jqXHR, textStatus){
    reject(jqXHR, textStatus);
  });
}

export function getRouting(origin, destination, time) {
  const url = "http://139.59.101.20:5001/v1/multiple_route?origin=" +
                origin + "&destination=" + destination + "&timestamp=" +
                time + "&intersections=1"
  
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

