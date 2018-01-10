
package com.bhtec.action.seal.sealapply;

import com.bhtec.action.seal.SealBaseAction;
import com.bhtec.common.tools.FirstLetter;
import com.bhtec.common.tools.UtilTools;
import com.bhtec.domain.pojo.platform.SysplAccessory;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.exception.ApplicationException;
import com.bhtec.exception.SystemException;
import com.bhtec.service.iface.seal.sealapply.SealApplyService;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.log4j.Logger;

import java.io.File;
import java.util.*;

import static com.bhtec.common.constant.Common.*;

public class SealAction extends SealBaseAction implements ModelDriven<SealApplyVo> {
	private static final long serialVersionUID = 1000000L;
	Logger log = Logger.getLogger(this.getClass());
	private SealApplyVo sealApplyVo = new SealApplyVo();
	private SealApplyEntity sealApplyEntity = new SealApplyEntity();
	private SealApplyService sealApplyService;
	private String sealApplyDetailEntityList;
	private int count;
	private List<SealApplyVo> sealApplyVoList;
	private Set sealApplyDetialEntities = new HashSet(0);
	private String currentUserInfo = "";
	private Long sealApplyDetailId;
	/**
	 * 功能说明：保存申刻单位基本信息
	 * @author jacobliang
	 * @throws
	 */
	public void saveSeal(){
		try {
			sealApplyService.setHttpServletRequest(this.getHttpServletRequest());
			sealApplyVo.setCreateDate(new Date());
			sealApplyVo.setCreator((String) getHttpServletRequest().getSession().getAttribute(USER_CODE));
			sealApplyVo.setOperateUnit((String) getHttpServletRequest().getSession().getAttribute(ORGAN_NAME));
			sealApplyVo.setApprovalNum(new Date().getTime()+"");
			sealApplyVo.setSealNum(new Short("0"));
			sealApplyVo.setUnitNamePy(FirstLetter.getFirstLetters(sealApplyVo.getUnitName()));
			sealApplyVo.setStatus("0");
			sealApplyVo.setCreatorPhone((String) getHttpServletRequest().getSession().getAttribute(PHONE));

			if(sealApplyVo.getSealApplyId() != 0){
				sealApplyService.updateSealApply(sealApplyVo);
			}else {
				Long sealApplyId = sealApplyService.saveSealApply(sealApplyVo);
				sealApplyVo.setSealApplyId(sealApplyId);
			}
			this.returnSuccess("{success:true,sealApplyId:"+(sealApplyVo.getSealApplyId())+"}");
		}catch (ApplicationException e) {
			e.printStackTrace();
			this.returnFailur(e.toString());
		}catch (SystemException e) {
			e.printStackTrace();
			this.returnFailur(this.ERROR);
		}
	}

	/**
	 * 功能说明：撤销
	 * @author jacobliang
	 * @throws
	 */
	public void recall(){
		try {
			sealApplyService.setHttpServletRequest(this.getHttpServletRequest());
			sealApplyService.recall(sealApplyVo);

			this.returnSuccess();
		}catch (ApplicationException e) {
			e.printStackTrace();
			this.returnFailur(this.ERROR);
		}
	}

	/**
	 * 功能说明：管理员角色查询所有申报,否则只查询本用户所申报
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findSealapplyByCon(){
		String userCode = (String) getHttpServletRequest().getSession().getAttribute(USER_CODE);
		Long roleId = (Long) getHttpServletRequest().getSession().getAttribute(ROLE_ID);

		Map map = sealApplyService.findSealapplyByCon(getStart(), getLimit(),
				sealApplyVo.getApprovalNum(), sealApplyVo.getUnitName(), userCode, roleId.toString());
		sealApplyVoList = (List<SealApplyVo>) map.get(BUSI_LIST);
		count = (Integer) map.get(TOTAL_PROPERTY);
		return this.SUCCESS;
	}

	/**
	 * 功能说明：查询审核记录
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findSealapprovalByCon() {
		Map map = sealApplyService.findSealapprovalByCon(getStart(), getLimit(),
				sealApplyVo.getApprovalNum(), sealApplyVo.getUnitName());
		sealApplyVoList = (List<SealApplyVo>) map.get(BUSI_LIST);
		count = (Integer) map.get(TOTAL_PROPERTY);
		return this.SUCCESS;
	}


	/**
	 * 功能说明：查询单位基本信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findApplyById(){
		sealApplyEntity = sealApplyService.findApplyById(sealApplyVo.getSealApplyId());
		return SUCCESS;
	}

	/**
	 * 功能说明：查询单位基本信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findSealApplyVoById(){
		sealApplyVo = sealApplyService.findSealApplyVoById(sealApplyVo.getSealApplyId());
		return SUCCESS;
	}

	/**
	 * 功能说明：查询印章信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findSealApplyDetail(){
		SealApplyEntity sealApplyVoTemp = sealApplyService.findApplyById(sealApplyVo.getSealApplyId());
		sealApplyDetialEntities = sealApplyVoTemp.getSealApplyDetialEntities();
		return SUCCESS;
	}

	/**
	 * 功能说明：审批查询印章信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findApprovalSealApplyDetail(){
		SealApplyEntity sealApplyVoTemp = sealApplyService.findApplyById(sealApplyVo.getSealApplyId());
		Set sealApplyDetialEntitieTemp = sealApplyVoTemp.getSealApplyDetialEntities();
		if(sealApplyDetialEntitieTemp != null){
			Iterator iterator = sealApplyDetialEntitieTemp.iterator();
			while (iterator.hasNext()){
				SealApplyDetailEntity sealApplyDetailEntity = (SealApplyDetailEntity)iterator.next();
				if("0".equals(sealApplyDetailEntity.getStatus())){
					sealApplyDetialEntities.add(sealApplyDetailEntity);
				}
			}
		}

		return SUCCESS;
	}

	/**
	 * 功能说明：审批人信息
	 * @author jacobliang
	 * @return Map 1 list 2 总数
	 * @throws
	 */
	public String findApprovalPersonInfo(){

		String organName = (String) getHttpServletRequest().getSession().getAttribute(ORGAN_NAME);
		String roleName = (String) getHttpServletRequest().getSession().getAttribute(ROLE_NAME);
		String userName = (String) getHttpServletRequest().getSession().getAttribute(USER_NAME);
		String curDate = UtilTools.formatDateToYMDHMS(new Date());
		currentUserInfo = organName + "-" + roleName + "-" + userName + " "+ curDate;

		return SUCCESS;
	}

