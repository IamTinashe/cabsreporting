<template>
  <section class="login">
    <div class="row align-items-center">
      <div class="col-12 justify-content-center">
        <h1 class="subhead text-center Color-primary mt-5 mb-0">
          <img src="/icons/logo.png" class="w-25"/>
        </h1>
      </div>
    </div>
    <h2 class="section-header Color-primary text-center mt-4 mb-0">SIGN IN</h2>
    <p class="Color-error text-center small mt-3" v-if="error.length > 0"> {{error}}</p>
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
                type="text"
                name="username"
                id="username"
                placeholder="AD USERNAME"
                class="form-input py-3 px-2 my-3 Color-primary p-small"
                v-model="model.username"
                :class="userError?'borderColor-error':'borderColor-black'"
              />
              <p class="small Color-error text-left pt-0 mt-0 mb-4 email-error">
                {{ usernameError }}
              </p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="PASSWORD"
                class="form-input py-3 px-2 mb-0 Color-primary p-small"
                v-model="model.password"
                :class="passError?'borderColor-error':'borderColor-black'"
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
                @click="showPassword()"
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
                  <input type="checkbox" />
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
import login from "@/assets/js/login";
import users from "@/assets/js/users";
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      usernameError: "",
      passwordError: "",
      userError: false,
      passError: false,
      error: '',
      user: {}
    };
  },
  methods: {
    async onSubmit() {
      if (this.usernameErrorChecked()) {
        if (this.passwordErrorChecked()) {
          await login.attempt(this.model).then(async (response) => {
            await users.getUserByOmID(response.username).then(user => {
              this.user = user;
              window.localStorage.setItem('id', user.id);
              $nuxt.$emit('auth', true);
              window.location.href = '/home';
            }).catch(error => {
              this.error = error.data.message;
              $nuxt.$emit('auth', false);
            })
          }).catch(error =>{
           this.error = error.data.message;
            $nuxt.$emit('auth', false);
          });
        } else {
          this.passError = true;
        }
      } else {
        this.userError = true;
      }
    },
    showPassword() {
      let password = document.getElementById("password");
      $("span#toggle-password").toggleClass("toggle-password", "fa-eye-slash");
      password.type = password.type === "password" ? "text" : "password";
    },
    toggleClass(id, className) {
      document.getElementById(id).classList.toggle(className);
    },
    removeClass(id, className) {
      document.getElementById(id).classList.remove(className);
    },
    usernameErrorChecked() {
      this.usernameError = "";
      if (this.model.username < 1) {
        this.usernameError = "Please fill in your email address";
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
  },
  async loginAttempt(){

  }
};
</script>
