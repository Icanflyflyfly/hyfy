/**
 * 印章列表页面
 * @author lianglp
 * @version 2.0
 * @class com.bhtec.view.business.seal.sealpublish
 * @date 2017-07-015
 */
Ext.namespace('com.bhtec.view.business.seal.sealpublish');
com.bhtec.view.business.seal.sealpublish.SealpublishList = function(config){
	var approvalNo_q = 'approvalNo_q';
	var unit_q = 'unit_q';
	var gridId = 'sealpublishGridId';
	
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
				fields: ['sealType','sealName','sealSpecification','bingkanType','bingkanInfo','zhongkanType'],
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
	 * 公告列模式
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
				header : config.createDate,
				dataIndex : 'createDate',
				width : 100,
				sortable: true,
				renderer:function(value){
					value = value==null?'':value;
					return '<span ext:qtip="'+value+'">'+value+'</span>';
				}
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
			header : config.refuse,
			dataIndex : 'refuse',
			width : 150,
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
				fields : ['sealApplyId','createDate','approvalNum',
			           	  'unitName','sealNum',
			           	  'manager','creator','refuse','status','sealApplyDetialEntities'],
				autoLoad : true,
				totalProperty : 'count',
				root : 'sealApplyVoList',
				url : 'sealAction!findSealapplyByCon.action'
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
			if('write_chip' == optFunLink){
				var modDelRecord = modifyDelSelRecord(gridId);//请选择一条件记录
				if(modDelRecord != ''){
					var configFind = {
						url:'sealAction!findSealApplyVoById.action',
						params:{sealApplyId:modDelRecord.sealApplyId},
						callBack:function(returnData){
							var rd = returnData.model;
							if(ChipObj) {
								var setSvr = ChipObj.SetServerParam('http://192.168.31.90', '8080', '/hyfy');
								if (setSvr) {
									var xmlSeal = '<seal> ' +
													'<id>'+modDelRecord.sealApplyId+'</id>' +
													'<code>'+rd.approvalNum+'</code>' +
													'<name>'+rd.unitName+'</name>' +
													'<status>9</status>' +
													'<useOrgnizationCode>330200000001</useOrgnizationCode>' +
													'<useOrgDistrict>330200</useOrgDistrict>' +
													'<makeCompanyCode>C330200000001</makeCompanyCode>' +
													'<type>04</type>' +
												    '<specs>圆形38</specs>' +
													'<applyPerson>'+rd.creator+'</applyPerson>' +
													'<certType>115</certType>' +
													'<certCode>'+rd.certificateNo+'</certCode>' +
													'<acceptDate class="sql-timestamp">2010-03-16 22:02:14.804</acceptDate>' +
													'<adjoinType>10</adjoinType>' +
													'<middleCode>200</middleCode>' +
													'<gmtCreate class="sql-timestamp">2010-03-16 22:01:46.665</gmtCreate>' +
													'<gmtModified class="sql-timestamp">2010-03-16 22:02:14.804</gmtModified>' +
													'<sealApplyType>0</sealApplyType>' +
													'<urgentStatus>0</urgentStatus>' +
													'<strSealType>合同专用章</strSealType>' +
													'<strStatus>已委托</strStatus>' +
													'<strCertType>武装警察警官证</strCertType>' +
													'<strAdJoinType>无并刊</strAdJoinType>' +
													'<strMiddleCode>五角星</strMiddleCode>' +
													'<orgnization>' +
														'<id>43221</id>' +
														'<orgCode>330200000001</orgCode>' +
														'<name>'+rd.unitName+'</name>' +
														'<orgClass>11</orgClass>' +
														'<crpName>'+rd.manager+'</crpName>' +
														'<certType>'+rd.certificateType+'</certType>' +
														'<certNo>'+rd.certificateNo+'</certNo>' +
														'<telephone>'+rd.phone+'</telephone>' +
														'<gmtCreate class="sql-timestamp">2010-03-03 21:43:15.928</gmtCreate>' +
														'<gmtModified class="sql-timestamp">2010-04-03 15:15:28.657</gmtModified>' +
														'<strOrgClass>'+rd.companyType+'</strOrgClass>' +
														'<address>'+rd.address+'</address>' +
										            '</orgnization>' +
													'<company>' +
														'<id>101</id>' +
														'<category>0</category>' +
														'<companyCode>C330200000001</companyCode>' +
														'<name>'+rd.unitName+'</name>' +
														'<address>'+rd.address+'</address>' +
														'<contactPhone>'+rd.phone+'</contactPhone>' +
														'<economytype>170</economytype>' +
														'<corporationer>'+rd.manager+'</corporationer>' +
														'<constabler>'+rd.manager+'</constabler>' +
														'<securityInstitution>330200000000</securityInstitution>' +
														'<bizStatus>10</bizStatus>' +
														'<employeeCount>20</employeeCount>' +
														'<gmtCreate class="sql-timestamp">2010-03-03 21:17:37.752</gmtCreate>' +
														'<gmtModified class="sql-timestamp">2010-04-01 15:36:17.24</gmtModified>' +
														'<balance>880</balance>' +
													'</company>' +
													'<useOrgName>'+rd.unitName+'</useOrgName>' +
													'<companyName>'+rd.unitName+'</companyName>' +
													'<imgPath>/society/images/common/seal_preview_no.jpg</imgPath>' +
										         '</seal>';
									// alert(xmlSeal);
									var chipSn = ChipObj.RunChipWrite(xmlSeal);

									if(modDelRecord != ''){
										var configFind = {
											url:'sealChipAction!modifyChip.action',
											params:{
												chipSn:chipSn,
												chipStatus:'1',
												sealNo:rd.approvalNum,
												sealBelongUnit:rd.unitName,
												sealRepresentativeIdno:rd.certificateNo,
												sealRepresentative:rd.manager,
												sealType:'合同专用章',
												sealTypeName:'合同专用章',
												sealName:rd.unitName+'合同专用章',
												unitAddress:rd.address,
												phone:rd.phone
											},
											callBack:function(returnData){
												var configCb = {
													msg : '芯片写入成功!',
													fn : function(confirm) {
														refreshGridList(gridId);
													}
												}
												showSucMesg(configCb);
											}
										}
										ajaxRequest(configFind);
									}
								}
							}else{
								warningMesg({
									msg:'读卡器初始化失败'
								})
							}
						}
					}
					ajaxRequest(configFind);
				}


			}else if('reapply' == optFunLink){
				moduleForm.modifyForm();
			}else if('recall' == optFunLink){
				moduleForm.recall();
			}else if('recover' == optFunLink){
				moduleForm.recover();
			}else if('reapplyseal' == optFunLink){
				moduleForm.sealInfoModify();
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
			currentPosition:basicConstant.SEAL+'印章承接制作->印章委托申报管理'
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
