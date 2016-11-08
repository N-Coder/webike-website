import copy

from flask import g
from pymysql.cursors import DictCursor

BIKES = [
    {"IMEI": "0587", "sensor": 24},
    {"IMEI": "0603", "sensor": 25},
    {"IMEI": "0636", "sensor": 23},
    {"IMEI": "0657", "sensor": 6},
    {"IMEI": "0665", "sensor": 12},
    {"IMEI": "0669", "sensor": 4},
    {"IMEI": "1210", "sensor": 10},
    {"IMEI": "1473", "sensor": 17},
    {"IMEI": "2910", "sensor": 19},
    {"IMEI": "3014", "sensor": 28},
    {"IMEI": "3215", "sensor": 5},
    {"IMEI": "3410", "sensor": 29},
    {"IMEI": "3469", "sensor": 30},
    {"IMEI": "4381", "sensor": 13},
    {"IMEI": "5233", "sensor": 31},
    {"IMEI": "5432", "sensor": 27},
    {"IMEI": "6089", "sensor": 18},
    {"IMEI": "6097", "sensor": 20},
    {"IMEI": "6473", "sensor": 11},
    {"IMEI": "6904", "sensor": 2},
    {"IMEI": "6994", "sensor": 15},
    {"IMEI": "7303", "sensor": 8},
    {"IMEI": "7459", "sensor": 22},
    {"IMEI": "7517", "sensor": 1},
    {"IMEI": "7710", "sensor": 26},
    {"IMEI": "8508", "sensor": 9},
    {"IMEI": "8664", "sensor": 21},
    {"IMEI": "8870", "sensor": 7},
    {"IMEI": "9050", "sensor": 3},
    {"IMEI": "9407", "sensor": 16},
    {"IMEI": "9519", "sensor": 14}
]


def load_status(date=None):
    bike_status = copy.deepcopy(BIKES)

    # the databaseConnector implementation is really broken (and obsolete),
    # so just grab the underlying connection and use a proper cursor
    with g.dbc.myDB.cursor(DictCursor) as cur:
        for bike in bike_status:
            if date:
                cur.execute("SELECT * FROM imei{} WHERE CodeVersion > 0 AND Stamp <= %s ORDER BY Stamp DESC LIMIT 1;"
                            .format(bike["IMEI"]), date)
            else:
                cur.execute("SELECT * FROM imei{} WHERE CodeVersion > 0 ORDER BY Stamp DESC LIMIT 1;"
                            .format(bike["IMEI"]))
            row = cur.fetchone()
            bike["last_seen"] = str(row['Stamp'])
            bike["voltage"] = row['BatteryVoltage']
            bike["version"] = row['CodeVersion']
            if row['PhoneBattState'] and row['PhoneBattState'] != 'NULL':
                bike["phone_battery"] = float(row['PhoneBattState'].split(":")[3]) * 100 if row['PhoneBattState'] else 0
            bike["LatGPS"] = row['LatGPS'] or row['LatNetwork']
            bike["LongGPS"] = row['LongGPS'] or row['LongNetwork']
            bike["DischargeCurr"] = row['DischargeCurr']

    return bike_status
