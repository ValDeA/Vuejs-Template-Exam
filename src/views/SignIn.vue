<template>

  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column" >
              <div class="mt-8 card card-plain" >
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-center">
                    AS-CLOUD와 함께
                  </h3>
                  <p class="font-weight-bold mb-0 text-center">실내공기질 관리를 시작하세요!</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" method="post" :action="this.$store.state.apiUrl + 'api/login'">

                    <label class="text-sm font-weight-bold">이메일</label>
                    <soft-input
                      id="email"
                      type="email"
                      placeholder="이메일 입력"
                      name="userId"
                    />
                    <label class="text-sm font-weight-bold">비밀번호</label>
                    <soft-input
                      id="password"
                      type="password"
                      placeholder="비밀번호 입력"
                      name="password"
                    />

                    <soft-switch id="rememberMe" name="rememberMe" checked>
                      아이디 기억하기
                    </soft-switch>
                    <div class="text-center ">
                      <soft-button class="my-4 mb-2" variant="gradient" color="primary" full-width>
                        로그인
                      </soft-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm font-weight-bold">
                    아직 회원이 아니신가요?
                    <router-link :to="{ name: 'Sign Up' }" class="text-success font-weight-bold">회원가입</router-link>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftInput from "@/components/SoftInput.vue";
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

export default {
  name: "SignIn",
  components: {
    AppFooter,
    SoftInput,
    SoftSwitch,
    SoftButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
  },
};
</script>
