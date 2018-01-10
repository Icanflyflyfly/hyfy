package com.bhtec.domain.pojo.seal;

import java.io.Serializable;


public class SealApplyDetailEntity implements Serializable {
    private Long sealApplyDetailId;
    private String sealType;
    private String sealName;
    private String sealSpecification;
    private String bingkanType;
    private String bingkanInfo;
    private String zhongkanType;
    private String word1;
    private String word2;
    private String word3;
    private String word4;
    private String word5;
    private String word6;
    private String sealMaterial;
    private String oilType;
    private SealApplyEntity sealApplyEntity;
    private String status;//0 未审核印章 1 已审核历史印章

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private Long sealApplyId;

    public Long getSealApplyId() {
        return sealApplyId;
    }

    public void setSealApplyId(Long sealApplyId) {
        this.sealApplyId = sealApplyId;
    }

    public Long getSealApplyDetailId() {
        return sealApplyDetailId;
    }

    public void setSealApplyDetailId(Long sealApplyDetailId) {
        this.sealApplyDetailId = sealApplyDetailId;
    }

    public String getSealType() {
        return sealType;
    }

    public void setSealType(String sealType) {
        this.sealType = sealType;
    }

    public String getSealName() {
        return sealName;
    }

    public void setSealName(String sealName) {
        this.sealName = sealName;
    }

    public String getSealSpecification() {
        return sealSpecification;
    }

    public void setSealSpecification(String sealSpecification) {
        this.sealSpecification = sealSpecification;
    }

    public String getBingkanType() {
        return bingkanType;
    }

    public void setBingkanType(String bingkanType) {
        this.bingkanType = bingkanType;
    }

    public String getBingkanInfo() {
        return bingkanInfo;
    }

    public void setBingkanInfo(String bingkanInfo) {
        this.bingkanInfo = bingkanInfo;
    }

    public String getZhongkanType() {
        return zhongkanType;
    }

    public void setZhongkanType(String zhongkanType) {
        this.zhongkanType = zhongkanType;
    }

    public String getWord1() {
        return word1;
    }

    public void setWord1(String word1) {
        this.word1 = word1;
    }

    public String getWord2() {
        return word2;
    }

    public void setWord2(String word2) {
        this.word2 = word2;
    }

    public String getWord3() {
        return word3;
    }

    public void setWord3(String word3) {
        this.word3 = word3;
    }

    public String getWord4() {
        return word4;
    }

    public void setWord4(String word4) {
        this.word4 = word4;
    }

    public String getWord5() {
        return word5;
    }

    public void setWord5(String word5) {
        this.word5 = word5;
    }

    public String getWord6() {
        return word6;
    }

    public void setWord6(String word6) {
        this.word6 = word6;
    }

    public String getSealMaterial() {
        return sealMaterial;
    }

    public void setSealMaterial(String sealMaterial) {
        this.sealMaterial = sealMaterial;
    }

    public String getOilType() {
        return oilType;
    }

    public void setOilType(String oilType) {
        this.oilType = oilType;
    }

    public SealApplyEntity getSealApplyEntity() {
        return sealApplyEntity;
    }

    public void setSealApplyEntity(SealApplyEntity sealApplyEntity) {
        this.sealApplyEntity = sealApplyEntity;
    }

    public boolean equals(Object obj){
        if(this.getClass() != obj.getClass())return false;
        SealApplyDetailEntity sealApplyDetailEntity = (SealApplyDetailEntity)obj;
        if(sealApplyDetailEntity.getSealApplyDetailId().longValue() == this.sealApplyDetailId.longValue()){
            return true;
        }else{
            return false;
        }
    }
}
