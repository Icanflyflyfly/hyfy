/**
 *功能说明：
 * @author jacobliang
 * @time @Sep 23, 2017 @3:08:56 PM
 */
package com.bhtec.dao.impl.seal.sealapply;

import com.bhtec.common.tools.UtilTools;
import com.bhtec.dao.iface.seal.sealapply.SealApplyDao;
import com.bhtec.dao.impl.BaseDaoHibImpl;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.bhtec.common.constant.Common.BUSI_LIST;
import static com.bhtec.common.constant.Common.TOTAL_PROPERTY;
import static com.bhtec.common.tools.UtilTools.isNullOrEmpty;

public class SealApplyDaoHibImpl extends BaseDaoHibImpl implements SealApplyDao {

    @Override
    public Map findSealapplyByCon(int start, int limit, String approvalNum, String unitName,String userCode,String roleId) {
        StringBuffer stringBufferSql = new StringBuffer();
        stringBufferSql
                       .append("from SealApplyEntity sealApply,SealUnitEntity sealUnit ")
                       .append("where sealApply.sealUnitId = sealUnit.sealUnitId ");
        List params = new ArrayList();
        if(!isNullOrEmpty(approvalNum)){
            stringBufferSql.append("and sealApply.approvalNum like ?");
            params.add("%"+approvalNum+"%");
        }
        if(!isNullOrEmpty(unitName)){
            stringBufferSql.append(" and sealUnit.unitName like ?");
            params.add("%"+unitName+"%");
        }
        if(!"0".equals(roleId)) {
            stringBufferSql.append(" and sealApply.creator = '" + userCode + "'");
        }

        String queryString = stringBufferSql.toString();

        String countSql = "select count(*) " + queryString;

        queryString = "select sealApply,sealUnit " + queryString+" order by sealApply.createDate desc";



        List limitModuleList =  this.findByHqlWithPagination(start, limit, queryString,params);//分页
        List<SealApplyVo> sealApplyVoList =
                new ArrayList<SealApplyVo>();
        if(limitModuleList != null){
            for(int i=0;i<limitModuleList.size();i++){
                Object[] objs = (Object[]) limitModuleList.get(i);
                SealApplyEntity sealApplyEntity = (SealApplyEntity)objs[0];
                SealUnitEntity sealUnitEntity = (SealUnitEntity)objs[1];

                SealApplyVo sealApplyVoHelper = new SealApplyVo();
                sealApplyVoHelper.setCompanyType(sealUnitEntity.getCompanyType());
                sealApplyVoHelper.setUnitName(sealUnitEntity.getUnitName());
                sealApplyVoHelper.setAddress(sealUnitEntity.getAddress());
                sealApplyVoHelper.setArea(sealUnitEntity.getArea());
                sealApplyVoHelper.setAreaName(sealUnitEntity.getAreaName());
                sealApplyVoHelper.setUnitNamePy(sealUnitEntity.getUnitNamePy());
                sealApplyVoHelper.setLicenseNo(sealUnitEntity.getLicenseNo());
                sealApplyVoHelper.setManager(sealUnitEntity.getManager());
                sealApplyVoHelper.setPhone(sealUnitEntity.getPhone());
                sealApplyVoHelper.setSealUnitId(sealUnitEntity.getSealUnitId());

                sealApplyVoHelper.setSealApplyId(sealApplyEntity.getSealApplyId());
                sealApplyVoHelper.setStatus(sealApplyEntity.getStatus());
                sealApplyVoHelper.setCreatorPhone(sealApplyEntity.getCreatorPhone());
                sealApplyVoHelper.setCreator(sealApplyEntity.getCreator());
                sealApplyVoHelper.setCreateDate(sealApplyEntity.getCreateDate());
                sealApplyVoHelper.setApplyPersonPhone(sealApplyEntity.getApplyPersonPhone());
                sealApplyVoHelper.setApplyPerson(sealApplyEntity.getApplyPerson());
                sealApplyVoHelper.setApplyMemo(sealApplyEntity.getApplyMemo());
                sealApplyVoHelper.setApprovalNum(sealApplyEntity.getApprovalNum());
                sealApplyVoHelper.setCertificateNo(sealApplyEntity.getCertificateNo());
                sealApplyVoHelper.setCertificateType(sealApplyEntity.getCertificateType());
                sealApplyVoHelper.setSealNum(sealApplyEntity.getSealNum());
                sealApplyVoHelper.setRefuse(sealApplyEntity.getRefuse());
                sealApplyVoHelper.setSealApplyDetialEntities(sealApplyEntity.getSealApplyDetialEntities());

                sealApplyVoList.add(sealApplyVoHelper);
            }
        }
        int totalProperty = getRowCount(countSql,params);//总记录数
        Map map = new HashMap();
        map.put(TOTAL_PROPERTY, totalProperty);
        map.put(BUSI_LIST, sealApplyVoList);
        return map;
    }

