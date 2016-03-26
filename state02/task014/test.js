var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function () {
	for(var i=0;i<aqiData.length;i++)
	{
		if(aqiData[i][1]>60)
		{
			let li=document.createElement("li");
			let text=document.createTextNode(aqiData[i][0] +', '+aqiData[i][1]);
			li.appendChild(text);
			document.getElementById('aqi-list').appendChild(li);
		}
	}
	
})();