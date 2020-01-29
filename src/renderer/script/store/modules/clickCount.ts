import { Module } from 'vuex';
import {
  INCREASE_COUNT_LEFT,
  INCREASE_COUNT_RIGHT,
  RESET_COUNT_LEFT,
  RESET_COUNT_RIGHT,
} from '../mutation-types';

interface ClickCountState {
  left: number;
  right: number;
}

const clickCount: Module<ClickCountState, any> = {
  state: {
    left: 0,
    right: 0,
  },
  getters: {
    clickCountTotal: state => state.left + state.right,
  },
  mutations: {
    [INCREASE_COUNT_LEFT]: state => state.left++,
    [INCREASE_COUNT_RIGHT]: state => state.right++,
    [RESET_COUNT_LEFT](state) {
      state.left = 0;
    },
    [RESET_COUNT_RIGHT](state) {
      state.right = 0;
    },
  },
};

export default clickCount;
export {
  ClickCountState,
  clickCount,
};
