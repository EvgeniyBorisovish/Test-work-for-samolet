import { put,call, takeLatest, delay,select, all } from "redux-saga/effects";//,take, select
import {getData,get_initial_list} from '../api/api'
import { 
    START_LOAD_INITIAL_LIST,
    FINISH_LOAD_INITIAL_LIST,
    START_LOAD_FILTERED_LIST,
    FINISH_LOAD_FILTERED_LIST,
    START_PROCESSING,
    STOP_PROCESSING
} from "../constants/actions";


function* loadInitialList() {

    yield put({type:START_PROCESSING})
    yield delay(2000)
    try{

        const all_list = yield call(getData)

        const initial_list = yield call(get_initial_list,all_list)
      
        yield put({type:FINISH_LOAD_INITIAL_LIST,payload:{list:initial_list,all_list:all_list}})

        yield put({type:FINISH_LOAD_FILTERED_LIST,payload:initial_list})

        yield put({type:STOP_PROCESSING})

    }
    catch (error){
        yield put({type:STOP_PROCESSING})
    }
    
}

function* loadFilteredList(action) {
   
    yield put({type:START_PROCESSING})
    yield delay(2000)

    let filteredList = []

    if (action.payload===""){
         filteredList  = yield select(state=>state.initialList.list)
    }
    else{
         filteredList  = yield select(state=>state.initialList.list.filter(element=>element.region.toLowerCase().includes(action.payload.toLowerCase()))  )
    }

    yield put({type:FINISH_LOAD_FILTERED_LIST,payload:filteredList})
    yield put({type:STOP_PROCESSING})
    
}


function* fetch_data_initial_list() {
    yield takeLatest(START_LOAD_INITIAL_LIST, loadInitialList);
}


function* loadingFilteredList() {
    yield takeLatest(START_LOAD_FILTERED_LIST, loadFilteredList);
}


function* mySaga() {
    yield all([fetch_data_initial_list(),loadingFilteredList()]);
  }
  
  export default mySaga;

