const express = require('express');
const path = require('path');
const app = express();
// const forceSSL = function() {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//         ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// };
// // Instruct the app
// // to use the forceSSL
// // middleware
// app.use(forceSSL());
// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist/MAvha-frontend'));
// Start the app by listening on the default
app.get('/*', function(req,res) {
    
  res.sendFile(path.join(__dirname+'/dist/MAvha-frontend/index.html'));
  });
// Heroku port
app.listen(process.env.PORT || 5000, function(){
  console.log("Frontend iniciado!");
});

