import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

//const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

//FOR STOCKS
    //const UIInquireStocks = React.lazy(() => import('./Pages/Stocks/InquireStocks_OLD.js'));
    const UIInquireStocks = React.lazy(() => import('./Pages/Stocks/InquireStocks'));
    const UIAddStocks = React.lazy(() => import('./Pages/Stocks/AddStocks'));
    const UIModifyStocks = React.lazy(() => import('./Pages/Stocks/ModifyStocks'));
    //const UIModifyStocks2 = React.lazy(() => import('./Pages/Stocks/ModifyStocks'));
    const UIModifyStockDetails = React.lazy(() => import('./Pages/Stocks/ModifyStockDetails'));
    const UIStocksHistory = React.lazy(() => import('./Pages/Stocks/StocksHistory'));

//FOR PARAMETER
    const UIInquireParameter = React.lazy(() => import('./Pages/Parameter/InquireParameter'));
    const UIUpdateParameter = React.lazy(() => import('./Pages/Parameter/UpdateParameter'));

//FOR PARAMETER
    const UIInquireUsers = React.lazy(() => import('./Pages/Users/InquireUsers'));
    const UIInquireUsers2 = React.lazy(() => import('./Pages/Users/InquireUsers2'));
    const UIUpdateUsers = React.lazy(() => import('./Pages/Users/UpdateUsers'));

//FOR REPORTS
    const UIReportStocks = React.lazy(() => import('./Pages/Reports/ReportStocks'));
    const UIReportStocksPDF = React.lazy(() => import('./Pages/Reports/ReportStocksPDF'));

    const UIReportStocks2 = React.lazy(() => import('./Pages/Reports/ReportStocks2'));
    const UIReportStocks2PDF = React.lazy(() => import('./Pages/Reports/ReportStocks2PDF'));

    const UIReportItem = React.lazy(() => import('./Pages/Reports/ReportItem'));
    const UIReportItemPDF = React.lazy(() => import('./Pages/Reports/ReportItemPDF'));

// const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
// const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
// const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

// const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
// const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
// const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

// const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

// const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

// const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

// const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

// const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
// const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    //{ path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/stocks/inquire', exact: true, name: 'Inquire Stocks', component: UIInquireStocks },
    { path: '/stocks/add', exact: true, name: 'Basic Badges', component: UIAddStocks },
    { path: '/stocks/modify', exact: true, name: 'Modify Stocks', component: UIModifyStocks },
    //{ path: '/stocks/modify2', exact: true, name: 'Modify Stocks 2', component: UIModifyStocks2 },
    { path: '/stocks/modify/details', exact: true, name: 'Modify Stocks Details', component: UIModifyStockDetails },
    //{ path: '/stocks/inquire2', exact: true, name: 'Inquire Stocks 2', component: UIInquireStocks2 },
    { path: '/stocks/history', exact: true, name: 'Inquire Stocks 2', component: UIStocksHistory },
    
    { path: '/parameter/inquire', exact: true, name: 'Inquire Parameters', component: UIInquireParameter },
    { path: '/parameter/update', exact: true, name: 'Update Parameters', component: UIUpdateParameter },

    { path: '/users/inquire', exact: true, name: 'Inquire Users', component: UIInquireUsers },
    { path: '/users/update', exact: true, name: 'Update User', component: UIUpdateUsers },
    
    { path: '/reports/stocks', exact: true, name: 'Report 1', component: UIReportStocks },
    { path: '/reports/stocksPdf', exact: true, name: 'Report 2', component: UIReportStocksPDF },

    { path: '/reports/stocks2', exact: true, name: 'Report 1', component: UIReportStocks2 },
    { path: '/reports/stocksPdf2', exact: true, name: 'Report 1', component: UIReportStocks2PDF },

    { path: '/reports/item', exact: true, name: 'Report 1', component: UIReportItem },
    { path: '/reports/itemPdf', exact: true, name: 'Report 2', component: UIReportItemPDF },
    
    // { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    // { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    // { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    // { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    // { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    // { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    // { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    // { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;