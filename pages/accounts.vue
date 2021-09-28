<template>
  <div>
    <client-only>
      <v-data-table
        :headers="headers"
        :items="data"
        item-key="name"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        v-if="loader == false"
      >
        <template v-slot:top>
          <div class="row">
            <div class="col-md-3">
              <div class="float-left" v-if="searchActive == true">
                <i @click="handleBack()" class="fa fa-arrow-alt-circle-left fa-2x mt-3 mx-3 Color-secondary cursor-pointer"></i>
              </div>
              <v-text-field
                v-model="search"
                label="SEARCH"
                class="mx-4"
              ></v-text-field>
            </div>
            <div class="col-md-2" data-app>
              <v-select
                v-model="searchSelect"
                :items="items"
                label="SEARCH BY"
                @change="handleSearch()"
              ></v-select>
            </div>
            <div class="col-md-1">
              <button
                class="
                  w-100
                  py-2
                  button button-primary
                  background-primary
                  border-0 rounded
                  text-regular
                  mt-2
                "
                @click="handleSearch()"
              >
                <b class="small">Search</b>
                <span class="ml-1"
                  ><i class="fa fa-search" aria-hidden="true"></i
                ></span>
              </button>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-2">
              <client-only>
                <vue-json-to-csv
                  :json-data="data"
                  :labels="{
                    accId: { title: 'Account ID' },
                    customer: { title: 'Customer' },
                    accountTitle1: { title: 'Account Title' },
                    accountOfficer: { title: 'Account Officer' },
                    category: { title: 'Category' },
                    coCode: { title: 'Co Code' },
                    currency: { title: 'Currency' },
                    misDate: { title: 'MisDate' },
                    mnemonic: { title: 'Mnemonic' },
                    onlineActualBal: { title: 'Online Actual Balance' },
                    onlineClearedBal: { title: 'Online Cleared Balance' },
                    openActualBal: { title: 'Open Actual Balance' },
                    openClearedBal: { title: 'Open Cleared Balance' },
                    otherOfficer: { title: 'Other Officer' },
                    workingBalance: { title: 'Working Balance' }
                  }"
                  csv-title="accounts"
                  class="w-100"
                >
                  <button
                    class="
                      w-90
                      py-2
                      button button-primary
                      background-primary
                      border-0 rounded
                      text-regular
                      mt-2
                      mr-0
                    "
                  >
                    <b class="small">Download Report</b>
                    <span class="ml-1"
                      ><i class="fa fa-download" aria-hidden="true"></i
                    ></span>
                  </button>
                </vue-json-to-csv>
              </client-only>
            </div>
            <div class="col-md-2">
              <button
                class="
                  w-90
                  py-2
                  button button-primary
                  background-primary
                  border-0 rounded
                  text-regular
                  mt-2
                  mr-3
                "
                @click="sendEmail()"
              >
                <b class="small">Email Report</b>
                <span class="ml-1"
                  ><i class="fa fa-envelope" aria-hidden="true"></i
                ></span>
              </button>
            </div>
          </div>
        </template>
        <template v-slot:body.append>
          <tr>
            <td></td>
            <td>
              <v-text-field
                v-model="customer"
                type="number"
                label="Less than"
              ></v-text-field>
            </td>
            <td colspan="4"></td>
          </tr>
        </template>
      </v-data-table>
      <div class="text-center" v-else>Loading</div>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="10"
        ></v-pagination>
      </div>
    </client-only>
  </div>
</template>

<script>
import accounts from "@/assets/js/accounts";
export default {
  layout(context) {
    return "AuthLayout";
  },
  data() {
    return {
      searchActive: false,
      search: "",
      customer: "",
      values: {},
      data: [],
      selectedMonth: "",
      page: 0,
      pageCount: 0,
      itemsPerPage: 50,
      loader: false,
      searchSelect: "",
      items: ["cocode", "id"],
    };
  },
  watch: {
    page: async function (val) {
      this.page = val;
      await this.getRecords();
    },
  },
  async mounted() {
    await this.getRecords();
  },
  computed: {
    headers() {
      return [
        {
          text: "Account ID",
          align: "start",
          sortable: false,
          value: "accId",
        },
        {
          text: "Customer",
          value: "customer",
          filter: (value) => {
            if (!this.customer) return true;

            return value < parseInt(this.customer);
          },
        },
        { text: "Account Officer", value: "accountOfficer" },
        { text: "Account Title 1", value: "accountTitle1" },
        { text: "Category", value: "category" },
        { text: "Co Code", value: "coCode" },
        { text: "Currency", value: "currency" },
        { text: "Misdate", value: "misDate" },
        { text: "Mnemonic", value: "mnemonic" },
        { text: "Online Actual Bal", value: "onlineActualBal" },
        { text: "Online Cleared Bal", value: "onlineClearedBal" },
        { text: "Open Actual Bal", value: "openActualBal" },
        { text: "Open Cleared Bal", value: "openClearedBal" },
        { text: "Other Officer", value: "otherOfficer" },
        { text: "Working Balance", value: "workingBalance" },
      ];
    },
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
    async getRecords() {
      this.loader = true;
      this.values = await accounts.getRecords(this.page, this.itemsPerPage);
      this.data = this.values.content;
      this.page = this.values.pageable.pageNumber;
      this.pageCount = this.values.totalPages;
      this.itemsPerPage = this.values.pageable.pageSize;
      this.loader = false;
    },
    async getByCoCode() {
      this.loader = true;
      this.values = await accounts.getRecordByCoCode(this.search, 0, 100);
      this.data = this.values.content;
      this.page = this.values.pageable.pageNumber;
      this.pageCount = this.values.totalPages;
      this.itemsPerPage = this.values.pageable.pageSize;
      this.loader = false;
    },

    async getByID() {
      this.loader = true;
      this.values = await accounts.getRecordByID(this.search, 0, 100);
      this.data = [this.values];
      this.page = 0; //this.values.pageable.pageNumber;
      this.pageCount = 1; //this.values.totalPages;
      this.itemsPerPage = 10; //this.values.pageable.pageSize;
      this.loader = false;
    },

    async handleSearch() {
      if (this.searchSelect == "cocode") {
        await this.getByCoCode();
        this.searchActive = true;
      } else if(this.searchSelect == "id") {
        await this.getByID();
        this.searchActive = true;
      }else{
        await this.getRecords();
      }
    },

    async handleBack(){
      this.search = "";
      this.searchSelect = "";
      await this.getRecords();
      this.searchActive = !this.searchActive;
    },

    async sendEmail(){
      console.log('Send to Email')
    }
  },
};
</script>