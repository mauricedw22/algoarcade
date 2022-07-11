const algosdk = require('algosdk');

module.exports = function(app){

    app.get('/', function(req, res){
        
        res.render('index.html');
        // res.redirect('/spades');
        
    });

    app.get('/spades', function(req, res){
        
        res.render('spades.html');
        
    });

    app.get('/hearts', function(req, res){
        
        res.render('hearts.html');
        
    });
  
};