    @Override
    public List<SealUnitEntity> findSealUnitNameByPy(String unitNamePy) {
        String queryString = "from SealUnitEntity sealApply " +
                             "where sealApply.unitNamePy like ? "+
                             "order by sealApply.sealUnitId desc";

        List<SealUnitEntity> limitModuleList =  findByPropertyWithParas(queryString,new String[]{"%"+unitNamePy+"%"});

        return limitModuleList;
    }

    @Override
    public void deleteAfficheByIds(List<Long> sealDetailIdList) {
        String sealDetails = "";
        for(Long sealDetailId:sealDetailIdList){
            sealDetails = "".equals(sealDetails)?sealDetailId.toString():sealDetails+","+sealDetailId.toString();

        }
        String hqlString = "delete from SealApplyDetailEntity sad " +
                "where sad.sealApplyDetailId in ("+sealDetails+")";
        this.excuteHql(hqlString);
    }

    @Override
    public Map findSealapprovalByCon(int start, int limit, String approvalNum, String unitName) {

        StringBuffer stringBufferSql = new StringBuffer();
        stringBufferSql
                .append("from SealApplyEntity sealApply,SealUnitEntity sealUnit ")
                .append("where sealApply.sealUnitId = sealUnit.sealUnitId ")
                .append("and sealApply.status in ('0','3')");

        List params = new ArrayList();
        if(!isNullOrEmpty(approvalNum)){
            stringBufferSql.append("and sealApply.approvalNum like ?");
            params.add("%"+approvalNum+"%");
        }
        if(!isNullOrEmpty(unitName)){
            stringBufferSql.append(" and sealUnit.unitName like ?");
            params.add("%"+unitName+"%");
        }

        String queryString = stringBufferSql.toString();

        String countSql = "select count(*) " + queryString;

        queryString = "select sealApply,sealUnit " + queryString+" order by sealApply.createDate desc";

        List limitModuleList =  this.findByHqlWithPagination(start, limit, queryString,params);//分页
        List<SealApplyVo> sealApplyVoList =
                new ArrayList<SealApplyVo>();
        if(limitModuleList != null){
            for(int i=0;i<limitModuleList.size();i++){
                Object[] objs = (Object[]) limitModuleList.get(i);
                SealApplyEntity sealApplyEntity = (SealApplyEntity)objs[0];
                SealUnitEntity sealUnitEntity = (SealUnitEntity)objs[1];

                SealApplyVo sealApplyVoHelper = new SealApplyVo();
                sealApplyVoHelper.setCompanyType(sealUnitEntity.getCompanyType());
                sealApplyVoHelper.setUnitName(sealUnitEntity.getUnitName());
                sealApplyVoHelper.setAddress(sealUnitEntity.getAddress());
                sealApplyVoHelper.setArea(sealUnitEntity.getArea());
                sealApplyVoHelper.setAreaName(sealUnitEntity.getAreaName());
                sealApplyVoHelper.setUnitNamePy(sealUnitEntity.getUnitNamePy());
                sealApplyVoHelper.setLicenseNo(sealUnitEntity.getLicenseNo());
                sealApplyVoHelper.setManager(sealUnitEntity.getManager());
                sealApplyVoHelper.setPhone(sealUnitEntity.getPhone());
                sealApplyVoHelper.setSealUnitId(sealUnitEntity.getSealUnitId());

                sealApplyVoHelper.setSealApplyId(sealApplyEntity.getSealApplyId());
                sealApplyVoHelper.setStatus(sealApplyEntity.getStatus());
                sealApplyVoHelper.setCreatorPhone(sealApplyEntity.getCreatorPhone());
                sealApplyVoHelper.setCreator(sealApplyEntity.getCreator());
                sealApplyVoHelper.setCreateDate(sealApplyEntity.getCreateDate());
                sealApplyVoHelper.setApplyPersonPhone(sealApplyEntity.getApplyPersonPhone());
                sealApplyVoHelper.setApplyPerson(sealApplyEntity.getApplyPerson());
                sealApplyVoHelper.setApplyMemo(sealApplyEntity.getApplyMemo());
                sealApplyVoHelper.setApprovalNum(sealApplyEntity.getApprovalNum());
                sealApplyVoHelper.setCertificateNo(sealApplyEntity.getCertificateNo());
                sealApplyVoHelper.setCertificateType(sealApplyEntity.getCertificateType());
                sealApplyVoHelper.setSealNum(sealApplyEntity.getSealNum());
                sealApplyVoHelper.setRefuse(sealApplyEntity.getRefuse());
                sealApplyVoHelper.setSealApplyDetialEntities(sealApplyEntity.getSealApplyDetialEntities());
                sealApplyVoHelper.setS0(sealApplyEntity.getS0());
                sealApplyVoHelper.setS1(sealApplyEntity.getS1());
                sealApplyVoHelper.setS2(sealApplyEntity.getS2());
                sealApplyVoHelper.setS3(sealApplyEntity.getS3());
                sealApplyVoHelper.setS4(sealApplyEntity.getS4());

                sealApplyVoHelper.setP0(sealApplyEntity.getP0());
                sealApplyVoHelper.setP1(sealApplyEntity.getP1());
                sealApplyVoHelper.setP2(sealApplyEntity.getP2());
                sealApplyVoHelper.setP3(sealApplyEntity.getP3());
                sealApplyVoHelper.setP4(sealApplyEntity.getP4());

                sealApplyVoList.add(sealApplyVoHelper);
            }
        }
        int totalProperty = getRowCount(countSql,params);//总记录数
        Map map = new HashMap();
        map.put(TOTAL_PROPERTY, totalProperty);
        map.put(BUSI_LIST, sealApplyVoList);
        return map;
    }

