package com.bhtec.domain.pojohelper.seal;

import com.bhtec.domain.pojo.uum.UumUser;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by jacobllpjacobllp on 2017/7/16.
 */

public class SealApplyVo implements java.io.Serializable {
    private long sealApplyId;
    private String approvalNum;//批单号
    private String unitName;
    private String unitNamePy;
    private String companyType;
    private String area;
    private String areaName;
    private String licenseNo;
    private String manager;
    private String certificateType;
    private String certificateNo;
    private String phone;
    private String code;
    private String address;
    private byte[] applyMaterial1;
    private byte[] applyMaterial2;
    private byte[] applyMaterial3;
    private byte[] applyMaterial4;
    private byte[] applyMaterial5;
    private Date createDate;
    private String creator;
    private String creatorPhone;
    private String applyMemo;//审批备注
    private String refuse;//拒绝理由
    private Short sealNum;//印章数量
    private Set sealApplyDetialEntities = new HashSet(0);
    private String status;//0 未审核 1 审核未通过 2 审核通过 3 重新申报 4 撤销 5 上报 6 完成
    private String applyPerson;
    private String applyPersonPhone;
    private long sealUnitId;

    private String operateUnit;//承刻单位
    private String approvalUnit;//审批单位
    private String approvalPerson;//审批人名称
    private Date approvalTime;//审批时间
    private Date operateTime;//承刻时间
    private UumUser approvalUser;//审批人
    private UumUser operateUser;//承刻人
    private long approvalOrgId;//审批单位ID

    private String s0;
    private String s1;
    private String s2;
    private String s3;
    private String s4;

    private String p0;
    private String p1;
    private String p2;
    private String p3;
    private String p4;

    public long getApprovalOrgId() {
        return approvalOrgId;
    }

    public void setApprovalOrgId(long approvalOrgId) {
        this.approvalOrgId = approvalOrgId;
    }

    public String getOperateUnit() {
        return operateUnit;
    }

    public void setOperateUnit(String operateUnit) {
        this.operateUnit = operateUnit;
    }

    public String getApprovalUnit() {
        return approvalUnit;
    }

    public void setApprovalUnit(String approvalUnit) {
        this.approvalUnit = approvalUnit;
    }

    public String getApprovalPerson() {
        return approvalPerson;
    }

    public void setApprovalPerson(String approvalPerson) {
        this.approvalPerson = approvalPerson;
    }

    public Date getApprovalTime() {
        return approvalTime;
    }

    public void setApprovalTime(Date approvalTime) {
        this.approvalTime = approvalTime;
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime;
    }

    public UumUser getApprovalUser() {
        return approvalUser;
    }

    public void setApprovalUser(UumUser approvalUser) {
        this.approvalUser = approvalUser;
    }

    public UumUser getOperateUser() {
        return operateUser;
    }

    public void setOperateUser(UumUser operateUser) {
        this.operateUser = operateUser;
    }

    public String getApplyPerson() {
        return applyPerson;
    }

    public void setApplyPerson(String applyPerson) {
        this.applyPerson = applyPerson;
    }

    public String getApplyPersonPhone() {
        return applyPersonPhone;
    }

    public void setApplyPersonPhone(String applyPersonPhone) {
        this.applyPersonPhone = applyPersonPhone;
    }

    public String getCreatorPhone() {
        return creatorPhone;
    }

    public void setCreatorPhone(String creatorPhone) {
        this.creatorPhone = creatorPhone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getSealApplyId() {
        return sealApplyId;
    }

    public void setSealApplyId(long sealApplyId) {
        this.sealApplyId = sealApplyId;
    }

    public String getUnitNamePy() {
        return unitNamePy;
    }

    public void setUnitNamePy(String unitNamePy) {
        this.unitNamePy = unitNamePy;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getLicenseNo() {
        return licenseNo;
    }

    public void setLicenseNo(String licenseNo) {
        this.licenseNo = licenseNo;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getCertificateNo() {
        return certificateNo;
    }

    public void setCertificateNo(String certificateNo) {
        this.certificateNo = certificateNo;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public byte[] getApplyMaterial1() {
        return applyMaterial1;
    }

    public void setApplyMaterial1(byte[] applyMaterial1) {
        this.applyMaterial1 = applyMaterial1;
    }

    public byte[] getApplyMaterial2() {
        return applyMaterial2;
    }

    public void setApplyMaterial2(byte[] applyMaterial2) {
        this.applyMaterial2 = applyMaterial2;
    }

    public byte[] getApplyMaterial3() {
        return applyMaterial3;
    }

    public void setApplyMaterial3(byte[] applyMaterial3) {
        this.applyMaterial3 = applyMaterial3;
    }

    public byte[] getApplyMaterial4() {
        return applyMaterial4;
    }

    public void setApplyMaterial4(byte[] applyMaterial4) {
        this.applyMaterial4 = applyMaterial4;
    }

    public byte[] getApplyMaterial5() {
        return applyMaterial5;
    }

    public void setApplyMaterial5(byte[] applyMaterial5) {
        this.applyMaterial5 = applyMaterial5;
    }

    public Set getSealApplyDetialEntities() {
        return sealApplyDetialEntities;
    }

    public void setSealApplyDetialEntities(Set sealApplyDetialEntities) {
        this.sealApplyDetialEntities = sealApplyDetialEntities;
    }
    public Date getCreateDate() {
        return this.createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getApprovalNum() {
        return approvalNum;
    }

    public void setApprovalNum(String approvalNum) {
        this.approvalNum = approvalNum;
    }

    public String getApplyMemo() {
        return applyMemo;
    }

    public void setApplyMemo(String applyMemo) {
        this.applyMemo = applyMemo;
    }

    public String getRefuse() {
        return refuse;
    }

    public void setRefuse(String refuse) {
        this.refuse = refuse;
    }

    public Short getSealNum() {
        return sealNum;
    }

    public void setSealNum(Short sealNum) {
        this.sealNum = sealNum;
    }

    public String getCompanyType() {
        return companyType;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(String certificateType) {
        this.certificateType = certificateType;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public long getSealUnitId() {
        return sealUnitId;
    }

    public void setSealUnitId(long sealUnitId) {
        this.sealUnitId = sealUnitId;
    }

    public String getS0() {
        return s0;
    }

    public void setS0(String s0) {
        this.s0 = s0;
    }

    public String getS1() {
        return s1;
    }

    public void setS1(String s1) {
        this.s1 = s1;
    }

    public String getS2() {
        return s2;
    }

    public void setS2(String s2) {
        this.s2 = s2;
    }

    public String getS3() {
        return s3;
    }

    public void setS3(String s3) {
        this.s3 = s3;
    }

    public String getS4() {
        return s4;
    }

    public void setS4(String s4) {
        this.s4 = s4;
    }

    public String getP0() {
        return p0;
    }

    public void setP0(String p0) {
        this.p0 = p0;
    }

    public String getP1() {
        return p1;
    }

    public void setP1(String p1) {
        this.p1 = p1;
    }

    public String getP2() {
        return p2;
    }

    public void setP2(String p2) {
        this.p2 = p2;
    }

    public String getP3() {
        return p3;
    }

    public void setP3(String p3) {
        this.p3 = p3;
    }

    public String getP4() {
        return p4;
    }

    public void setP4(String p4) {
        this.p4 = p4;
    }
}
