
// import React, {Component, Fragment} from 'react';

// import TableContainer from '@material-ui/core/TableContainer';
// import axios from 'axios';

// import Paper from '@material-ui/core/Paper';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import { PDFViewer } from '@react-pdf/renderer';

// import TableReport from './TableReport'


// class Example extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       data : [],
//       loading : true

//     }
//   }
  
//     //get stocks onload
//    componentDidMount() {
//       this.getData();
//    }

 
//    groupBy = (objectArray, property) => {
//       return objectArray.reduce(function (acc, obj) {
//         var key = obj[property].description;
//         var test = [];
//         if (!acc[key]) {
//           acc[key] = [];
//         }
//         acc[key].push(obj);
        
        
//         console.log("-----------------")
//         return acc;
//       }, {});
//    }

//    groupBy2 = (array, key) => {
//     return array.reduce((result, currentValue) => {
        
//       (result[currentValue.gender.description] = result[currentValue.gender.description] || []).push(
//         currentValue
//       );
//       //console.log(result);
//       return result;
//     }, {});
//   };

//    getData = () => {
//       axios({
//         method: 'GET',
//         url: 'http://localhost:5000/api/stocks/data',
//         headers: {
//           'Content-Type': 'application/json',
//           'authorization' : sessionStorage.getItem('jwtTokenKey')
//         }
//       })
//         .then(response => {
//             //console.log(response.data.data)
//             //console.log(this.groupBy(response.data.data, response.data.data.gender))
//             var groupedData = this.groupBy2(response.data.data, 'gender');
//             this.setState({ data: groupedData, loading : false })
            
//         })
//         .catch(err => {
//             console.log(err);
//             this.setState({ loading : false })
//             return null;
//         });
//  };

//     render() {
//       const {data,loading } = this.state;
      

//       if(loading)
//         return  (
//                   <Backdrop  style={{color : '#fff'}} open={true}>
//                     <CircularProgress color="inherit" />
//                   </Backdrop>
//                 )
//             else{
//                 const items = []
//                   for (const [key, value] of Object.entries(data)) {  
//                     items.push(<TableReport  key={key} category={key} value={value}/>);
//                   }

//                 return (
//                     <Fragment>
//                     <TableContainer component={Paper}>
//                             {items}
//                     {/* {<Table aria-label="spanning table" className='page-break'>
//                          {items}     
//                     </Table>} */}
//                     </TableContainer>
//                     </Fragment>
//                 );
//             }
        
//         }
// }

// const ref = React.createRef();
// const options = {
//     orientation: 'landscape'
// };

// const styles = StyleSheet.create({
//     page: {
//       flexDirection: 'row',
//       backgroundColor: '#E4E4E4'
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1
//     }
//   });

//   const MyDocument = () => (
//     <Document>
//     <Page wrap>
//       <Text break>
//        123123123
//       </Text>
//     </Page>
//   </Document>
//   );

// class Report3 extends React.Component {
//     render() {
//       return (
//         <div>
//                 {/* <Pdf targetRef={ref} filename="code-example.pdf" options={options} >
//                     {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
//                 </Pdf>
//                 <div ref={ref}>
//                         <Example/>
//                 </div> */}

//                 <PDFViewer>
//                     <MyDocument />
//                 </PDFViewer>
//         </div>
//       );
//     }
//   }

// export default Report3
