<template>
  <div class="example ex1">
    <h4>Select Color</h4>
    <label class="radio red">
      <input type="radio" name="group1" />
      <span>100 Level</span>
    </label>
    <label class="radio blue">
      <input type="radio" name="group1" />
      <span>200 Level</span>
    </label>
    <label class="radio orange">
      <input type="radio" name="group1" />
      <span>300 Level</span>
    </label>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.example {
  margin: 20px;
}
.example input {
  display: none;
}
.example label {
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;
}

.ex1 span {
  display: block;
  padding: 5px 10px 5px 25px;
  border: 2px solid #ddd;
  border-radius: 5px;
  position: relative;
  transition: all 0.25s linear;
}
.ex1 span:before {
  content: "";
  position: absolute;
  left: 5px;
  top: 50%;
  -webkit-transform: translatey(-50%);
  transform: translatey(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.25s linear;
}
.ex1 input:checked + span {
  background-color: #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}
.ex1 .red input:checked + span {
  color: red;
  border-color: red;
}
.ex1 .red input:checked + span:before {
  background-color: red;
}
.ex1 .blue input:checked + span {
  color: blue;
  border-color: blue;
}
.ex1 .blue input:checked + span:before {
  background-color: blue;
}
.ex1 .orange input:checked + span {
  color: orange;
  border-color: orange;
}
.ex1 .orange input:checked + span:before {
  background-color: orange;
}
</style>
