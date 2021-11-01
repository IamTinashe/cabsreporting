<template>
  <div class="container-fluid">
    <div class="container">
      <span v-if="sent == true">The report has been sent</span>
      <div class="row">
        <div class="col-md-4" v-for="(card, index) in reports" :key="index">
          <div class="custom-card px-4 pt-4">
            <div class="card-title w-60 text-left">
              <h4 class="group-header Color-gray-40 mb-0 text-uppercase">
                {{ card.title }}
              </h4>
              <h3 class="section-header Color-black">{{ card.number }}</h3>
            </div>
            <div class="card-icon float-left w-20">
              <div
                class="
                  icon-bg-circle
                  bgColor-light-green bgColor-hover-green
                  mt-2
                "
              >
                <i
                  class="fa fa-download fa-1x mt-2 pt-1 Color-white"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div class="card-icon float-left w-20">
              <div
                class="
                  icon-bg-circle
                  bgColor-light-green bgColor-hover-green
                  mt-2
                "
                @click="sendEmail(card.emailUrl)"
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
import emails from "@/assets/js/emails";
export default {
  layout(context) {
    return "AuthLayout";
  },
  data() {
    return {
      reports: [
        {
          title: "Daily Corporate",
          downloadUrl: "/app/dailyCorp",
          emailUrl: "/app/dailyCorp",
          number: "350,897",
        },
        {
          title: "Daily Individual",
          downloadUrl: "/app/dailyInd",
          emailUrl: "/app/dailyInd",
          number: "350,897",
        },
        {
          title: "Daily Individual",
          downloadUrl: "/app/individual",
          emailUrl: "/app/individual",
          number: "350,897",
        },
        {
          title: "Top 50 Trans Acc",
          downloadUrl: "/app/top50transAcc",
          emailUrl: "/app/top50transAcc",
          number: "350,897",
        },
        {
          title: "Weekly Corporate",
          downloadUrl: "/app/weeklyCorp",
          emailUrl: "/app/weeklyCorp",
          number: "350,897",
        },
        {
          title: "Weekly Individual",
          downloadUrl: "/app/weeklyInd",
          emailUrl: "/app/weeklyInd",
          number: "350,897",
        },
      ],
      sent: false
    };
  },
  methods: {
    async sendEmail(endpoint) {
      await emails
        .send(endpoint)
        .then((response) => {
          console.log(response);
          this.sent = true;
        })
        .catch((error) => {
          console.log(error);
          this.sent = false;
        });
    },
  },
};
</script>