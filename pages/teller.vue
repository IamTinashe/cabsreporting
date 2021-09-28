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
                  csv-title="teller"
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
import teller from "@/assets/js/teller";
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
          text: "Acc 1",
          align: "start",
          sortable: false,
          value: "account_1",
        },
        { text: "Acc 2", value: "account_2" },
        {
          text: "Cust 2",
          value: "customer_2",
          filter: (value) => {
            if (!this.customer) return true;

            return value < parseInt(this.customer);
          },
        },
        { text: "Teller ID 1", value: "teller_ID_1" },
        { text: "Teller ID 2", value: "teller_ID_2" },
        { text: "Co Code", value: "coCode" },
        { text: "Amt FCY 1", value: "amount_FCY_1" },
        { text: "Amt FCY 2", value: "amount_FCY_2" },
        { text: "Amt Local 1", value: "amount_LOCAL_1" },
        { text: "Amt Local 2", value: "amount_LOCAL_2" },
        { text: "Authoriser", value: "authoriser" },
        { text: "Charge Cat", value: "charge_CATEGORY" },
        { text: "Charge Code", value: "charge_CODE" },
        { text: "Charge Amt FCCY", value: "chrg_AMT_FCCY" },
        { text: "Charge Amt Local", value: "chrg_AMT_LOCAL" },
        { text: "Curr 1", value: "currency_1" },
        { text: "Curr 2", value: "currency_2" },
        { text: "Date", value: "date_TIME" },
        { text: "Denom", value: "denomination" },
        { text: "Dept Code", value: "dept_CODE" },
        { text: "Dr CR Marker", value: "dr_CR_MARKER" },
        { text: "Dr Denom", value: "dr_DENOM" },
        { text: "Inputter", value: "inputter" },
        { text: "Narrative 1", value: "narrative_1" },
        { text: "Narrative 2", value: "narrative_2" },
        { text: "Net Amt", value: "net_AMOUNT" },
        { text: "Our Ref", value: "our_REFERENCE" },
        { text: "Rate 1", value: "rate_1" },
        { text: "Rate 2", value: "rate_2" },
        { text: "Their Ref", value: "their_REFERENCE" },
        { text: "Trans Code", value: "transaction_CODE" },
        { text: "TT ID", value: "tt_ID" },
        { text: "Unit", value: "unit" },
        { text: "Val Date 1", value: "value_DATE_1" },
        { text: "Val Date 2", value: "value_DATE_2" },
        { text: "Waive Charges", value: "waive_CHARGES" }
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
      this.values = await teller.getRecords(this.page, this.itemsPerPage);
      this.data = this.values.content;
      this.page = this.values.pageable.pageNumber;
      this.pageCount = this.values.totalPages;
      this.itemsPerPage = this.values.pageable.pageSize;
      this.loader = false;
    },
    async getByCoCode() {
      this.loader = true;
      this.values = await teller.getRecordByCoCode(this.search, 0, 100);
      this.data = this.values.content;
      this.page = this.values.pageable.pageNumber;
      this.pageCount = this.values.totalPages;
      this.itemsPerPage = this.values.pageable.pageSize;
      this.loader = false;
    },

    async getByID() {
      this.loader = true;
      this.values = await teller.getRecordByID(this.search, 0, 100);
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