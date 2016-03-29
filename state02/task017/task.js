require.config({
  paths: {
    echarts: 'http://echarts.baidu.com/build/dist'
  }
});

//随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = [];

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

function renderChart() {
  var showData = chartData[pageState["nowGraTime"]][pageState["nowSelectCity"]];
  var XAsis = Object.getOwnPropertyNames(showData);
  var YASis = [];
  for (var i in XAsis) {
    YASis.push(showData[XAsis[i]]);
  }

  require(
    [
      'echarts',
      'echarts/chart/bar' 
    ],
    function(ec) {
      var myChart = ec.init(document.getElementById('aqi-chart-wrap'));

      var option = {
        title: {
          text: '空气质量'
        },
        tooltip: {},
        legend: {
          data: ['空气质量']
        },
        xAxis: {
          data: XAsis
        },
        yAxis: {},
        series: [{
          name: '空气质量',
          type: 'bar',
          data: YASis
        }]
      };
      myChart.setOption(option);
    }
  );
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  var obj = document.getElementsByName('gra-time');
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].checked) {
      pageState["nowGraTime"] = obj[i].value;
    }
  }

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化（好像选项发生变化才会触发这个函数，这里不用判断的）

  // 设置对应数据
  pageState["nowSelectCity"] = document.getElementById('city-select').value;

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  //初始化 radio 的值
  var obj = document.getElementsByName('gra-time');
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].checked) {
      pageState["nowGraTime"] = obj[i].value;
    }
  }

  //当点击时调用 graTimeChange 改变 radio 值并渲染页面
  document.getElementById('form-gra-time').onchange = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var allCity = "";
  for (var city in aqiSourceData) {
    allCity += "<option>" + city + "</option>"
  }
  //初始化下拉框中的选项
  document.getElementById('city-select').innerHTML = allCity;

  //给select设置事件， 当选项发生变化时调用函数citySelectChange
  document.getElementById('city-select').onchange = citySelectChange;
  pageState["nowSelectCity"] = "北京";
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  //天的数据
  chartData['day'] = aqiSourceData;

  //周的数据
  cityWeekData = {}
  for (var city in aqiSourceData) {
    //对每个城市处理
    oneCityData = aqiSourceData[city];
    var dayInXAis = Object.getOwnPropertyNames(oneCityData);

    //把天归到周中，字典初始化
    var oneCityWeekData = {};
    for (var day = 0; day < dayInXAis.length; day++) {
      monthWeekIndex = dayInXAis[day].slice(5, 7) + "-0" + ((Math.floor(parseInt(dayInXAis[day].slice(8, 10)) / 7)) + 1).toString();
      oneCityWeekData[monthWeekIndex] = 0;
    }

    for (var day = 0; day < dayInXAis.length; day++) {
      monthWeekIndex = dayInXAis[day].slice(5, 7) + "-0" + ((Math.floor(parseInt(dayInXAis[day].slice(8, 10)) / 7)) + 1).toString();
      oneCityWeekData[monthWeekIndex] += oneCityData[dayInXAis[day]];
    }
    cityWeekData[city] = oneCityWeekData;
  }
  chartData['week'] = cityWeekData;

  //月的数据
  cityMonthData = {}
  for (var city in aqiSourceData) {
    //对每个城市处理
    oneCityData = aqiSourceData[city];
    var dayInXAis = Object.getOwnPropertyNames(oneCityData);

    //把天归到月中，对字典进行初始化
    var oneCityMonthData = {};
    for (var day = 0; day < dayInXAis.length; day++) {
      oneCityMonthData[dayInXAis[day].slice(5, 7)] = 0;
    }

    for (var day = 0; day < dayInXAis.length; day++) {
      var monthIndex = dayInXAis[day].slice(5, 7);
      oneCityMonthData[monthIndex] += oneCityData[dayInXAis[day]];
    }
    cityMonthData[city] = oneCityMonthData;
  }
  chartData['month'] = cityMonthData;

  //初始化渲染，第一次进入页面时显示的图表。
  renderChart();
}

function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();