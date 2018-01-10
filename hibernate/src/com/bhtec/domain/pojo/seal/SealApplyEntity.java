package com.bhtec.domain.pojo.seal;

import java.sql.Timestamp;
import java.util.Arrays;

/**
 * Created by jacobllpjacobllp on 2017/9/19.
 */
public class SealApplyEntity {
    private long sealApplyId;
    private String certificateNo;
    private byte[] applyMaterial1;
    private byte[] applyMaterial2;
    private byte[] applyMaterial3;
    private byte[] applyMaterial4;
    private byte[] applyMaterial5;
    private Timestamp createDate;
    private String creator;
    private String approvalNum;
    private String applyMemo;
    private String refuse;
    private Short sealNum;
    private String certificateType;
    private String status;
    private String creatorUnit;
    private String applyPerson;
    private String applyPersonPhone;
    private String creatorPhone;

    public long getSealApplyId() {
        return sealApplyId;
    }

    public void setSealApplyId(long sealApplyId) {
        this.sealApplyId = sealApplyId;
    }

    public String getCertificateNo() {
        return certificateNo;
    }

    public void setCertificateNo(String certificateNo) {
        this.certificateNo = certificateNo;
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

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
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

    public String getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(String certificateType) {
        this.certificateType = certificateType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatorUnit() {
        return creatorUnit;
    }

    public void setCreatorUnit(String creatorUnit) {
        this.creatorUnit = creatorUnit;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SealApplyEntity that = (SealApplyEntity) o;

        if (sealApplyId != that.sealApplyId) return false;
        if (certificateNo != null ? !certificateNo.equals(that.certificateNo) : that.certificateNo != null)
            return false;
        if (!Arrays.equals(applyMaterial1, that.applyMaterial1)) return false;
        if (!Arrays.equals(applyMaterial2, that.applyMaterial2)) return false;
        if (!Arrays.equals(applyMaterial3, that.applyMaterial3)) return false;
        if (!Arrays.equals(applyMaterial4, that.applyMaterial4)) return false;
        if (!Arrays.equals(applyMaterial5, that.applyMaterial5)) return false;
        if (createDate != null ? !createDate.equals(that.createDate) : that.createDate != null) return false;
        if (creator != null ? !creator.equals(that.creator) : that.creator != null) return false;
        if (approvalNum != null ? !approvalNum.equals(that.approvalNum) : that.approvalNum != null) return false;
        if (applyMemo != null ? !applyMemo.equals(that.applyMemo) : that.applyMemo != null) return false;
        if (refuse != null ? !refuse.equals(that.refuse) : that.refuse != null) return false;
        if (sealNum != null ? !sealNum.equals(that.sealNum) : that.sealNum != null) return false;
        if (certificateType != null ? !certificateType.equals(that.certificateType) : that.certificateType != null)
            return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (creatorUnit != null ? !creatorUnit.equals(that.creatorUnit) : that.creatorUnit != null) return false;
        if (applyPerson != null ? !applyPerson.equals(that.applyPerson) : that.applyPerson != null) return false;
        if (applyPersonPhone != null ? !applyPersonPhone.equals(that.applyPersonPhone) : that.applyPersonPhone != null)
            return false;
        if (creatorPhone != null ? !creatorPhone.equals(that.creatorPhone) : that.creatorPhone != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (sealApplyId ^ (sealApplyId >>> 32));
        result = 31 * result + (certificateNo != null ? certificateNo.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(applyMaterial1);
        result = 31 * result + Arrays.hashCode(applyMaterial2);
        result = 31 * result + Arrays.hashCode(applyMaterial3);
        result = 31 * result + Arrays.hashCode(applyMaterial4);
        result = 31 * result + Arrays.hashCode(applyMaterial5);
        result = 31 * result + (createDate != null ? createDate.hashCode() : 0);
        result = 31 * result + (creator != null ? creator.hashCode() : 0);
        result = 31 * result + (approvalNum != null ? approvalNum.hashCode() : 0);
        result = 31 * result + (applyMemo != null ? applyMemo.hashCode() : 0);
        result = 31 * result + (refuse != null ? refuse.hashCode() : 0);
        result = 31 * result + (sealNum != null ? sealNum.hashCode() : 0);
        result = 31 * result + (certificateType != null ? certificateType.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (creatorUnit != null ? creatorUnit.hashCode() : 0);
        result = 31 * result + (applyPerson != null ? applyPerson.hashCode() : 0);
        result = 31 * result + (applyPersonPhone != null ? applyPersonPhone.hashCode() : 0);
        result = 31 * result + (creatorPhone != null ? creatorPhone.hashCode() : 0);
        return result;
    }
}
