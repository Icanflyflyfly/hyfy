/**
 * 编码操作
 * @author liubf
 * @version 1.0
 * @class com.bhtec.view.business.seal.sealapplyquery.SealApplyQueryVOp
 * @date 2017-09-19
 */
Ext.namespace('com.bhtec.view.business.seal.sealapplyquery');
com.bhtec.view.business.seal.sealapplyquery.SealApplyQueryVOp = function(config){
    var moduleVOp = this;   //父类调用
    var moduleGridId = 'sealApplyQueryListGridId';//form表单id


    /**
     * 编码增加修改表单
     */
    var funForm = function(configForm){

        /**
         * 公用增加修改删除表单
         */
        var moduleData = configForm.moduleData||'';
        //单位ID
        var sealUnitId = new Ext.form.Hidden({
            id : "sealUnitId",
            name : "sealUnitId",
            value:moduleData.sealUnitId||'0'
        });

        //营业执照编号(单位证件号码)
        var licenseNo = moduleVOp.textField({
            id : "licenseNo",
            name : "licenseNo",
            allowBlank:false,
            fieldLabel : config.licenseNo,
            value:moduleData.licenseNo||'',
            maxLength:20
        });

        //单位名称
        var unitName = moduleVOp.textField({
            id : "unitName",
            name : "unitName",
            allowBlank:false,
            fieldLabel : config.unitName,
            value:moduleData.unitName||'',
            maxLength:20
        });

        //英文名称
        var unitNamePy = moduleVOp.textField({
            id : "unitNamePy",
            name : "unitNamePy",
            allowBlank:false,
            fieldLabel : config.unitNamePy,
            value:moduleData.unitNamePy||'',
            maxLength:20
        });

        //企业类型
        var companyType = moduleVOp.comboBox({
            id : "companyType",
            fieldLabel : config.companyType,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'companyType'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.companyType){
                            getExtCmpById('companyType').setValue(moduleData.companyType);
                        }else{
                            getExtCmpById('companyType').setValue('company');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });

        //负责人
        var manager = moduleVOp.textField({
            id : "manager",
            name : "manager",
            allowBlank:false,
            fieldLabel : config.manager,
            value:moduleData.manager||'',
            maxLength:20
        });

        //证件类型
        var certificateType = moduleVOp.comboBox({
            id : "certificateType",
            fieldLabel : config.certificateType,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'certificate'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.area){
                            getExtCmpById('certificateType').setValue(moduleData.certificateType);
                        }else{
                            getExtCmpById('certificateType').setValue('idcard');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });

        //证件号码
        var certificateNo = moduleVOp.textField({
            id : "certificateNo",
            name : "certificateNo",
            allowBlank:false,
            fieldLabel : config.certificateNo,
            value:moduleData.certificateNo||'',
            maxLength:20
        });

        //电话
        var phone = moduleVOp.textField({
            id : "phone",
            name : "phone",
            allowBlank:false,
            fieldLabel : config.phone,
            value:moduleData.phone||'',
            maxLength:20
        });

        //地址
        var address = moduleVOp.textField({
            id : "address",
            name : "address",
            allowBlank:false,
            fieldLabel : config.address,
            value:moduleData.address||'',
            maxLength:50
        });


        //调用父类方法进行窗口构造
        moduleVOp.cuvWindow({
            title:configForm.title,				//窗口title
            columnFields:[sealUnitId,licenseNo,unitName,unitNamePy,companyType,phone,address,
                manager],		//表单第一列
            modify:configForm.modify,			//窗口判断是否显示保存增加按钮
            allButtonHidden:configForm.allButtonHidden,
            autoScroll:true,
            labelWidth:100
        });
    };

    /**
     * 审核单位信息
     */
    var unitForm = function(configForm){
        var moduleData = configForm.moduleData||'';

        /**
         * 公用增加修改删除表单
         */

            //机构名称
        var orgSimpleName = moduleVOp.textField({
                id : "orgSimpleName",
                name : "orgSimpleName",
                allowBlank:false,
                maxLength  : 10,
                fieldLabel : config.orgSimpleName,
                value:moduleData.orgSimpleName||''
            });

        //机构全称
        var orgFullName = moduleVOp.textField({
            name : "orgFullName",
            value:moduleData.orgFullName||'',
            maxLength  : 60,
            fieldLabel : config.orgFullName
        });

        //机构ID
        var orgId = new Ext.form.Hidden({
            id : "orgId",
            value:moduleData.orgId||''
        });
        var upOrgNameValue;
        var upOrgIdValue;
        if(moduleData.uporgId != undefined){
            upOrgIdValue = moduleData.uporgId;
            upOrgNameValue = moduleData.upOrgName;
        }else{
            upOrgIdValue = getExtCmpValueById('organTreeId');
            upOrgNameValue = getExtCmpValueById('organTreeNodeNameId');
        }
        //上级机构ID
        var upOrgId = new Ext.form.Hidden({
            id : "uporgId",
            value:upOrgIdValue||''
        });

        //机构代码
        var orgCode = moduleVOp.textField({
            name : "orgCode",
            value:moduleData.orgCode||'',
            maxLength  : 10,
            fieldLabel : config.orgCode,
            vtype:'alphanum',
            emptyText:'请输入字母、数字、下划线'
        });

        //联系地址1
        var orgAddress1 = moduleVOp.textField({
            name : "orgAddress1",
            value:moduleData.orgAddress1||'',
            maxLength  : 100,
            fieldLabel : config.orgAddress1
        });
        //联系地址2
        var orgAddress2 = moduleVOp.textField({
            name : "orgAddress2",
            value:moduleData.orgAddress2||'',
            maxLength  : 100,
            fieldLabel : config.orgAddress2
        });
        //联系电话1
        var orgTel1 = moduleVOp.numberField({
            name : "orgTel1",
            value:moduleData.orgTel1||'',
            maxLength  : 15,
            fieldLabel : config.orgTel1,
            emptyText:'请输入数字',
            allowDecimals : false
        });
        //联系电话2
        var orgTel2 = moduleVOp.numberField({
            name : "orgTel2",
            value:moduleData.orgTel2||'',
            maxLength  : 15,
            fieldLabel : config.orgTel2,
            allowDecimals : false,
            emptyText:'请输入数字'
        });
        //成立日期
        var orgBeginDate = moduleVOp.dateField({
            name : "orgBeginDate",
            value:moduleData.orgBeginDate||'',
            format:'Y-m-d',
            fieldLabel : config.orgBeginDate
        });

        //机构类型
        var orgType = moduleVOp.comboBox({
            id : "orgType",
            fieldLabel : config.orgType,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'organType'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.orgType){
                            getExtCmpById('orgType').setValue(moduleData.orgType);
                        }else{
                            getExtCmpById('orgType').setValue('branch');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });

        //机构邮编
        var orgPostal = moduleVOp.numberField({
            name : "orgPostal",
            fieldLabel : config.orgPostal,
            value:moduleData.orgPostal||'',
            allowDecimals : false,
            maxLength  : 6,
            emptyText:'请输入数字'
        });

        //法人代表
        var orgLegal = moduleVOp.textField({
            name : "orgLegal",
            fieldLabel : config.orgLegal,
            value:moduleData.orgLegal||'',
            maxLength  : 10
        });

        //税务号
        var orgTaxNo = moduleVOp.textField({
            name : "orgTaxNo",
            fieldLabel : config.orgTaxNo,
            maxLength:25,
            vtype:'alphanum',
            value:moduleData.orgTaxNo||'',
            emptyText:'请输入字母、数字、下划线'
        });

        //注册登记号
        var orgRegNo = moduleVOp.textField({
            name : "orgRegNo",
            maxLength:25,
            vtype:'alphanum',
            fieldLabel : config.orgRegNo,
            value:moduleData.orgRegNo||'',
            emptyText:'请输入字母、数字、下划线'
        });

        var treeWin = function(){
            var url = 'districtAction!findNextLevelChildNodes.action';
            moduleVOp.treeWindow({
                title:'地区树',
                items:moduleVOp.asyncTreePanel({
                    rootText:'地区树',
                    rootVisible:true,
                    url:url,
                    clickNode:function(node, e){
                        getExtCmpById('orgBelongDist').setValue(node.id);
                        getExtCmpById('orgBelongDistName').setValue(node.text);
                    }
                })
            });

        };

        var orgBelongDistId = new Ext.form.Hidden({
            id:'orgBelongDist',
            value:moduleData.orgBelongDist||0
        })

        //所属地区
        var orgBelongDistName = moduleVOp.triggerField({
            id : 'orgBelongDistName',
            name : 'orgBelongDistName',
            fieldLabel : config.orgBelongDist,
            value:moduleData.orgBelongDistName||'',
            allowBlank:false,
            window:treeWin
        });

        //机构状态
        var status = moduleVOp.comboBox({
            id : "status",
            fieldLabel : config.status,
            store:new Ext.data.JsonStore({
                data 	: com.bhtec.util.Data.status,
                fields 	: com.bhtec.util.Data.statusFields
            }),
            valueField 	: 'status',
            displayField: 'statusName',
            value:moduleData.status||'enable',
            allowBlank:false
        });
        //机构树
        var organTreeUrl = 'organAction!findNextLevelChildNodes.action';
        if(moduleData.orgId){//机构修改过滤掉本机构
            organTreeUrl = 'organAction!findNextLevelChildNodes.action?filterOrgId='+moduleData.orgId;
        }
        var treeWin = function(){
            moduleVOp.treeWindow({
                title 	 : '机构树',
                items	 : moduleVOp.asyncTreePanel({
                    rootText:basicConstant.ORGAN_ROOT,
                    rootVisible:true,
                    url:organTreeUrl,
                    clickNode:function(node, e){
                        getExtCmpById('uporgId').setValue(node.id);
                        getExtCmpById('upOrgName').setValue(node.text);
                    }
                })
            });
        };
        //上级机构
        var upOrgName = moduleVOp.triggerField({
            id : 'upOrgName',
            name : 'upOrgName',
            fieldLabel : config.upOrgId,
            value:upOrgNameValue||'',
            allowBlank:false,
            window:treeWin
        });


        //备注
        var memo = moduleVOp.textField({
            name : "memo",
            value:moduleData.memo||'',
            fieldLabel : config.memo,
            maxLength:50
        });

        //创建时间
        var creator = new Ext.form.Hidden({
            name : "creator",
            value:moduleData.creator||''
        });
        //创建人
        var createDate = new Ext.form.Hidden({
            name : "createDate",
            value:moduleData.createDate||''
        });

        //调用父类方法进行窗口构造
        moduleVOp.cuvWindow({
            title:configForm.title,				//窗口title
            columnFields:[orgSimpleName,orgFullName,orgCode,orgLegal,
                orgAddress1,orgAddress2,orgTel1,orgTel2,
                orgBeginDate,orgType,orgPostal,orgTaxNo,
                orgRegNo,orgBelongDistName,status,upOrgName,memo,
                upOrgId,orgId,creator,createDate,orgBelongDistId],	//表单第一列
            modify:configForm.modify,			//窗口判断是否显示保存增加按钮
            allButtonHidden:configForm.allButtonHidden
        });
    };

    /**
     * 查看页面承刻单位
     */
    var viewApplyUnit = function(){
        var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
        if(modDelRecord != ''){
            var configFind = {
                url:'sealUnitQueryAction!findEntityById.action',
                params:{sealUnitId:modDelRecord.sealUnitId},
                callBack:function(returnData){
                    var configForm = {
                        title:'申刻单位详情',
                        moduleData:returnData.sealUnitEntity,
                        allButtonHidden:true
                    }
                    funForm(configForm);
                }
            }
            ajaxRequest(configFind);
        }
    }

    //印章审批单信息
    var viewSealApproval = function(view){
        var syncUrl = 'sealAction!findApprovalPersonInfo.action';
        var data = syncAjaxReqDecode(syncUrl,'');

        var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录

        if(modDelRecord != ''){
            var status = '待审核'
            if(config.status == '3'){
                status = '重报待审核';
            }
            //批单基本信息
            var approvalInfo = moduleVOp.fieldSet({
                id:'approvalInfoId',
                title:'批单基本信息',				//窗口title
                layout:'form',
                autoHeight:true,
                columnFields:[
                    moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.approvalNum+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : (modDelRecord.approvalNum ),
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.status+' : ')
                            }),moduleVOp.label({
                                text : status
                            })
                        ]
                    })]	//表单第一列
            });

            //申刻单位信息
            var approvalUnitInfo = moduleVOp.fieldSet({
                id:'approvalUnitId',
                title:'申刻单位信息',				//窗口title
                layout:'form',
                autoHeight:true,
                columnFields:[
                    moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.unitName+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : (modDelRecord.unitName ),
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.manager+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : modDelRecord.manager,
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.phone+'     : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : modDelRecord.phone,
                                style:"padding:5px 0px"
                            })
                        ]
                    })]	//表单第一列
            });

            //申刻人信息
            var approvalPersonInfo = moduleVOp.fieldSet({
                id:'approvalPersonId',
                title:'申刻人信息',				//窗口title
                layout:'form',
                autoHeight:true,
                columnFields:[
                    moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.applyPerson+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : (modDelRecord.applyPerson ),
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.applyPersonPhone+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : modDelRecord.applyPersonPhone,
                                style:"padding:5px 0px"
                            })
                        ]
                    })]	//表单第一列
            });

            //申刻人信息
            var delegationInfo = moduleVOp.fieldSet({
                id:'delegationInfoId',
                title:'批单委托单位信息',				//窗口title
                layout:'form',
                autoHeight:true,
                columnFields:[
                    moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.operateUnit+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : (modDelRecord.operateUnit ),
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.createDate+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : modDelRecord.createDate,
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.creator+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : modDelRecord.creator,
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.creatorPhone+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : modDelRecord.creatorPhone,
                                style:"padding:5px 0px"
                            })
                        ]
                    }),moduleVOp.panel({
                        height:30,
                        items:[
                            moduleVOp.label({
                                text : (config.applyMemo+' : '),
                                style:"padding:5px 0px"
                            }),moduleVOp.label({
                                text : (modDelRecord.applyMemo=='')?'无':modDelRecord.applyMemo,
                                style:"padding:5px 0px"
                            })
                        ]
                    })]	//表单第一列
            });

            //印章列表
            var gridPanel = moduleVOp.gridPanel({
                id:'sealGridPanelId',
                autoHeight:true,
                autoWidth:true,
                colums	: [{
                    dataIndex : 'sealApplyDetailId',
                    hidden: true
                },{
                    header : config.sealType,
                    dataIndex : 'sealType',
                    width : 100,
                    sortable: true
                },{
                    header : config.sealName,
                    dataIndex : 'sealName',
                    width : 100,
                    sortable: true
                },{
                    header : config.sealSpecification,
                    dataIndex : 'sealSpecification',
                    width : 100,
                    sortable: true
                },{
                    header : config.bingkanType,
                    dataIndex : 'bingkanType',
                    width : 100,
                    sortable: true
                },{
                    header : config.bingkanInfo,
                    dataIndex : 'bingkanInfo',
                    width : 100,
                    sortable: true
                },{
                    header : config.zhongkanType,
                    dataIndex : 'zhongkanType',
                    width : 100,
                    sortable: true
                },{
                    header : config.sealMaterial,
                    dataIndex : 'sealMaterial',
                    width : 100,
                    sortable: true
                },{
                    header : config.oilType,
                    dataIndex : 'oilType',
                    width : 100,
                    sortable: true
                },{
                    dataIndex : 'word1',
                    width : 100,
                    hidden: true
                },{
                    dataIndex : 'word2',
                    width : 100,
                    hidden: true
                },{
                    dataIndex : 'word3',
                    width : 100,
                    hidden: true
                },{
                    dataIndex : 'word4',
                    width : 100,
                    hidden: true
                },{
                    dataIndex : 'word5',
                    width : 100,
                    hidden: true
                },{
                    dataIndex : 'word6',
                    width : 100,
                    hidden: true
                }],
                gridStore:new Ext.data.JsonStore({
                    url:'sealAction!findApprovalSealApplyDetail.action',
                    fields : ['sealApplyDetailId','sealType','sealName','sealSpecification','bingkanType','bingkanInfo',
                        'zhongkanType','sealMaterial','oilType','word1','word2','word3','word4','word5','word6'],
                    baseParams :{
                        sealApplyId:modDelRecord.sealApplyId
                    },
                    root:'sealApplyDetialEntities',
                    autoLoad : true
                }),
                bbar:{}
            });
            //印章列表
            var fieldSetGrid = {
                xtype	  : 'fieldset',
                id:'sealModifyGridId',
                title	  : '印章列表',
                layout 	  : 'form',
                autoHeight:true,
                autoWidth:true,
                // bodyStyle : 'margin:10px;',
                items 	  : [gridPanel]
            };


            var formPanel = {
                xtype: 'form',
                id: 'sealModifyFormId',
                border: false,
                autoHeight: true,
                autoWidth: true,
                trackResetOnLoad: true,
                labelWidth: 80,
                hidden:view=='view'?true:false,
                items: [{
                    xtype:'htmleditor',
                    id:'historyApprovalCommentId',
                    name:'historyApprovalCommentId',
                    value:modDelRecord.refuse||'',
                    fieldLabel : '历史审批意见',
                    width: 650,
                    height: 130
                },{
                    xtype:'htmleditor',
                    id:'approvalCommentId',
                    name:'approvalCommentId',
                    value:data.currentUserInfo||'',
                    fieldLabel : '审批意见',
                    width: 650,
                    height: 130
                },moduleVOp.radio({
                    id : "isAgree",
                    name : "isAgree",
                    fieldLabel : '快速输入',
                    width:250,
                    items:[
                        {boxLabel: '审批通过', name: 'approvalRadio', inputValue: 1,
                            listeners:{
                                'check':function(checkbox,checked){
                                    if(checked){
                                        // var approvalComment = getExtCmpValueById('approvalCommentId');
                                        getExtCmpById('approvalCommentId').setValue((data.currentUserInfo||'')+'<br>审批通过');
                                    }
                                }
                            }},
                        {boxLabel: '审批不通过', name: 'approvalRadio', inputValue: 0,
                            listeners:{
                                'check':function(checkbox,checked){
                                    if(checked){
                                        // var approvalComment = getExtCmpValueById('approvalCommentId');
                                        getExtCmpById('approvalCommentId').setValue((data.currentUserInfo||'')+'<br>审批不通过');
                                    }
                                }
                            }}
                    ]
                }),{
                    id:'sealPanelBtnId',
                    xtype	  : 'panel',
                    layout 	  : 'column',
                    border    : false,
                    style:'margin-top:20px;',
                    bodyStyle:'margin-left:150px;',
                    autoHeight:true,
                    items:[{
                        border : false,
                        columnWidth : 0.2,
                        items : [{
                            xtype : 'button',
                            iconCls : 'table_edit',
                            text : '查看审核材料',
                            handler : function(){
                                getExtCmpById('sealModifyId').close();
                            }
                        }
                        ]
                    },{
                        border : false,
                        layout : "form",
                        columnWidth : 0.2,
                        items : [{
                            xtype : 'button',
                            id : "sealAddBtnId",
                            iconCls : 'table_save',
                            text : '审批通过',
                            handler : function(){
                                askMesg({
                                    msg: '您确认审批通过吗?',
                                    fn: function (confirm) {
                                        if (confirm == 'ok') {
                                            var configFind = {
                                                url:'sealAction!modifySealApplyApproval.action',
                                                params:{
                                                    sealApplyId:modDelRecord.sealApplyId,
                                                    status:'1',
                                                    refuse:getExtCmpValueById('approvalCommentId')
                                                },
                                                callBack:function(returnData){
                                                    var configCb = {
                                                        msg : '审批通过 成功!',
                                                        fn : function(confirm) {
                                                            if ('ok' == confirm) {
                                                                getExtCmpById('sealModifyId').close();
                                                                refreshGridList('sealApplyApprovalGridId');
                                                            }
                                                        }
                                                    }
                                                    showSucMesg(configCb);
                                                }
                                            }
                                            ajaxRequest(configFind);
                                        }
                                    }
                                });

                            }
                        }]
                    }, {
                        border : false,
                        layout : "form",
                        columnWidth : 0.2,
                        items : [{
                            xtype : 'button',
                            iconCls : 'table_close',
                            text : '审批不通过',
                            handler : function(){
                                askMesg({
                                    msg: '您确认审批通过吗?',
                                    fn: function (confirm) {
                                        if (confirm == 'ok') {
                                            var configFind = {
                                                url: 'sealAction!modifySealApplyApproval.action',
                                                params: {
                                                    sealApplyId: modDelRecord.sealApplyId,
                                                    status: '0',
                                                    refuse: getExtCmpValueById('approvalCommentId')
                                                },
                                                callBack: function (returnData) {
                                                    var configCb = {
                                                        msg: '审批不通过 成功!',
                                                        fn: function (confirm) {
                                                            if ('ok' == confirm) {
                                                                getExtCmpById('sealModifyId').close();
                                                                refreshGridList('sealApplyApprovalGridId');
                                                            }
                                                        }
                                                    }
                                                    showSucMesg(configCb);
                                                }
                                            }
                                            ajaxRequest(configFind);
                                        }
                                    }
                                });
                            }
                        }
                        ]
                    },{
                        border : false,
                        layout : "form",
                        columnWidth : 0.2,
                        items : [{
                            xtype : 'button',
                            iconCls : 'table_close',
                            text : '关闭',
                            handler : function(){
                                getExtCmpById('sealModifyId').close();
                            }
                        }
                        ]
                    }]
                }]
            }

            moduleVOp.window({
                id:'sealModifyId',
                title:'印章信息',
                autoScroll:true,
                items:[approvalInfo,approvalUnitInfo,
                    approvalPersonInfo,delegationInfo,
                    fieldSetGrid,formPanel]
            });
        }
    }

    /**
     * 查看审批单位
     * **/
    var viewApprovalUnit = function(){
        var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
        if(modDelRecord != ''){
            if(modDelRecord.status == 1 ||  modDelRecord.status == 2){
                var configFind = {
                    url:'organAction!findOrganByOrganId.action',
                    params:{modViewRecId:modDelRecord.approvalOrgId},
                    callBack:function(returnData){
                        var configForm = {
                            title:'审批单位信息',
                            moduleData:returnData.model,
                            allButtonHidden:true
                        }
                        unitForm(configForm);
                    }
                }
                ajaxRequest(configFind);
            }else{
                warningMesg({msg:'对不起,未经过审批'})
            }
        }
    }


    var printDoc = function(){
        var configFind = {
            url:'sealApplyQueryAction!exportExl.action',
            callBack:function(returnData){

            }
        }
        ajaxRequest(configFind);
    }

    var hightQuery = function(){
        var configFind = {
            url:'sealApplyQueryAction!exportExl.action',
            callBack:function(returnData){

            }
        }
        ajaxRequest(configFind);
    }

    return {
        viewApprovalUnit:viewApprovalUnit,
        viewApplyUnit:viewApplyUnit,
        viewSealApproval:viewSealApproval,
        printDoc:printDoc,
        hightQuery:hightQuery
    }
}

Ext.extend(com.bhtec.view.business.seal.sealapplyquery.SealApplyQueryVOp, com.bhtec.view.util.CommonWidgets, {});