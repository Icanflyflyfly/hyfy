package com.bhtec.service.iface.seal.dataquery;

import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.domain.pojohelper.seal.SealUnitVo;
import com.bhtec.domain.pojohelper.seal.SealVo;
import com.bhtec.service.iface.BaseService;

import java.util.Map;

/**
 * 功能说明：数据查询Serivce
 *
 * @auther liubf
 * @date 2017/10/6
 * @throws
 */
public interface SealDataQueryService extends BaseService {
    /** 查询申报单位列表 */
    Map findUnitListByCon(int start, int limit, SealUnitVo sealUnitVo);
    /** 根据印章申报单位ID查询印章申报单位信息 */
    SealUnitEntity findSealUnitById(long sealUnitId);
    /** 查询印章信息 */
    Map findSealListByCon(int start, int limit, SealVo sealVo);
    /** 查询印章审批单信息 */
    Map findSealApprovalListByCon(int start, int limit, SealApplyVo sealApplyVo);

    Map exportSealListByCon(SealVo sealVo);

    SealApplyDetailEntity findSealApplyDetailById(Long sealApplyDetailId);
}
