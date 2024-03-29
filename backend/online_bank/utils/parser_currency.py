import json
import datetime
from decimal import Decimal
import copy
import config
import calendar


class CurrencyParser:
    _json_row = None
    _expired_datetime = None
    _json_currency_prices = None

    def __new__(cls, *args, **kwargs):
        if cls._json_row is None:
            cls.read()
        return cls

    @classmethod
    def _update_expired_date(cls):
        offset = datetime.timezone(datetime.timedelta(hours=config.OFFSET_TIMEZONE))
        now = datetime.datetime.now(offset)
        _, ndays = calendar.monthrange(now.year, now.month)
        cls._expired_datetime = now.replace(day=(now.day + 1) % ndays, hour=0, minute=0, second=0, microsecond=0)

    @staticmethod
    def _get_current_datetime():
        offset = datetime.timezone(datetime.timedelta(hours=config.OFFSET_TIMEZONE))
        return datetime.datetime.now(offset)

    @classmethod
    def read(cls):
        with open(r"online_bank/currencies.js", "rb") as fp:
            cls._json_row = json.load(fp)
        cls._update_expired_date()
        return cls

    @classmethod
    def _check_updates(cls, field):
        if field is not None:
            now = cls._get_current_datetime()
            if cls._expired_datetime > now:
                return False
        return True

    @classmethod
    def get_currency_prices(cls):
        has_update = cls._check_updates(cls._json_currency_prices)
        if has_update:
            if cls._json_row is None or has_update:
                cls.read()

            result = {}
            data = cls._json_row['Valute']
            sale_percent = config.PERCENT_SALE
            purchase_percent = config.PERCENT_PURCHASE
            for currency in data:
                value = data[currency]['Value']
                nominal = data[currency]['Nominal']
                result[currency] = {
                    "CharCode": currency,
                    "Name": data[currency]['Name'],
                    "Nominal": nominal,
                    "SalePrice": round(value + value * (sale_percent / 100), 2),
                    "PurchasePrice": round(value + value * (purchase_percent / 100), 2),
                }
            cls._json_currency_prices = result

        return copy.deepcopy(cls._json_currency_prices)


class CurrencyConverter:
    @staticmethod
    def convert(amount: Decimal, from_: str, to: str):
        if from_ != to:
            currencies = CurrencyParser.get_currency_prices()
            if from_ != 'RUB':
                amount = amount * Decimal.from_float(currencies[from_]['PurchasePrice'] / currencies[from_]['Nominal'])

            if to != 'RUB':
                amount = amount * Decimal.from_float(currencies[to]['Nominal'] / currencies[to]['PurchasePrice'])

        return amount
