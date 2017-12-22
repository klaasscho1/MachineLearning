var fs = require("fs")

var priceData = JSON.parse(fs.readFileSync("pricedata.json", 'utf8'));
var priceDifferences = JSON.parse(fs.readFileSync('pricedifferences.json', 'utf8'));

var nDays = 30
var mSets = priceData.length - nDays + 1

var dataSets = []

for (var i=0; i < mSets; i++) {
	var priceRange = priceData.slice(i, i + nDays)
	var priceSum = priceRange.reduce((a,b) => a + b)
	
	var volatility = priceSum / priceRange.length
	var momentum = 0
	for (var n=0; n < priceRange.length; n++) {
		momentum += (priceRange[n] >= priceRange[n-1] ? 1 : 0)
	}
		
	momentum /= priceRange.length

	var openingPrice = priceRange[0];
	var closingPrice = priceRange[priceRange.length - 1];

	var priceDirection = (closingPrice > openingPrice) ? 1 : -1;

	dataSets.push({
		"X": [volatility, momentum],
		"y": priceDirection
	})
}

console.log(JSON.stringify(dataSets))