const mongoose = require('mongoose');
const { MONGODB_URL } = require("./constants");

console.log(MONGODB_URL);

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
