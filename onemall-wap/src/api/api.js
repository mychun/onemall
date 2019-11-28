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

const UserIndex='wx/user/index'; //个人页面用户相关信息
export function userIndex() {
  return request({
    url: UserIndex,
    method: 'get'
  })
}

const AuthLoginByAccount='wx/auth/login'; //账号登录
export function authLoginByAccount(data) {
  return request({
    url: AuthLoginByAccount,
    method: 'post',
    data
  })
}

const CartAdd='wx/cart/add'; // 添加商品到购物车
export function cartAdd(data) {
  return request({
    url: CartAdd,
    method: 'post',
    data
  })
}

const CartGoodsCount='wx/cart/goodscount'; // 获取购物车商品件数
export function cartGoodsCount() {
  return request({
    url: CartGoodsCount,
    method: 'get'
  })
}

const CartList='wx/cart/index'; //获取购物车的数据
export function cartList(query) {
  return request({
    url: CartList,
    method: 'get',
    params: query
  })
}
const CartUpdate='wx/cart/update'; // 更新购物车的商品
export function cartUpdate(data) {
  return request({
    url: CartUpdate,
    method: 'post',
    data
  })
}
const CartDelete='wx/cart/delete'; // 删除购物车的商品
export function cartDelete(data) {
  return request({
    url: CartDelete,
    method: 'post',
    data
  })
}
const CartChecked='wx/cart/checked'; // 选择或取消选择商品
export function cartChecked(data) {
  return request({
    url: CartChecked,
    method: 'post',
    data
  })
}
const CartCheckout='wx/cart/checkout'; // 下单前信息确认
export function cartCheckout(query) {
  return request({
    url: CartCheckout,
    method: 'get',
    params: query
  })
}