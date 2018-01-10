/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 23, 2017 @2:56:23 PM
 */
package com.bhtec.dao.iface.seal.chip;

import com.bhtec.dao.iface.BaseDao;
import com.bhtec.domain.pojo.seal.SealChipEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;

import java.util.List;
import java.util.Map;

public interface SealChipDao extends BaseDao {

    Map findSealchipByCon(int start, int limit, String chipsn, String unitName);

    SealChipEntity findChipBySn(String chipSn);

}
