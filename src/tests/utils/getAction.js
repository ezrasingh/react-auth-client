
/**
 * Filter action by type from mock Redux store
 * @param {object} store - Mock Redux store
 * @param {string} type - Redux action
 */
const findAction = (store, type) => {
    return store.getActions().find(action => action.type === type)
}
  
/**
 * Query action by type from mock Redux store
 * @param {object} store - Mock Redux store
 * @param {string} type - Redux action
 */
const getAction = (store, type) => {
    const action = findAction(store, type)
    if (action) return Promise.resolve(action)
    return new Promise(resolve => {
      store.subscribe(() => {
        const action = findAction(store, type)
        if (action) resolve(action)
      })
    })
}

export default getAction