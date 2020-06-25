<script>
import { Line } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Function,
      default: null
    },
    options: {
      type: Function,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
<style></style>
