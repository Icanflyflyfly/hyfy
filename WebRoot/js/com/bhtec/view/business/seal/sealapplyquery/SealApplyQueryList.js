/**
 * 印章信息查询列表页面
 * @author liubf
 * @version 2.0
 * @class com.bhtec.view.business.seal.sealapplyquery.SealApplyQueryList
 * @date 2017-07-015
 */
Ext.namespace('com.bhtec.view.business.seal.sealapplyquery');
com.bhtec.view.business.seal.sealapplyquery.SealApplyQueryList = function(config){
    var approvalNo_q = 'approvalNo_q_';//印章编号
    // var status_q = 'status_q_';//状态
    var gridId = 'sealApplyQueryListGridId';

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
                    id:approvalNo_q,
                    width:100,
                    fieldLabel : config.approvalNum,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                query();
                            }
                        }
                    }
                })]
        });
        return queryArr;
    }
    /**
     * 查询操作
     */
    var query = function(){
        var configQuery = {
            url : 'sealApplyQueryAction!findListByCon.action',
            params : {
                approvalNum : getExtCmpValueById(approvalNo_q)
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
        resetCmpValueById(approvalNo_q);
    }

    /**
     * 查询列表列属性
     */
    var cols = function(){
        var colsArr = new Array();
        colsArr.push({
            dataIndex : 'sealUnitId',
            hidden:true,
            sortable: true
        });
        colsArr.push({
            dataIndex : 'approvalOrgId',
            hidden:false,
            sortable: true
        });
        colsArr.push({
            dataIndex : 'sealApplyId',
            hidden:true,
            sortable: true
        });

        colsArr.push({
            header : config.approvalNum,
            dataIndex : 'approvalNum',
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
            header : config.sealNum,
            dataIndex : 'sealNum',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });
        colsArr.push({
            header : config.approvalUnit,
            dataIndex : 'approvalUnit',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });


        colsArr.push({
            header : config.approvalPerson,
            dataIndex : 'approvalPerson',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });

        colsArr.push({
            header : config.approvalTime,
            dataIndex : 'approvalTime',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });

        colsArr.push({
            header : config.operateUnit,
            dataIndex : 'operateUnit',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });

        colsArr.push({
            header : config.operateTime,
            dataIndex : 'operateTime',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value){
                value = value==null?'':value;
                return '<span ext:qtip="'+value+'">'+value+'</span>';
            }
        });
        colsArr.push({
            header : config.status,
            dataIndex : 'status',
            width : basicConstant.GRID_COL_WIDTH,
            sortable: true,
            renderer:function(value,metaData){
                if(value == '0'){
                    metaData.style = 'background: blue;color:#FFF;';
                    value = '未审核';
                }else if(value == '1'){
                    metaData.style = 'background: red;color:#FFF;';
                    value = '审核未通过';
                }else if(value == '2'){
                    metaData.style = 'background: green;color:#FFF;';
                    value = '审核通过';
                }else if(value == '4'){
                    metaData.style = 'background: black;color:#FFF;';
                    value = '撤销';
                }else if(value == '5'){
                    metaData.style = 'background: yellow;color:#FFF;';
                    value = '上报';
                }else if(value == '6'){
                    metaData.style = 'background: gray;color:#FFF;';
                    value = '完成';
                }
                return value;
            }
        });
        return colsArr;
    }

    /**
     * 主面框架grid store
     */

    var store = new Ext.data.JsonStore({
        fields : ['sealUnitId','approvalOrgId','sealApplyId','approvalNum','unitName','sealNum',
            'approvalUnit','approvalPerson','approvalTime','operateUnit','operateTime','status'],
        autoLoad : true,
        totalProperty : 'count',
        root : 'sealApplyVoList',
        url : 'sealApplyQueryAction!findListByCon.action'
    });

    /**
     * 为翻页加自定义参数
     */
    store.on('beforeload', function(thiz,options) {
        var new_params = {
            approvalNum : getExtCmpValueById(approvalNo_q)
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
            if('print' == optFunLink){
                moduleForm.printDoc();
            }else if('view' == optFunLink){
                //moduleForm.viewForm();
                moduleForm.viewSealApproval('view');
            }else if('hightQuery' == optFunLink){
                moduleForm.hightQuery();
            }else if('viewApplyUnit' == optFunLink){
                moduleForm.viewApplyUnit();
            }else if('viewApprovalUnit' == optFunLink){
                moduleForm.viewApprovalUnit();
            }
        }
    }

    /**
     * 工具栏按钮
     */
    var toolbar = function(){
        var frametoolbar = new Array();
        var modOptList = fourthModOpt[config.moduleId];

        for(var i=0;i<modOptList.length;i++){
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
        currentPosition:basicConstant.SEAL+'数据综合查询->印章审批单信息'
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
     * 按钮区
     */
    var toolbarPara = {
        toolbar:toolbar()
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
