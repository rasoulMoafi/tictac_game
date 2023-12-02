import { app } from "../app";
import type { App } from 'vue'

// Styles
// import "@mdi/font/css/materialdesignicons.css";
// import "vuetify/styles";
// import "@/assets/fonts/IRANSans.scss"
// import "@/assets/fonts/IRANSans_FaNum.scss"

// Vuetify
import { createVuetify } from "vuetify";
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import type { ThemeDefinition } from "vuetify";




export function registerPlugins(app: App) {
    app.use(
        createVuetify({
            theme: {
                themes: {
                    light: {
                        colors: {
                            primary: '#1867C0',
                            secondary: '#5CBBF6',
                        },
                    },
                },
            },
        })
    );
}


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

