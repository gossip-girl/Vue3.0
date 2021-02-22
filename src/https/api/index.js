import request from "../request";
export default {
  groupAdd (data) {
    //添加设备组
    return request({
      url: "api/web/group/add",
      method: "post",
      data
    });
  },
}