/*
 * @Date: 2020-01-10 13:55:35
 * @LastEditors: hxz
 * @LastEditTime: 2020-01-10 13:55:38
 */
export default {
  getQueryString: name => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(decodeURI(r[2]));
    }
    return null;
  }
};
