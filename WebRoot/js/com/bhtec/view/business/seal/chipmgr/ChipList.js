/**
 * 印章列表页面
 * @author lianglp
 * @version 2.0
 * @class com.bhtec.view.business.seal.sealunit
 * @date 2017-07-015
 */
Ext.namespace('com.bhtec.view.business.seal.chipmgr');
com.bhtec.view.business.seal.chipmgr.ChipList = function(config){
	var sealBelongUnit_q = 'sealBelongUnit_q';
	var chipSn_q = 'chipSn_q';
	var gridId = 'chipGridId';
	
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
								id:chipSn_q,
								width:100,
								fieldLabel : config.chipSn,
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
						})]
				});

		queryArr.push({
			border : false,
			layout : "form",
			columnWidth : 0.25,
			items : [
				com.bhtec.view.util.CommonWidgets.prototype.textField({
					id:sealBelongUnit_q,
					width:100,
					fieldLabel : config.sealBelongUnit,
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
				url : 'sealChipAction!findUnitByCon.action',
				params : {
					chipSn :  getExtCmpValueById(chipSn_q),
					sealBelongUnit :  getExtCmpValueById(sealBelongUnit_q)
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
		resetCmpValueById(chipSn_q);
		resetCmpValueById(sealBelongUnit_q);
	}


	/**
	 * 公告列模式
	 */
	var cols = function(){
		var colsArr = new Array();
		colsArr.push({
				dataIndex : 'chipId',
				hidden:true,
				sortable: true 
			});
		colsArr.push({
			header : config.chipSn,
			dataIndex : 'chipSn',
			width : 120,
			sortable: true,
			renderer:function(value){
				value = value==null?'':value;
				return '<span ext:qtip="'+value+'">'+value+'</span>';
			}
		});
		colsArr.push({
			header : config.creator,
			dataIndex : 'creator',
			width : 80,
			sortable: true
		});
		colsArr.push({
			header : config.createTime,
			dataIndex : 'createTime',
			width : 120,
			sortable: true
		});
		colsArr.push({
			header : config.chipStatus,
			dataIndex : 'chipStatus',
			width : 80,
			sortable: true,
			renderer:function(value){
				value = value==null?'':value;
				if(value == 0){
					return '入库';
				}else if(value == 1){
					return '芯片写入';
				}else if(value == 2){
					return '芯片使用中';
				}else if(value == 3){
					return '芯片作废';
				}
			}
		});

		colsArr.push({
				header : config.sealNo,
				dataIndex : 'sealNo',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true,
				renderer:function(value){
					value = value==null?'':value;
					return '<span ext:qtip="'+value+'">'+value+'</span>';
				}
			});

		colsArr.push({
				header : config.sealTypeName,
				dataIndex : 'sealTypeName',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true
			});
		colsArr.push({
				header : config.sealName,
				dataIndex : 'sealName',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
			header : config.sealApprovalUnit,
			dataIndex : 'sealApprovalUnit',
			width : 80,
			sortable: true,
			renderer:function(value){
				value = value==null?'':value;
				return '<span ext:qtip="'+value+'">'+value+'</span>';
			}
		});
		colsArr.push({
			header : config.sealApprovalTime,
			dataIndex : 'sealApprovalTime',
			width : 120,
			sortable: true
		});

		colsArr.push({
			header : config.sealBelongUnit,
			dataIndex : 'sealBelongUnit',
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
			width : basicConstant.GRID_COL_WIDTH,
			sortable: true,
			renderer:function(value){
				value = value==null?'':value;
				return '<span ext:qtip="'+value+'">'+value+'</span>';
			}
		});
		colsArr.push({
			header : config.unitAddress,
			dataIndex : 'unitAddress',
			width : basicConstant.GRID_COL_WIDTH,
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
				fields : ['chipId','chipSn','creator','createTime','chipStatus',
			           	  'sealNo','sealTypeName','sealName','sealApprovalUnit',
					      'sealApprovalTime','sealBelongUnit','phone','unitAddress'],
				autoLoad : true,
				totalProperty : 'count',
				root : 'sealChipEntityList',
				url : 'sealChipAction!findChipsByCon.action'
	});
	
    /**
	 * 为翻页加自定义参数
	 */
    store.on('beforeload', function(thiz,options) {
    	var new_params = {
			chipSn :  getExtCmpValueById(chipSn_q),
			sealBelongUnit :  getExtCmpValueById(sealBelongUnit_q)
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
			if('addChip' == optFunLink){
				if(ChipObj){
					var chipSn = ChipObj.DoChipReadSN();
					ChipObj.DoChipBeep(200);
					setTimeout(function(){
						if(chipSn=='' || chipSn==null){
							warningMesg({
								msg:'读卡器初始化失败'
							})
						}else{
							moduleForm.saveForm(chipSn);
						}

					},1000);
				}else{
					warningMesg({
						msg:'读卡器初始化失败'
					})
				}
			}else if(basicConstant.MODIFY_OPT_LINK == optFunLink){
				moduleForm.modifyForm();
			}else if(basicConstant.VIEW_OPT_LINK == optFunLink){
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
			currentPosition:basicConstant.SEAL+'RFID芯片管理->RFID芯片管理'
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
