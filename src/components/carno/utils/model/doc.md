## Model 工具类

对`dva model`的扩展，使得`model`更实用.

安装 `cnpm i -SD path-to-regexp just-compare tree-transform tree-flatten ramda lodash`

## extend

主要作用是继承默认的`model`配置, 
参数:

- defaults: 默认model
- properties: 属性集

如果`defaults`为空,则继承自默认的`model`

默认配置如下:

```javascript
{
    state: {
      visible: false,
      loading: false,
      spinning: false,
      confirmLoading: false
    },
    subscriptions: {},
    effects: {},
    reducers: {
      updateLoading: createNestedReducer('loading'),
      updateConfirmLoading: createNestedReducer('confirmLoading'),
      updateSpinner: createNestedReducer('spinning'),
      showVisible: createNestedValueRecuder('visible', true),
      hideVisible: createNestedValueRecuder('visible', false),
      showLoading: createNestedValueRecuder('loading', true),
      hideLoading: createNestedValueRecuder('loading', false),
      showConfirmLoading: createNestedValueRecuder('confirmLoading', true),
      hideConfirmLoading: createNestedValueRecuder('confirmLoading', false),,
      showSpinning: createNestedValueRecuder('spinning', true),,
      hideSpinning: createNestedValueRecuder('spinning', true),,
      updateState(state, { payload }) {
        return {
          ...state,
          ...payload
        };
      },
      resetState(state) {
        return {
          ...initialState
        }
      }
    }
  }

```

使用示例:

```
import { Model } from 'carno';

export default Model.extend({
  namespace: 'user',

  subscriptions: {},

  effects: {},

  reducers: {}
});
```
部分业务场景中，`model`需要多个`spinning/loading/confirmLoading`状态进行控制，`model`中的默认状态`reducer`都支持嵌套数据更新, 下面我们以`loading`为例(spinning, confirmLoading类似)

- showVisible
  支持单状态以及嵌套状态, 
  单状态: yield put({ type: 'showVisible' })
  多状态: yield put({ type: 'showVisible', payload: { key: 'users' } })
- hideVisible
  支持单状态以及嵌套状态, 
  单状态: yield put({ type: 'hideVisible' })
  多状态: yield put({ type: 'hideVisible', payload: { key: 'users' } })
- showLoading
  支持单状态以及嵌套状态, 
  单状态: yield put({ type: 'showLoading' })
  多状态: yield put({ type: 'showLoading', payload: { key: 'users' } })
- hideLoading
  支持单状态以及嵌套状态, 
  单状态: yield put({ type: 'hideLoading' })
  多状态: yield put({ type: 'hideLoading', payload: { key: 'users' } })
- updateLoading
  仅支持嵌套状态
  yield put({ type: 'updateLoading', payload: { user: true } })
- callLoading
  支持单状态以及嵌套状态, 
  单状态: yield callLoading(services.getUsers);
  多状态: yield callLoading(services.getUsers, null, { key: users});

> 注意: 在同一个业务不要混合发送单状态以及多状态的reducer

```javascript

import { Model } from 'carno';

export default Model.extend({

  state: {
    // 如果同一个页面中，有多处confirmLoading或者spinner, 可以参考如下定义state
    spinning: {
      users: false,
      logs: false
    }
  },

  effects: {
    *fetchUsers({ payload }, { put }) {
      yield put({ type: 'showSpinning', payload: { key: 'users' }});
      yield call(services.getUsers);
      yield put({ type: 'hideSpinning', payload: { key: 'users' }});

      // 也可以使用如下写法: 
      yield callSpinning(services.getUsers, null, { key: 'users' });
    },
    *fetchLogs({ payload }, { put }) {
      yield put({ type: 'showSpinning', payload: { key: 'logs' }});
      yield call(services.getLogs);
      yield put({ type: 'hideSpinning', payload: { key: 'logs' }});
    }
  }
})


```



如果项目中需要扩展`defaultModel`，可以自行包装一个`extend`方法,参考如下代码:

