<script>
    import {Bar} from 'vue-chartjs'

    export default {
        extends: Bar,
        mounted() {
            this.renderChart({
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        label: 'GitHub Commits',
                        backgroundColor: '#f87979',
                        data: [10, 20, 30, 40, 50, 60]
                    }
                ]
            })
        },
        name: "Chart"
    }
</script>
