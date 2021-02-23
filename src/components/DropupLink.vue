<template>
  <div class="dropdown">
    <div class="dropdown-btn-container" @mousedown="dropdown">
      <button class="dropdown-btn"
              :class="{
                'dropdown-btn-hint': selectedItem === hint,
                'dropdown-btn-unfolded': unfolded,

                'dropdown-btn-a': !disabled && buttonType === 'a',
                'dropdown-btn-b': !disabled && buttonType === 'b',
                'dropdown-btn-unfolded-b': unfolded && buttonType === 'b',
                'dropdown-btn-disabled': disabled
              }"
      >
        {{ selectedItem }}
        <img v-if="unfolded"
             class="dropdown-icon"
             src="@/assets/images/arrow-folded.png" alt=""
             width="9" height="8"
        >
        <img v-else
             class="dropdown-icon"
             src="@/assets/images/icon_arrow@2x.png" alt=""
             width="10" height="9"
        >
      </button>
    </div>
    <div class="dropdown-content"
         :class="{
           'dropdown-content-unfolded': unfolded,
           'dropdown-content-disabled': disabled
         }"
    >
      <button v-for="(item, index) in items" :key="index"
              class="dropdown-item"
              :class="{
                'dropdown-item-a': selectorType === 'a',
                'dropdown-item-b': selectorType === 'b'
              }"
              @click="select(item)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    hint: {
      type: String,
      default: '',
      required: true,
    },
    buttonType: {
      type: String,
      default: () => '',
      validator: (value) => {
        return [
          'a',
          'b',
        ].indexOf(value) !== -1;
      },
    },
    selectorType: {
      type: String,
      default: () => '',
      validator: (value) => {
        return [
          'a',
          'b',
        ].indexOf(value) !== -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      selectedItem: '',
      unfolded: false,
    };
  },
  created () {
    this.selectedItem = this.hint;
  },
  mounted () {
    document.addEventListener('click', (event) => {
      if (!this.$el.contains(event.target)) {
        this.fold();
      }
    });
  },
  beforeDestroy () {
    document.removeEventListener('click', (event) => {
      if (!this.$el.contains(event.target)) {
        this.fold();
      }
    });
  },
  methods: {
    dropdown () {
      if (!this.disabled) {
        this.unfolded ? this.fold() : this.unfold();
      }
    },
    unfold () {
      this.unfolded = true;
    },
    fold () {
      this.unfolded = false;
    },
    select (item) {
      this.selectedItem = item;
      this.fold();

      this.$emit('on-selected', item);
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;

  width: 130px;
}

.dropdown-btn {
  width: 130px;
  height: 25px;

  /* text wtyles */
  font-family: Roboto;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.2px;
  text-align: left;
  color: #000000;

  border: solid 1px #555555;
  background-color: #ffffff;

  padding: 3px 0 3px 10px;
}
.dropdown-btn:hover {
  cursor: pointer;
}
.dropdown-btn-a:active, dropdown-btn-b:active {
  color: #3e495c;
}
.dropdown-btn-hint {
  color: #86929d;
}
.dropdown-btn-unfolded {
  color: #3e495c;
}
.dropdown-btn-disabled {
  border: solid 1px #dfe4ee;
  background-color: #e9edf1;
}
.dropdown-btn-disabled:hover {
  cursor: not-allowed;
}

.dropdown-btn-b {
  color: #000000;
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
}
.dropdown-btn-b:hover {
  border: solid 1px #c9d1d8;
  background-color: #ffffff;
}
/* .dropdown-btn-b:active {
  border: solid 1px #000000;
  background-color: #ffffff;
} */


.dropdown-icon {
  position: absolute;
  top: 37%;
  right: 0;

  margin-right: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: #ffffff;

  width: 128px;
  top: -191px;
  padding: 5px 0 5px;
  height: 180px;
  border: solid 1px #555555;
  background-color: #ffffff;
  /* margin-top: 5px; */
}
.dropdown-content-unfolded {
  display: flex;
  flex-direction: column;
}
.dropdown-content-disabled {
  color: #8f96a1;
}

.dropdown-item {
  height: 25px;
  width: 125px;

  font-family: Roboto;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.2px;
  text-align: left;
  color: #3e495c;

  background: #ffffff;
  border: none;
  outline: none;

  padding-left: 10px;
}
.dropdown-item:hover {
  cursor: pointer;
}
.dropdown-btn-a {
  /* border-radius: 4px; */
}
.dropdown-item-a:hover {
  color: #2A72E5;
}
.dropdown-item-b:hover {
  /* background-color: #2a72e5; */
  color: #2A72E5;
}
.dropdown-btn-unfolded-b {
  border: solid 1px #555555;
}
.dropdown-btn-unfolded-b:hover {
  border: solid 1px;
}
</style>
