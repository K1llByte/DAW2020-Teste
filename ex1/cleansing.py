#!/bin/python3
import json
import re

FILE = 'batismos.json'

##############################

with open(FILE,'r') as fin:
    text = fin.readlines()

with open('clean_batismos.json','w') as fout:
    for line in text:
        line = re.sub(r'\t([a-z]+): ',r'\t"\1": ',line)
        line = re.sub(r'} {', r'}, {',line)
        line = re.sub(r'PT/ABM/PCML02/001/00012/000020,', r'"PT/ABM/PCML02/001/00012/000020",',line)
        line = re.sub(r'1866-04-08/1866-04-08',r'"1866-04-08/1866-04-08"',line)

        fout.write(line)

##############################

FILE = 'clean_batismos.json'
with open(FILE,'r') as file:
    data = json.load(file)


for obj in data:
    obj['_id'] = obj['ref'].replace('/','_')
    obj['pai'] = obj['title'].split(':')[2][1:-5]
    obj['mae'] = obj['title'].split(':')[3][1:]

with open(FILE,'w') as file:
    dict = json.dump(data,file)