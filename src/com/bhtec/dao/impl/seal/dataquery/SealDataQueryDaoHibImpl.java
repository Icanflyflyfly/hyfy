package com.bhtec.dao.impl.seal.dataquery;

import com.bhtec.common.tools.DateUtil;
import com.bhtec.dao.iface.seal.dataquery.SealDataQueryDao;
import com.bhtec.dao.impl.BaseDaoHibImpl;
import com.bhtec.domain.pojo.seal.SealApplyDetailEntity;
import com.bhtec.domain.pojo.seal.SealApplyEntity;
import com.bhtec.domain.pojo.seal.SealUnitEntity;
import com.bhtec.domain.pojo.uum.UumUser;
import com.bhtec.domain.pojohelper.seal.SealApplyVo;
import com.bhtec.domain.pojohelper.seal.SealUnitVo;
import com.bhtec.domain.pojohelper.seal.SealVo;

import java.util.*;

import static com.bhtec.common.constant.Common.BUSI_LIST;
import static com.bhtec.common.constant.Common.TOTAL_PROPERTY;
import static com.bhtec.common.tools.UtilTools.isNullOrEmpty;

/**
 * 功能说明：
 *
 * @auther liubf
 * @date 2017/10/6
 * @throws
 */
public class SealDataQueryDaoHibImpl extends BaseDaoHibImpl implements SealDataQueryDao {

    @Override
    public SealApplyDetailEntity findSealApplyDetailById(Long sealApplyDetailId) {
        String queryString = "from SealApplyDetailEntity sealDetail " +
                "where sealDetail.sealApplyDetailId = "+sealApplyDetailId;


        return (SealApplyDetailEntity)this.getSingleRowRecord(queryString);
    }

    @Override
    public Map exportSealListByCon(SealVo sealVo) {
        StringBuffer stringBufferSql = new StringBuffer();
        stringBufferSql.append("from SealApplyDetailEntity detail ")
                       .append("left join detail.sealApplyEntity sealApply ")
                       .append("where sealApply.status in ('0','3')");

        List params = new ArrayList();
        if(!isNullOrEmpty(sealVo.getApprovalNum())){
            stringBufferSql.append("and sealApply.approvalNum like ?");
            params.add("%"+sealVo.getApprovalNum()+"%");
        }
        if(!isNullOrEmpty(sealVo.getUnitName())){
            stringBufferSql.append(" and sealUnit.unitName like ?");
            params.add("%"+sealVo.getUnitName()+"%");
        }

        String queryString = stringBufferSql.toString();
        queryString = "select detail,sealApply " + queryString+" order by sealApply.approvalNum desc";

        List dataList =  this.findByPropertyWithParas(queryString,params.toArray());
        List<String[]> sealList = new ArrayList<String[]>();
        if(dataList != null && dataList.size()>0){
            for(int i=0;i<dataList.size();i++){
                Object[] objs = (Object[]) dataList.get(i);
                SealApplyDetailEntity sealApplyDetailEntity = (SealApplyDetailEntity)objs[0];
                SealApplyEntity sealApplyEntity = (SealApplyEntity)objs[1];
                SealUnitEntity sealUnitEntity = (SealUnitEntity) this.getPojoById("com.bhtec.domain.pojo.seal.SealUnitEntity",sealApplyEntity.getSealUnitId());

                String[] str = new String[11];

                str[0]=sealApplyEntity.getApprovalNum();
                str[1]=sealApplyDetailEntity.getSealName();

                if("0".equals(sealApplyDetailEntity.getStatus())){
                    str[2]="未审核";
                }else if("1".equals(sealApplyDetailEntity.getStatus())){
                    str[2]="审核未通过";
                }else if("2".equals(sealApplyDetailEntity.getStatus())){
                    str[2]="审核通过";
                }else if("4".equals(sealApplyDetailEntity.getStatus())){
                    str[2]="撤销";
                }
                str[3]=sealApplyDetailEntity.getSealType();
                str[4]=sealApplyDetailEntity.getSealSpecification();
                str[5]=sealApplyEntity.getApprovalUnit();
                str[6]=sealUnitEntity.getUnitName();
                str[7]=sealApplyEntity.getCreator();
                str[8]=sealApplyEntity.getCertificateNo();
                str[9]=DateUtil.dateToString(sealApplyEntity.getApprovalTime(),"yyyy-MM-dd");
                str[10]=sealApplyDetailEntity.getSealMaterial();

                sealList.add(str);
            }
        }

        Map map = new HashMap();
        map.put("DATA", sealList);
        return map;
    }

