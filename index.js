const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

// connect to mongodb
mongoose.connect(
    'mongodb://localhost/mongo-node-graphql',
    { useNewUrlParser: true, useCreateIndex: true },
    // eslint-disable-next-line no-unused-vars
    function (req, res) {
        console.log('connected to mongodb !!');
    }
);

const init = async () => {
    await server.start();
    console.log(`server is running at :${server.info.uri}`)
    server.route([
        {
            method: "GET",
            path: '/',
            handler: function (request, reply) {
                return "<h1>Modern APi using Hapi </h1>"
            }
        },
        {
            method: "GET",
            path: '/api/v1/paintings',
            handler: (req, reply) => {
              return Painting.find();
            }
        },
        {
            method: "POST",
            path: '/api/v1/paintings',
            handler:  (req, reply) =>  {
                const {name, url, techniques} = req.payload;
                const painting = new Painting({
                    name,
                    url,
                    techniques
                })
                return painting.save();
            }
        }
    ]);
};

init();