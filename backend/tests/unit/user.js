const chai = require('chai');
const { expect } = require('chai')
const { spy } = require('sinon')
const proxyquire = require('proxyquire')
const { sequelize, Sequelize } = require('sequelize-test-helpers')
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe('../../models/dbModels/user', () => {
    const { DataTypes } = Sequelize;

    const UserFactory = proxyquire('../../models/dbModels/user', {
        sequelize: Sequelize,
    });

    let User;

    before(async() => {
        User = await UserFactory(sequelize, DataTypes)
    });

    // It's important you do this
    after(() => {
        User.init.resetHistory()
    });

    it('called User.init with the correct parameters', () => {
        chai.assert.isOk(User.id);
    })
})
