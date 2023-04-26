import { createStore } from "vuex";
import { catModule, RootState } from "./modules/cat";

const store = createStore<RootState>({
  modules: {
    cat: catModule,
  },
});

export default store;
