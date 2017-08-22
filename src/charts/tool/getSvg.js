import * as d3 from 'd3'
import defaultCfg from './defaultCfg'

export default () => {
  let svg
  let stage = d3.select('.app')
  let width = defaultCfg.width
  let height = defaultCfg.height
  let isSvg = stage.select('svg').empty()
  if(isSvg) {
    svg = stage.append('svg')
  } else {
    svg = stage.select('svg')
  }
  svg.attr('width',width).attr('height',height)
  return svg
}