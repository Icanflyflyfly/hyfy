
package com.bhtec.action.seal.sealapply;

import com.bhtec.action.seal.SealBaseAction;
import com.bhtec.common.tools.FirstLetter;
import com.bhtec.domain.pojo.seal.SealChipEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.exception.ApplicationException;
import com.bhtec.exception.SystemException;
import com.bhtec.service.iface.seal.chip.SealChipService;
import com.bhtec.service.iface.seal.sealapply.SealApplyService;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.log4j.Logger;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.bhtec.common.constant.Common.*;
import static com.bhtec.common.constant.Common.PHONE;

public class SealChipAction extends SealBaseAction implements ModelDriven<SealChipEntity> {
	private static final long serialVersionUID = 43654575467L;
	Logger log = Logger.getLogger(this.getClass());
	private SealChipEntity sealChipEntity = new SealChipEntity();
	private List<SealChipEntity> sealChipEntityList = new ArrayList<SealChipEntity>();
	private SealChipService sealChipService;
	int count;
	boolean chinSnBol;

	/**
	 * 功能说明：芯片入库
	 * @author jacobliang
	 * @throws
	 */
	public String saveChip(){
		try {
			sealChipService.setHttpServletRequest(this.getHttpServletRequest());
			sealChipEntity.setCreateTime(new Timestamp(new Date().getTime()));
			sealChipEntity.setCreator((String) getHttpServletRequest().getSession().getAttribute(USER_CODE));
			sealChipEntity.setChipStatus("0");

			sealChipService.saveChip(sealChipEntity);
			return SUCCESS;
		}catch (SystemException e) {
			e.printStackTrace();
			return ERROR;
		}
	}
	/**
	 * 功能说明：查询芯片列表
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findChipsByCon(){

		Map map = sealChipService.findSealchipByCon(getStart(),getLimit(),
				sealChipEntity.getChipSn(),sealChipEntity.getSealBelongUnit());
		sealChipEntityList = (List<SealChipEntity>)map.get(BUSI_LIST);
		count = (Integer)map.get(TOTAL_PROPERTY);
		return this.SUCCESS;
	}


	/**
	 * 功能说明：查询芯片是否已经入库
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findChipBySn(){
		chinSnBol = sealChipService.findChipBySn(sealChipEntity.getChipSn());
		return this.SUCCESS;
	}

	/**
	 * 功能说明：芯片信息修改
	 * @author jacobliang
	 * @throws
	 */
	public String modifyChip(){
		try {
			sealChipService.setHttpServletRequest(this.getHttpServletRequest());

			sealChipService.modifyChip(sealChipEntity);
			return SUCCESS;
		}catch (SystemException e) {
			e.printStackTrace();
			return ERROR;
		}
	}

	@Override
	public SealChipEntity getModel() {
		return sealChipEntity;
	}

	public List<SealChipEntity> getSealChipEntityList() {
		return sealChipEntityList;
	}

	public void setSealChipEntityList(List<SealChipEntity> sealChipEntityList) {
		this.sealChipEntityList = sealChipEntityList;
	}

	public void setSealChipService(SealChipService sealChipService) {
		this.sealChipService = sealChipService;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public boolean isChinSnBol() {
		return chinSnBol;
	}

	public void setChinSnBol(boolean chinSnBol) {
		this.chinSnBol = chinSnBol;
	}
}
