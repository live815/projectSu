const testStore = defineStore("test", {
  state: () => ({
    abc: 100,
  }),
  actions: {
    speak() {
      console.log("speaking");
    },
  },
});

export default testStore;
