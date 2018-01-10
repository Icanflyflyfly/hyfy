/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 23, 2017 @3:22:30 PM
 */
package com.bhtec.service.impl.seal.sealapply;

import com.bhtec.common.tools.FirstLetter;
import com.bhtec.dao.iface.seal.sealapply.SealApplyDao;
import com.bhtec.domain.pojo.platform.SysplDicSmallType;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.exception.ApplicationException;
import com.bhtec.service.iface.platform.TypeDictionary.TypeDictionaryService;
import com.bhtec.service.iface.seal.sealapply.SealApplyService;
import com.bhtec.service.impl.BaseServiceImpl;
import org.apache.log4j.Logger;

import java.util.*;

import static com.bhtec.common.constant.Common.BUSI_LIST;
import static com.bhtec.common.constant.Common.DELETE_OPT;
import static com.bhtec.common.constant.Common.LOG_LEVEL_THIRD;
import static com.bhtec.common.constant.ServiceVariable.*;

public class SealApplyServiceImpl extends BaseServiceImpl implements SealApplyService {
	Logger log = Logger.getLogger(this.getClass());
	private SealApplyDao sealApplyDao;
	private TypeDictionaryService typeDictionaryService;

	/**
	 * sealApplyVo 为印章参数
	 * @param sealApplyVo
	 * @throws ApplicationException
     */
	@Override
	public Long saveSealApply(SealApplyVo sealApplyVo) throws ApplicationException {
		SealUnitEntity sealUnitEntity = sealApplyDao.findUnitByName(sealApplyVo.getUnitName());
		Long unitId = null;
		if(sealUnitEntity != null){//有同名单位则更新,否则增加
			unitId = sealUnitEntity.getSealUnitId();
			sealUnitEntity.setUnitName(sealApplyVo.getUnitName());
			sealUnitEntity.setUnitNamePy(sealApplyVo.getUnitNamePy());
			sealUnitEntity.setCompanyType(sealApplyVo.getCompanyType());
			sealUnitEntity.setArea(sealApplyVo.getArea());
			sealUnitEntity.setLicenseNo(sealApplyVo.getLicenseNo());
			sealUnitEntity.setManager(sealApplyVo.getManager());
			sealUnitEntity.setPhone(sealApplyVo.getPhone());
			sealUnitEntity.setAddress(sealApplyVo.getAddress());
			sealUnitEntity.setAreaName(sealApplyVo.getAreaName());
		}else{
			sealUnitEntity = new SealUnitEntity();
			sealUnitEntity.setUnitName(sealApplyVo.getUnitName());
			sealUnitEntity.setUnitNamePy(sealApplyVo.getUnitNamePy());
			sealUnitEntity.setCompanyType(sealApplyVo.getCompanyType());
			sealUnitEntity.setArea(sealApplyVo.getArea());
			sealUnitEntity.setLicenseNo(sealApplyVo.getLicenseNo());
			sealUnitEntity.setManager(sealApplyVo.getManager());
			sealUnitEntity.setPhone(sealApplyVo.getPhone());
			sealUnitEntity.setAddress(sealApplyVo.getAddress());
			sealUnitEntity.setAreaName(sealApplyVo.getAreaName());
			sealUnitEntity.setCreator(sealApplyVo.getCreator());
			sealUnitEntity.setStatus(sealApplyVo.getStatus());
			sealUnitEntity.setCreateDate(sealApplyVo.getCreateDate());
			sealUnitEntity.setStatus("1");

			unitId = sealApplyDao.save(sealUnitEntity);
		}
		//保存印章实体
		com.bhtec.domain.pojo.seal.SealApplyEntity sealApplyEntity1 = new com.bhtec.domain.pojo.seal.SealApplyEntity();
		sealApplyEntity1.setCertificateType(sealApplyVo.getCertificateType());
		sealApplyEntity1.setCertificateNo(sealApplyVo.getCertificateNo());
		sealApplyEntity1.setCreator(sealApplyVo.getCreator());
		sealApplyEntity1.setApprovalNum(sealApplyVo.getApprovalNum());
		sealApplyEntity1.setApplyMemo(sealApplyVo.getApplyMemo());
		sealApplyEntity1.setStatus(sealApplyVo.getStatus());
		sealApplyEntity1.setOperateUnit(sealApplyVo.getOperateUnit());
		sealApplyEntity1.setApplyPerson(sealApplyVo.getApplyPerson());
		sealApplyEntity1.setApplyPersonPhone(sealApplyVo.getApplyPersonPhone());
		sealApplyEntity1.setCreatorPhone(sealApplyVo.getCreatorPhone());
		sealApplyEntity1.setSealUnitId(unitId);
		sealApplyEntity1.setCreateDate(new Date());
		sealApplyEntity1.setSealNum(new Short("0"));

		sealApplyEntity1.setS0(sealApplyVo.getS0());
		sealApplyEntity1.setS1(sealApplyVo.getS1());
		sealApplyEntity1.setS2(sealApplyVo.getS2());
		sealApplyEntity1.setS3(sealApplyVo.getS3());
		sealApplyEntity1.setS4(sealApplyVo.getS4());

		sealApplyEntity1.setP0(sealApplyVo.getP0());
		sealApplyEntity1.setP1(sealApplyVo.getP1());
		sealApplyEntity1.setP2(sealApplyVo.getP2());
		sealApplyEntity1.setP3(sealApplyVo.getP3());
		sealApplyEntity1.setP4(sealApplyVo.getP4());


		StringBuffer logContent = new StringBuffer();
		logContent.append("印章申报添加");
		saveLog(LOG_LEVEL_THIRD, SEAL_APPLY_MGR,"印章申报添加",logContent.toString(), sealApplyVo.getSealApplyId()+"");

		return sealApplyDao.save(sealApplyEntity1);
	}

