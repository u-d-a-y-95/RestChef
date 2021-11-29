const utils = require("./util")

const routeStack = {}

const route = {}

const pushRouteToStack = (...args) =>{
    const length = args.length
    const obj = {
        path:args[1][args[1].length-1] === "/" ? args[1].slice(0,args[1].length-1): args[1],
        controller:args[length-1],
        method:args[0],
        isParamable:false
    }
    if(args[1].includes('/:')){
        obj.isParamable = true
        const regex = /:\w+/g
        obj.regexPath = new RegExp('^'+obj.path.replace(regex,'(\\w+)')+'$')
    }
    if(length>3){
        obj.middlewares= args.slice(2,length-1)
    }
    if(routeStack[args[0].trim()]){
        routeStack[args[0]].push(obj)
    }else{
        routeStack[args[0]] = [obj];
    }
}








route.get = pushRouteToStack.bind(this,'get')
route.post = pushRouteToStack.bind(this,'post')
route.delete = pushRouteToStack.bind(this,'delete')
route.put = pushRouteToStack.bind(this,'put')
route.patch = pushRouteToStack.bind(this,'patch')


route.getCurrentRoute = (req) =>utils.getMatchingRoute(req,routeStack[req.method])

module.exports = route