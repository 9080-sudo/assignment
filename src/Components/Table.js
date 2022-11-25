import { Fragment, useState, useEffect } from "react";
import Papa, { parse } from "papaparse";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
import {process , dev} from "../utils/utils";
import { paste } from "@testing-library/user-event/dist/paste";
import SingleRow from "./SingleRow";
import classes from './Table.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const itemsPerPage = 10;
let requiredSheetData = [];

let objectData = [];

const Table = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [temp, setTemp] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [filteredData,setFilteredData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  const [requiredSheetData, setrequiredSheetData] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = async (event) => {
    Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            setrequiredSheetData(process(results.data));
            setTemp(true);
        },
      });
  };

//   setrequiredSheetData(process(parsedData));

  console.log(requiredSheetData);
  useEffect(() => {
    //console.log(requiredSheetData, "welcome to  useeffect");
    const endOffset = itemOffset + itemsPerPage;
    setFilteredData(requiredSheetData.slice(itemOffset, endOffset),)
    setCurrentItems(requiredSheetData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(requiredSheetData.length / itemsPerPage));
  }, [requiredSheetData, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % requiredSheetData.length;
    setItemOffset(newOffset);
  };

  return (
    <Fragment>
      <center><h1>Inventory Details</h1></center>
      <input
        className={classes.input}
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      {temp && (
        <div >
          <center>
            <table border={1} style={{backgroundColor:'#ccccff'}}  
              className = "table table-hover"
            >
              <tr 
              style={{
                backgroundColor: '#66ff99',
                fontWeight: 'bold'}}>
                <td>Name</td>
                <td>Batch</td>
                <td>Stock</td>
                <td>Deal</td>
                <td>Free</td>
                <td>MRP</td>
                <td>Rate</td>
                <td>exp</td>
              </tr>
              <tbody className="thead-light">
              {filteredData.map((data) => {
                //{console.log(data);}
                return (
                    <SingleRow tableRow={data} key={Math.random().toString()}/>
                );
                })
            }
            </tbody>
            </table>
            <ReactPaginate
              previousLabel="<-Previous"
              nextLabel="Next->"
              pageCount={pageCount}
              pageRangeDisplayed={3}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              previousLinkClassName="page-num"
              pageLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            ></ReactPaginate>
          </center>
        </div>
      )}
    </Fragment>
  );
};
export default Table;
