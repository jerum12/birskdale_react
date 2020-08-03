export default {
    items: [
        {
            id: 'stocks',
            title: 'Stocks',
            type: 'group',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                },
                 {
                    id: 'stocksmaintenance',
                    title: 'Stocks Maintenance',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'inquirestocks',
                            title: 'Inquire Stocks',
                            type: 'item',
                            url: '/stocks/inquire'
                        },
                        // {
                        //     id: 'inquirestock2',
                        //     title: 'Inquire Stocks 2',
                        //     type: 'item',
                        //     url: '/stocks/inquire2'
                        // },
                        {
                            id: 'addstocks',
                            title: 'Add Stocks',
                            type: 'item',
                            url: '/stocks/add',
                        },
                        {
                            id: 'modifystocks',
                            title: 'Modify Stocks',
                            type: 'item',
                            url: '/stocks/modify'
                        }
                        ,
                        // {
                        //     id: 'modifystocks2',
                        //     title: 'Modify Stocks 2',
                        //     type: 'item',
                        //     url: '/stocks/modify2'
                        // }
                        
                    ]
                }
            ]
        },
        {
            id: 'Parameter',
            title: 'Parameters',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'parameter1',
                    title: 'Parameter Maintenance',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'parameterinquire',
                            title: 'Inquire Parameters',
                            type: 'item',
                            url: '/parameter/inquire'  
                        },
                        {
                            id: 'updateparameter',
                            title: 'Update Parameters',
                            type: 'item',
                            url: '/parameter/update'  
                        }
                    ]
                }
            ]
        },
        {
            id: 'User',
            title: 'Users',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'user1',
                    title: 'User Maintenance',
                    type: 'collapse',
                    icon: 'user',
                    children: [
                        {
                            id: 'userinquire',
                            title: 'Inquire Users',
                            type: 'item',
                            url: '/users/inquire'  
                        },
                        {
                            id: 'userinquire2',
                            title: 'Inquire Users 2',
                            type: 'item',
                            url: '/users/inquire2'  
                        },
                        {
                            id: 'updateusers',
                            title: 'Update Users',
                            type: 'item',
                            url: '/users/update'  
                        }
                    ]
                }
            ]
        },
        {
            id: 'Report',
            title: 'Reports',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'report1',
                    title: 'Reports',
                    type: 'collapse',
                    icon: 'user',
                    children: [
                        {
                            id: 'report_1',
                            title: 'Report 1',
                            type: 'item',
                            url: '/reports/1'  
                        },
                        {
                            id: 'report_2',
                            title: 'Report 2',
                            type: 'item',
                            url: '/reports/2'  
                        }
                    ]
                }
            ]
        }
        // ,
        // {
        //     id: 'ui-forms',
        //     title: 'Forms & Tables',
        //     type: 'group',
        //     icon: 'icon-group',
        //     children: [
        //         {
        //             id: 'form-basic',
        //             title: 'Form Elements',
        //             type: 'item',
        //             url: '/forms/form-basic',
        //             icon: 'feather icon-file-text'
        //         },
        //         {
        //             id: 'bootstrap',
        //             title: 'Table',
        //             type: 'item',
        //             icon: 'feather icon-server',
        //             url: '/tables/bootstrap'
        //         }
        //     ]
        // },
        // {
        //     id: 'chart-maps',
        //     title: 'Chart & Maps',
        //     type: 'group',
        //     icon: 'icon-charts',
        //     children: [
        //         {
        //             id: 'charts',
        //             title: 'Charts',
        //             type: 'item',
        //             icon: 'feather icon-pie-chart',
        //             url: '/charts/nvd3'
        //         },
        //         {
        //             id: 'maps',
        //             title: 'Map',
        //             type: 'item',
        //             icon: 'feather icon-map',
        //             url: '/maps/google-map'
        //         }
        //     ]
        // },
        // {
        //     id: 'pages',
        //     title: 'Pages',
        //     type: 'group',
        //     icon: 'icon-pages',
        //     children: [
        //         {
        //             id: 'auth',
        //             title: 'Authentication',
        //             type: 'collapse',
        //             icon: 'feather icon-lock',
        //             badge: {
        //                 title: 'New',
        //                 type: 'label-danger'
        //             },
        //             children: [
        //                 {
        //                     id: 'signup-1',
        //                     title: 'Sign up',
        //                     type: 'item',
        //                     url: '/auth/signup-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 },
        //                 {
        //                     id: 'signin-1',
        //                     title: 'Sign in',
        //                     type: 'item',
        //                     url: '/auth/signin-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 }
        //             ]
        //         },

        //         {
        //             id: 'sample-page',
        //             title: 'Sample Page',
        //             type: 'item',
        //             url: '/sample-page',
        //             classes: 'nav-item',
        //             icon: 'feather icon-sidebar'
        //         },
        //         {
        //             id: 'docs',
        //             title: 'Documentation',
        //             type: 'item',
        //             url: '/docs',
        //             classes: 'nav-item',
        //             icon: 'feather icon-help-circle'
        //         },
        //         {
        //             id: 'menu-level',
        //             title: 'Menu Levels',
        //             type: 'collapse',
        //             icon: 'feather icon-menu',
        //             children: [
        //                 {
        //                     id: 'menu-level-1.1',
        //                     title: 'Menu Level 1.1',
        //                     type: 'item',
        //                     url: '#!',
        //                 },
        //                 {
        //                     id: 'menu-level-1.2',
        //                     title: 'Menu Level 2.2',
        //                     type: 'collapse',
        //                     children: [
        //                         {
        //                             id: 'menu-level-2.1',
        //                             title: 'Menu Level 2.1',
        //                             type: 'item',
        //                             url: '#',
        //                         },
        //                         {
        //                             id: 'menu-level-2.2',
        //                             title: 'Menu Level 2.2',
        //                             type: 'collapse',
        //                             children: [
        //                                 {
        //                                     id: 'menu-level-3.1',
        //                                     title: 'Menu Level 3.1',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 },
        //                                 {
        //                                     id: 'menu-level-3.2',
        //                                     title: 'Menu Level 3.2',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             id: 'disabled-menu',
        //             title: 'Disabled Menu',
        //             type: 'item',
        //             url: '#',
        //             classes: 'nav-item disabled',
        //             icon: 'feather icon-power'
        //         },
                /*{
                    id: 'buy-now',
                    title: 'Buy Now',
                    type: 'item',
                    icon: 'feather icon-user',
                    classes: 'nav-item',
                    url: 'https://codedthemes.com',
                    target: true,
                    external: true,
                    badge: {
                        title: 'v1.0',
                        type: 'label-primary'
                    }
                }*/
        //     ]
        // }
    ]
}