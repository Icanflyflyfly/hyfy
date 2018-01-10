package com.bhtec.domain.pojohelper.seal;

import java.util.Date;

/**
 * 功能说明：
 *
 * @auther liubf
 * @date 2017/10/20
 * @throws
 */
public class SealVo {
    private Long sealApplyDetailId;//印章ID
    private long sealApplyId;//审批单ID
    private long sealUnitId;//使用单位ID
    private String approvalNum;//批单号
    private String unitName;//使用单位名称
    private String sealMaterial;//章面内容
    private String approvalTime;//审批日期
    private String sealType;//印章类型
    private String status;//印章状态
    private String sealName;//印章名称

    public String getSealName() {
        return sealName;
    }

    public void setSealName(String sealName) {
        this.sealName = sealName;
    }

    public String getApprovalTime() {
        return approvalTime;
    }

    public void setApprovalTime(String approvalTime) {
        this.approvalTime = approvalTime;
    }

    public String getSealType() {
        return sealType;
    }

    public void setSealType(String sealType) {
        this.sealType = sealType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getSealUnitId() {
        return sealUnitId;
    }

    public void setSealUnitId(long sealUnitId) {
        this.sealUnitId = sealUnitId;
    }

    public long getSealApplyId() {
        return sealApplyId;
    }

    public void setSealApplyId(long sealApplyId) {
        this.sealApplyId = sealApplyId;
    }

    public Long getSealApplyDetailId() {
        return sealApplyDetailId;
    }

    public void setSealApplyDetailId(Long sealApplyDetailId) {
        this.sealApplyDetailId = sealApplyDetailId;
    }

    public String getSealMaterial() {
        return sealMaterial;
    }

    public void setSealMaterial(String sealMaterial) {
        this.sealMaterial = sealMaterial;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getApprovalNum() {
        return approvalNum;
    }

    public void setApprovalNum(String approvalNum) {
        this.approvalNum = approvalNum;
    }
}
