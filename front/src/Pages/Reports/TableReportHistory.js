import React, {Fragment} from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import Moment from 'moment'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '5px',
        border: '1px solid black !important',
        width: '100px',
        fontSize: '12px'
      }
    }
  }
});

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
  array['size_run_2'] = items.map(({ size_run_2 }) => size_run_2).reduce((sum, i) => sum + i, 0);
  array['size_run_2_5'] = items.map(({ size_run_2_5 }) => size_run_2_5).reduce((sum, i) => sum + i, 0);
  array['size_run_3'] = items.map(({ size_run_3 }) => size_run_3).reduce((sum, i) => sum + i, 0);
  array['size_run_3_5'] = items.map(({ size_run_3_5 }) => size_run_3_5).reduce((sum, i) => sum + i, 0);
  array['size_run_4'] = items.map(({ size_run_4 }) => size_run_4).reduce((sum, i) => sum + i, 0);
  array['size_run_4_5'] = items.map(({ size_run_4_5 }) => size_run_4_5).reduce((sum, i) => sum + i, 0);
  array['size_run_5'] = items.map(({ size_run_5 }) => size_run_5).reduce((sum, i) => sum + i, 0);
  array['size_run_5_5'] = items.map(({ size_run_5_5 }) => size_run_5_5).reduce((sum, i) => sum + i, 0);
  array['size_run_6'] = items.map(({ size_run_6 }) => size_run_6).reduce((sum, i) => sum + i, 0);
  array['size_run_6_5'] = items.map(({ size_run_6_5 }) => size_run_6_5).reduce((sum, i) => sum + i, 0);
  array['size_run_7'] = items.map(({ size_run_7 }) => size_run_7).reduce((sum, i) => sum + i, 0);
  array['size_run_7_5'] = items.map(({ size_run_7_5 }) => size_run_7_5).reduce((sum, i) => sum + i, 0);
  array['size_run_8'] = items.map(({ size_run_8 }) => size_run_8).reduce((sum, i) => sum + i, 0);
  array['size_run_8_5'] = items.map(({ size_run_8_5 }) => size_run_8_5).reduce((sum, i) => sum + i, 0);
  array['size_run_9'] = items.map(({ size_run_9 }) => size_run_9).reduce((sum, i) => sum + i, 0);
  array['size_run_9_5'] = items.map(({ size_run_9_5 }) => size_run_9_5).reduce((sum, i) => sum + i, 0);
  array['size_run_10'] = items.map(({ size_run_10 }) => size_run_10).reduce((sum, i) => sum + i, 0);
  array['size_run_10_5'] = items.map(({ size_run_10_5 }) => size_run_10_5).reduce((sum, i) => sum + i, 0);
  array['size_run_11'] = items.map(({ size_run_11 }) => size_run_11).reduce((sum, i) => sum + i, 0);
  array['size_run_11_5'] = items.map(({ size_run_11_5 }) => size_run_11_5).reduce((sum, i) => sum + i, 0);
  array['size_run_12'] = items.map(({ size_run_12 }) => size_run_12).reduce((sum, i) => sum + i, 0);
  array['size_run_13'] = items.map(({ size_run_13 }) => size_run_13).reduce((sum, i) => sum + i, 0);
  array['total'] = items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
  
  return array;
}


const details = (items) => {
    let data = ''
    items.map(({stocks_id}) => {
            data = ''

          if(stocks_id.stock_no.description != '' && stocks_id.stock_no.description  != 'NOT AVAILABLE'){
                data +=  '<span style="color:red;font-weight:bold">SN</span>: ' + stocks_id.stock_no.description + '; '
          }

          if(stocks_id.gender.description != '' && stocks_id.gender.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">G</span>: ' + stocks_id.gender.description + '; '
          }
          
          if(stocks_id.leather_type.description != '' && stocks_id.leather_type.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">LT</span>: ' + stocks_id.leather_type.description+ '; '
          }

          if(stocks_id.color.description != '' && stocks_id.color.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">C</span>: ' + stocks_id.color.description+ '; '
          }

          if(stocks_id.classification_1.description != '' && stocks_id.classification_1.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">C1</span>: ' + stocks_id.classification_1.description+ '; '
          }

          if(stocks_id.classification_2.description != '' && stocks_id.classification_2.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">C2</span>: ' + stocks_id.classification_2.description+ '; '
          }

          if(stocks_id.logo.description != '' && stocks_id.logo.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">Lo</span>: ' + stocks_id.logo.description+ '|; '
          }

          if(stocks_id.sub_logo.description != '' && stocks_id.sub_logo.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">SLo</span>: ' + stocks_id.sub_logo.description+ '; '
          }

          if(stocks_id.stitch.description != '' && stocks_id.stitch.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">S</span>: ' + stocks_id.stitch.description+ '; '
          }

          if(stocks_id.lining.description != '' && stocks_id.lining.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">Li</span>: ' + stocks_id.lining.description+ '; '
          }

          if(stocks_id.canvass.description != '' && stocks_id.canvass.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">Cv</span>: ' + stocks_id.canvass.description+ '; '
          }

          if(stocks_id.midsole.description != '' && stocks_id.midsole.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">Ms</span>: ' + stocks_id.midsole.description+ '; '
          }

          if(stocks_id.outsole.description != '' && stocks_id.outsole.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">Os</span>: ' + stocks_id.outsole.description+ '; '
          }

          if(stocks_id.sock_liner.description != '' && stocks_id.sock_liner.description != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">SLi</span>: ' + stocks_id.sock_liner.description+ '; '
          }

          if(stocks_id.special_instruction != '' && stocks_id.special_instruction != 'NOT AVAILABLE'){
            data +=  '<span style="color:red;font-weight:bold">SI</span>: ' + stocks_id.special_instruction+ '; '
          }



          //  data =       '<span style="color:red;font-weight:bold">SN</span>: ' + stocks_id.stock_no.description + '; ' +
          //               '<span style="color:red;font-weight:bold">LT</span>: ' + stocks_id.leather_type.description + '; ' +
          //               '<span style="color:red;font-weight:bold">G</span>: ' + stocks_id.gender.description + '; ' +
          //               '<span style="color:red;font-weight:bold">C</span>: ' + stocks_id.color.description + '; ' +
          //               '<span style="color:red;font-weight:bold">C1</span>: ' + stocks_id.classification_1.description + '; ' +
          //               '<span style="color:red;font-weight:bold">C2</span>: ' + stocks_id.classification_2.description + '; ' +
          //               '<span style="color:red;font-weight:bold">Lo</span>: ' + stocks_id.logo.description + '; ' +
          //               '<span style="color:red;font-weight:bold">Slo</span>: ' + stocks_id.sub_logo.description + '; ' +
          //               '<span style="color:red;font-weight:bold">S</span>: ' + stocks_id.stitch.description + '; ' +
          //               '<span style="color:red;font-weight:bold">Li</span>: ' + stocks_id.lining.description + '; ' +
          //               '<span style="color:red;font-weight:bold">SI</span>: ' + stocks_id.special_instruction;
    })
    return data
}



