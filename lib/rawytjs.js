// jshint esversion:8
// jshint node:true

/*
  Raw YT sources
 */

'use strict';

const querystring = require('querystring'),
  defaults = require('./config').config,
  https = require('./request.js');

/*
  getSource
    Get yt raw sources
  parameters
    videoId (string) - Youtube video ID string
    config (object) - Request configuration object
    filterKey (boolean) - Return iTag filtered key value object
 */
async function getSource(videoId = null, config = defaults, filterKey = true) {
  var {
    rawyt
  } = config, {
    request
  } = rawyt;

  var base = rawyt.proxy ? 'proxy' : 'noproxy',
    url = '';

  rawyt.request[base].hostname = (base === 'proxy') ? rawyt.request[base].hostname.format(~~(Math.random() * 10)) : rawyt.request[base].hostname;
  rawyt.request[base].path = rawyt.request[base].path.format(videoId);

  // Request options
  var options = {
    hostname: rawyt.request[base].hostname,
    path: rawyt.request[base].path,
    method: request.methods.get,
    headers: {
      'Accept': request.accept,
      'Accept-Encoding': request.acceptEncoding,
      'User-Agent': request.userAgent
    },
    insecure: request.insecure,
    rejectUnauthorized: request.rejectUnauthorized
  };

  var result = await https.request(options);
  var parsedMeta = await parseMeta(result.body, filterKey);


  return parsedMeta;
}

/*
  parseMeta
    Parses YT raw sources meta data
  parameters
    data (string) - Request body string
    filterKey (boolean) - Return iTag filtered key value object
 */
async function parseMeta(data, filterKey = true) {
  var parsed = parseStr(data),
    filtered = JSON.parse(decodeURI(unicodeToChar(parsed.player_response.replace(/\+/g, ' ')))),
    streams = filtered.streamingData.formats.concat(filtered.streamingData.adaptiveFormats),
    result = {};

  if (filterKey === false) return streams;

  streams.forEach(function(stream) {
    var itag = stream.itag * 1,
      quality = false,
      itagMap = {
        /*
        iTag reference:
          *pna - No audio
          *pna60 - No audio, 60 fps video
          *p60 - 60 fps video
          *p3d - 3D
          *hdr - HDR
          *_flv - FLV
          *_webm - webM
          *_hls - HLS
          *_3gp - 3GP
          *k - Audio only
          *k_m4a - Audio only, m4a
         */
        5: '240p_flv',
        6: '270p_flv',
        17: '144p_3gp',
        18: '360p',
        22: '720p',
        34: '360p_flv',
        35: '480p_flv',
        36: '180p_3gp',
        37: '1080p',
        38: '3072p',
        43: '360p_webm',
        44: '480p_webm',
        45: '720p_webm',
        46: '1080p_webm',
        82: '360p3d',
        83: '480p3d',
        84: '720p3d',
        85: '1080p3d',
        92: '240p3d_hls',
        93: '360p3d_hls',
        94: '480p3d_hls',
        95: '720p3d_hls',
        96: '1080p_hls',
        100: '360p3d_webm',
        101: '480p3d_webm',
        102: '720p3d_webm',
        132: '240p_hls',
        133: '240pna',
        134: '360pna',
        135: '480pna',
        136: '720pna',
        137: '1080pna',
        138: '2160pna60',
        139: '48k_m4a',
        140: '128k_m4a',
        141: '256k_m4a',
        151: '72p_hls',
        160: '144pna',
        167: '360pna_webm',
        168: '480pna_webm',
        169: '1080pna_webm',
        171: '128k_webm',
        218: '480pna_webm',
        219: '144pna_webm',
        242: '240pna_webm',
        243: '360pna_webm',
        244: '480pna_webm',
        245: '480pna_webm',
        246: '480pna_webm',
        247: '720pna_webm',
        248: '1080pna_webm',
        249: '50k_webm',
        250: '70k_webm',
        251: '160k_webm',
        264: '1440pna',
        266: '2160pna60',
        271: '1440pna_webm',
        272: '4320pna_webm',
        278: '144pna_webm',
        298: '720pna60',
        299: '1080pna60',
        302: '720pna60_webm',
        303: '1080pna60_webm',
        308: '1440pna60_webm',
        313: '2160pna_webm',
        315: '2160pna60_webm',
        330: '144pna60_hdr',
        331: '240pna60_hdr',
        332: '360pna60_hdr',
        333: '480pna60_hdr',
        334: '720pna60_hdr',
        335: '1080pna60_hdr',
        336: '1440pna60_hdr',
        337: '2160pna60_hdr'
      };
    if (itagMap[itag]) result[itagMap[itag]] = stream.url;
  });
  return result;
}

/*
  parseStr
    Parse string
  parameters
    data (string) - Data to be parsed as string
 */
function parseStr(data) {
  return data.split('&').reduce(function(params, param) {
    var paramSplit = param.split('=').map(function(value) {
      return decodeURIComponent(value.replace('+', ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}

/*
  unicodeToChar
    Cast a unicode string to character
  parameters
    string (string) - A given string to be converted to character
 */
function unicodeToChar(string) {
  return string.replace(/\\u[\dA-F]{4}/gi,
    function(match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}

/*
  String format string prototype
    replaces {0}, {1}, {x}... sequentially within a string
 */
String.prototype.format = function() {
  var a = this;
  for (var k in arguments) {
    a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
  }
  return a;
};

exports.getSource = getSource;
