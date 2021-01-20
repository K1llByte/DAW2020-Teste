#!/ibin/python

import json

##################### PARAMETERS #####################

SCHEMA_NAME = 'baptism'
DB_SCHEMA_NAME = SCHEMA_NAME + 's'
FILE = 'clean_batismos.json'

######################################################

with open(FILE,'r') as fin:
    data = json.load(fin)


def print_schema():

    print("""const mongoose = require('mongoose');

const {}_schema = new mongoose.Schema({{""".format(SCHEMA_NAME))

    for key in data[0]:
        value = data[0][key]
        if type(value) == int or type(value) == float:
            print('    {}:    Number,'.format(key))

        elif type(value) == str:
            print('    {}:    String,'.format(key))

        elif type(value) == list:
            # MUST BE ATOMIC TYPE (str,int,float)
            
            if value == []:
                for obj in data[1:]:
                    try:
                        if obj[key] != []:
                            value = obj[key]
                    except:
                        continue

                if value == []:
                    print('    {}:    [Object],'.format(key))
                else:
                    if type(value[0]) == int or type(value[0]) == float:
                        print('    {}:    [Number],'.format(key))

                    elif type(value[0]) == str:
                        print('    {}:    [String],'.format(key))
            else:
                if type(value[0]) == int or type(value[0]) == float:
                    print('    {}:    [Number],'.format(key))

                elif type(value[0]) == str:
                    print('    {}:    [String],'.format(key))

    print("""}},
{{
    versionKey: false,
    collection: 'data'
}});

module.exports = mongoose.model('{}', {}_schema, '{}');""".format(DB_SCHEMA_NAME, SCHEMA_NAME, DB_SCHEMA_NAME),end='')

print_schema()