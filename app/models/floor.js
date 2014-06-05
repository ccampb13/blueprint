var Mongo = require('mongodb');
var floorCollection = global.nss.db.collection('floors');


class Floor{
  static create (obj, fn){
    var floor = new Floor();
    floor._id = Mongo.ObjectID(obj._id);
    floor.name = obj.name;
    floor.rate = obj.rate;
    floor.photo = obj.photo;


    
    floorCollection.save(floor, ()=>fn(floor));
  }
}

module.exports = Floor;
