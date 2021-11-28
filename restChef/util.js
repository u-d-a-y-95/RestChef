

const utils = {}


utils.getMatchingRoute = (req,routeStack) =>{
    const {pathname} = req
    return routeStack.find(route=>{
        console.log(route)
        return route?.isParamable? route.regexPath.test(pathname) : route.path === pathname
    })
}

utils.getParams= (route,req) =>{
    const paramKeys= route.path.match(/\/(:\w+)/g).map(item=>item.replace('/:',''))
    const matches = req.pathname.match(route?.regexPath)
    const params ={}
    paramKeys?.forEach((paramKey,index)=>{
        params[paramKey] = matches[index+1]
    })
    return params
}





module.exports = utils