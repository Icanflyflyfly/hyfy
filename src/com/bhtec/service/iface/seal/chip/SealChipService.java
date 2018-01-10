/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 30, 2017 @3:10:17 PM
 */
package com.bhtec.service.iface.seal.chip;

import com.bhtec.domain.pojo.seal.SealChipEntity;
import com.bhtec.service.iface.BaseService;

import java.util.Map;

public interface SealChipService extends BaseService {
    Map findSealchipByCon(int start, int limit, String chipsn, String unitName);

    void saveChip(SealChipEntity sealChipEntity);

    boolean findChipBySn(String chipSn);

    void modifyChip(SealChipEntity sealChipEntity);
}