	/**
	 * 功能说明：修改单位基本信息
	 * @author jacobliang
	 * @return
	 * @throws
	 */
	public void modifySealApply(){
		try {
			sealApplyService.setHttpServletRequest(this.getHttpServletRequest());
			sealApplyVo.setCreator((String) getHttpServletRequest().getSession().getAttribute(USER_CODE));

			sealApplyService.modifySealApply(sealApplyVo);

			this.returnSuccess();
		} catch (Exception e) {
			e.printStackTrace();
			this.returnFailur(this.ERROR);
		}
	}

	/**
	 * 功能说明：更新审核意见
	 * @author jacobliang
	 * @return
	 * @throws
	 */
	public void modifySealApplyApproval(){
		try {
			sealApplyService.modifySealApplyApproval(sealApplyVo.getSealApplyId(),
					sealApplyVo.getStatus(), sealApplyVo.getRefuse());
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
	 * 功能说明：单位模块进行申报
	 * @author jacobliang
	 * @throws
	 */
	public void saveSealFromUnit(){
		try {
			sealApplyService.setHttpServletRequest(this.getHttpServletRequest());
			sealApplyVo.setCreateDate(new Date());
			sealApplyVo.setCreator((String) getHttpServletRequest().getSession().getAttribute(USER_CODE));
			sealApplyVo.setOperateUnit((String) getHttpServletRequest().getSession().getAttribute(ORGAN_NAME));
			sealApplyVo.setApprovalNum(new Date().getTime()+"");
			sealApplyVo.setSealNum(new Short("0"));
			sealApplyVo.setStatus("0");
			sealApplyVo.setCreatorPhone((String) getHttpServletRequest().getSession().getAttribute(PHONE));

			Long sealApplyId = sealApplyService.saveSealFromUnit(sealApplyVo);
			sealApplyVo.setSealApplyId(sealApplyId);

			this.returnSuccess("{success:true,sealApplyId:"+(sealApplyVo.getSealApplyId())+"}");
		}catch (ApplicationException e) {
			e.printStackTrace();
			this.returnFailur(e.toString());
		}catch (SystemException e) {
			e.printStackTrace();
			this.returnFailur(this.ERROR);
		}
	}

	private File accessoryFile;

	private String imageFileDir;

	private String imageFileName;

	public void upload(){
		String accessoryName = UtilTools.uploadFile(getHttpServletRequest(),accessoryFile,
				imageFileDir,imageFileName);
		this.returnSuccess();
	}

	@Override
	public SealApplyVo getModel() {
		return sealApplyVo;
	}

	public void setSealApplyService(SealApplyService sealApplyService) {
		this.sealApplyService = sealApplyService;
	}

	public String getSealApplyDetailEntityList() {
		return sealApplyDetailEntityList;
	}

	public void setSealApplyDetailEntityList(String sealApplyDetailEntityList) {
		this.sealApplyDetailEntityList = sealApplyDetailEntityList;
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

	public Set getSealApplyDetialEntities() {
		return sealApplyDetialEntities;
	}

	public void setSealApplyDetialEntities(Set sealApplyDetialEntities) {
		this.sealApplyDetialEntities = sealApplyDetialEntities;
	}

	public String getCurrentUserInfo() {
		return currentUserInfo;
	}

	public void setCurrentUserInfo(String currentUserInfo) {
		this.currentUserInfo = currentUserInfo;
	}

	public Long getSealApplyDetailId() {
		return sealApplyDetailId;
	}

	public void setSealApplyDetailId(Long sealApplyDetailId) {
		this.sealApplyDetailId = sealApplyDetailId;
	}

	public SealApplyEntity getSealApplyEntity() {
		return sealApplyEntity;
	}

	public void setSealApplyEntity(SealApplyEntity sealApplyEntity) {
		this.sealApplyEntity = sealApplyEntity;
	}

	public File getAccessoryFile() {
		return accessoryFile;
	}

	public void setAccessoryFile(File accessoryFile) {
		this.accessoryFile = accessoryFile;
	}

	public String getImageFileDir() {
		return imageFileDir;
	}

	public void setImageFileDir(String imageFileDir) {
		this.imageFileDir = imageFileDir;
	}

	public String getImageFileName() {
		return imageFileName;
	}

	public void setImageFileName(String imageFileName) {
		this.imageFileName = imageFileName;
	}
}
