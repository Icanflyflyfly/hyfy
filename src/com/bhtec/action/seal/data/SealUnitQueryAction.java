package com.bhtec.action.seal.data;

import com.bhtec.action.seal.SealBaseAction;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealUnitVo;
import com.bhtec.service.iface.seal.dataquery.SealDataQueryService;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.log4j.Logger;

import java.util.List;
import java.util.Map;

import static com.bhtec.common.constant.Common.*;

/**
 * 功能说明：印章信息查询
 *
 * @auther liubf
 * @date 2017/9/25
 * @throws
 */
public class SealUnitQueryAction extends SealBaseAction implements ModelDriven<SealUnitVo> {
    private static final long serialVersionUID = 1000000L;

    private Logger log = Logger.getLogger(this.getClass());
    private SealDataQueryService sealDataQueryService;

    private int count;
    private List<SealUnitVo> sealUnitList;
    private SealUnitVo sealUnitVo = new SealUnitVo();
    private SealUnitEntity sealUnitEntity = new SealUnitEntity();

    /**
     * 功能说明：根据条件查询申刻单位列表
     * @author liubf
     * @return Map 1 list 2 总数
     * @throws
     */
    public String findListByCon(){

        Map map = sealDataQueryService.findUnitListByCon(getStart(),getLimit(),sealUnitVo);
        sealUnitList = (List<SealUnitVo>)map.get(BUSI_LIST);
        count = (Integer)map.get(TOTAL_PROPERTY);
        return this.SUCCESS;
    }

    /**
     *功能说明：根据ID查询申刻单位
     *
     * @return
     */
    public String findEntityById(){
        sealUnitEntity = sealDataQueryService.findSealUnitById(sealUnitVo.getSealUnitId());
        return SUCCESS;
    }

    /**
     * 功能说明：导出Excel
     * @author liubf
     * @return
     * */

    public void exportExl(){

        log.info(">>>>>>run in exportExl()");
    }

    @Override
    public SealUnitVo getModel() {
        return sealUnitVo;
    }

    public void setSealDataQueryService(SealDataQueryService sealDataQueryService) {
        this.sealDataQueryService = sealDataQueryService;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public SealUnitEntity getSealUnitEntity() {
        return sealUnitEntity;
    }

    public void setSealUnitEntity(SealUnitEntity sealUnitEntity) {
        this.sealUnitEntity = sealUnitEntity;
    }

    public List<SealUnitVo> getSealUnitList() {
        return sealUnitList;
    }

    public void setSealUnitList(List<SealUnitVo> sealUnitList) {
        this.sealUnitList = sealUnitList;
    }

}
