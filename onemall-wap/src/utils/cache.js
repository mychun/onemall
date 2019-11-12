import storage from 'good-storage';

export const setLocalStorage = data => {
    Object.keys(data).forEach(prop => {
        const el = data[prop];
        storage.set(prop, el);
    });
};

export const loadUserInfo = {
    Authorization: storage.get('Authorization', []),
    avatar: storage.get('avatar', ''),
    nickName: storage.get('nickName', [])
}

const CartUpdate='wx/cart/update'; // 更新购物车的商品
export function cartUpdate(data) {
  return request({
    url: CartUpdate,
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