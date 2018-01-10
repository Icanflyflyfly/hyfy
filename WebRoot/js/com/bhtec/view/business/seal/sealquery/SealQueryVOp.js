/**
 * 编码操作
 * @author liubf
 * @version 1.0
 * @class com.bhtec.view.business.seal.sealquery.SealQueryVOp
 * @date 2010-12-01
 */
Ext.namespace('com.bhtec.view.business.seal.sealquery');
com.bhtec.view.business.seal.sealquery.SealQueryVOp = function(config){
    var moduleVOp = this;   //父类调用
    var moduleGridId = 'sealQueryGridId';//form表单id

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
                        if(moduleData.certificateType){
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
     * 点击列表查看，弹出查看页面
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


    //印章信息修改
    var sealForm = function(configForm){

        var moduleData = configForm.moduleData||'';


        var approvalNum = moduleVOp.textField({
            id : "approvalNum",
            name : "approvalNum",
            allowBlank:false,
            fieldLabel : config.approvalNum,
            value:moduleData.sealApplyEntity.approvalNum||'',
            maxLength:20
        });

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

        var sealName = moduleVOp.textField({
            id : "sealName",
            name : "sealName",
            allowBlank:false,
            fieldLabel : config.sealName,
            value:moduleData.sealName||'',
            maxLength:20
        });
        var sealType = moduleVOp.comboBox({
            id : "sealType",
            name : "sealType",
            fieldLabel : config.sealType,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'sealType'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.sealType){
                            getExtCmpById('sealType').setValue(moduleData.sealType);
                        }else{
                            getExtCmpById('sealType').setValue('fading');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });

        var sealSpecification = moduleVOp.comboBox({
            id : "sealSpecification",
            name : "sealSpecification",
            fieldLabel : config.sealSpecification,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'sealSpecication'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.sealSpecification){
                            getExtCmpById('sealSpecification').setValue(moduleData.sealSpecification);
                        }else{
                            getExtCmpById('sealSpecification').setValue('35yuan');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });
        var bingkanInfo = moduleVOp.textField({
            id : "bingkanInfo",
            name : "bingkanInfo",
            allowBlank:false,
            fieldLabel : config.bingkanInfo,
            value:moduleData.bingkanInfo||'',
            maxLength:20
        });
        var bingkanType = moduleVOp.comboBox({
            id : "bingkanType",
            name : "bingkanType",
            fieldLabel : config.bingkanType,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'bingkanType'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.bingkanType){
                            getExtCmpById('bingkanType').setValue(moduleData.bingkanType);
                        }else{
                            getExtCmpById('bingkanType').setValue('wukan');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });
        var zhongkanType=moduleVOp.comboBox({
            id : "zhongkanType",
            name : "zhongkanType",
            fieldLabel : config.zhongkanType,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'zhongkanType'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.zhongkanType){
                            getExtCmpById('zhongkanType').setValue(moduleData.zhongkanType);
                        }else{
                            getExtCmpById('zhongkanType').setValue('wuxing');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });
        var word1 = moduleVOp.textField({
            id : "word1",
            name : "word1",
            allowBlank:true,
            fieldLabel : config.word1,
            value:moduleData.word1||'',
            maxLength:20
        });
        var word2=moduleVOp.textField({
            id : "word2",
            name : "word2",
            allowBlank:true,
            fieldLabel : config.word2,
            value:moduleData.word2||'',
            maxLength:20
        });
        var word3 = moduleVOp.textField({
            id : "word3",
            name : "word3",
            allowBlank:true,
            fieldLabel : config.word3,
            value:moduleData.word3||'',
            maxLength:20
        });
        var word4 = moduleVOp.textField({
            id : "word4",
            name : "word4",
            allowBlank:true,
            fieldLabel : config.word4,
            value:moduleData.word4||'',
            maxLength:20
        });
        var word5 = moduleVOp.textField({
            id : "word5",
            name : "word5",
            allowBlank:true,
            fieldLabel : config.word5,
            value:moduleData.word5||'',
            maxLength:20
        });

        var word6 = moduleVOp.textField({
            id : "word6",
            name : "word6",
            allowBlank:true,
            fieldLabel : config.word6,
            value:moduleData.word6||'',
            maxLength:20
        });

        var sealMaterial = moduleVOp.comboBox({
            id : "sealMaterial",
            name : "sealMaterial",
            fieldLabel : config.sealMaterial,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'sealMaterial'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.sealMaterial){
                            getExtCmpById('sealMaterial').setValue(moduleData.sealMaterial);
                        }else{
                            getExtCmpById('sealMaterial').setValue('youjiboli');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });




        var oilType = moduleVOp.comboBox({
            id : "oilType",
            name : "oilType",
            fieldLabel : config.oilType,
            store:new Ext.data.JsonStore({
                url:'typeDictionaryAction!findSmallTypeDicByBigTypeCode.action',
                baseParams :{
                    bigTypeCode:'oilType'
                },
                root:'sysplDicSmallTypeListt',
                autoLoad : true,
                fields 	: ['smallTypeCode','smallTypeName'],
                listeners :{
                    load:function(){
                        if(moduleData.oilType){
                            getExtCmpById('oilType').setValue(moduleData.oilType);
                        }else{
                            getExtCmpById('oilType').setValue('generalOil');
                        }
                    }
                }
            }),
            valueField 	: 'smallTypeCode',
            displayField: 'smallTypeName',
            allowBlank:false
        });

        moduleVOp.cuvWindow({
            title:configForm.title,				//窗口title
            columnFields:[approvalNum,status,sealName,sealType,sealSpecification,zhongkanType,bingkanType,bingkanInfo,word1,word2,word3,word4,word5,word6,sealMaterial,oilType],		//表单第一列
            modify:configForm.modify,			//窗口判断是否显示保存增加按钮
            allButtonHidden:configForm.allButtonHidden,
            autoScroll:true,
            labelWidth:100
        });
    }

    /**
     * 高级查询
     */
    var hightQuery = function(){
        var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
        if(modDelRecord != ''){
            var configFind = {
                url:'sealQueryAction!advancedPage.action',
                params:{modViewRecId:modDelRecord.codeId},
                callBack:function(returnData){

                }
            }
            ajaxRequest(configFind);
        }
    }
    /**
     * 导出Excel
     */
    var exportExl = function(){
        window.location.href = 'sealQueryAction!exportExl.action';
    }

    var viewSealInfo = function(){
        var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
        if(modDelRecord != ''){
            var configFind = {
                url:'sealQueryAction!findSealDetailById.action',
                params:{sealApplyDetailId:modDelRecord.sealApplyDetailId},
                callBack:function(returnData){
                    var configForm = {
                        title:'印章信息查看',
                        moduleData:returnData.sealApplyDetailEntity,
                        allButtonHidden:true
                    }
                    sealForm(configForm);
                }
            }
            ajaxRequest(configFind);
        }
    }

    return {
        viewApplyUnit:viewApplyUnit,
        hightQuery:hightQuery,
        exportExl:exportExl,
        viewSealInfo:viewSealInfo
    }
}

Ext.extend(com.bhtec.view.business.seal.sealquery.SealQueryVOp, com.bhtec.view.util.CommonWidgets, {});