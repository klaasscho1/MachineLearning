var fs = require("fs");

var priceData = JSON.parse(fs.readFileSync('pricedata.json', 'utf8'));
var priceDifferences = []

for (var i = 0; i < priceData.length; i++) {
	var pricePoint = priceData[i];
	var priceDelta;

	if (i == 0) {
		priceDelta = 0
	} else {
		var previousPricePoint = priceData[i - 1];
		priceDelta = pricePoint - previousPricePoint
	}

	priceDifferences[i] = priceDelta
}

console.log(JSON.stringify(priceDifferences))
