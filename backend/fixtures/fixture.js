const sequelize = require('sequelize');

const sequelize_fixtures = require('sequelize-fixtures');

const models = require('../models/dbModels');



//specify logging function (default console.log)
function myLogging(defaultLog) {
    console.log('Fixtures: processing ...')
}



(async () => {
    await sequelize_fixtures.loadFile('./*.json', models, { log: myLogging} );
})();