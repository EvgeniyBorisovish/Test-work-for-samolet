export function getData() {
  return fetch('opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json')
  //fetch('https://data.gov.ru/sites/default/files/opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json')
  .then(response => response.json())
}


export function  get_initial_list(all_list){
  const obj_data =  all_list.reduce((obj,element)=>{ 
      obj[element.territory]  = (obj[element.territory]===undefined?0:obj[element.territory])+element.libraries
      return obj; 
  },{})
  
  const initial_list =  Object.keys(obj_data).map(element=>{ 

      const obj={}; obj.region=element.trim(); obj.countLibrary=obj_data[element]; return obj}).sort((a,b)=>{
      if (a.region.toLowerCase()<b.region.toLowerCase()){
          return -1
      }
      else if (a.region.toLowerCase()>b.region.toLowerCase()){
          return 1
      }
      else{
          return 0
      }
  })
  return initial_list
}

export const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => { fn.apply(this, arguments) }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
  };
}