```javascript

import { Model } from 'carno';

const extend = (properties) => {
  const defaultModel = {
    ...
  };

  return Model.extend(defaultModel, properties);
}

export extend;
```


### subsciptions扩展

为方便对`path`的监听，在`model`的subscriptions配置函数参数中，额外添加了扩展方法`listen`    
`listen`函数参数如下：

- pathReg
  需要监听的pathName
- action
  action既可以是 redux action,也可以是一个回调函数
  如果action是函数，调用时，将传入{ ...location, params }作为其参数

listen函数也支持同时多多个pathname的监听，传入的参数需要为`{pathReg: action}`健值对的对象.

```javascript
import { Model } from 'carno';

export default Model.extend({

  namespance: 'user',

  subscriptions: {
    setup({ dispatch, listen }) {
      
      //action为 redux action
      listen('/user/list', { type: 'fetchUsers'});

      //action为 回调函数
      listen('/user/query', ({ query, params }) => {
        dispatch({
          type: 'fetchUsers',
          payload: params
        })
      });

      //支持对多个path的监听
      listen({
        '/user/list': ({ query, params }) => {},
        '/user/query': ({ query, params }) => {},
      });
  }
})


```

### effects扩展

此外，我们对`effects`也做了一些扩充，方便处理加载状态以及指定的成功/失败消息.
扩展方法如下:

- R 来自 ramda。 API 文档 ramdajs.com/docs
- _ 来自 lodash。 API 文档 lodashjs.com/docs
- tableBindType 表格字段的异步渲染方式，例如 roleId 需要异步请求 roles 来解析 id -> name
- put 扩展put方法，支持双参数模式 put(type, payload)
- update udpateState的快捷方法 update({ accounts })
- localCache 本地缓存，该缓存游览器关闭依然存在。
- sessionCache  本地缓存，该缓存换页面，重新打开游览器都换一个。
- arrayToTree 从名字看，就是数组转换 tree
- treeToArray 从名字看，就是 tree 转换 array
- arrayToMap 从名字看，就是数组转换 map
- same 判断两个值（基本类型、对象或数组）是否相同
- diff 与 same 相反，判断两个值是否不相同
- get 封装最简单的请求 get 方法
- getLoading 调用请求时，自动处理loading状态
- getConfirmLoading 调用请求时，自动处理confirmLoading状态
- getSpinning 调用请求时，自动处理spinning状态 
- getMessage 与 封装最简单的 get 方法相同，命名不同，显示指定的成功或者失败的消息
- post 封装最简单的请求 post 方法
- postLoading 调用请求时，自动处理loading状态
- postConfirmLoading 调用请求时，自动处理confirmLoading状态
- postSpinning 调用请求时，自动处理spinning状态 
- postMessage 与 封装最简单的 post 方法相同，命名不同，显示指定的成功或者失败的消息
- callLoading 调用请求时，自动处理loading状态
- callConfirmLoading 调用请求时，自动处理confirmLoading状态
- callSpinning 调用请求时，自动处理spinning状态 
- callMessage 调用请求后，显示指定的成功或者失败的消息
- callExtra 原始扩展方法，支持config(loading,confirmloading,success,error)参数

以上函数都支持第三个参数,message = { successMsg, errorMsg }

