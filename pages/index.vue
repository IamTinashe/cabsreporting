<template>
  <section class="container">
    <div class="row small-only-expanded flex-container">
      <div class="col-12 col-md-9 col-lg-6 col-xl-5 small-only-expanded">
        <div class="card overflow-hidden">
          <LoginCard />
          <div class="row flex-container pb-4">
            <div class="col-12">
              <p class="body-detail Color-tertiary">
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    LoginCard: () => import("@/components/auth/Login")
  },
};
</script>
