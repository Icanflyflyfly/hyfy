
package com.bhtec.action.seal.sealapply;

import com.bhtec.action.seal.SealBaseAction;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.service.iface.seal.sealapply.SealApplyService;
import com.opensymphony.xwork2.ModelDriven;
import com.sun.net.httpserver.Authenticator;
import org.apache.log4j.Logger;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static com.bhtec.common.constant.Common.*;

public class SealUnitAction extends SealBaseAction implements ModelDriven<SealUnitEntity> {
	private static final long serialVersionUID = 43654575467L;
	Logger log = Logger.getLogger(this.getClass());
	private SealUnitEntity sealUnitEntity = new SealUnitEntity();
	private List<SealUnitEntity> sealUnitEntityList = new ArrayList<SealUnitEntity>();
	private SealApplyService sealApplyService;
	private int count;

	/**
	 * 功能说明：
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findSealUnitNameByPy(){
		Pattern p_str = Pattern.compile("[\\u4e00-\\u9fa5]+");
		String unitNamePy = sealUnitEntity.getUnitNamePy();

		Matcher m = p_str.matcher(unitNamePy);
		if(!m.find() || !m.group(0).equals(unitNamePy)) {
			sealUnitEntityList = sealApplyService.findSealUnitNameByPy(sealUnitEntity.getUnitNamePy());
		}

		return SUCCESS;
	}

	/**
	 * 功能说明：查询单位列表
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findUnitByCon(){

		Map map = sealApplyService.findUnitByCon(getStart(),getLimit(),
				sealUnitEntity.getUnitName());
		sealUnitEntityList = (List<SealUnitEntity>)map.get(BUSI_LIST);
		count = (Integer)map.get(TOTAL_PROPERTY);
		return this.SUCCESS;
	}

	/**
	 * 功能说明：查询单位基本信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findUnitById(){
		sealUnitEntity = sealApplyService.findUnitById(sealUnitEntity.getSealUnitId());
		return SUCCESS;
	}

	/**
	 * 功能说明：修改单位基本信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public void modifyUnit(){
		try{
			sealApplyService.modifyUnitById(sealUnitEntity);
		}catch (Exception e){
			e.printStackTrace();
			this.returnFailur("修改单位基本信息失败");
		}

		this.returnSuccess();
	}

	/**
	 * 功能说明：修改单位基本信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String delUnitById(){
		try{
			sealApplyService.delUnitById(sealUnitEntity.getSealUnitId());
		}catch (Exception e){
			e.printStackTrace();
			return ERROR;
		}
		return SUCCESS;
	}

	/**
	 * 功能说明：更改单位状态
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public void modifyUnitStatus(){
		try{
			sealApplyService.modifyUnitStatus(sealUnitEntity);
		}catch (Exception e){
			e.printStackTrace();
			this.returnFailur("修改单位基本信息失败");
		}

		this.returnSuccess();
	}

	public List<SealUnitEntity> getSealUnitEntityList() {
		return sealUnitEntityList;
	}

	public void setSealUnitEntityList(List<SealUnitEntity> sealUnitEntityList) {
		this.sealUnitEntityList = sealUnitEntityList;
	}

	@Override
	public SealUnitEntity getModel() {
		return sealUnitEntity;
	}

	public void setSealApplyService(SealApplyService sealApplyService) {
		this.sealApplyService = sealApplyService;
	}
}
