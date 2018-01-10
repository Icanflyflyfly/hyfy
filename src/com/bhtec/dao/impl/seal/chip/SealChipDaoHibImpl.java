/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 23, 2017 @3:08:56 PM
 */
package com.bhtec.dao.impl.seal.chip;

import com.bhtec.common.tools.UtilTools;
import com.bhtec.dao.iface.seal.chip.SealChipDao;
import com.bhtec.dao.iface.seal.sealapply.SealApplyDao;
import com.bhtec.dao.impl.BaseDaoHibImpl;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.domain.pojo.seal.SealChipEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.bhtec.common.constant.Common.BUSI_LIST;
import static com.bhtec.common.constant.Common.TOTAL_PROPERTY;
import static com.bhtec.common.tools.UtilTools.isNullOrEmpty;

public class SealChipDaoHibImpl extends BaseDaoHibImpl implements SealChipDao {

    @Override
    public Map findSealchipByCon(int start, int limit, String chipsn, String unitName) {
        StringBuffer stringBufferSql = new StringBuffer();
        stringBufferSql
                       .append("from SealChipEntity sealChip ")
                       .append("where 1 = 1 ");
        List params = new ArrayList();
        if(!isNullOrEmpty(chipsn)){
            stringBufferSql.append("and sealChip.chipSn like ?");
            params.add("%"+chipsn+"%");
        }
        if(!isNullOrEmpty(unitName)){
            stringBufferSql.append(" and sealChip.sealBelongUnit like ?");
            params.add("%"+unitName+"%");
        }


        String queryString = stringBufferSql.toString();

        String countSql = "select count(*) " + queryString;

        queryString = "select sealChip " + queryString+" order by sealChip.chipId desc";

        List chipList =  this.findByHqlWithPagination(start, limit, queryString,params);//分页

        int totalProperty = getRowCount(countSql,params);//总记录数
        Map map = new HashMap();
        map.put(TOTAL_PROPERTY, totalProperty);
        map.put(BUSI_LIST, chipList);
        return map;
    }

    @Override
    public SealChipEntity findChipBySn(String chipSn) {
        String hql = "from SealChipEntity sealChip where sealChip.chipSn = '" +chipSn+"'";

        return (SealChipEntity)getSingleRowRecord(hql);
    }


}
