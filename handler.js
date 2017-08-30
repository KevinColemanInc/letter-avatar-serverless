'use strict';
require('gm-base64');

module.exports.endpoint = (event, context, callback) => {
  var initials = event.pathParameters.initials
  
  // Background color
  var choices = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', 
                 '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', 
                 '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', 
                 '#FF5722'];
                 
  var initials_sum = initials.charCodeAt(0) + initials.charCodeAt(1);
  var color_index = initials_sum % choices.length;
  var background_color =  choices[color_index];

  // Image size
  var size = 256
  var params = event.queryStringParameters

  if (params) {
    size = params.size ? parseInt(params.size) : size
  }

  var font_size = Math.floor(size / 256 * 95) // try to keep the font size ratio good
  var top_offset = Math.floor(size / 256 * 10) // try to keep the font size ratio good

  // Image drawing
  var gm = require('gm').subClass({ imageMagick: true });
  gm(size, size, background_color).gravity('Center').fill('white').font('fonts/AvenirNext.otf', font_size).drawText(0, top_offset, initials.substring(0,2).toUpperCase()).toBase64('png', function(err, base64) {
    const response = {
      statusCode: 200, 
      isBase64Encoded: true,
      headers: { "Content-Type" : "image/png" },
      body: base64 };
    callback(null, response); 
  });
};
