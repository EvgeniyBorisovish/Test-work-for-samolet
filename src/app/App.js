import React from 'react';
import {Switch,Route} from 'react-router-dom'
import ListLibraries from '../ListLibraries'
import Library from '../Library'

export function App() {

  return (
         <div className="mainConteiner">
         <Switch>
          <Route exact path="/">
            <ListLibraries />
          </Route>
          <Route path="/library/:nameLibrary">
            <Library />
          </Route>
        </Switch>
        </div>
  );
}
