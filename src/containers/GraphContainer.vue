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
      const total = this.displayAmount(this.total);
      const cliff = this.cliff;
      const end = this.end;
      const now = new Date() / 1000;
      const points = [];
      if (this.tab === 'SeedTON'){
        const end = new Date('2021-01-09T18:06:22')/1000;
        points.push({ x:this.formatDate(start), y:total * 0.01 });
        points.push({ x:this.formatDate(Number(start)+(2592000)), y:total * 0.01 });
        let i = 1;
        for (i; i<6; i++){
          points.push({ x:this.formatDate(Number(start)+(2592000*i)), y:total * (0.01 +(0.165*i)) });
          points.push({ x:this.formatDate(Number(start)+(2592000*(i+1))), y:total * (0.01 +(0.165*i)) });
        }
        points.push({ x:this.formatDate(end), y:total });
        return points;
      }
      if (this.tab === 'PrivateTON'){
        const end = new Date('2021-05-09T18:06:22')/1000;
        points.push({ x:this.formatDate(start), y:total * 0.05 });
        points.push({ x:this.formatDate(Number(start)+(2592000)), y:total * 0.05 });
        let i = 1;
        for (i; i<10; i++){
          points.push({ x:this.formatDate(Number(start)+(2592000*i)), y:total * (0.05 +(0.095*i)) });
          points.push({ x:this.formatDate(Number(start)+(2592000*(i+1))), y:total * (0.05 +(0.095*i)) });
        }
        points.push({ x:this.formatDate(end), y:total });
        return points;
      }
      if (this.tab === 'MarketingTON'){
        const end = new Date('2021-04-09T18:06:22')/1000;
        points.push({ x:this.formatDate(start), y:total * 0.1 });
        points.push({ x:this.formatDate(Number(start)+(2592000)), y:total * 0.1 });
        let i = 1;
        for (i; i<9; i++){
          points.push({ x:this.formatDate(Number(start)+(2592000*i)), y:total * (0.1 +(0.1*i)) });
          points.push({ x:this.formatDate(Number(start)+(2592000*(i+1))), y:total * (0.1 +(0.1*i)) });
        }
        points.push({ x:this.formatDate(end), y:total });
        return points;
      }
      if (this.tab === 'StrategicTON'){
        const end = new Date('2021-05-09T18:06:22')/1000;
        points.push({ x:this.formatDate(start), y:total * 0.09 });
        points.push({ x:this.formatDate(Number(start)+(2592000)), y:total * 0.09 });
        let i = 1;
        for (i; i<10; i++){
          points.push({ x:this.formatDate(Number(start)+(2592000*i)), y:total * (0.09 +(0.091*i)) });
          points.push({ x:this.formatDate(Number(start)+(2592000*(i+1))), y:total * (0.09 +(0.091*i)) });
        }
        points.push({ x:this.formatDate(end), y:total });
        return points;
      }
    },
    formatDate (date) {
      return moment(date * 1000).format('MM/DD/YYYY HH:mm');
    },
    displayAmount (amount) {
      const displayAmounts = parseFloat(amount) / (Math.pow(10, this.decimals));
      return Math.round(displayAmounts * 10000) / 10000;
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
              time:{
                unit:'day',
                stepSize:'30',
                format: 'MM/DD/YYYY HH:mm',
              },
              ticks: {
                maxTicksLimit: 12,
                beginAtZero: false,
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
        lineTension: 0,
        backgroundColor: 'rgba(92,182,228,0.4)',
        borderColor: 'rgba(92,182,228,1)',
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(92,182,228,1)',
        pointBackgroundColor: 'rgba(92,182,228,1)',
        pointBorderWidth: 1,
        pointHoverRadius: 1,
        pointHoverBackgroundColor: 'rgba(92,182,228,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 3,
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
