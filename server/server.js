var express = require('express');
var app = express();
var request = require('request');
var cheerio=require('cheerio');
 
app.get('/:username', function (req, res) {
  var username = req.params.username
  request(`https://github.com/${username}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.header('Access-Control-Allow-Origin', '*')
      res.send(parseHtml(body,username));
      // res.send(body)
    } else {
      res.send('不存在该github用户');
    }
  })
})
 
var server = app.listen(9999, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("端口", port)
})

// 解析 html
function parseHtml(result,username) {
  var $ = cheerio.load(result);
  // 获取icon
  var userIconDom = $('.u-photo.d-block.position-relative'),
  userIcon = userIconDom && userIconDom.attr('href')
  console.log('userIcon',userIcon)

  var svgDom = $('.js-calendar-graph-svg');
  var length = svgDom.children().find('g').length

  if(svgDom && length && svgDom.children()) {
    var target = svgDom.children().find('g').last().children().last();
    // 获取今日提交次数
    var dataDate = target.attr('data-date');
    var dateCount = target.attr('data-count')
    // 获取今日提交颜色
    var dataFill = target.attr('fill');
    console.log('data',dataDate,dataFill)
    
    // var date = new Date();
    // var today = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0'+date.getMonth()+1 :date.getMonth()+1}-${date.getDate()}`
    // console.log('today',today)

    return {
      username: username,
      gitIndex: `https://github.com/${username}`,
      userIcon,
      date: dataDate,
      count: dateCount,
      fill: dataFill,
    }
  }

  return {}
}