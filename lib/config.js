// jshint esversion:8
// node:true

var config = {
  rawyt: {
    request: {
      noproxy: {
        hostname: 'www.youtube.com',
        port: 443,
        path: '/get_video_info?video_id={0}'
      },
      proxy: {
        hostname: 'images{0}-focus-opensocial.googleusercontent.com',
        port: 443,
        path: '/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D{0}'
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      acceptEncoding: '*;q=0',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      insecure: false,
      rejectUnauthorized: true,
      methods: {
        get: 'GET',
        put: 'PUT'
      },
      useProxy: true,
    }
  }
};

exports.config = config;
