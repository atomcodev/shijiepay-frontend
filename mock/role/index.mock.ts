import Mock from 'mockjs'
import { SUCCESS_CODE } from '@/constants'
import { toAnyString } from '@/utils'
// import component from 'virtual:svg-icons-register'
// import path from 'path'

const timeout = 1000

const adminList = [
  {
    path: '/home',
    component: '#',
    redirect: '/Home/Home',
    name: 'Home',
    meta: {},
    children: [
      {
        path: 'Home',
        component: 'views/Home/Home',
        name: 'HomeDemo',
        meta: {
          title: 'router.home',
          icon: 'ant-design:home-outlined'
        }
      }
    ]
  },
  {
    path: '/channelmanagement',
    component: '#',
    redirect: '/channelmanagement/paymentchannelmanagement',
    name: 'ChannelManagement',
    meta: {
      title: 'router.channelmanagement',
      icon: 'ant-design:merge-outlined',
      alwaysShow: true
    },
    children: [
      {
        path: 'paymentchannelmanagement',
        component: 'views/ChannelManagement/PaymentChannelManagement/PaymentChannelManagement',
        name: 'PaymentChannelManagement',
        meta: {
          title: 'router.paymentchannelmanagement'
        }
      },
      {
        path: 'collectionchannel',
        component: 'views/ChannelManagement/CollectionChannel/CollectionChannel',
        name: 'CollectionChannel',
        meta: {
          title: 'router.collectionchannel'
        }
      },
      {
        path: 'paymentchannel',
        component: 'views/ChannelManagement/PaymentChannel/PaymentChannel',
        name: 'PaymentChannel',
        meta: {
          title: 'router.paymentchannel'
        }
      }
    ]
  },
  {
    path: '/merchantmanagement',
    component: '#',
    redirect: '/merchantmanagement/merchantlist',
    name: 'MerchantManagement',
    meta: {
      title: 'router.merchantmanagement',
      icon: 'ant-design:shop-outlined',
      alwaysShow: true
    },
    children: [
      {
        path: 'merchantlist',
        component: 'views/MerchantManagement/MerchantList/MerchantList',
        name: 'MerchantList',
        meta: {
          title: 'router.merchantlist'
        }
      },
      {
        path: 'merchantclassification',
        component: 'views/MerchantManagement/MerchantClassification/MerchantClassification',
        name: 'MerchantClassification',
        meta: {
          title: 'router.merchantclassification'
        }
      },
      {
        path: 'internallist',
        component: 'views/MerchantManagement/InternalList/InternalList',
        name: 'InternalList',
        meta: {
          title: 'router.internallist'
        }
      },
      {
        path: 'reduceMoney',
        component: 'views/MerchantManagement/DeductionList/DeductionList',
        name: 'Deduction List',
        meta: {
          title: 'router.deductionlist'
        }
      },
      {
        path: 'withdrawList',
        component: 'views/MerchantManagement/WithdrawApplication/WithdrawApplication',
        name: 'Withdrawal Application',
        meta: {
          title: 'router.withdrawapplication'
        }
      }
    ]
  },
  {
    path: '/collectionmanagement',
    component: '#',
    redirect: '/collectionmanagement/orderlist',
    name: 'CollectionManagement',
    meta: {
      title: 'router.collectionmanagement',
      icon: 'ant-design:money-collect-outlined',
      alwaysShow: true
    },
    children: [
      {
        path: 'orderlist',
        component: 'views/CollectionManagement/OrderList/OrderList',
        name: 'OrderList',
        meta: {
          title: 'router.orderlist'
        }
      },
      {
        path: 'droporderlist',
        component: 'views/CollectionManagement/DropOrderList/DropOrderList',
        name: 'DropOrderList',
        meta: {
          title: 'router.droporderlist'
        }
      },
      {
        path: 'callbacklog',
        component: 'views/CollectionManagement/CallbackRecord/CallbackRecord',
        name: 'callbacklog',
        meta: {
          title: 'router.callbacklog'
        }
      }
    ]
  },
  {
    path: '/paymentmanagement',
    component: '#',
    redirect: '/paymentmanagement/paymentconfiguration',
    name: 'PaymentManagement',
    meta: {
      title: 'router.paymentmanagement',
      icon: 'ant-design:shop-outlined',
      alwaysShow: true
    },
    children: [
      {
        path: 'paymentconfiguration',
        component: 'views/PaymentManagement/PaymentConfiguration/PaymentConfiguration',
        name: 'PaymentConfiguration',
        meta: {
          title: 'router.paymentconfiguration'
        }
      },
      {
        path: 'paymentorder',
        component: 'views/PaymentManagement/PaymentOrder/PaymentOrder',
        name: 'PaymentOrder',
        meta: {
          title: 'router.paymentorder'
        }
      },
      {
        path: 'callbackrecord',
        component: 'views/PaymentManagement/CallbackRecord/CallbackRecord',
        name: 'CallbackRecord',
        meta: {
          title: 'router.callbackrecord'
        }
      }
    ]
  },
  {
    path: '/financialmanagement',
    component: '#',
    redirect: '/FinancialManagement/',
    name: 'FinancialManagement',
    meta: {
      title: 'router.financialmanagement',
      icon: 'tdesign:chart-area-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'merchantreport',
        component: 'views/FinancialManagement/MerchantReport/MerchantReport',
        name: 'MerchantReport',
        meta: {
          title: 'router.merchantreport'
        }
      },
      {
        path: 'channelreport',
        component: 'views/FinancialManagement/ChannelReport/ChannelReport',
        name: 'ChannelReport',
        meta: {
          title: 'router.channelreport'
        }
      }
    ]
  },
  {
    path: '/securitymonitoring',
    component: '#',
    redirect: '/securitymonitoring/abnormalorder',
    name: 'SecurityMonitoring',
    meta: {
      title: 'router.securitymonitoring',
      icon: 'ant-design:safety-certificate-outlined',
      alwaysShow: true
    },
    children: [
      {
        path: 'abnormalordermonitoring',
        component: 'views/SecurityMonitoring/AbnormalOrderMonitoring/AbnormalOrderMonitoring',
        name: 'AbnormalOrderMonitoring',
        meta: {
          title: 'router.abnormalordermonitoring'
        }
      },
      {
        path: 'paymentorderdetection',
        component: 'views/SecurityMonitoring/PaymentOrderDetection/PaymentOrderDetection',
        name: 'PaymentOrderDetection',
        meta: {
          title: 'router.paymentorderdetection'
        }
      }
    ]
  },
  {
    path: '/systemmanagement',
    component: '#',
    redirect: '/systemmanagement/userlist',
    name: 'SystemManagement',
    meta: {
      title: 'router.systemmanagement',
      icon: 'solar:settings-outline',
      alwaysShow: true
    },
    children: [
      {
        path: 'userlist',
        component: 'views/SystemManagement/UserList/UserList',
        name: 'UserList',
        meta: {
          title: 'router.userlist'
        }
      },
      {
        path: 'listofroles',
        component: 'views/SystemManagement/ListOfRoles/ListOfRoles',
        name: 'ListOfRoles',
        meta: {
          title: 'router.listofroles'
        }
      },
      {
        path: 'listofmenus',
        component: 'views/SystemManagement/ListOfMenus/ListOfMenus',
        name: 'ListOfMenus',
        meta: {
          title: 'router.listofmenus'
        }
      },
      {
        path: 'operationlog',
        component: 'views/SystemManagement/Log/Log',
        name: 'Log',
        meta: {
          title: 'router.operationlog'
        }
      },
      {
        path: 'systemconfiguration',
        component: 'views/SystemManagement/Configuration/Configuration',
        name: 'Configuration',
        meta: {
          title: 'router.systemconfiguration'
        }
      }
    ]
  },
  {
    path: '/APIlogs',
    component: '#',
    redirect: '/APILogs/',
    name: 'APILogs',
    meta: {
      title: 'router.APIlogs',
      icon: 'icon-park-outline:api',
      alwaysShow: true
    },
    children: [
      {
        path: 'systemAPIlog',
        component: 'views/APILogs/SystemAPILog/SystemAPILog',
        name: 'SystemAPILog',
        meta: {
          title: 'router.systemAPIlog'
        }
      },
      {
        path: 'channelAPIlog',
        component: 'views/APILogs/ChannelAPILog/ChannelAPILog',
        name: 'ChannelAPILog',
        meta: {
          title: 'router.channelAPIlog'
        }
      }
    ]
  },
  // {
  //   path: '/accessguide',
  //   component: '#',
  //   redirect: '/AccessGuide/',
  //   name: 'AccessGuide',
  //   meta: {
  //     title: 'router.accessguide',
  //     icon: 'ant-design:file-text-outlined',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'CollectionAPI',
  //       component: 'views/AccessGuide/paymentAPI/CollectionAPI',
  //       name: 'CollectionAPI',
  //       meta: {
  //         title: 'router.collectionAPI'
  //       }
  //     },
  //     {
  //       path: 'paymentAPI',
  //       component: 'views/AccessGuide/paymentAPI/',
  //       name: 'paymentAPI',
  //       meta: {
  //         title: 'router.paymentAPI'
  //       }
  //     }
  //   ]
  // }

  // {
  //   path: '/accessguide',
  //   component: '#',
  //   redirect: '/AccessGuide/',
  //   name: 'AccessGuide',
  //   meta: {
  //     title: 'router.accessguide',
  //     icon: 'ant-design:file-text-outlined',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: '/external-link',
  //       component: '#',
  //       meta: {},
  //       name: 'ExternalLink',
  //       children: [
  //         {
  //           path: 'https://element-plus-admin-doc.cn/',
  //           name: 'DocumentLink',
  //           meta: {
  //             title: 'router.document',
  //             icon: 'vi-clarity:document-solid'
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }
  {
    path: '/external-link',
    // component: '#',
    meta: {
      title: 'router.accessguide',
      icon: 'ant-design:file-text-outlined',
      alwaysShow: true
    },
    children: [
      {
        // path: 'CollectionAPI',
        // path: '/src/views/AccessGuide/CollectionAPI/CollectionAPI.html',
        path: 'localhost:4000/#/AccessGuide/CopllectionAPI/CopllectionAPI.html',
        meta: {
          title: 'router.collectionAPI'
        }
      },
      {
        path: 'https://element-plus-admin-doc.cn/',
        meta: {
          title: 'router.paymentAPI'
        }
      }
    ]
  }
]

