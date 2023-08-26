const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('TelegramBotToken', { polling: true });

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate',
  'Origin': 'https://www.profinance.ru',
  'Referer': 'https://www.profinance.ru/',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'Te': 'trailers'
}

const list_pair = [ 
  'USDRUB', 'JPYRUB', 'ETH/USD', 'USD/RUB', 'Gold', 'SP500_FUT', 'DJIA', 'BYN/RUB', 'Silver', 'Brent oil', 'AEX', 'EUR/RUB', 'USD/RUB_MSK_CASH1', 'MIX_FUT', 'SP500', 'THB/RUB', 'ETH/BTC', 'JPY/RUB', 'MYR/RUB', 'brent/RUB', 'wti/gold', 'ERUB_FUT', 'NASD_COMP', 'XPTRUB', 'NASD100', 'Hang Seng', 'FTSE100', 'XAURUB', 'DAX', 'XPDRUB', 'CAC40', 'SMI', 'RTST', 'US Dollar Index', 'Gazprom', 'Norilsk Nickel', 'Lukoil', 'Rosneft', 'Surgutneftegas', 'Rostelecom', 'VTB Bank', 'Tatneft', 'Palladium', 'Platinum', 'Copper', 'Aluminum', 'Nickel', 'WTI oil', 'NASDAQ', 'Coffee', 'AUD/USD', 'Cocoa', 'CAD/JPY', 'USD/RUB_M', 'SnP500', 'USD/RUB_FX', 'AUD/JPY', 'Wheat EU', 'EUR/CAD', 'Lumber', 'EUR/CHF', 'Sugar', 'CHF/JPY', 'Cotton', 'EUR/AUD', 'EUR/USD', 'Wheat US', 'GBP/CHF', 'Gasoil EU', 'EUR/GBP', 'EUR/JPY', 'EUR/RUB_M', 'USD/CAD', 'EUR/RUB_FX', 'USD/CHF', 'CNY/RUB_M', 'GBP/JPY', 'USD/RUB_MSK_CASH', 'GBP/USD', 'India 10y', 'CHF_FUT', 'Germany 10y', 'CAD_FUT', 'Japan 10y', 'AUD_FUT', 'China 10y', 'USD/JPY', 'UK 10y', 'DJIA_FUT', 'US 10y', 'JPY_FUT', 'Brazil 10y', 'GBP_FUT', 'Canada 10y', 'EUR_FUT', 'HKD/RUB', 'NIK_FUT', 'XAGRUB', 'NASD100_FUT', 'EUR/RUB_MSK_CASH', 'Australia 10y', 'BYN/RUB', 'CNY/RUB', 'USD/TJS', 'USD/KGS', 'USD/UZS', 'USD/UAH', 'Sberbank', 'DAX_FUT', 'MMVB', 'USD/SEK', 'USD/MXN', 'USD/DKK', 'USD/ZAR', 'USD/PLN', 'USD/HKD', 'USD/SGD', 'USD/BRL', 'USD/CNY', 'XBT/USD', 'USD/CZK', 'USD/MDL', 'USD/TRY', 'USD/EGP', 'USD/KZT', 'TIN', 'ZINC', 'USD/CNH', 'Bitcoin/USDT', 'Ethereum/USDT', 'EthereumClassic/', 'NZD/USD', 'LEAD', 'Litecoin/USD', 'Litecoin/Bitcoin', 'Ripple/USD', 'Ripple/Bitcoin', 'Gas UK', 'Gas US', 'Bitcoin/USD', 'EthereumClassic/USD', 'EthereumClassic/', 'Ethereum/USD', 'Ethereum/Bitcoin', 'USD/AMD', 'USD/PHP', 'USD/AZN', 'USD/HUF', 'USD/RON', 'USD/TMT', 'USD/ILS', 'USD/IDR', 'USD/MYR', 'USD/GEL', 'RUB_FUT', 'Gasoline', 'Urals Med', 'Severstal', 'CSI 300', 'ASX 200', 'Nikkei 225', 'Novolipetsk Steel', 'X5 Retail Group', 'Magnit', 'NovaTek', 'USD/NOK', 'USD/TWD', 'USD/BYN', 'USD/ARS', 'USD/KRW', 'USD/THB', 'USD/INR', 'Gas EU', 'TTF USD/1000M3', 'CO2', 'EOS/USD', 'RTS Futures', 'USD/BGN', 'UAH/USD', 'USD/CHF', 'GEL/USD', 'RUB/EUR', 'USD/AUD', 'KZT/USD', 'USD/aluminum', 'CAD/USD', 'USD/EUR', 'THB/USD', 'RUB/EUR', 'USD/GBP', 'RUB/RUB_FUT', 'RUB/ERUB_FUT', 'JPY/CHF', 'RUB/CNY', 'USD/JPY', 'RUB/CNY', 'SGD/USD', 'JPY/USD', 'USD/BTC', 'CZK/USD', 'ILS/USD', 'RUB/BYN', 'CHF/EUR', 'INR/USD', 'USD/RTST', 'HKD/USD', 'USD/CAD', 'BYN/USD', 'AMD/USD', 'MXN/USD', 'USD/AUD', 'GBP/EUR', 'USD/USD_INDEX', 'USDT/BTC', 'AZN/USD', 'CHF/USD', 'RUB/USD', 'USD/NASD100_FUT', 'HUF/USD', 'RUB/USD', 'CNY/USD', 'USD/EUR', 'USD/GBP', 'RUB/USD', 'USD/XRP', 'RUB/USD', 'USD/gold', 'TRY/USD', 'RUB/USD', 'PLN/USD', 'RUB/EUR', 'CNY/USD', 'KGS/USD', 'gold/CHF', 'GasEU/RUB', 'GEL/AMD', 'EUR_FUT/MDL', 'wti/Urals_med', 'USD/XPT', 'TRY/AZN', 'TRY/RUB', 'silver/RUB', 'GBP/ZAR', 'HKD/KZT', 'SEK/EUR', 'ERUB_FUT/USD', 'EUR/RUB', 'XRP/RUB', 'XPD/USD', 'EUR/AMD', 'USD/RUB_FUT', 'ERUB_FUT/XAU', 'EUR/EUR', 'GEL/RUB', 'CNY/TRY', 'RUB/HUF', 'CNY/JPY', 'XAG/CNY', 'EUR/JPY', 'GBP/RUB', 'RUB/INR', 'DJIA_FUT/', 'US Dollar Index/RUB', 'EOS/EUR', 'gold/SPX', 'JPY_FUT/BYN', 'platinum/TIN', 'PLN/CNY', 'AUD/RUB', 'gasoline/PHP', 'EUR/ZAR', 'Coffee/RUB', 'EUR/PLN', 'brent/JPY', 'XBT/SP500', 'PLN/RUB', 'WheatUS/RUB', 'EUR_FUT/PLN', 'copper/RUB', 'NASD100/NASDAQ', 'CHF/CNY', 'NOK/RUB', 'gold/Coffee', 'SURGUTNEFTEGAS/', 'PLN/NOK', 'gold/AMD', 'GBP/USD', 'EUR/GBP', 'DKK/RUB', 'CAD/RUB', 'RUB/JPY', 'KZT/RUB', 'KZT/RUB', 'XBT/gold', 'AUD/CAD', 'GBP/TRY', 'AUD/UAH', 'GBP/AUD', 'HUF/CAD', 'CHF/RUB', 'US Dollar Index/JPY', 'GBP/EUR', 'BTC/TRY', 'DAX/DAX_FUT', 'GBP/KZT', 'TRY/INR', 'gold/GBP', 'US Dollar Index/', 'NZD/CAD', 'JPY/RUB', 'EGP/silver', 'ERUB_FUT/RUB_FUT', 'LTC/USD', 'CHF/gold', 'BRL/RUB', 'SP500_FUT/', 'USD/USD', 'GBP/BYN', 'USD/XAG', 'ILS/JPY', 'BYN/KZT', 'silver/RUB', 'NOK/CNY', 'SP500_FUT/SPX', 'BYN/RUB', 'NZD/CHF', 'CAD/EUR', 'ETH/PLN', 'XBT/RUB', 'UAH/RUB', 'palladium/RUB', 'EUR/THB', 'EUR/HKD', 'SGD/NASD_COMP', 'TRY/CNY', 'wti/brent', 'KGS/RUB', 'ERUB_FUT/XPD', 'ERUB_FUT/USD', 'JPY/RUB', 'CHF/USD', 'USD/EUR', 'KZT/EUR', 'CNY/USD_INDEX', 'US Dollar Index/KZT', 'brent/gold', 'gold/SP500', 'BTC/ETH', 'AUD/CAD', 'SP500/BYN', 'EUR/BRL', 'MMVB/USD', 'USD/CSI_300', 'HKD/RUB', 'gold/TRY', 'TTFUSD1000/RUB', 'CNY/BGN', 'silver/RUB', 'RUB/CHF', 'ILS/CHF', 'MMVB/RTS_FUT', 'gold/brent', 'brent/LUKOIL', 'GBP/AUD', 'XBT/RUB', 'AUD/EUR', 'KGS/KZT', 'KZT/RUB', 'AMD/EUR', 'XRP/USD_INDEX', 'CNY/JPY', 'platinum/EUR', 'INR/RUB', 'CZK/UAH', 'EUR/USD', 'CNY/USD', 'EUR/CNY', 'PLN/RUB', 'CHF/RUB', 'brent/USD_INDEX', 'EUR/ILS', 'JPY/CAD', 'GBP/SGD', 'SP500/USD_INDEX', 'EUR/CNY', 'TRY/RUB', 'brent/RUB', 'USD/USDT', 'XBT/BYN', 'CAD/UAH', 'ERUB_FUT/EUR', 'USD/XPD', 'CAD/CHF', 'gold/ILS', 'ERUB_FUT/CNY', 'GBP/RUB', 'BGN/NOK', 'RUB/AMD', 'gold/silver', 'CNY/RUB', 'BTC/RUB', 'BTC/USD', 'EUR/GBP', 'palladium/RUB', 'KGS/RUB', 'RUB_FUT/USD', 'TTFUSD1000/brent', 'TJS/RUB', 'ERUB_FUT/XPT', 'ILS/RUB', 'RUB/USD_INDEX', 'DJIA/DJIA_FUT', 'EUR/ARS', 'HKD/CNY', 'CNY/RUB', 'RUB/UZS', 'CNY/GEL', 'AUD/RUB', 'EUR/NZD', 'EUR_FUT/AMD', 'GBP/MDL', 'brent/BYN', 'JPY/RUB', 'UAH/RUB', 'EUR/JPY', 'GBP/JPY', 'silver/UAH', 'EUR/CZK', 'CHF/USD', 'DJIA_FUT/gold', 'GBP/CZK', 'TRY/EUR', 'CNY/INR', 'EUR/MXN', 'brent/EUR', 'LTC/USDT', 'AZN/RUB', 'EUR/JPY', 'XBT/EUR', 'WheatEU/RUB', 'CNY/EUR', 'XAU/USD', 'MDL/LUKOIL', 'copper/RUB', 'GBP/RUB', 'US Dollar Index/', 'AUD/JPY', 'RUB/AZN', 'UAH/USD_INDEX', 'copper/RUB', 'XAU/USD', 'CHF/RUB', 'ILS/BYN', 'AMD/RUB', 'GasEU/RUB', 'US Dollar Index/BRL', 'KGS/RUB', 'KZT/GEL', 'CNY/CHF', 'ETC/USD_INDEX', 'TRY/UAH', 'CHF/RUB', 'NOK/MXN', 'DAX/USD', 'CNY/EUR', 'US Dollar Index/TJS', 'EUR/NOK', 'EUR/GEL', 'TTFUSD1000/RUB', 'NZD/JPY', 'CAD/RUB', 'IDR/RUB', 'GAZPROM/RON', 'USD/CHF', 'AZN/RUB', 'CHF/MDL', 'GBP/CAD', 'CNY/EUR', 'NOK/RUB', 'RUB/USD', 'GBP/RUB', 'silver/gold', 'ILS/TRY', 'SP500_FUT/gold', 'EUR/USD', 'SP500/JPY', 'UAH/JPY', 'EUR/KGS', 'EUR/TRY', 'NASD_COMP/NASDAQ', 'GBP/EUR', 'BRL/PLN', 'XAU/EUR', 'EUR/MDL', 'TRY/RUB', 'ERUB_FUT/USD', 'INR/RUB', 'Urals_med/RUB', 'US Dollar Index/UAH', 'US Dollar Index/', 'RUB/KZT', 'gold/RUB', 'JPY_FUT/CNY', 'USD/GBP', 'US Dollar Index/GEL', 'RUB/JPY', 'CNY/USD', 'SBERBANK/RUB', 'aluminum/platinum', 'copper/RUB', 'UAH/CZK', 'CHF/JPY', 'gold/NOK', 'silver/EUR', 'TTFUSD1000/RUB', 'AUD/RUB', 'USD/RUB', 'XAG/RUB_FUT', 'AUD/CHF', 'platinum/aluminum', 'RUB/MDL', 'copper/platinum', 'XBT/RUB', 'EUR/USD', 'NZD/EUR', 'US Dollar Index/', 'BTC/USD_INDEX', 'EUR/AUD', 'XBT/ETH', 'INR/CHF', 'VTBBANK/SBERBANK', 'Coffee/RUB', 'USD/EUR', 'Cocoa/RUB', 'DJIA/NASD100_FUT', 'UAH/MDL', 'silver/SVST', 'Cocoa/BYN', 'CHF/RUB', 'SP500_FUT/DJIA_FUT', 'RUB/UAH', 'ASX 200/JPY', 'AUD/NZD', 'Coffee/BYN', 'EUR_FUT/UAH', 'USD/USD', 'platinum/USD_INDEX', 'CZK/PLN', 'GAZPROM/RUB', 'THB/CZK', 'NZD/JPY', 'XAG/CNY', 'XAU/ERUB_FUT', 'AMD/RUB', 'USD/BTC', 'platinum/RUB', 'CNY/CZK', 'AUD/AZN', 'AUD/NOK', 'PLN/BYN', 'NASD100/CHF', 'XRP/USDT', 'AUD/CAD', 'US Dollar Index/RUB', 'GBP/CNY', 'SGD/RUB', 'Sugar/RUB', 'GBP/RON', 'NORILSKNICKEL/ILS', 'US Dollar Index/TRY', 'EUR/USD_INDEX', 'USD/USD', 'CHF/ILS', 'UAH/RUB', 'TRY/RUB', 'EUR/TJS', 'brent/wti', 'CHF/EUR', 'USD/EUR', 'GBP/CNY', 'CNY/RUB', 'GBP/UAH', 'EUR/XBT', 'RUB/CZK', 'EUR_FUT/ILS', 'EUR/SGD', 'gold/JPY', 'RUB/USD', 'EUR_FUT/THB', 'TTFUSD1000/EUR', 'GBP_FUT/MDL', 'SURGUTNEFTEGAS/', 'gold/RUB', 'EUR/JPY', 'NASD100/AUD', 'AUD/RUB', 'EUR/PHP', 'KRW/RUB', 'KZT/KGS', 'ETH/RUB', 'XBT/KZT', 'BTC/USD', 'TJS/RUB', 'GBP/ILS', 'EUR/TWD', 'JPY/THB', 'CAD/RUB', 'brent/Urals_med', 'USD/EUR', 'RUB/TRY', 'XAU/RUB_FUT', 'EUR_FUT/SEK', 'USD/EUR', 'BRL/KZT', 'XBT/RUB', 'CAD/CHF', 'GBP/INR', 'gold/RUB', 'WheatUS/TRY', 'EUR/AZN', 'ILS/JPY', 'SP500/JPY', 'USDT/USD', 'TTFUSD1000/RUB', 'CAD/CHF', 'GBP/JPY', 'brent/CHF', 'KZT/RUB', 'EUR_FUT/CZK', 'EUR/XAU', 'USD/USD', 'TMT/GASUS', 'XAU/USD', 'EUR_FUT/KZT', 'BRL/RUB', 'BTC/gold', 'AZN/Urals_med', 'CZK/RUB', 'GBP_FUT/KZT', 'GBP/NZD', 'ERUB_FUT/USD', 'EUR/AUD', 'AUD/CHF', 'GBP/RUB', 'TRY/BYN', 'CHF_FUT/CNY', 'NORILSKNICKEL/', 'Urals_med/LUKOIL', 'silver/RUB', 'platinum/RUB', 'PHP/RUB', 'NASD100_FUT/NASDAQ', 'TRY/EUR', 'BGN/RUB', 'platinum/gold', 'GEL/KZT', 'US Dollar Index/', 'CNY/KRW', 'Coffee/EUR', 'palladium/platinum', 'RUB/MXN', 'JPY/BYN', 'BTC/USDT', 'UAH/TRY', 'NZD/AUD', 'EGP/RUB', 'GBP/CAD', 'GASUS/brent', 'EUR/KZT', 'RUB/GEL', 'aluminum/USD_INDEX', 'CNY/RUB', 'CNY/KZT', 'platinum/silver', 'US Dollar Index/RUB', 'USD/RUB', 'GBP/RUB', 'EUR/DKK', 'US Dollar Index/RUB', 'ERUB_FUT/XAG', 'AUD/USD', 'Lumber/SBERBANK', 'palladium/gold', 'SURGUTNEFTEGAS/', 'CNY/USD', 'gold/EUR', 'palladium/Lumber', 'CHF/CZK', 'EUR_FUT/NOK', 'JPY_FUT/RUB', 'platinum/BYN', 'GBP/CHF', 'SP500/SP500_FUT', 'Urals_med/wti', 'ETH/LTC', 'AUD/JPY', 'GBP/CAD', 'USD/EUR', 'LTC/RUB', 'WheatUS/KZT', 'CZK/AZN', 'CHF/RUB', 'US Dollar Index/BYN', 'gold/JPY', 'TJS/RUB', 'EUR/INR', 'US Dollar Index/', 'CNY/UZS', 'CNY/THB', 'CHF/KZT', 'CNY/USD_INDEX', 'palladium/RUB', 'ZAR/CNY', 'TRY/RUB', 'NOK/SEK', 'CNY/RUB', 'GasEU/USD', 'RON/MDL', 'KRW/RUB', 'EUR_FUT/TRY', 'Urals_med/RUB', 'ERUB_FUT/USD', 'EUR/silver', 'CHF/RUB', 'Coffee/RUB', 'platinum/RUB', 'UAH/BYN', 'CNY/UAH', 'gold/RUB', 'EUR/CNY', 'USDT/USD', 'SP500/SPX', 'Sugar/BYN', 'TTFUSD1000/CNY', 'GEL/RUB', 'WheatUS/BYN', 'XPT/USD', 'CNY/EUR', 'CAD/AUD', 'XBT/LTC', 'WheatUS/RUB', 'WheatUS/USD_INDEX', 'EUR/BGN', 'CAD/AUD', 'brent/RUB', 'BYN/GEL', 'RUB/BTC', 'US Dollar Index/KGS', 'TRY/USD_INDEX', 'GBP/RUB', 'CZK/KZT', 'UAH/RUB', 'Coffee/KZT', 'KZT/CNY', 'gold/USD_INDEX', 'TRY/KZT', 'nickel/RUB', 'XAG/XAU', 'ETC/EUR', 'platinum/TTFUSD1000', 'NASD100_FUT/CAD', 'GBP/PLN', 'Urals_med/RUB', 'GBP/CAD', 'CAD/CHF', 'EUR/RUB_FUT', 'silver/JPY', 'EUR/UZS', 'Coffee/RUB', 'KZT/BYN', 'UZS/RUB', 'GasEU/RUB', 'aluminum/RUB', 'MXN/RUB', 'WheatEU/USD', 'BTC/UZS', 'GASUS/TTFUSD1000', 'MMVB/MIX_FUT', 'NASD100/NASD100_FUT', 'CHF/EUR', 'brent/XBT', 'nickel/', 'Cotton/RUB', 'CNY/RUB', 'silver/USD_INDEX', 'EUR_FUT/TJS', 'GEL/CNY', 'SP500/RUB', 'PLN/RUB', 'AUD/CAD', 'gold/EUR', 'EUR/AUD', 'Coffee/gold', 'BTC/USD', 'USD/EUR', 'CNY/HKD', 'EUR/XPT', 'WheatUS/IDR', 'copper/gold', 'XAU/EUR', 'Coffee/RUB', 'USD/EUR', 'XAU/USD', 'TMT/RUB', 'RUB/PHP', 'AZN/GASUS', 'LTC/XBT', 'SGD/SPX', 'USD/ERUB_FUT', 'EUR/BYN', 'GasEU/RUB', 'silver/RUB', 'JPY/CNY', 'BTC/ETH', 'gold/RUB', 'SP500/CHF', 'Sugar/EUR', 'Lumber/BYN', 'EUR/JPY', 'THB/CNY', 'JPY/RUB', 'TRY/USD', 'wti/LUKOIL', 'TTFUSD1000/EUR', 'SEK/RUB', 'RUB/TJS', 'GBP/AMD', 'RUB/BYN', 'PLN/EUR', 'gold/PLN', 'USD/EUR', 'EUR/CNY', 'INR/CAD', 'TJS/CHF', 'US Dollar Index/SGD', 'TRY/TJS', 'EUR_FUT/Cocoa', 'CAD/GBP', 'RUB/KGS', 'RUB/EUR', 'CAD/NOK', 'RTST/gold', 'WheatUS/RUB', 'GAZPROM/RUB', 'XBT/SP500_FUT', 'EUR/EGP', 'GBP/silver', 'GEL/TRY', 'XBT/RUB', 'CNY/PHP', 'XBT/BTC', 'copper/RUB', 'gold/BYN', 'ILS/RUB', 'GBP_FUT/CAD', 'USD/AUD', 'INR/CNY', 'EUR/UAH', 'JPY/RUB', 'EUR/EUR', 'AZN/TRY', 'SP500/EUR', 'palladium/EUR', 'RUB/AUD', 'AMD/KZT', 'BYN/GBP', 'EUR/EUR', 'PLN/UAH', 'ARS/RUB', 'RUB/CNY', 'GBP/AUD', 'Cocoa/RUB', 'EUR/BYN', 'BRL/RUB', 'TRY/GEL', 'WheatEU/RUB', 'BTC/RUB', 'XAU/USD', 'NASD100/JPY', 'MXN/RUB', 'CHF/RON', 'USD/XAU', 'CNY/HKD', 'NOK/UAH', 'SEK/NOK', 'SGD/GBP', 'EUR/SEK', 'BTC/BYN', 'Urals_med/brent', 'JPY/RUB', 'KZT/RUB', 'CAD/NZD', 'JPY_FUT/USD_INDEX', 'KRW/RUB', 'JPY/RUB', 'JPY/USD_INDEX', 'GBP/RUB', 'SP500/RUB', 'ZAR/RUB', 'SP500_FUT/GBP', 'WheatEU/RUB', 'CNY/BYN', 'EUR/RON', 'XBT/EUR', 'GBP/USD_INDEX', 'UAH/PLN', 'brent/RUB', 'TTFUSD1000/RUB', 'Urals_med/USD_INDEX', 'CNY/USD', 'ERUB_FUT/EUR', 'TRY/JPY', 'XBT/USD_INDEX', 'EUR/HUF', 'JPY/RUB', 'Cocoa/RUB'
]

