/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 30, 2017 @3:10:17 PM
 */
package com.bhtec.service.iface.seal.sealapply;

import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.exception.ApplicationException;
import com.bhtec.service.iface.BaseService;

import java.util.List;
import java.util.Map;

public interface SealApplyService extends BaseService {
	Long saveSealApply(SealApplyVo sealApplyVo)throws ApplicationException;

    Map findSealapplyByCon(int start, int limit, String approvalNum, String unitName,String userCode,String roleId);

    void saveSealApplyDetail(SealApplyDetailEntity sealApplyDetailEntity)throws ApplicationException;

    List<SealUnitEntity> findSealUnitNameByPy(String unitNamePy);

    void updateSealApply(SealApplyVo sealApplyVo)throws ApplicationException;

    void recall(SealApplyVo sealApplyVo)throws ApplicationException;

    SealApplyEntity findApplyById(long sealApplyId);

    SealApplyVo findSealApplyVoById(long sealApplyId);

    void modifySealApply(SealApplyVo sealApplyVo) throws ApplicationException;

    void modifySealApplyDetail(SealApplyDetailEntity sealApplyDetailEntity) throws ApplicationException;

    void deleteSealApplyDetail(List<Long> sealDetailIdList,Long sealApplyId);

    Map findSealapprovalByCon(int start, int limit, String approvalNum, String unitName);

    void modifySealApplyApproval(long sealApplyId, String status,String refuse)throws ApplicationException;

    Map findUnitByCon(int start, int limit, String unitName);

    SealUnitEntity findUnitById(long sealUnitId);

    void modifyUnitById(SealUnitEntity sealUnitEntity);

    void delUnitById(long sealUnitId);

    Long saveSealFromUnit(SealApplyVo sealApplyVo) throws ApplicationException;

    void modifyUnitStatus(SealUnitEntity sealUnitEntity);
}
