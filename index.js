const hapi = require('hapi');
const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async() =>{
    await server.start();
    console.log(`server is running at :${server.info.uri}`)
    server.route({
        method:"GET",
        path:'/',
        handler: function(request,reply){
            return "<h1>Modern APi using Hapi </h1>"
        }
    });
};

init();