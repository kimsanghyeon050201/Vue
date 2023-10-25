<template>
  <div class="box">
    <div class="title">
      <h1 style="font-weight: lighter;">Todo List</h1>
      <p style="font-weight: lighter;opacity: 0.8;">Get things done. one item at a time</p>
      <hr style="border: 0; height: 1px ; background: #FFF; opacity: 0.4;">
    </div>

    <ul class="list" id="list" v-if="listPage">
      <li v-for="i in arr" :key="i.id">
        <input type="text" v-model="i.content" disabled class="input-text" :style="getCheckStyle(i.id)">
        <div class="icon-box">
          <input type="checkbox" :id="'cb' + i.id" v-model="i.state" v-on:change="stateEdit(i.id, i.state)">
          <label :for="'cb' + i.id"></label>
          <font-awesome-icon :icon="['fas', 'pen']" class="icon"/>
          <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
        </div>
      </li>

      <div class="switch-container">
        <p>Move done items at the end?</p>
        <input type="checkbox" id="switch" role="switch" v-model="checked">
        <label for="switch"></label>
      </div>
    </ul>
    <i class="empty" id="empty" v-if="emptyPage">Your todo list is empty</i>
    <div class="input">
      <p>Add to the todo list</p>
      <input type="text" id="txt" v-model="inputValue">
      <button id="btn" v-on:click="addItem">ADD ITEM</button>
    </div>
  </div>
</template>

<script src="../public/javascript/todo"></script>
<style>
  @import "../public/stylesheets/todolist.css";
</style>
