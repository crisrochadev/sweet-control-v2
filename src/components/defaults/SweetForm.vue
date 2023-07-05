<template>
  <form @submit="submit" class="w-full flex flex-col gap-2">
    <template
      v-for="([key, item], index) of Object.entries(curForm)"
      :key="index"
    >
      <template v-if="!exclude.some((e) => e === key)">
        <slot name="item">
          <sweet-input
            :rules="item.rules"
            :popPup="item.popup"
            :type="item.type"
            :val="item.value"
            @update:val="(v) => (item.value = v)"
            :label="item.label"
            :placeholder="item.placeholder"
            :icon="item.icon"
            :style="inputClass"
            :showRules="showRules"
          />
        </slot>
      </template>
    </template>
    <slot name="button">
      <sweet-button
        :label="btnLabel"
        :icon="icon"
        type="submit"
        full-width
        :color="btnClass"
        height="h-8 my-2"
        :loading="loading"
      />
    </slot>
  </form>
</template>

<script>
import SweetButton from "./SweetButton.vue";
import SweetInput from "./SweetInput.vue";
export default {
  components: { SweetInput, SweetButton },
  props: {
    form: Object,
    icon: String,
    btnLabel: {
      type: String,
      default: "Submit",
    },
    btnClass: String,
    inputClass: String,
    exclude: {
      type:Array,
      default:() => []
    },
    loading:Boolean,
    showRules:{
      type:Boolean,
      default:true
    }
  },
  emits: ["update:form", "handleSubmit"],
  computed: {
    curForm: {
      get() {
        return this.form;
      },
      set(newform) {
        this.$emit("update:form", newform);
      },
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.$emit("handleSubmit");
    },
  },
};
</script>

<style>
</style>