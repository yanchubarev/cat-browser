import { CatService } from "@/services/CatService";
import { CatBreed, CatImage } from "@/types/cat";
import { Commit } from "vuex";

const catService = new CatService();

export interface CatBrowserState {
  breeds: CatBreed[];
  selectedBreed: string;
  items: CatImage[];
  totalImages: number;
  isLoading: boolean;
  page: number;
  limitPerPage: number;
}

export interface RootState {
  cat: CatBrowserState;
}

export const catModule = {
  state: (): CatBrowserState => ({
    breeds: [],
    selectedBreed: "",
    items: [],
    totalImages: 0,
    isLoading: false,
    limitPerPage: 5,
    page: 0,
  }),
  mutations: {
    SET_BREEDS(state: CatBrowserState, breeds: CatBreed[]) {
      state.breeds = breeds;
    },
    SET_SELECTED_BREED(state: CatBrowserState, breedId: string) {
      state.selectedBreed = breedId;
      state.page = 0; // reset page to 0 when breed is changed
    },
    SET_ITEMS(state: CatBrowserState, items: CatImage[]) {
      state.items = items;
    },
    SET_TOTAL_IMAGES(state: CatBrowserState, totalImages: number) {
      state.totalImages = totalImages;
    },
    SET_LOADING(state: CatBrowserState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_PAGE(state: CatBrowserState, page: number) {
      state.page = page;
    },
  },
  actions: {
    async fetchBreeds({ commit }: { commit: Commit }) {
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
      { state, commit }: { state: CatBrowserState; commit: Commit },
      payload?: { isLoadMore: boolean }
    ) {
      const { isLoadMore = false } = payload || {};
      if (!isLoadMore) {
        commit("SET_PAGE", 0); // reset page to 0 when fetching new items
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
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    selectBreed({ commit }: { commit: Commit }, selectedBreedId: string) {
      commit("SET_SELECTED_BREED", selectedBreedId);
    },
  },
  getters: {
    breeds: (state: CatBrowserState) => state.breeds,
    selectedBreed: (state: CatBrowserState) => state.selectedBreed,
    items: (state: CatBrowserState) => state.items,
    totalImages: (state: CatBrowserState) => state.totalImages,
    isLoading: (state: CatBrowserState) => state.isLoading,
  },
};
