<template>
  <div class="auth-layout wrapper bgColor-background">
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3 class="Color-white">CABS REPORTING</h3>
        <strong>CR</strong>
      </div>

      <ul class="list-unstyled components">
        <li>
          <NuxtLink
            to="/"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
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
              <NuxtLink to="/accounts">Accounts</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/funds-transfer">Funds Transfer</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/teller">Teller</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-paper-plane"></i>
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
                <h2 class="Color-white mx-3 section-header">{{title}}</h2>
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
export default {
  watch: {
    $route () {
      this.title = this.$route.name.replace("-", " ").toUpperCase();
    }
  },
  data() {
    return {
      title: 'HOME'
    }
  },
  mounted() {
    $(document).ready(function () {
      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $("#content").toggleClass("table-active");
      });
    });
  },
  created(){
    this.title = this.$route.name.replace("-", " ").toUpperCase();
  }
};
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
