import { CatService } from "@/services/CatService";
import { CatBreed, CatImage, CatInfo } from "@/types/cat";
import { Commit } from "vuex";
import { CatBrowserState } from "@/store/modules/cat/types";

const catService = new CatService();

const ITEMS_PER_PAGE = 8;

export const catModule = {
  state: (): CatBrowserState => ({
    breeds: [],
    selectedBreed: "",
    items: [],
    totalImages: 0,
    isLoading: false,
    limitPerPage: ITEMS_PER_PAGE,
    page: 0,
    loadedCatItem: null,
  }),
  mutations: {
    // Set breeds in state
    SET_BREEDS(state: CatBrowserState, breeds: CatBreed[]) {
      state.breeds = breeds;
    },
    // Set selected breed in state
    SET_SELECTED_BREED(state: CatBrowserState, breedId: string) {
      state.selectedBreed = breedId;
      state.page = 0; // reset page to 0 when breed is changed
    },
    // Set cat items in state
    SET_ITEMS(state: CatBrowserState, items: CatImage[]) {
      state.items = items;
    },
    // Set total number of cat images in state
    SET_TOTAL_IMAGES(state: CatBrowserState, totalImages: number) {
      state.totalImages = totalImages;
    },
    // Set loading state in state
    SET_LOADING(state: CatBrowserState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    // Set current page in state
    SET_PAGE(state: CatBrowserState, page: number) {
      state.page = page;
    },
    // Set loaded cat item in state
    SET_LOADED_CAT_ITEM(state: CatBrowserState, catItem: CatInfo | null) {
      state.loadedCatItem = catItem;
    },
  },
  actions: {
    // Fetch all cat breeds from service and commit to state
    async fetchBreeds({ commit }: { commit: Commit }) {
      commit("SET_LOADING", true);
      try {
        const breeds = await catService.getAllBreeds();
        commit("SET_BREEDS", breeds);
      } catch (error) {
        throw new Error("Error while loading breeds");
      } finally {
        commit("SET_LOADING", false);
      }
    },
    // Fetch cat items from service and commit to state
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
        throw new Error(
          "Apologies but we could not load new cats for you at this time! Miau!"
        );
      } finally {
        commit("SET_LOADING", false);
      }
    },
    // Set selected breed in state
    selectBreed({ commit }: { commit: Commit }, selectedBreedId: string) {
      commit("SET_SELECTED_BREED", selectedBreedId);
    },
    // Fetch cat info by id
    async fetchCatById({ commit }: { commit: Commit }, catId: string) {
      commit("SET_LOADING", true);
      try {
        const catInfo = await catService.getCatById(catId);
        commit("SET_LOADED_CAT_ITEM", catInfo);
      } catch (error) {
        throw new Error("Error while loading breed information");
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    breeds: (state: CatBrowserState) => state.breeds,
    selectedBreed: (state: CatBrowserState) => state.selectedBreed,
    items: (state: CatBrowserState) => state.items,
    totalImages: (state: CatBrowserState) => state.totalImages,
    isLoading: (state: CatBrowserState) => state.isLoading,
    loadedCatItem: (state: CatBrowserState) => state.loadedCatItem,
  },
};
