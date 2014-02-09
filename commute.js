#! /usr/bin/env node
  var colors = require('colors'),
      http = require('http');

  var args = [],
      log = console.log;
 /**
  * @param {string} station - see http://api.bart.gov/docs/overview/abbrev.aspxn
  * @param {string} direction {n|s}
  */
  process.argv.forEach(function(val, i, arr) {
    if(i > 1) { 
      args.push(val);
    }
  });

  var path = '/realtime?orig='+args[0];

  if(args[1]) {
    path += '&dir='+args[1];
  }
  
  http.get({
    'host': 'localhost',
    'port': 3000,
    'path': path
  }, function(res) {
    var buffer = '';

    res.on('data', function(chunk) {
      buffer += chunk; 
    });
    res.on('end', function() {
      var response = JSON.parse(buffer),
          root = response.root,
          station = root.station[0],
          time = root.time,
          etd = station.etd;

      log(('Current Time: '+time).blue);
      log('<===========================================>'.rainbow);
      
      var i=0, len = etd.length;

      for(i; i<len; i++) {
        log((station.name + ' ==> ' + etd[i].destination).green);
        var j=0, est= etd[i].estimate, l=est.length; 
        for(j; j<l; j++) {
          log((est[j].length+' car train in '+est[j].minutes+'mins').cyan);
        }
        log('<===========================================>'.rainbow);
      }
    });
  });

