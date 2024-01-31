import payService from "../component/pages/CardAbility/Payment/PayService";

export const AUTH = "/";
export const PAY = "/payment";
export const HOME = "/home";
export const CARD = "/card";
export const CREDIT = "/credit";
export const BILL ="/bill";
export const USER = "/user";
export const CURRENCY = "/currency"
export const ATMS = "/atm"
export const HISTORY = "/history"

export const PaySystem = ['МИР', 'Visa', 'MasterCard', 'China Union Pay']

export const valutaCharCode=[
        {CharCode: 'AED', Name: 'Дирхам ОАЭ'},
        {CharCode: 'AMD', Name: 'Армянских драмов'},
        {CharCode: 'AUD', Name: 'Австралийский доллар'},
        {CharCode: 'AZN', Name: 'Азербайджанский манат'},
        {CharCode: 'BGN', Name: 'Болгарский лев'},
        {CharCode: 'BRL', Name: 'Бразильский реал'},
        {CharCode: 'BYN', Name: 'Белорусский рубль'},
        {CharCode: 'CAD', Name: 'Канадский доллар'},
        {CharCode: 'CHF', Name: 'Швейцарский франк'},
        {CharCode: 'CNY', Name: 'Китайский юань'},
        {CharCode: 'CZK', Name: 'Чешских крон'},
        {CharCode: 'DKK', Name: 'Датская крона'},
        {CharCode: 'EGP', Name: 'Египетских фунтов'},
        {CharCode: 'EUR', Name: 'Евро'},
        {CharCode: 'GBP', Name: 'Фунт стерлингов Соединенного королевства'},
        {CharCode: 'GEL', Name: 'Грузинский лари'},
        {CharCode: 'HKD', Name: 'Гонконгский доллар'},
        {CharCode: 'HUF', Name: 'Венгерских форинтов'},
        {CharCode: 'IDR', Name: 'Индонезийских рупий'},
        {CharCode: 'INR', Name: 'Индийских рупий'},
        {CharCode: 'JPY', Name: 'Японских иен'},
        {CharCode: 'KGS', Name: 'Киргизских сомов'},
        {CharCode: 'KRW', Name: 'Вон Республики Корея'},
        {CharCode: 'KZT', Name: 'Казахстанских тенге'},
        {CharCode: 'MDL', Name: 'Молдавских леев'},
        {CharCode: 'NOK', Name: 'Норвежских крон'},
        {CharCode: 'NZD', Name: 'Новозеландский доллар'},
        {CharCode: 'PLN', Name: 'Польский злотый'},
        {CharCode: 'QAR', Name: 'Катарский риал'},
        {CharCode: 'RON', Name: 'Румынский лей'},
        {CharCode: 'RSD', Name: 'Сербских динаров'},
        {CharCode: 'SEK', Name: 'Шведских крон'},
        {CharCode: 'SGD', Name: 'Сингапурский доллар'},
        {CharCode: 'THB', Name: 'Таиландских батов'},
        {CharCode: 'TJS', Name: 'Таджикских сомон'},
        {CharCode: 'TMT', Name: 'Новый туркменский манат'},
        {CharCode: 'TRY', Name: 'Турецких лир'},
        {CharCode: 'UAH', Name: 'Украинских гривен'},
        {CharCode: 'USD', Name: 'Доллар США'},
        {CharCode: 'UZS', Name: 'Узбекских сумов'},
        {CharCode: 'VND', Name: 'Вьетнамских донгов'},
        {CharCode: 'XDR', Name: 'СДР'},
        {CharCode: 'ZAR', Name: 'Южноафриканских рэндов'}
]
export const ACCOUNT_TYPE = {
        "debit": "Текущий счет",
        "credit": "Кредитный счет"
}
