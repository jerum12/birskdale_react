import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ColumnDirective, ColumnsDirective, GridComponent, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { ExcelExport, ExcelExportProperties, Grid, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { data, employeeData } from './datasource.tsx';

export default class Report4 extends React.Component {
  firstGrid= null
  secondGrid= null; 
  toolbar= ['ExcelExport'];
  toolbarClick = (ClickEventArgs) => {
    if (this.firstGrid &&
        ClickEventArgs.item.id === 'FirstGrid_excelexport') {
      const ExcelExportProperties = {
        multipleExport: { type: 'AppendToSheet', blankRows: 2 }
      };
      const firstGridExport = this.firstGrid.excelExport(ExcelExportProperties, true);
      firstGridExport.then((fData) => {
        if (this.secondGrid) {
          this.secondGrid.excelExport(ExcelExportProperties, false, fData);
        }
      });
    }
}
  render() {
    this.toolbarClick = this.toolbarClick.bind(this);
    return (
      <div>
      <p><b>First Grid:</b></p>
      <GridComponent id='FirstGrid' dataSource={data.slice(0, 5)} toolbar={this.toolbar}
        allowExcelExport={true} toolbarClick={this.toolbarClick} ref={g => this.firstGrid = g}>
        <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'/>
            <ColumnDirective field='CustomerID' headerText='Customer ID' width='150'/>
            <ColumnDirective field='Freight' width='100' format='C2' textAlign='Right'/>
            <ColumnDirective field='OrderDate' width='140' format='yMd' textAlign='Right'/>
            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'/>
            <ColumnDirective field='ShipName' headerText='Ship Name' width='150' visible={false} />
        </ColumnsDirective>
        <Inject services={[Toolbar, ExcelExport]}/>
      </GridComponent>
      <p><b>Second Grid:</b></p>
      <GridComponent id='SecondGrid' dataSource={employeeData.slice(0, 5)}
        allowExcelExport={true} ref={g => this.secondGrid = g}>
        <ColumnsDirective>
          <ColumnDirective field='EmployeeID' headerText='Employee ID' width='120' textAlign="Right"/>
          <ColumnDirective field='FirstName' headerText='First Name' width='120'/>
          <ColumnDirective field='LastName' headerText='Last Name' width='120'/>
          <ColumnDirective field='Title' headerText='Title' width='150'/>
        </ColumnsDirective>
        <Inject services={[ExcelExport]}/>
      </GridComponent>
  </div>
    );
  }
}