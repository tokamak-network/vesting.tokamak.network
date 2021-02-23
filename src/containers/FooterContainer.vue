<template>
  <div class="footer-container">
    <div>
      <div class="footer-name">
        ONTHER PTE.LTD.
      </div>
      <div class="footer-address">
        10 ANSON ROAD #23-140 INTERNATIONAL PLAZA SINGAPORE
      </div>
    </div>
    <div>
      <div class="footer-mail-container">
        <dropup
          :items="[
            'Onther Inc',
            'Tokamak Netowork',
            'DAO governance',
            'Original Staking',
            'Simple Staking',
            'Staking Simulator',
            'Price Dashboard',
            'Vesting Dashboard',
            'TN Document'
          ]"
          :hint="'Family site'"
          :button-type="'b'"
          :selector-type="'a'"
          class="dropdown"
          style="margin-left: 20px; width: 130px;"
          @on-selected="familyLink"
        />
        <a
          class="footer-mail"
          href="mailto:info@onther.io"
        >info@onther.io</a>
        <img
          class="filter-grey"
          src="@/assets/images/Mail.png"
          width="14;"
          height="10;"
        >
      </div>
      <div class="footer-channel-container">
        <a
          href="https://medium.com/onther-tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/medium.png"
            width="28x;"
            height="28px;"
          >
        </a>
        <a
          href="https://www.linkedin.com/company/onther-tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/linkedin.png"
            width="28x;"
            height="28px;"
          >
        </a>
        <a
          href="https://twitter.com/tokamak_network/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/twitter.png"
            width="28x;"
            height="28px;"
          >
        </a>
        <a
          href="https://www.youtube.com/channel/UCF6vtIKF_0QQVRG983czVEQ/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/youtube.png"
            width="28x;"
            height="28px;"
          >
        </a>
        <a
          href="https://www.facebook.com/OntherInc/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/facebook.png"
            width="28x;"
            height="28px;"
          >
        </a>
        <a
          href="https://github.com/Onther-Tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/github.png"
            width="28x;"
            height="28px;"
          >
        </a>
        <a
          href="https://discord.gg/8wSpJKz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/discord.png"
            width="28x;"
            height="28px;"
          >
        </a>
        <a
          href="https://t.me/tokamak_network/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="footer-channel-image filter-grey"
            src="@/assets/images/community/telegram.png"
            width="28x;"
            height="28px;"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import DropupLink from '@/components/DropupLink.vue';

export default {
  components: {
    'dropup': DropupLink,
  },
  methods: {
    familyLink (item) {
      switch (item) {
      case 'Onther Inc': window.open('https://tokamak.network', '_blank'); // eslint-disable-line
      // case 'Tokamak Netowork': window.open('https://tokamak.network', '_blank'); // eslint-disable-line
      // case 'DAO governance': window.open('https://tokamak.network', '_blank'); // eslint-disable-line
      case 'Original Staking': window.open('https://staking.tokamak.network', '_blank'); // eslint-disable-line
      case 'Simple Staking': window.open('https://simple.staking.tokamak.network', '_blank'); // eslint-disable-line
      case 'Staking Simulator': window.open('https://staking-simulator.tokamak.network', '_blank'); // eslint-disable-line
      case 'Price Dashboard': window.open('https://price.tokamak.network', '_blank'); // eslint-disable-line
      case 'Vesting Dashboard': window.open('https://vesting.tokamak.network', '_blank'); // eslint-disable-line
      case 'TN Document': window.open('https://docs.tokamak.network', '_blank'); // eslint-disable-line
      }
    },
  },
};
</script>

<style scoped>
.footer-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  background-color: #f6f8f9;
  text-align: center;
}

.footer-name {
  opacity: 1;
  font-family: Roboto;
  font-size: 19px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #b2b7b9;
}

.footer-address {
  margin-right: 70px;
  font-family: Roboto;
  font-size: 13px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #6d848e;
}

.footer-mail-container {
  /* padding-right: 6px; */
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.footer-mail {
  padding-left: 4.5px;
  font-size: 13px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #6d848e;
}

.footer-channel-container {
  padding-top: 8px;
  display: flex;
  flex-direction: row-reverse;
}

.filter-grey {
  -webkit-filter: invert(30%) grayscale(100%) brightness(85%) contrast(4);
  filter: invert(30%) grayscale(100%) brightness(85%) contrast(4);
}

.footer-channel-image {
  padding-left: 4px;
}

.footer-channel-image:hover {
  cursor: pointer;
  -webkit-filter: invert(30%) grayscale(100%) brightness(70%) contrast(4);
  filter: invert(30%) grayscale(100%) brightness(70%) contrast(4);
}
</style>
