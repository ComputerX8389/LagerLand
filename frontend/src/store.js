var store = {
    state: {
        user: null,
    },
    commit(variable, value) {
        console.log('Store commit: setting ' + variable + ' to', value);
        this.state[variable] = value;
    },
    get(variable) {
        console.log('Store get: getting ' + variable);
        return this.state[variable];
    },
};

export default store;
