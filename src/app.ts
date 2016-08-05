import * as path from "path";  
import * as express from "express"; 
// import webpack from 'webpack';  
// import webpackMiddleware from 'webpack-dev-middleware';  
// import config from './webpack.config.js';

const app = express();  
//const compiler = webpack(config);

app.use(express.static('./dist/static'));
//app.use(webpackMiddleware(compiler);  
app.get('/', function response(req, res) {  
   res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(3000);  