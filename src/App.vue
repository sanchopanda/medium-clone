<template>
  <mcv-topbar /> 
  <router-view />
</template>

<script>
import McvTopbar from "@/components/Topbar";

export default {
  name: "McvApp",
  components: {
    McvTopbar,
  } 
};
</script>
