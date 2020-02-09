import {ADD_COUNT,ADD_TO_CART} from './mutation-type'

export default  {
  addCart(context, payload){
    // payload新添加的商品
    return new Promise((resolve, reject) => {
      // 查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNT, oldProduct)
        resolve('当前商品数量+1')
      }else {
        // 当前加入的是新商品 则数量+1并push进来
        // oldProduct.count = 1
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })

  }
}