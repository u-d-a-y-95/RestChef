const http = require("http")
const { StringDecoder } = require('string_decoder')
const url = require('url')

const route = require('./route')
const utils = require("./util")





const restChef = (port, cb) => {


    const app = http.createServer((req, res) => {


        /*
         * 
         * req.pathname 
         * req.method
         * req.query,
         * req.params
         * req.body
         * 
         * 
         */

        // extends request propertise

        const parsedUrl = url.parse(req.url, true)
        req.pathname = parsedUrl.pathname[parsedUrl.pathname.length-1] === '/' ?  parsedUrl.pathname.slice(0,parsedUrl.pathname.length-1) : parsedUrl.pathname
        req.query = parsedUrl.query;
        req.method = req.method.toLowerCase();
        const decoder = new StringDecoder('utf-8');
        let body = ''
        req.on('data', buffer => {
            body += decoder.write(buffer)
        })
        req.on('end', () => {
            body += decoder.end()
            req.body = JSON.parse(body)

            // find route 

            const currentRoute = route.getCurrentRoute(req)
            if (currentRoute) {
                req.param= currentRoute?.isParamable ? utils.getParams(currentRoute,req) :{}
                currentRoute.controller(req, res)
            } else {
                res.statusCode=404
                res.end("No Page found")
            }
        })



    })

    app.listen(port, cb)
    app.get = route.get
    app.post = route.post
    app.delete = route.delete
    app.put = route.put
    app.patch = route.patch
    return app
}

module.exports = restChef

