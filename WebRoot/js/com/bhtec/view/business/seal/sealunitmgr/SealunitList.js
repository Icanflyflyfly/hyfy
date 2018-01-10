/**
 * 印章列表页面
 * @author lianglp
 * @version 2.0
 * @class com.bhtec.view.business.seal.sealunit
 * @date 2017-07-015
 */
Ext.namespace('com.bhtec.view.business.seal.sealunitmgr');
com.bhtec.view.business.seal.sealunitmgr.SealunitList = function(config){
	var approvalNo_q = 'approvalNo_q';
	var unit_q = 'unit_unit_q';
	var gridId = 'sealUnitGridId';
	
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
								id:unit_q,
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
				});
		return queryArr;
	}
	/**
	 * 查询操作
	 */
	var query = function(){	
		var configQuery = {
				url : 'sealUnitAction!findUnitByCon.action',
				params : {
					unitName :  getExtCmpValueById(unit_q)
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
		resetCmpValueById(unit_q);
	}


	/**
	 * 公告列模式
	 */
	var cols = function(){
		var colsArr = new Array();
		colsArr.push({
				dataIndex : 'sealUnitId',
				hidden:true,
				sortable: true 
			});
		colsArr.push({
			header : config.unitName,
			dataIndex : 'unitName',
			width : 120,
			sortable: true,
			renderer:function(value){
				value = value==null?'':value;
				return '<span ext:qtip="'+value+'">'+value+'</span>';
			}
		});
		colsArr.push({
			dataIndex : 'areaName',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'licenseNo',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'manager',
			hidden:true,
			sortable: true
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
				header : config.manager,
				dataIndex : 'manager',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true
			});
		colsArr.push({
				header : config.creator,
				dataIndex : 'creator',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
			header : config.phone,
			dataIndex : 'phone',
			width : 80,
			sortable: true
		});
		colsArr.push({
			header : config.address,
			dataIndex : 'address',
			width : 120,
			sortable: true
		});

		colsArr.push({
			header : config.status,
			dataIndex : 'status',
			width : basicConstant.GRID_COL_WIDTH,
			sortable: true,
			renderer:function(value,metaData){
				if(value == '0'){
					metaData.style = 'background:red ;color:#FFF;';
					value = '注销';
				}else if(value == '1'){
					metaData.style = 'background:green;color:#FFF;';
					value = '启用';
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
				fields : ['sealUnitId','areaName','licenseNo','manager',
			           	  'unitName','companyType',
			           	  'manager','creator','phone','address','status'],
				autoLoad : true,
				totalProperty : 'count',
				root : 'sealUnitEntityList',
				url : 'sealUnitAction!findUnitByCon.action'
	});
	
    /**
	 * 为翻页加自定义参数
	 */
    store.on('beforeload', function(thiz,options) {
    	var new_params = {
			unitName :  getExtCmpValueById(unit_q)
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
			if('newApproval' == optFunLink){
				moduleForm.saveForm();
			}else if(basicConstant.MODIFY_OPT_LINK == optFunLink){
				moduleForm.modifyForm();
			}else if(basicConstant.VIEW_OPT_LINK == optFunLink){
				moduleForm.viewForm();
			}else if('cancle' == optFunLink){
				moduleForm.modifyUnitStatus(0);
			}else if('enable' == optFunLink){
				moduleForm.modifyUnitStatus(1);
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
			currentPosition:basicConstant.SEAL+'印章审批管理->印章审核单位管理'
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
