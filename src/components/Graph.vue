<script>
import { Line, mixins } from 'vue-chartjs';
import moment from 'moment';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
    },
    options: {
      type: Object,
    },
  },
  async mounted () {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
<style></style>
