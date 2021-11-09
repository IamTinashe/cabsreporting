<template>
  <div class="container-fluid">
    <div class="container">
      <span v-if="sent == true">The report has been sent</span>
      <input type="date" v-model="date">
      <div class="row">
        <div class="col-12 col-sm-6 col-lg-4" v-for="(card, index) in reports" :key="index">
          <div class="custom-card px-4 pt-4">
            <div class="card-title w-60 text-left">
              <h4 class="group-header Color-gray-40 mb-0 text-uppercase">
                {{ card.title }}
              </h4>
              <h3 class="section-header Color-black">{{ card.number }}</h3>
            </div>
            <div class="card-icon float-left w-20">
              <a
                class="
                  icon-bg-circle
                  bgColor-light-green bgColor-hover-green
                  mt-2
                "
                :href="'http://180.10.1.53:8042' + card.downloadUrl"
                target="_blank"
              >
                <i
                  class="fa fa-download fa-1x mt-2 pt-1 Color-white"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
            <div class="card-icon float-left w-20">
              <div
                class="
                  icon-bg-circle
                  bgColor-light-green bgColor-hover-green
                  mt-2
                "
                @click="email(card.emailUrl)"
              >
                <i
                  class="fa fa-envelope fa-1x mt-2 pt-1 Color-white"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import downloads from "@/assets/js/downloads";
export default {
  layout(context) {
    return "AuthLayout";
  },
  data() {
    return {
      date: '',
      reports: [
        {
          title: "AUTHORIZED OD",
          downloadUrl: "/api/accounts/download/authorizedOD",
          emailUrl: "/api/accounts/download/authorizedOD",
          number: "",
        },
        {
          title: "UNAUTHORIZED OD",
          downloadUrl: "/api/accounts/download/unauthorizedOD",
          emailUrl: "/api/accounts/download/unauthorizedOD",
          number: "",
        },
        {
          title: "NEW ACCOUNTS",
          downloadUrl: "/api/accounts/NewAccounts",
          emailUrl: "/api/accounts/NewAccounts",
          number: "",
        },
        {
          title: "OD ACCOUNTS",
          downloadUrl: "/api/accounts/OdAccounts",
          emailUrl: "/api/accounts/OdAccounts",
          number: "",
        }
      ],
      sent: false
    };
  },
  async mounted() {
    await this.download();
  },
  methods: {
    async download() {
      let index = 0;
      for (index in this.reports){
        await downloads.get(this.reports[index].downloadUrl).then((response) => {
          this.reports[index].number = this.space(response.length.toString())
        })
      }
    },

    async email(api){
      console.log(api);
    },

    space(str) {
      if (str.length > 3) {
        return str.substring(0, str.length - 3) + "," + str.substring(str.length - 3);
      } else {
        return str;
      }
    },
  },
};
</script>