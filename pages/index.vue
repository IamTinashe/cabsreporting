<template>
<div class="container-fluid">
  <section class="container">
    <div class="row small-only-expanded flex-container">
      <div class="col-12 col-md-9 col-lg-6 col-xl-5 small-only-expanded">
        <div class="card overflow-hidden">
          <LoginCard />
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  components: {
    LoginCard: () => import("@/components/auth/Login")
  },
  beforeMount() {
    if(window.localStorage.getItem('id') == null){
      window.location.href = '/home';
    }
  },
};
</script>
