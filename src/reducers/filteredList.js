import {START_LOAD_FILTERED_LIST,FINISH_LOAD_FILTERED_LIST,CHANGE_FIND_TEXT} from '../constants/actions'

const initialState = {list:[],findText:""}

export const filteredList = (state = initialState,action)=> {
    
    switch (action.type) {
        case START_LOAD_FILTERED_LIST:

            return {  
                list:[],findText:state.findText              
            }      

        case FINISH_LOAD_FILTERED_LIST:
            
            return {...state,list:[...action.payload]}

        case CHANGE_FIND_TEXT:
                
                return {...state,findText:action.payload}
               


        default:

            return state;

    }

  }