Vue.config.devtools = true;
window.addEventListener("DOMContentLoaded", () => {
  const vueApp = new Vue({
    el: "#vueApp",
    data: {
      emailArray: [],
      pendingProcesses: 0,
      emailsNumber: 10,
      apiEndpoint: "https://flynn.boolean.careers/exercises/api/random/mail",
      listReady: null,
    },
    methods: {
      generateList(emailToBeGenerated) {
        this.listReady = false;
        this.emailArray = [];
        for (let i = 0; i < emailToBeGenerated; i++) {
          this.getRandomEmail();
        }
      },
      getRandomEmail() {
        this.pendingProcesses++;
        axios.get(this.apiEndpoint).then((response) => {
          if (response.status === 200) {
            this.emailArray.push(response.data.response);
          }
          this.pendingProcesses--;
          this.checkArray();
        });
      },
      checkArray() {
        if (this.pendingProcesses === 0) {
          // debugger;
          if (this.emailArray.length === this.emailsNumber) {
            this.listReady = true;
          } else if (this.emailArray.length < this.emailsNumber) {
            this.generateList(this.emailsNumber - this.emailArray.length);
          }
        }
      },
    },
  });
});
