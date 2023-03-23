const mongoose = require('mongoose');
const cities = require('./cities.js')
const Campground = require('../models/campgrounds.js');
const { places, descriptors } = require('./seedHelpers.js');
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/campground');
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        let price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6405e58ce0a67d1888a7b57a",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aliquid non maxime impedit. Dolor illo accusantium impedit commodi accusamus qui soluta, corrupti alias a ipsum, facilis excepturi. Id, ut enim!',
            price,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {
                    url: 'https://res.cloudinary.com/duevfxofa/image/upload/w_500/v1678254899/YelpCamp/ltjmuh8r50cizditzvfu.jpg',
                    filename: 'YelpCamp/ytxgmg7uo9cxnb0mvu5b',
                },
                {
                    url: 'https://res.cloudinary.com/duevfxofa/image/upload/w_500/v1678254899/YelpCamp/cmka3y5wqpaggg5pxrwm.jpg',
                    filename: 'YelpCamp/xwelab22dekrx6gqw31s',
                }
            ]
        })
        await camp.save();

    }
}

seedDB().then(() => {
    mongoose.connection.close();
})