<script>
    import {Bar} from 'vue-chartjs'

    export default {
        extends: Bar,
        data() {
            return {data: '', options: ''}
        },
        mounted() {
            this.initial();
            this.renderChart(
                this.data,
                this.options,
            )
        },
        methods: {
            initial() {
                this.data = {
                    labels: ['match1', 'match2', 'match3', 'match4', 'match5'],
                    datasets: [
                        {
                            label: 'TeamA score',
                            data: [100, 50, 40, 20, 5],
                            backgroundColor: 'rgba(10, 20, 30, .3)',
                            borderColor: 'rgba(12, 22, 33, 1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(22, 32, 43, 5)',
                            hoverBorderColor: 'rgba(32, 42, 53, 10)',
                            hoverBorderWidth: 2,
                        },
                        {
                            label: 'TeamB score',
                            data: [40, 20, 30, 50, 60],
                            backgroundColor: 'rgba(10, 20, 200, .3)',
                            borderColor: 'rgba(12, 22, 233, 1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(22, 32, 243, 5)',
                            hoverBorderColor: 'rgba(32, 42, 253, 10)',
                            hoverBorderWidth: 2,
                        },
                        this.options = {
                            tooltips: {
                                enabled: true,
                                position: 'nearst'
                            },
                            title: {
                                display: true,
                                position: 'top',
                                text: 'Bar Graph',
                                fontFamily: 'sans-serif',
                                fontSize: 32,
                                fontColor: '#111'
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        max: 100
                                    }
                                }],
                                // xAxes: [{
                                //     ticks: {
                                //         beginAtZero: true,
                                //         max: 100
                                //     }
                                // }]
                            }
                        }
                    ]
                }
            }
        },
        name: "BarComponent"
    }
</script>