const testList = [
  {
    path: '/merchant/home',
    component: '#',
    redirect: '/Merchant/Home/Home',
    name: 'MerchantHome',
    meta: {},
    children: [
      {
        path: 'Home',
        component: 'views/Merchant/Home/Home',
        name: 'MerchantHomeDemo',
        meta: {
          title: 'router.home',
          icon: 'ant-design:home-outlined'
        }
      }
    ]
  },
  {
    path: '/merchant/accountinformation',
    component: '#',
    redirect: '/Merchant',
    name: 'AccountInformation/AccountInformation',
    meta: {},
    children: [
      {
        path: 'AccountInformation',
        component: 'views/Merchant/AccountInformation/AccountInformation',
        name: 'AccountInformation',
        meta: {
          title: 'router.accountinformation',
          icon: 'ant-design:solution-outlined'
        }
      }
    ]
  },
  {
    path: '/merchant/bankcardinformation',
    component: '#',
    redirect: '/Merchant',
    name: 'BankCardInformation/BankCardInformation',
    meta: {},
    children: [
      {
        path: 'BankCardInformation',
        component: 'views/Merchant/BankCardInformation/BankCardInformation',
        name: 'BankCardInformation',
        meta: {
          title: 'router.bankcardinformation',
          icon: 'ant-design:credit-card-outlined'
        }
      }
    ]
  },
  {
    path: '/merchant/collectionorder',
    component: '#',
    redirect: '/Merchant',
    name: 'CollectionOrder/CollectionOrder',
    meta: {},
    children: [
      {
        path: 'CollectionOrder',
        component: 'views/Merchant/CollectionOrder/CollectionOrder',
        name: 'CollectionOrder',
        meta: {
          title: 'router.collectionorder',
          icon: 'ant-design:money-collect-outlined'
        }
      }
    ]
  },
  {
    path: '/merchant/paymentorder',
    component: '#',
    redirect: '/Merchant',
    name: 'PaymentOrder/PaymentOrder',
    meta: {},
    children: [
      {
        path: 'PaymentOrder',
        component: 'views/Merchant/PaymentOrder/PaymentOrder',
        name: 'MerchantPaymentOrder',
        meta: {
          title: 'router.paymentorder',
          icon: 'ant-design:property-safety-outlined'
        }
      }
    ]
  },
  {
    path: '/merchant/CashFlow',
    component: '#',
    redirect: '/Merchant',
    name: 'CashFlow/CashFlow',
    meta: {},
    children: [
      {
        path: 'CashFlow',
        component: 'views/Merchant/CashFlow/CashFlow',
        name: 'MerchantCashFlow',
        meta: {
          title: 'router.cashflow',
          icon: 'ant-design:bar-chart-outlined'
        }
      }
    ]
  },
  {
    path: '/merchant/merchantreport',
    component: '#',
    redirect: '/Merchant',
    name: 'MerchantReport/MerchantReport',
    meta: {},
    children: [
      {
        path: 'merMerchantReport',
        component: 'views/Merchant/MerchantReport/MerchantReport',
        name: 'merMerchantReport',
        meta: {
          title: 'router.merchantreport',
          icon: 'ant-design:pay-circle-outlined'
        }
      }
    ]
  },
  {
    path: '/merchant/settlementrecords',
    component: '#',
    redirect: '/Merchant',
    name: 'SettlementRecords/SettlementRecords',
    meta: {},
    children: [
      {
        path: 'SettlementRecords',
        component: 'views/Merchant/SettlementRecords/SettlementRecords',
        name: 'SettlementRecords',
        meta: {
          title: 'router.settlementrecords',
          icon: 'ant-design:money-collect-filled'
        }
      }
    ]
  },
  {
    path: '/merchant/downloadfile',
    component: '#',
    redirect: '/Merchant',
    name: 'DownloadFile/DownloadFile',
    meta: {},
    children: [
      {
        path: 'DownloadFile',
        component: 'views/Merchant/DownloadFile/DownloadFile',
        name: 'DownloadFile',
        meta: {
          title: 'router.downloadfile',
          icon: 'ant-design:file-protect-outlined'
        }
      }
    ]
  }
  // '/dashboard',
  // '/dashboard/analysis',
  // '/dashboard/workplace',
  // 'external-link',
  // 'https://element-plus-admin-doc.cn/',
  // '/guide',
  // '/guide/index',
  // '/components',
  // '/components/form',
  // '/components/form/default-form',
  // '/components/form/use-form',
  // '/components/form/ref-form',
  // '/components/table',
  // '/components/table/default-table',
  // '/components/table/use-table',
  // '/components/table/tree-table',
  // '/components/table/table-image-preview',
  // '/components/table/table-video-preview',
  // '/components/table/ref-table',
  // '/components/table/card-table',
  // '/components/editor-demo',
  // '/components/editor-demo/editor',
  // '/components/editor-demo/json-editor',
  // '/components/editor-demo/code-editor',
  // '/components/search',
  // '/components/descriptions',
  // '/components/image-viewer',
  // '/components/dialog',
  // '/components/icon',
  // '/components/iconPicker',
  // '/components/echart',
  // '/components/count-to',
  // '/components/qrcode',
  // '/components/highlight',
  // '/components/infotip',
  // '/components/input-password',
  // '/components/waterfall',
  // '/components/image-cropping',
  // '/components/video-player',
  // '/components/avatars',
  // '/components/i-agree',
  // 'function',
  // '/function/multiple-tabs',
  // '/function/multiple-tabs-demo/:id',
  // '/function/request',
  // '/function/test',
  // '/hooks',
  // '/hooks/useWatermark',
  // '/hooks/useTagsView',
  // '/hooks/useValidator',
  // '/hooks/useCrudSchemas',
  // '/hooks/useClipboard',
  // '/hooks/useNetwork',
  // '/level',
  // '/level/menu1',
  // '/level/menu1/menu1-1',
  // '/level/menu1/menu1-1/menu1-1-1',
  // '/level/menu1/menu1-2',
  // '/level/menu2',
  // '/example',
  // '/example/example-dialog',
  // '/example/example-page',
  // '/example/example-add',
  // '/example/example-edit',
  // '/example/example-detail',
  // '/authorization',
  // '/authorization/department',
  // '/authorization/user',
  // '/authorization/role',
  // '/authorization/menu',
  // '/error',
  // '/error/404-demo',
  // '/error/403-demo',
  // '/error/500-demo',
  // '/systemmanagement',
  // '/systemmanagement/log',
  // '/systemmanagement/configuration'
]

