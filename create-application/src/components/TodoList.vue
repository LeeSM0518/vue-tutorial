<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
        <i class="checkBtn fas fa-check" aria-hidden="true"/>
        {{ todoItem }}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
          <i class="far fa-trash-alt" aria-hidden="true"/>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
  export default {
    props: ['propsdata'],
    methods: {
      removeTodo(todoItem, index) {
        this.$emit('removeTodo', todoItem, index);
      }
    }
  }
</script>

<style scoped>
  ul {
    /* 목록 아이템의 스타일을 지정 */
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    text-align: left;
  }
  li {
    /* 비율 기준의 레이아웃 방식인 flex 로 지정*/
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