    @Override
    public Map findUnitByCon(int start, int limit, String unitName) {
        String queryString = "from SealUnitEntity sealUnitEntity where 0 = 0 ";
        List params = new ArrayList();

        if(!isNullOrEmpty(unitName)){
            queryString += " and sealUnitEntity.unitName like ?";
            params.add("%"+unitName+"%");
        }

        String countSql = "select count(*) " + queryString;
        queryString += " order by sealUnitEntity.createDate desc";
        List<SealApplyEntity> limitModuleList =  this.findByHqlWithPagination(start, limit, queryString,params);//分页
        int totalProperty = this.getRowCount(countSql,params);//总记录数
        Map map = new HashMap();
        map.put(TOTAL_PROPERTY, totalProperty);
        map.put(BUSI_LIST, limitModuleList);
        return map;
    }

    @Override
    public SealUnitEntity findUnitByName(String unitName) {
        String queryString = "from SealUnitEntity sealUnit " +
                            "where sealUnit.unitName = ? ";

        List list = findByPropertyWithParas(queryString,new String[]{unitName});
        if(!UtilTools.isNull(list) && list.size()>0){
            return (SealUnitEntity)list.get(0);
        }

        return null;
    }

    @Override
    public SealApplyVo findSealApplyVoById(long sealApplyId) {
        String hql = "select sealApply,sealUnit from SealApplyEntity sealApply,SealUnitEntity sealUnit " +
                     "where sealApply.sealUnitId = sealUnit.sealUnitId " +
                     "and sealApply.sealApplyId = ?";
        List list = findByPropertyWithParas(hql,new Long[]{sealApplyId});
        if(list != null){
            Object[] objs = (Object[]) list.get(0);
            SealApplyEntity sealApplyEntity = (SealApplyEntity)objs[0];
            SealUnitEntity sealUnitEntity = (SealUnitEntity)objs[1];

            SealApplyVo sealApplyVoHelper = new SealApplyVo();
            sealApplyVoHelper.setSealUnitId(sealUnitEntity.getSealUnitId());
            sealApplyVoHelper.setCompanyType(sealUnitEntity.getCompanyType());
            sealApplyVoHelper.setUnitName(sealUnitEntity.getUnitName());
            sealApplyVoHelper.setAddress(sealUnitEntity.getAddress());
            sealApplyVoHelper.setArea(sealUnitEntity.getArea());
            sealApplyVoHelper.setAreaName(sealUnitEntity.getAreaName());
            sealApplyVoHelper.setUnitNamePy(sealUnitEntity.getUnitNamePy());
            sealApplyVoHelper.setLicenseNo(sealUnitEntity.getLicenseNo());
            sealApplyVoHelper.setManager(sealUnitEntity.getManager());
            sealApplyVoHelper.setPhone(sealUnitEntity.getPhone());

            sealApplyVoHelper.setSealApplyId(sealApplyEntity.getSealApplyId());
            sealApplyVoHelper.setStatus(sealApplyEntity.getStatus());
            sealApplyVoHelper.setCreatorPhone(sealApplyEntity.getCreatorPhone());
            sealApplyVoHelper.setCreator(sealApplyEntity.getCreator());
            sealApplyVoHelper.setCreateDate(sealApplyEntity.getCreateDate());
            sealApplyVoHelper.setApplyPersonPhone(sealApplyEntity.getApplyPersonPhone());
            sealApplyVoHelper.setApplyPerson(sealApplyEntity.getApplyPerson());
            sealApplyVoHelper.setApplyMemo(sealApplyEntity.getApplyMemo());
            sealApplyVoHelper.setApprovalNum(sealApplyEntity.getApprovalNum());
            sealApplyVoHelper.setCertificateNo(sealApplyEntity.getCertificateNo());
            sealApplyVoHelper.setCertificateType(sealApplyEntity.getCertificateType());
            sealApplyVoHelper.setSealNum(sealApplyEntity.getSealNum());
            sealApplyVoHelper.setRefuse(sealApplyEntity.getRefuse());
            return sealApplyVoHelper;
        }
        return null;
    }
}
