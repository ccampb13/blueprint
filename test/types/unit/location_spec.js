/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var Location;


describe('Location', function(){
  before(function(done){
    db(function(){
      Location = traceur.require(__dirname + '/../../../app/models/location.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('locations').drop(function(){

      factory('location', function(locations){
        console.log(locations);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a location', function(done){
      Location.create({name:'tennessee',rate:100}, function(l){
        console.log(l);
        expect(l.name).to.equal('tennessee');
        expect(l).to.be.an.instanceof(Location);
        expect(l._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(l.rate).to.be.within(99,101);
        done();
      });
    });

  // describe('.findAll', function(){
  //   it('should find locations', function(done){
  //     Location.findAll(function(locations){
  //
  //     });
  //   });
  // });


  });

});
