const axios = require('axios');

exports.getCoins = async (req, res, next) => {
    const currentPage = req.query.page;
    const per_page = req.query.per_page

    try{
        //take coins data from coingecko API
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${per_page}&page=${currentPage}&sparkline=false&locale=en`);

        //clean data
        const  coins = response.data.map(({ id, name, symbol, current_price, high_24h, low_24h, price_change_percentage_24h }) => ({ id, name, symbol, current_price, high_24h, low_24h, price_change_percentage_24h }));
        console.log("You get coins")
        // const coins = [
        //     {
        //         "id": "bitcoin",
        //         "name": "Bitcoin",
        //         "symbol": "btc",
        //         "current_price": 27887,
        //         "high_24h": 29093,
        //         "low_24h": 27790,
        //         "price_change_percentage_24h": -3.57517
        //     },
        //     {
        //         "id": "ethereum",
        //         "name": "Ethereum",
        //         "symbol": "eth",
        //         "current_price": 1862.23,
        //         "high_24h": 1930.87,
        //         "low_24h": 1847.83,
        //         "price_change_percentage_24h": -2.51622
        //     },
        //     {
        //         "id": "tether",
        //         "name": "Tether",
        //         "symbol": "usdt",
        //         "current_price": 1.002,
        //         "high_24h": 1.011,
        //         "low_24h": 0.99844,
        //         "price_change_percentage_24h": 0.03108
        //     },
        //     {
        //         "id": "binancecoin",
        //         "name": "BNB",
        //         "symbol": "bnb",
        //         "current_price": 317.43,
        //         "high_24h": 325.79,
        //         "low_24h": 315.6,
        //         "price_change_percentage_24h": -2.08159
        //     },
        //     {
        //         "id": "usd-coin",
        //         "name": "USD Coin",
        //         "symbol": "usdc",
        //         "current_price": 1,
        //         "high_24h": 1.009,
        //         "low_24h": 0.992645,
        //         "price_change_percentage_24h": -0.01822
        //     },
        //     {
        //         "id": "ripple",
        //         "name": "XRP",
        //         "symbol": "xrp",
        //         "current_price": 0.437488,
        //         "high_24h": 0.461123,
        //         "low_24h": 0.434125,
        //         "price_change_percentage_24h": -4.94182
        //     },
        //     {
        //         "id": "cardano",
        //         "name": "Cardano",
        //         "symbol": "ada",
        //         "current_price": 0.370012,
        //         "high_24h": 0.383722,
        //         "low_24h": 0.365624,
        //         "price_change_percentage_24h": -3.2394
        //     },
        //     {
        //         "id": "staked-ether",
        //         "name": "Lido Staked Ether",
        //         "symbol": "steth",
        //         "current_price": 1858.83,
        //         "high_24h": 1931.92,
        //         "low_24h": 1841.8,
        //         "price_change_percentage_24h": -2.76166
        //     },
        //     {
        //         "id": "dogecoin",
        //         "name": "Dogecoin",
        //         "symbol": "doge",
        //         "current_price": 0.075018,
        //         "high_24h": 0.077554,
        //         "low_24h": 0.074405,
        //         "price_change_percentage_24h": -2.62061
        //     },
        //     {
        //         "id": "matic-network",
        //         "name": "Polygon",
        //         "symbol": "matic",
        //         "current_price": 0.935947,
        //         "high_24h": 0.985121,
        //         "low_24h": 0.928304,
        //         "price_change_percentage_24h": -4.52288
        //     },
        //     {
        //         "id": "solana",
        //         "name": "Solana",
        //         "symbol": "sol",
        //         "current_price": 21.27,
        //         "high_24h": 22.73,
        //         "low_24h": 21.06,
        //         "price_change_percentage_24h": -4.09367
        //     },
        //     {
        //         "id": "polkadot",
        //         "name": "Polkadot",
        //         "symbol": "dot",
        //         "current_price": 5.44,
        //         "high_24h": 5.7,
        //         "low_24h": 5.39,
        //         "price_change_percentage_24h": -4.16628
        //     },
        //     {
        //         "id": "tron",
        //         "name": "TRON",
        //         "symbol": "trx",
        //         "current_price": 0.068409,
        //         "high_24h": 0.070432,
        //         "low_24h": 0.068027,
        //         "price_change_percentage_24h": -2.87312
        //     },
        //     {
        //         "id": "binance-usd",
        //         "name": "Binance USD",
        //         "symbol": "busd",
        //         "current_price": 1,
        //         "high_24h": 1.009,
        //         "low_24h": 0.995311,
        //         "price_change_percentage_24h": 0.03116
        //     },
        //     {
        //         "id": "litecoin",
        //         "name": "Litecoin",
        //         "symbol": "ltc",
        //         "current_price": 81.47,
        //         "high_24h": 84.76,
        //         "low_24h": 80.93,
        //         "price_change_percentage_24h": -2.81106
        //     },
        //     {
        //         "id": "shiba-inu",
        //         "name": "Shiba Inu",
        //         "symbol": "shib",
        //         "current_price": 0.00000905,
        //         "high_24h": 0.00000956,
        //         "low_24h": 0.00000895,
        //         "price_change_percentage_24h": -4.35262
        //     },
        //     {
        //         "id": "avalanche-2",
        //         "name": "Avalanche",
        //         "symbol": "avax",
        //         "current_price": 15.89,
        //         "high_24h": 16.72,
        //         "low_24h": 15.68,
        //         "price_change_percentage_24h": -4.34105
        //     },
        //     {
        //         "id": "dai",
        //         "name": "Dai",
        //         "symbol": "dai",
        //         "current_price": 0.999889,
        //         "high_24h": 1.004,
        //         "low_24h": 0.996723,
        //         "price_change_percentage_24h": 0.04923
        //     },
        //     {
        //         "id": "wrapped-bitcoin",
        //         "name": "Wrapped Bitcoin",
        //         "symbol": "wbtc",
        //         "current_price": 27926,
        //         "high_24h": 29104,
        //         "low_24h": 27816,
        //         "price_change_percentage_24h": -3.47081
        //     },
        //     {
        //         "id": "uniswap",
        //         "name": "Uniswap",
        //         "symbol": "uni",
        //         "current_price": 5.09,
        //         "high_24h": 5.36,
        //         "low_24h": 5.05,
        //         "price_change_percentage_24h": -4.2087
        //     },
        //     {
        //         "id": "chainlink",
        //         "name": "Chainlink",
        //         "symbol": "link",
        //         "current_price": 6.73,
        //         "high_24h": 6.99,
        //         "low_24h": 6.64,
        //         "price_change_percentage_24h": -3.23914
        //     },
        //     {
        //         "id": "leo-token",
        //         "name": "LEO Token",
        //         "symbol": "leo",
        //         "current_price": 3.51,
        //         "high_24h": 3.55,
        //         "low_24h": 3.45,
        //         "price_change_percentage_24h": 0.19899
        //     },
        //     {
        //         "id": "cosmos",
        //         "name": "Cosmos Hub",
        //         "symbol": "atom",
        //         "current_price": 11.07,
        //         "high_24h": 11.13,
        //         "low_24h": 10.62,
        //         "price_change_percentage_24h": 1.41218
        //     },
        //     {
        //         "id": "the-open-network",
        //         "name": "Toncoin",
        //         "symbol": "ton",
        //         "current_price": 2,
        //         "high_24h": 2.09,
        //         "low_24h": 1.99,
        //         "price_change_percentage_24h": -4.35753
        //     },
        //     {
        //         "id": "monero",
        //         "name": "Monero",
        //         "symbol": "xmr",
        //         "current_price": 153.36,
        //         "high_24h": 158.74,
        //         "low_24h": 153.04,
        //         "price_change_percentage_24h": -3.26992
        //     },
        //     {
        //         "id": "okb",
        //         "name": "OKB",
        //         "symbol": "okb",
        //         "current_price": 45.03,
        //         "high_24h": 45.66,
        //         "low_24h": 44.4,
        //         "price_change_percentage_24h": -1.08716
        //     },
        //     {
        //         "id": "ethereum-classic",
        //         "name": "Ethereum Classic",
        //         "symbol": "etc",
        //         "current_price": 18.35,
        //         "high_24h": 19.06,
        //         "low_24h": 18.18,
        //         "price_change_percentage_24h": -3.35414
        //     },
        //     {
        //         "id": "stellar",
        //         "name": "Stellar",
        //         "symbol": "xlm",
        //         "current_price": 0.090182,
        //         "high_24h": 0.093429,
        //         "low_24h": 0.089364,
        //         "price_change_percentage_24h": -3.12563
        //     },
        //     {
        //         "id": "internet-computer",
        //         "name": "Internet Computer",
        //         "symbol": "icp",
        //         "current_price": 5.49,
        //         "high_24h": 5.71,
        //         "low_24h": 5.27,
        //         "price_change_percentage_24h": -3.3635
        //     },
        //     {
        //         "id": "bitcoin-cash",
        //         "name": "Bitcoin Cash",
        //         "symbol": "bch",
        //         "current_price": 112.88,
        //         "high_24h": 117.79,
        //         "low_24h": 112.25,
        //         "price_change_percentage_24h": -3.74682
        //     },
        //     {
        //         "id": "true-usd",
        //         "name": "TrueUSD",
        //         "symbol": "tusd",
        //         "current_price": 0.999145,
        //         "high_24h": 1.004,
        //         "low_24h": 0.985934,
        //         "price_change_percentage_24h": -0.24844
        //     },
        //     {
        //         "id": "filecoin",
        //         "name": "Filecoin",
        //         "symbol": "fil",
        //         "current_price": 4.81,
        //         "high_24h": 5.13,
        //         "low_24h": 4.79,
        //         "price_change_percentage_24h": -5.47453
        //     }
        // ]

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