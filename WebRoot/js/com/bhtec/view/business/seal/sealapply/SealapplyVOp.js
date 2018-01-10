/**
 * 编码操作
 * @author lianglp
 * @version 1.0
 * @class com.bhtec.view.business.seal.sealapply.SealapplyVOp
 * @date 2017-12-01
 */
Ext.namespace('com.bhtec.view.business.seal.sealapply');
com.bhtec.view.business.seal.sealapply.SealapplyVOp = function(config){
	var moduleVOp = this;   //父类调用
	var moduleGridId = 'sealApplyGridId';//form表单id

	/**
	 * 编码增加修改表单
	 */
	var funForm = function(configForm){
		/**
		 * 公用保存设置
		 */
		var saveCommon = function(configSave) {
			submitForm({
					url : configSave.url,
					params:{
						unitName:Ext.get('unitNameCom').dom.value,
						companyType : getExtCmpValueById('companyType'),
						area : getExtCmpValueById('sealBelongDist'),
						areaName : getExtCmpValueById('sealBelongDistName'),
						certificateType : getExtCmpValueById('certificateType')
					},
					callBack : function(returnData) {
						var configCb = {
							msg : '申刻单位基本信息保存成功!',
							fn : function(confirm) {
								if ('ok' == confirm) {
									refreshGridList(moduleGridId);
									getExtCmpById(moduleVOp.cuvWindowId).close();
									if (configSave.save == 'save') {
										//印章添加
										var sealColumnFields = addSealForm({});
										moduleVOp.cuvWindow({
											formId:'addSealFormId',
											title: "印章添加",				//窗口title
											customColumnItems: true,				//是否自定义列表
											columnFields:sealColumnFields,			//表单第一列
											allButtonHidden: true,
											autoScroll: true,
											formButton:{
												xtype	  : 'panel',
												layout 	  : 'column',
												border    : false,
												bodyStyle : "padding-left:200px",
												autoHeight:true,
												items:[{
													border : false,
													layout : "form",
													columnWidth : 0.1,
													items:[]
												},{
													border : false,
													layout : "form",
													columnWidth : 0.2,
													items : [{
														xtype : 'button',
														id : "autoPublish",
														iconCls : 'table_multiple',
														text : '自动排版',
														handler : function(){

														}
													}]
												}, {
													border : false,
													layout : "form",
													columnWidth : 0.2,
													items : [{
														xtype : 'button',
														id : "sealAdd",
														iconCls : 'table_save',
														text : '添加',
														handler : function(){
															submitForm({
																formId:'addSealFormId',
																url : 'sealDetailAction!saveSealDetail.action',
																params : {
																	sealApplyId : returnData.sealApplyId
																},
																callBack : function(returnData) {
																	var configCb = {
																		msg : '印章信息保存成功!',
																		fn : function(confirm) {
																			if ('ok' == confirm) {
																				getExtCmpById(moduleVOp.cuvWindowId).close();
																				refreshGridList(moduleGridId);
																			}
																		}
																	}
																	showSucMesg(configCb);
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
														id : "sealSaveAdd",
														iconCls : 'table_multiple',
														text : '保存添加',
														handler : function(){

														}
													}]
												}, {
													border : false,
													layout : "form",
													columnWidth : 0.2,
													items : [{
														xtype : 'button',
														iconCls : 'table_close',
														text : '关闭',
														handler : function(){
															getExtCmpById('addSealFormId').close();
														}
													}
													]
												},{
													border : false,
													layout : "form",
													columnWidth : 0.1
												}]
											}
										});
									}
								}
							}
						}
						showSucMesg(configCb);
					}
				});
		}
		/**
		 * 点击保存按钮调用方法
		 */
		var save = function() {
			if(configForm.modifyUrl == true){
				saveCommon({
					url:'sealAction!modifySealApply.action',
					save:'update'
				});
			}else{
				saveCommon({
					url:'sealAction!saveSeal.action',
					save:'save'
				});
			}

		}

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

		//印章ID
		var sealApplyId = new Ext.form.Hidden({
			id : "sealApplyId",
			name : "sealApplyId",
			value:moduleData.sealApplyId||'0'
		});

		//印章单位名称
		var unitNameCom = moduleVOp.comboBox({
			id:'unitNameCom',
			fieldLabel:config.unitName,
			mode : 'remote',
			hideTrigger : true,
			editable:true,
			minChars : 3,
			store : new Ext.data.JsonStore({
				url : 'sealUnitAction!findSealUnitNameByPy.action',
				root : 'sealUnitEntityList',
				fields : ["sealUnitId", "unitName","companyType","area","areaName","licenseNo",
					"manager","phone","address"]
			}),
			displayField : 'unitName',
			valueField : 'sealUnitId',
			typeAhead : false,
			loadingText : '查询中...',
			forceSelection : false,
			queryParam : 'unitNamePy',
			allowBlank:false,
			enableKeyEvents:true,
			listeners : {
				select:function(combo, record, index){
					getExtCmpById('sealUnitId').setValue(record.get('sealUnitId'));
					getExtCmpById('companyType').setValue(record.get('companyType'));
					getExtCmpById('sealBelongDist').setValue(record.get('area'));
					getExtCmpById('sealBelongDistName').setValue(record.get('areaName'));
					getExtCmpById('licenseNo').setValue(record.get('licenseNo'));
					getExtCmpById('manager').setValue(record.get('manager'));
					// getExtCmpById('certificateType').setValue(record.get('certificateType'));
					// getExtCmpById('certificateNo').setValue(record.get('certificateNo'));
					getExtCmpById('phone').setValue(record.get('phone'));
					getExtCmpById('address').setValue(record.get('address'));
				},
				render:function(){
					if(moduleData.unitName){
						getExtCmpById('unitNameCom').setValue(moduleData.unitName);
					}
				}
			}
		})


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

		var sealBelongDistId = new Ext.form.Hidden({
			id:'sealBelongDist',
			value:moduleData.area||0
		})

		var treeWin = function(){
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

		};

		//所属区域
		var areaApply = moduleVOp.triggerField({
			id : 'sealBelongDistName',
			name : 'sealBelongDistName',
			fieldLabel : config.area,
			value:moduleData.areaName||'',
			allowBlank:false,
			height      : 15,
			window:treeWin
		});


		//营业执照编号
		var licenseNo = moduleVOp.textField({
			id : "licenseNo",
			name : "licenseNo",
			allowBlank:false,
			fieldLabel : config.licenseNo,
			value:moduleData.licenseNo||'',
			maxLength:20
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

		//创建人
		var creator = moduleVOp.textField({
			id : "creator",
			name : "creator",
			allowBlank:false,
			fieldLabel : config.creator,
			value:moduleData.creator||'',
			maxLength:20
		});

		//审刻人
		var applyPerson = moduleVOp.textField({
			id : "applyPerson",
			name : "applyPerson",
			allowBlank:false,
			fieldLabel : config.applyPerson,
			value:moduleData.applyPerson||'',
			maxLength:20
		});

		//审刻人电话
		var applyPersonPhone = moduleVOp.textField({
			id : "applyPersonPhone",
			name : "applyPersonPhone",
			allowBlank:false,
			fieldLabel : config.applyPersonPhone,
			value:moduleData.applyPersonPhone||'',
			maxLength:20
		});

		//创建人
		var applyMemo = moduleVOp.textField({
			id : "applyMemo",
			name : "applyMemo",
			allowBlank:true,
			fieldLabel : config.applyMemo,
			value:moduleData.applyMemo||'',
			maxLength:20
		});

		//创建时间
		var createDate = new Ext.form.Hidden({
				name : "createDate",
				value:moduleData.createDate||''
		});

		var certificateBtn = {
			xtype : 'button',
			id : "certificateBtn",
			iconCls : 'table_save',
			text : '证件识别',
			align:'right',
			style:'padding-left:220px',
			handler : config.handler||function(){
				//良田二代证
				var view1 = document.getElementById('view0');

				view1.Global_StopIdCardDiscern();
				view1.Global_DeinitIdCard();
				if(view1.Global_InitIdCard()){
					var ret = view1.Global_ReadIdCard();
					if(ret){
						getExtCmpById('applyPerson').setValue(view1.Global_GetIdCardData(1));
						getExtCmpById('certificateNo').setValue(view1.Global_GetIdCardData(8));
						getExtCmpById('address').setValue(view1.Global_GetIdCardData(7));

						// var image = view1.Global_GetIdCardImage(1);//1表示头像， 2表示正面， 3表示反面 ...
					}else{
						var msg='对不起,请您放入二代身份证';
						showSucMesg({
							msg:msg
						})
					}

					view1.Global_DeinitIdCard();
				}else{
					var msg='初始化二代证阅读器失败！';
					showSucMesg({
						msg:msg
					})
				}
				/*var Capture = document.getElementById("Capture");
				Capture.InitDevice();*/
				// Capture.ReadIDCard("d:\\DocImage\\IDCard.jpg");
			}
		}

		var scanBtn = {
			xtype : 'button',
			id : "scanBtn",
			iconCls : 'table_save',
			text : '申刻材料扫描',
			handler : config.handler||function(){
				new com.bhtec.view.business.seal.sealapply.Certificate();
			}
		}

		/*********证件识别************/
		//良田高拍仪
		var certificat = moduleVOp.panel({
			id : "certificatId",
			hidden:false,
			html:'<div><object id="view0" type="application/x-eloamplugin"  name="view"></object></div>',
			stateful:false,
			height	  : 1,
			width	  : 1,
			listeners :{
				afterrender:function(){
					var view1 = document.getElementById('view0');
					var init = view1.Global_InitDevs();
				}
			}
		});
		//哲林高拍仪
		/*var certificat = moduleVOp.panel({
			id : "certificatId",
			hidden:false,
			html:'<div><object id="Capture" style ="" align="middle" classid="clsid:9A73DB73-2CA3-478D-9A3F-7E9D6A8D327C"></div>',
			stateful:false,
			height	  : 1,
			width	  : 1,
			listeners :{
				afterrender:function(){
					try{
						var Capture = document.getElementById("Capture");
					}catch(err){
						alert("未找到ICaptureVideo.ocx控件，请重新安装");
					}
					// Capture.InitDevice();

					// var cardInfo = Capture.ReadIDCard("d:\\DocImage\\IDCard.jpg");
					// alert(cardInfo);
				}
			}
		});*/

		var certificatImages  = {
			xtype	  : 'fieldset',
			title	  : '申报材料预览',
			layout 	  : 'form',
			items 	  : [moduleVOp.panel({
				id : "certificatImages",
				autoHeight:true,
				width:Ext.getBody().getWidth()-350,
				html:'<div style="margin-top:15px;"><object style="z-index:99;" id="applyImagesId" type="application/x-eloamplugin" width="82%" height="130" name="thumb"></object></div>'
			})],
			style:'background-color:#FFF'
		};

		var fields = [unitNameCom,companyType,licenseNo,manager,phone,
			certificateType,certificateNo,applyPerson,address,applyPersonPhone,
			areaApply,certificat,applyMemo,certificateBtn,scanBtn,
			sealBelongDistId,sealUnitId,sealApplyId];

		var newColumnFields = [];
		for(i=0;i<fields.length;i++){
			newColumnFields.push({
				border : false,
				layout : "form",
				columnWidth : 0.5,
				items : fields[i],
				selectOnFocus : true
			});
		}

		newColumnFields.push({
			border : false,
			layout : "form",
			columnWidth : 1,
			items : certificatImages,
			selectOnFocus : true
		});

		for(i=0;i<5;i++){
			//上传图片base64

			var s = new Ext.form.Hidden({
				id:"s"+i,
				value:''
			})

			var p = new Ext.form.Hidden({
				id:"p"+i,
				value:''
			})


			newColumnFields.push({
				border : false,
				layout : "form",
				columnWidth : 0.5,
				items : s,
				selectOnFocus : true
			});
			newColumnFields.push({
				border : false,
				layout : "form",
				columnWidth : 0.5,
				items : p,
				selectOnFocus : true
			});
		}

	    //调用父类方法进行窗口构造
		moduleVOp.cuvWindow({
			title:configForm.title,				//窗口title
			columnFields:newColumnFields,		//表单第一列
			customColumnItems:true,
			save:save,							//保存按钮调用的方法
			modify:configForm.modify,			//窗口判断是否显示保存增加按钮
			allButtonHidden:configForm.allButtonHidden,
			autoScroll:true,
			saveText:configForm.saveText||''
		});


	};

	/**-----------------------------------印章添加----------------------------------------------------------------**/
	//调用父类方法进行窗口构造
	var addSealForm = function(moduleData){
			//page column
			var sealColumnFields = new Array();
			sealColumnFields.push({
				border : false,
				layout : "form",
				columnWidth : .5,
				items : [moduleVOp.comboBox({
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
				}),moduleVOp.comboBox({
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
									getExtCmpById('sealSpecification').setValue(moduleData.area);
								}else{
									getExtCmpById('sealSpecification').setValue('35yuan');
								}
							}
						}
					}),
					valueField 	: 'smallTypeCode',
					displayField: 'smallTypeName',
					allowBlank:false
				}),moduleVOp.textField({
					id : "bingkanInfo",
					name : "bingkanInfo",
					allowBlank:false,
					fieldLabel : config.bingkanInfo,
					value:moduleData.bingkanInfo||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "word1",
					name : "word1",
					allowBlank:true,
					fieldLabel : config.word1,
					value:moduleData.word1||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "word3",
					name : "word3",
					allowBlank:true,
					fieldLabel : config.word3,
					value:moduleData.word3||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "word5",
					name : "word5",
					allowBlank:true,
					fieldLabel : config.word5,
					value:moduleData.word5||'',
					maxLength:20
				}),moduleVOp.comboBox({
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
									getExtCmpById('sealMaterial').setValue(moduleData.area);
								}else{
									getExtCmpById('sealMaterial').setValue('youjiboli');
								}
							}
						}
					}),
					valueField 	: 'smallTypeCode',
					displayField: 'smallTypeName',
					allowBlank:false
				})]
			});
			sealColumnFields.push({
				border : false,
				layout : "form",
				columnWidth : .5,
				items : [moduleVOp.textField({
					id : "sealName",
					name : "sealName",
					allowBlank:false,
					fieldLabel : config.sealName,
					value:moduleData.sealName||'',
					maxLength:20
				}),moduleVOp.comboBox({
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
									getExtCmpById('bingkanType').setValue(moduleData.area);
								}else{
									getExtCmpById('bingkanType').setValue('wukan');
								}
							}
						}
					}),
					valueField 	: 'smallTypeCode',
					displayField: 'smallTypeName',
					allowBlank:false
				}),moduleVOp.comboBox({
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
									getExtCmpById('zhongkanType').setValue(moduleData.area);
								}else{
									getExtCmpById('zhongkanType').setValue('wuxing');
								}
							}
						}
					}),
					valueField 	: 'smallTypeCode',
					displayField: 'smallTypeName',
					allowBlank:false
				}),moduleVOp.textField({
					id : "word2",
					name : "word2",
					allowBlank:true,
					fieldLabel : config.word2,
					value:moduleData.word2||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "word4",
					name : "word4",
					allowBlank:true,
					fieldLabel : config.word4,
					value:moduleData.word4||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "word6",
					name : "word6",
					allowBlank:true,
					fieldLabel : config.word6,
					value:moduleData.word6||'',
					maxLength:20
				}),moduleVOp.comboBox({
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
									getExtCmpById('oilType').setValue(moduleData.area);
								}else{
									getExtCmpById('oilType').setValue('generalOil');
								}
							}
						}
					}),
					valueField 	: 'smallTypeCode',
					displayField: 'smallTypeName',
					allowBlank:false
				}),moduleVOp.textField({
					id : "isModifyFlag",
					name : "isModifyFlag",
					value:'',
					hidden:true
				}),moduleVOp.textField({
					id : "sealApplyDetailId",
					value:'',
					hidden:true
				})]
			});

			return sealColumnFields;
		}

	/**
	 * 点击列表保存，弹出保存页面
	 */
	var saveForm = function(){
		funForm({
			title:'申刻单位基本信息添加',
			modify:true,
			saveText:'保存'
		});
	}
	/**
	 * 点击列表修改，弹出修改页面
	 */
	var modifyForm = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord != ''){
			var configFind = {
					url:'sealAction!findSealApplyVoById.action',
					params:{sealApplyId:modDelRecord.sealApplyId},
					callBack:function(returnData){
						var configForm = {
							title:'申刻单位基本信息修改',
							moduleData:returnData.model,
							modify:true,
							modifyUrl:true
						}
						funForm(configForm);
					}
			}
			ajaxRequest(configFind);
		}
	}
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
	/**
	 * 撤销
	 */
	var recall = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord == '')return;

		if('0' != modDelRecord.status && '1' != modDelRecord.status && '3' != modDelRecord.status){
			var msg='对不起,您选择的记录不能被撤销';

			showSucMesg({
				msg:msg
			})
			return;
		}
		var moduleGridPanel = getExtCmpById(moduleGridId);
		var selModDelRecord = moduleGridPanel.getSelectionModel().getSelected();

		askMesg({
			msg: '您确认重新申报吗?',
			fn: function (confirm) {
				if (confirm == 'ok') {
					var configRecall = {
						url:'sealAction!recall.action',
						noMask:true,
						params:{
							sealApplyId:modDelRecord.sealApplyId,
							status:'4'
						},
						callBack:function(returnData){
							selModDelRecord.set('status', '4');
							moduleStore = moduleGridPanel.store;
							moduleStore.commitChanges();

							var configCb = {
								msg : '撤销成功!',
								fn : function(confirm) {
									refreshGridList(moduleGridId);
								}
							}
							showSucMesg(configCb);
						}
					}
					ajaxRequest(configRecall);
				}
			}
		});


	}
	/**
	 * 重新申报
	 */
	var recover = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord == '')return;
		if('4' != modDelRecord.status && '1' != modDelRecord.status){
			var msg='对不起,您选择的记录不能被重新申报';
			showSucMesg({
				msg:msg
			})
			return;
		}
		var moduleGridPanel = getExtCmpById(moduleGridId);
		var selModDelRecord = moduleGridPanel.getSelectionModel().getSelected();

		askMesg({
			msg:'您确认重新申报吗?',
			fn:function(confirm){
				if(confirm == 'ok'){
					var configRecall = {
						url:'sealAction!recall.action',
						noMask:true,
						params:{
							sealApplyId:modDelRecord.sealApplyId,
							status:'0'
						},
						callBack:function(returnData){
							selModDelRecord.set('status', '0');
							moduleStore = moduleGridPanel.store;
							moduleStore.commitChanges();

							var configCb = {
								msg : '重新申报成功!',
								fn : function(confirm) {
									refreshGridList(moduleGridId);
								}
							}
							showSucMesg(configCb);
						}
					}
					ajaxRequest(configRecall);
				}
			}
		});


	}

	//印章信息修改
	var sealInfoModify = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord != ''){
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
					url:'sealAction!findSealApplyDetail.action',
					fields : ['sealApplyDetailId','sealType','sealName','sealSpecification','bingkanType','bingkanInfo',
						'zhongkanType','sealMaterial','oilType','word1','word2','word3','word4','word5','word6'],
					// data:modDelRecord.sealApplyDetialEntities||[],
					baseParams :{
						sealApplyId:modDelRecord.sealApplyId
					},
					root:'sealApplyDetialEntities',
					autoLoad : true
				}),
				bbar:{},
				tbar : new Ext.Toolbar({
					items : [{
								text:'增加',
								iconCls:'table_add',
								handler:function(b){
									getExtCmpById('sealAddBtnId').setText('增加');
									getExtCmpById('isModifyFlag').setValue('add');
									if(getExtCmpById('sealFieldsetId').isVisible()){
										getExtCmpById('sealFieldsetId').setVisible(false);
										getExtCmpById('sealPanelBtnId').setVisible(false);
										b.setText('增加开');
									}else{
										getExtCmpById('sealFieldsetId').setVisible(true);
										getExtCmpById('sealPanelBtnId').setVisible(true);
										b.setText('增加关');
									}
								}
							},{
								text:'修改',
								iconCls:'table_edit',
								handler:function(){
									var modDelRecord = modifyDelSelRecord('sealGridPanelId');//请选择一条件记录
									if(modDelRecord != ''){
										getExtCmpById('sealAddBtnId').setText('保存');
										getExtCmpById('sealFieldsetId').setVisible(true);
										getExtCmpById('sealPanelBtnId').setVisible(true);
										getExtCmpById('isModifyFlag').setValue('modify');

										getExtCmpById('sealType').setValue(modDelRecord.sealType);
										getExtCmpById('sealApplyDetailId').setValue(modDelRecord.sealApplyDetailId);
										getExtCmpById('sealName').setValue(modDelRecord.sealName);
										getExtCmpById('sealSpecification').setValue(modDelRecord.sealSpecification);
										getExtCmpById('bingkanType').setValue(modDelRecord.bingkanType);
										getExtCmpById('bingkanInfo').setValue(modDelRecord.bingkanInfo);
										getExtCmpById('zhongkanType').setValue(modDelRecord.zhongkanType);
										getExtCmpById('sealMaterial').setValue(modDelRecord.sealMaterial);
										getExtCmpById('oilType').setValue(modDelRecord.oilType);
										getExtCmpById('word1').setValue(modDelRecord.word1);
										getExtCmpById('word2').setValue(modDelRecord.word2);
										getExtCmpById('word3').setValue(modDelRecord.word3);
										getExtCmpById('word4').setValue(modDelRecord.word4);
										getExtCmpById('word5').setValue(modDelRecord.word5);
										getExtCmpById('word6').setValue(modDelRecord.word6);
										refreshGridList(moduleGridId);
									}
								}
							},{
								text:'删除',
								iconCls:'table_delete',
								handler:function(){
									if (isSelRecord('sealGridPanelId')) {
										askMesg({
											msg:'您确认删除此记录吗?',
											fn:function(confirm){
												if(confirm == 'ok'){
													var configDel = {
														url : 'sealDetailAction!deleteSealApplyDetail.action',
														params : {
															sealDetailIdList : getColumnRecordIds('sealApplyDetailId', 'sealGridPanelId'),
															sealApplyId:modDelRecord.sealApplyId
														},
														callBack : function(returnData) {
															var configCb = {
																msg : '印章删除成功!',
																fn : function(confirm) {
																	if ('ok' == confirm) {
																		refreshGridList('sealGridPanelId');
																		refreshGridList(moduleGridId);
																	}
																}
															}
															showSucMesg(configCb);
														}
													}
													ajaxRequest(configDel);
												}
											}
										})

									}
								}
							}]
				})
			});

			var fieldSetGrid = {
				xtype	  : 'fieldset',
				id:'sealModifyGridId',
				title	  : '已添加印章列表',
				layout 	  : 'form',
				autoHeight:true,
				autoWidth:true,
				// bodyStyle : 'margin:10px;',
				items 	  : [gridPanel]
			};

			var sealFieldset = moduleVOp.fieldSet({
				id:'sealFieldsetId',
				title:'印章信息',				//窗口title
				customColumnItems:true,
				layout:'form',
				hidden:true,
				columnFields:addSealForm(modDelRecord)	//表单第一列
			});

			var formPanel = {
				xtype: 'form',
				id: 'sealModifyFormId',
				border: false,
				autoHeight: true,
				autoWidth: true,
				trackResetOnLoad: true,
				labelWidth: 80,
				items: [sealFieldset,{
					id:'sealPanelBtnId',
					xtype	  : 'panel',
					layout 	  : 'column',
					border    : false,
					hidden:true,
					bodyStyle : "padding-left:200px",
					autoHeight:true,
					items:[{
						border : false,
						layout : "form",
						columnWidth : 0.1,
						items:[]
					},{
						border : false,
						layout : "form",
						columnWidth : 0.25,
						items : [{
							xtype : 'button',
							id : "autoPublish",
							iconCls : 'table_multiple',
							text : '自动排版',
							handler : function(){

							}
						}]
					}, {
						border : false,
						layout : "form",
						columnWidth : 0.25,
						items : [{
							xtype : 'button',
							id : "sealAddBtnId",
							iconCls : 'table_save',
							text : '添加',
							handler : function(){
								if(getExtCmpById('isModifyFlag').getValue() == 'add') {//增加
									submitForm({
										formId: 'sealModifyFormId',
										url: 'sealDetailAction!saveSealDetail.action',
										params: {
											sealApplyId: modDelRecord.sealApplyId
										},
										callBack: function (returnData) {
											var configCb = {
												msg: '印章信息保存成功!',
												fn: function (confirm) {
													if ('ok' == confirm) {
														/*var sealApplyDetailEntity = returnData.sealApplyDetailEntity;

														var sealMg = getExtCmpById('sealGridPanelId');

														var record = new Ext.data.Record({
															sealType: sealApplyDetailEntity.sealType,
															sealName: sealApplyDetailEntity.sealName,
															sealSpecification: sealApplyDetailEntity.sealSpecification,
															bingkanType: sealApplyDetailEntity.bingkanType,
															bingkanInfo: sealApplyDetailEntity.bingkanInfo,
															zhongkanType: sealApplyDetailEntity.zhongkanType,
															sealMaterial: sealApplyDetailEntity.sealMaterial,
															oilType: sealApplyDetailEntity.oilType,
															word1: sealApplyDetailEntity.word1,
															word2: sealApplyDetailEntity.word2,
															word3: sealApplyDetailEntity.word3,
															word4: sealApplyDetailEntity.word4,
															word5: sealApplyDetailEntity.word5,
															word6: sealApplyDetailEntity.word6
														});
														sealMg.getStore().insert(0, record);*/
														refreshGridList('sealGridPanelId');
														refreshGridList(moduleGridId);
													}
												}
											}
											showSucMesg(configCb);
										}
									});
								}else{
									submitForm({
										formId: 'sealModifyFormId',
										params: {
											sealApplyDetailId: getExtCmpValueById('sealApplyDetailId')
										},
										url: 'sealDetailAction!modifySealApplyDetail.action',
										callBack: function (returnData) {
											var configCb = {
												msg: '印章信息修改成功!',
												fn: function (confirm) {
													if ('ok' == confirm) {
														refreshGridList('sealGridPanelId');
														refreshGridList(moduleGridId);
													}
												}
											}
											showSucMesg(configCb);
										}
									});
								}
							}
						}]
					}, {
						border : false,
						layout : "form",
						columnWidth : 0.25,
						items : [{
							xtype : 'button',
							iconCls : 'table_close',
							text : '关闭',
							handler : function(){
								getExtCmpById('sealModifyId').close();
							}
						}
						]
					},{
						border : false,
						layout : "form",
						columnWidth : 0.1
					}]
				}]
			}

			moduleVOp.window({
				id:'sealModifyId',
				title:'印章信息',
				autoScroll:true,
				items:[fieldSetGrid,formPanel]
			});
		}
	}

	return {
			saveForm:saveForm,
			modifyForm:modifyForm,
			viewForm:viewForm,
			recall:recall,
			recover:recover,
			sealInfoModify:sealInfoModify
	}
}

Ext.extend(com.bhtec.view.business.seal.sealapply.SealapplyVOp, com.bhtec.view.util.CommonWidgets, {});