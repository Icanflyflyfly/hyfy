package com.bhtec.domain.pojohelper.seal;

import java.util.Date;

/**
 * 功能说明：
 *
 * @auther liubf
 * @date 2017/10/11
 * @throws
 */
public class SealUnitVo implements java.io.Serializable {
    private long sealUnitId;
    private String unitName;
    private String unitNamePy;
    private String companyType;
    private String area;
    private String licenseNo;
    private String manager;
    private String phone;
    private String address;
    private String areaName;
    private String creator;
    private String status; //0 停用 1 启用
    private Date createDate;

    public long getSealUnitId() {
        return sealUnitId;
    }

    public void setSealUnitId(long sealUnitId) {
        this.sealUnitId = sealUnitId;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getUnitNamePy() {
        return unitNamePy;
    }

    public void setUnitNamePy(String unitNamePy) {
        this.unitNamePy = unitNamePy;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
