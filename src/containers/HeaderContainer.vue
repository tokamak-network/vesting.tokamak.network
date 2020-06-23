<template>
  <div class="header-container">
    <div class="header">
      <div class="header-title-container">
        <div class="header-title" target="_self" rel="noopener noreferrer">
          Tokamak Network Vesting Dashboard
        </div>
      </div>
      <div class="header-link-container">
        <a
          class="header-link"
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          >What is vesting?</a
        >
        <a
          class="header-link"
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          style="margin-left: 48px; margin-right: 36px;"
          >Vesting User Guide</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import GuideDropDown from '@/components/GuideDropDown.vue';

export default {};
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 60px;
  background: #ffffff;
  display: flex;
  justify-content: center;
}

.header {
  width: 960px;
  height: 100%;
  align-items: center;
  display: flex;
}

.header-title-container {
  flex: 1;
}

.header-title {
  margin-top: 7px;
  padding-left: 16px;
  font-size: 20px;
  text-decoration: none;
  font-weight: bold;
}

.header-logo:hover {
  cursor: pointer;
}

.header-link-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-link:hover {
  color: #141414b0;
}

.header-link {
  text-decoration: none;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #7e8d93;
}
</style>
