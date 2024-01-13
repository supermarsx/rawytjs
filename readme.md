# rawytJS

``` Descontinued. Youtube API changed, i don't think it works anymore ```

This node module allows you to get youtube raw sources with javascript.

## Quick Start

Clone this repository and require it or just npm install as it is below. Refer to examples for more input.

```
npm i rawytjs
```

## Usage

You can use this to get raw source links directly from googlevideo to embed, download or further process and/or streamline with any other application you want. The easiest way of getting started is to use the examples inside `examples/examples.js`.

Use cases can include downloading mp3, video, video with or without sound, minimal quality video, etc.

## Examples

From `examples.js`:

```javascript
var rawyt = require('rawytjs'),
  videoId = 'jNQXAC9IVRw';

/*
  Get YT Sources
 */

(async function() {
  var streams = await rawyt.getSource(videoId);
  console.log('** Get video sources');
  console.log(streams);
})();
```

Example result:

```javascript
{
  '360p': 'https://.........googlevideo.com/........................',
  '240pna': 'https://..........googlevideo.com/.............................',
  '240pna_webm': 'https://......googlevideo.com/.............................'
}
```



### iTag Reference

Use the value from the key:value pairing below to refer to your preferred format. 

```javascript
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
```
## License

Distributed under MIT License. See `license.md` for more information.
