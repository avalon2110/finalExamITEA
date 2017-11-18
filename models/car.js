const mongoose = require('mongoose');

// car schema

const carSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  engine:{
    type: String,
    required: true
  },
  max_speed:{
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  image_url:{
    type: String,
    required: true
  },
  website:{
    type: String,
    required: true
  },
  comments:{
    type: Array,
    default: []
  },
  createDate:{
    type: Date,
    default: Date.now()
  }
});

const Car = module.exports = mongoose.model('Car', carSchema);


// get Cars
module.exports.getCars = (callback, limit) => {
  Car.find(callback).limit(limit);
}

// get one car
module.exports.getCar = (query, callback) => {
  Car.findById(query, callback);
}

// add car
module.exports.addCar = (car, callback) => {
  Car.create(car, callback);
}

// update car
module.exports.updateCar = (id, car, options, callback) => {
  const query = {
    _id : id
  };
  const update = {
    name: car.name,
    price: car.price,
    description: car.description,
    engine: car.engine,
    max_speed: car.max_speed,
    country: car.country,
    image_url: car.image_url,
    website: car.website,
    comments: car.comments
  }

  Car.findOneAndUpdate(query,update, options, callback);
}

// delete car(my)
module.exports.deleteCar = (id, callback) => {
  const query = {
    _id : id
  }
  Car.remove(query, callback);
}
