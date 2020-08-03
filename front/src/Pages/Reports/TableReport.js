import React, {Fragment} from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';


const TAX_RATE = 0.07;


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

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;


function TableReport({item}){
    console.log(item)
    return (
        <Fragment>
            <TableHead>
                  <TableRow>
                      <TableCell align="left" colSpan={14}>
                        Gender : Male
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>Transaction Date</TableCell>
                      <TableCell>Stock Details</TableCell>
                      <TableCell align="right">Size Run 3</TableCell>
                      <TableCell align="right">Size Run 4</TableCell>
                      <TableCell align="right">Size Run 5</TableCell>
                      <TableCell align="right">Size Run 6</TableCell>
                      <TableCell align="right">Size Run 7</TableCell>
                      <TableCell align="right">Size Run 8</TableCell>
                      <TableCell align="right">Size Run 9</TableCell>
                      <TableCell align="right">Size Run 10</TableCell>
                      <TableCell align="right">Size Run 11</TableCell>
                      <TableCell align="right">Size Run 12</TableCell>
                      <TableCell align="right">Size Run 13</TableCell>
                      <TableCell align="right">Size Run 14</TableCell>
                      <TableCell align="right">Total Size Run</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                      <TableRow key={row.desc}>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                      </TableRow>
                  ))}

                  <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell colSpan={2}>Subtotal</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                  </TableRow>

                </TableBody>
        </Fragment>
    );
}

export default TableReport;