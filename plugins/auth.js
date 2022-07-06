export default ({ app, store, redirect }) => {
  // redirect('/')
  app.router.afterEach((to, from) => {
    
    

    const urlList = [
        {
            name: 'faculty-mentor-assignments',
            permissionType: 'role',
            permission: 'faculty'
        },
        {
            name: 'faculty-my-advisees',
            permissionType: 'role',
            permission: 'faculty'
        },
        ,
        {
            name: 'student-mentor-assignment',
            permissionType: 'role',
            permission: 'student'
        }
    ]

    const URLwithoutPermission = [
                                    'index',
                                    'login',
                                    'error'
                                  ]
                                  
    if (store.state.auth.user) {
        if ((URLwithoutPermission).includes(to.name)) {
          return
        }
        let pagePermission =  urlList.filter(o => o.name === to.name)
        if(pagePermission[0].permissionType === 'role'){
           if(checkRole(pagePermission[0].permission) === 0){
            window.location.href = "/error";
           } 
        }else{
            if(checkPermission(pagePermission[0].permission) === 0){
              window.location.href = "/error";
            } 
        }
    }

    function checkRole (pageRole) {
      let userRoles = store.state.auth.user.roles
      return userRoles.filter(role => role.name === pageRole).length
    }

    function checkPermission (moduleName) {
      userPermissions = store.state.auth.user.permissions
      return userPermissions.filter(permission => permission.name === moduleName).length
    }
  })
}