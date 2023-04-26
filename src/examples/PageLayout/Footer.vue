<template>
  <footer class="py-5 footer">
    <div class="container">

      <div class="row">
        <div class="mx-auto mt-1 text-center col-8">
          <p class="mb-0 text-secondary">
            사람과 환경을 생각합니다. 에어시그널
          </p>
          <p class="mb-0 text-secondary text-sm">
            Copyright © {{ new Date().getFullYear() }} Airsignal Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer"
};
</script>
