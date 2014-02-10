#! /usr/bin/env node
  var colors = require('colors'),
      http = require('http');

  var args = [],
      log = console.log,
      helpFlags = ['help', '-help', '--help'],
      arg2 = process.argv[2];
  
  if(helpFlags.indexOf(arg2) > -1) {
    log('################################'.rainbow);
    log('################################'.rainbow);
    log('required args:'.red);
    log('                                ');
    log('@param station: '.cyan);
    log(' 12th ==>  12th St. Oakland City Center'.cyan);
    log(' 16th ==>  16th St. Mission (SF)'.cyan);
    log(' 19th ==>  19th St. Oakland'.cyan);
    log(' 24th ==>  24th St. Mission (SF)'.cyan);
    log(' ashb ==>  Ashby (Berkeley)'.cyan);
    log(' balb ==>  Balboa Park (SF)'.cyan);
    log(' bayf ==>  Bay Fair (San Leandro)'.cyan);
    log(' cast ==>  Castro Valley'.cyan);
    log(' civc ==>  Civic Center (SF)'.cyan);
    log(' cols ==>  Coliseum/Oakland Airport'.cyan);
    log(' colm ==>  Colma'.cyan);
    log(' conc ==>  Concord'.cyan);
    log(' daly ==>  Daly City'.cyan);
    log(' dbrk ==>  Downtown Berkeley'.cyan);
    log(' dubl ==>  Dublin/Pleasanton'.cyan);
    log(' deln ==>  El Cerrito del Norte'.cyan);
    log(' plza ==>  El Cerrito Plaza'.cyan);
    log(' embr ==>  Embarcadero (SF)'.cyan);
    log(' frmt ==>  Fremont'.cyan);
    log(' ftvl ==>  Fruitvale (Oakland)'.cyan);
    log(' glen ==>  Glen Park (SF)'.cyan);
    log(' hayw ==>  Hayward'.cyan);
    log(' lafy ==>  Lafayette'.cyan);
    log(' lake ==>  Lake Merritt (Oakland)'.cyan);
    log(' mcar ==>  MacArthur (Oakland)'.cyan);
    log(' mlbr ==>  Millbrae'.cyan);
    log(' mont ==>  Montgomery St. (SF)'.cyan);
    log(' nbrk ==>  North Berkeley'.cyan);
    log(' ncon ==>  North Concord/Martinez'.cyan);
    log(' orin ==>  Orinda'.cyan);
    log(' pitt ==>  Pittsburg/Bay Point'.cyan);
    log(' phil ==>  Pleasant Hill'.cyan);
    log(' powl ==>  Powell St. (SF)'.cyan);
    log(' rich ==>  Richmond'.cyan);
    log(' rock ==>  Rockridge (Oakland)'.cyan);
    log(' sbrn ==>  San Bruno'.cyan);
    log(' sfia ==>  San Francisco Int\'l Airport'.cyan);
    log(' sanl ==>  San Leandro'.cyan);
    log(' shay ==>  South Hayward'.cyan);
    log(' ssan ==>  South San Francisco'.cyan);
    log(' ucty ==>  Union City'.cyan);
    log(' wcrk ==>  Walnut Creek'.cyan);
    log(' wdub ==>  West Dublin'.cyan);
    log(' woak ==>  West Oakland'.cyan);
    log('                                ');
    log('@param direction {n|s} (optional)'.cyan); 
    log('                                ');
    log('                                ');
    log('examples:'.cyan)
    log('commute lake'.green)
    log('                                ');
    log('commute ftvl'.green)
    log('################################'.rainbow);
    log('################################'.rainbow);
    return;
  }
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
    'port': 3636,
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
      log("  ____.-==-, _______  _______  _______  _..._ ");
      log(" {'''''LILI|[' ' '' ][''''''']['' ''''][LI LI]");
      log(" /_OO====OO`'OO---OO''OO---OO''OO---OO`'OO-OO'");
      log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
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

