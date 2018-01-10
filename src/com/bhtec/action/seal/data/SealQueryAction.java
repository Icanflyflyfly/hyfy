
package com.bhtec.action.seal.data;

import com.bhtec.action.seal.SealBaseAction;
import com.bhtec.common.tools.DateUtil;
import com.bhtec.common.tools.FileUtil;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojohelper.seal.SealVo;
import com.bhtec.service.iface.seal.dataquery.SealDataQueryService;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.log4j.Logger;

import java.util.*;

import static com.bhtec.common.constant.Common.*;

public class SealQueryAction extends SealBaseAction implements ModelDriven<SealVo> {
	private static final long serialVersionUID = 1000000L;
	Logger log = Logger.getLogger(this.getClass());
	private SealVo sealVo = new SealVo();
	private SealDataQueryService sealDataQueryService;
	private int count;
	private List<SealVo> sealVoList;
	private SealApplyDetailEntity sealApplyDetailEntity = new SealApplyDetailEntity();;


	/**
	 * 功能说明：查询审核记录
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findListByCon() {
		Map map = sealDataQueryService.findSealListByCon(getStart(), getLimit(),sealVo);
		sealVoList = (List<SealVo>) map.get(BUSI_LIST);
		count = (Integer) map.get(TOTAL_PROPERTY);
		return this.SUCCESS;
	}
    /**
    * 功能说明：导出印章信息
    **/
    public void exportExl(){
        Map<String,List<String[]>> map = (Map<String,List<String[]>>)sealDataQueryService.exportSealListByCon(sealVo);

        String fileName = "印章信息导出_"+ DateUtil.dateToString(new Date(),"yyyy_MM_dd")+".xls";
        String[][] titles = new String[][]{{"印章编码", "6000"},{"印章名称", "6000"},{"印章状态","6000"},
        			        {"印章类型", "4000"},{"印章规格","4000"},{"审批单位名称","4000"},{"使用单位名称","4000"},
        			        {"经办人","4000"},{"经办人证件号码","6000"},{"审批日期","4000"},
        			        {"章面材料","4000"}};

        FileUtil.exportExcel(titles,map.get("DATA"),"印章信息",fileName,this.getHttpServletResponse());
    }



	/**
	 * 功能说明：查询单位基本信息
	 * @author liubf
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findSealDetailById(){
		sealApplyDetailEntity = sealDataQueryService.findSealApplyDetailById(sealVo.getSealApplyDetailId());
		return SUCCESS;
	}

	@Override
	public SealVo getModel() {
		return sealVo;
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

	public List<SealVo> getSealVoList() {
		return sealVoList;
	}

	public void setSealVoList(List<SealVo> sealVoList) {
		this.sealVoList = sealVoList;
	}

	public SealApplyDetailEntity getSealApplyDetailEntity() {
		return sealApplyDetailEntity;
	}

	public void setSealApplyDetailEntity(SealApplyDetailEntity sealApplyDetailEntity) {
		this.sealApplyDetailEntity = sealApplyDetailEntity;
	}
}
