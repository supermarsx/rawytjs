// jshint esversion:8
// jshint node:true


var rawyt = require('rawytjs'),
  videoId = 'jNQXAC9IVRw';

/*
  Get YT Sources
 */

(async function() {
  var streams = await rawyt.getSource(videoId);
  console.log('** Get video source');
  console.log(streams);
})();
