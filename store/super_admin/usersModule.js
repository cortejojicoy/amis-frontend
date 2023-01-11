import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    role_loading: false,
    permission_loading: false,
    numOfItems: 5,
    data: {},
    roles: [],
    permissions: [],
    tags: [],
    toUpdate: {
        role: '',
        permission: '',
        tags: [],
        student_info: {
            student_number: '',
            acad_program: '',
            acad_group: ''
        }
    },
    headers: [],
    filters: {},
    filterValues: []
})
  
export const actions = {
    async getData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            const data = await this.$axios.$get(`super_admins/users`, {params: tableParams})
            await commit('GET_DATA_SUCCESS', data.users)
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
    async getFilters({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`super_admins/users`, {params: payload.data})
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.users})
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
    async getRoles({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`super_admins/roles`)
            await commit('GET_ROLES_SUCCESS', data.roles)
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
    async getPermissions({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`super_admins/permissions`)
            await commit('GET_PERMISSIONS_SUCCESS', data.permissions)
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
    async getTags({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`super_admins/tags`)
            await commit('GET_TAGS_SUCCESS', data.tags)
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
    async updateRole ({ commit, state }, payload) {
        commit('ADD_ROLE_REQUEST')
        try {
            let tableParams = Object.assign(state.toUpdate, {user_module: true, updateRole: true, mode: payload.mode})
            const data = await this.$axios.$put(`super_admins/users/${payload.sais_id}`, tableParams)
            commit('alert/SUCCESS', data.message, { root: true })
            await commit('UPDATE_USER_SUCCESS', {user: data.user, index: payload.index})
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
            commit('UPDATE_USER_FAILED', error)
        }
    },
    async updatePermission ({ commit, state }, payload) {
        commit('ADD_PERMISSION_REQUEST')
        try {
            let tableParams = Object.assign(state.toUpdate, {user_module: true, updatePermission: true, mode: payload.mode})
            const data = await this.$axios.$put(`super_admins/users/${payload.sais_id}`, tableParams)
            commit('alert/SUCCESS', data.message, { root: true })
            await commit('UPDATE_USER_SUCCESS', {user: data.user, index: payload.index})
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
            commit('UPDATE_USER_FAILED', error)
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
    GET_ROLES_SUCCESS(state, roles) {
        state.roles = roles
        state.loading = false
    },
    GET_PERMISSIONS_SUCCESS(state, permissions) {
        state.permissions = permissions
        state.loading = false
    },
    GET_TAGS_SUCCESS(state, tags) {
        state.tags = tags
        state.loading = false
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
        // state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    },
    UPDATE_FILTER_VALUES(state, data) {
        state.filterValues = data
    },
    SET_ROLE_TO_UPDATE(state, role) {
        state.toUpdate.role = role
    },
    SET_PERMISSION_TO_UPDATE(state, permission) {
        state.toUpdate.permission = permission
    },
    SET_TAGS_TO_UPDATE(state, tags) {
        if(tags != '') {
            state.toUpdate.tags = [
                tags
            ]
        } else {
            state.toUpdate.tags = []
        }
    },
    SET_STUDENT_NUMBER_TO_ADD(state, student_number) {
        state.toUpdate.student_info.student_number = student_number
    },
    SET_ACAD_PROGRAM_TO_ADD(state, acad_program) {
        state.toUpdate.student_info.acad_program = acad_program
    },
    SET_ACAD_GROUP_TO_ADD(state, acad_group) {
        state.toUpdate.student_info.acad_group = acad_group
    },
    ADD_ROLE_REQUEST(state) {
        state.role_loading = true
    },
    ADD_PERMISSION_REQUEST(state) {
        state.permission_loading = true
    },
    UPDATE_USER_SUCCESS(state, data) {
        state.loading = false
        state.role_loading = false
        state.permission_loading = false
        Vue.set(state.data.data, data.index, data.user)
    },
    UPDATE_USER_FAILED(state) {
        state.role_loading = false
        state.permission_loading = false
    }
}

export const getters = {
    getNumOfItems(state) {
        return state.numOfItems
    },
    getTableData(state) {
        if(state.data.data){
            var usersData = state.data.data.map((item) => {
                var temp = {
                    name: item.first_name + ' '  + item.middle_name + ' ' + item.last_name,
                    sais_id: item.sais_id,
                    details: item
                };

                var roles = []
                
                item.roles.forEach(role => {
                    roles.push(role.name)    
                });

                var permissions = []

                item.permissions.forEach(permission => {
                    permissions.push(permission.name)    
                });

                temp.roles = roles
                temp.permissions = permissions

                return temp
            })

            var paginationData = {
                last_page: state.data.last_page,
                current_page: state.data.current_page,
            }

            usersData = Object.assign(usersData, paginationData)

            return usersData
        }
    },
    getRoles(state) {
        if(state.roles.length > 0) {
            var roles = state.roles.map((role) => {
                var temp = {
                    name: role.name,
                    id: role.id
                }
                return temp
            })
            return roles
        }
    },
    getPermissions(state) {
        if(state.permissions.length > 0) {
            var permissions = state.permissions.map((permission) => {
                var temp = {
                    name: permission.name,
                    id: permission.id
                }
                return temp
            })
            return permissions
        }
    },
    getTags(state) {
        if(state.tags.length > 0) {
            var tags = state.tags.map((tag) => {
                var temp = {
                    name: tag.tag_name,
                    id: tag.tag_id
                }
                return temp
            })
            return tags
        }
    },
    getToUpdateData(state) {
        return state.toUpdate
    },
    getInitialTagValue: (state) => (index) => {
        if(state.toUpdate.permission) {
            var permission_id = ''
            var initialTags = []

            state.permissions.forEach(permission => {
                if(permission.name == state.toUpdate.permission) {
                    permission_id = permission.id
                }
            });

            state.data.data[index].user_permission_tags.forEach(permission_tags => {
                if(permission_tags.permission_id == permission_id) {
                    if(permission_tags.tags) {
                        initialTags = JSON.parse(permission_tags.tags)[0]
                    }
                }
            });

            return initialTags
        }
    }
}