/**
 * 印章单位管理
 * @author lianglp
 * @version 1.0
 * @class com.bhtec.view.business.seal.sealapply.SealapplyVOp
 * @date 2017-12-01
 */
Ext.namespace('com.bhtec.view.business.seal.sealunitmgr');
com.bhtec.view.business.seal.sealunitmgr.SealunitVOp = function(config){
	var moduleVOp = this;   //父类调用
	var moduleGridId = 'sealUnitGridId';//form表单id

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
						certificateType : getExtCmpValueById('certificateType'),
						sealUnitId  : getExtCmpValueById('sealUnitId')
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
																		msg : '印章信息保存成功,请于印章申刻模块列表查看!',
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
			saveCommon({
				url:'sealAction!saveSealFromUnit.action',
				save:'save'
			});

		}

		/**
		 * 公用增加修改删除表单
		 */
		var moduleData = configForm.moduleData||'';
		
		//印章ID
		var sealUnitId = new Ext.form.Hidden({
				id : "sealUnitId",
				name : "sealUnitId",
				value:moduleData.sealUnitId||'0'
		});

		//承刻企业
		var ckUnit = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : ('承刻企业：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : '辖区内所有刻制企业',
					style:"padding:0px"
				})
			]
		})

		//企业类型
		var companyType = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : config.companyType+('：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : moduleData.companyType,
					style:"padding:0px 0px 5px 0px"
				})
			]
		})

		var sealBelongDistId = new Ext.form.Hidden({
			id:'sealBelongDist',
			value:moduleData.area||0
		})

		//所属区域
		var area = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : config.area+('：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : moduleData.areaName,
					style:"padding:0px 0px 5px 0px"
				})
			]
		})

		//营业执照编号
		var licenseNo = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : config.licenseNo+('：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : moduleData.licenseNo,
					style:"padding:0px 0px 5px 0px"
				})
			]
		})

		//负责人
		var manager = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : config.manager+('：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : moduleData.manager,
					style:"padding:0px 0px 5px 0px"
				})
			]
		})

		//单位名称
		var unitName = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : config.unitName+('：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : moduleData.unitName,
					style:"padding:0px 0px 5px 0px"
				})
			]
		})

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
		var phone = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : config.phone+('：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : moduleData.phone,
					style:"padding:0px 0px 5px 0px"
				})
			]
		})

		//电话
		var code = moduleVOp.textField({
			id : "code",
			name : "code",
			allowBlank:false,
			fieldLabel : config.code,
			value:moduleData.code||'',
			maxLength:20
		});

		//地址
		var address = moduleVOp.panel({
			autoHeight:true,
			items:[
				moduleVOp.label({
					text : config.address+('：'),
					style:"width:90px"
				}),moduleVOp.label({
					text : moduleData.address,
					style:"padding:0px 0px 5px 0px"
				})
			]
		})

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

		//创建时间
		var createDate = new Ext.form.Hidden({
				name : "createDate",
				value:moduleData.createDate||''
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

		var fields = [unitName,companyType,licenseNo,manager,phone,area,address,certificat,
			certificateType,certificateNo,applyPerson,applyPersonPhone,
			applyMemo,certificateBtn,scanBtn,
			sealBelongDistId,sealUnitId];

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
	 * 单位信息修改
     */
	var unitModifyForm = function(configForm){
		var moduleData = configForm.moduleData||'';
		//调用父类方法进行窗口构造
		moduleVOp.cuvWindow({
			title:configForm.title,				//窗口title
			columnFields:[
				new Ext.form.Hidden({
					id : "sealUnitId",
					name : "sealUnitId",
					value:moduleData.sealUnitId||'0'
				}),new Ext.form.Hidden({
					id:'sealBelongDist',
					value:moduleData.area||0
				}),moduleVOp.textField({
					id : "unitName",
					name : "unitName",
					allowBlank:false,
					fieldLabel : config.unitName,
					value:moduleData.unitName||'',
					maxLength:20
				}),moduleVOp.comboBox({
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
				}),moduleVOp.triggerField({
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
				}),moduleVOp.textField({
					id : "licenseNo",
					name : "licenseNo",
					allowBlank:false,
					fieldLabel : config.licenseNo,
					value:moduleData.licenseNo||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "manager",
					name : "manager",
					allowBlank:false,
					fieldLabel : config.manager,
					value:moduleData.manager||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "phone",
					name : "phone",
					allowBlank:false,
					fieldLabel : config.phone,
					value:moduleData.phone||'',
					maxLength:20
				}),moduleVOp.textField({
					id : "address",
					name : "address",
					allowBlank:false,
					fieldLabel : config.address,
					value:moduleData.address||'',
					maxLength:50
				})
			],		//表单第一列
			save:function() {
				submitForm({
					url: 'sealUnitAction!modifyUnit.action',
					params: {
						companyType : getExtCmpValueById('companyType'),
						area : getExtCmpValueById('sealBelongDist'),
						areaName : getExtCmpValueById('sealBelongDistName')
					},
					callBack: function (returnData) {
						var msg = "申刻单位基本信息修改成功!";
						if(returnData.failure){
							msg = "申刻单位基本信息修改失败!";
						}
						var configCb = {
							msg: msg,
							fn: function (confirm) {
								if ('ok' == confirm) {
									refreshGridList(moduleGridId);
									getExtCmpById(moduleVOp.cuvWindowId).close();
								}
							}
						}
						showSucMesg(configCb);
					}
				})
			},							//保存按钮调用的方法
			modify:true,			//窗口判断是否显示保存增加按钮
			allButtonHidden:configForm.allButtonHidden,
			autoScroll:true,
			saveText:configForm.saveText||''
		});
	}

	/**
	 * 点击列表保存，弹出保存页面
	 */
	var saveForm = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord != '') {
			funForm({
				title: '申刻单位基本信息添加',
				modify: true,
				saveText: '保存并添加印章',
				moduleData:modDelRecord
			});
		}
	}
	/**
	 * 点击列表修改，弹出修改页面
	 */
	var modifyForm = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord != ''){
			ajaxRequest({
				url:'sealUnitAction!findUnitById.action',
				params:{sealUnitId:modDelRecord.sealUnitId},
				callBack:function(returnData){
					unitModifyForm({
						title:'申刻单位基本信息修改',
						moduleData:returnData.model
					});
				}
			});
		}
	}
	/**
	 * 点击列表查看，弹出查看页面
	 */
	var viewForm = function(){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord != ''){
			var configFind = {
					url:'sealUnitAction!findUnitById.action',
					params:{sealUnitId:modDelRecord.sealUnitId},
					callBack:function(returnData){
						var configForm = {
							title:'申刻单位基本信息查看',
							moduleData:returnData.model,
							allButtonHidden:true
						}
						unitModifyForm(configForm);
					}
			}
			ajaxRequest(configFind);
		}
	}

	/**
	 * 点击列表修改，弹出修改页面
	 */
	var modifyUnitStatus = function(status){
		var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
		if(modDelRecord != ''){
			var msg = '您确认注销此单位吗?';
			var promotion = '注销成功';
			if(status == 1){
				msg = '您确认启用此单位吗?';
				promotion = '启用成功';
			}

			var moduleGridPanel = getExtCmpById(moduleGridId);
			var selModDelRecord = moduleGridPanel.getSelectionModel().getSelected();

			askMesg({
				msg:msg,
				fn:function(confirm){
					if(confirm == 'ok'){
						var configRecall = {
							url:'sealUnitAction!modifyUnitStatus.action',
							noMask:true,
							params:{
								sealUnitId:modDelRecord.sealUnitId,
								status:status
							},
							callBack:function(returnData){
								selModDelRecord.set('status', '0');
								moduleStore = moduleGridPanel.store;
								moduleStore.commitChanges();

								var configCb = {
									msg : promotion,
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
	}


	return {
			saveForm:saveForm,
			modifyForm:modifyForm,
			viewForm:viewForm,
			modifyUnitStatus:modifyUnitStatus
	}
}

Ext.extend(com.bhtec.view.business.seal.sealunitmgr.SealunitVOp, com.bhtec.view.util.CommonWidgets, {});