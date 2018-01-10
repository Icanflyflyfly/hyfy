/**
 * 印章单位管理
 * @author lianglp
 * @version 1.0
 * @class com.bhtec.view.business.seal.sealapply.SealapplyVOp
 * @date 2017-12-01
 */
Ext.namespace('com.bhtec.view.business.seal.chipmgr');
com.bhtec.view.business.seal.chipmgr.ChipVOp = function(config){
	var moduleVOp = this;   //父类调用
	var moduleGridId = 'chipGridId';//form表单id


	/**
	 * 点击列表保存，弹出保存页面
	 */
	var saveForm = function(chipSn){
		var chipSnObj = eval('('+chipSn+')');
		ajaxRequest({
			url:'sealChipAction!findChipBySn.action',
			params:{chipSn:chipSnObj.sn},
			callBack:function(returnData){
				if(returnData.chinSnBol == false){
					var configFind = {
						url:'sealChipAction!saveChip.action',
						params:{chipSn:chipSnObj.sn},
						callBack:function(returnData){
							var configCb = {
								msg: '芯片入库成功!',
								fn: function (confirm) {
									refreshGridList(moduleGridId);
								}
							}
							showSucMesg(configCb);
						}
					}
					ajaxRequest(configFind);
				}else{
					warningMesg({
						msg:'对不起,此芯片库中已存在!'
					})
				}

			}
		});

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


	return {
			saveForm:saveForm,
			modifyForm:modifyForm,
			viewForm:viewForm
	}
}

Ext.extend(com.bhtec.view.business.seal.chipmgr.ChipVOp, com.bhtec.view.util.CommonWidgets, {});