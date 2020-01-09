<template>
    <div>
        <button v-on:click="get">get-button</button>
        <br>
        <button v-on:click="post">post-button</button>
        <br>
        <button v-on:click="patch">patch-button</button>
        <br>
        <button v-on:click="del">del-button</button>
        <br>
    </div>
</template>
<script>
    export default {
        getData() {
            return {}
        },
        methods: {
            get() {
                this.$axios.get('http://localhost:3000/comments')
                    .then(res => {
                        // eslint-disable-next-line no-console
                        console.log(res.data)
                    });
            },
            post() {
                this.$axios.post('http://localhost:3000/comments',
                    {
                        "id": 30,
                        "body": "diff",
                        "postId": 2,
                    })
                    .then(res => {
                        // eslint-disable-next-line no-console
                        console.log(res.data)
                    });
            },
            patch() {
                this.$axios.patch('http://localhost:3000/comments/30',
                    {
                        "body": 'ded'
                    })
                    .then(res => {
                        // eslint-disable-next-line no-console
                        console.log(res.data)
                    });
            },
            del() {
                this.$axios.delete('http://localhost:3000/comments/30')
                    .then(res => {
                        // eslint-disable-next-line no-console
                        console.log(res.data)
                    });
            },
        }
    }
</script>
