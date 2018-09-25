let nextTodoId = 0;

const todos1 = {
  state: [],
  reducers: {
    add(state, text) {
      return [
        ...state,
        {
          id: ++nextTodoId,
          text: text,
          completed: false
        }
      ];
    },
    toggle(state, id) {
      return state.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    }
  },
  effects: {
    async addAsync(payload) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.add(payload);
    }
  }
};

export default todos1;