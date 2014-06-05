/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
// var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var cp = require('child_process');
var Floor;


describe('Floor', function(){
  before(function(done){
    db(function(){
      Floor = traceur.require(__dirname + '/../../../app/models/floor.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('floors').drop(function(){
      cp.execFile(__dirname+ '/../../fixtures/clean.sh', {cwd:__dirname + '/../../fixtures'}, function(err, stdout, stderr){
        console.log(stdout);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a floor', function(done){
      var fields = {name:'tile', rate:['4.35']};
      var files = {photo:[{originalFilename: 'white_tiles.png', path:__dirname + '/../../fixtures/copy/white_tiles.png'}]};
      fields.photo = files.photo;
      Floor.create(fields, function(floor){
        console.log(floor);
        expect(floor.name).to.equal('tile');
        expect(floor).to.be.an.instanceof(Floor);
        expect(floor._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(floor.rate).to.be.within(4.34,4.36);
        expect(floor.photo).to.equal('/img/flooring/white_tiles.png');
        done();
      });
    });

  // afterEach(function(done){
  //   rm.execFile(__dirname+'/../../fixtures/remove.sh', {cwd:__dirname + '/../../fixtures/copy/white_tiles.png'}, function(err, stdout, stderr){
  //     done();
  //   });
  // });


  });

});