	@Override
	public Map findSealapplyByCon(int start, int limit, String approvalNum, String unitName,String userCode,String roleId) {
		return sealApplyDao.findSealapplyByCon(start, limit, approvalNum, unitName,userCode,roleId);
	}

	@Override
	public void saveSealApplyDetail(SealApplyDetailEntity sealApplyDetailEntity) throws ApplicationException {
		sealApplyDao.save(sealApplyDetailEntity);
		com.bhtec.domain.pojo.seal.SealApplyEntity sealApplyEntityOld = (com.bhtec.domain.pojo.seal.SealApplyEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealApplyEntity",
				sealApplyDetailEntity.getSealApplyEntity().getSealApplyId());
		short s = 1;
		sealApplyEntityOld.setSealNum((short)(sealApplyEntityOld.getSealNum().shortValue()+s));
	}

	@Override
	public List<SealUnitEntity> findSealUnitNameByPy(String unitNamePy) {
		return sealApplyDao.findSealUnitNameByPy(unitNamePy);
	}

	@Override
	public void updateSealApply(SealApplyVo sealApplyVo) throws ApplicationException{
//		sealApplyDao.update(sealApplyEntity);
	}

	@Override
	public void recall(SealApplyVo sealApplyVo) throws ApplicationException{
		SealApplyEntity sealApplyVoOld = (SealApplyEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealApplyEntity", sealApplyVo.getSealApplyId());
		sealApplyVoOld.setStatus(sealApplyVo.getStatus());

		StringBuffer logContent = new StringBuffer();
		logContent.append("印章申报撤销");
		saveLog(LOG_LEVEL_THIRD, SEAL_APPLY_MGR,"印章申报撤销",logContent.toString(), sealApplyVo.getSealApplyId()+"");
	}

	@Override
	public SealApplyEntity findApplyById(long sealApplyId) {
		SealApplyEntity sealApplyVoOld = (SealApplyEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealApplyEntity",sealApplyId);
		return sealApplyVoOld;
	}

	@Override
	public SealApplyVo findSealApplyVoById(long sealApplyId) {

		return sealApplyDao.findSealApplyVoById(sealApplyId);
	}

	@Override
	public void modifySealApply(SealApplyVo sealApplyVo)  throws ApplicationException{
		SealApplyEntity sealApplyEntity1 = (SealApplyEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealApplyEntity", sealApplyVo.getSealApplyId());

		sealApplyEntity1.setCertificateType(sealApplyVo.getCertificateType());
		sealApplyEntity1.setCertificateNo(sealApplyVo.getCertificateNo());
		sealApplyEntity1.setApplyMemo(sealApplyVo.getApplyMemo());
		sealApplyEntity1.setStatus("0");//未审核
		sealApplyEntity1.setOperateUnit(sealApplyVo.getOperateUnit());
		sealApplyEntity1.setApplyPerson(sealApplyVo.getApplyPerson());
		sealApplyEntity1.setApplyPersonPhone(sealApplyVo.getApplyPersonPhone());
		sealApplyEntity1.setCreatorPhone(sealApplyVo.getCreatorPhone());

		SealUnitEntity sealUnitEntity = (SealUnitEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealUnitEntity", sealApplyVo.getSealUnitId());
		sealUnitEntity.setUnitName(sealApplyVo.getUnitName());
		sealUnitEntity.setUnitNamePy(FirstLetter.getFirstLetters(sealApplyVo.getUnitName()));
		sealUnitEntity.setCompanyType(sealApplyVo.getCompanyType());
		sealUnitEntity.setArea(sealApplyVo.getArea());
		sealUnitEntity.setLicenseNo(sealApplyVo.getLicenseNo());
		sealUnitEntity.setManager(sealApplyVo.getManager());
		sealUnitEntity.setPhone(sealApplyVo.getPhone());
		sealUnitEntity.setAddress(sealApplyVo.getAddress());
		sealUnitEntity.setAreaName(sealApplyVo.getAreaName());

		StringBuffer logContent = new StringBuffer();
		logContent.append("印章申报单位信息修改");
		saveLog(LOG_LEVEL_THIRD, SEAL_APPLY_MGR,"印章申报单位信息修改",logContent.toString(), sealApplyVo.getSealApplyId()+"");
	}

	@Override
	public void modifySealApplyDetail(SealApplyDetailEntity sealApplyDetailEntity) throws ApplicationException {
		SealApplyDetailEntity sealApplyDetailEntityOld = (SealApplyDetailEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealApplyDetailEntity",sealApplyDetailEntity.getSealApplyDetailId());
		sealApplyDetailEntityOld.setSealType(sealApplyDetailEntity.getSealType());
		sealApplyDetailEntityOld.setSealName(sealApplyDetailEntity.getSealName());
		sealApplyDetailEntityOld.setSealSpecification(sealApplyDetailEntity.getSealSpecification());
		sealApplyDetailEntityOld.setBingkanType(sealApplyDetailEntity.getBingkanType());
		sealApplyDetailEntityOld.setBingkanInfo(sealApplyDetailEntity.getBingkanInfo());
		sealApplyDetailEntityOld.setZhongkanType(sealApplyDetailEntity.getZhongkanType());
		sealApplyDetailEntityOld.setWord1(sealApplyDetailEntity.getWord1());
		sealApplyDetailEntityOld.setWord2(sealApplyDetailEntity.getWord2());
		sealApplyDetailEntityOld.setWord3(sealApplyDetailEntity.getWord3());
		sealApplyDetailEntityOld.setWord4(sealApplyDetailEntity.getWord4());
		sealApplyDetailEntityOld.setWord5(sealApplyDetailEntity.getWord5());
		sealApplyDetailEntityOld.setWord6(sealApplyDetailEntity.getWord6());
		sealApplyDetailEntityOld.setSealMaterial(sealApplyDetailEntity.getSealMaterial());
		sealApplyDetailEntityOld.setOilType(sealApplyDetailEntity.getOilType());

		StringBuffer logContent = new StringBuffer();
		logContent.append("印章信息修改");
		saveLog(LOG_LEVEL_THIRD, SEAL_APPLY_MGR,"印章信息修改",logContent.toString(), sealApplyDetailEntity.getSealApplyDetailId().toString());
	}

	@Override
	public void deleteSealApplyDetail(List<Long> sealDetailIdList,Long sealApplyId) {
		sealApplyDao.deleteAfficheByIds(sealDetailIdList);

		SealApplyEntity sealApplyEntityOld = (SealApplyEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealApplyEntity",
				sealApplyId);
		short s = 1;
		sealApplyEntityOld.setSealNum((short)(sealApplyEntityOld.getSealNum().shortValue()-s));

		StringBuffer optContent = new StringBuffer();
		optContent.append("删除的印章ID："+sealDetailIdList);
		try {
			this.saveLog(LOG_LEVEL_THIRD, SYS_AFFICHE, DELETE_OPT, optContent.toString(),
                    "");
		} catch (ApplicationException e) {
			e.printStackTrace();
		}
	}

	@Override
	public Map findSealapprovalByCon(int start, int limit, String approvalNum, String unitName) {
		return sealApplyDao.findSealapprovalByCon(start, limit, approvalNum, unitName);
	}

	@Override
	public void modifySealApplyApproval(long sealApplyId, String status,String refuse) throws ApplicationException {
		SealApplyEntity sealApplyVoOld =
				(SealApplyEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealApplyEntity",sealApplyId);
		if("1".equals(status)) {//通过
			sealApplyVoOld.setStatus("2");
			//印章明细状态
			Set sealApplyDetailEntities = sealApplyVoOld.getSealApplyDetialEntities();
			if(sealApplyDetailEntities != null){
				Iterator iterator = sealApplyDetailEntities.iterator();
				while(iterator.hasNext()){
					SealApplyDetailEntity sealApplyDetailEntityOld = (SealApplyDetailEntity)iterator.next();
					sealApplyDetailEntityOld.setStatus("1");
				}
			}
		}else{
			sealApplyVoOld.setStatus("1");
		}
		refuse = sealApplyVoOld.getRefuse()==null?refuse:sealApplyVoOld.getRefuse()+"<br>"+refuse;
		sealApplyVoOld.setRefuse(refuse);

		StringBuffer logContent = new StringBuffer();
		logContent.append("印章申报审批");
//		saveLog(LOG_LEVEL_THIRD, SEAL_APPLY_MGR,"印章申报审批",logContent.toString(), sealApplyId+"");

	}

	@Override
	public Map findUnitByCon(int start, int limit, String unitName) {
		List<SysplDicSmallType> sysplDicSmallTypeList = typeDictionaryService.findSmallTypeDicByBigTypeCode(COMPANY_TYPE);
		Map map =  sealApplyDao.findUnitByCon(start, limit,  unitName);
		//查询公司类型
		List<SealUnitEntity> sealApsplyEntityList = (List<SealUnitEntity>)map.get(BUSI_LIST);
		for(SealUnitEntity sealUnitEntity :sealApsplyEntityList){
			String companyType = sealUnitEntity.getCompanyType();
			for(SysplDicSmallType sysplDicSmallType:sysplDicSmallTypeList){
				if(companyType.equalsIgnoreCase(sysplDicSmallType.getSmallTypeCode())){
					sealUnitEntity.setCompanyType(sysplDicSmallType.getSmallTypeName());
					break;
				}
			}
		}

		return map;
	}

	@Override
	public SealUnitEntity findUnitById(long sealUnitId) {
		return (SealUnitEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealUnitEntity",sealUnitId);
	}

	@Override
	public void modifyUnitById(SealUnitEntity sealUnitEntity) {
		SealUnitEntity sealUnitEntityOld = findUnitById(sealUnitEntity.getSealUnitId());
		sealUnitEntityOld.setUnitName(sealUnitEntity.getUnitName());
		sealUnitEntityOld.setUnitNamePy(FirstLetter.getFirstLetters(sealUnitEntity.getUnitName()));
		sealUnitEntityOld.setCompanyType(sealUnitEntity.getCompanyType());
		sealUnitEntityOld.setArea(sealUnitEntity.getArea());
		sealUnitEntityOld.setLicenseNo(sealUnitEntity.getLicenseNo());
		sealUnitEntityOld.setManager(sealUnitEntity.getManager());
		sealUnitEntityOld.setPhone(sealUnitEntity.getPhone());
		sealUnitEntityOld.setAddress(sealUnitEntity.getAddress());
		sealUnitEntityOld.setAreaName(sealUnitEntity.getAreaName());
	}

	@Override
	public void delUnitById(long sealUnitId) {
		sealApplyDao.delete(findUnitById(sealUnitId));
	}

	@Override
	public Long saveSealFromUnit(SealApplyVo sealApplyVo) throws ApplicationException {

		//保存印章实体
		com.bhtec.domain.pojo.seal.SealApplyEntity sealApplyEntity1 = new com.bhtec.domain.pojo.seal.SealApplyEntity();
		sealApplyEntity1.setCertificateType(sealApplyVo.getCertificateType());
		sealApplyEntity1.setCertificateNo(sealApplyVo.getCertificateNo());
		sealApplyEntity1.setCreator(sealApplyVo.getCreator());
		sealApplyEntity1.setApprovalNum(sealApplyVo.getApprovalNum());
		sealApplyEntity1.setApplyMemo(sealApplyVo.getApplyMemo()==null?"":sealApplyVo.getApplyMemo());
		sealApplyEntity1.setStatus(sealApplyVo.getStatus());
		sealApplyEntity1.setOperateUnit(sealApplyVo.getOperateUnit());
		sealApplyEntity1.setApplyPerson(sealApplyVo.getApplyPerson());
		sealApplyEntity1.setApplyPersonPhone(sealApplyVo.getApplyPersonPhone());
		sealApplyEntity1.setCreatorPhone(sealApplyVo.getCreatorPhone());
		sealApplyEntity1.setSealUnitId(sealApplyVo.getSealUnitId());
		sealApplyEntity1.setCreateDate(new Date());
		sealApplyEntity1.setSealNum(new Short("0"));

		StringBuffer logContent = new StringBuffer();
		logContent.append("印章申报添加");
		saveLog(LOG_LEVEL_THIRD, SEAL_APPLY_MGR,"印章申报添加",logContent.toString(), sealApplyVo.getSealApplyId()+"");

		return sealApplyDao.save(sealApplyEntity1);
	}

	@Override
	public void modifyUnitStatus(SealUnitEntity sealUnitEntity) {
		SealUnitEntity sealUnitEntityOld =
				(SealUnitEntity)sealApplyDao.getPojoById("com.bhtec.domain.pojo.seal.SealUnitEntity",sealUnitEntity.getSealUnitId());
		sealUnitEntityOld.setStatus(sealUnitEntity.getStatus());
	}

	public void setSealApplyDao(SealApplyDao sealApplyDao) {
		this.sealApplyDao = sealApplyDao;
	}

	public void setTypeDictionaryService(TypeDictionaryService typeDictionaryService) {
		this.typeDictionaryService = typeDictionaryService;
	}
}
