//时间方法
export const dateOne = (e) =>{
    let d = new Date(e);
    let Y = d.getFullYear();
    let M = d.getMonth() + 1;
    let D = d.getDate();

    if(D<10){
        D = '0' + D;
    }

    if(M<10){
        M = '0' + M;
    }

    let dates = Y + '.' + M + '.' + D;
    return dates;
}

  // 将返回的流数据转换为url
export const getObjectURL = (file) => {
    let url = null;
    if (window.createObjectURL != undefined) {
      url = window.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      try {
        url = window.webkitURL.createObjectURL(file);
      } catch (error) {
        console.log(error);
      }
    } else if (window.URL != undefined) {
      try {
        url = window.URL.createObjectURL(file);
     } catch (error) {
        console.log(error);
      }
    }
   return url;
  }
