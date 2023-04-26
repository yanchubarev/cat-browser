import { createStore } from "vuex";
import { catModule } from "./modules/cat";
import { RootState } from "@/store/modules/cat/types";

const store = createStore<RootState>({
  modules: {
    cat: catModule,
  },
});

export default store;
