import re

charNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

def digitSwitch(charNum):
  if charNum == 'one':
    return '1'
  if charNum == 'two':
    return '2'
  if charNum == 'three':
    return '3'
  if charNum == 'four':
    return '4'
  if charNum == 'five':
    return '5'
  if charNum == 'six':
    return '6'
  if charNum == 'seven':
    return '7'
  if charNum == 'eight':
    return '8'
  if charNum == 'nine':
    return '9'

def mapIntegersIndeces(line):
  dic  = {}
  for index in range(0, len(line)):
    if (line[index].isdigit()):
      dic[index] = line[index]
  return dic

def mapwordswithregex(line):
  dic = {}
  for charnum in charNums:
    indeces = [m.start() for m in re.finditer(f'(?={charnum})', line)]
    for indec in indeces:
      dic[indec] = digitSwitch(charnum)
  return dic

def getCalibrationTotal():
  total = 0
  with open ('input.txt') as file:
    for line in file:
      intIndeces = mapIntegersIndeces(line.rstrip())
      strIndeces = mapwordswithregex(line.rstrip())
      combo = {**intIndeces, **strIndeces}
      sortedCombo = dict(sorted(combo.items()))
      digilist = list(sortedCombo.values())
      total += int(f'{digilist[0]}{digilist[-1]}')
  return total

print(getCalibrationTotal())
