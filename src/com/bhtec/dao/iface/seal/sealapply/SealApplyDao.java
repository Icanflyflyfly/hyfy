/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 23, 2017 @2:56:23 PM
 */
package com.bhtec.dao.iface.seal.sealapply;

import com.bhtec.dao.iface.BaseDao;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;

import java.util.List;
import java.util.Map;

public interface SealApplyDao extends BaseDao {

    Map findSealapplyByCon(int start, int limit, String approvalNum, String unitName,String userCode,String roleId);

    List<SealUnitEntity> findSealUnitNameByPy(String unitNamePy);

    void deleteAfficheByIds(List<Long> sealDetailIdList);

    Map findSealapprovalByCon(int start, int limit, String approvalNum, String unitName);

    Map findUnitByCon(int start, int limit, String unitName);

    SealUnitEntity findUnitByName(String unitName);

    SealApplyVo findSealApplyVoById(long sealApplyId);
}
