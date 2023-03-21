import express from 'express'
import Main from './Routes/Main'
import Anime from './Routes/Animes'
import path from 'node:path'
import './Structures/KitsuAPIManager'
import bodyParser from 'body-parser'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', Main);
app.use('/animes', Anime)

app.use(function(req, res, next) {
    res.status(404).send('<img src="https://i0.wp.com/boingboing.net/wp-content/uploads/2011/12/404.jpg?w=750">')
  });
  
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