```javascript
Model.extend({
  state: {},
  effects: {
    *fetchUsers({ payload }, { R, _, localCache, sessionCache, arrayToTree,
     treeToArray, arrayToMap, same, diff, update, put, select, call, get,
     getLoading, getConfirmLoading, getMessage, post, postLoading, 
     postConfirmLoading, postMessage, callLoading, callConfirmLoading, 
     callMessage, callExtra}){



      var xs = [{a: 1}, {a: 2}, {a: 3}];
      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
      R.find(R.propEq('a', 4))(xs); //=> undefined



      var deep = _.cloneDeep(users);
      deep[0] === users[0];
      // => false



      yield localCache.set('key', 'value', 120) // 120 秒，没有设置时间则永久存储
      yield sessionCache.set('key2', 'value')



      //default option 
      const defaultConfig = {
          id: 'id',
          parent: 'parentId',
          children: 'children'
      }
      var array = [
        {
          id:1
        },{
          id:2,
          parentId:1
        },{
          id:3,
          parentId:2
        }
      ]
      
      var b = yield arrayToTree(array, defaultConfig)
      /* b = 
      {
        id: 1, 
        children: [
          {
            id: 2,
            parentId: 1, 
            children: [
              {
                id: 3,
                parentId: 2
              }
            ]
          }
        ]
      }  
      */



      const tree = {
        name: 'root-1',
        children: [
          {
            name: 'root-1-1'
          }, {
            name: 'root-1-2',
            children:[{
              name: 'root-1-2-1'
            }]
          }
        ]
      };

      const c = yield treeToArray(tree, 'children')
      /* c =
        [
          { name: 'root-1' },
          { name: 'root-1-1' },
          { name: 'root-1-2' },
          { name: 'root-1-2-1' },
        ]
      */



      const f = yield arrayToMap(array, e => e.id)
      /* f =
        f[id] = obj
      */

      const p1 = { a: 1, b: 'as', c: [ 1,2,3 ], d: { f: [ 4,5,6 ] } }
      const p2 = { a: 1, b: 'as', c: [ 1,2,3 ], d: { f: [ 4,5,6 ] } }
      const p3 = { a: 2, b: 'bbbbb', c: [ 1,2,3 ], d: { f: [ 4,5,6 ] } }
      const p4 = { a: 1, b: 'as', c: [ 10,2,3 ], d: { f: [ 40,5,6 ] } }

      yield same(p1, p1)// => true
      yield same(p1, p2)// => true
      yield same(p1, p3)// => false
      yield same(p1, p4)// => false

      yield diff(p1, p1)// => false
      yield diff(p1, p2)// => false
      yield diff(p1, p3)// => true
      yield diff(p1, p4)// => true



      //发送请求前，显示loading状态，完成后结束loading状态.如果请求成功则提示加载用户成功,失败则提示
      const users = yield callLoading(service.user.getList,null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      // 等同
      const users = yield getLoading('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      const users = yield postLoading('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});



      //发送请求前，显示ConfirmLoading状态，完成后结束ConfirmLoading状态.如果请求成功则提示加载用户成功,失败则提示
      const users = yield callConfirmLoading(service.user.getList,null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      // 等同
      const users = yield getConfirmLoading('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      const users = yield postConfirmLoading('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});



      //发送请求前，显示spinning状态，完成后结束spinning状态.如果请求成功则提示加载用户成功,失败则提示
      const users = yield callSpinning(service.user.getList,null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      // 等同
      const users = yield getSpinning('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      const users = yield postSpinning('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});



      //仅处理成功/失败的消息提示
      const users = yield callMessage(service.user.getList,null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      // 等同
      const users = yield getMessage('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      const users = yield postMessage('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});


      
      //与上面等同效果
      //仅处理成功/失败的消息提示
      const users = yield callMessage(service.user.getList,null, '用户');
      // 等同
      const users = yield getMessage('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});
      const users = yield postMessage('/user/getList.htm',null,{successMsg:'加载用户成功',errorMsg:'加载用户失败'});



      //支持config参数的call方法，目前仅支持: loading,confirmloading,success,error
      const users = yield callExtra(service.user.getList,null,{
        loading: ture,
        confirmLoading: true,
        successMsg:'加载用户成功',
        errorMsg:'加载用户失败'
      });



      //更新当前model的state
      yield update({ users })
      // update 方法等同于以下方法
      yield put({
        type: 'updateState',
        users,
      })



      //扩展put方法
      yield put('updateItem', { item });
      // 等同于以下方法
      yield put({
        type: 'updateItem',
        item,
      })



    }
  }
})

```
