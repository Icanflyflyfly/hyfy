/**
 * 编码操作
 * @author liubf
 * @version 1.0
 * @class com.bhtec.view.business.seal.sealunitquery.SealUnitQueryVOp
 * @date 2017-09-19
 */
Ext.namespace('com.bhtec.view.business.seal.sealunitquery');
com.bhtec.view.business.seal.sealunitquery.SealUnitQueryVOp = function(config){
    var moduleVOp = this;   //父类调用
    var moduleGridId = 'unitQueryListGridId';//form表单id

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

        //所属区域
       /* var area = moduleVOp.triggerField({
            id : 'sealBelongDistName',
            name : 'sealBelongDistName',
            fieldLabel : config.area,
            value:moduleData.areaName||'',
            allowBlank:false,
            window:function(){
                var url = 'districtAction!findNextLevelChildNodes.action';
                moduleVOp.treeWindow({
                    title:'地区树',
                    items:moduleVOp.asyncTreePanel({
                        rootText:'地区树',
                        rootVisible:true,
                        url:url,
                        clickNode:function(node, e){
                            getExtCmpById('sealBelongDist').setValue(node.id);
                            getExtCmpById('sealBelongDistName').setValue(node.text);
                        }
                    })
                });

            }
        });*/


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

        //邮编
        // var code = moduleVOp.textField({
        //     id : "code",
        //     name : "code",
        //     allowBlank:false,
        //     fieldLabel : config.code,
        //     value:moduleData.code||'',
        //     maxLength:20
        // });

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
    var viewForm = function(){
        var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
        if(modDelRecord != ''){
            var configFind = {
                url:'sealUnitQueryAction!findEntityById.action',
                params:{sealUnitId:modDelRecord.sealUnitId},
                callBack:function(returnData){
                    var configForm = {
                        title:'印章申刻单位详情',
                        moduleData:returnData.sealUnitEntity,
                        allButtonHidden:true
                    }
                    funForm(configForm);
                }
            }
            ajaxRequest(configFind);
        }
    }

    return {
        viewForm:viewForm,

    }
}

Ext.extend(com.bhtec.view.business.seal.sealunitquery.SealUnitQueryVOp, com.bhtec.view.util.CommonWidgets, {});