const List: any[] = []

const roleNames = ['超级管理员', '管理员', '普通用户', '游客']
const menus = [
  [
    {
      path: '/dashboard',
      component: '#',
      redirect: '/dashboard/analysis',
      name: 'Dashboard',
      status: Mock.Random.integer(0, 1),
      id: 1,
      meta: {
        title: '首页',
        icon: 'vi-ant-design:dashboard-filled',
        alwaysShow: true
      },
      children: [
        {
          path: 'analysis',
          component: 'views/Dashboard/Analysis',
          name: 'Analysis',
          status: Mock.Random.integer(0, 1),
          id: 2,
          meta: {
            title: '分析页',
            noCache: true
          }
        },
        {
          path: 'workplace',
          component: 'views/Dashboard/Workplace',
          name: 'Workplace',
          status: Mock.Random.integer(0, 1),
          id: 3,
          meta: {
            title: '工作台',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/external-link',
      component: '#',
      meta: {
        title: '文档',
        icon: 'vi-clarity:document-solid'
      },
      name: 'ExternalLink',
      status: Mock.Random.integer(0, 1),
      id: 4,
      children: [
        {
          path: 'https://element-plus-admin-doc.cn/',
          name: 'DocumentLink',
          status: Mock.Random.integer(0, 1),
          id: 5,
          meta: {
            title: '文档'
          }
        }
      ]
    },
    {
      path: '/level',
      component: '#',
      redirect: '/level/menu1/menu1-1/menu1-1-1',
      name: 'Level',
      status: Mock.Random.integer(0, 1),
      id: 6,
      meta: {
        title: '菜单',
        icon: 'vi-carbon:skill-level-advanced'
      },
      children: [
        {
          path: 'menu1',
          name: 'Menu1',
          component: '##',
          status: Mock.Random.integer(0, 1),
          id: 7,
          redirect: '/level/menu1/menu1-1/menu1-1-1',
          meta: {
            title: '菜单1'
          },
          children: [
            {
              path: 'menu1-1',
              name: 'Menu11',
              component: '##',
              status: Mock.Random.integer(0, 1),
              id: 8,
              redirect: '/level/menu1/menu1-1/menu1-1-1',
              meta: {
                title: '菜单1-1',
                alwaysShow: true
              },
              children: [
                {
                  path: 'menu1-1-1',
                  name: 'Menu111',
                  component: 'views/Level/Menu111',
                  status: Mock.Random.integer(0, 1),
                  id: 9,
                  permission: ['edit', 'add', 'delete'],
                  meta: {
                    title: '菜单1-1-1',
                    permission: ['edit', 'add', 'delete']
                  }
                }
              ]
            },
            {
              path: 'menu1-2',
              name: 'Menu12',
              component: 'views/Level/Menu12',
              status: Mock.Random.integer(0, 1),
              id: 10,
              permission: ['edit', 'add', 'delete'],
              meta: {
                title: '菜单1-2',
                permission: ['edit', 'add', 'delete']
              }
            }
          ]
        },
        {
          path: 'menu2',
          name: 'Menu2Demo',
          component: 'views/Level/Menu2',
          status: Mock.Random.integer(0, 1),
          id: 11,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '菜单2',
            permission: ['edit', 'add', 'delete']
          }
        }
      ]
    },
    {
      path: '/example',
      component: '#',
      redirect: '/example/example-dialog',
      name: 'Example',
      status: Mock.Random.integer(0, 1),
      id: 12,
      meta: {
        title: '综合示例',
        icon: 'vi-ep:management',
        alwaysShow: true
      },
      children: [
        {
          path: 'example-dialog',
          component: 'views/Example/Dialog/ExampleDialog',
          name: 'ExampleDialog',
          status: Mock.Random.integer(0, 1),
          id: 13,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '综合示例-弹窗',
            permission: ['edit', 'add', 'delete']
          }
        },
        {
          path: 'example-page',
          component: 'views/Example/Page/ExamplePage',
          name: 'ExamplePage',
          status: Mock.Random.integer(0, 1),
          id: 14,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '综合示例-页面',
            permission: ['edit', 'add', 'delete']
          }
        },
        {
          path: 'example-add',
          component: 'views/Example/Page/ExampleAdd',
          name: 'ExampleAdd',
          status: Mock.Random.integer(0, 1),
          id: 15,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '综合示例-新增',
            noTagsView: true,
            noCache: true,
            hidden: true,
            showMainRoute: true,
            activeMenu: '/example/example-page',
            permission: ['edit', 'add', 'delete']
          }
        },
        {
          path: 'example-edit',
          component: 'views/Example/Page/ExampleEdit',
          name: 'ExampleEdit',
          status: Mock.Random.integer(0, 1),
          id: 16,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '综合示例-编辑',
            noTagsView: true,
            noCache: true,
            hidden: true,
            showMainRoute: true,
            activeMenu: '/example/example-page',
            permission: ['edit', 'add', 'delete']
          }
        },
        {
          path: 'example-detail',
          component: 'views/Example/Page/ExampleDetail',
          name: 'ExampleDetail',
          status: Mock.Random.integer(0, 1),
          id: 17,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '综合示例-详情',
            noTagsView: true,
            noCache: true,
            hidden: true,
            showMainRoute: true,
            activeMenu: '/example/example-page',
            permission: ['edit', 'add', 'delete']
          }
        }
      ]
    }
  ],
  [
    {
      path: '/dashboard',
      component: '#',
      redirect: '/dashboard/analysis',
      name: 'Dashboard',
      status: Mock.Random.integer(0, 1),
      id: 1,
      meta: {
        title: '首页',
        icon: 'vi-ant-design:dashboard-filled',
        alwaysShow: true
      },
      children: [
        {
          path: 'analysis',
          component: 'views/Dashboard/Analysis',
          name: 'Analysis',
          status: Mock.Random.integer(0, 1),
          id: 2,
          meta: {
            title: '分析页',
            noCache: true
          }
        },
        {
          path: 'workplace',
          component: 'views/Dashboard/Workplace',
          name: 'Workplace',
          status: Mock.Random.integer(0, 1),
          id: 3,
          meta: {
            title: '工作台',
            noCache: true
          }
        }
      ]
    }
  ],
  [
    {
      path: '/external-link',
      component: '#',
      meta: {
        title: '文档',
        icon: 'vi-clarity:document-solid'
      },
      name: 'ExternalLink',
      status: Mock.Random.integer(0, 1),
      id: 4,
      children: [
        {
          path: 'https://element-plus-admin-doc.cn/',
          name: 'DocumentLink',
          status: Mock.Random.integer(0, 1),
          id: 5,
          meta: {
            title: '文档'
          }
        }
      ]
    },
    {
      path: '/level',
      component: '#',
      redirect: '/level/menu1/menu1-1/menu1-1-1',
      name: 'Level',
      status: Mock.Random.integer(0, 1),
      id: 6,
      meta: {
        title: '菜单',
        icon: 'vi-carbon:skill-level-advanced'
      },
      children: [
        {
          path: 'menu1',
          name: 'Menu1',
          component: '##',
          status: Mock.Random.integer(0, 1),
          id: 7,
          redirect: '/level/menu1/menu1-1/menu1-1-1',
          meta: {
            title: '菜单1'
          },
          children: [
            {
              path: 'menu1-1',
              name: 'Menu11',
              component: '##',
              status: Mock.Random.integer(0, 1),
              id: 8,
              redirect: '/level/menu1/menu1-1/menu1-1-1',
              meta: {
                title: '菜单1-1',
                alwaysShow: true
              },
              children: [
                {
                  path: 'menu1-1-1',
                  name: 'Menu111',
                  component: 'views/Level/Menu111',
                  status: Mock.Random.integer(0, 1),
                  id: 9,
                  permission: ['edit', 'add', 'delete'],
                  meta: {
                    title: '菜单1-1-1',
                    permission: ['edit', 'add', 'delete']
                  }
                }
              ]
            },
            {
              path: 'menu1-2',
              name: 'Menu12',
              component: 'views/Level/Menu12',
              status: Mock.Random.integer(0, 1),
              id: 10,
              permission: ['edit', 'add', 'delete'],
              meta: {
                title: '菜单1-2',
                permission: ['edit', 'add', 'delete']
              }
            }
          ]
        },
        {
          path: 'menu2',
          name: 'Menu2Demo',
          component: 'views/Level/Menu2',
          status: Mock.Random.integer(0, 1),
          id: 11,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '菜单2',
            permission: ['edit', 'add', 'delete']
          }
        }
      ]
    }
  ],
  [
    {
      path: '/example',
      component: '#',
      redirect: '/example/example-dialog',
      name: 'Example',
      status: Mock.Random.integer(0, 1),
      id: 12,
      meta: {
        title: '综合示例',
        icon: 'vi-ep:management',
        alwaysShow: true
      },
      children: [
        {
          path: 'example-detail',
          component: 'views/Example/Page/ExampleDetail',
          name: 'ExampleDetail',
          status: Mock.Random.integer(0, 1),
          id: 17,
          permission: ['edit', 'add', 'delete'],
          meta: {
            title: '综合示例-详情',
            noTagsView: true,
            noCache: true,
            hidden: true,
            showMainRoute: true,
            activeMenu: '/example/example-page',
            permission: ['edit', 'add', 'delete']
          }
        }
      ]
    }
  ]
]

for (let i = 0; i < 4; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      // timestamp: +Mock.Random.date('T'),
      roleName: roleNames[i],
      role: '@first',
      status: Mock.Random.integer(0, 1),
      createTime: '@datetime',
      remark: '@cword(10, 15)',
      menu: menus[i]
    })
  )
}

export default [
  // 列表接口
  {
    url: '/mock/role/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: adminList
      }
    }
  },
  {
    url: '/mock/role/table',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: List,
          total: 4
        }
      }
    }
  },
  // 列表接口
  {
    url: '/mock/role/list2',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: testList
      }
    }
  },
  {
    url: '/mock/role/table',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: List,
          total: 4
        }
      }
    }
  }
]
