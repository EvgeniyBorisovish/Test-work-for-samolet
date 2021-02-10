import { combineReducers } from "redux";

import {initialList} from './initialList'
import {filteredList} from './filteredList'
import {action_proccesing} from './action_proccesing'

export default combineReducers(
  {
    initialList,
    filteredList,
    action_proccesing
  }
)
