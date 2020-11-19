import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#009688",
        secondary: "#3f51b5",
        accent: "#00bcd4",
        error: "#f44336",
        warning: "#e91e63",
        info: "#673ab7",
        success: "#4caf50",
        background: "#607d8b"
      },
      dark: {
        primary: "#009688",
        secondary: "#3f51b5",
        accent: "#00bcd4",
        error: "#f44336",
        warning: "#e91e63",
        info: "#673ab7",
        success: "#4caf50",
        background: "#607d8b"
      },
    },
  },
});
