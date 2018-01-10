/**
 * 编码操作
 * @author liubf
 * @version 1.0
 * @class com.bhtec.view.business.seal.sealunifyquery.SealUnifyQueryVOp
 * @date 2017-09-19
 */
Ext.namespace('com.bhtec.view.business.seal.sealunifyquery');
com.bhtec.view.business.seal.sealunifyquery.SealUnifyQueryVOp = function(config){
    var moduleVOp = this;   //父类调用
    var moduleGridId = 'yzUnifySearchGridId';//form表单id

    /**
     * 点击列表查看，弹出查看页面
     */
    var viewInfo = function(){
        var modDelRecord = modifyDelSelRecord(moduleGridId);//请选择一条件记录
        if(modDelRecord != ''){
            var configFind = {
                url:'sealUnifyInfoAction!findViewByCodeId.action',
                params:{modViewRecId:modDelRecord.codeId},
                callBack:function(returnData){

                }
            }
            ajaxRequest(configFind);
        }
    }

    var exportExl = function(){
        var configFind = {
            url:'sealUnifyInfoAction!exportExl.action',
            callBack:function(returnData){

            }
        }
        ajaxRequest(configFind);
    }

    return {
        viewInfo:viewInfo,
        exportExl:exportExl,

    }
}

Ext.extend(com.bhtec.view.business.seal.sealunifyquery.SealUnifyQueryVOp, com.bhtec.view.util.CommonWidgets, {});