async function makeRequest(pair) {
  const url = `https://charts.profinance.ru/html/charts/refresh?s=${pair}`
  const response = await axios.get(url, { headers: HEADERS });

  const responseString = response.data;
  const responseArray = responseString.split(';');
  return responseArray[1].split('\n')[0];
}

async function fetchChartData(pair) {
  console.log(pair);

  const current_time_millis = Date.now();
  const SID = await makeRequest(pair);
  const url = 'https://charts.profinance.ru/html/charts/history';
  const params = {
    SID: SID,
    s: pair,
    h: 400,
    w: 728,
    pt: 2,
    tt: 1,
    z: 8,
    ba: 2,
    left: 0,
    T: current_time_millis,
  };
const response = await axios.get(url, { params, HEADERS });

return parseFloat(response.data.split('\n')[1].split(';')[4]);
}

async function fetchDataAndLog(pair, value, bot, chatId) {
  for (;;) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!(pair in list_monitoring)) {
        console.log('Закончили');
        return;
      }
      if (value !== list_monitoring[pair]['number']) {
        console.log('Закончили');
        return;
      }

      const price = await fetchChartData(filter(pair));
      console.log(price, value);

      if (value.includes('>') && value.includes('<')) {
        const numbers = value.split(' ');
        let limMin, limMax;

        if (numbers[0].includes('<')) {
          limMin = parseFloat(numbers[0].replace('<', ''));

        } else if (numbers[0].includes('>')) {
          limMax = parseFloat(numbers[0].replace('>', ''));
        }

        if (numbers[1].includes('<')) {
          limMin = numbers[1].replace('<', '');

        } else if (numbers[1].includes('>')) {
          limMax = numbers[1].replace('>', '');

        }
        if (price <= limMin || limMax <= price) {

          const buttonText1 = `Сменить значение`;
          const callbackData1 = `change_${pair}`;

          const buttonText2 = `Удалить ${pair}`;
          const callbackData2 = `del_${pair}`;

          const inlineButton1 = createInlineButton(buttonText1, callbackData1);
          const inlineButton2 = createInlineButton(buttonText2, callbackData2);

          const keyboard = {
            inline_keyboard: [[inlineButton1, inlineButton2]],
          };

          symbol = pair;
          waitingForNumber = true;
          bot.sendMessage(chatId, `Значение вышло за диапазон:\nАктуальное значение: ${price}\nДиапазон: ${limMin} - ${limMax}`, { reply_markup: keyboard });
          
          delete list_monitoring[pair];
          break;
        }


      } else if (value.includes('>')) {
        const number = parseFloat(value.replace(/>/g, '').replace(/</g, ''))
        if (price >= number) {

          const buttonText1 = `Сменить значение`;
          const callbackData1 = `change_${pair}`;

          const buttonText2 = `Удалить ${pair}`;
          const callbackData2 = `del_${pair}`;

          const inlineButton1 = createInlineButton(buttonText1, callbackData1);
          const inlineButton2 = createInlineButton(buttonText2, callbackData2);

          const keyboard = {
            inline_keyboard: [[inlineButton1, inlineButton2]],
          };

          symbol = pair;
          waitingForNumber = true;
          bot.sendMessage(chatId, `Значение достигнуто:\nАктуальное значение: ${price} Значение: ${value}`, { reply_markup: keyboard });
          
          delete list_monitoring[pair];
          break;
        }
      } else if (value.includes('<')) {
        const number = parseFloat(value.replace(/>/g, '').replace(/</g, ''))
        if (price <= number) {

          const buttonText1 = `Сменить значение`;
          const callbackData1 = `change_${pair}`;

          const buttonText2 = `Удалить ${pair}`;
          const callbackData2 = `del_${pair}`;

          const inlineButton1 = createInlineButton(buttonText1, callbackData1);
          const inlineButton2 = createInlineButton(buttonText2, callbackData2);

          const keyboard = {
            inline_keyboard: [[inlineButton1, inlineButton2]],
          };

          symbol = pair;
          waitingForNumber = true;
          bot.sendMessage(chatId, `Значение достигнуто:\nАктуальное значение: ${price} Значение: ${value}`, { reply_markup: keyboard });
          
          delete list_monitoring[pair];
          break;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 60000));
    } catch (error) {
      console.error('Не удалось получить информацию от сервера.\nОшибка при получении данных:', error);
      delete list_monitoring[pair];
      bot.sendMessage(chatId, `'Не удалось получить информацию от сервера.\nПроцесс остановлен. Токен: ${pair}.\nОшибка: \n${error}`);
      return;
    }
  }
}


