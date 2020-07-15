
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true}).then((res)=>{
    console.log('conectado ao banco')

}).catch((err)=>{
    console.log(err)
})

module.exports = mongoose;