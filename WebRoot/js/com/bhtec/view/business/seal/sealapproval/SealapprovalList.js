/**
 * 印章列表页面
 * @author lianglp
 * @version 2.0
 * @class com.bhtec.view.business.seal.sealapply
 * @date 2017-07-015
 */
Ext.namespace('com.bhtec.view.business.seal.sealapproval');
com.bhtec.view.business.seal.sealapproval.SealapprovalList = function(config){
	var approvalNo_q = 'approvalNo_q2';
	var unit_q = 'unit_q2';
	var gridId = 'sealApplyApprovalGridId';
	
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
				},{
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
				url : 'sealAction!findSealapplyByCon.action',
				params : {
					approvalNum : getExtCmpValueById(approvalNo_q),
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

	//grid row expander
	var expander = new Ext.ux.grid.RowExpander({
		tpl : new Ext.Template(
			'<div class="detailData"></div>'
		)
	});

	expander.on("expand",function(expander,record,body,rowIndex){
		var grid = new Ext.grid.GridPanel({
			store: new Ext.data.JsonStore({
				fields: ['sealType','sealName','sealSpecification','bingkanType','bingkanInfo','zhongkanType','status'],
				data: record.data.sealApplyDetialEntities//字典小类
			}),
			enableHdMenu : false,
			cm: new Ext.grid.ColumnModel({
				columns: [
					new Ext.grid.RowNumberer(),
					{
						header: '<span style=color:blue;>'+config.sealType+' </span>',
						dataIndex: 'sealType',
						width : 150,
						sortable: false,
						renderer:function(value){
							return '<span style=color:blue;>'+value+' </span>';
						}
					},{
						header: '<span style=color:blue;>'+config.sealName+' </span>',
						dataIndex: 'sealName',
						width : 150,
						sortable: false,
						renderer:function(value){
							return '<span style=color:blue;>'+value+' </span>';
						}
					},{
						header: '<span style=color:blue;>'+config.sealSpecification+' </span>',
						dataIndex: 'sealSpecification',
						width : 150,
						sortable: false,
						renderer:function(value){
							return '<span style=color:blue;>'+value+' </span>';
						}
					},{
						header: '<span style=color:blue;>'+config.bingkanType+' </span>',
						dataIndex: 'bingkanType',
						width : 150,
						sortable: false,
						renderer:function(value){
							return '<span style=color:blue;>'+value+' </span>';
						}
					},{
						header: '<span style=color:blue;>'+config.bingkanInfo+' </span>',
						dataIndex: 'bingkanInfo',
						width : 150,
						sortable: false,
						renderer:function(value){
							return '<span style=color:blue;>'+value+' </span>';
						}
					},{
						header: '<span style=color:blue;>'+config.zhongkanType+' </span>',
						dataIndex: 'zhongkanType',
						width : 150,
						sortable: false,
						renderer:function(value){
							return '<span style=color:blue;>'+value+' </span>';
						}
					},{
						header: '<span style=color:blue;>'+config.status+' </span>',
						dataIndex: 'status',
						width : 150,
						sortable: false,
						renderer:function(value,metaData){
							if(value == '0'){
								metaData.style = 'background: blue;color:#FFF;';
								value = '未审核印章';
							}else{
								metaData.style = 'background: black;color:#FFF;';
								value = '已审核历史印章';
							}
							return value;
						}
					}
				]
			}),
			viewConfig: {
				forceFit:true
			},
			columnLines: true,
			autoHeight:true,
			border:true,
			iconCls:'icon-grid'
		});
		//停止级联选择
		grid.on({
			'mouseover' : function(e) {
				e.stopPropagation();
			},
			'mouseout' : function(e) {
				e.stopPropagation();
			}
		});

		grid.afterMethod("processEvent", function(n, e) {
			e.stopPropagation();
		});
		new Ext.Panel({
			layout:'fit',
			items:grid,
			bodyStyle:'padding-left:50px',
			border:true,
			autoWidth:true,
			baseCls : 'x-plain',
			renderTo: Ext.DomQuery.select("div.detailData",body)[0]
		})
	})
	
	/**
	 * 列模式
	 */
	var cols = function(){
		var colsArr = new Array();
		colsArr.push(expander);
		colsArr.push({
				dataIndex : 'sealApplyId',
				hidden:true,
				sortable: true 
			});
		colsArr.push({
			dataIndex : 'applyPerson',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'applyPersonPhone',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			header : 'creatorPhone',
			dataIndex : 'creatorPhone',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			header : 'applyMemo',
			dataIndex : 'applyMemo',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			header : 'refuse',
			dataIndex : 'refuse',
			hidden:true,
			sortable: true
		});
		colsArr.push({
				header : config.createDate,
				dataIndex : 'createDate',
				width : 80,
				sortable: true,
				renderer:function(value){
					value = value==null?'':value;
					return '<span ext:qtip="'+value+'">'+value+'</span>';
				}
			});
		colsArr.push({
				header : config.approvalNum,
				dataIndex : 'approvalNum',
				width : 50,
				sortable: true,
				renderer:function(value){
					value = value==null?'':value;
					return '<span ext:qtip="'+value+'">'+value+'</span>';
				}
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
				header : config.sealNum,
				dataIndex : 'sealNum',
				width : 50,
				sortable: true,
				renderer:function(value){
					value = value==null?'':value;
					return '<span ext:qtip="'+value+'">'+value+'</span>';
				}
			});

		colsArr.push({
				header : config.manager,
				dataIndex : 'manager',
				width : 50,
				sortable: true
			});
		colsArr.push({
				header : config.creator,
				dataIndex : 'creator',
				width : 50,
				sortable: true 
			});
		colsArr.push({
			header : config.creatorUnit,
			dataIndex : 'creatorUnit',
			width : 120,
			sortable: true
		});
		colsArr.push({
			header : config.phone,
			dataIndex : 'phone',
			width : 80,
			sortable: true
		});
		colsArr.push({
			header : config.status,
			dataIndex : 'status',
			width : 120,
			sortable: true,
			renderer:function(value,metaData){
				if(value == '0'){
					metaData.style = 'width:100;background: blue;color:#FFF;';
					value = '未审核';
				}else if(value == '3'){
					metaData.style = 'width:100;background: red;color:#FFF;';
					value = '重新申报';
				}
				return value;
			}
		});
		colsArr.push({
			dataIndex : 's0',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 's1',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 's2',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 's3',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 's4',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'p0',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'p1',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'p2',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'p3',
			hidden:true,
			sortable: true
		});
		colsArr.push({
			dataIndex : 'p4',
			hidden:true,
			sortable: true
		});

		return colsArr;
	}
	
	 /**
	  * 主面框架grid store
	  */
	 var store = new Ext.data.JsonStore({
				fields : ['sealApplyId','applyPerson','applyPersonPhone','applyMemo','refuse',
						  'createDate','approvalNum','unitName','sealNum',
			           	  'manager','creator','creatorUnit','creatorPhone','phone','status',
						  'sealApplyDetialEntities','s0','s1','s2','s3','s4','p0','p1','p2','p3','p4'],
				autoLoad : true,
				totalProperty : 'count',
				root : 'sealApplyVoList',
				url : 'sealAction!findSealapprovalByCon.action'
	});
	
    /**
	 * 为翻页加自定义参数
	 */
    store.on('beforeload', function(thiz,options) {
    	var new_params = {
			approvalNum : getExtCmpValueById(approvalNo_q),
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
			if('approval' == optFunLink){
				moduleForm.sealInfoApproval();
			}else if('view' == optFunLink){
				moduleForm.sealInfoApproval('view');
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
			currentPosition:basicConstant.SEAL+'印章审批管理->印章委托申报审批'
	}
	/**
	 * 列表区
	 */
	var gridListPara = {
			cols:cols(),
			store:store,
			gridId:gridId,
			plugins:expander
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
