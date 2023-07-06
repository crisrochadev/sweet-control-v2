<template>
  <div>
    <label
      for="first_name"
      class="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{label}}</label
    >
    <input
      :type="curType"
      v-model="value"
      id="first_name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      required
    />
  </div>
  <!-- <fieldset
    class="flex items-center pr-1 my-1 w-full rounded-sm relative border h-10 pb-1"
    :class="[style, handleShow ? 'border-red-600' : '']"
  >
    <input
      :type="curType"
      :placeholder="placeholder"
      @keyup.enter="handleEnter"
      @input="handleInput"
      @blur="handleShow = false"
      class="h-[20px] w-full -mt-1 bg-transparent focus:outline-none px-2 group"
    />
    <legend v-if="label" class="ml-2 text-sm relative top-0">
      {{ label }}
    </legend>
    <div v-if="type === 'password'" class="-mt-2 pt-2 flex items-center h-6">
      <p
        class="material-icons-outlined cursor-pointer"
        style="font-size: 18px !important"
        @click="visibility = !visibility"
      >
        {{ visibility ? "visibility" : "visibility_off" }}
      </p>
    </div>

    <sweet-popup v-if="popPup" :show="handleShow">
      <sweet-card>
        <sweet-list :list="messagesRules" height="h-20" />
      </sweet-card>
    </sweet-popup>
  </fieldset>
  <div
    v-if="handleShowHint"
    class="uppercase bg-white z-5 w-full flex justify-start items-center gap-2 text-xs my-2"
  >
    <span
      class="material-icons-outlined"
      :class="{
        'text-red-600': !message.rule,
        'text-green-600': message.rule,
      }"
      >{{ message.rule ? "done" : "error" }}</span
    >
    <span>{{ message.message }}</span>
  </div> -->
</template>

<script>
import SweetCard from "./SweetCard.vue";
import SweetList from "./SweetList.vue";
import SweetPopup from "./SweetPopup.vue";
export default {
  components: { SweetPopup, SweetCard, SweetList },
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
    },
    popPup: Boolean,
    val: [String, Number, Date, Array, Object],
    style: {
      type: String,
      default: "border-red-300 text-gray-800",
    },
    placeholder: String,
    rules: Array,
    icon: String,
    showRules: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:val", "update:type", "handleEnter"],
  data() {
    return {
      visibility: false,
      curType: "text",
      messagesRules: [],
      handleShow: false,
      message: { rule: true },
      handleShowHint: false,
    };
  },
  mounted() {
    this.curType = this.type;
  },
  computed: {
    value: {
      get() {
        return this.val;
      },
      set(newval) {
        this.$emit("update:val", newval);
      },
    },
  },
  watch: {
    visibility(newvisibility) {
      this.curType = newvisibility ? "text" : "password";
    },
    rules(newrules) {
      console.log(newrules);
      if (newrules !== undefined) {
        this.message = newrules[0];

        this.handleShowHint = !this.message.rule;
      }
    },
  },
  methods: {
    handleInput(e) {
      if (this.showRules) {
        this.handleShow = false;
        this.handleShowHint = false;
        let value = e.target.value;
        this.value = value;
        if (this.rules) {
          this.messagesRules = this.rules.map((r) => {
            return {
              done: r.rule ? r.rule(value) : true,
              label: r.message,
            };
          });
          console.log(this.messagesRules.every((mr) => mr.done));
        }
        this.handleShow = !this.messagesRules.every((mr) => mr.done);
      }
    },
  },
};
</script>

<style scoped>
</style>