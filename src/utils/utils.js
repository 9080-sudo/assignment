import Papa, { parse } from "papaparse";
export function process(parsedData) {
  let requiredSheetData = [];
  for (let i = 0; i < parsedData.length; i++) {
    let temp2 = requiredSheetData.find(
      (data) => data.name === parsedData[i].name
    );
    if (temp2) {
      let index = requiredSheetData.findIndex(
        (data) => (data.name === parsedData[i].name)
      );
      requiredSheetData[index].stock = Number(requiredSheetData[index].stock);
      requiredSheetData[index].stock += Number(parsedData[i].stock);
      requiredSheetData[index].mrp =
        requiredSheetData[index].mrp > parsedData[i].mrp
          ? requiredSheetData[index].mrp
          : parsedData[i].mrp;
      requiredSheetData[index].deal =
        requiredSheetData[index].deal < parsedData[i].deal
          ? requiredSheetData[index].deal
          : parsedData[i].deal;
      requiredSheetData[index].free =
        requiredSheetData[index].free < parsedData[i].free
          ? requiredSheetData[index].free
          : parsedData[i].free;
      const d1 = new Date(requiredSheetData[index].exp);
      const d2 = new Date(parsedData.exp);
      if (d1 > d2) requiredSheetData[index].exp = parsedData.exp;
      requiredSheetData[index].rate =
        requiredSheetData[index].rate > parsedData[i].rate
          ? requiredSheetData[index].rate
          : parsedData[i].rate;
    } else {
      requiredSheetData.push(parsedData[i])
    }
  }
  let objectData = [];

  for(let i=0;i<parsedData.length;i++){
    let temp2 = objectData.find(data => data.name === parsedData[i].name);
    if(temp2 !== undefined){
      let index = objectData.findIndex((data) => data.name === parsedData[i].name);
      objectData[index][parsedData[i].batch] = {stock: parsedData[i].stock,mrp: parsedData[i].mrp,deal: parsedData[i].deal,free: parsedData[i].free,exp: parsedData[i].exp,rate: parsedData[i].rate}
    }
    else
    {
      objectData.push({
        name: parsedData[i].name,
      })
      let index = objectData.findIndex((data) => data.name === parsedData[i].name);
      objectData[index][parsedData[i].batch] = {stock: parsedData[i].stock,mrp: parsedData[i].mrp,deal: parsedData[i].deal,free: parsedData[i].free,exp: parsedData[i].exp,rate: parsedData[i].rate}
    }
  }
 
  for(let i=0;i<requiredSheetData.length;i++){
    let index = objectData.findIndex(data=>data.name === requiredSheetData[i].name);
    objectData[index]['ALL'] = {stock:requiredSheetData[i].stock,mrp:requiredSheetData[i].mrp,deal:requiredSheetData[i].deal,free:requiredSheetData[i].free,exp:requiredSheetData[i].exp,rate:requiredSheetData[i].rate}
  }
  let objectData2 = [];
  for(let i=0;i<objectData.length;i++){
    if(objectData[i].ALL !== undefined)
      objectData2.push(objectData[i]);
  }
  console.log(objectData2,9876)
  return objectData2;
}

export async function dev(event){
    const data =  Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            return results
        },
      });

    
}

