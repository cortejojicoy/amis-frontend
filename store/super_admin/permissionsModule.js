import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: true,
    data: {},
    toStore: {
        name: '',
        group: '',
    }
})
  
export const actions = {
    async getData ({ commit }, ) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`super_admins/permissions`)
            await commit('GET_DATA_SUCCESS', data)
        } catch (error) {
            if(error.response.status===422){  
                let errList = ``;
                let fields = Object.keys(error.response.data.errors)
                fields.forEach((field) => {
                let errorArr = error.response.data.errors[field]
                errorArr.forEach((errMess) => {
                    errList += `<li>${errMess}</li>`
                })
            })
                let errMessage = `Validation Error: ${errList}`
                await commit('alert/ERROR', errMessage, { root: true })
            }else{
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },
    async createPermission ({ commit, state }) {
        if(state.toStore.name == '') {
            commit('alert/ERROR', "Please type in a permission name.", { root: true })
        } else if(state.toStore.group == '') {
            commit('alert/ERROR', "Please include a group for the permission to be added", { root: true })
        } else {
            commit('GET_DATA_REQUEST')
            try {
                const data = await this.$axios.$post(`super_admins/permissions`, state.toStore)
                commit('alert/SUCCESS', data.message, { root: true })
                commit('APPEND_NEW_PERMISSION', data.permission)
            } catch (error) {
                if(error.response.status===422){  
                    let errList = ``;
                    let fields = Object.keys(error.response.data.errors)
                    fields.forEach((field) => {
                    let errorArr = error.response.data.errors[field]
                    errorArr.forEach((errMess) => {
                        errList += `<li>${errMess}</li>`
                    })
                })
                    let errMessage = `Validation Error: ${errList}`
                    await commit('alert/ERROR', errMessage, { root: true })
                } else if(error.response.status===400) {
                    await commit('alert/ERROR', error.response.data.message, { root: true })
                } else {
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('GET_DATA_FAILED', error)
            }
        }
    },
}
  
export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_SUCCESS(state, data) {
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_PERMISSION_NAME (state, name) {
        state.toStore.name = name
    },
    UPDATE_GROUP (state, group) {
        state.toStore.group = group
    },
    APPEND_NEW_PERMISSION (state, new_permission) {
        state.data.permissions.push(new_permission)
        state.loading = false
    }
}

export const getters = {
    getTableData(state) {
        var permissionsData = {}
        var permissionsGroup = []
        if(!state.loading) {
            var group = state.data.permissions.map((item) => {
                if(permissionsGroup.includes(item.group)) {
                    permissionsData[item.group].permissions.push(item)
                } else {
                    permissionsData[item.group] = {permissions: []}
                    permissionsData[item.group].permissions.push(item)
                    permissionsGroup.push(item.group)
                }
            })

            return permissionsData
        }
    },
    getToStorePermissionName(state) {
        return state.toStore.name
    },
    getToStoreGroup(state) {
        return state.toStore.group
    } 
}