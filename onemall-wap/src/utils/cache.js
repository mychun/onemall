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
    nickName: storage.get('nickName', []),
    nickName: storage.get('addressId', [])
}
export const loadOrder = {
  addressId: storage.get('addressId', [])
}
