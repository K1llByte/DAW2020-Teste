#!/bin/python3
import json

FILE = 'filmes.json'

with open(FILE,'r') as file:
    data = json.load(file)


for elem in data:
    pass

with open(FILE,'w') as file:
    dict = json.dump(data,file)