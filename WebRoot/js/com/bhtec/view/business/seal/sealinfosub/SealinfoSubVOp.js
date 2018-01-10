/**
 * 编码操作
 * @author lianglp
 * @version 1.0
 */
Ext.namespace('com.bhtec.view.business.seal.sealinfosub');
com.bhtec.view.business.seal.sealinfosub.SealinfoSubVOp = function(config){
	var moduleVOp = this;   //父类调用
	var moduleGridId = 'sealApplyApprovalGridId';//form表单id

	/**
	 * 点击列表查看，弹出查看页面
	 */
	var viewForm = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord != ''){
			var configFind = {
					url:'codeAction!findSysplCodeByCodeId.action',
					params:{modViewRecId:modDelRecord.codeId},
					callBack:function(returnData){
						var configForm = {
							title:'系统编码查看',
							moduleData:returnData.model,
							allButtonHidden:true
						}
						funForm(configForm);
					}
			}
			ajaxRequest(configFind);
		}
	}


	//印章信息修改
	var sealInfoApproval = function(view){
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
								text : (config.creatorUnit+' : '),
								style:"padding:5px 0px"
							}),moduleVOp.label({
								text : (modDelRecord.creatorUnit ),
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
								var s0 = modDelRecord.s0;
								var s1 = modDelRecord.s1;
								var s2 = modDelRecord.s2;
								var s3 = modDelRecord.s3;
								var s4 = modDelRecord.s4;

								var p0 = modDelRecord.p0;
								var p1 = modDelRecord.p1;
								var p2 = modDelRecord.p2;
								var p3 = modDelRecord.p3;
								var p4 = modDelRecord.p4;

								var images = '';
								if(s0){
									images = images + '<img src="data:image/jpeg;base64,'+s0+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(s1){
									images = images + '<img src="data:image/jpeg;base64,'+s1+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(s2){
									images = images + '<img src="data:image/jpeg;base64,'+s2+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(s3){
									images = images + '<img src="data:image/jpeg;base64,'+s3+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(s4){
									images = images + '<img src="data:image/jpeg;base64,'+s4+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}

								if(p0){
									images = images + '<img src="data:image/jpeg;base64,'+p0+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(p1){
									images = images + '<img src="data:image/jpeg;base64,'+p1+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(p2){
									images = images + '<img src="data:image/jpeg;base64,'+p2+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(p3){
									images = images + '<img src="data:image/jpeg;base64,'+p3+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}
								if(p4){
									images = images + '<img src="data:image/jpeg;base64,'+p4+'" width="20%" height="50%" style="margin-right: 30px"/>';
								}

								var certificatImages  = {
									xtype	  : 'fieldset',
									title	  : '申报材料预览',
									layout 	  : 'form',
									items 	  : [moduleVOp.panel({
										id : "prePanelId",
										autoHeight:true,
										width:Ext.getBody().getWidth()-350,
										html:images
									})],
									style:'background-color:#FFF'
								};

								moduleVOp.window({
									id:'preview',
									title:'申报材料',
									autoScroll:true,
									items:[certificatImages]
								});
							}
						}
						]
					} ,{
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

	return {
			viewForm:viewForm,
			sealInfoApproval:sealInfoApproval
	}
}

Ext.extend(com.bhtec.view.business.seal.sealinfosub.SealinfoSubVOp, com.bhtec.view.util.CommonWidgets, {});