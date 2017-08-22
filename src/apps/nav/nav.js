import './nav.less'
import $ from "jquery"
import navTpl from './nav.hbs'
import '../../charts/data/mockData'
import bar from '../../charts/chart/bar'
import line from '../../charts/chart/line'
import area from '../../charts/chart/area'
import pie from '../../charts/chart/pie'
import waterBall from '../../charts/chart/waterBall'
import radar from '../../charts/chart/radar'
import shapeBar from '../../charts/chart/shapeBar'

export default () => {
  $('.app').append(navTpl())

  $('body').on('click','.nav li',function() {
    let chartType = $(this).attr('data-chart')
    $('.select-btn').attr('data-chart',chartType).html($(this).html())
    render(chartType)
  })
  $('body').on('click','.update-btn',function() {
    let chartType = $('.select-btn').attr('data-chart')
    render(chartType)
  })
}

const render = function(type) {
  let html = $('svg defs').html()

  $('svg').html('<defs>'+html+'</defs>')
  $.ajax({
    url:'d3charts.' + type,
    dataType:'json'
  }).done((res)=>{
    let data = res.data
    switch (type) {
      case 'bar':
        bar(data)
        break;
      case 'line':
        line(data)
        break;
      case 'area':
        area(data)
        break;
      case 'pie':
        pie(data)
        break;
      case 'waterBall':
        waterBall(data)
        break;
      case 'radar':
        radar(data)
        break;
      case 'shapeBar':
        shapeBar(data)
        break;
      default:
        alert('请选择图表！！')

    }
  })
}