    @Override
    public Map findSealListByCon(int start, int limit, SealVo sealVo) {
        StringBuffer stringBufferSql = new StringBuffer();
        stringBufferSql
                .append("from SealApplyDetailEntity detail ")
                .append("left join detail.sealApplyEntity sealApply ")
                .append("where sealApply.status in ('0','3')");

        List params = new ArrayList();
        if(!isNullOrEmpty(sealVo.getApprovalNum())){
            stringBufferSql.append("and sealApply.approvalNum like ?");
            params.add("%"+sealVo.getApprovalNum()+"%");
        }
        if(!isNullOrEmpty(sealVo.getSealName())){
            stringBufferSql.append(" and detail.sealName like ?");
            params.add("%"+sealVo.getSealName()+"%");
        }

        String queryString = stringBufferSql.toString();

        String countSql = "select count(*) " + queryString;
        //,sealUnit
        queryString = "select detail,sealApply " + queryString+" order by sealApply.approvalNum desc";

        List limitModuleList =  this.findByHqlWithPagination(start, limit, queryString,params);//分页
        List<SealVo> sealVoList = new ArrayList<SealVo>();
        if(limitModuleList != null){
            for(int i=0;i<limitModuleList.size();i++){
                Object[] objs = (Object[]) limitModuleList.get(i);
                SealApplyDetailEntity sealApplyDetailEntity = (SealApplyDetailEntity)objs[0];
                SealApplyEntity sealApplyEntity = (SealApplyEntity)objs[1];
                SealUnitEntity sealUnitEntity = (SealUnitEntity) this.getPojoById("com.bhtec.domain.pojo.seal.SealUnitEntity",sealApplyEntity.getSealUnitId());

                SealVo vo = new SealVo();
                vo.setApprovalTime(DateUtil.dateToString(sealApplyEntity.getApprovalTime(),"yyyy-MM-dd"));
                vo.setApprovalNum(sealApplyEntity.getApprovalNum());
                vo.setSealApplyDetailId(sealApplyDetailEntity.getSealApplyDetailId());
                vo.setSealApplyId(sealApplyEntity.getSealApplyId());
                vo.setSealMaterial(sealApplyDetailEntity.getSealMaterial());
                vo.setSealType(sealApplyDetailEntity.getSealType());
                vo.setSealUnitId(sealUnitEntity.getSealUnitId());
                vo.setStatus(sealApplyDetailEntity.getStatus());
                vo.setUnitName(sealUnitEntity.getUnitName());
                vo.setSealName(sealApplyDetailEntity.getSealName());
                sealVoList.add(vo);
            }
        }
        int totalProperty = getRowCount(countSql,params);//总记录数
        Map map = new HashMap();
        map.put(TOTAL_PROPERTY, totalProperty);
        map.put(BUSI_LIST, sealVoList);
        return map;
    }

