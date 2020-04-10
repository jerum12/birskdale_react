var StocksModel = require('../models/Stocks');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require('../../config/Config')


module.exports = {

    // Async function to get the User List
    getUsers : async function (query, page, limit, sort) { 
        // Options setup for the mongoose paginate
        var options = {
            page,
            limit,
            sort
        }
        // Try Catch the awaited promise to handle the error 
        try {
            var stocks = await StocksModel.paginate(query, options)
            // Return the Userd list that was retured by the mongoose promise
            //console.log(stocks)
            stocks.docs.forEach(function(stock) {
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

            return stocks;
        } catch (e) {
            // return a Error message describing the reason 
            console.log(e)
            throw Error('Error while Paginating stocks');
        }
    }
}