export function  switchStatus(filterList,status){
  const item = filterList.find(item=>item.value === status)
  if(item) return item.label
  return '-'
}

export function  colorChange(status){
  switch (status) {
        case '0':
          return 'status-zero'; // 如果状态为0，应用红色字体的class
        case '1':
          return 'status-one'; // 如果状态为1，应用红色字体的class
        case '2':
          return 'status-two'; // 如果状态为2，应用蓝色字体的class
        case '3':
          return 'status-three'; // 如果状态为3，应用绿色字体的class
        case '4':
          return 'status-four'; // 如果状态为4，应用橙色字体的class
        case '5':
          return 'status-five'; // 如果状态为5，应用橙色字体的class
        case '6':
          return 'status-six'; // 如果状态为6，应用橙色字体的class
        case '7':
          return 'status-one'; // 如果状态为7，应用红色字体的class
        case '8':
          return 'status-one'; // 如果状态为8，应用红色字体的class
        default:
          return 'text-black'; // 默认情况下，应用黑色字体的class
      }
}