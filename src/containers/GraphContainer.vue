<template>
  <div class="graph">
    Vesting Schedule for {{ tab }}
    <graph :width="300" :height="300" :chartData="chartData()" :options="chartOptions()" />
  </div>
</template>
<script>
import Graph from '@/components/Graph.vue';
import moment from 'moment';
// import Empty from '@/components/Empty.vue';
// import Revoke from '@/components/Revoke.vue';

export default {
  components: {
    graph: Graph,
    // empty: Empty,
    // revoked: Revoked
  },
  props: [
    'tab',
    'start',
    'end',
    'cliff',
    'total',
    'decimals',
  ],
  methods: {
    chartData () {
      return {
        datasets: [
          this.fromBaseDataset({
            data: this.getPoints(),
          }),
        ],
      };
    },
    getPoints () {
      const start = this.start;
      const cliff = this.cliff;
      const end = this.end;
      const now = new Date() / 1000;
      const points = [this.getDataPointAt(start)];
      if (cliff < now) {
        points.push(this.getDataPointAt(cliff));
      }
      if (start < now && now < end) {
        points.push(this.getDataPointAt(now));
      }

      if (cliff > now) {
        points.push(this.getDataPointAt(cliff));
      }

      points.push(this.getDataPointAt(end));
      return points;
    },
    getDataPointAt (date) {
      return {
        x: this.formatDate(date),
        y: this.getAmountAt(date),
      };
    },
    formatDate (date) {
      return moment(date * 1000).format('MM/DD/YYYY HH:mm');
    },
    getAmountAt (date) {
      const total = this.total;
      const start = this.start;
      const end = this.end;
      const decimals = this.decimals;
      const slope = (date - start) / (end - start);
      return this.displayAmount(total) * slope;
    },
    displayAmount (amount) {
      const displayAmount = parseFloat(amount) / (Math.pow(10, this.decimals));
      return Math.round(displayAmount * 10000) / 10000;
    },
    chartOptions () {
      return {
        legend: { display: false },
        responsive:true,
        maintainAspectRatio: false,
        height: 300,
        responsiveAnimationDuration: 0,
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              ticks: {
                sampleSize: 10,
                maxTicksLimit: 7,
              },
              time: {
                format: 'MM/DD/YYYY HH:mm',
              },
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Amount',
              },
              stacked: true,
            },
          ],
        },
      };
    },
    fromBaseDataset (opts) {
      return {
        lineTension: 0.1,
        backgroundColor: 'rgba(92,182,228,0.4)',
        borderColor: 'rgba(92,182,228,1)',
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(92,182,228,1)',
        pointBackgroundColor: 'rgba(92,182,228,1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(92,182,228,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        ...opts,
      };
    },
  },
};
</script>
<style>
.graph{
  display: flex;
  padding: 15px;
  text-align: center;
  flex-direction: column;
  border-radius: 6px;
  border: solid 1px #ced6d9;
  background-color: #ffffff;
  height: 330px;
  width: 450px;
}</style>
