<template>
  <v-app>
    <v-main>
      <QuoteRating/>
    </v-main>
  </v-app>
</template>

<script>
import QuoteRating from './components/QuoteRating';

export default {
  name: 'App',

  components: {
    QuoteRating,
  },

  data: () => ({
    //
  }),
};
</script>
