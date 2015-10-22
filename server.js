var express = require('express'),
    bodyParser = require('body-parser'),
    redis = require('redis'),
    credentials = require('./config/credentials'),
  	app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'), function() {
    console.log('Aplicação rodando!');
});

var client = redis.createClient(
  	credentials.port,
    credentials.azureUrl,
    {auth_pass: credentials.azureKey }
);

app.get('/set', function(req, res){
    console.log('set');
    client.set("key", "value", function (err, obj) {
        res.end(obj);
    });
});

app.get('/get', function(req, res){
    console.log('get');
    client.get("key", function(err, obj){
        res.end(obj);
    });
});
