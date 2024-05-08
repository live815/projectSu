import { getQueryConditionList } from "@/api/system/user";
import { ref } from "vue";
export default function useQueryConditionList() {
  const typeList = ref([]);

  getQueryConditionList().then((res) => {
    if (res && res.depts) {
      typeList.value = res.roles;
    }
  });
  return { typeList };
}
