const config = require('./config');

const Db = require('json-db').Db;

const graph = require('./graph');
const testHelper = require('./testHelper');

Db.init({directory: config.directory});

const data = require('./data/data.js');
const dictionary = {
  '1': require('./data/1'),
  '2': require('./data/2'),
  '3': require('./data/3'),
  '4': require('./data/4'),
  '5': require('./data/5'),
  '6': require('./data/6'),
  '7': require('./data/7'),
  '8': require('./data/8'),
  '9': require('./data/9'),
  '10': require('./data/10'),
  '11': require('./data/11'),
  '12': require('./data/12'),
  '13': require('./data/13'),
  '14': require('./data/14')
};


module.exports = function (app, path) {

  /* GET home page. */
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../www/index.html'));
  });
  
  //simple
  app.get('/performance', (req, res) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.send(JSON.stringify(data).toString());
  });

  
  
  app.get('/getNumTests', (req, res) => {
    res.send(JSON.stringify({num: testHelper.getNumTests()}));
  });

  app.post('/getTest', (req, res) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    setTimeout(function(){
      const newData = testHelper.sliceTestFile(data, req.body.num);
      res.send(JSON.stringify(newData).toString());
    },500);
   
  });

  app.get('/getResponse/:number', (req, res) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    
    setTimeout(function(){
      res.send(JSON.stringify(dictionary[''+req.params.number]).toString());
    }, 0);

  });

  app.post('/postResult', (req, res) => {

    const device = req.body.device;
    delete req.body.device;

    Db.addToQueue({
      [device] : {
        [Date.now()] : req.body
      }
    });
    res.send({success:true});
  });
  
  app.get('/graph', (req, res) => {
    Db.getAll(function (data) {
      if (data.data) res.send(graph(data.data));
    });
  });
  


};
