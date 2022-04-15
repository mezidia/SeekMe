arr = [
    {'value': 'string', 'percent': 0},
    {'value': 'str', 'percent': 0},
    {'value': 'string', 'percent': 0},
]
s = 'str'

def match(arr):
    for elem in arr:
        result = len(s) / len(elem['value']) * 100
        elem['percent'] = result
    return arr

sorted_arr = match(arr)

sorted_arr.sort(key=lambda x: x.get('percent'), reverse=True)

print(sorted_arr)
