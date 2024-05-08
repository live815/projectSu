import { getQueryConditionList } from "@/api/system/user";
import { ref } from "vue";
import { arrayToTree } from "@/utils/ruoyi";
export default function useQueryConditionList() {
  const roleList = ref([]);
  const deptList = ref([]);
  const postList = ref([]);
  getQueryConditionList().then((res) => {
    if (res && res.depts) {
      roleList.value = res.roles
      console.log(res.roles,'res.roles')
      let arrList=res.depts.filter((item) => item.status==='0')
      // console.log(arrList,"arrList")
      deptList.value = arrayToTree(arrList, arrList[0].parentId, "deptId", "parentId");//res.depts[0].parentId 根据接口返回的 第一个数据 id
      console.log(deptList.value ,"deptList.value ")
      postList.value = res.posts
    }
  });
  return { roleList, deptList, postList };
}
