
package com.bhtec.action.seal.sealapply;

import com.bhtec.action.seal.SealBaseAction;
import com.bhtec.common.tools.FirstLetter;
import com.bhtec.common.tools.JSONUtil;
import com.bhtec.common.tools.UtilTools;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.exception.ApplicationException;
import com.bhtec.exception.SystemException;
import com.bhtec.service.iface.seal.sealapply.SealApplyService;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.log4j.Logger;

import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.bhtec.common.constant.Common.*;

public class SealDetailAction extends SealBaseAction implements ModelDriven<SealApplyDetailEntity> {
	private static final long serialVersionUID = 1000000L;
	Logger log = Logger.getLogger(this.getClass());
	private SealApplyDetailEntity sealApplyDetailEntity = new SealApplyDetailEntity();
	private SealApplyService sealApplyService;
	private List<Long> sealDetailIdList;
	private long sealApplyId;

	/**
	 * 功能说明：保存印章信息
	 * @author jacobliang
	 * @throws
	 */
	public void saveSealDetail(){
		try {
			sealApplyService.setHttpServletRequest(this.getHttpServletRequest());

			SealApplyEntity sealApplyEntity = new SealApplyEntity();
			sealApplyEntity.setSealApplyId(sealApplyDetailEntity.getSealApplyId());
			sealApplyDetailEntity.setSealApplyEntity(sealApplyEntity);
			sealApplyDetailEntity.setStatus("0");

			sealApplyService.saveSealApplyDetail(sealApplyDetailEntity);

			this.returnSuccess();
		}catch (ApplicationException e) {
			e.printStackTrace();
			this.returnFailur(e.toString());
		}catch (SystemException e) {
			e.printStackTrace();
			this.returnFailur(this.ERROR);
		}
	}

	/**
	 * 功能说明：修改单位基本信息
	 * @author jacobliang
	 * @return
	 * @throws
	 */
	public void modifySealApplyDetail(){
		try {
			sealApplyService.setHttpServletRequest(this.getHttpServletRequest());

			sealApplyService.modifySealApplyDetail(sealApplyDetailEntity);
			this.returnSuccess();
		} catch (ApplicationException e) {
			e.printStackTrace();
			this.returnFailur(e.toString());
		} catch (SystemException e) {
			e.printStackTrace();
			this.returnFailur(this.ERROR);
		}
	}

	/**
	 * 功能说明：修改单位基本信息
	 * @author jacobliang
	 * @return
	 * @throws
	 */
	public void deleteSealApplyDetail(){
		try {
			sealApplyService.setHttpServletRequest(this.getHttpServletRequest());
			sealApplyService.deleteSealApplyDetail(sealDetailIdList,sealApplyDetailEntity.getSealApplyId());
			this.returnSuccess();
		} catch (SystemException e) {
			e.printStackTrace();
			this.returnFailur(this.ERROR);
		}
	}


	@Override
	public SealApplyDetailEntity getModel() {
		return sealApplyDetailEntity;
	}

	public void setSealApplyService(SealApplyService sealApplyService) {
		this.sealApplyService = sealApplyService;
	}

	public List<Long> getSealDetailIdList() {
		return sealDetailIdList;
	}

	public void setSealDetailIdList(List<Long> sealDetailIdList) {
		this.sealDetailIdList = sealDetailIdList;
	}

	public long getSealApplyId() {
		return sealApplyId;
	}

	public void setSealApplyId(long sealApplyId) {
		this.sealApplyId = sealApplyId;
	}
}
