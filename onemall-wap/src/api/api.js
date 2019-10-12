import request from '@/utils/request';

const GoodsList='wx/goods/list'; //获得商品列表
export function getGoodsList(query) {
  return request({
    url: GoodsList,
    method: 'get',
    params: query
  })
}

const IndexUrl= 'wx/home/index'; //首页数据接口
export function getHome() {
  return request({
    url: IndexUrl,
    method: 'get'
  })
}

const GoodsDetail='wx/goods/detail'; //获得商品的详情
export function goodsDetail(query) {
  return request({
    url: GoodsDetail,
    method: 'get',
    params: query
  })
}