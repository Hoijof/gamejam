var restify = require('restify');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

let ranking = [
	[ 'nobody', 1000000]
];

function sortRanking() {
    ranking.sort((a, b) => {
        return a[1] - b[1]
    });
}

function addToRanking(data) {
    ranking.push([data.name, parseInt(data.score, 10)]);
}

function trimRanking() {
    ranking = ranking.slice(0, 7);
}

server.get('/ranking', function(req, res, next) {
    //trimRanking();

    res.send({'result':
        ranking
    });
});

server.post('/ranking', function(req, res, next) {
    console.log(req.body);
//    console.log(req);
    addToRanking(req.body);

    sortRanking();

    console.log(ranking)
    res.send();
});

server.listen(8088, function () {
  console.log('%s listening at %s', server.name, server.url);
});
