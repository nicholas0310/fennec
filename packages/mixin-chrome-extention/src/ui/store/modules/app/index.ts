import { Module, MutationTree, ActionTree } from "vuex";
import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";
import { Mutations, State, Actions } from "./interfaces";
import { RootState } from "../../interface";

const state = {
  appbar: {
    title: "",
    show: true,
    back: false
  }
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_APPBAR](state, data) {
    const defaultValue = {
      title: "",
      style: "",
      show: true,
      back: true
    };
    state.appbar = { ...defaultValue, ...data };
  }
};

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.GET_COUTNER]({ commit }) {
    commit(MutationTypes.SET_APPBAR, { title: "" });
  }
};

const module: Module<State, RootState> = {
  namespaced: true,
  mutations,
  actions,
  state
};

export default module;
