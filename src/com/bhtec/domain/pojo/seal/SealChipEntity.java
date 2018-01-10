package com.bhtec.domain.pojo.seal;

import java.sql.Timestamp;

/**
 * Created by jacobllpjacobllp on 2017/11/3.
 */

public class SealChipEntity {
    private long chipId;
    private String chipSn;
    private Timestamp createTime;
    private String creator;
    private String chipStatus;//0 入库 1 芯片写入 2 芯片使用中 3 芯片作废
    private String attr1;
    private String attr2;
    private String sealNo;
    private String sealType;
    private String sealTypeName;
    private String sealName;
    private String sealApprovalUnit;
    private Timestamp sealApprovalTime;
    private String sealBelongUnit;
    private String sealRepresentative;
    private String sealRepresentativeIdno;
    private String sealOpName;
    private String sealOpIdno;
    private String phone;
    private String unitAddress;
    private String attr3;
    private String attr4;
    private String attr5;

    public long getChipId() {
        return chipId;
    }

    public void setChipId(long chipId) {
        this.chipId = chipId;
    }

    public String getChipSn() {
        return chipSn;
    }

    public void setChipSn(String chipSn) {
        this.chipSn = chipSn;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getChipStatus() {
        return chipStatus;
    }

    public void setChipStatus(String chipStatus) {
        this.chipStatus = chipStatus;
    }

    public String getAttr1() {
        return attr1;
    }

    public void setAttr1(String attr1) {
        this.attr1 = attr1;
    }

    public String getAttr2() {
        return attr2;
    }

    public void setAttr2(String attr2) {
        this.attr2 = attr2;
    }

    public String getSealNo() {
        return sealNo;
    }

    public void setSealNo(String sealNo) {
        this.sealNo = sealNo;
    }

    public String getSealType() {
        return sealType;
    }

    public void setSealType(String sealType) {
        this.sealType = sealType;
    }

    public String getSealTypeName() {
        return sealTypeName;
    }

    public void setSealTypeName(String sealTypeName) {
        this.sealTypeName = sealTypeName;
    }

    public String getSealName() {
        return sealName;
    }

    public void setSealName(String sealName) {
        this.sealName = sealName;
    }

    public String getSealApprovalUnit() {
        return sealApprovalUnit;
    }

    public void setSealApprovalUnit(String sealApprovalUnit) {
        this.sealApprovalUnit = sealApprovalUnit;
    }

    public Timestamp getSealApprovalTime() {
        return sealApprovalTime;
    }

    public void setSealApprovalTime(Timestamp sealApprovalTime) {
        this.sealApprovalTime = sealApprovalTime;
    }

    public String getSealBelongUnit() {
        return sealBelongUnit;
    }

    public void setSealBelongUnit(String sealBelongUnit) {
        this.sealBelongUnit = sealBelongUnit;
    }

    public String getSealRepresentative() {
        return sealRepresentative;
    }

    public void setSealRepresentative(String sealRepresentative) {
        this.sealRepresentative = sealRepresentative;
    }

    public String getSealRepresentativeIdno() {
        return sealRepresentativeIdno;
    }

    public void setSealRepresentativeIdno(String sealRepresentativeIdno) {
        this.sealRepresentativeIdno = sealRepresentativeIdno;
    }

    public String getSealOpName() {
        return sealOpName;
    }

    public void setSealOpName(String sealOpName) {
        this.sealOpName = sealOpName;
    }

    public String getSealOpIdno() {
        return sealOpIdno;
    }

    public void setSealOpIdno(String sealOpIdno) {
        this.sealOpIdno = sealOpIdno;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUnitAddress() {
        return unitAddress;
    }

    public void setUnitAddress(String unitAddress) {
        this.unitAddress = unitAddress;
    }

    public String getAttr3() {
        return attr3;
    }

    public void setAttr3(String attr3) {
        this.attr3 = attr3;
    }

    public String getAttr4() {
        return attr4;
    }

    public void setAttr4(String attr4) {
        this.attr4 = attr4;
    }

    public String getAttr5() {
        return attr5;
    }

    public void setAttr5(String attr5) {
        this.attr5 = attr5;
    }
}
