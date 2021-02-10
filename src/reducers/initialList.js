import {START_LOAD_INITIAL_LIST,FINISH_LOAD_INITIAL_LIST,CLEAR_INITIAL_LIST} from '../constants/actions'

const initialState = {list:[],all_list:[]}

export const initialList = (state = initialState,action)=> {
    
    switch (action.type) {
        case START_LOAD_INITIAL_LIST:

            return {  
                ...initialState              
            }      

        case FINISH_LOAD_INITIAL_LIST:

            return { ...state ,list:action.payload.list,all_list:action.payload.all_list}
          
        default:

            return state;

    }

  }