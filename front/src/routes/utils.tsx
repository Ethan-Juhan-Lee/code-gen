import { Route, RouteObject, Routes } from "react-router-dom";

export const createRoutes = (routeObject: RouteObject) => {
  const _helper = (routeObject: RouteObject) => {
    if ('index' in routeObject && routeObject.index) {
      const routeProps = routeObject
      return (
          <Route {...routeProps}/>
      )
    }
    const {children, ...routeProps} = routeObject
    const r = children && children.map(createRoutes)
    return (
        <Route {...routeProps}>
          {/* <Routes>
            
          </Routes> */}
        </Route>
    )
  }
  return _helper(routeObject)
}

export const Foo = <Routes>
  <Route path="/1"><div>1</div></Route>
  <Route path='2'><div>1</div></Route>
  <Route path="3"><div>1</div></Route>
</Routes>