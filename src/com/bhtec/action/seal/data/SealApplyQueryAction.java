
package com.bhtec.action.seal.data;

import com.bhtec.action.seal.SealBaseAction;
import com.bhtec.common.tools.FirstLetter;
import com.bhtec.common.tools.UtilTools;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.exception.ApplicationException;
import com.bhtec.exception.SystemException;
import com.bhtec.service.iface.seal.dataquery.SealDataQueryService;
import com.bhtec.service.iface.seal.sealapply.SealApplyService;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.log4j.Logger;

import java.util.*;

import static com.bhtec.common.constant.Common.*;

public class SealApplyQueryAction extends SealBaseAction implements ModelDriven<SealApplyVo> {
	private static final long serialVersionUID = 1000000L;
	Logger log = Logger.getLogger(this.getClass());
	private SealDataQueryService sealDataQueryService;

	private SealApplyVo sealApplyVo = new SealApplyVo();
	private int count;
	private List<SealApplyVo> sealApplyVoList;
	//	private SealApplyEntity sealApplyEntity = new SealApplyEntity();
	//	private String sealApplyDetailEntityList;
//	private Set sealApplyDetialEntities = new HashSet(0);
//	private String currentUserInfo = "";
//	private Long sealApplyDetailId;


	/**
	 * 功能说明：查询审核记录
	 * @author liubf
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findListByCon() {
		Map map = sealDataQueryService.findSealApprovalListByCon(getStart(), getLimit(),sealApplyVo);
		sealApplyVoList = (List<SealApplyVo>) map.get(BUSI_LIST);
		count = (Integer) map.get(TOTAL_PROPERTY);
		return this.SUCCESS;
	}


	@Override
	public SealApplyVo getModel() {
		return sealApplyVo;
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

	public List<SealApplyVo> getSealApplyVoList() {
		return sealApplyVoList;
	}

	public void setSealApplyVoList(List<SealApplyVo> sealApplyVoList) {
		this.sealApplyVoList = sealApplyVoList;
	}

}
