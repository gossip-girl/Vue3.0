// 封装axios
import axios from "axios";
import router from "../router/index.js";
import baseUrl from "./api/base.js";
const toLogin = () => {
  /*window.location.href='/?token=1'*/
  if (window.location.href.indexOf("#/login") === -1) {
    router.replace({
      path: "/login"
    });
  }
};

const statusMap = [
  {
    "400": "错误请求",
    "401": "请求要求身份验证",
    "403": "请求被拒绝",
    "404": "请求的资源或接口不存在",
    "405": "客户端请求中的方法被禁止",
    "406": "服务器无法根据客户端请求的内容特性完成请求",
    "407": "要求进行代理身份验证",
    "408": "服务器等候请求时发生超时",
    "409": "服务器找不到请求的地址",
    "410": "服务器找不到请求的地址",
    "411": "服务器拒绝接受不带Content-Length请求头的客户端请求",
    "412": "客户端请求信息的先决条件错误",
    "413": "服务器无法处理请求，因为请求实体过大，超出服务器的处理能力",
    "415": "服务器无法处理请求附带的媒体格式",
    "416": "客户端请求的范围无效",
    "417": "服务器无法满足Expect的请求头信息",
    "422": "无法处理的请求实体",
    "423": "当前资源被锁定 ",
    "424": "依赖导致的失败",
    "426": "客户端应当切换到TLS/1.0",
    "428": "要求先决条件",
    "429": "太多请求",
    "431": "请求头字段太大",
    "451": "该请求因法律原因不可用",
    "500": "服务器内部错误，无法完成请求",
    "501": "服务器不支持请求的功能，无法完成请求",
    "502": "错误网关",
    "503": "服务器目前无法使用（由于超载或停机维护）",
    "504": "网关访问超时",
    "505": "HTTP 版本不受支持",
    "506": "服务器内部配置错误",
    "507": "服务器无法存储完成请求所必须的内容",
    "508": "服务器存储空间不足",
    "509": "服务器达到带宽限制",
    "510": "获取资源所需要的策略并没有没满足",
    "511": "要求网络认证",
    "10009": "用户凭证已过期",
    "10022": "Token缺失",
    "10023": "Token已过期",
    "10024": "Token已失效",
    "10025": "Token错误",
    "10026": "临时授权码过期",
    "10027": "第三方授权服务端异常",
    "10028": "临时授权码错误",
    "10110": "不允许访问（功能未授权）",
    "10111": "请求失败",
    "10112": "数据为空",
    "10113": "参数类型不匹配",
    "10114": "缺少矩阵变量",
    "10115": "缺少URI模板变量",
    "10116": "缺少Cookie变量",
    "10117": "缺少请求头",
    "10118": "缺少参数",
    "10119": "缺少请求对象",
    "10120": "参数规则不满足",
    "10121": "参数绑定错误",
    "10122": "参数解析错误",
    "10123": "参数验证失败",
    "10201": "服务器：运行时异常",
    "10202": "服务器：空值异常",
    "10203": "服务器：数据类型转换异常",
    "10204": "服务器：IO异常",
    "10205": "服务器：未知方法异常",
    "10206": "服务器：非法参数异常",
    "10207": "服务器：数组越界异常",
    "10208": "服务器：网络异常"
  }
];

const errorHandle = (error, noToast) => {
  const message =
    error.data.msg ||
    error.data.message ||
    statusMap[0][error.data.code] ||
    "服务请求异常";
  console.log(error);
  console.log(error.data);
  console.log(error.data.code);
  console.log(error.data.state);

  //处理token过期问题
  if (
    error.data.err_code == 10010 ||
    error.data.err_code == 10022 ||
    error.data.err_code == 10023 ||
    error.data.err_code == 10024 ||
    error.data.err_code == 10021 ||
    error.data.err_code == 10100017 ||
    error.data.err_code == 99
  ) {
    toLogin();
  } else {
    if (error.status != 200) {
      if (error.status == 401) {
        toLogin();
      } else {
        noToast ? null : alertFn(message, false);
      }
    } else {
      noToast ? null : alertFn(message, false);
    }
  }
};

export const objectToFormData = function (obj, form, namespace) {
  let fd = form || new FormData();
  let formKey;
  if (obj instanceof Array) {
    for (let item of obj) {
      if (typeof item === "object" && !(item instanceof File)) {
        objectToFormData(item, fd, namespace + "[]");
      } else {
        // 若是数组则在关键字后面加上[]
        fd.append(namespace + "[]", item);
      }
    }
  } else {
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          // 若是对象，则这样
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }
        // if the property is an object, but not a File,
        // use recursivity.
        if (
          typeof obj[property] === "object" &&
          !(obj[property] instanceof File)
        ) {
          // 此处将formKey递归下去很重要，因为数据结构会出现嵌套的情况
          objectToFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
  }
  return fd;
};

// 一些请求的基本配置
axios.defaults.withCredentials = false;
// 输出方法
export default function request ({
  url,
  data = {},
  method = "post",
  download,
  notoken,
  noToast,
  pro,
  app = false,
  contentType
}) {
  let token = localStorage.getItem("token");

  let service;
  service = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: !notoken && token ? "Bearer " + token : ""
    },
    timeout: 60000 // 超时时间 1分钟
  });
  return new Promise((resolve, reject) => {
    const options = { url, method };
    if (download) {
      options.responseType = "blob";
    }
    if (pro) {
      options.onUploadProgress = progressEvent => {
        // console.log(progressEvent)
        pro(progressEvent);
      };
    }
    if (method.toLowerCase() === "get") {
      options.params = data;
    } else {
      if (
        contentType &&
        contentType.indexOf("application/x-www-form-urlencoded") > -1
      ) {
        options.params = data;
      } else if (
        contentType &&
        contentType.indexOf("multipart/form-data") > -1
      ) {
        options.data = objectToFormData(data);
      } else {
        options.data = data;
      }
    }
    service(options)
      .then(res => {
        // console.log(res);
        //成功回调
        if (download) {
          resolve(res);
        } else {
          if (res.data.err_code == "0") {
            res.data.code = "1";
            //成功
            resolve(res.data);
          } else {
            //失败
            errorHandle(res), reject(res);
          }
        }
      })
      .catch(error => {
        console.log(error)
        // 失败回调
        reject(error);
        if (error.response) {
          errorHandle(error.response, noToast);
        } else {
          console.log("Error", error.message || error.msg);
          noToast ? null : alertFn("未知错误，请联系管理员", false);
        }
      });
  });
}
