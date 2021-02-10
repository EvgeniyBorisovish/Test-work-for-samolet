import React, { useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {START_LOAD_INITIAL_LIST,START_LOAD_FILTERED_LIST,CHANGE_FIND_TEXT} from '../constants/actions'
import nextId  from 'react-id-generator'
import { Spin, Space,Table,Input } from 'antd';
import { useHistory } from "react-router-dom";
import {debounce} from '../api/api'

export function ListLibraries() {

  const { Search } = Input;

  const history =useHistory()

  const loading  = useSelector(state=>state.action_proccesing.loading)

  const list  = useSelector(state=>state.filteredList.list)

  const findText  = useSelector(state=>state.filteredList.findText)

  const initialList_length  = useSelector(state=>state.initialList.list.length)

  const dispatch = useDispatch()

  useEffect(() => {
      if (list.length===0 ){
        dispatch({type:START_LOAD_INITIAL_LIST})
      }
      
  }, []);

const columns = [
  {
    title: 'Регион',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'Кол-во библиотек',
    dataIndex: 'countLibrary',
    key: 'countLibrary',
    sorter: (a, b) => a.countLibrary - b.countLibrary,
    },
]

const onClickHandler = (nameLibrary)=>{history.push(`/library/:${nameLibrary}`)}

const  onSearch = (value)=>{
  if (value.trim()!=="" || list.length===0){
    dispatch({type:START_LOAD_FILTERED_LIST,payload:value.trim()})
  }
}


const onChangeHandler = debounce(
  (value)=>{
     if (value.trim()!=="" || initialList_length===list.length ){ return}
      dispatch({type:START_LOAD_FILTERED_LIST,payload:""})},1000)

      
  return (
    <div className={`${loading?"mainConteiner-list":"mainConteiner-list_bacgroundColor-none mainConteiner-list"}`}>
      <h1>Cписок библиотек по регионам</h1>
     
      <Search
      placeholder="Введите название региона"
      allowClear
      enterButton="Поиск"
      size="large"
      onSearch={onSearch}
      disabled={loading}
      onChange={(e)=>{onChangeHandler(e.target.value);dispatch({type:CHANGE_FIND_TEXT,payload:e.target.value})}}
      value={findText}
      />
         
      {
      loading &&  <div className="mainConteiner-list__spin">
                    <Space size="middle">
                      <Spin size="large" />
                      <h1>Формирую данные...</h1>
                    </Space>
                  </div>

      }
      {
      !loading &&  
      <Table 
        dataSource={list}
        columns={columns}
        rowKey={()=>(nextId())}
        onRow={(record, rowIndex) => {return {onClick: event => { onClickHandler(record.region)}};}}
        className={"mainConteiner-list-table"}
        />
      }      
    </div>
  );
}
 