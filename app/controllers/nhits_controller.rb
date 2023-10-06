require 'pycall/import'

include PyCall::Import


pyimport :math
p math.degrees(math.pi / 2)
pyimport :os
PyCall.sys.path.append('./nhits')
app=PyCall.import_module("nhits")
print 123
mae=app.predict_in_sample('./nhits/Amazon.csv')
print mae

