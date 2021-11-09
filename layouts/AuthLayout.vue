<template>
  <div class="auth-layout wrapper bgColor-background">
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3 class="Color-white">CABS REPORTING</h3>
        <strong>CR</strong>
      </div>

      <ul class="list-unstyled components">
        <li>
          <NuxtLink to="/home">
            <i class="fas fa-home"></i>
            Home
          </NuxtLink>
        </li>
        <li>
          <a
            href="#pageSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <i class="fas fa-copy"></i>
            Reports
          </a>
          <ul class="collapse list-unstyled" id="pageSubmenu">
            <li>
              <a
                href="#accountsSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle m-0 py-0 pl-3"
              >
                <NuxtLink class="body-detail" to="/accounts">Accounts</NuxtLink>
              </a>
              <ul class="collapse list-unstyled" id="accountsSubmenu">
                <li>
                  <NuxtLink class="pl-5 small" to="/accounts/downloads"
                    ><span class="pl-2">Downloads</span></NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#fundsSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle m-0 py-0 pl-3"
              >
                <NuxtLink class="body-detail" to="/funds-transfer"
                  >Funds Transfer</NuxtLink
                >
              </a>
              <ul class="collapse list-unstyled" id="fundsSubmenu">
                <li>
                  <NuxtLink class="pl-5 small" to="/funds-transfer/downloads"
                    ><span class="pl-2">Downloads</span></NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#tellerSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle m-0 py-0 pl-3"
              >
                <NuxtLink class="body-detail" to="/teller">Teller</NuxtLink>
              </a>
              <ul class="collapse list-unstyled" id="tellerSubmenu">
                <li>
                  <NuxtLink class="pl-5 small" to="/teller/downloads"
                    ><span class="pl-2">Downloads</span></NuxtLink
                  >
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li v-if="user.role == 'admin'">
          <NuxtLink to="/settings"
            ><i class="fas fa-cog"></i> Settings</NuxtLink
          >
        </li>
        <li @click="logout()">
          <a href="#">
            <i class="fas fa-lock"></i>
            Logout
          </a>
        </li>
      </ul>
    </nav>
    <div id="content">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <button type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fas fa-align-left"></i>
          </button>
          <button
            class="btn btn-dark d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-align-justify"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav navbar-nav ml-auto">
              <li class="nav-item active">
                <h2 class="Color-white mx-3 section-header">{{ title }}</h2>
                <p class="Color-white mx-3">{{ user.fullName }}</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="main-content">
        <nuxt></nuxt>
      </div>
    </div>
  </div>
</template>
<script>
import users from "@/assets/js/users";
export default {
  watch: {
    $route() {
      this.title = this.$route.name.replace("-", " ").toUpperCase();
    },
  },
  data() {
    return {
      title: "HOME",
      auth: false,
      user: {
        businessUnit: "",
        delFlag: "",
        emailId: "",
        fullName: "",
        id: 0,
        modifiedBy: "",
        omId: "",
        role: false,
        status: "",
        submittedBy: "",
        updatedAt: "",
      },
      role: "",
      error: "",
    };
  },
  async mounted() {
    $(document).ready(function () {
      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $("#content").toggleClass("table-active");
      });
    });

    if (
      window.localStorage.getItem("id") === null ||
      window.localStorage.getItem("id") === "null"
    ) {
      $nuxt.$on("auth", (auth) => {
        this.auth = auth;
      });
      window.location.href = "/";
    } else {
      await this.getUser(window.localStorage.getItem("id"));
      $nuxt.$emit("auth", true);
      this.auth = true;
    }
  },
  created() {
    this.title = this.$route.name.replace("-", " ").toUpperCase();
  },
  methods: {
    logout() {
      window.localStorage.clear();
      $nuxt.$emit("auth", false);
      this.$router.push("/");
    },
    async getUser(id) {
      await users
        .getUserByID(id)
        .then((response) => {
          this.user = response;
        })
        .catch((error) => {
          this.role = null;
          this.error = error.data.message;
        });
    },
  },
};
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
