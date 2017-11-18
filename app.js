const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());


// static files
app.use(express.static(__dirname + '/client'));

// import model
const Car = require('./models/car')

const nodemailer = require("nodemailer");
// connect to mongoose
mongoose.connect('mongodb://localhost/carstore');
const db = mongoose.connection;
console.log("connected to db");

app.get('/', (req, res) => {
  res.send("hello");
});

app.post('/sendEmail', (req, res) => {
  var obj = req.body;
  nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
        secure: false, // true for 465, false for other ports
        auth: {
            user: '', // пошта
            pass: ''  // пароль
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {

        from: '', // хто відпарвляє (та пошта, яку вказали вище)
        to: '', // кому
        subject: 'Hello ✔', // Subject line
        text: 'User ' + obj.name + ' wants to buy car. Call him ' + obj.phone, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send(200);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
})


// get cars
app.get('/api/cars', (req, res) => {
  Car.getCars((err, cars) =>{
    if(err){
      throw err;
    };
    res.json(cars);
  })
});


// get car by id
app.get('/api/cars/:_id', (req, res) => {
  var query = {
    _id: req.params._id
  }
  Car.getCar(query, (err, car) => {
    if(err){
      throw err;
    };
    res.json(car);
  })
})

app.get('/api/cars/:_id/add_comment', (req, res) => {
  var cars = [];
  Car.find((err,cars) => {
    if(err){
      throw err
    } else{
      cars = cars;
      console.log(cars);
    }
  });
})


//delete comment
app.put('/api/cars/del_comment/:_id', (req, res) => {

})


// add comment
app.put('/api/cars/add_comment/:_id', (req, res) => {

})

app.post('/api/cars', (req, res) => {
  const car = req.body;
  Car.addCar(car, (err, car) => {
    if(err){
      throw err;
    }
    res.json(car);
  })
})

// update car
app.put('/api/cars/:_id', (req, res) => {
  const id = req.params._id;
  const car = req.body;

  Car.updateCar(id, car , {}, (err, car) => {
    if(err){
      throw err;
    }
    res.json(car);
  });
});


// delete car (my)
app.delete('/api/cars/:_id', (req, res) => {
  const id = req.params._id;
  Car.deleteCar(id, (err, car) => {
    if(err){
      throw err;
    }
    res.json(car);
  })
})




app.listen(3000);
console.log('running on port 3000');
