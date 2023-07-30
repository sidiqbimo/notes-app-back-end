const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes:{
      cors:{
        origin:['*'], //* = allow access to all dir
        // Same-origin policy : app client cuma bisa akses data dari origin yang sama, tapi dengan cara di atas, boleh beda origin portnya
      }
    }
  });
 
  server.route(routes);

  await server.start();
  console.log(`Server wis mlaku nang ${server.info.uri}`);
};
 
 
init();