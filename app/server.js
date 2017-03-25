require('babel-register')

var L = require('leaflet-headless')

const express = require('express')
const server = express()
const path = require('path')

server.use('/public', express.static('./public'))

require('lodash-express')(server, 'html')
server.set('view engine', 'html')
server.set('views', path.join(__dirname, 'views'))

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const ServerRouter = ReactRouter.ServerRouter

const App = require('./src/modules/App').default

server.use((req, res) => {
    const context = ReactRouter.createServerRenderContext()
    const body = ReactDOMServer.renderToString(
        React.createElement(
            ServerRouter,
            { location: req.url, context: context },
            React.createElement(App)
        )
    )
    res.render('index', { body: body })
})

const port = 3030
console.log('listening on ' + port)
server.listen(port)