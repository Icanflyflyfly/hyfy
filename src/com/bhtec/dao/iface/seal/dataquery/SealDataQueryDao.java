package com.bhtec.dao.iface.seal.dataquery;

import com.bhtec.dao.iface.BaseDao;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.domain.pojohelper.seal.SealUnitVo;
import com.bhtec.domain.pojohelper.seal.SealVo;

import java.util.Map;

/**
 * 功能说明：
 *
 * @auther liubf
 * @date 2017/10/6
 * @throws
 */
public interface SealDataQueryDao extends BaseDao {
    /**
     * 功能说明：根据条件查询印章申刻单位信息
     * */
    Map findUnitListByCon(int start, int limit, SealUnitVo yzSearchVo);

    Map findSealListByCon(int start, int limit, SealVo sealVo);

    Map findSealApprovalListByCon(int start, int limit, SealApplyVo sealApplyVo);

    Map exportSealListByCon(SealVo sealVo);

    SealApplyDetailEntity findSealApplyDetailById(Long sealApplyDetailId);
}
