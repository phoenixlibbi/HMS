var app = require('./config/express');

var port = process.env.PORT || 8080;
    
app.listen(port, function(){
    console.log('Server ON in Port' + port);
})