function TableReportHistory({category, value, index, length, originalData}){

  const subTotalSizeRun = subtotal(value);
  const totalSizeRun = subtotal(originalData);
    return (
      <MuiThemeProvider theme={theme}>
        <br/>
        <Table aria-label="spanning table"  id={`table_${index}`} >
            <TableHead>
                  <TableRow>
                      <TableCell align="left" colSpan={25}>
                        {/* Stock Details : <span style={{color : 'red', fontSize : '15px', fontWeight : 'bold'}}>{details(value)}</span> */}
                        Stock Details :  <span style={{fontSize : '12px', fontWeight : 'bold'}} dangerouslySetInnerHTML={{ __html: details(value)}} />
                        &nbsp;
                        <span style={{float : 'right'}}>Count : <b>{value.length}</b></span>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell style={{backgroundColor: '#203356', color: '#FFF'}}>Transaction Date</TableCell>
                      <TableCell style={{backgroundColor: '#203356', color: '#FFF'}}>Transaction By</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>2</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>2.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>3</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>3.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>4</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>4.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>5.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>6</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>6.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>7</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>7.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>8</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>8.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>9</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>9.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>10</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>10.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>11</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>11.5</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>12</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>13</TableCell>
                      <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF',}}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.map((row) => (
                      <TableRow key={row._id}>
                      <TableCell>{Moment(row.transaction_date).format('MM-DD-YYYY HH:mm:ss')}</TableCell>
                      <TableCell align="right">{row.transaction_by.full_name}</TableCell>
                      <TableCell align="right">{row.size_run_2}</TableCell>
                      <TableCell align="right">{row.size_run_2_5}</TableCell>
                      <TableCell align="right">{row.size_run_3}</TableCell>
                      <TableCell align="right">{row.size_run_3_5}</TableCell>
                      <TableCell align="right">{row.size_run_4}</TableCell>
                      <TableCell align="right">{row.size_run_4_5}</TableCell>
                      <TableCell align="right">{row.size_run_5}</TableCell>
                      <TableCell align="right">{row.size_run_5_5}</TableCell>
                      <TableCell align="right">{row.size_run_6}</TableCell>
                      <TableCell align="right">{row.size_run_6_5}</TableCell>
                      <TableCell align="right">{row.size_run_7}</TableCell>
                      <TableCell align="right">{row.size_run_7_5}</TableCell>
                      <TableCell align="right">{row.size_run_8}</TableCell>
                      <TableCell align="right">{row.size_run_8_5}</TableCell>
                      <TableCell align="right">{row.size_run_9}</TableCell>
                      <TableCell align="right">{row.size_run_9_5}</TableCell>
                      <TableCell align="right">{row.size_run_10}</TableCell>
                      <TableCell align="right">{row.size_run_10_5}</TableCell>
                      <TableCell align="right">{row.size_run_11}</TableCell>
                      <TableCell align="right">{row.size_run_11_5}</TableCell>
                      <TableCell align="right">{row.size_run_12}</TableCell>
                      <TableCell align="right">{row.size_run_13}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                      {/* <TableCell align="right">{ccyFormat(row.price)}</TableCell> */}
                      </TableRow>
                  ))}

                  <TableRow>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>Subtotal</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_2}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_2_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_3}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_3_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_4}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_4_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_5_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_6}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_6_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_7}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_7_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_8}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_8_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_9}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_9_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_10}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_10_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_11}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_11_5}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_12}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.size_run_13}</TableCell>
                      <TableCell align="right" style={{fontSize : '12px', color : 'red'}}>{subTotalSizeRun.total}</TableCell>
                  </TableRow>

                  {
                    (parseInt(index)+1) === length && 
                    <Fragment>
                      <TableRow>
                      <TableCell  colSpan={25}>&nbsp;</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>&nbsp;</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>Total</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_2}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_2_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_3}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_3_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_4}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_4_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_5_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_6}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_6_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_7}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_7_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_8}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_8_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_9}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_9_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_10}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_10_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_11}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_11_5}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_12}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.size_run_13}</TableCell>
                        <TableCell align="right" style={{fontSize : '12px', color : 'red', fontWeight : 'bold'}}>{totalSizeRun.total}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                 
                </TableBody>
        </Table>
      </MuiThemeProvider>
    );
}

export default TableReportHistory;