const list_monitoring = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const welcomeMessage = `Привет, ${username}! Добро пожаловать в нашего бота.`;

  const keyboard = [
    [{ text: 'Создать мониторинг' }, { text: 'Вывести активные мониторинги' }],
    [{ text: 'USD/RUB' }, { text: 'RUB/USD' }, { text: 'BTC/USD' }, { text: 'ETH/USD' }]
  ];

  const replyOptions = {
    reply_markup: {
      keyboard: keyboard,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };

  bot.sendMessage(chatId, welcomeMessage, replyOptions);
});

let waitingForNumber = false;
let symbol;

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === 'Вывести активные мониторинги') {
    if (list_monitoring.lenth !== 0) {
      for (const symbol in list_monitoring) {
        const value = list_monitoring[symbol]['number'];
        console.log(list_monitoring);

        const buttonText1 = `Сменить значение`;
        const callbackData1 = `change_${symbol}`;

        const buttonText2 = `Удалить ${symbol}`;
        const callbackData2 = `del_${symbol}`;

        const inlineButton1 = createInlineButton(buttonText1, callbackData1);
        const inlineButton2 = createInlineButton(buttonText2, callbackData2);

        const keyboard = {
          inline_keyboard: [[inlineButton1, inlineButton2]],
        };

        bot.sendMessage(chatId, `Пара: ${symbol}, Значение: ${value}`, { reply_markup: keyboard });
      }
    } else {
      bot.sendMessage(chatId, `В данный момент нет пар для отслеживания`);
    }

  } else if ( text === '/start' ) {

  } else if ( text === 'Создать мониторинг' ) {
    symbol = null;
    waitingForNumber = false;
    bot.sendMessage(chatId, `Для создания мониторинга введите связку для отслеживания.`);

  } else {

    if (waitingForNumber === false) {
      if (isTokenInList(text)) {
        waitingForNumber = true;
        symbol = text;
        try {
          const price = await fetchChartData(filter(symbol));
          bot.sendMessage(chatId, `Ожидается значение для отслеживания. Актуальная цена: ${price}`);
        } catch (error) {
          bot.sendMessage(chatId, `'Не удалось получить информацию от сервера.\nПроцесс остановлен. Токен: ${pair}.\nОшибка: \n${error}`);
        }
      } else {
        bot.sendMessage(chatId, 'Токен не найден. Убедитесь в правильности написания.');
      }

    } else {
      const isNumber = parseFloat(text.replace(/,/g, '.').replace(/>/g, '').replace(/</g, ''));
      const number = text.replace(/,/g, '.');

      if (isNaN(isNumber)) {
        bot.sendMessage(chatId, "Введенный текст не является числом. Введите еще раз.");

      } else if (text.includes('>') && text.includes('<')) {
        await addToMonitoringList(symbol, bot, chatId, number);
        const numberOne = text.replace(/,/g, '.').split(' ')[0];
        const numberTwo = text.replace(/,/g, '.').split(' ')[1];
        bot.sendMessage(chatId, `Начали отслеживать: ${symbol} \nДиапазон ${numberOne} - ${numberTwo}`);
        waitingForNumber = false;

      } else if (text.includes('>')) {
        await addToMonitoringList(symbol, bot, chatId, number);
        bot.sendMessage(chatId, `Начали отслеживать: ${symbol} \nЗначение: ${number}`);
        waitingForNumber = false;

      } else if (text.includes('<')) {
        await addToMonitoringList(symbol, bot, chatId, number);
        bot.sendMessage(chatId, `Начали отслеживать: ${symbol} \nЗначение: ${number}`);
        waitingForNumber = false;

      } else {
        bot.sendMessage(chatId, "Вы не указали символы <>. Введите еще раз.\nНапример:\n>2\n<2\n<2 5>");
      }
    }

  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const q = query.data;

  if (q.startsWith('del_')) {
    const symbolToDelete = q.replace('del_', '');

    delete list_monitoring[symbolToDelete];
    console.log(list_monitoring);
    bot.deleteMessage(chatId, messageId)
      .then(() => {
        waitingForNumber = false;
        bot.sendMessage(chatId, `Токен больше не отслеживается: ${symbolToDelete}`);
      })
      .catch((error) => {
        console.error('Ошибка при удалении сообщения:', error);
      });

  } else if (q.startsWith('change_')) {
    const symbolToСhange = q.replace('change_', '');

    waitingForNumber = true;
    symbol = symbolToСhange;
    
    bot.sendMessage(chatId, 'Ожидается значение для отслеживания.');
  }
});

function createInlineButton(text, callbackData) {
  return {
    text: text,
    callback_data: callbackData,
  };
}

async function addToMonitoringList(symbol, bot, chatId, number) {

  const dict = {number: number, func: fetchDataAndLog(symbol, number, bot, chatId)}; 
  list_monitoring[symbol] = dict;
}

function isTokenInList(symbol) {
  return list_pair.includes(symbol);
}

function filter(pair) {
  if (pair === 'TRY/JPY') {
    return 'TRY-JPY=/USDTRY*USDJPY';
  } else if (pair === 'RUB/USD') {
    return 'rub-usd=/eurrub*eurusd';
  } else if (pair === 'BTC/USD') {
    return 'btc-usd=/ltcbtc_btfnx*ltcusd_btfnx';
  } else if (pair === 'ETH/USD') {
    return 'ethusd_btfnx';
  } else {
    return pair;
  }
}