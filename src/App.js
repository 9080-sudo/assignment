
import "./App.css";
import Table from './Components/Table';
const App=() => {
  // State to store parsed data
  // for(let i=0;i<parsedData.length;i++){
  //   let index = objectData.find(data => data.name === parsedData.name);
  //   let key =  parsedData[i].batch
  //   console.log(index)
  //   if(index !== undefined){
  //     console.log(2344444)
  //     let index = objectData.findIndex((data) => data.name = parsedData[i].name);
  //     objectData[index][parsedData[i].batch] = {stock: parsedData[i].stock,mrp: parsedData[i].mrp,deal: parsedData[i].deal,free: parsedData[i].free,exp: parsedData[i].exp,rate: parsedData[i].rate}
  //   }
  //   else
  //   {
  //     objectData.push({
  //       name: parsedData[i].name,
  //     })
  //     objectData[objectData.length-1][parsedData[i].batch] = {stock: parsedData[i].stock,mrp: parsedData[i].mrp,deal: parsedData[i].deal,free: parsedData[i].free,exp: parsedData[i].exp,rate: parsedData[i].rate}
  //   }
  // }
 // console.log(objectData);

  return (
     <Table/>
    );
};

export default App;