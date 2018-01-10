package com.bhtec.service.impl.seal.dataquery;

import com.bhtec.dao.iface.seal.dataquery.SealDataQueryDao;
import com.bhtec.domain.pojo.platform.SysplDicSmallType;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.domain.pojohelper.seal.SealUnitVo;
import com.bhtec.domain.pojohelper.seal.SealVo;
import com.bhtec.service.iface.platform.TypeDictionary.TypeDictionaryService;
import com.bhtec.service.iface.seal.dataquery.SealDataQueryService;
import com.bhtec.service.impl.BaseServiceImpl;
import org.apache.log4j.Logger;

import java.util.List;
import java.util.Map;

import static com.bhtec.common.constant.Common.BUSI_LIST;
import static com.bhtec.common.constant.ServiceVariable.COMPANY_TYPE;

/**
 * 功能说明：
 *
 * @auther liubf
 * @date 2017/10/6
 * @throws
 */
public class SealDataQueryServiceImpl extends BaseServiceImpl implements SealDataQueryService {
    Logger log = Logger.getLogger(this.getClass());
    private SealDataQueryDao sealDataQueryDao;
    private TypeDictionaryService typeDictionaryService;


    @Override
    public SealApplyDetailEntity findSealApplyDetailById(Long sealApplyDetailId) {
        return sealDataQueryDao.findSealApplyDetailById(sealApplyDetailId);
    }

    @Override
    public Map findSealListByCon(int start, int limit, SealVo sealVo) {
        Map map =  sealDataQueryDao.findSealListByCon(start, limit, sealVo);
        return map;
    }

    @Override
    public Map exportSealListByCon(SealVo sealVo) {
        Map map = sealDataQueryDao.exportSealListByCon(sealVo);
        return map;
    }


    @Override
    public Map findSealApprovalListByCon(int start, int limit, SealApplyVo sealApplyVo) {
        return sealDataQueryDao.findSealApprovalListByCon(start,limit,sealApplyVo);
    }

    @Override
    public Map findUnitListByCon(int start, int limit, SealUnitVo sealUnitVo) {
        List<SysplDicSmallType> sysplDicSmallTypeList = typeDictionaryService.findSmallTypeDicByBigTypeCode(COMPANY_TYPE);
        Map map =  sealDataQueryDao.findUnitListByCon(start, limit, sealUnitVo);

        //查询公司类型
        List<SealUnitVo> sealUnitList = (List<SealUnitVo>)map.get(BUSI_LIST);
        for(SealUnitVo vo :sealUnitList){
            String companyType = vo.getCompanyType();
            for(SysplDicSmallType sysplDicSmallType:sysplDicSmallTypeList){
                if(companyType.equalsIgnoreCase(sysplDicSmallType.getSmallTypeCode())){
                    vo.setCompanyType(sysplDicSmallType.getSmallTypeName());
                    break;
                }
            }
        }

        return map;
    }

    @Override
    public SealUnitEntity findSealUnitById(long sealUnitId) {
        return (SealUnitEntity)sealDataQueryDao.getPojoById("com.bhtec.domain.pojo.seal.SealUnitEntity",sealUnitId);
    }

    public void setSealDataQueryDao(SealDataQueryDao sealDataQueryDao) {
        this.sealDataQueryDao = sealDataQueryDao;
    }

    public void setTypeDictionaryService(TypeDictionaryService typeDictionaryService) {
        this.typeDictionaryService = typeDictionaryService;
    }
}
