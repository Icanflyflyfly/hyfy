/**
 * 印章申刻单位查询列表页面
 * @author liubf
 * @version 2.0
 * @class com.bhtec.view.business.seal.sealunitquery.SealUnitQueryList
 * @date 2017-07-015
 */
Ext.namespace('com.bhtec.view.business.seal.sealunitquery');
com.bhtec.view.business.seal.sealunitquery.SealUnitQueryList = function(config){
    var sealUnitId_q = 'sealUnitId_q';//单位编号
    var unitName_q = 'unitName_q';//单位名称
    var companyType_q = 'companyType_q';//单位类型
    var gridId = 'unitQueryListGridId';

    /**
     * 查询条件
     */
    var queryCondition = function(){
        var queryArr = new Array();
        queryArr.push({
            border : false,
            layout : "form",
            columnWidth : 0.25,
            items : [
                com.bhtec.view.util.CommonWidgets.prototype.textField({
                    id:sealUnitId_q,
                    width:100,
                    fieldLabel : config.sealUnitId,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                query();
                            }
                        }
                    }
                })]
        },{
            border : false,
            layout : "form",
            columnWidth : 0.25,
            items : [
                com.bhtec.view.util.CommonWidgets.prototype.textField({
                    id:unitName_q,
                    width:100,
                    fieldLabel : config.unitName,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                query();
                            }
                        }
                    }
                })]
        },{
            border : false,
            layout : "form",
            columnWidth : 0.25,
            items : [
                com.bhtec.view.util.CommonWidgets.prototype.comboBox({
                        id : companyType_q,
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
                                specialkey: function(field, e){
                                    if (e.getKey() == e.ENTER) {
                                        query();
                                    }
                                }
                            }
                        }),
                        valueField 	: 'smallTypeCode',
                        displayField: 'smallTypeName',
                        allowBlank:true
                })]
        });
        return queryArr;
    }
    /**
     * 查询操作
     */
    var query = function(){
        var configQuery = {
            url : 'sealUnitQueryAction!findListByCon.action',
            params : {
                sealUnitId : getExtCmpValueById(sealUnitId_q),
                unitName :  getExtCmpValueById(unitName_q),
                companyType :  getExtCmpValueById(companyType_q)
            },
            callBack : function(returnData) {
                queryFillGridList(gridId,returnData);
            }
        }
        ajaxRequest(configQuery);
    }
    /**
     * 重置查询
     */
    var reset = function(){
        resetCmpValueById(sealUnitId_q);
        resetCmpValueById(unitName_q);
        resetCmpValueById(companyType_q);
    }

    /**
     * 查询列表列属性
     */
    var cols = function(){
        var colsArr = new Array();

        // colsArr.push({
        //     dataIndex : 'sealUnitId',
        //     hidden:true,
        //     sortable: true
        // });
        colsArr.push({
            header : config.sealUnitId,
            dataIndex : 'sealUnitId',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });
        colsArr.push({
            header : config.unitName,
            dataIndex : 'unitName',
            width : 150,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });

        colsArr.push({
            header : config.companyType,
            dataIndex : 'companyType',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });

        colsArr.push({
            header : config.phone,
            dataIndex : 'phone',
            width : 150,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });

        return colsArr;
    }

    /**
     * 主面框架grid store
     */
    var store = new Ext.data.JsonStore({
        fields : ['sealUnitId','unitName','companyType','phone'],
        autoLoad : true,
        totalProperty : 'count',
        root : 'sealUnitList',
        url : 'sealUnitQueryAction!findListByCon.action'
    });

    /**
     * 为翻页加自定义参数
     */
    store.on('beforeload', function(thiz,options) {
        var new_params = {
            sealUnitId : getExtCmpValueById(sealUnitId_q),
            unitName :  getExtCmpValueById(unitName_q),
            companyType :  getExtCmpValueById(companyType_q)
        };
        Ext.apply(options.params,new_params);
    });
    /**
     * 按钮功能操作
     */
    var operateFunction = function(optFunLink){
        return function(){
            var opView = basicConstant.DYNAMIC_JS_INSTANCE_MAP.get(config.moduleId+'_'+basicConstant.OP_VIEW);
            if(opView == undefined || opView == null){
                var xmlDoc = basicConstant.DYNAMIC_LOAD_XMLDOC.get(config.moduleId);
                dynamicLoadModuleJs(xmlDoc,basicConstant.OP_VIEW,config.moduleId);
                opView = basicConstant.DYNAMIC_JS_INSTANCE_MAP.get(config.moduleId+'_'+basicConstant.OP_VIEW);
            }

            var moduleForm = eval(opView);
            if('view' == optFunLink){
                moduleForm.viewForm();
            }
        }
    }

    /**
     * 工具栏按钮
     */
    var toolbar = function(){
        var frametoolbar = new Array();
        var modOptList = fourthModOpt[config.moduleId];
        for(i=0;i<modOptList.length;i++){
            var modOpt = modOptList[i];
            var handlerFun = operateFunction(modOpt.optFunLink);
            frametoolbar.push({
                text:modOpt.modName,
                iconCls:modOpt.modImgCls,
                handler:handlerFun
            },'-');
        }
        return frametoolbar;
    };
    /**
     * 查询区
     */
    var queryPara = {
        query:query,
        reset:reset,
        queryCondition:queryCondition(),
        queryColWidth:0.125,
        currentPosition:basicConstant.SEAL+'数据综合查询->印章申刻单位查询'
    }
    /**
     * 按钮区
     */
    var toolbarPara = {
        toolbar:toolbar()
    }
    /**
     * 列表区
     */
    var gridListPara = {
        cols:cols(),
        store:store,
        gridId:gridId
    }

    /**
     * 整个列表
     */
    var configList = {
        queryPara:queryPara,
        toolbarPara:toolbarPara,
        gridListPara:gridListPara
    }
    return configList;
}