    @Override
    public Map findSealApprovalListByCon(int start, int limit, SealApplyVo sealApplyVo) {
        StringBuffer stringBufferSql = new StringBuffer();
        stringBufferSql
                .append("from SealApplyEntity sealApply,SealUnitEntity sealUnit ")
                .append("where sealApply.sealUnitId = sealUnit.sealUnitId ")
                .append("and sealApply.status in ('1','2')");

        List params = new ArrayList();
        if(!isNullOrEmpty(sealApplyVo.getApprovalNum())){
            stringBufferSql.append("and sealApply.approvalNum like ?");
            params.add("%"+sealApplyVo.getApprovalNum()+"%");
        }
        if(!isNullOrEmpty(sealApplyVo.getUnitName())){
            stringBufferSql.append(" and sealUnit.unitName like ?");
            params.add("%"+sealApplyVo.getUnitName()+"%");
        }
        if(!isNullOrEmpty(sealApplyVo.getStatus())){
            stringBufferSql.append(" and sealApply.status = ?");
            params.add(sealApplyVo.getStatus());
        }


        String queryString = stringBufferSql.toString();

        String countSql = "select count(*) " + queryString;

        queryString = "select sealApply,sealUnit " + queryString+" order by sealApply.createDate desc";

        List limitModuleList =  this.findByHqlWithPagination(start, limit, queryString,params);//分页
        List<SealApplyVo> sealApplyVoList = new ArrayList<SealApplyVo>();
        if(limitModuleList != null){
            for(int i=0;i<limitModuleList.size();i++){
                Object[] objs = (Object[]) limitModuleList.get(i);
                SealApplyEntity sealApplyEntity = (SealApplyEntity)objs[0];
                SealUnitEntity sealUnitEntity = (SealUnitEntity)objs[1];

                SealApplyVo vo = new SealApplyVo();
                vo.setCompanyType(sealUnitEntity.getCompanyType());
                vo.setUnitName(sealUnitEntity.getUnitName());
                vo.setAddress(sealUnitEntity.getAddress());
                vo.setArea(sealUnitEntity.getArea());
                vo.setAreaName(sealUnitEntity.getAreaName());
                vo.setUnitNamePy(sealUnitEntity.getUnitNamePy());
                vo.setLicenseNo(sealUnitEntity.getLicenseNo());
                vo.setManager(sealUnitEntity.getManager());
                vo.setPhone(sealUnitEntity.getPhone());
                vo.setSealUnitId(sealUnitEntity.getSealUnitId());

                vo.setSealApplyId(sealApplyEntity.getSealApplyId());
                vo.setStatus(sealApplyEntity.getStatus());
                vo.setCreatorPhone(sealApplyEntity.getCreatorPhone());
                vo.setCreator(sealApplyEntity.getCreator());
                vo.setCreateDate(sealApplyEntity.getCreateDate());
                vo.setApplyPersonPhone(sealApplyEntity.getApplyPersonPhone());
                vo.setApplyPerson(sealApplyEntity.getApplyPerson());
                vo.setApplyMemo(sealApplyEntity.getApplyMemo());
                vo.setApprovalNum(sealApplyEntity.getApprovalNum());
                vo.setCertificateNo(sealApplyEntity.getCertificateNo());
                vo.setCertificateType(sealApplyEntity.getCertificateType());
                vo.setSealNum(sealApplyEntity.getSealNum());
                vo.setRefuse(sealApplyEntity.getRefuse());
                vo.setSealApplyDetialEntities(sealApplyEntity.getSealApplyDetialEntities());

                vo.setOperateUnit(sealApplyEntity.getOperateUnit());//承刻单位
                vo.setApprovalUnit(sealApplyEntity.getApprovalUnit());//审批单位
                vo.setApprovalPerson(sealApplyEntity.getApprovalPerson());//审批人名称
                vo.setApprovalTime(sealApplyEntity.getApprovalTime());//审批时间
                vo.setApprovalUser(sealApplyEntity.getApprovalUser());//审批人
                vo.setOperateUser(sealApplyEntity.getOperateUser());//承刻人
                vo.setOperateTime(sealApplyEntity.getOperateTime());//承刻时间
                if(sealApplyEntity.getApprovalUser()!=null){
                    vo.setApprovalOrgId(sealApplyEntity.getApprovalUser().getUumOrgan().getOrgId());
                }

                sealApplyVoList.add(vo);
            }
        }
        int totalProperty = getRowCount(countSql,params);//总记录数
        Map map = new HashMap();
        map.put(TOTAL_PROPERTY, totalProperty);
        map.put(BUSI_LIST, sealApplyVoList);
        return map;
    }

    @Override
    public Map findUnitListByCon(int start, int limit, SealUnitVo yzSearchVo) {
        String queryString = "from SealUnitEntity sealUnitEntity where 0 = 0 ";
        List params = new ArrayList();

        if(!isNullOrEmpty(yzSearchVo.getUnitName())){
            queryString += " and sealUnitEntity.unitName like ?";
            params.add("%"+yzSearchVo.getUnitName()+"%");
        }
        if(yzSearchVo.getSealUnitId()!=0){
            queryString += " and to_char(sealUnitEntity.sealUnitId,'999') like ?";
            params.add("%"+yzSearchVo.getSealUnitId()+"%");
        }
        if(!isNullOrEmpty(yzSearchVo.getCompanyType())){
            queryString += " and sealUnitEntity.companyType like ?";
            params.add("%"+yzSearchVo.getCompanyType()+"%");
        }

        String countSql = "select count(*) " + queryString;
        queryString += " order by sealUnitEntity.createDate desc";
        List<SealUnitEntity> limitModuleList =  this.findByHqlWithPagination(start, limit, queryString,params);//分页
        int totalProperty = this.getRowCount(countSql,params);//总记录数
        Map map = new HashMap();
        List<SealUnitVo> volist = new ArrayList<SealUnitVo>();
        if(limitModuleList!=null && limitModuleList.size()>0){
            for(SealUnitEntity entity : limitModuleList){
                SealUnitVo vo = new SealUnitVo();
                vo.setAddress(entity.getAddress());
                vo.setArea(entity.getArea());
                vo.setAreaName(entity.getAreaName());
                vo.setCompanyType(entity.getCompanyType());
                vo.setCreateDate(entity.getCreateDate());
                vo.setCreator(entity.getCreator());
                vo.setLicenseNo(entity.getLicenseNo());
                vo.setManager(entity.getManager());
                vo.setPhone(entity.getPhone());
                vo.setSealUnitId(entity.getSealUnitId());
                vo.setStatus(entity.getStatus());
                vo.setUnitName(entity.getUnitName());
                vo.setUnitNamePy(entity.getUnitNamePy());
                volist.add(vo);
            }
        }

        map.put(TOTAL_PROPERTY, totalProperty);
        map.put(BUSI_LIST, volist);
        return map;
    }
}
