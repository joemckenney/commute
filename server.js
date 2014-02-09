var express = require('express'),
    xml2js = require('xml2js'),
    http = require('http'),
    parse = require('url').parse,
    app = express();

var key = 'EMKL-256J-IU39-EDPT';

app.get('/realtime', function(req, res) {
  var pathParams = [];
  //parse station out of request
  var queryParams = parse(req.url, true).query,
      orig = queryParams.orig,
      dir = queryParams.dir;
  
  console.log(queryParams);
  pathParams.push('cmd=etd');
  pathParams.push('key='+key);
  pathParams.push('orig='+orig);
  
  if(dir) {
    pathParams.push('dir='+dir);
  }

  http.get({
    "host": "api.bart.gov",
    "path": "/api/etd.aspx?"+pathParams.join('&')
  }, function(response) {

    console.log('STATUS_CODE:', res.statusCode);
    
    var buffer = '',
        parser = new xml2js.Parser();

    response.on('data', function(chunk) {
      buffer += chunk.toString();
    });

    response.on('end', function() {
      parser.parseString(buffer);  
    });
    
    parser.addListener('end', function(result) {
      res.send(JSON.stringify(result)); 
    });
    

  }).on('error', function(e) {
    console.log('error: ', e);
  }); 
});



app.listen(3636);
console.log('Listening on port 3636');
