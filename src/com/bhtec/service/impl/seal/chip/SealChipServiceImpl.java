/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 23, 2017 @3:22:30 PM
 */
package com.bhtec.service.impl.seal.chip;

import com.bhtec.dao.iface.seal.chip.SealChipDao;
import com.bhtec.domain.pojo.seal.SealChipEntity;
import com.bhtec.service.iface.seal.chip.SealChipService;
import com.bhtec.service.impl.BaseServiceImpl;
import org.apache.log4j.Logger;

import java.util.Map;

public class SealChipServiceImpl extends BaseServiceImpl implements SealChipService {
	Logger log = Logger.getLogger(this.getClass());
	private SealChipDao sealChipDao;


	@Override
	public Map findSealchipByCon(int start, int limit, String chipsn, String unitName) {
		return sealChipDao.findSealchipByCon(start,limit,chipsn,unitName);
	}

	@Override
	public void saveChip(SealChipEntity sealChipEntity) {
		sealChipDao.save(sealChipEntity);
	}

	@Override
	public boolean findChipBySn(String chipSn) {
		SealChipEntity sealChipEntity =  sealChipDao.findChipBySn(chipSn);
		return sealChipEntity==null?false:true;
	}

	@Override
	public void modifyChip(SealChipEntity sealChipEntity) {
		SealChipEntity sealChipEntityOld = sealChipDao.findChipBySn(sealChipEntity.getChipSn());
		sealChipEntityOld.setChipStatus("1");//1 芯片写入
		sealChipEntityOld.setSealTypeName(sealChipEntity.getSealTypeName());
		sealChipEntityOld.setPhone(sealChipEntity.getPhone());
		sealChipEntityOld.setSealNo(sealChipEntity.getSealNo());
		sealChipEntityOld.setSealName(sealChipEntity.getSealName());
		sealChipEntityOld.setSealApprovalUnit(sealChipEntity.getSealApprovalUnit());
		sealChipEntityOld.setSealApprovalTime(sealChipEntity.getSealApprovalTime());
		sealChipEntityOld.setSealBelongUnit(sealChipEntity.getSealBelongUnit());
		sealChipEntityOld.setUnitAddress(sealChipEntity.getUnitAddress());
		sealChipEntityOld.setSealOpIdno(sealChipEntity.getSealOpIdno());
		sealChipEntityOld.setSealOpName(sealChipEntity.getSealOpName());
	}

	public void setSealChipDao(SealChipDao sealChipDao) {
		this.sealChipDao = sealChipDao;
	}
}
