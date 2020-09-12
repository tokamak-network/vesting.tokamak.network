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
    'rate',
  ],
  methods: {
    chartData () {
      const points = this.getPoints();
      return {
        datasets: [
          this.fromBaseDataset({
            data: points[0],
            pointBorderColor: points[1],
            pointBackgroundColor: points[1],
          }),
        ],
      };
    },
    getPoints () {
      const starts = this.start;
      const totalSourceTon = this.displayAmount(this.total);
      const totals = this.rate * Math.round(parseFloat(totalSourceTon) * 10) / 10;
      const cliff = Number(starts)+2566800;
      const ends = this.end;
      const points = [];
      const colors = [];
      if (this.tab === 'SeedTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.01, 0.165, 5 );
        return [points, colors];
      }
      if (this.tab === 'PrivateTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.05, 0.095, 9 );
        return [points, colors];
      }
      if (this.tab === 'MarketingTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.1, 0.1, 8 );
        return [points, colors];
      }
      if (this.tab === 'StrategicTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.09, 0.091, 9 );
        return [points, colors];
      }
      if (this.tab === 'TeamTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.0278, 0.0278, 34 );
        return [points, colors];
      }
      if (this.tab === 'AdvisorTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.0556, 0.0556, 16 );
        return [points, colors];
      }
      if (this.tab === 'BusinessTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.05, 0.05, 18 );
        return [points, colors];
      }
      if (this.tab === 'ReserveTON'){
        this.setPoints(points, colors, starts, ends, cliff, totals, 0.0333, 0.0333, 28 );
        return [points, colors];
      }
      if (this.tab === 'DaoTON'){
        return [points, colors];
      }
    },
    setPoints (points, colors, starts, ends, cliff, totals, ratio1, ratio2, i){
      const now = new Date() / 1000;
      points.push({ x:this.formatDate(starts), y:totals * ratio1 });
      colors.push('rgba(92,182,228,1)');
      if (now >= starts && now < Number(cliff)){
        points.push({ x:this.formatDate(now), y:totals * ratio1 });
        colors.push('rgba(255, 71, 99, 1)');
      }
      points.push({ x:this.formatDate(cliff), y:totals * ratio1 });
      colors.push('rgba(92,182,228,1)');
      let j = 0;
      for (j; j<i; j++){
        points.push({ x:this.formatDate(Number(cliff)+(2592000*j)), y:totals * (ratio1 +(ratio2*(j+1))) });
        colors.push('rgba(92,182,228,1)');
        if (now >= Number(cliff)+(2592000*j) && now < Number(cliff)+(2592000*(j+1))){
          points.push({ x:this.formatDate(now), y:totals * (ratio1 +(ratio2*(j+1) )) });
          colors.push('rgba(255, 71, 99, 1)');
        }
        points.push({ x:this.formatDate(Number(cliff)+(2592000*(j+1))), y:totals * (ratio1 +(ratio2*(j+1))) });
        colors.push('rgba(92,182,228,1)');
        if (now >= Number(cliff)+(2592000*(j+1)) && now < Number(ends)){
          points.push({ x:this.formatDate(now), y:totals });
          colors.push('rgba(255, 71, 99, 1)');
        }
      }
      points.push({ x:this.formatDate(ends), y:totals });
      colors.push('rgba(92,182,228,1)');
      // this.pointBackgroundColors = colors;
    },
    formatDate (date) {
      return moment(date * 1000).format('MM/DD/YYYY HH:mm');
    },
    displayAmount (amount) {
      const displayAmounts = parseFloat(amount) / (Math.pow(10, this.decimals));
      return Math.round(displayAmounts * 10) / 10;
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
                unitStepSize:'30',
                format: 'MM/DD/YYYY HH:mm',
              },
              ticks: {
                maxTicksLimit: 12,
                beginAtZero: true,
              },
              gridLines : {
                display : true,
                lineWidth:1,
                zeroLineWidth:0.5,
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
                labelString: 'Amount of TON',
              },
              stacked: true,
              ticks:{
                userCallback: function (value, index, values) {
                  return value.toLocaleString('en-US');
                },
              },

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
        pointBorderWidth: 1,
        pointHoverRadius: 1,
        pointHoverBackgroundColor: 'rgba(92,182,228,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 3,
        spanGaps:false,
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
