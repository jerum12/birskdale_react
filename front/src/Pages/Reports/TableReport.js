import React, {Fragment} from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import Moment from 'moment'

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

const subtotal = (items) => {
  let array = []
  array['size_run_3'] = items.map(({ size_run_3 }) => size_run_3).reduce((sum, i) => sum + i, 0);
  array['size_run_4'] = items.map(({ size_run_4 }) => size_run_4).reduce((sum, i) => sum + i, 0);
  array['size_run_5'] = items.map(({ size_run_5 }) => size_run_5).reduce((sum, i) => sum + i, 0);
  array['size_run_6'] = items.map(({ size_run_6 }) => size_run_6).reduce((sum, i) => sum + i, 0);
  array['size_run_7'] = items.map(({ size_run_7 }) => size_run_7).reduce((sum, i) => sum + i, 0);
  array['size_run_8'] = items.map(({ size_run_8 }) => size_run_8).reduce((sum, i) => sum + i, 0);
  array['size_run_9'] = items.map(({ size_run_9 }) => size_run_9).reduce((sum, i) => sum + i, 0);
  array['size_run_10'] = items.map(({ size_run_10 }) => size_run_10).reduce((sum, i) => sum + i, 0);
  array['size_run_11'] = items.map(({ size_run_11 }) => size_run_11).reduce((sum, i) => sum + i, 0);
  array['size_run_12'] = items.map(({ size_run_12 }) => size_run_12).reduce((sum, i) => sum + i, 0);
  array['size_run_13'] = items.map(({ size_run_13 }) => size_run_13).reduce((sum, i) => sum + i, 0);
  array['size_run_14'] = items.map(({ size_run_14 }) => size_run_14).reduce((sum, i) => sum + i, 0);
  array['total_size_run'] = items.map(({ total_size_run }) => total_size_run).reduce((sum, i) => sum + i, 0);
  
  return array;
}



function TableReport({category, value, index, length, originalData}){

  const subTotalSizeRun = subtotal(value);
  const totalSizeRun = subtotal(originalData);
    return (
        <Table aria-label="spanning table"  id="table-test" >
            <TableHead>
                  <TableRow>
                      <TableCell align="left" colSpan={15}>
                        Gender : <span style={{color : 'red', fontSize : '15px', fontWeight : 'bold'}}>{category}</span>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell style={{backgroundColor: '#203356', color: '#FFF'}}>Transaction Date</TableCell>
                      <TableCell style={{backgroundColor: '#203356', color: '#FFF'}}>Stock Details</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 3</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 4</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 6</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 7</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 8</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 9</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 10</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 11</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 12</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 13</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Size Run 14</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Total Size Run</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.map((row) => (
                      <TableRow key={row._id}>
                      <TableCell>{Moment(row.transaction_date).format('MM-DD-YYYY HH:mm:ss')}</TableCell>
                      <TableCell style={{width : '200px'}}>{row.stock_details}</TableCell>
                      <TableCell align="right">{row.size_run_3}</TableCell>
                      <TableCell align="right">{row.size_run_4}</TableCell>
                      <TableCell align="right">{row.size_run_5}</TableCell>
                      <TableCell align="right">{row.size_run_6}</TableCell>
                      <TableCell align="right">{row.size_run_7}</TableCell>
                      <TableCell align="right">{row.size_run_8}</TableCell>
                      <TableCell align="right">{row.size_run_9}</TableCell>
                      <TableCell align="right">{row.size_run_10}</TableCell>
                      <TableCell align="right">{row.size_run_11}</TableCell>
                      <TableCell align="right">{row.size_run_12}</TableCell>
                      <TableCell align="right">{row.size_run_13}</TableCell>
                      <TableCell align="right">{row.size_run_14}</TableCell>
                      <TableCell align="right">{row.total_size_run}</TableCell>
                      {/* <TableCell align="right">{ccyFormat(row.price)}</TableCell> */}
                      </TableRow>
                  ))}

                  <TableRow>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>Subtotal</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_3}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_4}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_6}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_7}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_8}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_9}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_10}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_11}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_12}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_13}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.size_run_14}</TableCell>
                      <TableCell align="right" style={{fontSize : '15px', color : 'red'}}>{subTotalSizeRun.total_size_run}</TableCell>
                  </TableRow>

                  {
                    (parseInt(index)+1) === length && 
                    <TableRow>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>Total</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_3}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_4}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_6}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_7}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_8}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_9}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_10}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_11}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_12}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_13}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_14}</TableCell>
                      <TableCell align="right" style={{fontSize : '20px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.total_size_run}</TableCell>
                    </TableRow>
                  }
                 
                </TableBody>
        </Table>
    );
}

export default TableReport;