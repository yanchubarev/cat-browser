import { CatService } from "@/services/CatService";
import { CatBreed, CatImage } from "@/types/cat";
import { Commit } from "vuex";
import { Router } from "vue-router";

const catService = new CatService();

export interface CatState {
  breeds: CatBreed[];
  selectedBreed: string;
  items: CatImage[];
  totalImages: number;
  isLoading: boolean;
  page: number;
  limitPerPage: number;
}

export interface RootState {
  cat: CatState;
}

export const catModule = {
  state: (): CatState => ({
    breeds: [],
    selectedBreed: "",
    items: [],
    totalImages: 0,
    isLoading: false,
    limitPerPage: 5,
    page: 0,
  }),
  mutations: {
    SET_BREEDS(state: CatState, breeds: CatBreed[]) {
      state.breeds = breeds;
    },
    SET_SELECTED_BREED(state: CatState, breedId: string) {
      state.selectedBreed = breedId;
    },
    SET_ITEMS(state: CatState, items: CatImage[]) {
      state.items = items;
    },
    SET_TOTAL_IMAGES(state: CatState, totalImages: number) {
      state.totalImages = totalImages;
    },
    SET_LOADING(state: CatState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_PAGE(state: CatState, page: number) {
      state.page = page;
    },
  },
  actions: {
    async fetchBreeds({ commit }: { commit: Commit }, payload?: any) {
      commit("SET_LOADING", true);
      try {
        const breeds = await catService.getAllBreeds();
        commit("SET_BREEDS", breeds);
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async fetchCatItems(
      { state, commit }: { state: CatState; commit: Commit },
      payload?: { isLoadMore: boolean; router: Router }
    ) {
      const { isLoadMore = false, router } = payload || {};
      if (!isLoadMore) {
        commit("SET_ITEMS", []);
      }
      commit("SET_LOADING", true);
      try {
        const result = await catService.getCatItems(
          state.selectedBreed,
          state.page,
          state.limitPerPage
        );
        commit(
          "SET_ITEMS",
          isLoadMore ? state.items.concat(result.items) : result.items
        );
        commit("SET_TOTAL_IMAGES", result.totalImages);
        commit("SET_PAGE", state.page + 1);
        await router?.push({ query: { breedId: state.selectedBreed } });
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    selectBreed(
      { commit, dispatch }: { commit: Commit; dispatch: any },
      selectedBreedId: string
    ) {
      commit("SET_SELECTED_BREED", selectedBreedId);
      commit("SET_PAGE", 0);
    },
  },
  getters: {
    breeds: (state: CatState) => state.breeds,
    selectedBreed: (state: CatState) => state.selectedBreed,
    items: (state: CatState) => state.items,
    totalImages: (state: CatState) => state.totalImages,
    isLoading: (state: CatState) => state.isLoading,
  },
};
