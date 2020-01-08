<script>
    import {Line} from 'vue-chartjs'

    export default {
        extends: Line,
        name: "LineComponent",
        data() {
            return {
                data: '', options: ''
            }
        },

        mounted() {
            this.initial();
            this.renderChart(
                this.data, this.options
            )
        },

        methods: {
            initial() {
                this.data = {
                    labels: ["match1", "match2", "match3", "match4", "match5"],
                    datasets: [
                        {
                            label: 'teamA score',
                            data: [10, 500, 30, 40, 50],
                            backgroundColor: '#FF90CD',
                            borderColor: '#FF80CD',
                            hoverBackgroundColor: '#FF70CD',
                            hoverBorderWidth: 3,

                            fill: false,
                            lineTension: 0,

                            pointRadius: 10,
                            pointBackgroundColor: '#FF60CD',
                            pointHoverBackgroundColor: '#0050CD',
                            pointStyle: 'rect',

                            pointRotation: 45,
                            spanGaps: true,
                        },
                        {
                            label: 'teamB score',
                            data: [30, 400, 320, 140, 250],
                            backgroundColor: '#3F90CD',
                            borderColor: '#3F80CD',
                            hoverBackgroundColor: '#3F70CD',
                            hoverBorderWidth: 3,

                            fill: false,
                            lineTension: 0,

                            pointRadius: 10,
                            pointBackgroundColor: '#3F60CD',
                            pointHoverBackgroundColor: '#3050CD',
                            pointStyle: 'rect',

                            pointRotation: 45,
                            spanGaps: true,
                        }
                    ]
                };

                this.options = {
                    title: {
                        display: true,
                        position: 'top',
                        text: 'Line graph',
                        fontSize: 18,
                        fontColor: '#111'
                    },
                    animation: {
                        duration: 1000,
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                    hover: {
                        animationDuration: 1000,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 500,
                            }
                        }]
                    }
                }
            }
        }
    }
</script>
