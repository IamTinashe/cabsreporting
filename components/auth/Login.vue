<template>
  <section class="login">
    <div class="row align-items-center">
      <div class="col-12 justify-content-center">
        <h1 class="subhead text-center Color-primary mt-5 mb-0">
          <img src="/icons/logo.png" class="w-25"/>
        </h1>
      </div>
    </div>
    <h2 class="section-header Color-primary mt-4 mb-0">SIGN IN</h2>
    <div class="content">
      <div
        class="flex-container pt-0 px-0 text-center align-items-center w-100"
      >
        <div class="borderColor-gray-5 w-100 box-shadow-1"></div>
      </div>
      <div class="row flex-container pb-3 px-md-5 mx-md-2">
        <div class="col-12">
          <validation-observer ref="formValidator" class="w-100">
            <form role="form" class="form w-100">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="EMAIL OR ACCOUNT NAME"
                class="form-input py-3 px-2 my-3 Color-primary p-small"
                v-model="model.email"
              />
              <p class="small Color-error text-left pt-0 mt-0 mb-4 email-error">
                {{ emailError }}
              </p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="PASSWORD"
                class="form-input py-3 px-2 mb-0 Color-primary p-small"
                v-model="model.password"
              />
              <span
                id="toggle-password"
                toggle="#password-field"
                class="
                  fa fa-fw fa-eye fa-eye-slash
                  password-field-icon
                  Color-primary
                  toggle-password
                  cursor-pointer
                "
                @click="showPassword"
              ></span>
              <p
                class="
                  small
                  Color-error
                  pb-0
                  mb-0
                  text-left
                  pt-0
                  mt-0
                  password-error
                "
              >
                {{ passwordError }}
              </p>
              <div class="row px-0 py-4 flex-container">
                <div class="col-12 px-0 text-left">
                  <input type="checkbox" v-model="model.rememberMe" />
                  <small class="small Color-tertiary"> Remember me </small>
                </div>
              </div>
              <div class="row justify-content-center mb-4">
                <div class="col-12">
                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="button button-primary button-pill"
                      style="width: 100%"
                      @click.prevent="onSubmit()"
                    >
                      LOGIN
                    </base-button>
                  </div>
                </div>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      model: {
        email: "",
        password: "",
        rememberMe: false,
      },
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.emailErrorChecked()) {
        this.removeClass("email", "borderColor-error");
        if (this.passwordErrorChecked()) {
          this.removeClass("password", "borderColor-error");
          console.log("success");
        } else {
          this.toggleClass("password", "borderColor-error");
        }
      } else {
        this.toggleClass("email", "borderColor-error");
      }
    },
    showPassword() {
      let password = document.getElementById("password");
      this.toggleClass("toggle-password", "fa-eye-slash");
      password.type = password.type === "password" ? "text" : "password";
    },
    toggleClass(id, className) {
      document.getElementById(id).classList.toggle(className);
    },
    removeClass(id, className) {
      document.getElementById(id).classList.remove(className);
    },
    emailErrorChecked() {
      this.emailError = "";
      if (this.model.email < 1) {
        this.emailError = "Please fill in your email address";
        return false;
      } else if (this.validateEmail(this.model.email) === false) {
        this.emailError = "This email is not valid!";
        return false;
      } else {
        return true;
      }
    },
    passwordErrorChecked() {
      this.passwordError = "";
      if (this.model.password < 1) {
        this.passwordError = "Please fill in your password";
        return false;
      } else {
        return true;
      }
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
</script>
