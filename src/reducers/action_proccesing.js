import {START_PROCESSING,STOP_PROCESSING} from '../constants/actions'

const initialState = {loading:false}

export const action_proccesing = (state = initialState,action)=> {
    
    switch (action.type) {
        
        case START_PROCESSING:

            return {loading:true}
        
        case STOP_PROCESSING:

            return {loading:false}

        default:

            return state;

    }

  }