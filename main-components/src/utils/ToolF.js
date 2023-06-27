/*
*比如我要写一个日历插件,要把每月的日期跟星期几一一对应起来,一个怎么写
* */
export function generateCalendar(year, month) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const lastDateOfMonth = lastDayOfMonth.getDate();
  const weeks = [];
  let week = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    week.push(null);
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    week.push(i);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    for (let i = week.length; i < 7; i++) {
      week.push(null);
    }
    weeks.push(week);
  }
  return weeks;
}

// 找出里面所有的时间
export function allDate(contentList) {
  // 首先将operationTimeList数组中的每个对象的时间属性取出来，组成一个新的数组
  const timeArray = contentList.flatMap(obj => obj.operationTimeList.map(innerObj => [innerObj.rStartTime, innerObj.rEndTime, innerObj.vEndTime]));
  // 然后将新数组中的每个子数组展开成一个大数组
  const flattenedTimeArray = [].concat(...timeArray);
  console.log(flattenedTimeArray);
  return flattenedTimeArray;
}

// 找出所有时间里面最大，最小的时间
export function minMaxTime(data) {
  let arr = [];
  let len = null;
  let hoursDiff = null;
  // 首先将时间字符串数组转换为Date对象数组
  const dateArray = data.map(str => new Date(str));
  // 然后找出最大和最小的Date对象
  const maxDate = new Date(Math.max(...dateArray));
  const minDate = new Date(Math.min(...dateArray));
  minDate.setMinutes(0);
  minDate.setSeconds(0);
  const minDateString = `${minDate.getFullYear()}-${minDate.getMonth() + 1}-${minDate.getDate()} ${minDate.getHours()}:${minDate.getMinutes()}`;
  const maxTime = maxDate.getHours();
  const minTime = minDate.getHours();
  arr = Array.from({ length: maxTime - minTime + 1 }, (_, i) => i + minTime);
  if (arr.length > 12) {
    arr = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
  }
  len = arr.length;
  arr.unshift('');
  hoursDiff = maxTime - minTime;
  console.log(`${minDate}---${minDateString}---${hoursDiff}----${arr}`, 6666666);
  return [arr, len, hoursDiff, minDateString];
}
// 遍历出相应的时间差
export function getDiffTime(arr, minDate, wMinute, nub) {
  for (let i = 0; i < arr.length; i++) {
    const operationTimeList = arr[i].operationTimeList;
    for (let j = 0; j < operationTimeList.length; j++) {
      const rStartTime = new Date(operationTimeList[j].rStartTime);
      const rEndTime = new Date(operationTimeList[j].rEndTime);
      const vEndTime = new Date(operationTimeList[j].vEndTime);
      const now = new Date(minDate);
      // console.log(now, 4455);
      // console.log(rStartTime, 4455444);
      console.log((rStartTime - now) / (1000 * 60), 'rStartTime - now');
      const diffMinutes1 = (rEndTime - rStartTime) / (1000 * 60) * wMinute;
      const diffMinutes2 = (rStartTime - now) / (1000 * 60) * wMinute + nub;
      const diffMinutes3 = (vEndTime - now) / (1000 * 60) * wMinute + nub;
      operationTimeList[j].realityTime = diffMinutes1; // 实际时间
      operationTimeList[j].realityIntervalTime = diffMinutes2; // 距离左侧的px
      operationTimeList[j].vHours = diffMinutes3; // 预估时间
      // console.log(diffMinutes2, 66666666);
    }
  }
  return arr;
}
// 比较年月日时分的大小
// const dateTimeStrings = ['2022-01-01 10:30', '2022-01-05 12:45', '2022-01-03 15:20', '2022-01-02 08:15', '2022-01-04 19:00'];
// const sortedDateTimes = dateTimeStrings.sort((a, b) => {
//   const [aDate, aTime] = a.split(' ');
//   const [aYear, aMonth, aDay] = aDate.split('-');
//   const [aHour, aMinute] = aTime.split(':');
//   const [bDate, bTime] = b.split(' ');
//   const [bYear, bMonth, bDay] = bDate.split('-');
//   const [bHour, bMinute] = bTime.split(':');
//   const dateA = new Date(aYear, aMonth - 1, aDay, aHour, aMinute);
//   const dateB = new Date(bYear, bMonth - 1, bDay, bHour, bMinute);
//   return dateA - dateB;
// });
// const minDateTime = sortedDateTimes[0];
// const maxDateTime = sortedDateTimes[sortedDateTimes.length - 1];
// console.log(`最小日期时间为 ${minDateTime}，最大日期时间为 ${maxDateTime}`);
//
// // 数组去重
// const arr = [
//   {id: 1, name: 'Alice'},
//   {id: 2, name: 'Bob'},
//   {id: 1, name: 'Charlie'},
//   {id: 3, name: 'David'},
//   {id: 2, name: 'Eve'}
// ];
// const uniqueArr = arr.reduce((acc, cur) => {
//   if (!acc.find(item => item.id === cur.id)) {
//     acc.push(cur);
//   }
//   return acc;
// }, []);
// console.log(uniqueArr);

/*
* 把分钟大于30的变成00，时加1， 小于30的变成0
* */
// const dateTimeStrings = ['2022-01-01 10:30', '2022-01-05 12:45', '2022-01-03 15:20', '2022-01-02 08:15', '2022-01-04 19:00'];
// const updatedDateTimeStrings = dateTimeStrings.map(dateTime => {
//   const [date, time] = dateTime.split(' ');
//   const [year, month, day] = date.split('-');
//   let [hour, minute] = time.split(':');
//   if (minute > 30) {
//     hour = String(Number(hour) + 1);
//     minute = '00';
//   }
//   if (minute > 30) {
//     minute = '00';
//   }
//   return `${year}-${month}-${day} ${hour}:${minute}`;
// });
// console.log(updatedDateTimeStrings);





