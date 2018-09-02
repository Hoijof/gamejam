var restify = require('restify');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

let ranking = [
    ['Name 1', 1],
    ['Name 2', 10],
    ['Name 3', 100],
    ['Name 4', 1000],
    ['Name 5', 4000],
    ['Name 6', 6000],
    ['Name 7', 8000],
];

function sortRanking() {
    ranking.sort((a, b) => {
        return a[1] - b[1]
    });
}

function addToRanking(data) {
    ranking.push([data.name, data.score]);
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
    addToRanking(req.body);

    sortRanking();

    console.log(ranking)
    res.send();
});

server.listen(8088, function () {
  console.log('%s listening at %s', server.name, server.url);
});