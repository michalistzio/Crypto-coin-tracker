const axios = require('axios');

exports.getCoins = async (req, res, next) => {
    const currentPage = req.query.page;
    const per_page = req.query.per_page

    try{
        // //take coins data from coingecko API
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${per_page}&page=${currentPage}&sparkline=false&locale=en`);

        // //clean data
        const  coins = response.data.map(({ id, name, symbol, current_price, high_24h, low_24h, price_change_percentage_24h }) => ({ id, name, symbol, current_price, high_24h, low_24h, price_change_percentage_24h }));

        res.status(200).json({
            message: 'Get list of crypto coins!',
            coins_list: coins
        });
    }  catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getCoinDetails = async (req, res, next) => {
    const coinId = req.params.coinId;
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        // Handle the response from the CoinGecko API
        const data = response.data
        const {
            name, 
            description: {
                en: desc
            }, 
            market_data: {
                current_price: {
                    usd: cp
                }, 
                price_change_24h, 
                price_change_percentage_7d, 
                price_change_percentage_14d, 
                price_change_percentage_30d, 
                price_change_percentage_60d, 
                price_change_percentage_200d, 
                price_change_percentage_1y, 
                high_24h: {
                    usd: h24h
                }, 
                low_24h: {
                    usd: l24h
                }
            }
        } = data
        
        const coinDetails = {name, desc, cp, price_change_24h, price_change_percentage_7d, price_change_percentage_14d, price_change_percentage_30d, price_change_percentage_60d, price_change_percentage_200d, price_change_percentage_1y, h24h, l24h}
        
        //change price changes from percentage to usd price
        coinDetails.price_change_percentage_7d = coinDetails.cp * coinDetails.price_change_percentage_7d * 0.01
        coinDetails.price_change_percentage_14d = coinDetails.cp * coinDetails.price_change_percentage_14d * 0.01
        coinDetails.price_change_percentage_30d = coinDetails.cp * coinDetails.price_change_percentage_30d * 0.01
        coinDetails.price_change_percentage_60d = coinDetails.cp * coinDetails.price_change_percentage_60d * 0.01
        coinDetails.price_change_percentage_200d = coinDetails.cp * coinDetails.price_change_percentage_200d * 0.01
        coinDetails.price_change_percentage_1y = coinDetails.cp * coinDetails.price_change_percentage_1y * 0.01
        
        console.log('You take coin details')

        res.status(200).json({message:'Get CoinId', coin: coinDetails})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};