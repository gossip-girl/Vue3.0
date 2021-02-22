import API from '../../https/api'
const state = {
  sex: [
    {
      codeKey: '1',
      codeValue: '男'
    },
    {
      codeKey: '2',
      codeValue: '女'
    },
    {
      codeKey: '3',
      codeValue: '未知'
    }
  ],
}
const mutations = {
  setDict: (state, json) => {
    state[json.key] = json.list;
  }
}

const action = {
  getDict ({ state, commit, dispatch }, key) {
    if (!key || state[key]) {
      return;
    }
    let list = [],
      groupKey = null;
    return API.dictManage.queryCode({ groupKey: key }).then(res => {
      if (res.err_code == "0" && res.data) {
        list = res.data.map(v => {
          return {
            codeValue: v.codeValue,
            codeKey: v.codeKey
          };
        });
        commit("setDictFn", { key, list });
        dispatch("getJson", key);
      }
    });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  action
}