import React from 'react';
import {useParams,useHistory} from "react-router-dom";
import {useSelector} from 'react-redux'
import { Button } from 'antd';
import { Collapse } from 'antd';

export function Library() {

const params = useParams()  

const history = useHistory()

const dataLibrary = useSelector(state=>state.initialList.all_list.filter(element=>element.territory.includes(params.nameLibrary.slice(1).trim())))

const { Panel } = Collapse;

const onClickHandler = ()=>{history.push("/")}

  return (
    <div className="Libary">
      <Button type="primary" onClick={onClickHandler}>Вернуться к списку библиотек</Button>
      <div className="data_list">
        <Collapse defaultActiveKey={['1']}>
          {
          dataLibrary.map(( element, index )=>(
          <Panel header={element.fullname.trim()} key={index+1}>
            <pre>
              {JSON.stringify(element,null,2)}
            </pre>
          </Panel>))
          }
        </Collapse>
      </div>
    </div>
  );
}


