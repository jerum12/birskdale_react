
const express = require('express');
const router = express.Router();
const StocksModel = require('../models/StocksModel')


// router.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })


//get all data
// router.get("/get-data", (req, res) => {
//   Stocks.find({})
//         .exec((error,stocks) =>{
//           if(error)
//             res.send("error has occured")
//           else{
//             console.log(stocks)
//             res.json(stocks)
//           }
//         })
// })

//get all data
router.get("/get-data", (req, res) => {
  StocksModel.find({})
          .sort({transaction_date: -1})
          .exec()
          .then((stocks) => {
            console.log(stocks)
  
            stocks.forEach(function(stock) {
              stock.stock_details = 'Leather type ' + stock.leather_type + '; ' +
                              'Gender ' + stock.gender + '; ' +
                              'Color ' + stock.color + '; ' +
                              'Classification 1 ' + stock.classification_1 + '; ' +
                              'Classification 2 ' + stock.classification_2 + '; ' +
                              'Logo ' + stock.logo + '; ' +
                              'Sub Logo ' + stock.sub_logo + '; ' +
                              'Stitch ' + stock.stitch + '; ' +
                              'Lining ' + stock.lining + '; ' +
                              'Special Instruction ' + stock.spercial_instruction;
            });
  
            res.json(stocks)
          }).catch((error) =>{
            res.send("error occured")
          })
    })
  
  //get data by id
  // router.get("/get-data/:id", (req, res) => {
  //   Stocks.findOne({
  //           _id : req.params.id
  //         })
  //         .exec((error,stock) =>{
  //           if(error)
  //             res.send("error has occured")
  //           else{
  //             console.log(stock)
  //             res.json(stock)
  //           }
  //         })
  // })
  router.get("/get-data/:id", (req, res) => {
    StocksModel.findOne({
            stock_no : req.params.id
          })
          .exec()
          .then( (stock) =>{
              console.log(stock)
              res.json(stock)
          }).catch(error => {
            res.send("error has occured")
          })
  })
  
  
  
  //post data
  router.post("/insert-data", (req, res) => {
    var newStocks = new StocksModel();
  
    newStocks.stock_no = req.body.stock_no;
    newStocks.transaction_date = req.body.transaction_date;
    newStocks.leather_type = req.body.leather_type;
    newStocks.gender = req.body.gender;
    newStocks.color = req.body.color;
    newStocks.classification_1 = req.body.classification_1;
    newStocks.classification_2 = req.body.classification_2;
    newStocks.logo = req.body.logo;
    newStocks.sub_logo = req.body.sub_logo;
    newStocks.stitch = req.body.stitch;
    newStocks.lining = req.body.lining;
    newStocks.spercial_instruction = req.body.spercial_instruction;
    newStocks.size_run_3 = req.body.size_run_3;
    newStocks.size_run_4 = req.body.size_run_4;
    newStocks.size_run_5 = req.body.size_run_5;
    newStocks.size_run_6 = req.body.size_run_6;
    newStocks.size_run_7 = req.body.size_run_7;
    newStocks.size_run_8 = req.body.size_run_8;
    newStocks.size_run_9 = req.body.size_run_9;
    newStocks.size_run_10 = req.body.size_run_10;
    newStocks.size_run_11 = req.body.size_run_11;
    newStocks.size_run_12 = req.body.size_run_12;
    newStocks.size_run_13 = req.body.size_run_13;
    newStocks.size_run_14 = req.body.size_run_14;
    newStocks.total_size_run = req.body.total_size_run;
  
    newStocks.save((error, stock) => {
      if(error)
          res.send("error has occured")
        else{
          console.log("Success")
          res.sendStatus(200)
        }
    })
  
  })
  
  
  //post data 2
  // router.post("/insert-data2", (req, res) => {
  //   Stocks.create(req.body, (error,stock) =>{
  //     if(error)
  //       res.send('error saving')
  //     else{
  //       console.log("Success")
  //       res.send(stock)
  //     }
  //   })
  // })
  
  //update
  router.put("/update-data/:id", (req,res) => {
    StocksModel.findOneAndUpdate({
      _id: req.params.id
    },
    {$set : {leather_type : req.body.leather_type,
             color : req.body.color}},
    {upsert : true},
    (error,newStock) => {
        if(error)
          res.status(500).json({status : 'failure'})
        else{
          console.log(newStock)
          res.sendStatus(200)
        }
    }
    )
  
    // var id = req.body.title
    // Stocks.findById(id, (error,stock) => {
    //     if(error){
    //       console.log("error update")
    //     }
  
    //     stock.leather_type = req.body.leather_type
    //     stock.color = req.body.color
    //     stock.save();
    // })
  
  })
  
  //delete
  router.delete("/delete-data/:stock_no", (req,res) =>{
    StocksModel.findOneAndRemove({
      stock_no : req.params.stock_no
    }, (error,stock)=>{
      if(error)
            console.log("error delete")
          else{
            console.log(stock)
            res.sendStatus(200)
          }
    })
    // var id = req.body.id;
    // Stocks.findByIdAndRemove(id).exec();
  
  })
  

  module.exports = router